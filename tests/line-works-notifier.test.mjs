import { describe, it, expect, beforeEach } from 'vitest'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import {
  createGasContext, loadGasFile, callGas, evalGas,
  makePropertiesService, makeCacheService, makeUrlFetchApp,
  makeUtilities, makeLogger, makeMailApp, makeSpreadsheetApp,
} from './gas-harness.mjs'

const NOTIFIER_PATH = resolve(process.cwd(), 'scripts/gas/donations/LineWorksNotifier.js')
const DONATIONS_PATH = resolve(process.cwd(), 'scripts/gas/donations/Donations.js')
const APPSSCRIPT_PATH = resolve(process.cwd(), 'scripts/gas/donations/appsscript.json')

const REQUIRED_PROPS = {
  LW_CLIENT_ID: 'client-id-xxx',
  LW_CLIENT_SECRET: 'client-secret-xxx',
  LW_SERVICE_ACCOUNT: 'svc.account@example.com',
  LW_PRIVATE_KEY: '-----BEGIN ' + 'PRIVATE KEY-----\nFAKE\n-----END PRIVATE KEY-----',
  LW_BOT_ID: '12345678',
  LW_CHANNEL_ID: 'channel-id-yyy',
  SPREADSHEET_ID: 'MOCK_SHEET_ID',
  ADMIN_EMAIL: 'admin@example.com',
}

function makeCtx({ props = REQUIRED_PROPS, fetchHandler, rows = [] } = {}) {
  const propsService = makePropertiesService(props)
  const cacheService = makeCacheService()
  const fetchApp = makeUrlFetchApp(fetchHandler || (() => ({ code: 200, body: JSON.stringify({ access_token: 'AT_VAL', expires_in: 3600 }) })))
  const utilities = makeUtilities()
  const logger = makeLogger()
  const mailApp = makeMailApp()
  const ssApp = makeSpreadsheetApp({ rows })
  const ctx = createGasContext({
    PropertiesService: propsService,
    CacheService: cacheService,
    UrlFetchApp: fetchApp,
    Utilities: utilities,
    Logger: logger,
    MailApp: mailApp,
    SpreadsheetApp: ssApp,
  })
  // Donations.js を先にロード (LineWorksNotifier が rowAmount_ を参照するため)
  loadGasFile(ctx, DONATIONS_PATH)
  loadGasFile(ctx, NOTIFIER_PATH)
  return { ctx, fetchApp, logger, mailApp, propsService, cacheService, ssApp }
}

// row 構造: A=ts, B=email, C=name, D=period, E=fund, F=units, G=message, H=publish, I=status, J=confirmedAt, K=confirmer
function makeRow({
  ts = new Date('2026-05-13T11:23:00+09:00'),
  email = 'donor@example.com',
  name = '山田 太郎',
  period = '5期',
  fund = '開邦雄飛応援金',
  units = '2口',
  message = '応援しています！',
  publish = '氏名で掲載OK',
  status = '未確認',
  confirmedAt = '',
  confirmer = '',
} = {}) {
  return [ts, email, name, period, fund, units, message, publish, status, confirmedAt, confirmer]
}

describe('buildNotificationText_', () => {
  it('Issue #20 仕様の文面を組み立てる', () => {
    const { ctx } = makeCtx()
    const row = makeRow()
    const text = callGas(ctx, 'buildNotificationText_', [row])
    expect(text).toContain('🎁 新しい寄付申込みがありました')
    expect(text).toContain('お名前: 山田 太郎（5期）')
    expect(text).toContain('口数 : 2口（¥20,000）')
    expect(text).toContain('HP掲載: 氏名で掲載OK')
    expect(text).toContain('応援しています！')
    expect(text).toContain('受付: 2026-05-13')
    expect(text).toContain('※会計確認後にサイトへ反映されます。')
    expect(text).toContain('スプレッドシート: ')
  })

  it('メッセージなしの場合 "(なし)" と表示する', () => {
    const { ctx } = makeCtx()
    const row = makeRow({ message: '' })
    const text = callGas(ctx, 'buildNotificationText_', [row])
    expect(text).toContain('(なし)')
  })

  it('期不明の場合は期表記を省略する', () => {
    const { ctx } = makeCtx()
    const row = makeRow({ period: '' })
    const text = callGas(ctx, 'buildNotificationText_', [row])
    expect(text).toContain('お名前: 山田 太郎')
    expect(text).not.toMatch(/お名前: 山田 太郎（[^）]+）/)
  })

  it('Email アドレスは本文に出さない (公開ログを避ける)', () => {
    const { ctx } = makeCtx()
    const row = makeRow({ email: 'private@example.com' })
    const text = callGas(ctx, 'buildNotificationText_', [row])
    expect(text).not.toContain('private@example.com')
  })

  it('「その他」金額の場合は ¥10,000 換算で表示する (rowAmount_ 連動)', () => {
    const { ctx } = makeCtx()
    const row = makeRow({ units: 'その他' })
    const text = callGas(ctx, 'buildNotificationText_', [row])
    expect(text).toContain('¥10,000')
  })
})

describe('getAccessToken_', () => {
  it('Script Properties が欠けていると throw する', () => {
    const { ctx } = makeCtx({ props: { ...REQUIRED_PROPS, LW_CLIENT_ID: '' } })
    expect(() => callGas(ctx, 'getAccessToken_', [])).toThrow(/LW_CLIENT_ID/)
  })

  it('cache hit の場合 fetch せずキャッシュ値を返す', () => {
    const { ctx, fetchApp, cacheService } = makeCtx()
    cacheService.getScriptCache().put('LW_ACCESS_TOKEN_V1', 'CACHED_TOKEN', 1800)
    const tok = callGas(ctx, 'getAccessToken_', [])
    expect(tok).toBe('CACHED_TOKEN')
    expect(fetchApp._calls.length).toBe(0)
  })

  it('cache miss の場合は auth endpoint を叩いて access_token を返す', () => {
    const { ctx, fetchApp } = makeCtx({
      fetchHandler: (url, opts) => {
        if (url.includes('/oauth2/v2.0/token')) {
          return { code: 200, body: JSON.stringify({ access_token: 'NEW_TOKEN', expires_in: 3600 }) }
        }
        return { code: 500, body: 'unexpected' }
      },
    })
    const tok = callGas(ctx, 'getAccessToken_', [])
    expect(tok).toBe('NEW_TOKEN')
    expect(fetchApp._calls[0].url).toMatch(/auth\.worksmobile\.com\/oauth2\/v2\.0\/token/)
    expect(fetchApp._calls[0].opts.method).toBe('post')
    expect(fetchApp._calls[0].opts.payload.grant_type).toBe('urn:ietf:params:oauth:grant-type:jwt-bearer')
  })

  it('auth endpoint が 4xx/5xx の場合 throw する', () => {
    const { ctx } = makeCtx({
      fetchHandler: () => ({ code: 401, body: 'unauthorized' }),
    })
    expect(() => callGas(ctx, 'getAccessToken_', [])).toThrow(/401/)
  })

  it('成功時 access_token を cache に保存する', () => {
    const { ctx, cacheService } = makeCtx({
      fetchHandler: () => ({ code: 200, body: JSON.stringify({ access_token: 'STORED', expires_in: 3600 }) }),
    })
    callGas(ctx, 'getAccessToken_', [])
    expect(cacheService.getScriptCache().get('LW_ACCESS_TOKEN_V1')).toBe('STORED')
  })
})

describe('createJwt_', () => {
  it('header.payload.signature の 3 セグメントを返す', () => {
    const { ctx } = makeCtx()
    const jwt = callGas(ctx, 'createJwt_', ['client-x', 'svc@example.com', 'priv-key-stub'])
    const segs = jwt.split('.')
    expect(segs.length).toBe(3)
    for (const s of segs) {
      expect(s).toMatch(/^[A-Za-z0-9_-]+$/)
    }
  })

  it('header に alg=RS256 が含まれる', () => {
    const { ctx } = makeCtx()
    const jwt = callGas(ctx, 'createJwt_', ['client-x', 'svc@example.com', 'priv-key-stub'])
    const headerJson = Buffer.from(jwt.split('.')[0], 'base64').toString('utf8')
    const header = JSON.parse(headerJson)
    expect(header.alg).toBe('RS256')
    expect(header.typ).toBe('JWT')
  })

  it('claim に iss=client_id / sub=service_account / iat / exp を含む', () => {
    const { ctx } = makeCtx()
    const jwt = callGas(ctx, 'createJwt_', ['client-x', 'svc@example.com', 'priv-key-stub'])
    const claimsJson = Buffer.from(jwt.split('.')[1], 'base64').toString('utf8')
    const claims = JSON.parse(claimsJson)
    expect(claims.iss).toBe('client-x')
    expect(claims.sub).toBe('svc@example.com')
    expect(typeof claims.iat).toBe('number')
    expect(typeof claims.exp).toBe('number')
    expect(claims.exp).toBeGreaterThan(claims.iat)
  })
})

describe('postBotMessage_', () => {
  it('Bot Message API に Bearer header 付きで POST する', () => {
    let posted
    const { ctx, fetchApp } = makeCtx({
      fetchHandler: (url, opts) => {
        if (url.includes('/oauth2/v2.0/token')) {
          return { code: 200, body: JSON.stringify({ access_token: 'AT', expires_in: 3600 }) }
        }
        if (url.includes('/messages')) {
          posted = { url, opts }
          return { code: 200, body: '{}' }
        }
        return { code: 404, body: 'not found' }
      },
    })
    callGas(ctx, 'postBotMessage_', ['hello'])
    expect(posted.url).toMatch(/worksapis\.com\/v1\.0\/bots\/[^/]+\/channels\/[^/]+\/messages/)
    expect(posted.opts.method).toBe('post')
    expect(posted.opts.headers.Authorization).toBe('Bearer AT')
    const body = JSON.parse(posted.opts.payload)
    expect(body.content.type).toBe('text')
    expect(body.content.text).toBe('hello')
  })

  it('Bot API が 4xx の場合 throw する', () => {
    const { ctx } = makeCtx({
      fetchHandler: (url) => {
        if (url.includes('/oauth2/')) return { code: 200, body: JSON.stringify({ access_token: 'AT', expires_in: 3600 }) }
        return { code: 400, body: 'bad request' }
      },
    })
    expect(() => callGas(ctx, 'postBotMessage_', ['x'])).toThrow(/400/)
  })
})

describe('onFormSubmit', () => {
  it('成功時に postBotMessage を 1 回呼ぶ', () => {
    const calls = []
    const { ctx, fetchApp } = makeCtx({
      fetchHandler: (url, opts) => {
        if (url.includes('/oauth2/')) {
          calls.push('token')
          return { code: 200, body: JSON.stringify({ access_token: 'AT', expires_in: 3600 }) }
        }
        if (url.includes('/messages')) {
          calls.push('msg:' + JSON.parse(opts.payload).content.text.slice(0, 30))
          return { code: 200, body: '{}' }
        }
        return { code: 404, body: 'nf' }
      },
    })
    const row = makeRow()
    const e = {
      range: {
        getRow: () => 2,
        getValues: () => [row],
      },
      values: row.slice(1), // Form values は timestamp を除く
    }
    callGas(ctx, 'onFormSubmit', [e])
    expect(calls).toEqual(['token', expect.stringContaining('msg:')])
  })

  it('postBotMessage 失敗時に Logger.log + 管理者メール送信する', () => {
    const { ctx, logger, mailApp } = makeCtx({
      fetchHandler: (url) => {
        if (url.includes('/oauth2/')) return { code: 500, body: 'token down' }
        return { code: 500, body: 'down' }
      },
    })
    const e = {
      range: {
        getRow: () => 2,
        getValues: () => [makeRow()],
      },
      values: [],
    }
    // throw しない (運用継続のため)
    callGas(ctx, 'onFormSubmit', [e])
    expect(logger._lines.join('\n')).toMatch(/onFormSubmit.*error/i)
    expect(mailApp._sent.length).toBeGreaterThan(0)
    expect(mailApp._sent[0].to).toBe('admin@example.com')
    expect(mailApp._sent[0].subject).toMatch(/通知失敗|寄付/)
  })
})

describe('testNotify', () => {
  it('テスト用通知を 1 回送信する', () => {
    const calls = []
    const { ctx } = makeCtx({
      fetchHandler: (url, opts) => {
        if (url.includes('/oauth2/')) return { code: 200, body: JSON.stringify({ access_token: 'AT', expires_in: 3600 }) }
        if (url.includes('/messages')) {
          calls.push(JSON.parse(opts.payload).content.text)
          return { code: 200, body: '{}' }
        }
        return { code: 404, body: '' }
      },
    })
    callGas(ctx, 'testNotify', [])
    expect(calls.length).toBe(1)
    expect(calls[0]).toMatch(/テスト|test/i)
  })
})

describe('appsscript.json (manifest)', () => {
  it('script.external_request スコープが追加されている', () => {
    const json = JSON.parse(readFileSync(APPSSCRIPT_PATH, 'utf8'))
    expect(json.oauthScopes).toContain('https://www.googleapis.com/auth/script.external_request')
  })

  it('script.send_mail スコープが追加されている (失敗時の管理者メール送信用)', () => {
    const json = JSON.parse(readFileSync(APPSSCRIPT_PATH, 'utf8'))
    expect(json.oauthScopes).toContain('https://www.googleapis.com/auth/script.send_mail')
  })
})

describe('Setup.js — LINE WORKS Properties セットアップ', () => {
  it('setupLineWorksProperties が 6 点の必須キーを引数から保存する', () => {
    const SETUP_PATH = resolve(process.cwd(), 'scripts/gas/donations/Setup.js')
    const ctx = createGasContext({
      PropertiesService: makePropertiesService(),
      Logger: makeLogger(),
      Utilities: makeUtilities(),
      SpreadsheetApp: makeSpreadsheetApp(),
      FormApp: { create: () => ({ setTitle: () => {}, setDescription: () => {} }) },
    })
    loadGasFile(ctx, SETUP_PATH)
    callGas(ctx, 'setupLineWorksProperties', [{
      LW_CLIENT_ID: 'cid',
      LW_CLIENT_SECRET: 'csec',
      LW_SERVICE_ACCOUNT: 'svc@e.com',
      LW_PRIVATE_KEY: '-----BEGIN ' + 'PRIVATE KEY-----\nx\n-----END PRIVATE KEY-----',
      LW_BOT_ID: 'bot1',
      LW_CHANNEL_ID: 'ch1',
    }])
    const store = evalGas(ctx, 'PropertiesService.getScriptProperties().getProperties()')
    expect(store.LW_CLIENT_ID).toBe('cid')
    expect(store.LW_CLIENT_SECRET).toBe('csec')
    expect(store.LW_SERVICE_ACCOUNT).toBe('svc@e.com')
    expect(store.LW_PRIVATE_KEY).toContain('BEGIN')
    expect(store.LW_BOT_ID).toBe('bot1')
    expect(store.LW_CHANNEL_ID).toBe('ch1')
  })

  it('setupLineWorksProperties は必須キーが欠けると throw する', () => {
    const SETUP_PATH = resolve(process.cwd(), 'scripts/gas/donations/Setup.js')
    const ctx = createGasContext({
      PropertiesService: makePropertiesService(),
      Logger: makeLogger(),
      Utilities: makeUtilities(),
      SpreadsheetApp: makeSpreadsheetApp(),
      FormApp: { create: () => ({ setTitle: () => {}, setDescription: () => {} }) },
    })
    loadGasFile(ctx, SETUP_PATH)
    expect(() => callGas(ctx, 'setupLineWorksProperties', [{
      LW_CLIENT_ID: 'cid',
      // missing others
    }])).toThrow(/必須|required|missing/i)
  })
})

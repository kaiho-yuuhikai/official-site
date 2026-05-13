/**
 * 開邦雄飛会 寄付通知 — LINE WORKS Bot 連携
 *
 * Issue #20: フォーム送信トリガーから運営トークルームへ通知する。
 *
 * 認証情報は Script Properties に保存し、コードにはハードコードしない。
 *   LW_CLIENT_ID         — Developer Console App の Client ID
 *   LW_CLIENT_SECRET     — Developer Console App の Client Secret
 *   LW_SERVICE_ACCOUNT   — xxxx.serviceaccount@<domain>
 *   LW_PRIVATE_KEY       — PEM形式の Private Key (改行込み)
 *   LW_BOT_ID            — Bot の番号
 *   LW_CHANNEL_ID        — 送信先トークルームの channelId
 *   ADMIN_EMAIL          — 通知失敗時のフォールバック宛先 (任意)
 *
 * デプロイ後 (Phase 2 → 3):
 *   1. Script Properties に上記 6+1 点を投入
 *   2. installFormSubmitTrigger() を 1 回だけ実行 (Setup.js)
 *   3. testNotify() でテストルームに 1 件送信し動作確認
 */

const LW_AUTH_URL = 'https://auth.worksmobile.com/oauth2/v2.0/token'
const LW_API_BASE = 'https://www.worksapis.com/v1.0'
const LW_CACHE_KEY = 'LW_ACCESS_TOKEN_V1'
const LW_TOKEN_CACHE_TTL_SEC = 60 * 50 // 50分 (LINE WORKS access token の有効期限は 1h)

function getRequiredProperty_(key) {
  const v = PropertiesService.getScriptProperties().getProperty(key)
  if (!v) throw new Error('Required Script Property missing: ' + key)
  return v
}

function base64UrlEncode_(s) {
  const enc = Utilities.base64Encode(Utilities.newBlob(s).getBytes())
  return enc.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlEncodeBytes_(bytes) {
  const enc = Utilities.base64Encode(bytes)
  return enc.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function createJwt_(clientId, serviceAccount, privateKey) {
  const now = Math.floor(Date.now() / 1000)
  const header = { typ: 'JWT', alg: 'RS256' }
  const claims = { iss: clientId, sub: serviceAccount, iat: now, exp: now + 3600 }
  const headerB64 = base64UrlEncode_(JSON.stringify(header))
  const claimsB64 = base64UrlEncode_(JSON.stringify(claims))
  const signingInput = headerB64 + '.' + claimsB64
  const signature = Utilities.computeRsaSha256Signature(signingInput, privateKey)
  const sigB64 = base64UrlEncodeBytes_(signature)
  return signingInput + '.' + sigB64
}

function getAccessToken_() {
  const cache = CacheService.getScriptCache()
  const cached = cache.get(LW_CACHE_KEY)
  if (cached) return cached

  const clientId = getRequiredProperty_('LW_CLIENT_ID')
  const clientSecret = getRequiredProperty_('LW_CLIENT_SECRET')
  const serviceAccount = getRequiredProperty_('LW_SERVICE_ACCOUNT')
  const privateKey = getRequiredProperty_('LW_PRIVATE_KEY')

  const jwt = createJwt_(clientId, serviceAccount, privateKey)
  const res = UrlFetchApp.fetch(LW_AUTH_URL, {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: {
      assertion: jwt,
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'bot',
    },
    muteHttpExceptions: true,
  })
  const code = res.getResponseCode()
  if (code !== 200) {
    throw new Error('LINE WORKS auth failed: ' + code + ' ' + res.getContentText())
  }
  const json = JSON.parse(res.getContentText())
  const token = json.access_token
  if (!token) throw new Error('LINE WORKS auth response has no access_token')
  cache.put(LW_CACHE_KEY, token, LW_TOKEN_CACHE_TTL_SEC)
  return token
}

function postBotMessage_(text) {
  const botId = getRequiredProperty_('LW_BOT_ID')
  const channelId = getRequiredProperty_('LW_CHANNEL_ID')
  const token = getAccessToken_()
  const url = LW_API_BASE + '/bots/' + encodeURIComponent(botId) + '/channels/' + encodeURIComponent(channelId) + '/messages'
  const res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ content: { type: 'text', text: text } }),
    muteHttpExceptions: true,
  })
  const code = res.getResponseCode()
  if (code >= 400) {
    throw new Error('LINE WORKS post failed: ' + code + ' ' + res.getContentText())
  }
  return JSON.parse(res.getContentText() || '{}')
}

function formatJpDateTime_(v) {
  const d = v instanceof Date ? v : new Date(v)
  if (isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
}

function getSpreadsheetUrl_() {
  try {
    const ssId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')
    if (ssId) return SpreadsheetApp.openById(ssId).getUrl()
    return SpreadsheetApp.getActive().getUrl()
  } catch (e) {
    return ''
  }
}

/**
 * 行データから通知文面を組み立てる。
 *
 * 行構造は Donations.js の COL_* と一致 (A〜K):
 *   row[0]  タイムスタンプ
 *   row[1]  メール (本文には出さない)
 *   row[2]  お名前       = COL_NAME
 *   row[3]  入学期        = COL_PERIOD
 *   row[4]  寄付先基金
 *   row[5]  寄付口数      = COL_UNITS
 *   row[6]  メッセージ    = COL_MESSAGE
 *   row[7]  HP掲載        = COL_PUBLISH
 */
function buildNotificationText_(row) {
  const ts = row[0]
  const name = String(row[2] || '').trim()
  const period = String(row[3] || '').trim()
  const units = String(row[5] || '').trim()
  const message = String(row[6] || '').trim()
  const publish = String(row[7] || '').trim()
  const amount = rowAmount_(row) // Donations.js で定義
  const ssUrl = getSpreadsheetUrl_()
  const lines = []
  lines.push('🎁 新しい寄付申込みがありました')
  lines.push('')
  lines.push('お名前: ' + name + (period ? '（' + period + '）' : ''))
  lines.push('口数 : ' + (units || '(未記入)') + '（¥' + amount.toLocaleString('en-US') + '）')
  lines.push('HP掲載: ' + (publish || '(未記入)'))
  lines.push('メッセージ:')
  lines.push('  ' + (message || '(なし)'))
  lines.push('')
  lines.push('受付: ' + formatJpDateTime_(ts))
  lines.push('※会計確認後にサイトへ反映されます。')
  if (ssUrl) lines.push('スプレッドシート: ' + ssUrl)
  return lines.join('\n')
}

function notifyAdminFailure_(err) {
  const adminEmail = PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL')
  if (!adminEmail) return
  try {
    MailApp.sendEmail({
      to: adminEmail,
      subject: '[雄飛会] 寄付通知失敗',
      body: '寄付申込の LINE WORKS 通知に失敗しました。\n\n' +
        '原因: ' + (err && err.message || err) + '\n\n' +
        'スプレッドシートを直接確認してください。',
    })
  } catch (mailErr) {
    Logger.log('[notifyAdminFailure_] mail send failed: ' + mailErr)
  }
}

/**
 * Form 送信時に Apps Script のトリガーから呼ばれる。
 *
 * e.range が submit された行の Range を提供する (A〜K の 11 列)。
 * 例外は throw せず、Logger + 管理者メールでフォールバックする (寄付申込自体は完了させる)。
 */
function onFormSubmit(e) {
  try {
    let row
    if (e && e.range && typeof e.range.getRow === 'function') {
      const r = e.range.getRow()
      const ssId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')
      const ss = ssId ? SpreadsheetApp.openById(ssId) : SpreadsheetApp.getActive()
      const sheet = ss.getSheetByName('donations') || ss.getSheets()[0]
      row = sheet.getRange(r, 1, 1, 11).getValues()[0]
    } else if (e && e.range && typeof e.range.getValues === 'function') {
      row = e.range.getValues()[0]
    } else if (e && e.values) {
      // フォールバック: namedValues / values から組み立て
      row = [new Date()].concat(e.values || [])
    } else {
      throw new Error('onFormSubmit: row data not available from event')
    }
    const text = buildNotificationText_(row)
    postBotMessage_(text)
  } catch (err) {
    Logger.log('[onFormSubmit] error: ' + (err && err.stack || err))
    notifyAdminFailure_(err)
  }
}

/**
 * GAS エディタから手動実行して通知の動作確認をする。
 * Bot トークルームに簡単なメッセージを 1 件送る。
 */
function testNotify() {
  const text = '【テスト】寄付通知 Bot の疎通テスト (' + formatJpDateTime_(new Date()) + ')'
  postBotMessage_(text)
  Logger.log('testNotify: sent')
}

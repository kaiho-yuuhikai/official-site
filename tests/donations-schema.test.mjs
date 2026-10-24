import { describe, it, expect } from 'vitest'
import { resolve } from 'node:path'
import { createGasContext, loadGasFile, callGas, evalGas, makePropertiesService } from './gas-harness.mjs'

const DONATIONS_PATH = resolve(process.cwd(), 'scripts/gas/donations/Donations.js')
const SETUP_PATH = resolve(process.cwd(), 'scripts/gas/donations/Setup.js')

const GOOD_HEADER = [
  'タイムスタンプ', 'メールアドレス', 'お名前', '入学期', '寄付先基金', '寄付口数',
  'メッセージ（任意）', 'HP掲載の可否', '振込確認ステータス', '確認日', '確認者',
]
// Setup.js が以前作っていた列順（B=氏名, C=入学期, D=メール）
const OLD_SETUP_HEADER = [
  'タイムスタンプ', 'お名前', '入学期', 'メールアドレス', '寄付先基金', '申し出金額',
  'HP掲載可否', 'メッセージ', '振込確認ステータス', '確認日', '確認者',
]
const DATA_ROW = [
  new Date('2026-05-13T11:23:00+09:00'), 'secret@example.com', '山田 太郎', '5期', '開邦雄飛応援金',
  '2口', '応援', '氏名掲載OK', '確認済', new Date('2026-05-14T00:00:00+09:00'), '会計',
]

function makeCtx(rows) {
  const sheet = {
    getLastRow: () => rows.length,
    getRange: (r, c, nr, nc) => ({ getValues: () => rows.slice(r - 1, r - 1 + nr).map((x) => x.slice(c - 1, c - 1 + nc)) }),
  }
  const ss = { getSheetByName: () => sheet, getSheets: () => [sheet] }
  const ctx = createGasContext({
    PropertiesService: makePropertiesService({ SPREADSHEET_ID: 'X' }),
    SpreadsheetApp: { openById: () => ss, getActive: () => ss },
  })
  loadGasFile(ctx, DONATIONS_PATH)
  return ctx
}

describe('Donations.js 見出し行ガード', () => {
  it('想定の列順なら公開用データを返す', () => {
    const out = callGas(makeCtx([GOOD_HEADER, DATA_ROW]), 'buildPayload_')
    expect(out.error).toBeUndefined()
    expect(out.donors[0].name).toBe('山田 太郎')
    expect(out.totalAmount).toBe(20000)
  })

  it('見出しが食い違えば schema_mismatch を返し、データを含めない', () => {
    const row = [DATA_ROW[0], '山田 太郎', '5期', 'secret@example.com', ...DATA_ROW.slice(4)]
    const out = callGas(makeCtx([OLD_SETUP_HEADER, row]), 'buildPayload_')
    expect(out).toEqual({ error: 'schema_mismatch' })
    expect(JSON.stringify(out)).not.toContain('secret@example.com')
  })

  it('メール列が C/D に紛れた見出しは拒否する', () => {
    const h = [...GOOD_HEADER]
    h[3] = '入学期メールアドレス'
    expect(callGas(makeCtx([h, DATA_ROW]), 'buildPayload_')).toEqual({ error: 'schema_mismatch' })
  })

  it('見出しのみ（回答 0 件）でも想定列順なら空の集計を返す', () => {
    const out = callGas(makeCtx([GOOD_HEADER]), 'buildPayload_')
    expect(out.donors).toEqual([])
  })
})

describe('Setup.js の HEADERS は Donations.js の列順と一致する', () => {
  it('C=お名前 / D=入学期 / I=振込確認 で、B がメール', () => {
    const ctx = makeCtx([GOOD_HEADER])
    loadGasFile(ctx, SETUP_PATH)
    const headers = evalGas(ctx, 'HEADERS.slice()')
    expect(callGas(ctx, 'headerMatches_', [headers])).toBe(true)
    expect(headers[1]).toContain('メール')
  })
})

/**
 * 開邦雄飛会 寄付集計 Web アプリ
 *
 * バインド先スプレッドシートのフォーム回答シートから「確認済」レコードを集計し、
 * GitHub Actions が取得できる JSON を返す。
 *
 * シート列定義 (2026-05-04 のフォーム改修反映):
 *   A(0) タイムスタンプ           Form 自動
 *   B(1) Email Address            Form  ※外部に出さない
 *   C(2) お名前                   Form
 *   D(3) 入学期                   Form
 *   E(4) 寄付先基金               Form  ※固定文言（金額算出には使わない）
 *   F(5) 寄付口数                 Form  ※"1口" / "2口" / "3口" / "その他"。1口 = 10,000円換算
 *   G(6) メッセージ（任意）       Form
 *   H(7) HP掲載の可否             Form  ※"氏名掲載OK" / "匿名希望"
 *   I(8) 振込確認ステータス       会計   ※"未確認" / "確認済" / "キャンセル"
 *   J(9) 確認日                   会計
 *   K(10) 確認者                  会計
 *
 * デプロイ:
 *   1. clasp push
 *   2. setupAll() を1回実行（Sheet/Form 作成 + Token 生成）
 *   3. clasp deploy（Web アプリ: 実行=自分 / アクセス=全員）
 *   4. URL を GitHub Secrets DONATIONS_ENDPOINT_URL に登録
 *   5. スクリプトプロパティから DONATIONS_TOKEN を控えて（ログには末尾4桁のみ）
 *      GitHub Secrets DONATIONS_ENDPOINT_TOKEN に登録
 */

const SHEET_NAME = 'donations'
const FUND_LABEL = '開邦雄飛応援金'
const STATUS_CONFIRMED = '確認済'
const PUBLISH_OK_VALUES = ['氏名掲載OK', '氏名で掲載OK'] // 旧表記との互換のため両方許容
const AMOUNT_PER_UNIT = 10000 // 1口 = 10,000円

// 列インデックス (0-based)
const COL_NAME = 2          // C
const COL_PERIOD = 3        // D 入学期
const COL_UNITS = 5         // F 寄付口数
const COL_MESSAGE = 6       // G
const COL_PUBLISH = 7       // H
const COL_STATUS = 8        // I
const COL_CONFIRMED_AT = 9  // J

function doGet(e) {
  const token = (e && e.parameter && e.parameter.token) || ''
  const props = PropertiesService.getScriptProperties()
  const expected = props.getProperty('DONATIONS_TOKEN')

  if (!expected || token !== expected) {
    return ContentService
      .createTextOutput('forbidden')
      .setMimeType(ContentService.MimeType.TEXT)
  }

  try {
    // トークンの回転は Web から呼べない。GAS エディタで rotateDonationsToken()（Setup.js）を実行する。
    const payload = buildPayload_()
    return ContentService
      .createTextOutput(JSON.stringify(payload))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: String(err && err.message || err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function buildPayload_() {
  const sheet = findDonationsSheet_()
  if (!sheet) throw new Error('Donations sheet not found')

  const lastRow = sheet.getLastRow()
  // 見出し行が想定の列順でなければ、公開用データ（特にメール列の取り違え）を返さない
  if (lastRow >= 1 && !headerMatches_(sheet.getRange(1, 1, 1, 11).getValues()[0])) {
    return { error: 'schema_mismatch' }
  }
  if (lastRow < 2) {
    return emptyPayload_()
  }

  const range = sheet.getRange(2, 1, lastRow - 1, 11) // A2:K
  const rows = range.getValues()
  const confirmed = rows.filter(function (r) { return String(r[COL_STATUS]).trim() === STATUS_CONFIRMED })

  const donors = confirmed
    .filter(function (r) {
      const v = String(r[COL_PUBLISH] || '').trim()
      return PUBLISH_OK_VALUES.indexOf(v) >= 0
    })
    .map(function (r) {
      return {
        name: String(r[COL_NAME] || '').trim(),
        period: String(r[COL_PERIOD] || '').trim(),
        amount: rowAmount_(r),
        message: String(r[COL_MESSAGE] || '').trim(),
        confirmedAt: formatDate_(r[COL_CONFIRMED_AT]),
      }
    })
    .filter(function (d) { return d.name.length > 0 })

  const totalAmount = confirmed.reduce(function (sum, r) { return sum + rowAmount_(r) }, 0)

  return {
    fetchedAt: new Date().toISOString(),
    fund: FUND_LABEL,
    totalAmount: totalAmount,
    donorCount: confirmed.length,
    donors: donors,
  }
}

/**
 * 見出し行が COL_* の想定と合っているか確認する。
 *   氏名(C)=「名前」or「氏名」を含む / 入学期(D)=「入学期」を含む / ステータス(I)=「振込確認」を含む
 *   かつ C・D・G・H にメール列が紛れていないこと。
 */
function headerMatches_(h) {
  function t(i) { return String(h[i] === undefined || h[i] === null ? '' : h[i]).trim() }
  const hasMail = function (i) { return /メール|mail/i.test(t(i)) }
  if (!/名前|氏名/.test(t(COL_NAME))) return false
  if (t(COL_PERIOD).indexOf('入学期') < 0) return false
  if (t(COL_STATUS).indexOf('振込確認') < 0) return false
  if (hasMail(COL_NAME) || hasMail(COL_PERIOD) || hasMail(COL_MESSAGE) || hasMail(COL_PUBLISH)) return false
  return true
}

function findDonationsSheet_() {
  const props = PropertiesService.getScriptProperties()
  const ssId = props.getProperty('SPREADSHEET_ID')
  const ss = ssId ? SpreadsheetApp.openById(ssId) : SpreadsheetApp.getActive()
  if (!ss) throw new Error('Spreadsheet not found. Set SPREADSHEET_ID via bootstrapStandalone() or bind script to a sheet.')
  const named = ss.getSheetByName(SHEET_NAME)
  if (named) return named
  const sheets = ss.getSheets()
  for (let i = sheets.length - 1; i >= 0; i--) {
    const name = sheets[i].getName()
    if (name.indexOf('フォームの回答') === 0 || name.indexOf('Form Responses') === 0) return sheets[i]
  }
  return sheets[0] || null
}

function emptyPayload_() {
  return {
    fetchedAt: new Date().toISOString(),
    fund: FUND_LABEL,
    totalAmount: 0,
    donorCount: 0,
    donors: [],
  }
}

/**
 * 1 行から金額を取り出す。
 * F 列「寄付口数」が "1口" / "2口" / "3口" の場合: 口数 × 10,000円
 * "その他" の場合: 任意金額が入る（運用で別の列に金額が来る場合は要拡張）
 * 互換性のため "10,000円" など金額直書きの旧形式も許容。
 */
function rowAmount_(r) {
  const v = String(r[COL_UNITS] || '').trim()
  if (!v) return 0
  // 口数フォーマット: "1口", "2口" ...
  const unitMatch = v.match(/^(\d+)\s*口/)
  if (unitMatch) return Number(unitMatch[1]) * AMOUNT_PER_UNIT
  // "その他" のみ書かれた場合は 1口換算で 10,000円
  if (v === 'その他') return AMOUNT_PER_UNIT
  // 旧形式 "10,000円" 等の数値直書き
  return toNumber_(v)
}

function toNumber_(v) {
  if (typeof v === 'number') return v
  if (!v) return 0
  const n = Number(String(v).replace(/[^\d.-]/g, ''))
  return isFinite(n) ? n : 0
}

function formatDate_(v) {
  if (!v) return ''
  if (v instanceof Date) {
    const yyyy = v.getFullYear()
    const mm = String(v.getMonth() + 1).padStart(2, '0')
    const dd = String(v.getDate()).padStart(2, '0')
    return yyyy + '-' + mm + '-' + dd
  }
  return String(v)
}

/**
 * GAS エディタから手動で実行して動作確認するためのテスト関数。
 */
function testBuildPayload() {
  const payload = buildPayload_()
  Logger.log(JSON.stringify(payload, null, 2))
}

/**
 * 開邦雄飛会 寄付集計 Web アプリ
 *
 * バインド先スプレッドシートのフォーム回答シートから「確認済」レコードを集計し、
 * GitHub Actions が取得できる JSON を返す。
 *
 * シート列定義（Form 連携で自動生成される A〜H + 会計の I〜K）:
 *   A(0) タイムスタンプ           Form 自動
 *   B(1) お名前                   Form
 *   C(2) 入学期                   Form
 *   D(3) メールアドレス           Form  ※外部に出さない
 *   E(4) 寄付金額                 Form  ※"10,000円" or "その他（次の質問で金額を記入）"
 *   F(5) その他の場合の金額(円)   Form  ※E が「その他」のときのみ入力
 *   G(6) メッセージ（任意）       Form
 *   H(7) お名前のHP掲載について   Form  ※"氏名で掲載OK" / "匿名希望" / "掲載不要"
 *   I(8) 振込確認ステータス       会計   ※"未確認" / "確認済" / "キャンセル"
 *   J(9) 確認日                   会計
 *   K(10) 確認者                  会計
 *
 * デプロイ:
 *   1. clasp push
 *   2. setupAll() を1回実行（Sheet/Form 作成 + Token 生成）
 *   3. clasp deploy（Web アプリ: 実行=自分 / アクセス=全員）
 *   4. URL を GitHub Secrets DONATIONS_ENDPOINT_URL に登録
 *   5. setupAll の実行ログから DONATIONS_TOKEN を控えて
 *      GitHub Secrets DONATIONS_ENDPOINT_TOKEN に登録
 */

const SHEET_NAME = 'donations'
const FUND_LABEL = '開邦雄飛応援金'
const STATUS_CONFIRMED = '確認済'
const PUBLISH_OK = '氏名で掲載OK'

function doGet(e) {
  const token = (e && e.parameter && e.parameter.token) || ''
  const expected = PropertiesService.getScriptProperties().getProperty('DONATIONS_TOKEN')

  if (!expected || token !== expected) {
    return ContentService
      .createTextOutput('forbidden')
      .setMimeType(ContentService.MimeType.TEXT)
  }

  try {
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
  if (lastRow < 2) {
    return emptyPayload_()
  }

  const range = sheet.getRange(2, 1, lastRow - 1, 11) // A2:K
  const rows = range.getValues()
  const confirmed = rows.filter(function (r) { return String(r[8]).trim() === STATUS_CONFIRMED })

  const donors = confirmed
    .filter(function (r) { return String(r[7]).trim() === PUBLISH_OK })
    .map(function (r) {
      return {
        name: String(r[1] || '').trim(),
        period: String(r[2] || '').trim(),
        amount: rowAmount_(r),
        message: String(r[6] || '').trim(),
        confirmedAt: formatDate_(r[9]),
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

function findDonationsSheet_() {
  const ss = SpreadsheetApp.getActive()
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
 * 列 E（寄付金額）が「その他...」の場合は列 F の数値を、それ以外は列 E から数値を抽出。
 */
function rowAmount_(r) {
  const choice = String(r[4] || '')
  if (choice.indexOf('その他') >= 0) {
    return toNumber_(r[5])
  }
  return toNumber_(choice) // "10,000円" → 10000
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

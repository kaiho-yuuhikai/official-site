/**
 * 開邦雄飛会 事業計画申請フォーム① 事業ID自動採番 GAS
 *
 * フォーム① の応答スプレッドシートに紐付け、onFormSubmit トリガーで
 * 事業IDを自動採番して列に書き込み、申請者にメールで通知する。
 *
 * シート列定義（フォーム連携で自動生成される列 + 採番列）:
 *   1: タイムスタンプ        Form 自動
 *   2: メールアドレス        Form
 *   3: 事業ID               GAS が採番（本スクリプト）
 *   4: 事業名               Form
 *   ... （以降フォーム項目）
 *
 * 採番規則:
 *   ①-001, ①-002, ... 単調増加。歯抜けは埋めない。
 *
 * デプロイ:
 *   1. clasp push
 *   2. GAS エディタで「トリガー → トリガーを追加」
 *      - 関数: onFormSubmit
 *      - イベント: スプレッドシートから / フォーム送信時
 */

var COL_TIMESTAMP = 1
var COL_EMAIL = 2
var COL_PROJECT_ID = 3
var COL_PROJECT_NAME = 4

function formatProjectId(n) {
  var s = String(n)
  while (s.length < 3) s = '0' + s
  return '①-' + s
}

function parseProjectIdNumber(id) {
  if (id === null || id === undefined) return null
  var m = String(id).match(/^①-(\d+)$/)
  return m ? Number(m[1]) : null
}

function nextProjectId(existingIds) {
  var max = 0
  for (var i = 0; i < (existingIds || []).length; i++) {
    var n = parseProjectIdNumber(existingIds[i])
    if (typeof n === 'number' && !isNaN(n) && n > max) {
      max = n
    }
  }
  return formatProjectId(max + 1)
}

function composeNotificationEmail(projectId, projectName) {
  var name = projectName || '(未記入)'
  return {
    subject: '[開邦雄飛会] 事業ID ' + projectId + ' を発行しました',
    body: [
      '事業計画申請を受け付けました。',
      '',
      '事業ID: ' + projectId,
      '事業名: ' + name,
      '',
      '事業実施後は、報告フォームで上記の事業IDを入力してください。',
      '',
      '開邦雄飛会',
    ].join('\n'),
  }
}

/**
 * フォーム送信トリガーから呼ばれる。
 * 引数 e は Apps Script のフォーム送信イベントオブジェクト。
 *   e.range: 新規追加された行の Range
 *   e.namedValues: { 列名: [値] }
 */
function onFormSubmit(e) {
  var sheet = e.range.getSheet()
  var newRow = e.range.getRow()

  var lastRow = sheet.getLastRow()
  var existingIds = []
  if (lastRow >= 2) {
    var range = sheet.getRange(2, COL_PROJECT_ID, lastRow - 1, 1)
    var values = range.getValues()
    for (var i = 0; i < values.length; i++) {
      existingIds.push(values[i][0])
    }
  }

  var nextId = nextProjectId(existingIds)
  sheet.getRange(newRow, COL_PROJECT_ID).setValue(nextId)

  var email = pickNamedValue_(e, ['メールアドレス', 'Email Address', 'email'])
  var projectName = pickNamedValue_(e, ['事業名', '事業名（確認用）'])
  if (email) {
    var mail = composeNotificationEmail(nextId, projectName)
    MailApp.sendEmail({ to: email, subject: mail.subject, body: mail.body })
  }
}

function pickNamedValue_(e, candidates) {
  if (!e || !e.namedValues) return ''
  for (var i = 0; i < candidates.length; i++) {
    var v = e.namedValues[candidates[i]]
    if (v && v.length && String(v[0]).trim()) return String(v[0]).trim()
  }
  return ''
}

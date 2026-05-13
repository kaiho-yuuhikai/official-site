/**
 * 開邦雄飛会 寄付システム 一括セットアップ
 *
 * 初回のみ実行する関数群。
 * 既に資源が作成済みの場合は Script Properties に保存されている ID を再利用する。
 *
 * 実行手順:
 *   1. このスクリプトを clasp push 後、GAS エディタで開く
 *   2. 関数 setupAll を選んで「実行」（初回は権限承認が走る）
 *   3. 実行ログに出力される SPREADSHEET_URL / FORM_PUBLIC_URL を控える
 *   4. ログに表示される DONATIONS_TOKEN を GitHub Secrets に登録
 *
 * 連動して保存される Script Properties:
 *   SPREADSHEET_ID    作成 or 紐付け済みのスプレッドシート ID
 *   FORM_ID           作成済みフォーム ID
 *   DONATIONS_TOKEN   doGet() の認可トークン（自動生成）
 */

const SETUP_SPREADSHEET_TITLE = '開邦雄飛会 寄付申し出データ'
const SETUP_FORM_TITLE = '開邦雄飛会 寄付申し出フォーム'

const HEADERS = [
  'タイムスタンプ',
  'お名前',
  '入学期',
  'メールアドレス',
  '寄付先基金',
  '申し出金額',
  'HP掲載可否',
  'メッセージ',
  '振込確認ステータス',
  '確認日',
  '確認者',
]

const STATUS_VALUES = ['未確認', '確認済', 'キャンセル']
const PUBLISH_OPTIONS = ['氏名で掲載OK', '匿名希望', '掲載不要']
const PERIOD_OPTIONS = (function () {
  const arr = []
  for (let i = 1; i <= 38; i++) arr.push(i + '期')
  arr.push('関係者')
  return arr
})()

function setupAll() {
  const props = PropertiesService.getScriptProperties()

  const ss = ensureSpreadsheet_(props)
  const form = ensureForm_(props, ss)
  ensureToken_(props)
  ensureSheetStructure_(ss, form)

  const formPublicUrl = form.getPublishedUrl()
  const ssUrl = ss.getUrl()
  const token = props.getProperty('DONATIONS_TOKEN')

  Logger.log('===== 開邦雄飛会 寄付システム セットアップ完了 =====')
  Logger.log('SPREADSHEET_URL:    ' + ssUrl)
  Logger.log('SPREADSHEET_ID:     ' + ss.getId())
  Logger.log('FORM_PUBLIC_URL:    ' + formPublicUrl)
  Logger.log('FORM_ID:            ' + form.getId())
  Logger.log('DONATIONS_TOKEN:    ' + token)
  Logger.log('')
  Logger.log('次のステップ:')
  Logger.log('1. このスクリプトを Web アプリとしてデプロイ（実行: 自分 / アクセス: 全員）')
  Logger.log('2. デプロイ URL を控えて GitHub Secrets DONATIONS_ENDPOINT_URL に登録')
  Logger.log('3. 上記 DONATIONS_TOKEN を GitHub Secrets DONATIONS_ENDPOINT_TOKEN に登録')
  Logger.log('4. pages/index.vue の donationFormUrl を上記 FORM_PUBLIC_URL に差し替え')

  return {
    spreadsheetUrl: ssUrl,
    spreadsheetId: ss.getId(),
    formPublicUrl: formPublicUrl,
    formId: form.getId(),
    donationsToken: token,
  }
}

function ensureSpreadsheet_(props) {
  const id = props.getProperty('SPREADSHEET_ID')
  if (id) {
    try {
      return SpreadsheetApp.openById(id)
    } catch (e) {
      Logger.log('Spreadsheet ID stored but inaccessible. Recreating: ' + e)
    }
  }
  const ss = SpreadsheetApp.create(SETUP_SPREADSHEET_TITLE)
  props.setProperty('SPREADSHEET_ID', ss.getId())
  Logger.log('Created spreadsheet: ' + ss.getUrl())
  return ss
}

function ensureForm_(props, ss) {
  const id = props.getProperty('FORM_ID')
  if (id) {
    try {
      return FormApp.openById(id)
    } catch (e) {
      Logger.log('Form ID stored but inaccessible. Recreating: ' + e)
    }
  }

  const form = FormApp.create(SETUP_FORM_TITLE)
  form.setTitle(SETUP_FORM_TITLE)
  form.setDescription([
    '開邦雄飛会基金へのご寄付の申し出フォームです。',
    'フォーム送信後、ご記入いただいたメールアドレス宛に振込先口座情報を返信いたします。',
    '',
    '【入学期早見表】',
    '1期＝1986年度入学／14期＝1999年度入学／20期＝2005年度入学（参考）',
  ].join('\n'))
  form.setCollectEmail(false)
  form.setProgressBar(true)

  // Q1: 氏名
  form.addTextItem().setTitle('お名前').setRequired(true)

  // Q2: 入学期
  form.addListItem().setTitle('入学期').setChoiceValues(PERIOD_OPTIONS).setRequired(true)

  // Q3: メールアドレス
  const emailItem = form.addTextItem().setTitle('メールアドレス').setRequired(true)
  const emailValidation = FormApp.createTextValidation()
    .setHelpText('メールアドレスの形式で入力してください')
    .requireTextIsEmail()
    .build()
  emailItem.setValidation(emailValidation)

  // Q4: 寄付先基金（情報のみ）
  form.addSectionHeaderItem()
    .setTitle('寄付先基金: 開邦雄飛会基金')
    .setHelpText('現在は「開邦雄飛会基金」の1本に統一しています。在校生の探究活動・同窓生の活動支援・運営費に充当されます。')

  // Q5: 寄付金額
  form.addMultipleChoiceItem()
    .setTitle('寄付金額')
    .setChoiceValues(['10,000円', 'その他（次の質問で金額を記入）'])
    .setRequired(true)

  // Q6: その他金額
  form.addTextItem()
    .setTitle('その他の場合の金額（円）')
    .setHelpText('上記で「その他」を選んだ場合のみ、半角数字で金額を入力してください')

  // Q7: メッセージ
  form.addParagraphTextItem()
    .setTitle('メッセージ（任意）')
    .setHelpText('応援メッセージなどあればご記入ください')

  // Q8: HP掲載可否
  form.addMultipleChoiceItem()
    .setTitle('お名前のHP掲載について')
    .setChoiceValues(PUBLISH_OPTIONS)
    .setRequired(true)

  // Link to spreadsheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId())

  props.setProperty('FORM_ID', form.getId())
  Logger.log('Created form: ' + form.getPublishedUrl())
  return form
}

function ensureToken_(props) {
  let token = props.getProperty('DONATIONS_TOKEN')
  if (token && token.length >= 32) return token
  token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '')
  props.setProperty('DONATIONS_TOKEN', token)
  Logger.log('Generated DONATIONS_TOKEN')
  return token
}

/**
 * Form を Sheet に連携すると「フォームの回答 1」タブが新規作成される。
 * このタブを SHEET_NAME (donations.js の定数) と同じ名前にリネームし、
 * かつ会計用の I/J/K 列ヘッダーとデータ検証を追加する。
 */
function ensureSheetStructure_(ss, form) {
  const desiredName = SHEET_NAME // from Donations.js
  let target = ss.getSheetByName(desiredName)

  if (!target) {
    // フォームの回答シート（最後に追加されたシートを優先）を探す
    const sheets = ss.getSheets()
    for (let i = sheets.length - 1; i >= 0; i--) {
      const s = sheets[i]
      const name = s.getName()
      if (name.indexOf('フォームの回答') === 0 || name.indexOf('Form Responses') === 0) {
        s.setName(desiredName)
        target = s
        break
      }
    }
  }

  if (!target) {
    // どうしても見つからない場合は最初のシートをリネーム
    target = ss.getSheets()[0]
    target.setName(desiredName)
  }

  // 既存の Form 由来ヘッダー (A〜H) を残しつつ、I/J/K を上書き
  target.getRange(1, 9, 1, 3).setValues([['振込確認ステータス', '確認日', '確認者']])

  // I列にデータ検証
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_VALUES, true)
    .setAllowInvalid(false)
    .setHelpText('未確認 / 確認済 / キャンセル のいずれかを選択')
    .build()
  target.getRange(2, 9, 1000, 1).setDataValidation(statusRule)

  // J列の日付フォーマット
  target.getRange(2, 10, 1000, 1).setNumberFormat('yyyy-mm-dd')

  // 不要な「シート1」を削除（フォームと連携しないなら残しておく必要なし）
  const sheets = ss.getSheets()
  for (const s of sheets) {
    if (s.getName() === 'シート1' && s.getSheetId() !== target.getSheetId()) {
      ss.deleteSheet(s)
    }
  }

  // ヘッダー行を太字 + 凍結
  target.getRange(1, 1, 1, 11).setFontWeight('bold')
  target.setFrozenRows(1)
}

/**
 * デバッグ用: 現在保存されている Properties を表示
 * 注意: 秘匿値 (LW_PRIVATE_KEY / TOKEN 等) は redact してログ出力する。
 */
function showProperties() {
  const props = PropertiesService.getScriptProperties().getProperties()
  const SENSITIVE_KEYS = ['LW_PRIVATE_KEY', 'LW_CLIENT_SECRET', 'DONATIONS_TOKEN']
  const redacted = {}
  for (const k of Object.keys(props)) {
    if (SENSITIVE_KEYS.indexOf(k) >= 0) {
      const v = String(props[k] || '')
      redacted[k] = v ? '***(length=' + v.length + ')' : '(empty)'
    } else {
      redacted[k] = props[k]
    }
  }
  Logger.log(JSON.stringify(redacted, null, 2))
}

/**
 * LINE WORKS Bot 通知用の Script Properties を一括投入する (Issue #20)。
 *
 * Phase 1 (LINE WORKS Developer Console) で取得した 6 点 + ADMIN_EMAIL を引数で渡す。
 * GAS エディタから呼ぶ場合は params を直接書く / clasp run-function でも可。
 *
 * 例:
 *   setupLineWorksProperties({
 *     LW_CLIENT_ID:       '...',
 *     LW_CLIENT_SECRET:   '...',
 *     LW_SERVICE_ACCOUNT: 'xxx.serviceaccount@<domain>',
 *     LW_PRIVATE_KEY:     '<<PEM形式の秘密鍵テキスト (改行込み)>>',
 *     LW_BOT_ID:          '12345678',
 *     LW_CHANNEL_ID:      '...',
 *     ADMIN_EMAIL:        'admin@example.com',
 *   })
 *
 * 注意: コードにハードコードして clasp push しないこと。
 *       GAS エディタの「実行」入力欄に引数を貼り付けるか、
 *       「プロジェクト設定 → スクリプトプロパティ」から手入力する。
 */
function setupLineWorksProperties(params) {
  if (!params || typeof params !== 'object') {
    throw new Error('setupLineWorksProperties: params (object) is required')
  }
  const REQUIRED = ['LW_CLIENT_ID', 'LW_CLIENT_SECRET', 'LW_SERVICE_ACCOUNT', 'LW_PRIVATE_KEY', 'LW_BOT_ID', 'LW_CHANNEL_ID']
  const missing = []
  for (const k of REQUIRED) {
    if (!params[k]) missing.push(k)
  }
  if (missing.length > 0) {
    throw new Error('setupLineWorksProperties: 必須キーが不足 (missing: ' + missing.join(', ') + ')')
  }
  const props = PropertiesService.getScriptProperties()
  for (const k of REQUIRED) {
    props.setProperty(k, String(params[k]))
  }
  if (params.ADMIN_EMAIL) {
    props.setProperty('ADMIN_EMAIL', String(params.ADMIN_EMAIL))
  }
  Logger.log('LINE WORKS Properties を設定しました: ' + REQUIRED.join(', ') +
    (params.ADMIN_EMAIL ? ', ADMIN_EMAIL' : ''))
  return { saved: REQUIRED.concat(params.ADMIN_EMAIL ? ['ADMIN_EMAIL'] : []) }
}

/**
 * フォーム送信トリガーを 1 個だけ登録する (Issue #20)。
 *
 * 既に同名トリガーがある場合は削除してから再登録する (重複登録を回避)。
 *
 * 実行は GAS エディタで関数 installFormSubmitTrigger を選んで「▶ 実行」。
 * 初回は権限承認が走る (UrlFetchApp / MailApp / Spreadsheet)。
 */
function installFormSubmitTrigger() {
  const props = PropertiesService.getScriptProperties()
  const ssId = props.getProperty('SPREADSHEET_ID')
  if (!ssId) throw new Error('SPREADSHEET_ID 未設定。runBootstrap を先に実行してください。')
  const ss = SpreadsheetApp.openById(ssId)

  // 既存の onFormSubmit トリガーを削除
  const existing = ScriptApp.getProjectTriggers()
  let removed = 0
  for (const t of existing) {
    if (t.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(t)
      removed++
    }
  }

  // 新規登録 (Sheet ベースの onFormSubmit)
  ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(ss).onFormSubmit().create()
  Logger.log('installFormSubmitTrigger: removed=' + removed + ' / installed=1')
  return { removed: removed, installed: 1 }
}

/**
 * 登録済みトリガーを全て削除する (緊急停止用)。
 */
function uninstallAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers()
  for (const t of triggers) ScriptApp.deleteTrigger(t)
  Logger.log('uninstallAllTriggers: removed=' + triggers.length)
  return { removed: triggers.length }
}

/**
 * 既存のスプレッドシート/フォームを再利用するケース用。
 * setupAll() は新規作成も含むため、既存リソースを使う場合はこちらを実行する。
 *
 * 動作:
 *   - DONATIONS_TOKEN を生成（既にあれば再利用）してログに出力
 *   - スプレッドシート構造（I/J/K列、データ検証）は触らない
 *
 * 用途:
 *   - 既に運営側でフォーム + スプレッドシートが作成されている前提で、
 *     エンドポイント認証用トークンだけを発行したいとき
 */
function bootstrapToken() {
  const props = PropertiesService.getScriptProperties()
  const token = ensureToken_(props)
  Logger.log('===== DONATIONS_TOKEN =====')
  Logger.log(token)
  Logger.log('===========================')
  Logger.log('GitHub Secrets DONATIONS_ENDPOINT_TOKEN にこの値を登録してください。')
  return token
}

/**
 * スタンドアロンスクリプト（スプレッドシート非バインド）として運用するための初期化。
 *
 * 使い方:
 *   1. Apps Script エディタで対象のスプレッドシート ID を引数に渡して実行
 *      例: bootstrapStandalone('1Y5S1uwFnRILxT19NSh90O0v4qfP-_0ERtORczJcIFik')
 *   2. もしくは clasp run-function bootstrapStandalone --params '["<sheet_id>"]'
 *
 * 動作:
 *   - SPREADSHEET_ID を Script Properties に保存
 *   - DONATIONS_TOKEN を生成（既にあれば再利用）
 *   - ログに両方を出力
 *
 * 注意: Donations.js の findDonationsSheet_() は SPREADSHEET_ID があれば openById を、
 *       なければ getActive() を使う。スタンドアロン運用では必ずこの関数を1回実行すること。
 */
function bootstrapStandalone(spreadsheetId) {
  if (!spreadsheetId || typeof spreadsheetId !== 'string') {
    throw new Error('spreadsheetId (string) is required. Example: bootstrapStandalone("1Y5S1uw...")')
  }
  const props = PropertiesService.getScriptProperties()
  // 事前にアクセスチェック
  const ss = SpreadsheetApp.openById(spreadsheetId)
  Logger.log('Spreadsheet name: ' + ss.getName())

  props.setProperty('SPREADSHEET_ID', spreadsheetId)
  const token = ensureToken_(props)

  Logger.log('===== Standalone bootstrap complete =====')
  Logger.log('SPREADSHEET_ID:  ' + spreadsheetId)
  Logger.log('DONATIONS_TOKEN: ' + token)
  Logger.log('=========================================')
  Logger.log('GitHub Secrets DONATIONS_ENDPOINT_TOKEN に上記 TOKEN を、')
  Logger.log('Web アプリ URL を DONATIONS_ENDPOINT_URL に登録してください。')

  return {
    spreadsheetId: spreadsheetId,
    spreadsheetName: ss.getName(),
    donationsToken: token,
  }
}

/**
 * GAS エディタの「▶ 実行」ボタンから引数なしで動かすための入口。
 * 寄付スプレッドシート (1Y5S1...) を Script Properties に登録し、TOKEN を生成する。
 * 実行は kaihoyuuhikai@gmail.com（スプレッドシート所有者）で行うこと。
 */
function runBootstrap() {
  return bootstrapStandalone('1Y5S1uwFnRILxT19NSh90O0v4qfP-_0ERtORczJcIFik')
}

/**
 * Issue #3 対応: 寄付スプレッドシートに振込確認列 (I/J/K) とデータ検証を追加する。
 * 既存の I/J/K 列に内容があれば上書きせず、空なら設定する。
 *
 * 使い方: GAS エディタで関数 runSetupSheetColumns を選んで「▶ 実行」
 *
 * 効果:
 *   - 列ヘッダー: I=振込確認ステータス / J=確認日 / K=確認者
 *   - I 列にデータ検証 (未確認 / 確認済 / キャンセル) を追加
 *   - J 列の表示形式を yyyy-mm-dd に
 *   - ヘッダー行を太字 + 凍結
 *   - シート名を donations にリネーム (フォーム回答シートが対象)
 */
function runSetupSheetColumns() {
  const props = PropertiesService.getScriptProperties()
  const ssId = props.getProperty('SPREADSHEET_ID')
  if (!ssId) {
    throw new Error('SPREADSHEET_ID が未設定です。先に runBootstrap を実行してください。')
  }
  const ss = SpreadsheetApp.openById(ssId)

  // 対象シートを特定（フォーム回答シート優先）
  let target = ss.getSheetByName(SHEET_NAME)
  if (!target) {
    const sheets = ss.getSheets()
    for (let i = sheets.length - 1; i >= 0; i--) {
      const name = sheets[i].getName()
      if (name.indexOf('フォームの回答') === 0 || name.indexOf('Form Responses') === 0) {
        sheets[i].setName(SHEET_NAME)
        target = sheets[i]
        break
      }
    }
  }
  if (!target) target = ss.getSheets()[0]

  // I/J/K のヘッダーを設定
  target.getRange(1, 9, 1, 3).setValues([['振込確認ステータス', '確認日', '確認者']])

  // I列にデータ検証
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_VALUES, true)
    .setAllowInvalid(false)
    .setHelpText('未確認 / 確認済 / キャンセル のいずれかを選択')
    .build()
  target.getRange(2, 9, 1000, 1).setDataValidation(statusRule)

  // J列の日付フォーマット
  target.getRange(2, 10, 1000, 1).setNumberFormat('yyyy-mm-dd')

  // ヘッダー行を太字 + 凍結
  target.getRange(1, 1, 1, 11).setFontWeight('bold')
  target.setFrozenRows(1)

  Logger.log('===== Sheet columns setup complete =====')
  Logger.log('Sheet name: ' + target.getName())
  Logger.log('Headers (A〜K): ' + target.getRange(1, 1, 1, 11).getValues()[0].join(' | '))
  Logger.log('Data validation: I 列にプルダウン (' + STATUS_VALUES.join(' / ') + ')')
  Logger.log('========================================')

  return {
    sheetName: target.getName(),
    headers: target.getRange(1, 1, 1, 11).getValues()[0],
  }
}

/**
 * Issue #5 (本番疎通テスト) の自動化補助:
 * テスト用の寄付申し出行をスプレッドシートに直接挿入する。
 * 通常はフォーム送信から流すが、関係者集めずにエンドツーエンドを検証したい時用。
 *
 * 使い方: GAS エディタで関数 addSmokeTestRow を選んで「▶ 実行」
 *
 * 挿入される行:
 *   B(氏名)=「テスト太郎」 / C(入学期)=「14期」 / D(メール)=「test@example.com」
 *   E(寄付金額)=「10,000円」 / G(メッセージ)=「疎通テスト」 / H(掲載)=「氏名で掲載OK」
 *   I(ステータス)=「確認済」 / J(確認日)=今日 / K(確認者)=「自動テスト」
 *
 * 戻り値の行番号を控え、後で deleteSmokeTestRow(rowNumber) で削除できる。
 */
function addSmokeTestRow() {
  const props = PropertiesService.getScriptProperties()
  const ssId = props.getProperty('SPREADSHEET_ID')
  if (!ssId) throw new Error('SPREADSHEET_ID 未設定。先に runBootstrap を実行してください。')
  const ss = SpreadsheetApp.openById(ssId)
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0]

  const today = new Date()
  const row = [
    today,                  // A: タイムスタンプ
    'テスト太郎',           // B: お名前
    '14期',                 // C: 入学期
    'test@example.com',     // D: メールアドレス
    '10,000円',             // E: 寄付金額
    '',                     // F: その他金額
    '疎通テスト（後で削除）', // G: メッセージ
    '氏名で掲載OK',         // H: HP掲載可否
    '確認済',               // I: 振込確認ステータス
    today,                  // J: 確認日
    '自動テスト',           // K: 確認者
  ]
  sheet.appendRow(row)
  const rowNumber = sheet.getLastRow()

  Logger.log('===== Smoke test row inserted =====')
  Logger.log('Row number: ' + rowNumber + ' — 後で deleteSmokeTestRow(' + rowNumber + ') で削除できます')
  Logger.log('===================================')
  return { rowNumber: rowNumber }
}

/**
 * addSmokeTestRow で挿入した行を削除する。
 * 引数なしで呼ぶと最後の行を削除（K列が「自動テスト」のもののみ）。
 */
function deleteSmokeTestRow(rowNumber) {
  const props = PropertiesService.getScriptProperties()
  const ssId = props.getProperty('SPREADSHEET_ID')
  if (!ssId) throw new Error('SPREADSHEET_ID 未設定')
  const ss = SpreadsheetApp.openById(ssId)
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0]

  const target = rowNumber || sheet.getLastRow()
  // 安全装置: K 列が「自動テスト」のときだけ削除
  const kVal = sheet.getRange(target, 11).getValue()
  if (String(kVal) !== '自動テスト') {
    throw new Error('行 ' + target + ' は K 列が「自動テスト」ではないため削除しません (K=' + kVal + ')')
  }
  sheet.deleteRow(target)
  Logger.log('Deleted test row: ' + target)
  return { deleted: target }
}

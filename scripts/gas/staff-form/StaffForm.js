/**
 * 創立記念特設授業 当日運営スタッフ 応募フォーム セットアップ (GAS)
 *
 * Google フォーム + 回答スプレッドシートを一括作成・連携する。
 * 「調整さん」ではなく Google フォームを使うのは、希望/対応可能な役割・
 * 参加可能時間帯を構造化して集計し、配置調整まで行うため。
 *
 * 実行手順:
 *   1. clasp push でこのファイルを反映（同窓会用 Google アカウントで clasp login 済みのこと）
 *   2. GAS エディタで関数 setupStaffForm を選んで「▶ 実行」（初回は権限承認が走る）
 *   3. 実行ログの FORM_PUBLIC_URL / SPREADSHEET_URL を控える
 *   4. FORM_PUBLIC_URL を pages/activities/special-lecture.vue の
 *      staffFormUrl に差し替えてコミット & push
 *
 * 再実行しても安全（idempotent）:
 *   Script Properties に保存済みの FORM_ID / SPREADSHEET_ID があれば再利用し、
 *   フォームの設問は「作り直し」ではなく既存を開いて URL を再表示するだけ。
 *   設問を作り直したい場合は rebuildQuestions() を実行する。
 */

const STAFF_FORM_TITLE = '創立記念特設授業 当日運営スタッフ 応募フォーム'
const STAFF_SPREADSHEET_TITLE = '創立記念特設授業 当日運営スタッフ 応募一覧'

const STAFF_FORM_DESCRIPTION = [
  '開邦雄飛会「創立記念特設授業」の当日運営スタッフ応募フォームです。',
  '',
  '受付、会場案内、講師対応、各教室の進行補助、記録などを、希望や経験を踏まえて分担します。',
  '講師や参加者との交流を通して、多様な仕事や生き方に触れ、自身のキャリアを考える機会にもなります。',
  '大学生・若手卒業生をはじめ、運営に関心のある皆さまのご参加をお待ちしています。',
  '',
  '開催日: 2026年10月30日（金）／会場: 開邦中学校・高校',
  'お問い合わせ: tokusetu@kaihoyuhi.com',
].join('\n')

// 参加可能な時間帯（2026年の想定スケジュール）
const STAFF_TIME_SLOTS = [
  '13:30〜14:45（設営・受付準備）',
  '14:45〜16:35（特設授業）',
  '16:35〜17:00（片付け・移動）',
  '17:00〜18:00（生徒との懇話会）',
  '18:00〜19:00（撤収・会場整理）',
  '19:00〜21:00（卒業生懇親会）',
  '終日参加できる',
]

// 役割の選択肢（「希望する役割」「対応可能な役割」で共通利用）
const STAFF_ROLES = [
  '全体進行・本部補助',
  '受付',
  '講師の案内・対応',
  '会場誘導',
  '各教室の進行補助・タイムキーパー',
  '写真・動画撮影',
  '交流会運営',
  '設営・撤収',
]

const STAFF_TRANSPORT_OPTIONS = ['自家用車（送迎可）', '自家用車（自分のみ）', '公共交通機関', '未定・相談したい']
const STAFF_MEETING_OPTIONS = ['オンラインで参加できる', '対面で参加できる', 'どちらでも参加できる', '参加が難しい（資料共有を希望）']

/**
 * メインエントリ。フォーム + スプレッドシートを作成・連携し、URL をログ出力する。
 */
function setupStaffForm() {
  const props = PropertiesService.getScriptProperties()

  const ss = ensureStaffSpreadsheet_(props)
  const form = ensureStaffForm_(props, ss)

  const formPublicUrl = form.getPublishedUrl()
  const formEditUrl = form.getEditUrl()
  const ssUrl = ss.getUrl()

  Logger.log('===== 当日運営スタッフ 応募フォーム セットアップ完了 =====')
  Logger.log('FORM_PUBLIC_URL:  ' + formPublicUrl)
  Logger.log('FORM_EDIT_URL:    ' + formEditUrl)
  Logger.log('FORM_ID:          ' + form.getId())
  Logger.log('SPREADSHEET_URL:  ' + ssUrl)
  Logger.log('SPREADSHEET_ID:   ' + ss.getId())
  Logger.log('')
  Logger.log('次のステップ:')
  Logger.log('1. FORM_PUBLIC_URL を pages/activities/special-lecture.vue の staffFormUrl に差し替え')
  Logger.log('2. スプレッドシート / フォームを運営メンバーと共有（Drive の「共有」）')

  return {
    formPublicUrl: formPublicUrl,
    formEditUrl: formEditUrl,
    formId: form.getId(),
    spreadsheetUrl: ssUrl,
    spreadsheetId: ss.getId(),
  }
}

/**
 * 設問を作り直す（項目案の変更・役割の増減があったとき用）。
 * 既存フォームの設問を全削除してから再構築する。回答済みデータには影響しない。
 */
function rebuildQuestions() {
  const props = PropertiesService.getScriptProperties()
  const formId = props.getProperty('STAFF_FORM_ID')
  if (!formId) throw new Error('STAFF_FORM_ID 未設定。先に setupStaffForm を実行してください。')
  const form = FormApp.openById(formId)

  const items = form.getItems()
  for (let i = items.length - 1; i >= 0; i--) {
    form.deleteItem(items[i])
  }
  buildStaffQuestions_(form)
  Logger.log('設問を再構築しました: ' + form.getEditUrl())
  return { formEditUrl: form.getEditUrl() }
}

function ensureStaffSpreadsheet_(props) {
  const id = props.getProperty('STAFF_SPREADSHEET_ID')
  if (id) {
    try {
      return SpreadsheetApp.openById(id)
    } catch (e) {
      Logger.log('STAFF_SPREADSHEET_ID stored but inaccessible. Recreating: ' + e)
    }
  }
  const ss = SpreadsheetApp.create(STAFF_SPREADSHEET_TITLE)
  props.setProperty('STAFF_SPREADSHEET_ID', ss.getId())
  Logger.log('Created spreadsheet: ' + ss.getUrl())
  return ss
}

function ensureStaffForm_(props, ss) {
  const id = props.getProperty('STAFF_FORM_ID')
  if (id) {
    try {
      return FormApp.openById(id)
    } catch (e) {
      Logger.log('STAFF_FORM_ID stored but inaccessible. Recreating: ' + e)
    }
  }

  const form = FormApp.create(STAFF_FORM_TITLE)
  form.setTitle(STAFF_FORM_TITLE)
  form.setDescription(STAFF_FORM_DESCRIPTION)
  form.setCollectEmail(false)
  form.setProgressBar(true)
  form.setConfirmationMessage('ご応募ありがとうございます。事務局で内容を確認し、役割・当日の詳細について追ってご連絡します。')

  buildStaffQuestions_(form)

  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId())

  props.setProperty('STAFF_FORM_ID', form.getId())
  Logger.log('Created form: ' + form.getPublishedUrl())
  return form
}

/**
 * フォームの設問を構築する。項目案は docs / Issue の内容に対応。
 */
function buildStaffQuestions_(form) {
  // 1. 氏名
  form.addTextItem()
    .setTitle('氏名')
    .setRequired(true)

  // 2. 卒業期 / 在学生の場合は学校名・学年
  form.addTextItem()
    .setTitle('卒業期（在学生の場合は学校名・学年）')
    .setHelpText('例: 開邦高校 25期 ／ 開邦高校2年 ／ ○○大学2年（卒業生でない場合）')
    .setRequired(true)

  // 3. 連絡先
  form.addTextItem()
    .setTitle('連絡先（メールアドレスまたは電話番号）')
    .setHelpText('当日までの連絡に使用します。日中に連絡がつくものをご記入ください。')
    .setRequired(true)

  // 4. 参加可能な時間帯
  form.addCheckboxItem()
    .setTitle('参加可能な時間帯（複数選択可）')
    .setHelpText('できる範囲で構いません。時間は目安で、年度により前後します。')
    .setChoiceValues(STAFF_TIME_SLOTS)
    .setRequired(true)

  // 5. 希望する役割
  form.addCheckboxItem()
    .setTitle('希望する役割（複数選択可）')
    .setHelpText('やってみたい役割を選んでください。')
    .setChoiceValues(STAFF_ROLES)
    .showOtherOption(true)
    .setRequired(true)

  // 6. 対応可能な役割
  form.addCheckboxItem()
    .setTitle('対応可能な役割（複数選択可）')
    .setHelpText('希望とは別に「頼まれれば対応できる」役割を選んでください。配置調整の参考にします。')
    .setChoiceValues(STAFF_ROLES)
    .showOtherOption(true)
    .setRequired(false)

  // 7. 当日の交通手段
  form.addMultipleChoiceItem()
    .setTitle('当日の交通手段')
    .setChoiceValues(STAFF_TRANSPORT_OPTIONS)
    .showOtherOption(true)
    .setRequired(true)

  // 8. 事前打ち合わせへの参加可否
  form.addMultipleChoiceItem()
    .setTitle('事前打ち合わせへの参加可否')
    .setHelpText('開催前にオンライン中心で1〜2回の打ち合わせを予定しています。')
    .setChoiceValues(STAFF_MEETING_OPTIONS)
    .setRequired(true)

  // 9. 特記事項
  form.addParagraphTextItem()
    .setTitle('特記事項（任意）')
    .setHelpText('配慮が必要なこと、質問、伝えておきたいことがあればご記入ください。')
    .setRequired(false)
}

/**
 * デバッグ用: 保存済み Script Properties を表示する。
 */
function showStaffProperties() {
  const props = PropertiesService.getScriptProperties().getProperties()
  Logger.log(JSON.stringify(props, null, 2))
}

# 当日運営スタッフ 応募フォーム 自動生成 Apps Script

創立記念特設授業の「当日運営スタッフ募集」用 Google フォームと、
回答を貯めるスプレッドシートを **コードから一括生成** する。

「調整さん」ではなく Google フォームを使う理由: 希望・対応可能な役割、
参加可能な時間帯を構造化して集計し、当日の配置調整まで行うため。

## 構成ファイル

- `StaffForm.js` — `setupStaffForm()` でフォーム + スプレッドシートを作成・連携
- `appsscript.json` — マニフェスト（JST / V8 / Forms・Sheets・Drive スコープ）

## セットアップ手順

```bash
# 0. clasp を同窓会用 Google アカウントで認証
clasp logout && clasp login

# 1. スタンドアロンの Apps Script プロジェクトを作成
cd scripts/gas/staff-form
clasp create --type standalone --title "特設授業 スタッフ応募フォーム生成" --rootDir .

# 2. push
clasp push

# 3. GAS エディタを開いて setupStaffForm() を実行
clasp open
#    - 関数プルダウンで setupStaffForm を選び「▶ 実行」
#    - 初回は OAuth 承認（Forms / Sheets / Drive）が走る
#    - 実行ログに FORM_PUBLIC_URL / SPREADSHEET_URL が出る
```

`clasp create` が `.clasp.json` を生成する（リポジトリの `.gitignore` で除外済み）。

## フォーム公開 URL をサイトに反映

`setupStaffForm()` のログに出る `FORM_PUBLIC_URL` を、
`pages/activities/special-lecture.vue` の `staffFormUrl` に差し替えてコミット & push する。
差し替えると「当日運営スタッフ募集」セクションの「準備中」ボタンが有効なリンクに変わる。

## フォーム項目

| # | 設問 | 形式 | 必須 |
|---|---|---|---|
| 1 | 氏名 | 記述 | ✓ |
| 2 | 卒業期（在学生は学校名・学年） | 記述 | ✓ |
| 3 | 連絡先（メール or 電話） | 記述 | ✓ |
| 4 | 参加可能な時間帯 | チェックボックス（複数可） | ✓ |
| 5 | 希望する役割 | チェックボックス（複数可・その他可） | ✓ |
| 6 | 対応可能な役割 | チェックボックス（複数可・その他可） | – |
| 7 | 当日の交通手段 | ラジオ（その他可） | ✓ |
| 8 | 事前打ち合わせへの参加可否 | ラジオ | ✓ |
| 9 | 特記事項 | 段落 | – |

役割の選択肢（Q5 / Q6 共通・`STAFF_ROLES`）:
全体進行・本部補助 / 受付 / 講師の案内・対応 / 会場誘導 /
各教室の進行補助・タイムキーパー / 写真・動画撮影 / 交流会運営 / 設営・撤収

## 項目・選択肢を変更したいとき

`StaffForm.js` の定数（`STAFF_ROLES` / `STAFF_TIME_SLOTS` など）や
`buildStaffQuestions_()` を編集 → `clasp push` → GAS エディタで `rebuildQuestions()` を実行。
既存フォームの設問だけを作り直す（公開 URL・回答済みデータは維持）。

## 再実行の安全性

`setupStaffForm()` は idempotent。Script Properties に `STAFF_FORM_ID` /
`STAFF_SPREADSHEET_ID` が残っていれば、それを開いて URL を再表示するだけで、
フォームを重複生成しない。

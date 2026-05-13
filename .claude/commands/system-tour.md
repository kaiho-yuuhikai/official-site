# 既存システムの実機ツアー

雄飛会公式サイトの 5 つの構成要素 (Form / Sheet / GAS / Actions / Pages) を
ブラウザで順に開いて、ビジネスユーザーに全体像を体感してもらいます。

## 手順

### Step 0: ツアー開始の案内

```
🗺️ 既存システムツアーを開始します

これから 5 つの画面を順番に開きます。各画面で「何を見るか」を案内するので、
画面を見たら「次へ」と入力してください。

途中で止めたい場合は「終了」と入力してください。
```

ユーザーが OK / 次へと答えたら Step 1 へ。

### Step 1: Google フォーム

```
📝 ① Google フォーム — 寄付申込みの入り口

このフォームから寄付者が申し込みを送信します。
URL: <フォームの公開 URL>

確認ポイント:
  - お名前 / 入学期 / 寄付口数 / メッセージ / HP掲載可否 などの項目
  - 必須項目とオプション項目の区別
  - 上間さんが項目を増減すると HP の集計にも影響する点

次の画面: スプレッドシート (「次へ」と入力)
```

ブラウザを開くコマンドを実行:

```bash
# macOS
open '<フォーム URL>'

# Windows (PowerShell)
Start-Process '<フォーム URL>'

# Linux
xdg-open '<フォーム URL>' >/dev/null 2>&1 || true
```

URL は `pages/index.vue` の `donationFormUrl` 変数か Script Properties から取得する (毎回変わるため一律で書かない)。
取得できない場合は神谷さんに URL を聞く案内を出す。

### Step 2: スプレッドシート

```
📊 ② スプレッドシート — データ蓄積 + 承認の場

URL: <スプレッドシート URL>

確認ポイント:
  - A〜H 列はフォーム自動入力
  - I 列「振込確認ステータス」プルダウン (未確認 / 確認済 / キャンセル)
  - J 列「確認日」 / K 列「確認者」 は手動入力
  - フィルター / 並び替え で「未確認」の行だけを抽出可能

ためしに I 列のプルダウンを 1 行だけ動かしてみてください (テスト後元に戻す)

次の画面: GitHub Actions (「次へ」と入力)
```

### Step 3: GitHub Actions

```
⚙️ ③ GitHub Actions — 自動デプロイの仕組み

URL: https://github.com/kaiho-yuuhikai/official-site/actions

確認ポイント:
  - 毎朝 09:00 JST に自動実行 (cron)
  - main ブランチに push した時にも自動実行
  - 「Deploy to GitHub Pages」ワークフローが緑 ✅ なら正常
  - 「Run workflow」ボタンで手動実行可能

直近 1 件をクリックしてログを見てみてください
  - 「Fetch donations」のステップで GAS からデータを取っている

次の画面: GitHub Pages (「次へ」と入力)
```

### Step 4: GitHub Pages (公開サイト)

```
🌐 ④ 公開サイト — 訪問者が見る世界

URL: https://kaiho-yuuhikai.jp/

確認ポイント:
  - スクロールして「寄付者一覧」セクションを探す
  - 累計額・件数が表示される
  - 各寄付者の名前・期・(メッセージ) が一覧表示される
  - HP掲載 OK の人だけが出る (匿名希望は出ない)

Ctrl+Shift+R (Mac は Cmd+Shift+R) で強制再読み込みすると最新が出る

次の画面: Apps Script (「次へ」と入力)
```

### Step 5: Apps Script (GAS) エディタ

```
⚙️ ⑤ Apps Script — 集計と通知のエンジン

URL: <GAS プロジェクト URL>

確認ポイント:
  - scripts/gas/donations/ の中身が GAS 上でも見られる
  - Donations.js: 集計ロジック
  - LineWorksNotifier.js: LINE WORKS 通知
  - Setup.js: 初期化ヘルパー
  - 左メニュー「トリガー」: onFormSubmit が登録されているか
  - 左メニュー「プロジェクト設定」 → スクリプトプロパティ: SPREADSHEET_ID / DONATIONS_TOKEN / LW_* 等

このエディタは神谷さん (開発者ドメイン) でログインしないと開けません

ツアー終了: 「終了」または何か入力してください
```

### Step 6: ツアー終了

```
🎉 ツアー終了

全 5 つの構成要素を見ました。

次のステップ:
  - 簡単なサイト変更を試す: /site-update "やりたいこと"
  - 機能追加を試す: /feature-add "やりたいこと"
  - LINE WORKS Bot を稼働: /lineworks-deploy

困ったときは:
  - 「ハンドブックのどこを見ればよい?」と Claude に聞く
  - /issue-list で「今ある課題」を確認
```

## 注意事項

- URL がコードに記載されていない場合は、神谷さんに「フォーム URL」「Sheet URL」「GAS プロジェクト URL」を聞く案内を出す
- ブラウザを開くコマンドは OS 別に切り分け (`uname -s` で判定)
- 各 Step で「次へ」「終了」を待つ — 自動で次に進まない (ユーザーが画面を見る時間を確保)
- ツアー終了後はハンドブックの STEP 3 (サイト変更) へ誘導

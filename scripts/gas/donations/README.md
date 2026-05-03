# 開邦雄飛会 寄付集計 Apps Script

スプレッドシート + Google フォーム + Web アプリで、HP連携用の JSON エンドポイントを提供する。

## 構成ファイル

- `Donations.js` — `doGet()` を提供する Web アプリ本体（HP連携用 JSON エンドポイント）
- `Setup.js` — `setupAll()` 一発で Sheet + Form を作成・連携・整形（**新規構築用ヘルパ。既存リソース利用時は実行不要**）
- `appsscript.json` — マニフェスト（Web アプリ設定 + タイムゾーン JST）

## セットアップ手順

### A. 既存スプレッドシートに紐付ける場合（推奨）

既に運営側で寄付フォーム＋スプレッドシートが作成済みのケース。

```bash
# 0. clasp 認証（同窓会用 Google アカウントで）
clasp logout && clasp login

# 1. 既存スプレッドシートの「拡張機能 → Apps Script」で生成されるプロジェクトIDを取得
cd scripts/gas/donations
clasp clone <スクリプトID>   # または .clasp.json を手書き

# 2. push
clasp push

# 3. Script Properties に DONATIONS_TOKEN を設定（GAS エディタの「プロジェクト設定 → スクリプトプロパティ」）
#    値はランダム文字列。GitHub Secrets と一致させる。
```

### B. ゼロから新規構築する場合

```bash
clasp logout && clasp login
cd scripts/gas/donations
clasp create --type standalone --title "開邦雄飛会 寄付システム" --rootDir .
clasp push
clasp open                # GAS エディタを開いて setupAll() を実行
```

`setupAll()` の実行ログから `SPREADSHEET_URL` / `FORM_PUBLIC_URL` / `DONATIONS_TOKEN` を控える。

`clasp create` が `.clasp.json` を生成する（gitignore 済み）。

### Web アプリとしてデプロイ（A/B 共通）

GAS エディタ右上の「デプロイ」→「新しいデプロイ」:
- 種類: **ウェブアプリ**
- 説明: `v1: donations endpoint`
- 実行するユーザー: **自分（スプレッドシート所有者）**
- アクセスできるユーザー: **全員**
- → デプロイ → URL（`https://script.google.com/macros/s/.../exec`）を控える

または CLI で:

```bash
clasp deploy --description "v1: donations endpoint"
clasp deployments    # URL 確認
```

### 4. GitHub Secrets 登録

リポジトリ ルートで:

```bash
gh secret set DONATIONS_ENDPOINT_URL --body "https://script.google.com/macros/s/AKfycb.../exec"
gh secret set DONATIONS_ENDPOINT_TOKEN --body "<DONATIONS_TOKEN と同じ値>"
```

### 5. HP のフォーム URL 差し替え

`pages/index.vue` の `donationFormUrl` 変数を `setupAll` で取得した `FORM_PUBLIC_URL` に書き換え、コミット&push。

### 6. 動作確認

```bash
# エンドポイント疎通
curl "https://script.google.com/macros/s/.../exec?token=<TOKEN>"

# ローカルで GitHub Actions と同じ処理
DONATIONS_ENDPOINT_URL="..." DONATIONS_ENDPOINT_TOKEN="..." \
  node scripts/fetch-donations.mjs
cat public/data/donations.json

# テスト寄付を1件投入
# → フォーム送信 → スプレッドシートで I列を「確認済」に変更
# → curl 再実行 → totalAmount/donorCount が増えることを確認
```

## 運用

### コード更新

ローカル編集 → `clasp push` → 既存デプロイを上書き:

```bash
clasp deploy --deploymentId <ID> --description "v2: ..."
```

`clasp deployments` で `<ID>` を確認。

### 振込確認オペ（運営担当向け）

詳細手順は `docs/operations/donation-confirmation.md` を参照。

サマリ:
1. スプレッドシートを開く
2. 入金確認後、対象行の I列「振込確認ステータス」プルダウンから **「確認済」** を選択
3. J列「確認日」、K列「確認者」を記入
4. 翌日の GitHub Actions（自動 cron 1日1回）で HP 反映

## 共有設定

セットアップ後、Sheet と Form を運営メンバーと共有する。Drive UI で SPREADSHEET_URL を開いて「共有」ボタンから設定。

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| `forbidden` が返る | GitHub Secrets の `DONATIONS_ENDPOINT_TOKEN` と Script Properties `DONATIONS_TOKEN` が一致しているか確認 |
| `Donations sheet not found` | スプレッドシートに「フォームの回答」が含まれるシートがあるか確認、無ければ Form 連携が切れている |
| 金額が 0 になる | E列が「10,000円」or「その他...」、F列が数値かを確認 |

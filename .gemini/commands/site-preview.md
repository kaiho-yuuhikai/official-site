# サイトプレビュー

ローカル開発サーバーを起動し、現在のサイト状態を確認します。

## 手順

### Step 1: 未保存の変更を確認

```bash
git status
git diff --stat
```

変更がある場合は、変更内容の概要をユーザーに伝えてください。

### Step 2: 開発サーバー起動

```bash
npm run dev
```

### Step 3: ユーザーへの案内

以下を案内してください:

- ブラウザで http://localhost:3000/official-site/ を開いて確認してください
- 主要ページ:
  - トップ: http://localhost:3000/official-site/
  - 雄飛会について: http://localhost:3000/official-site/about
  - お知らせ: http://localhost:3000/official-site/news
  - お問い合わせ: http://localhost:3000/official-site/contact
  - 役員一覧: http://localhost:3000/official-site/officers
- 確認が終わったら Ctrl+C でサーバーを停止できます

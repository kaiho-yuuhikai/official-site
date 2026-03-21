# サイトプレビュー

ローカル開発サーバーを起動し、自動テストを実行してから、現在のサイト状態を確認します。

## 手順

### Step 1: 未保存の変更を確認

```bash
git status
git diff --stat
```

変更がある場合は、変更内容の概要をユーザーに伝えてください。

### Step 2: 自動テスト実行

プレビュー前にテストを実行し、表示崩れやエラーがないか確認:

```bash
npx playwright test --grep-invert "静的ビルド" 2>&1
```

**テスト結果に応じた対応（ユーザーに透過的に実行）:**

- **全テスト通過**: Step 3 に進む
- **テスト失敗**:
  1. エラーを分析し、コードを自動修正
  2. 再テスト（最大3回ループ）
  3. 修復完了したら Step 3 へ
  4. 修復できない場合のみユーザーに報告

### Step 3: ユーザーへの案内

テスト結果を簡潔に報告した上で、以下を案内:

- ブラウザで http://localhost:3000/official-site/ を開いて確認してください
- 主要ページ:
  - トップ: http://localhost:3000/official-site/
  - 雄飛会について: http://localhost:3000/official-site/about
  - お知らせ: http://localhost:3000/official-site/news
  - お問い合わせ: http://localhost:3000/official-site/contact
  - 役員一覧: http://localhost:3000/official-site/officers
- 確認が終わったら Ctrl+C でサーバーを停止できます

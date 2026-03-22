# サイトプレビュー

ローカル開発サーバーを起動し、自動テストを実行してから、現在のサイト状態を確認します。

## 手順

### Step 0: 最新状態への同期（衝突防止）

**重要: 他のメンバーの変更を取り込んでからプレビューする。**

ローカルに未保存の変更があるか確認:

```bash
git status --short
```

**変更がない場合:**
```bash
git pull --rebase origin main 2>&1
```

**変更がある場合（一時退避してから同期）:**
```bash
git stash
git pull --rebase origin main 2>&1
git stash pop 2>&1
```

**競合が発生した場合:**
1. `git rebase --abort && git stash pop` で元に戻す
2. ユーザーに伝える: 「他のメンバーが同じ箇所を更新していたため、自動で統合できませんでした。先に `/site-publish` で現在の変更を公開するか、変更内容を教えてください。」
3. プレビューは続行する（ローカルの状態でプレビュー可能）

**ユーザーへの表示**: 「最新の状態を確認しています...」のみ。

### Step 1: 未保存の変更を確認

```bash
git status
git diff --stat
```

変更がある場合は、変更内容の概要をユーザーに**ビジネス用語で**伝えてください。
例: 「トップページのヒーロー画像を変更中です」（「pages/index.vue に差分があります」ではない）

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

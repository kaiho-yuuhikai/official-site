# Issue を指定して機能を実装

Issue 番号を指定して、Claude が TDD で実装し PR を作成します。
作業ブランチ作成 → テスト先行 → 実装 → 自動テスト → PR 作成までを自動化します。

## 手順

ユーザー指定の Issue 番号: $ARGUMENTS

引数が空なら、まず `/issue-list` を実行することを案内する。

### Step 0: Issue 内容の理解

```bash
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh issue view <番号> --json title,body,labels
```

Issue body を読み、以下を抽出:
- **目的・背景** (誰の何の困りごとか)
- **Acceptance Criteria (AC)** — 完了条件 (chk list)
- **不足情報** — 不明点があれば Issue にコメントを残しつつ「暫定判断」で進める

不明点が致命的 (= 暫定判断が不可能) な場合は実装中止して Issue にコメント:

```bash
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh issue comment <番号> \
  --body-file /tmp/clarify.txt
```

ユーザーには「Issue にコメントを残しました。回答が得られたら再度 /feature-implement を実行してください」と案内。

### Step 1: 最新 main の取得 + 作業ブランチ作成

```bash
git checkout main
GH_TOKEN=$(gh auth token --user <対応アカウント>) git pull origin main
git checkout -b feat/<Issue番号>-<短い英語スラッグ>
```

### Step 2: TDD - RED (失敗テスト先行)

1. AC を 3〜10 件のテストケースに分解
2. テスト先行で `tests/` または `e2e/` にテストを書く
3. テスト実行で失敗を確認

```bash
npm test                    # ユニット
npx playwright test         # E2E (必要なら)
```

### Step 3: TDD - GREEN (最小実装)

テストが通る最小限のコードを書く。過剰設計しない。

ファイル変更箇所のヒント:

| 変更内容 | 対象 |
|---|---|
| トップページ | `pages/index.vue` |
| レイアウト・ナビ | `layouts/default.vue` |
| 各下層ページ | `pages/xxx.vue` |
| 動的データ | `public/data/cms-data.json` |
| 集計ロジック | `scripts/gas/donations/*.js` |
| ビルドスクリプト | `scripts/fetch-*.mjs` |
| デプロイワークフロー | `.github/workflows/deploy.yml` |

### Step 4: TDD - REFACTOR + 全テスト

- 命名・重複・整理
- 全テストが pass することを確認

```bash
npm test
npx playwright test --grep-invert "静的ビルド"
npm run scan:secrets
```

3 つ全部 ✅ が必須。失敗したら自動修復 (最大 3 回ループ)。

### Step 5: Commit + Push

```bash
# git config をリポジトリ規約に合わせる (kaiho-yuuhikai は jkamiya5 で push)
git config user.email "<該当アカウントのメール>"
git config user.name "<該当アカウント名>"

# 秘匿情報スキャン
npm run scan:secrets:staged

git add -A
git commit -F /tmp/commit_msg.txt   # heredoc は使わない
GH_TOKEN=$(gh auth token --user <対応アカウント>) git push -u origin feat/<branch>
```

コミットメッセージのテンプレート (`/tmp/commit_msg.txt`):

```
<type>: <短い要約> (Issue #N)

<本文 1-2 行>

- 変更点 1
- 変更点 2

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

`<type>` の選択: feat / fix / update / content / style / chore / docs / ci

### Step 6: PR 作成

```bash
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh pr create \
  --base main \
  --title "<type>: <要約> (Issue #N)" \
  --body-file /tmp/pr_body.txt
```

PR body のテンプレート:

```markdown
Closes #N

## Summary
- 何を変えたか (2-4 行)

## Acceptance Criteria
- [x] AC 1
- [x] AC 2

## Test plan
- [x] npm test 全 pass
- [x] npx playwright test 全 pass
- [x] npm run scan:secrets 違反 0

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### Step 7: CI 待機 + ユーザー報告

```bash
# CI 完了待ち (background)
until [ "$(GH_TOKEN=$(gh auth token --user <アカウント>) gh pr view <PR番号> --json statusCheckRollup -q '[.statusCheckRollup[] | select(.status != "COMPLETED")] | length')" = "0" ]; do sleep 15; done
```

完了後、ユーザーに以下を表示:

```
✅ PR #N を作成しました
   タイトル: <タイトル>
   URL: https://github.com/.../pull/N
   テスト: ✅ <件数> 件 pass
   秘匿情報スキャン: ✅ 違反 0

次のステップ:
  - 内容を確認したい: ブラウザで上記 URL を開く
  - 確認後マージしたい: /feature-review-merge N
  - 修正したい: 「〇〇を直して」と続けて指示
```

## 注意事項

- **Windows でも動作**: bash 文法は Git Bash / WSL で動く想定。PowerShell 環境のときは別途 `setup.ps1` で Git Bash を導入済みであることが前提
- **秘匿情報の取扱い**: 認証情報・API キーは絶対にコードに書かない。`process.env.X` または `Script Properties` 経由
- **PR は必ず main を base に**: stacked PR は GitHub auto-close 問題があるため避ける (緊急時を除く)
- **既存テストが落ちたら止める**: 既存機能を壊していないか TDD ループで確実に検査
- **secret-scan で違反 0 が必須**: 違反があったら commit 前に修正

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| `npm test` で失敗 | 失敗内容を分析 → 自動修復ループ (3 回まで) → ダメなら Issue にコメント |
| Push が拒否される | `git pull --rebase origin main` で最新を取り込んでから再 push |
| CI が落ちる | `gh run view <run_id> --log-failed` で原因確認 → 修正コミット |
| Issue が曖昧で実装できない | Issue にコメントで質問 + 暫定判断で実装 (skill 規約) |

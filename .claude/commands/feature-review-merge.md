# PR をレビューしてマージ

Pull Request の変更内容をビジネスユーザーが理解できる言葉で説明し、確認後にマージします。

## 手順

ユーザー指定の PR 番号: $ARGUMENTS

引数が空ならエラー表示: 「PR 番号を指定してください。例: `/feature-review-merge 25`」

### Step 1: PR 情報の取得

```bash
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh pr view <番号> \
  --json title,body,headRefName,baseRefName,state,mergeStateStatus,statusCheckRollup,files,additions,deletions
```

PR が CLOSED / MERGED ならそのまま終了報告。

### Step 2: 変更ファイルの俯瞰

ユーザーに変更ファイル一覧を **ビジネス用語で** 説明:

```
📋 PR #N の変更内容

タイトル: <PR タイトル>
変更ファイル: <件数> 個 (追加 <+X>, 削除 <-Y>)

主な変更:
  📄 pages/index.vue            → トップページの内容
  📄 layouts/default.vue        → 共通レイアウト (ヘッダー・フッター)
  📄 public/data/cms-data.json  → 動的データ (メンバー情報など)
  📄 e2e/site.spec.ts            → 自動テスト
```

### Step 3: 差分の要約 (日本語、ビジネス向け)

各ファイルの diff を読み、以下のフォーマットで説明:

```
1. ナビゲーションに「アーカイブ」リンクを追加
   - 何が変わるか: ヘッダーメニューに「アーカイブ」が出る
   - 誰に影響するか: HP を見る人 (寄付者・同窓生)
   - 不可逆性: なし (戻すのも簡単)

2. 寄付者一覧を期ごとにまとめて表示
   - 何が変わるか: 「14期」「15期」と見出しが入って整理される
   - 誰に影響するか: HP を見る人
   - 不可逆性: なし

3. 自動テスト追加 (アーカイブリンクの表示テスト)
   - 内容: テストが今後の変更でも保証される
```

**技術的な詳細 (関数名・コードの diff そのもの) は出さない**。
ユーザーが理解できる粒度に翻訳して伝える。

### Step 4: チェックリスト確認

CI の各チェック / レビュー状態を以下のフォーマットで:

```
🧪 自動チェック結果

  ✅ 自動テスト (E2E)         全 N 件 pass
  ✅ 秘匿情報スキャン          違反 0
  ✅ ビルド成功
  ⏳ レビュー                  (任意) 神谷さんの確認待ち
```

### Step 5: マージ前の最終確認

```
このまま本番サイトに反映しますか?

  ✅ OK     → マージして公開を開始
  📝 修正   → どこを直すか教えてください
  ⏸️ 保留   → 後で再開 (PR は閉じません)
```

ユーザーが OK と答えた場合のみ次へ進む。
修正の場合は元の指示を控えて、別チャットで `/feature-implement` を再呼出。

### Step 6: 安全装置の事前確認

マージ前に以下を確認:

1. **ベースが main か** (stacked PR でないか)
2. **CI が全 SUCCESS か**
3. **マージ衝突がないか** (`mergeable: MERGEABLE`)
4. **誰でも見られて困る秘匿情報を含んでいないか** (secret-scan 結果)

NG があれば NG 内容と対処をユーザーに伝え、マージは中止。

### Step 7: マージ実行

```bash
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh pr merge <番号> --squash --delete-branch
```

⚠️ **`--admin` フラグは禁止**。ユーザーには見えない安全装置 (branch protection / レビュー必須) を勝手に bypass しない。
レビュー必須で BLOCKED の場合は神谷さんに連絡してもらう案内を出す:

> 「レビューが必要なため、ここではマージできません。神谷さんに『#PR_N をレビューしてください』とお伝えください。」

### Step 8: マージ後の確認

```bash
# マージ完了確認
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh pr view <番号> --json state,mergedAt

# 関連 Issue の close 確認 (Closes #N があれば auto-close される)
# デプロイの進捗を最新の Actions 実行で確認
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh run list --branch main --limit 1
```

ユーザーへの最終報告:

```
🎉 PR #N をマージしました

  公開サイト: https://kaiho-yuuhikai.jp/
  反映までの目安: 約 2〜3 分
  関連 Issue #M も自動で close されました

確認方法:
  - 数分後にブラウザで開いて「Ctrl+Shift+R」で再読み込み
  - 期待通り表示されない場合: /feature-add で修正リクエストを起票
```

## 用語の言い換え (ユーザー向け表示)

- Pull Request (PR) → 「変更案」
- Merge → 「公開サイトに反映」
- Squash → 「変更履歴をまとめる」
- Base / Head → 「合流先」「合流元」
- Conflict → 「他の変更との衝突」

## 注意事項

- **Windows でも動作**: `gh` / `git` コマンドはクロスプラットフォーム
- **`--admin` フラグは原則禁止**: ビジネスユーザー操作で安全装置を bypass しない
- **マージ前に必ず全 CI ✅ を確認**: 1 つでも NG なら止める
- **ユーザーが「OK」と明示しない限りマージしない**: 確認を skip しない

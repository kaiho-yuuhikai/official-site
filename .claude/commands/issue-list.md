# 課題一覧の表示

open Issue を分かりやすく一覧表示し、優先順位の判断材料を提供します。
「次に何をすればよいか」を選びやすくします。

## 手順

### Step 1: open Issue の取得

リモート URL から対応する GitHub アカウントを特定:

```bash
git remote -v
```

```bash
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh issue list --state open --limit 30 \
  --json number,title,labels,createdAt,assignees,comments
```

### Step 2: 表形式で表示

| # | タイトル | 種類 | 状況 | 作成日 |
|---|---|---|---|---|
| #N | タイトル (50 文字以内) | feat / fix / docs | 着手前 / 議論中 / blocked | YYYY-MM-DD |

種類の判定:
- タイトルが `feat:` → 機能追加
- `fix:` → バグ修正
- `[Skill 設計]` / `docs:` → ドキュメント・設計議論
- それ以外 → 「要件確認中」

状況の判定:
- `blocked` ラベル付き → 「blocked (待機中)」
- コメント 1 件以上 + 最終コメントが 3 日以内 → 「議論中」
- 作成 7 日以上 + コメント 0 → 「未着手 (古い)」
- それ以外 → 「未着手」

### Step 3: 推奨アクション

各 Issue に対して、ビジネスユーザー目線で「何ができるか」を併記:

```
📋 現在の open Issue (N 件)

#20 feat: 寄付申込フォーム送信時に LINE WORKS へ自動通知
    🟢 着手可能 → /feature-implement 20

#18 [Skill 設計] form-backed-static-site
    🟡 設計議論中 → 神谷さんと方向性確認後に進める

#25 fix: 寄付者一覧のソート順がおかしい (例)
    🔴 不明点あり → Issue の「不明点」コメントに回答が必要
```

### Step 4: ユーザーへの案内

```
次にやるならどれを進めますか?

  1. /feature-implement <番号>     ← 実装に進む
  2. /feature-add                   ← 新しい要件を Issue 化
  3. (Issue 番号を指定して詳細を見る) ← 内容確認だけ

「1 番」「20 を実装」「新しく作る」など自由に答えてください。
```

## 注意事項

- **Windows でも動作**: `gh issue list` はクロスプラットフォーム
- **30 件まで表示**: それ以上は `--limit` を増やすか、ユーザーに絞り込みを促す
- **個人情報を含む Issue は注意**: タイトル / 本文を一覧表示するため、Issue 本文に個人情報が含まれていないか事前確認すべき (本来は Issue 作成時に防ぐ)

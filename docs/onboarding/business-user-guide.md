# 雄飛会公式サイト 開発・運用ハンドブック

> このドキュメントは **Claude Code の skill (`/コマンド`) だけで全工程が完結する** よう設計されています。
> ターミナルで直接コマンドを打つ必要はありません。

**対象**: 開邦雄飛会公式サイトの開発・運用を引き継ぐビジネスチームメンバー (上間さん想定)
**所要時間**: 約 2 時間 (デモ会の中で完走可能)

---

## 0. これから何をするか (Bird's Eye View)

このシステムは以下の 4 つの世界をつなげています:

| 世界 | 何の役割 | 誰が触る |
|---|---|---|
| 📝 **Google Workspace** | フォーム入力・データ保管・承認 | ビジネスチーム (上間 / 屋良) |
| ⚙️ **Apps Script (GAS)** | 集計・通知ロジック | 開発者 (神谷) |
| 🚀 **GitHub** | コード管理・自動デプロイ | 開発者 + ビジネスチーム |
| 🌐 **Web サイト** | 公開 HP <https://kaiho-yuuhikai.jp/> | 訪問者 |

### 全体アーキテクチャ

```mermaid
flowchart TB
    Donor([👤 寄付者])
    Biz([👥 ビジネスチーム])

    subgraph GW [Google Workspace]
        Form[📝 Form]
        Sheet[📊 Sheet]
    end

    subgraph GAS [Apps Script]
        Donations[Donations.js]
        Notifier[LineWorksNotifier.js]
    end

    subgraph LW [LINE WORKS]
        Bot[🤖 Bot]
        Room[💬 トークルーム]
    end

    subgraph GH [GitHub]
        Repo[(リポジトリ)]
        Actions[⚙️ Actions]
        Pages[🌐 Pages]
    end

    Donor -->|フォーム送信| Form
    Form --> Sheet
    Form -.->|onFormSubmit| Notifier
    Notifier --> Bot
    Bot --> Room
    Room --> Biz
    Biz -->|確認済| Sheet
    Sheet -.-> Donations
    Actions -->|cron 09:00 JST| Donations
    Donations --> Actions
    Actions --> Repo
    Repo --> Pages
    Pages --> Donor

    classDef user fill:#fef3c7,stroke:#f59e0b,color:#000
    classDef storage fill:#dbeafe,stroke:#3b82f6,color:#000
    classDef compute fill:#dcfce7,stroke:#16a34a,color:#000
    classDef messaging fill:#fce7f3,stroke:#ec4899,color:#000
    class Donor,Biz user
    class Form,Sheet,Repo,Pages storage
    class Donations,Notifier,Actions compute
    class Bot,Room messaging
```

> 💡 **大事な原則**: 全部 **無料枠** で月額 ¥0 で運用しています。

---

# 📚 STEP 別 手順書 (Claude Code skill だけで進む)

> Claude Code を起動して、各 STEP の `/コマンド` を **順番に上から下に** 打てばすべて完了します。
> ターミナルで直接 git / npm / clasp 等を打つ必要はありません。

---

## ▶️ 事前準備: Claude Code を起動

ターミナル (Windows なら PowerShell or Git Bash) で:

```bash
claude
```

これだけ。あとはすべて Claude Code の中の `/コマンド` で進めます。

---

## STEP 1: 環境セットアップ (15 分)

> **目的**: 必要なツールを全部入れる
> **使う skill**: `/setup` → `/setup-google-clis` → `/setup-check`

### 1.1 全ツール一括インストール

```
/setup
```

これだけで以下が全部入ります:
- Node.js / Git / GitHub CLI / Claude Code
- Homebrew (Mac) / winget (Windows)
- プロジェクトの依存パッケージ (`npm install`)
- pre-commit secret-scan フック

Claude が「これをインストールしてよいですか?」と聞いてくれるので OK と答えるだけ。

### 1.2 Google CLI 三種セットアップ

```
/setup-google-clis
```

これで `clasp` / `gws` / `gog` が一括で入ります。
OAuth 認証も対話的に案内されます。

### 1.3 環境チェック

```
/setup-check
```

→ 全項目が ✅ なら STEP 2 へ。❌ があれば項目に従って修正。

---

## STEP 2: 既存システムを見る (15 分)

> **目的**: 5 つの構成要素 (Form / Sheet / GAS / Actions / Pages) を順に画面確認
> **使う skill**: `/system-tour`

```
/system-tour
```

Claude が以下を順に案内 + ブラウザを開いてくれます:
- ① Google フォーム
- ② スプレッドシート (I 列のプルダウンを試す)
- ③ GitHub Actions (cron + 手動実行)
- ④ GitHub Pages (公開サイト)
- ⑤ Apps Script エディタ

各画面で「次へ」と入力すると次に進みます。

---

## STEP 3: サイトの簡単な変更を試す (15 分)

> **目的**: テキスト・画像の差し替えを Claude Code で行う体験
> **使う skill**: `/site-preview` → `/site-update` → `/site-publish`

### 3.1 ローカルプレビュー

```
/site-preview
```

→ ブラウザで <http://localhost:3000/official-site/> が開く

### 3.2 変更を依頼

```
/site-update トップページのキャッチコピーを「次の50年へ」に変更したい
```

Claude が:
- 該当ファイルを特定
- 修正 + 自動テスト
- プレビュー確認を促す

### 3.3 本番反映

```
/site-publish
```

→ 数分後に <https://kaiho-yuuhikai.jp/> で確認 (Ctrl+Shift+R で再読込)

---

## STEP 4: 機能追加を試す (30 分)

> **目的**: 「新機能 Issue 起票 → 実装 → マージ」を Claude Code だけで完結する体験
> **使う skill**: `/issue-list` → `/feature-add` → `/feature-implement` → `/feature-review-merge`

### 4.1 現在の課題を見る

```
/issue-list
```

→ open Issue が一覧表示 + 優先度・推奨アクション付き

### 4.2 新規 Issue を起票

```
/feature-add
```

Claude が「どんな変更をしたいですか?」とヒアリング → Issue を作成

> 💡 デモ会では既に起票済みの **Issue #26 (GA4 埋め込み)** を使うと早い

### 4.3 実装

```
/feature-implement 26
```

Claude が:
1. 仕様を読む
2. 失敗テストを書く (RED)
3. 最小実装 (GREEN)
4. リファクタ + 全テスト (REFACTOR)
5. secret-scan
6. PR を作成

### 4.4 PR レビュー → マージ

```
/feature-review-merge <PR番号>
```

Claude が変更内容を日本語で説明 → 「OK」と答えればマージ → 自動デプロイ

### 4.5 本番反映確認

数分後にブラウザで Ctrl+Shift+R → 動作確認

---

## STEP 5: LINE WORKS Bot を本番稼働 (30 分)

> **目的**: 寄付申込みが来たら運営トークルームに自動通知する仕組みを稼働
> **使う skill**: `/lineworks-deploy`
> **前提**: Phase 1 (LINE WORKS Developer Console での 6 点取得) が完了済み

```
/lineworks-deploy
```

Claude が以下を順に案内:
1. 認証情報 6 点が揃っているか確認
2. clasp 認証 (開発者ドメイン)
3. GAS にコードを push (`clasp push`)
4. Script Properties に 6 点を投入 (GAS エディタの実行ダイアログ経由、Claude に値を渡さない)
5. `testNotify` で疎通テスト
6. `installFormSubmitTrigger` でトリガー登録
7. 本番フォームから E2E テスト
8. Issue #20 にコメントで完遂報告

⚠️ **認証情報を Claude のチャットに貼り付けない**。GAS エディタの実行ダイアログから直接入力します。

---

# 📋 日常運用フロー (デモ後の継続業務)

このセクションは **デモ会後にハンドブックを見返して** 使います。

## 運用 A: 寄付申込みが来たとき (自動)

```
寄付者がフォーム送信
   ↓
スプレッドシートに行追加 (自動)
   ↓
運営トークルームに LINE WORKS 通知 (自動)
   ↓
[受信] 屋良 / 上間さんが内容確認
```

## 運用 B: 入金確認したとき (手動)

```
振込確認後、スプレッドシートを開く
   ↓
該当行の I 列「振込確認ステータス」を「確認済」にする
   ↓
J 列に確認日 (yyyy-mm-dd)
   ↓
K 列に確認者
   ↓
翌朝 09:00 に HP に自動反映
```

急いで反映したい場合:
- GitHub Actions タブで `Deploy to GitHub Pages` ワークフローを「Run workflow」

## 運用 C: コンテンツ更新

| やりたいこと | 使う skill |
|---|---|
| 文言の修正 | `/site-update` |
| 画像の差し替え | `/site-update` |
| 役員情報の更新 | `/site-update` |
| 新ページ追加 | `/feature-add` → `/feature-implement` |

## 運用 D: フォームを改修したとき

⚠️ **重要**: Form の項目を追加・削除すると Sheet の列順がずれて HP の集計が壊れる可能性。

```
1. Form を変更
2. /feature-add で「フォームに○○を E 列に追加。GAS と HP の集計も対応してほしい」と起票
3. /feature-implement <Issue番号>
4. /feature-review-merge <PR番号>
```

---

# 🛟 困ったとき

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| HP に反映されない | (1) Sheet の I 列が「確認済」か / (2) Ctrl+Shift+R で再読込 / (3) Actions タブで run 確認 |
| LINE WORKS 通知が来ない | `/lineworks-deploy` を再実行して Step 4 から再確認 |
| Claude Code でエラー | 日本語で「○○で詰まった」と聞く / `/setup-check` で再診断 |
| `clasp push` が拒否される | 開発者ドメインで login しているか (`/setup-google-clis` 内で確認) |
| Push protection エラー | コミットに API トークン等が紛れていないか確認 |

## 連絡先

- 急ぎ HP 修正: 神谷さんに Slack DM
- LINE WORKS 関連: `/feature-add` で Issue 起票
- 認証情報を失った: `docs/security/secret-handling.md` のローテーション手順

---

# 📖 リファレンス

## skill / コマンド一覧

すべて Claude Code 内で `/コマンド名` で呼びます。

### 環境

| skill | 用途 |
|---|---|
| `/setup` | 開発環境一括インストール |
| `/setup-check` | 環境チェック |
| `/setup-google-clis` | Google CLI 三種 (clasp/gws/gog) セットアップ + OAuth |

### 既存システムを見る

| skill | 用途 |
|---|---|
| `/system-tour` | Form / Sheet / GAS / Actions / Pages を画面で順に確認 |

### サイト更新 (小修正)

| skill | 用途 |
|---|---|
| `/site-preview` | ローカルプレビュー起動 |
| `/site-update` | テキスト・画像の修正 |
| `/site-publish` | 本番反映 |

### 機能開発 (新機能・改修)

| skill | 用途 |
|---|---|
| `/issue-list` | 課題一覧 |
| `/feature-add` | 要望を Issue 化 |
| `/feature-implement <N>` | Issue → 実装 → PR |
| `/feature-review-merge <N>` | PR → 確認 → マージ |

### LINE WORKS Bot

| skill | 用途 |
|---|---|
| `/lineworks-deploy` | Phase 3〜5 (clasp push / Properties 投入 / testNotify / トリガー登録 / E2E) |

## 主要ファイル

| ファイル | 内容 |
|---|---|
| `pages/index.vue` | トップページ |
| `layouts/default.vue` | 共通レイアウト |
| `public/data/cms-data.json` | 動的データ (メンバー等) |
| `scripts/gas/donations/` | 寄付システム GAS |
| `docs/operations/line-works-notification-setup.md` | LINE WORKS 運用手順 |
| `docs/security/secret-handling.md` | 秘匿情報取扱い |

## 用語集

| 用語 | 意味 |
|---|---|
| GAS | Google Apps Script |
| トリガー | GAS の自動実行設定 |
| clasp | GAS をローカルから push する CLI |
| Script Properties | GAS の機密情報保管庫 |
| Issue | GitHub の課題管理 |
| PR | Pull Request (変更案) |
| CI | 自動テスト・チェック |
| secret-scan | 秘密情報の誤コミット検出 |

## 参考リンク

| カテゴリ | リンク |
|---|---|
| 雄飛会リポジトリ | <https://github.com/kaiho-yuuhikai/official-site> |
| 雄飛会 HP | <https://kaiho-yuuhikai.jp/> |
| 寄付承認手順 | `docs/operations/donation-confirmation.md` |
| LINE WORKS 連携 | `docs/operations/line-works-notification-setup.md` |
| セキュリティ | `docs/security/secret-handling.md` |
| LINE WORKS Developers | <https://developers.worksmobile.com/jp/docs/> |
| GAS リファレンス | <https://developers.google.com/apps-script/reference> |

---

# ✅ デモ会で踏むチェックリスト

このハンドブックを上から順に進めれば全部触れます。

- [ ] `claude` でこのハンドブックを開きながら起動
- [ ] STEP 1 `/setup` → `/setup-google-clis` → `/setup-check`
- [ ] STEP 2 `/system-tour`
- [ ] STEP 3 `/site-preview` → `/site-update` → `/site-publish`
- [ ] STEP 4 `/issue-list` → `/feature-add` → `/feature-implement` → `/feature-review-merge`
- [ ] STEP 5 `/lineworks-deploy`
- [ ] 質疑応答 + 次回までの宿題確認

🎓 **次のステップ**: デモ後の宿題は Issue #27 に集約しています。
わからないことは Claude に日本語で聞くか、`/issue-list` で課題を確認してください。

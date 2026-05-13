# 雄飛会公式サイト 開発・運用ハンドブック

> **Claude Code の `/コマンド` だけで全工程が完結します。** ターミナルで直接コマンドを打つ必要はありません。
>
> **対象**: 雄飛会公式サイトの開発・運用を引き継ぐビジネスチーム (上間さん想定)
> **所要時間**: 約 2 時間 (デモ会で完走可能)

---

## 0. 全体像 (Bird's Eye View)

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

| 世界 | 役割 | 誰が触る |
|---|---|---|
| 📝 Google Workspace | フォーム + データ + 承認 | ビジネス (上間 / 屋良) |
| ⚙️ Apps Script | 集計・通知ロジック | 開発者 (神谷) |
| 🚀 GitHub | コード + 自動デプロイ | 開発者 + ビジネス |
| 🌐 Web | <https://kaiho-yuuhikai.jp/> | 訪問者 |

すべて無料枠で月額 ¥0 で運用。

---

# 📚 4 つの STEP で完了

> Claude Code を `claude` で起動 → 以下の `/コマンド` を上から順に実行するだけ。

---

## STEP 1: 環境セットアップ (15 分)

```
/setup
```

これ 1 つで全部入る:
- Node.js / Git / GitHub CLI / Claude Code / **clasp**
- プロジェクト依存パッケージ
- pre-commit secret-scan フック
- GitHub 認証 + clasp 認証 (ブラウザ起動)

確認:

```
/setup-check
```

→ 全項目 ✅ なら次へ。

> 💡 `gws` / `gog` (Sheets/Drive を直接 API で叩く CLI) は最小運用には不要。必要になったら `/setup-google-clis` で別途追加可。

---

## STEP 2: 既存システムを画面で見る (15 分)

```
/system-tour
```

Claude が 5 つの画面を順に開いて案内:
1. Google フォーム (入力)
2. スプレッドシート (承認列の操作)
3. GitHub Actions (自動デプロイ履歴)
4. GitHub Pages (公開サイト)
5. Apps Script エディタ (集計・通知ロジック)

各画面で「次へ」と入力すると進む。

---

## STEP 3: 変更・機能追加を試す (45 分)

### 3-A. 小さな変更 (文言・画像)

```
/site-preview                                   # ローカルプレビュー起動
/site-update こうしてほしい                      # Claude が修正 + テスト
/site-publish                                   # 本番反映
```

### 3-B. 機能追加 (新機能・改修)

```
/issue-list                          # 現在の課題を見る
/feature-add こうしたい               # Claude が Issue 化
/feature-implement <Issue番号>        # TDD で実装 + PR 作成
/feature-review-merge <PR番号>        # 内容説明 + マージ
```

> 💡 デモ会では既存の **Issue #26 (GA4 埋め込み)** を題材にすると 15 分で 1 巡できます。

---

## STEP 4: LINE WORKS Bot を本番稼働 (30 分)

> **前提**: LINE WORKS Developer Console での認証情報 6 点取得 (Phase 1) が完了済み

```
/lineworks-deploy
```

Claude が対話的に進める:
1. 認証情報 6 点が揃っているか確認
2. clasp push (コード反映)
3. GAS エディタで `setupLineWorksProperties` を実行 (認証情報投入 — Claude には値を渡さない)
4. `testNotify` で疎通テスト
5. `installFormSubmitTrigger` でトリガー登録
6. 本番フォームから E2E テスト
7. Issue #20 に完遂報告

---

# 📋 日常運用フロー (デモ後の継続業務)

## A. 寄付申込みが来たとき (自動)

```
寄付者がフォーム送信
  ↓
スプレッドシートに行追加 (自動)
  ↓
運営トークルームに LINE WORKS 通知 (自動)
  ↓
屋良 / 上間さんが内容確認
```

## B. 入金確認 (手動)

スプレッドシートの I 列を「確認済」、J 列に確認日、K 列に確認者を入力。
翌朝 09:00 JST に HP 自動反映。急ぐなら GitHub Actions タブで「Run workflow」。

## C. コンテンツ更新

| やりたいこと | コマンド |
|---|---|
| 文言・画像の修正 | `/site-update` |
| 役員情報の更新 | `/site-update` |
| 新ページ追加 | `/feature-add` → `/feature-implement` |

## D. フォーム改修

⚠️ Form の項目を変更すると Sheet の列順がずれて HP の集計が壊れる可能性。

```
1. Form を変更
2. /feature-add  「フォームに○○を追加。GAS と HP の集計も対応してほしい」
3. /feature-implement <Issue番号>
4. /feature-review-merge <PR番号>
```

---

# 🛟 困ったとき

| 症状 | 対処 |
|---|---|
| HP に反映されない | Sheet の I 列確認 + Ctrl+Shift+R で再読込 |
| LINE WORKS 通知が来ない | `/lineworks-deploy` を再実行 |
| エラーが出た | 日本語で Claude に「○○で詰まった」と聞く |
| 環境が壊れた | `/setup-check` で再診断、ダメなら `/setup` |
| Push 拒否 (secret-scan) | コミットに API トークン等が紛れていないか確認 |

連絡先:
- 急ぎ HP 修正: 神谷さんに Slack DM
- 認証情報を失った: `docs/security/secret-handling.md` 参照

---

# 📖 リファレンス

## skill 一覧

すべて Claude Code 内で `/コマンド名` で呼ぶ:

| カテゴリ | コマンド | 用途 |
|---|---|---|
| **環境** | `/setup` | 全ツール一括インストール + 認証 (これ 1 つで OK) |
| 環境 | `/setup-check` | 環境チェック |
| 環境 | `/setup-google-clis` | gws / gog 追加 (オプション) |
| **見る** | `/system-tour` | 既存システムを画面で順に確認 |
| **更新** | `/site-preview` | ローカルプレビュー |
| 更新 | `/site-update` | 文言・画像の修正 |
| 更新 | `/site-publish` | 本番反映 |
| **開発** | `/issue-list` | 課題一覧 |
| 開発 | `/feature-add` | 要望を Issue 化 |
| 開発 | `/feature-implement <N>` | Issue → 実装 → PR |
| 開発 | `/feature-review-merge <N>` | PR → 確認 → マージ |
| **運用** | `/lineworks-deploy` | LINE WORKS Bot 本番稼働 |

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
| Issue | GitHub の課題管理 |
| PR | Pull Request (変更案) |
| CI | 自動テスト・チェック |

## 参考リンク

- リポジトリ: <https://github.com/kaiho-yuuhikai/official-site>
- 公開サイト: <https://kaiho-yuuhikai.jp/>
- LINE WORKS Developers: <https://developers.worksmobile.com/jp/docs/>

---

# ✅ デモ会チェックリスト

- [ ] `claude` でこのハンドブックを開きながら起動
- [ ] STEP 1 `/setup` → `/setup-check`
- [ ] STEP 2 `/system-tour`
- [ ] STEP 3-A `/site-preview` → `/site-update` → `/site-publish`
- [ ] STEP 3-B `/issue-list` → `/feature-add` → `/feature-implement` → `/feature-review-merge`
- [ ] STEP 4 `/lineworks-deploy`
- [ ] 質疑応答

🎓 **次のステップ**: デモ後の宿題は Issue #27 に集約。わからないことは Claude に日本語で聞く。

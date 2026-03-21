# 開邦高校同窓会 雄飛会 | 公式サイト

沖縄県立開邦高等学校の同窓会「雄飛会」公式サイトです。

## 技術スタック

| 技術 | バージョン |
|:---|:---|
| Nuxt | 3.14+ |
| Vue | 3.5+ |
| Tailwind CSS | 3.x |
| Node.js | 20+ |
| TypeScript | 5.6+ |

## はじめかた（非エンジニア向け）

技術的な知識がなくても、以下の手順でセットアップできます。

---

### macOS の場合

#### 方法 1: ワンコマンドで全自動セットアップ

「ターミナル.app」を開いて（Spotlight で「ターミナル」と検索）、以下をコピペして実行してください:

```bash
# リポジトリをダウンロード
git clone https://github.com/kaiho-yuuhikai/official-site.git
cd official-site

# 全ツールを自動インストール
bash scripts/setup.sh
```

途中でパスワードの入力を求められる場合があります。Mac のログインパスワードを入力してください。

#### 方法 2: AI エージェントにセットアップを任せる

すでにいずれかの AI エージェントがインストールされている場合、AI に任せることもできます:

```bash
cd official-site

# Claude Code の場合
claude
# → エージェントが起動したら入力:
# /project:setup

# Gemini CLI の場合
gemini
# → /setup

# Codex CLI の場合
codex
# → /setup
```

<details>
<summary>方法 3: 手動セットアップ（上級者向け）</summary>

```bash
# Homebrew（macOS パッケージマネージャー）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js / GitHub CLI
brew install node@22 gh
gh auth login

# AI コーディングエージェント（3つから選択）
curl -fsSL https://claude.ai/install.sh | bash   # Claude Code
npm install -g @google/gemini-cli                 # Gemini CLI
npm install -g @openai/codex                      # Codex CLI

# プロジェクト依存パッケージ
npm install
```

</details>

---

### Windows の場合

#### 前提条件

Windows では以下の 2 つを先にインストールする必要があります:

1. **Git for Windows** — ファイルのバージョン管理ツール
2. **Node.js** — JavaScript 実行環境

#### 方法 1: ワンコマンドで全自動セットアップ（推奨）

Git と Node.js がすでにインストール済みの場合、PowerShell で以下を実行するだけです:

```powershell
git clone https://github.com/kaiho-yuuhikai/official-site.git
cd official-site
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\scripts\setup.ps1
```

Git / Node.js も含めて全部入れたい場合は、以下の手順に従ってください。

#### 方法 2: 手順に沿って手動セットアップ

##### Step 1: Git for Windows をインストール

1. ブラウザで https://git-scm.com/downloads/win を開く
2. 「**Click here to download**」をクリックしてインストーラーをダウンロード
3. ダウンロードした `.exe` ファイルをダブルクリック
4. すべてデフォルト設定のまま「Next」→「Next」→ ... →「Install」をクリック
5. インストール完了後「Finish」をクリック

##### Step 2: Node.js をインストール

1. ブラウザで https://nodejs.org/ を開く
2. 「**LTS**」（推奨版）のダウンロードボタンをクリック
3. ダウンロードした `.msi` ファイルをダブルクリック
4. すべてデフォルト設定のまま「Next」→「Next」→ ... →「Install」をクリック
5. インストール完了後「Finish」をクリック

##### Step 3: GitHub CLI をインストール

**PowerShell**（スタートメニューで「PowerShell」と検索）を開いて:

```powershell
winget install --id GitHub.cli
```

> WinGet が使えない場合は https://cli.github.com/ からインストーラーをダウンロードしてください。

##### Step 4: AI コーディングエージェントをインストール

引き続き PowerShell で、使いたいエージェントをインストールしてください（複数可）:

```powershell
# Claude Code（Anthropic）
irm https://claude.ai/install.ps1 | iex

# Gemini CLI（Google）
npm install -g @google/gemini-cli

# Codex CLI（OpenAI）
npm install -g @openai/codex
```

##### Step 5: リポジトリをダウンロードしてセットアップ

```powershell
# リポジトリをダウンロード
git clone https://github.com/kaiho-yuuhikai/official-site.git
cd official-site

# 依存パッケージをインストール
npm install
```

##### Step 6: GitHub にログイン

```powershell
gh auth login
```

ブラウザが開くので、GitHub アカウントでログインしてください。

##### Step 7: AI エージェントを起動

```powershell
# いずれか1つを起動
claude    # Claude Code
gemini    # Gemini CLI
codex     # Codex CLI
```

> **Windows の注意事項**
> - Claude Code は **Git Bash** または **WSL** 上で動作します。PowerShell から `claude` を実行すると Git Bash が自動的に使われます
> - Codex CLI の Windows サポートは実験的です。WSL の利用を推奨します
> - WSL を使う場合は、WSL 内で macOS と同じ手順（`bash scripts/setup.sh`）が使えます

<details>
<summary>WSL（Windows Subsystem for Linux）を使う場合</summary>

WSL を使うと macOS/Linux と同じ環境でセットアップできます。より安定した動作が期待できます。

**WSL のインストール（PowerShell を管理者として実行）:**

```powershell
wsl --install
```

PC を再起動後、スタートメニューから「Ubuntu」を起動します。

**WSL 内でのセットアップ:**

```bash
# リポジトリをダウンロード
git clone https://github.com/kaiho-yuuhikai/official-site.git
cd official-site

# 全自動セットアップ
bash scripts/setup.sh
```

以降は macOS と同じ操作で使えます。

</details>

---

### 環境チェック

セットアップが正しくできたか確認するには、AI エージェント内で:

```
/setup-check          # Gemini / Codex の場合
/project:setup-check  # Claude Code の場合
```

## AI コーディングエージェント

本プロジェクトは 3 つの AI コーディングエージェントに対応しています。どれを使っても同じワークフローで操作できます。

| エージェント | 提供元 | 設定ファイル | 起動コマンド | 認証 |
|:---|:---|:---|:---|:---|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | Anthropic | `CLAUDE.md` | `claude` | Claude.ai アカウント |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Google | `GEMINI.md` | `gemini` | Google アカウント |
| [Codex CLI](https://github.com/openai/codex) | OpenAI | `AGENTS.md` | `codex` | ChatGPT アカウント |

各エージェントの初回起動時にブラウザが開き、ログインが求められます。画面の指示に従ってください。

### カスタムコマンド一覧

| コマンド | 機能 | Claude Code | Gemini / Codex |
|:---|:---|:---|:---|
| セットアップ | 環境構築 | `/project:setup` | `/setup` |
| 環境チェック | 状態確認 | `/project:setup-check` | `/setup-check` |
| サイト更新 | コード修正 | `/project:site-update 要件` | `/site-update 要件` |
| プレビュー | ローカル確認 | `/project:site-preview` | `/site-preview` |
| 公開反映 | デプロイ | `/project:site-publish` | `/site-publish` |

## デプロイ

GitHub Pages に自動デプロイされます。

- `main` ブランチへの push で自動デプロイ
- 毎日 9:00 JST に note.com RSS の自動更新 + 再デプロイ
- GitHub Actions の手動実行（workflow_dispatch）も可能

## サイト更新ワークフロー（ビジネスユーザー向け）

AI コーディングエージェントを使って、自然言語でサイトを更新できます。技術的な知識は不要です。

### ワークフロー全体像

```
┌─────────────────────────────────────────────────────────┐
│  1. 要件を伝える                                          │
│     「トップページのキャッチコピーを○○に変更して」              │
│                    ↓                                     │
│  2. AI が自動でコードを修正                                 │
│                    ↓                                     │
│  3. ローカルでプレビュー確認                                 │
│     http://localhost:3000/official-site/                  │
│                    ↓                                     │
│  4. OK なら公開反映                                       │
│     → GitHub Pages に自動デプロイ（約2-3分）                │
└─────────────────────────────────────────────────────────┘
```

### カスタムコマンド一覧

各 AI エージェントで同じ 3 つのコマンドが使えます:

| コマンド | 機能 | 説明 |
|:---|:---|:---|
| `/site-update` | サイト更新 | 自然言語の要件からコードを修正し、プレビューまで案内 |
| `/site-preview` | プレビュー | ローカル開発サーバーを起動して確認 |
| `/site-publish` | 公開反映 | 変更をコミット・プッシュして GitHub Pages にデプロイ |

### 使い方（各エージェント共通）

#### Step 1: AI エージェントを起動

```bash
cd /path/to/official-site

# いずれか1つを起動
claude    # Claude Code
gemini    # Gemini CLI
codex     # Codex CLI
```

#### Step 2: サイトを更新（`/site-update`）

エージェントのプロンプトで以下のように入力:

```
/site-update トップページのキャッチコピーを「未来をつくる同窓会」に変更して
```

```
/site-update お問い合わせページにメールアドレス info@example.com を追加して
```

```
/site-update ナビゲーションに「イベント」メニューを追加して
```

AI がコードを修正し、開発サーバーが起動します。

#### Step 3: ブラウザで確認（`/site-preview`）

ブラウザで http://localhost:3000/official-site/ を開いて変更内容を確認します。
修正が必要な場合はそのまま追加の指示を入力できます。

```
/site-preview
```

#### Step 4: 公開に反映（`/site-publish`）

変更内容に問題がなければ、公開サイトに反映します:

```
/site-publish
```

GitHub Actions が自動でビルド・デプロイを実行し、約2-3分で公開サイトに反映されます。

### エージェント別のコマンド呼び出し方法

| エージェント | `/site-update` の呼び出し方 |
|:---|:---|
| Claude Code | `/project:site-update 要件テキスト` |
| Gemini CLI | `/site-update 要件テキスト` |
| Codex CLI | `/site-update 要件テキスト` |

### 変更できるコンテンツの例

| 変更したい内容 | 入力例 |
|:---|:---|
| テキスト変更 | 「トップページの見出しを○○に変更して」 |
| 画像変更 | 「ヒーロー画像を新しい画像に差し替えて」 |
| ページ追加 | 「イベント情報ページを新規作成して」 |
| リンク変更 | 「フッターのFacebookリンクを○○に変更して」 |
| デザイン変更 | 「ボタンの色を緑から青に変更して」 |
| セクション追加 | 「トップページに活動実績セクションを追加して」 |
| コンテンツ追加 | 「ニュースに新しい記事を追加して」 |

## ディレクトリ構成

```
├── pages/                  # ページ（Nuxt ファイルベースルーティング）
├── layouts/                # レイアウト
├── composables/            # Vue Composables
├── assets/css/             # グローバルCSS
├── public/                 # 静的ファイル（画像、JSONデータ）
├── scripts/                # ビルドスクリプト
├── docs/                   # ドキュメント
├── .claude/commands/       # Claude Code カスタムコマンド
├── .gemini/commands/       # Gemini CLI カスタムコマンド
├── .codex/commands/        # Codex CLI カスタムコマンド
├── CLAUDE.md               # Claude Code プロジェクト設定
├── GEMINI.md               # Gemini CLI プロジェクト設定
└── AGENTS.md               # Codex CLI プロジェクト設定
```

## ライセンス

Private

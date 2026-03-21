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

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（http://localhost:3000）
npm run dev

# 静的サイト生成（GitHub Pages用）
npm run generate

# 生成結果のプレビュー
npm run preview
```

## デプロイ

GitHub Pages に自動デプロイされます。

- `main` ブランチへの push で自動デプロイ
- 毎日 9:00 JST に note.com RSS の自動更新 + 再デプロイ
- GitHub Actions の手動実行（workflow_dispatch）も可能

## AI コーディングエージェント

本プロジェクトは複数の AI コーディングエージェントに対応しています。各エージェントがプロジェクトのコンテキストを自動的に読み込めるよう、ルートディレクトリに設定ファイルを配置しています。

### 対応エージェントと設定ファイル

| エージェント | 設定ファイル | 起動コマンド |
|:---|:---|:---|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | `CLAUDE.md` | `claude` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `GEMINI.md` | `gemini` |
| [Codex CLI](https://github.com/openai/codex) | `AGENTS.md` | `codex` |

### 1. Claude Code（Anthropic）

Anthropic の AI コーディングエージェント。`CLAUDE.md` をプロジェクトコンテキストとして自動読み込みします。

**システム要件**
- macOS 13.0+ / Windows 10 1809+ / Ubuntu 20.04+ / Debian 10+
- RAM 4GB 以上
- シェル: Bash または Zsh

**インストール（ネイティブインストーラー推奨）**

```bash
# macOS / Linux / WSL（推奨）
curl -fsSL https://claude.ai/install.sh | bash

# Homebrew（macOS）
brew install --cask claude-code
```

> **Note**: `npm install -g @anthropic-ai/claude-code` は非推奨です。ネイティブインストーラーを使用してください。
> ネイティブインストーラーは自動更新に対応しています。Homebrew の場合は `brew upgrade claude-code` で手動更新します。

**認証**
- Claude Pro / Max プラン: Claude.ai アカウントでログイン
- Claude Console: OAuth プロセスを完了
- チーム / Enterprise: Claude for Teams または Enterprise プランを利用

**更新・アンインストール**

```bash
# 手動更新
claude update

# インストール状態の確認
claude doctor

# アンインストール
rm -f ~/.local/bin/claude && rm -rf ~/.local/share/claude
```

### 2. Gemini CLI（Google）

Google の AI コーディングエージェント。`GEMINI.md` をプロジェクトコンテキストとして自動読み込みします。

**システム要件**
- macOS 15+ / Windows 11 24H2+ / Ubuntu 20.04+
- Node.js 20.0.0+
- RAM 4GB 以上（パワーユースは 16GB+ 推奨）

**インストール**

```bash
# npm（推奨）
npm install -g @google/gemini-cli

# Homebrew（macOS / Linux）
brew install gemini-cli

# MacPorts（macOS）
sudo port install gemini-cli

# npx（インストール不要で即実行）
npx @google/gemini-cli
```

**認証**
- Google アカウントでログイン（初回起動時にブラウザが開きます）

**更新**

```bash
# npm
npm install -g @google/gemini-cli@latest

# Homebrew
brew upgrade gemini-cli

# プレビュー版
npm install -g @google/gemini-cli@preview
```

**リリースチャネル**
- `@latest`: 安定版（毎週リリース）
- `@preview`: プレビュー版（毎週リリース、未検証の可能性あり）
- `@nightly`: ナイトリー（毎日リリース）

### 3. Codex CLI（OpenAI）

OpenAI の AI コーディングエージェント。`AGENTS.md` をプロジェクトコンテキストとして自動読み込みします。

**システム要件**
- macOS / Linux（Windows は WSL 推奨）
- Node.js 20+

**インストール**

```bash
# npm（推奨）
npm install -g @openai/codex

# Homebrew
brew install codex
```

**認証**
- ChatGPT アカウントまたは OpenAI API キーで認証（初回起動時にプロンプトが表示されます）
- ChatGPT Plus / Pro / Business / Edu / Enterprise プランに含まれています

**更新**

```bash
npm install -g @openai/codex@latest
```

### 4. GitHub CLI（gh）

GitHub の公式コマンドラインツール。Issue、Pull Request、Release などの GitHub ワークフローをターミナルから操作できます。AI コーディングエージェントが `gh` コマンドを使って PR 作成やCI確認などを行う際にも必要です。

**インストール**

```bash
# Homebrew（macOS / Linux）
brew install gh

# macOS（MacPorts）
sudo port install gh

# Windows（WinGet）
winget install --id GitHub.cli

# Windows（Scoop）
scoop install gh

# Conda
conda install gh --channel conda-forge

# Linux（apt / Debian・Ubuntu）
(type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
  && sudo mkdir -p -m 755 /etc/apt/keyrings \
  && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  && cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
  && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && sudo apt update \
  && sudo apt install gh -y

# Linux（dnf / Fedora・RHEL）
sudo dnf install gh
```

**認証**

```bash
# ブラウザでGitHubアカウントにログイン
gh auth login

# 認証状態の確認
gh auth status
```

**よく使うコマンド**

```bash
gh issue list              # Issue一覧
gh pr list                 # PR一覧
gh pr create               # PR作成
gh pr view                 # PR詳細表示
gh pr checks               # CIチェック状態
gh run list                # GitHub Actions実行一覧
gh release list            # リリース一覧
```

**更新**

```bash
# Homebrew
brew upgrade gh
```

### 使い方

プロジェクトルートで各コマンドを実行すると、対応する設定ファイルが自動的に読み込まれます。

```bash
cd /path/to/official-site

# Claude Code → CLAUDE.md を読み込み
claude

# Gemini CLI → GEMINI.md を読み込み
gemini

# Codex CLI → AGENTS.md を読み込み
codex
```

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

# 開発環境セットアップ

非エンジニアのユーザーが開発環境を構築するためのガイド付きセットアップを実行します。
各ツールのインストール状況を確認し、不足しているものを自動でインストールします。

## 手順

### Step 1: 現在の環境を診断

以下のコマンドを実行し、各ツールのインストール状況を確認してください:

```bash
echo "=== OS ===" && uname -s && sw_vers 2>/dev/null || cat /etc/os-release 2>/dev/null
echo "=== Homebrew ===" && brew --version 2>/dev/null || echo "未インストール"
echo "=== Node.js ===" && node --version 2>/dev/null || echo "未インストール"
echo "=== npm ===" && npm --version 2>/dev/null || echo "未インストール"
echo "=== GitHub CLI ===" && gh --version 2>/dev/null || echo "未インストール"
echo "=== Claude Code ===" && claude --version 2>/dev/null || echo "未インストール"
echo "=== Gemini CLI ===" && gemini --version 2>/dev/null || echo "未インストール"
echo "=== Codex CLI ===" && codex --version 2>/dev/null || echo "未インストール"
```

結果を日本語で分かりやすく一覧表示してください:
- ✅ インストール済み（バージョン付き）
- ❌ 未インストール

### Step 2: 不足ツールのインストール

未インストールのツールがあれば、以下の順番で1つずつインストールしてください。
**各ステップごとにユーザーに「インストールしてよいですか？」と確認してから実行すること。**

#### 2-1: Homebrew（macOS のみ）
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Apple Silicon Mac の場合は追加で:
```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
```

#### 2-2: Node.js（v20以上）
```bash
brew install node@22
```

#### 2-3: GitHub CLI
```bash
brew install gh
```

#### 2-4: Claude Code
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

#### 2-5: Gemini CLI
```bash
npm install -g @google/gemini-cli
```

#### 2-6: Codex CLI
```bash
npm install -g @openai/codex
```

### Step 3: プロジェクト依存パッケージ

`node_modules` が存在しない、または `package-lock.json` より古い場合:
```bash
npm install
```

### Step 4: GitHub 認証

GitHub CLI の認証状態を確認:
```bash
gh auth status
```

未認証の場合、ユーザーに以下を案内:
- 「GitHub にログインする必要があります。今からブラウザが開きますので、GitHub アカウントでログインしてください」
- ユーザーの承認を得てから実行:
```bash
gh auth login
```

### Step 5: セットアップ完了の確認

全ツールの状態を再確認し、結果を表示してください。

全て ✅ であれば、以下を案内:

```
セットアップが完了しました！

サイトを更新するには:
  /project:site-update 変更したい内容を入力

プレビューするには:
  /project:site-preview

公開に反映するには:
  /project:site-publish
```

❌ が残っている場合は、問題の原因と解決方法を案内してください。

## 一括セットアップスクリプト

対話形式ではなく一括で実行したい場合は、以下を案内:
```bash
bash scripts/setup.sh
```

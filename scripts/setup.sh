#!/bin/bash
# =============================================================================
# 開邦雄飛会 公式サイト - 開発環境セットアップスクリプト
# =============================================================================
#
# 使い方（ターミナルにコピペして実行するだけ）:
#   bash scripts/setup.sh
#
# または、リポジトリをまだクローンしていない場合:
#   bash <(curl -fsSL https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts/setup.sh)
#
# このスクリプトは以下を自動でインストール・設定します:
#   1. Homebrew（macOS のパッケージマネージャー）
#   2. Node.js（JavaScript 実行環境）
#   3. GitHub CLI（gh コマンド）
#   4. Claude Code（Anthropic の AI エージェント）
#   5. Gemini CLI（Google の AI エージェント）
#   6. Codex CLI（OpenAI の AI エージェント）
#   7. プロジェクトの依存パッケージ
# =============================================================================

set -e

# --- 色付き出力 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

print_header() {
  echo ""
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BOLD}${CYAN}  $1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_step() {
  echo -e "${GREEN}  ✓${NC} $1"
}

print_skip() {
  echo -e "${YELLOW}  →${NC} $1（すでにインストール済み）"
}

print_action() {
  echo -e "${CYAN}  ▶${NC} $1"
}

print_error() {
  echo -e "${RED}  ✗${NC} $1"
}

print_info() {
  echo -e "${YELLOW}  ℹ${NC} $1"
}

# --- OS 判定 ---
detect_os() {
  case "$(uname -s)" in
    Darwin*) echo "macos" ;;
    Linux*)  echo "linux" ;;
    MINGW*|MSYS*|CYGWIN*) echo "windows" ;;
    *) echo "unknown" ;;
  esac
}

OS=$(detect_os)

# =============================================================================
print_header "開邦雄飛会 公式サイト - 開発環境セットアップ"
echo ""
echo -e "  このスクリプトは、サイト更新に必要なツールを自動でインストールします。"
echo -e "  途中でパスワードの入力を求められる場合があります。"
echo ""

# =============================================================================
# Step 1: Homebrew（macOS のみ）
# =============================================================================
if [ "$OS" = "macos" ]; then
  print_header "Step 1/7: Homebrew（パッケージマネージャー）"

  if command -v brew &>/dev/null; then
    print_skip "Homebrew $(brew --version | head -1 | awk '{print $2}')"
  else
    print_action "Homebrew をインストールしています..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Apple Silicon の場合 PATH に追加
    if [ -f /opt/homebrew/bin/brew ]; then
      eval "$(/opt/homebrew/bin/brew shellenv)"
      echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    fi
    print_step "Homebrew をインストールしました"
  fi
else
  print_header "Step 1/7: Homebrew（スキップ - macOS 以外）"
  print_info "Linux の場合は apt/dnf を使用します"
fi

# =============================================================================
# Step 2: Node.js
# =============================================================================
print_header "Step 2/7: Node.js（JavaScript 実行環境）"

if command -v node &>/dev/null; then
  NODE_VERSION=$(node --version)
  NODE_MAJOR=$(echo "$NODE_VERSION" | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 20 ]; then
    print_skip "Node.js $NODE_VERSION"
  else
    print_action "Node.js を v20 以上にアップグレードしています..."
    if [ "$OS" = "macos" ]; then
      brew install node@22
    else
      curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
      sudo apt-get install -y nodejs
    fi
    print_step "Node.js $(node --version) にアップグレードしました"
  fi
else
  print_action "Node.js をインストールしています..."
  if [ "$OS" = "macos" ]; then
    brew install node@22
  else
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
  print_step "Node.js $(node --version) をインストールしました"
fi

# =============================================================================
# Step 3: GitHub CLI
# =============================================================================
print_header "Step 3/7: GitHub CLI（gh コマンド）"

if command -v gh &>/dev/null; then
  print_skip "GitHub CLI $(gh --version | head -1 | awk '{print $3}')"
else
  print_action "GitHub CLI をインストールしています..."
  if [ "$OS" = "macos" ]; then
    brew install gh
  else
    (type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
      && sudo mkdir -p -m 755 /etc/apt/keyrings \
      && out=$(mktemp) && wget -nv -O"$out" https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      && cat "$out" | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
      && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
      && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
      && sudo apt update \
      && sudo apt install gh -y
  fi
  print_step "GitHub CLI $(gh --version | head -1 | awk '{print $3}') をインストールしました"
fi

# =============================================================================
# Step 4: Claude Code
# =============================================================================
print_header "Step 4/7: Claude Code（Anthropic AI エージェント）"

if command -v claude &>/dev/null; then
  print_skip "Claude Code $(claude --version 2>/dev/null || echo '(バージョン不明)')"
else
  print_action "Claude Code をインストールしています..."
  curl -fsSL https://claude.ai/install.sh | bash
  print_step "Claude Code をインストールしました"
fi

# =============================================================================
# Step 5: Gemini CLI
# =============================================================================
print_header "Step 5/7: Gemini CLI（Google AI エージェント）"

if command -v gemini &>/dev/null; then
  print_skip "Gemini CLI $(gemini --version 2>/dev/null || echo '(バージョン不明)')"
else
  print_action "Gemini CLI をインストールしています..."
  npm install -g @google/gemini-cli
  print_step "Gemini CLI をインストールしました"
fi

# =============================================================================
# Step 6: Codex CLI
# =============================================================================
print_header "Step 6/7: Codex CLI（OpenAI AI エージェント）"

if command -v codex &>/dev/null; then
  print_skip "Codex CLI $(codex --version 2>/dev/null || echo '(バージョン不明)')"
else
  print_action "Codex CLI をインストールしています..."
  npm install -g @openai/codex
  print_step "Codex CLI をインストールしました"
fi

# =============================================================================
# Step 7: プロジェクト依存パッケージ
# =============================================================================
print_header "Step 7/7: プロジェクトの依存パッケージ"

# リポジトリのルートにいるか確認
if [ -f "package.json" ]; then
  print_action "npm install を実行しています..."
  npm install
  print_step "依存パッケージをインストールしました"
else
  print_info "プロジェクトディレクトリ外で実行されています"
  print_info "リポジトリをクローン後に npm install を実行してください"
fi

# =============================================================================
# 完了メッセージ
# =============================================================================
print_header "セットアップ完了！"

echo ""
echo -e "  ${GREEN}すべてのツールがインストールされました。${NC}"
echo ""
echo -e "  ${BOLD}次のステップ:${NC}"
echo ""
echo -e "  ${CYAN}1.${NC} GitHub にログイン（まだの場合）:"
echo -e "     ${BOLD}gh auth login${NC}"
echo ""
echo -e "  ${CYAN}2.${NC} お好きな AI エージェントを起動:"
echo -e "     ${BOLD}claude${NC}    ← Claude Code（Anthropic）"
echo -e "     ${BOLD}gemini${NC}    ← Gemini CLI（Google）"
echo -e "     ${BOLD}codex${NC}     ← Codex CLI（OpenAI）"
echo ""
echo -e "  ${CYAN}3.${NC} AI エージェント内でサイトを更新:"
echo -e "     ${BOLD}/site-update トップページの見出しを変更して${NC}"
echo ""
echo -e "  ${YELLOW}※ 各 AI エージェントの初回起動時に認証が求められます。${NC}"
echo -e "  ${YELLOW}  画面の指示に従ってログインしてください。${NC}"
echo ""

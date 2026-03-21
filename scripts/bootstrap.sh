#!/bin/bash
# =============================================================================
# 開邦雄飛会 公式サイト - ワンライナーブートストラップ（macOS / Linux / WSL）
# =============================================================================
#
# 使い方（ターミナルにこの1行をコピペするだけ）:
#
#   curl -fsSL https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts/bootstrap.sh | bash
#
# Git も Homebrew も Node.js も不要。このスクリプトが全て自動でインストールします。
# =============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${CYAN}  開邦雄飛会 公式サイト - 開発環境セットアップ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

REPO_URL="https://github.com/kaiho-yuuhikai/official-site.git"
INSTALL_DIR="$HOME/official-site"

# --- Homebrew ---
if [[ "$(uname -s)" == "Darwin" ]]; then
  if ! command -v brew &>/dev/null; then
    echo -e "${CYAN}[1/9]${NC} Homebrew をインストール中..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    if [ -f /opt/homebrew/bin/brew ]; then
      eval "$(/opt/homebrew/bin/brew shellenv)"
      echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile 2>/dev/null || true
    fi
  else
    echo -e "${GREEN}[1/9]${NC} Homebrew ✓"
  fi
else
  echo -e "${GREEN}[1/9]${NC} Homebrew（スキップ - Linux）"
fi

# --- Git ---
if ! command -v git &>/dev/null; then
  echo -e "${CYAN}[2/9]${NC} Git をインストール中..."
  if [[ "$(uname -s)" == "Darwin" ]]; then
    brew install git
  else
    sudo apt-get update -qq && sudo apt-get install -y -qq git
  fi
else
  echo -e "${GREEN}[2/9]${NC} Git ✓"
fi

# --- Node.js ---
if ! command -v node &>/dev/null || [ "$(node --version | sed 's/v//' | cut -d. -f1)" -lt 20 ]; then
  echo -e "${CYAN}[3/9]${NC} Node.js をインストール中..."
  if [[ "$(uname -s)" == "Darwin" ]]; then
    brew install node@22
  else
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y -qq nodejs
  fi
else
  echo -e "${GREEN}[3/9]${NC} Node.js $(node --version) ✓"
fi

# --- GitHub CLI ---
if ! command -v gh &>/dev/null; then
  echo -e "${CYAN}[4/9]${NC} GitHub CLI をインストール中..."
  if [[ "$(uname -s)" == "Darwin" ]]; then
    brew install gh
  else
    (type -p wget >/dev/null || (sudo apt-get update -qq && sudo apt-get install -y -qq wget)) \
      && sudo mkdir -p -m 755 /etc/apt/keyrings \
      && out=$(mktemp) && wget -nv -O"$out" https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      && cat "$out" | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
      && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
      && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
      && sudo apt-get update -qq \
      && sudo apt-get install -y -qq gh
  fi
else
  echo -e "${GREEN}[4/9]${NC} GitHub CLI ✓"
fi

# --- Claude Code ---
if ! command -v claude &>/dev/null; then
  echo -e "${CYAN}[5/9]${NC} Claude Code をインストール中..."
  curl -fsSL https://claude.ai/install.sh | bash
else
  echo -e "${GREEN}[5/9]${NC} Claude Code ✓"
fi

# --- Gemini CLI ---
if ! command -v gemini &>/dev/null; then
  echo -e "${CYAN}[6/9]${NC} Gemini CLI をインストール中..."
  npm install -g @google/gemini-cli 2>/dev/null
else
  echo -e "${GREEN}[6/9]${NC} Gemini CLI ✓"
fi

# --- Codex CLI ---
if ! command -v codex &>/dev/null; then
  echo -e "${CYAN}[7/9]${NC} Codex CLI をインストール中..."
  npm install -g @openai/codex 2>/dev/null
else
  echo -e "${GREEN}[7/9]${NC} Codex CLI ✓"
fi

# --- リポジトリ & npm install ---
echo -e "${CYAN}[8/9]${NC} プロジェクトをセットアップ中..."
if [ -d "$INSTALL_DIR/.git" ]; then
  cd "$INSTALL_DIR"
  git pull --quiet origin main
else
  git clone --quiet "$REPO_URL" "$INSTALL_DIR"
  cd "$INSTALL_DIR"
fi
npm install --silent

# --- Playwright ブラウザ ---
echo -e "${CYAN}[9/9]${NC} Playwright ブラウザをインストール中..."
npx playwright install chromium 2>/dev/null

# --- 完了 ---
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}${BOLD}  セットアップ完了！${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${BOLD}次の2ステップで始められます:${NC}"
echo ""
echo -e "  ${CYAN}Step 1:${NC} プロジェクトに移動"
echo -e "         ${BOLD}cd $INSTALL_DIR${NC}"
echo ""
echo -e "  ${CYAN}Step 2:${NC} AI エージェントを起動（どれか1つ）"
echo -e "         ${BOLD}claude${NC}   ← Anthropic"
echo -e "         ${BOLD}gemini${NC}   ← Google"
echo -e "         ${BOLD}codex${NC}    ← OpenAI"
echo ""
echo -e "  起動後、以下のコマンドでサイトを更新できます:"
echo -e "  ${BOLD}/site-update トップページの見出しを変更して${NC}"
echo ""
echo -e "  ${YELLOW}※ 初回起動時にログインが求められます。画面の指示に従ってください。${NC}"
echo ""

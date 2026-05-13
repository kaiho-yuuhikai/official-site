#!/usr/bin/env bash
# =============================================================================
# Google CLI 三種セットアップ (macOS / Linux)
#
# 雄飛会プロジェクトで使う 3 つの Google 関連 CLI を一括インストール:
#   1. clasp  — Google Apps Script CLI (公式) / GAS コード push/deploy 用
#   2. gws    — Google Workspace CLI (Rust, googleworkspace/cli)
#              Discovery API ベースで Drive/Gmail/Sheets/Calendar 等を一発操作
#   3. gog    — gogcli (Go, openclaw/gogcli)
#              Drive 監査・読み取り業務に強い
#
# 使い方:
#   bash scripts/setup-google-clis.sh             # 通常実行
#   bash scripts/setup-google-clis.sh --skip-clasp # clasp は既に入っているのでスキップ
# =============================================================================

set -euo pipefail

SKIP_CLASP=0
SKIP_GWS=0
SKIP_GOG=0

for arg in "$@"; do
  case "$arg" in
    --skip-clasp) SKIP_CLASP=1 ;;
    --skip-gws)   SKIP_GWS=1 ;;
    --skip-gog)   SKIP_GOG=1 ;;
    --help|-h)
      echo "Usage: $0 [--skip-clasp] [--skip-gws] [--skip-gog]"
      exit 0
      ;;
  esac
done

print_step() { printf "\n\033[1;36m▶ %s\033[0m\n" "$1"; }
print_ok()   { printf "  \033[1;32m✅ %s\033[0m\n" "$1"; }
print_warn() { printf "  \033[1;33m⚠️  %s\033[0m\n" "$1"; }
print_err()  { printf "  \033[1;31m❌ %s\033[0m\n" "$1"; }

OS="$(uname -s)"
ARCH="$(uname -m)"

# ------------ 1. clasp ------------
if [ "$SKIP_CLASP" -eq 0 ]; then
  print_step "clasp (Google Apps Script CLI) をインストール"
  if command -v clasp >/dev/null 2>&1; then
    print_ok "clasp 既にインストール済 ($(clasp --version 2>&1 | head -1))"
  else
    if ! command -v npm >/dev/null 2>&1; then
      print_err "npm が見つかりません。Node.js をインストールしてから再実行してください。"
      exit 1
    fi
    npm install -g @google/clasp
    print_ok "clasp インストール完了"
  fi
  echo
  echo "  次の手順:"
  echo "    clasp login    # 開発者アカウント (dev ドメイン) でログイン"
  echo "    cd scripts/gas/donations && clasp push"
fi

# ------------ 2. gws ------------
if [ "$SKIP_GWS" -eq 0 ]; then
  print_step "gws (Google Workspace CLI) をインストール"
  if command -v gws >/dev/null 2>&1; then
    print_ok "gws 既にインストール済 ($(gws --version 2>&1 | head -1))"
  else
    if [ "$OS" = "Darwin" ] && command -v brew >/dev/null 2>&1; then
      brew install googleworkspace-cli || npm install -g @googleworkspace/cli
    else
      npm install -g @googleworkspace/cli
    fi
    print_ok "gws インストール完了"
  fi
  echo
  echo "  次の手順:"
  echo "    gws auth setup    # 対話的に OAuth 設定 (gcloud があると最も簡単)"
  echo "    gws auth login    # スコープ選択 (推奨: drive,sheets,gmail,forms,script)"
  echo "    gws drive files list --params '{\"pageSize\": 5}'  # 動作確認"
fi

# ------------ 3. gog ------------
if [ "$SKIP_GOG" -eq 0 ]; then
  print_step "gog (gogcli) をインストール"
  if command -v gog >/dev/null 2>&1; then
    print_ok "gog 既にインストール済 ($(gog --version 2>&1 | head -1))"
  else
    if [ "$OS" = "Darwin" ] && command -v brew >/dev/null 2>&1; then
      brew install gogcli
      print_ok "gog インストール完了"
    elif command -v docker >/dev/null 2>&1; then
      print_warn "Homebrew がないため Docker での実行を推奨します:"
      echo "  alias gog='docker run --rm ghcr.io/openclaw/gogcli:latest'"
    else
      print_warn "Homebrew も Docker もないため、手動インストールを推奨:"
      echo "  https://github.com/openclaw/gogcli から最新リリースを DL"
    fi
  fi
  echo
  echo "  次の手順:"
  echo "    gog auth credentials ~/Downloads/client_secret_xxx.json"
  echo "    gog auth add you@gmail.com --services drive,sheets,gmail"
  echo "    gog drive tree --parent <folderId> --depth 2  # 動作確認"
fi

print_step "セットアップ完了"
echo "  Claude Code で /setup-google-clis を呼ぶと初回 OAuth まで対話的に案内します。"
echo "  詳細: docs/onboarding/business-user-guide.md §7.6"

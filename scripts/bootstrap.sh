#!/usr/bin/env bash
# =============================================================================
# 開邦雄飛会 公式サイト - ワンライナー（macOS / Linux）
# =============================================================================
#
#   curl -fsSL https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts/bootstrap.sh | bash
#
# 中身は onboard.sh（GScale-jp/fde-setup 由来の共通エンジン）に統合された。
# このファイルは、すでに配布済みのURLを壊さないための転送用。
# =============================================================================
set -uo pipefail

BASE="https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd || echo .)"

if [ -f "$SCRIPT_DIR/onboard.sh" ]; then
  exec bash "$SCRIPT_DIR/onboard.sh" "$@"
fi

TMP="$(mktemp -t onboard.XXXXXX.sh)"
if ! curl -fsSL "$BASE/onboard.sh" -o "$TMP" || [ ! -s "$TMP" ]; then
  echo "セットアップスクリプトを取得できませんでした。ネット接続をご確認ください。" >&2
  exit 1
fi
exec bash "$TMP" "$@"

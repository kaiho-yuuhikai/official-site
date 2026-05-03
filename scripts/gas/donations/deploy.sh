#!/usr/bin/env bash
#
# clasp で Apps Script プロジェクトを作成・push・デプロイし、
# Web アプリ URL を取得するワンショットスクリプト。
#
# 前提:
#   - clasp が同窓会用 Google アカウントで認証済み（clasp login）
#   - このスクリプトを scripts/gas/donations/ ディレクトリで実行
#
# 出力:
#   - .clasp.json（gitignore 済み）
#   - 標準出力に SCRIPT_ID / WEB_APP_URL を表示
#
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f .clasp.json ]; then
  echo ">>> Creating Apps Script project..."
  clasp create --type standalone --title "開邦雄飛会 寄付システム" --rootDir .
fi

echo ">>> Pushing files..."
clasp push -f

echo ">>> Open GAS editor and run setupAll() once:"
echo "    clasp open"
echo ""
echo "After setupAll() completes, deploy the web app:"
echo "    clasp deploy --description 'v1: donations endpoint'"
echo "    clasp deployments"

#!/usr/bin/env bash
# =============================================================================
# GScale Onboard — 「1コマンドで、AIと一緒に働けるPCにする」共通エンジン（macOS / Linux）
# =============================================================================
#
# install_all.sh が「ツールを入れる」までを担うのに対し、本スクリプトは
# **人がつまずく残り全部**（GitHubログイン・招待承諾・Git設定・VS Code の日本語化と
# 拡張機能・プロジェクトの取り込み・Claudeログイン）まで面倒を見る。
#
# 実行:
#   bash onboard.sh                  # プロファイル既定で実行
#   bash onboard.sh --check          # 何も変更せず現状診断
#   bash onboard.sh --skip-vscode    # VS Code を触らない
#
# プロファイル: 下の PROFILE ブロックの変数を差し替えるだけで別案件に転用できる。
#   scripts/vendor_onboard.sh が profiles/<name>.env を流し込んで
#   「単体で配れる onboard.sh」を生成する。
#
# 終了コード: 0=完了(PASS) / 2=一部未完(PARTIAL)
# 実行ログ: ~/gscale-onboard.log
# =============================================================================
set -uo pipefail

# curl ... | bash では標準入力がスクリプト本体になる。この状態で read や
# gh auth login を呼ぶと、スクリプトの残りの行を入力として食べてしまい、
# 画面が止まったように見える（開邦雄飛会 2026-08-25 で実発生）。
# 配布済みのワンライナーは PDF や告知に載っていて回収できないため、
# スクリプト側で吸収する: 対話だけは端末から直接読む。
if [ -t 0 ]; then                       TTY_IN=/dev/stdin
elif ( : < /dev/tty ) 2>/dev/null; then TTY_IN=/dev/tty
else                                    TTY_IN=/dev/null
fi

# >>> PROFILE >>>
# ！このファイルは GScale-jp/fde-setup (@e098047) から自動生成されています。
# ！ここを直接編集しないでください。編集は fde-setup 側 → vendor_onboard.sh で再生成。
# ！profile: kaiho-yuuhikai
: "${PROFILE_ID:=kaiho-yuuhikai}"
: "${PROFILE_NAME:=開邦雄飛会 公式サイト}"
: "${PROJECT_REPO:=https://github.com/kaiho-yuuhikai/official-site.git}"
: "${PROJECT_DIR:=$HOME/official-site}"
: "${PROJECT_SETUP_CMD:=npm install && npx playwright install chromium}"
: "${TOOLSET:=lite}"
: "${VSCODE_EXTENSIONS:=anthropic.claude-code MS-CEINTL.vscode-language-pack-ja Vue.volar}"
: "${WELCOME_DOC:=docs/onboarding/claude-code-workshop-prep.md}"
: "${ASSET_BASE_URL:=https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts}"
: "${EXTRA_NPM_GLOBALS:=@google/gemini-cli @openai/codex}"
: "${NEXT_HINT:=    VS Code の中で claude と打つか、ターミナルで「cd ~/official-site」→「claude」}"
# <<< PROFILE <<<

# ---- パイプ実行（curl | bash）でも対話できるようにする -----------------------
# これが無いと read/gh のプロンプトが「スクリプト本文」を食べてしまい、
# 名前やメールが空のまま設定される（旧 bootstrap.sh の実害あるバグ）。
if [ ! -t 0 ] && [ -e /dev/tty ]; then exec < /dev/tty; fi

CHECK_ONLY=0; SKIP_VSCODE=0; SKIP_PROJECT=0
for a in "$@"; do
  case "$a" in
    --check|--check-only) CHECK_ONLY=1 ;;
    --skip-vscode)        SKIP_VSCODE=1 ;;
    --skip-project)       SKIP_PROJECT=1 ;;
    --help|-h)
      sed -n '2,22p' "$0"; exit 0 ;;
  esac
done

LOG_FILE="${GSCALE_ONBOARD_LOG:-$HOME/gscale-onboard.log}"
if [ "$CHECK_ONLY" = "0" ]; then
  : > "$LOG_FILE" 2>/dev/null || LOG_FILE=/dev/null
  exec > >(tee -a "$LOG_FILE") 2>&1
fi

C_B=$'\033[1m'; C_G=$'\033[0;32m'; C_Y=$'\033[1;33m'; C_R=$'\033[0;31m'; C_C=$'\033[0;36m'; C_N=$'\033[0m'
[ -t 1 ] || { C_B=; C_G=; C_Y=; C_R=; C_C=; C_N=; }

log()  { printf '%s\n' "$*"; }
step() { log ""; log "${C_C}[$1/$TOTAL_STEPS]${C_N} ${C_B}$2${C_N}"; }
ok()   { log "  ${C_G}OK${C_N}  $1"; }
ng()   { log "  ${C_R}--${C_N}  $1"; }
warn() { log "  ${C_Y}!${C_N}   $1"; }
has()  { command -v "$1" >/dev/null 2>&1; }
open_url() {
  if has open; then open "$1" >/dev/null 2>&1
  elif has xdg-open; then xdg-open "$1" >/dev/null 2>&1
  else log "  ブラウザで開いてください: $1"; fi
}

TOTAL_STEPS=7
FAILED=""
fail() { FAILED="$FAILED $1"; ng "$2"; }

LOCAL_BIN="$HOME/.local/bin"
export PATH="$LOCAL_BIN:$HOME/.local/node/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

# リポジトリ名 → 既定の作業ディレクトリ
if [ -n "$PROJECT_REPO" ] && [ -z "$PROJECT_DIR" ]; then
  PROJECT_DIR="$HOME/$(basename "${PROJECT_REPO%.git}")"
fi

log ""
log "${C_C}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C_N}"
log "  ${C_B}$PROFILE_NAME — かんたんセットアップ${C_N}"
log "${C_C}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C_N}"
log "  途中でブラウザが2回開きます（GitHub と Claude のログイン）。"
log "  合計10〜20分ほど。ほとんどは待ち時間です。"
[ "$CHECK_ONLY" = "1" ] && log "  ${C_Y}[診断モード] 何も変更しません${C_N}"

# =============================================================================
# 1. 前提の確認
# =============================================================================
step 1 "パソコンの状態を確認しています"
OS="$(uname -s)"
case "$OS" in
  Darwin) ok "macOS $(sw_vers -productVersion 2>/dev/null)" ;;
  Linux)  ok "Linux $(uname -r)" ;;
  *)      ng "未対応のOS: $OS"; exit 2 ;;
esac
if curl -fsSI -m 8 https://github.com >/dev/null 2>&1; then ok "インターネット接続"
else warn "外部サイトへ接続できません。社内プロキシ/セキュリティソフトの可能性があります（続行します）"; fi

# =============================================================================
# 2. ツール導入（install_all.sh に委譲＝FDE本体と同じ導入ロジックを共有）
# =============================================================================
step 2 "必要なソフトを入れています（ここが一番時間がかかります）"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd || echo .)"
INSTALLER=""
for cand in "$SCRIPT_DIR/install_all.sh" "$SCRIPT_DIR/install_all_linux.sh"; do
  [ -f "$cand" ] && { INSTALLER="$cand"; break; }
done
if [ -z "$INSTALLER" ] && [ -n "$ASSET_BASE_URL" ]; then
  NAME=install_all.sh; [ "$OS" = "Linux" ] && NAME=install_all_linux.sh
  TMP_INST="$(mktemp -t install_all.XXXXXX.sh)"
  if curl -fsSL "$ASSET_BASE_URL/$NAME" -o "$TMP_INST" && [ -s "$TMP_INST" ]; then
    INSTALLER="$TMP_INST"; ok "インストーラを取得（${NAME}）"
  fi
fi

if [ -z "$INSTALLER" ]; then
  fail installer "インストーラ(install_all.sh)が見つかりません"
elif [ "$CHECK_ONLY" = "1" ]; then
  CHECK_ONLY=1 bash "$INSTALLER" || true
else
  # lite = コア(node/git/gh/claude) + VS Code。gcloud/clasp/python/uv は入れない。
  # 先頭のダミーは「空配列 + set -u」が bash 3.2（macOS 標準）で落ちるのを避けるため。
  INST_ENV=(GSCALE_ONBOARD=1)
  if [ "$TOOLSET" = "lite" ]; then INST_ENV+=(MINIMAL=1 WITH_VSCODE=1); fi
  [ "$SKIP_VSCODE" = "1" ] && INST_ENV+=(SKIP_VSCODE=1 WITH_VSCODE=0)
  [ -n "$PROJECT_DIR" ] && INST_ENV+=(TRUST_DIR="$PROJECT_DIR")
  env "${INST_ENV[@]}" bash "$INSTALLER" || true
  hash -r 2>/dev/null || true
fi

for t in git node gh claude; do
  has "$t" && ok "$t" || fail "$t" "$t が見つかりません"
done

# プロファイル指定の追加CLI（例: Gemini CLI / Codex CLI）
if [ -n "$EXTRA_NPM_GLOBALS" ] && [ "$CHECK_ONLY" = "0" ] && has npm; then
  for pkg in $EXTRA_NPM_GLOBALS; do
    if npm install -g "$pkg" >/dev/null 2>&1; then ok "$pkg"
    else warn "$pkg の導入に失敗（必須ではありません）"; fi
  done
fi

# =============================================================================
# 3. GitHub にログイン（＋招待の自動承諾＋Git の名前設定）
# =============================================================================
step 3 "GitHub にログインします"
if ! has gh; then
  fail gh-auth "gh が無いためログインできません"
elif gh auth status >/dev/null 2>&1; then
  ok "ログイン済み（$(gh api user --jq .login 2>/dev/null)）"
elif [ "$CHECK_ONLY" = "1" ]; then
  ng "未ログイン"
else
  # アカウントの有無をここで確認する（無い人を「作成」まで連れて行く）
  log "  GitHub のアカウントはお持ちですか？"
  printf '  お持ちなら y、これから作るなら n を入れて Enter [y/n]: '
  read -r HAS_GH < "$TTY_IN" || HAS_GH=y
  case "${HAS_GH:-y}" in
    n|N|no|NO|No)
      log ""
      log "  ${C_B}作成ページをブラウザで開きます。${C_N}"
      log "  ${C_Y}招待メール（GitHub からの Invitation）が届いている方は、${C_N}"
      log "  ${C_Y}そのメールのリンクから作成してください。参加の手続きが自動で終わります。${C_N}"
      log ""
      log "  入力するのは メールアドレス／パスワード／ユーザー名 の3つだけです。"
      log "  ユーザー名は半角英数字で、他の人と同じものは使えません（例: uema-shoko）。"
      open_url "https://github.com/signup"
      log ""
      printf '  作成が終わったら Enter を押してください… '
      read -r _ < "$TTY_IN" || true
      ;;
  esac
  log ""
  log "  続けて、このパソコンと GitHub をつなぎます。"
  log "  ブラウザが開いたら、画面に出る8文字のコードを貼り付けてください。"
  gh auth login --hostname github.com --git-protocol https --web < "$TTY_IN" || true
  gh auth status >/dev/null 2>&1 && ok "ログインできました" || fail gh-auth "GitHub ログイン未完了"
fi

if [ "$CHECK_ONLY" = "0" ] && gh auth status >/dev/null 2>&1; then
  gh auth setup-git >/dev/null 2>&1 && ok "git が GitHub を使えるようになりました"

  # リポジトリ招待を自動で承諾（メールのボタンを押しに行く手間をなくす）
  INV="$(gh api user/repository_invitations --jq '.[].id' 2>/dev/null || true)"
  if [ -n "$INV" ]; then
    for id in $INV; do gh api --method PATCH "user/repository_invitations/$id" >/dev/null 2>&1 && ok "リポジトリの招待を承諾しました"; done
  fi

  # Git の名前・メールは GitHub から取得（入力させない＝つまずきを1つ消す）
  if [ -z "$(git config --global user.name 2>/dev/null)" ] || [ -z "$(git config --global user.email 2>/dev/null)" ]; then
    GH_LOGIN="$(gh api user --jq .login 2>/dev/null)"
    GH_NAME="$(gh api user --jq '.name // .login' 2>/dev/null)"
    GH_ID="$(gh api user --jq .id 2>/dev/null)"
    GH_MAIL="$(gh api user --jq '.email // empty' 2>/dev/null)"
    [ -z "$GH_MAIL" ] && [ -n "$GH_ID" ] && GH_MAIL="${GH_ID}+${GH_LOGIN}@users.noreply.github.com"
    if [ -n "$GH_NAME" ] && [ -n "$GH_MAIL" ]; then
      git config --global user.name  "$GH_NAME"
      git config --global user.email "$GH_MAIL"
      ok "Git の名前を設定: $GH_NAME <$GH_MAIL>"
    fi
  else
    ok "Git の名前は設定済み（$(git config --global user.name)）"
  fi
fi

# 対象リポジトリへ「書き込める」か（当日いちばん多い失敗を前日に検知する）
NEED_ACCESS=0
if [ -n "$PROJECT_REPO" ] && has gh && gh auth status >/dev/null 2>&1; then
  SLUG="$(printf '%s' "$PROJECT_REPO" | sed -E 's#^https?://[^/]+/##; s#\.git$##')"
  MY_LOGIN="$(gh api user --jq .login 2>/dev/null)"
  CAN_PUSH="$(gh api "repos/$SLUG" --jq '.permissions.push' 2>/dev/null || echo unknown)"
  if [ "$CAN_PUSH" = "true" ]; then
    ok "このリポジトリに公開できます"
  else
    NEED_ACCESS=1
    warn "まだ公開の権限がありません（読むことはできます）"
    warn "GitHub ユーザー名「${MY_LOGIN}」をグループに投稿してください（権限をお付けします）"
  fi
fi

# =============================================================================
# 4. VS Code を「使える状態」にする
# =============================================================================
step 4 "VS Code を使えるようにしています"
if [ "$SKIP_VSCODE" = "1" ]; then
  ng "スキップ指定"
else
  # code コマンドが無くてもアプリが入っていれば拾う（macOS で最も多いつまずき）
  if ! has code && [ "$OS" = "Darwin" ]; then
    for app in "/Applications/Visual Studio Code.app" "$HOME/Applications/Visual Studio Code.app"; do
      CODEBIN="$app/Contents/Resources/app/bin/code"
      if [ -x "$CODEBIN" ] && [ "$CHECK_ONLY" = "0" ]; then
        mkdir -p "$LOCAL_BIN"; ln -sf "$CODEBIN" "$LOCAL_BIN/code"; hash -r 2>/dev/null || true
        ok "code コマンドを使えるようにしました"; break
      fi
    done
  fi
  if has code; then
    ok "VS Code ($(code --version 2>/dev/null | head -1))"
    if [ "$CHECK_ONLY" = "0" ]; then
      INSTALLED="$(code --list-extensions 2>/dev/null || true)"
      for ext in $VSCODE_EXTENSIONS; do
        if printf '%s\n' "$INSTALLED" | grep -qix "$ext"; then ok "拡張機能 ${ext}（導入済）"
        elif code --install-extension "$ext" --force >/dev/null 2>&1; then ok "拡張機能 $ext を追加"
        else warn "拡張機能 $ext の追加に失敗（後で入れられます）"; fi
      done
    fi
  else
    fail vscode "VS Code が見つかりません"
  fi
fi

# =============================================================================
# 5. プロジェクトの取り込み
# =============================================================================
step 5 "プロジェクトを取り込んでいます"
if [ -z "$PROJECT_REPO" ] || [ "$SKIP_PROJECT" = "1" ]; then
  ng "対象なし（スキップ）"
elif [ "$CHECK_ONLY" = "1" ]; then
  [ -d "$PROJECT_DIR/.git" ] && ok "$PROJECT_DIR" || ng "$PROJECT_DIR が未取得"
elif ! has git; then
  fail project "git が無いため取り込めません"
else
  if [ -d "$PROJECT_DIR/.git" ]; then
    (cd "$PROJECT_DIR" && git pull --quiet --ff-only 2>/dev/null) && ok "最新に更新しました" || warn "更新をスキップ（ローカルに変更あり）"
  else
    if git clone --quiet "$PROJECT_REPO" "$PROJECT_DIR" 2>/dev/null; then ok "取り込みました → $PROJECT_DIR"
    else fail project "取り込みに失敗しました（${PROJECT_REPO}）"; fi
  fi
  if [ -d "$PROJECT_DIR" ] && [ -n "$PROJECT_SETUP_CMD" ]; then
    log "  + 依存パッケージを準備しています（数分かかります）..."
    (cd "$PROJECT_DIR" && eval "$PROJECT_SETUP_CMD" >/dev/null 2>&1) && ok "準備完了" || warn "依存パッケージの準備に失敗（後で再実行できます）"
  fi
fi

# =============================================================================
# 6. Claude Code のログイン確認
# =============================================================================
step 6 "Claude にログインできているか確認します"
claude_logged_in() {
  [ -f "$HOME/.claude/.credentials.json" ] && return 0
  [ "$OS" = "Darwin" ] && security find-generic-password -s "Claude Code-credentials" >/dev/null 2>&1 && return 0
  return 1
}
if ! has claude; then
  fail claude "claude が見つかりません"
elif claude_logged_in; then
  ok "ログイン済み"
else
  ng "未ログイン（この後の案内でログインします）"
  NEED_CLAUDE_LOGIN=1
fi

# =============================================================================
# 7. 仕上げ
# =============================================================================
step 7 "確認"
if [ -n "$FAILED" ]; then
  log ""
  log "${C_Y}━━ 未完了があります ━━${C_N}"
  for f in $FAILED; do log "  ・$f"; done
  log ""
  log "  ${C_B}この画面をそのままスクリーンショットして送ってください。${C_N}"
  log "  ログ: $LOG_FILE"
  RESULT=PARTIAL; RC=2
else
  RESULT=PASS; RC=0
fi

if [ "$CHECK_ONLY" = "1" ]; then
  log ""; log "GSCALE_ONBOARD_RESULT: $RESULT profile=$PROFILE_ID missing=${FAILED:-none}"
  exit $RC
fi

log ""
log "${C_C}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C_N}"
if [ "$RESULT" = "PASS" ]; then
  log "  ${C_G}${C_B}準備できました！${C_N}"
else
  log "  ${C_Y}${C_B}あと少しです${C_N}"
fi
log "${C_C}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C_N}"

# VS Code でプロジェクトを開く（ここまで来たら「触れる状態」になっている）
if [ "$SKIP_VSCODE" = "0" ] && has code && [ -d "${PROJECT_DIR:-}" ]; then
  if [ -n "$WELCOME_DOC" ] && [ -f "$PROJECT_DIR/$WELCOME_DOC" ]; then
    code "$PROJECT_DIR" "$PROJECT_DIR/$WELCOME_DOC" >/dev/null 2>&1 &
  else
    code "$PROJECT_DIR" >/dev/null 2>&1 &
  fi
  log "  VS Code を開きました。"
fi

if [ "${NEED_ACCESS:-0}" = "1" ]; then
  log ""
  log "  ${C_Y}${C_B}【ひとつだけお願いです】${C_N}"
  log "  ${C_B}GitHub ユーザー名「${MY_LOGIN:-}」をグループに投稿してください。${C_N}"
  log "  これが無いと、当日ホームページを公開するところまで進めません。"
fi

log ""
if [ "${NEED_CLAUDE_LOGIN:-0}" = "1" ]; then
  log "  ${C_B}最後に1回だけ、Claude のログインをします。${C_N}"
  log "  ブラウザが開いたら、ご自身の Claude アカウントで許可してください。"
  log "  （終わったら、そのまま Claude Code を使えます）"
  log ""
  if [ "$TTY_IN" = "/dev/null" ]; then
    # 端末が無い（パイプ実行・CI など）。claude は対話TUIなのでここで起動すると
    # 「Input must be provided ... when using --print」で必ず失敗する。
    # 起動せず、人がやる手順だけを案内する。
    log ""
    log "  ${C_Y}この画面からは Claude のログインを始められません（端末が無いため）。${C_N}"
    log "  ターミナルで次の2行を実行してください:"
    log ""
    [ -n "${PROJECT_DIR:-}" ] && log "    cd $PROJECT_DIR"
    log "    claude"
    log ""
  else
    printf '  Enter キーを押すと始まります… '
    read -r _ < "$TTY_IN" || true
    [ -n "${PROJECT_DIR:-}" ] && [ -d "$PROJECT_DIR" ] && cd "$PROJECT_DIR"
    exec claude < "$TTY_IN"
  fi
fi

log "  ${C_B}次にやること${C_N}"
if [ -n "$NEXT_HINT" ]; then
  log "$NEXT_HINT"
else
  [ -n "${PROJECT_DIR:-}" ] && log "    cd $PROJECT_DIR && claude"
fi
log ""
log "GSCALE_ONBOARD_RESULT: $RESULT profile=$PROFILE_ID missing=${FAILED:-none}"
exit $RC

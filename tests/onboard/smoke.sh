#!/usr/bin/env bash
# =============================================================================
# onboard.sh / install_all.sh の受け入れテスト（macOS）
#
# 2026-08-25 の勉強会で Mac の参加者が連続して同じ場所で止まった。いずれも
# 「構文は通るが実際に走らせると壊れる」たぐいで bash -n では捕まらない。
# 実際に走らせて「人が見る挙動」を確かめる。
#
# 実インストールは行わない（install_all.sh はスタブに差し替える）。
# 見たいのは onboard.sh 側の分岐であって、ツールの導入そのものではない。
#
# 実行: bash tests/onboard/smoke.sh
# =============================================================================
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OB="$ROOT/scripts/onboard.sh"
IA="$ROOT/scripts/install_all.sh"
PASS=0; FAIL=0
ok()  { echo "  OK   $1"; PASS=$((PASS+1)); }
bad() { echo "  FAIL $1"; FAIL=$((FAIL+1)); }

SANDBOX="$(mktemp -d)"; echo "SANDBOX=$SANDBOX"
[ "${KEEP:-0}" = "1" ] || trap 'rm -rf "$SANDBOX"' EXIT
# onboard.sh は自分で PATH の先頭に $HOME/.local/bin と /opt/homebrew/bin を足す。
# 単に PATH へ足しただけのスタブは /opt/homebrew の本物に負けるので、
# 必ず最優先になる $HOME/.local/bin に置く。
STUB="$SANDBOX/stub"; mkdir -p "$STUB"
install_stubs() {  # $1 = そのテストの HOME
  mkdir -p "$1/.local/bin"
  cp "$STUB"/* "$1/.local/bin/" 2>/dev/null || true
  chmod +x "$1/.local/bin"/* 2>/dev/null || true
}

# gh のスタブ。本物だとデバイス認証の待ちに入り、テストが人の操作を待って
# 止まってしまう。ここで見たいのは onboard.sh の分岐であって gh の挙動ではない。
mk_gh_stub() {
  cat > "$STUB/gh" <<'EOF'
#!/bin/bash
case "$*" in
  "auth status"*)     exit 0 ;;
  "auth setup-git"*)  exit 0 ;;
  "--version"*)       echo "gh version 0.0.0 (stub)"; exit 0 ;;
  "api user"*)        echo "testuser"; exit 0 ;;
  "api "*)            echo "[]"; exit 0 ;;
esac
exit 0
EOF
  chmod +x "$STUB/gh"
}

# install_all.sh のスタブ（何も入れずに正常終了）
mk_workdir() {
  local d="$1"; mkdir -p "$d"
  cp "$OB" "$d/onboard.sh"
  printf '#!/bin/bash\necho "  (install_all: スタブ)"\nexit 0\n' > "$d/install_all.sh"
  chmod +x "$d/install_all.sh"
}
# curl | bash と同じ形（標準入力がスクリプト本体）で走らせる。
# PROJECT_SETUP_CMD を空にしないと npm install と Playwright の取得まで走る。
# 応答が無いまま止まるのも不具合なので、上限時間を切って必ず戻る。
run_piped() {
  local d="$1"; shift
  local out="$d/out.txt"
  ( cd "$d" && cat onboard.sh | env "$@" ASSET_BASE_URL=" " PROJECT_SETUP_CMD=" " EXTRA_NPM_GLOBALS=" " \
      bash -s -- --skip-vscode --skip-project > "$out" 2>&1 ) &
  local pid=$! waited=0
  while kill -0 "$pid" 2>/dev/null && [ "$waited" -lt 90 ]; do sleep 2; waited=$((waited+2)); done
  if kill -0 "$pid" 2>/dev/null; then
    kill -9 "$pid" 2>/dev/null
    echo "__TIMEOUT__"
  fi
  cat "$out" 2>/dev/null
}

# --- T1: .ps1 の BOM がファイル先頭にあるか -------------------------------
echo "[T1] .ps1 の BOM がファイル先頭にある"
for f in "$ROOT/scripts/onboard.ps1" "$ROOT/scripts/install_all.ps1"; do
  [ -f "$f" ] || continue
  if head -c 3 "$f" | cmp -s - <(printf '\xef\xbb\xbf') && [ "$(grep -c $'\xef\xbb\xbf' "$f")" -le 1 ]; then
    ok "$(basename "$f")"
  else bad "$(basename "$f") の BOM が先頭でない"; fi
done

# --- T2: 対話が端末から読まれる作りになっているか -------------------------
echo "[T2] read / gh auth login が端末から読む"
if grep -vE '^[[:space:]]*#' "$OB" | grep -E '(^|[[:space:]])read -r' | grep -qv 'TTY_IN'
then bad "TTY_IN を使わない read がある"; else ok "read はすべて TTY_IN 経由"; fi
if grep -vE '^[[:space:]]*#' "$OB" | grep 'gh auth login' | grep -qv 'TTY_IN'
then bad "TTY_IN を使わない gh auth login がある"; else ok "gh auth login も TTY_IN 経由"; fi

# --- T3: curl|bash で完走し、claude を自動起動しない -----------------------
echo "[T3] curl | bash 形式で完走し claude を自動起動しない"
# 端末なしで起動されたら本物と同じエラーを返す claude を置く
printf '#!/bin/bash\nif [ ! -t 0 ]; then echo "Error: Input must be provided either through stdin or as a prompt argument when using --print" >&2; exit 1; fi\necho "claude(interactive)"\n' > "$STUB/claude"
chmod +x "$STUB/claude"
mk_gh_stub
mk_workdir "$SANDBOX/w1"
install_stubs "$SANDBOX/h1"
OUT="$(run_piped "$SANDBOX/w1" HOME="$SANDBOX/h1" PATH="$STUB:$PATH")"
case "$OUT" in
  *__TIMEOUT__*) bad "90秒以内に終わらなかった（入力待ちで止まっている可能性）" ;;
esac
case "$OUT" in
  *"Input must be provided"*) bad "claude を端末なしで起動して失敗している" ;;
  *) ok "claude を誤って起動していない" ;;
esac
case "$OUT" in
  *"次にやること"*) ok "スクリプト末尾まで到達している" ;;
  *) bad "末尾まで到達していない（read が本体を食った可能性）"; echo "$OUT" | tail -15 ;;
esac

# --- T4: CLT未導入の git スタブを「動かない」と判定できるか ----------------
echo "[T4] CLT未導入の git スタブを検出する"
printf '#!/bin/bash\necho "xcode-select: note: No developer tools were found." >&2\nexit 1\n' > "$STUB/git"
chmod +x "$STUB/git"
mk_workdir "$SANDBOX/w2"
install_stubs "$SANDBOX/h2"
OUT2="$(run_piped "$SANDBOX/w2" HOME="$SANDBOX/h2" PATH="$STUB:/usr/bin:/bin")"
case "$OUT2" in
  *"xcode-select --install"*) ok "CLT未導入を案内できている" ;;
  *) bad "git が動かないのに CLT の案内が出ていない" ;;
esac
# ツール確認の行は「  OK  git」で行が終わる。
# 「OK  git が GitHub を使えるように…」(gh auth setup-git) と紛れないよう行末で固定する。
if printf '%s' "$OUT2" | grep -qE '^[[:space:]]+OK[[:space:]]+git[[:space:]]*$'
then bad "動かない git を OK と判定している"; else ok "動かない git を OK と判定していない"; fi
# 未完了一覧に git が挙がっているか（案内だけ出して素通りしていないか）
case "$OUT2" in
  *"missing="*git*|*"・git"*) ok "未完了として git が報告されている" ;;
  *) bad "git が未完了として報告されていない" ;;
esac

# --- T5: PATH が macOS の bash（ログインシェル）に効く場所へ書かれるか -----
echo "[T5] PATH が .bash_profile / .profile にも書かれる"
RC_HOME="$SANDBOX/h3"; mkdir -p "$RC_HOME"
sed -n '/^ensure_local_path()/,/^}/p' "$IA" > "$SANDBOX/rc.sh"
( set -uo pipefail
  HOME="$RC_HOME"; LOCAL_BIN="$RC_HOME/.local/bin"; LOCAL_NODE="$RC_HOME/.local/node"
  . "$SANDBOX/rc.sh"; ensure_local_path >/dev/null 2>&1 )
for rc in .bash_profile .profile .zprofile; do
  if grep -qs 'FDE PATH' "$RC_HOME/$rc"; then ok "$rc に書かれた"
  else bad "$rc に書かれていない（macOSのbashでPATHが効かない）"; fi
done

echo ""
echo "==== 合計: PASS=$PASS FAIL=$FAIL ===="
[ "$FAIL" -eq 0 ]

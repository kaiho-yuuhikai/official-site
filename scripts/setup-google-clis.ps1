# =============================================================================
# Google CLI 三種セットアップ (Windows PowerShell)
#
# 雄飛会プロジェクトで使う 3 つの Google 関連 CLI を一括インストール:
#   1. clasp — Google Apps Script CLI (公式) / GAS コード push/deploy 用
#   2. gws   — Google Workspace CLI (Rust, googleworkspace/cli)
#   3. gog   — gogcli (Go, openclaw/gogcli)
#
# 使い方 (PowerShell):
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#   .\scripts\setup-google-clis.ps1
#   .\scripts\setup-google-clis.ps1 -SkipClasp -SkipGog
# =============================================================================

param(
    [switch]$SkipClasp,
    [switch]$SkipGws,
    [switch]$SkipGog
)

$ErrorActionPreference = "Stop"

function Write-Step($text) {
    Write-Host ""
    Write-Host "▶ $text" -ForegroundColor Cyan
}
function Write-Ok($text)   { Write-Host "  [OK] $text" -ForegroundColor Green }
function Write-Warn($text) { Write-Host "  [WARN] $text" -ForegroundColor Yellow }
function Write-Err($text)  { Write-Host "  [ERR] $text" -ForegroundColor Red }

function Test-Command($name) {
    return (Get-Command $name -ErrorAction SilentlyContinue) -ne $null
}

# ------------ 1. clasp ------------
if (-not $SkipClasp) {
    Write-Step "clasp (Google Apps Script CLI) をインストール"
    if (Test-Command "clasp") {
        Write-Ok ("clasp 既にインストール済 (" + (clasp --version 2>&1 | Select-Object -First 1) + ")")
    } else {
        if (-not (Test-Command "npm")) {
            Write-Err "npm が見つかりません。Node.js をインストールしてから再実行してください。"
            exit 1
        }
        npm install -g @google/clasp
        Write-Ok "clasp インストール完了"
    }
    Write-Host ""
    Write-Host "  次の手順:"
    Write-Host "    clasp login    # 開発者アカウント (dev ドメイン) でログイン"
    Write-Host "    cd scripts/gas/donations; clasp push"
}

# ------------ 2. gws ------------
if (-not $SkipGws) {
    Write-Step "gws (Google Workspace CLI) をインストール"
    if (Test-Command "gws") {
        Write-Ok ("gws 既にインストール済 (" + (gws --version 2>&1 | Select-Object -First 1) + ")")
    } else {
        # winget があれば優先、なければ npm
        if (Test-Command "winget") {
            try {
                winget install googleworkspace-cli 2>&1 | Out-Null
                Write-Ok "gws インストール完了 (winget)"
            } catch {
                npm install -g @googleworkspace/cli
                Write-Ok "gws インストール完了 (npm fallback)"
            }
        } else {
            npm install -g @googleworkspace/cli
            Write-Ok "gws インストール完了 (npm)"
        }
    }
    Write-Host ""
    Write-Host "  次の手順:"
    Write-Host "    gws auth setup    # 対話的に OAuth 設定 (gcloud があると最も簡単)"
    Write-Host "    gws auth login    # スコープ選択 (推奨: drive,sheets,gmail,forms,script)"
    Write-Host "    gws drive files list --params '{`"pageSize`": 5}'  # 動作確認"
}

# ------------ 3. gog ------------
if (-not $SkipGog) {
    Write-Step "gog (gogcli) をインストール"
    if (Test-Command "gog") {
        Write-Ok ("gog 既にインストール済 (" + (gog --version 2>&1 | Select-Object -First 1) + ")")
    } else {
        Write-Warn "gog の Windows 公式インストーラーは ZIP 配布のみです。"
        Write-Host "  推奨手順:"
        Write-Host "    1. https://github.com/openclaw/gogcli/releases から gogcli_*_windows_amd64.zip を DL"
        Write-Host "    2. zip を展開し、gog.exe を PATH (例: C:\Users\<user>\bin) に配置"
        Write-Host "    3. PowerShell を再起動して 'gog --version' で確認"
        Write-Host ""
        Write-Host "  Docker を使う場合 (推奨):"
        Write-Host "    Set-Alias gog 'docker run --rm ghcr.io/openclaw/gogcli:latest'"
    }
    Write-Host ""
    Write-Host "  次の手順:"
    Write-Host "    gog auth credentials .\client_secret_xxx.json"
    Write-Host "    gog auth add you@gmail.com --services drive,sheets,gmail"
    Write-Host "    gog drive tree --parent <folderId> --depth 2  # 動作確認"
}

Write-Step "セットアップ完了"
Write-Host "  Claude Code で /setup-google-clis を呼ぶと初回 OAuth まで対話的に案内します。"
Write-Host "  詳細: docs/onboarding/business-user-guide.md §7.6"

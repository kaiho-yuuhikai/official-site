# =============================================================================
# 開邦雄飛会 公式サイト - ワンライナーブートストラップ（Windows PowerShell）
# =============================================================================
#
# 使い方（PowerShell にこの1行をコピペするだけ）:
#
#   irm https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts/bootstrap.ps1 | iex
#
# Git も Node.js も不要。このスクリプトが全て自動でインストールします。
# =============================================================================

$ErrorActionPreference = "Continue"

function Test-Cmd($name) { $null -ne (Get-Command $name -ErrorAction SilentlyContinue) }
function Refresh-Path {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
}

$repoUrl = "https://github.com/kaiho-yuuhikai/official-site.git"
$installDir = Join-Path $env:USERPROFILE "official-site"

Write-Host ""
Write-Host ("=" * 58) -ForegroundColor Blue
Write-Host "  Kaiho Yuuhikai Official Site - Setup" -ForegroundColor Cyan
Write-Host ("=" * 58) -ForegroundColor Blue
Write-Host ""

# --- WinGet check ---
if (-not (Test-Cmd "winget")) {
    Write-Host "  [!!] WinGet not found. Please install App Installer from Microsoft Store." -ForegroundColor Red
    Write-Host "       https://apps.microsoft.com/detail/9NBLGGH4NNS1" -ForegroundColor Yellow
    exit 1
}

# --- Git ---
if (Test-Cmd "git") {
    Write-Host "  [1/10] Git OK" -ForegroundColor Green
} else {
    Write-Host "  [1/10] Installing Git..." -ForegroundColor Cyan
    winget install --id Git.Git --accept-source-agreements --accept-package-agreements --silent
    Refresh-Path
}

# --- Node.js ---
if (Test-Cmd "node") {
    $major = [int]((node --version) -replace 'v(\d+)\..*','$1')
    if ($major -ge 20) {
        Write-Host "  [2/10] Node.js OK" -ForegroundColor Green
    } else {
        Write-Host "  [2/10] Upgrading Node.js..." -ForegroundColor Cyan
        winget install --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements --silent
        Refresh-Path
    }
} else {
    Write-Host "  [2/10] Installing Node.js..." -ForegroundColor Cyan
    winget install --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements --silent
    Refresh-Path
}

# --- GitHub CLI ---
if (Test-Cmd "gh") {
    Write-Host "  [3/10] GitHub CLI OK" -ForegroundColor Green
} else {
    Write-Host "  [3/10] Installing GitHub CLI..." -ForegroundColor Cyan
    winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements --silent
    Refresh-Path
}

# --- Claude Code ---
if (Test-Cmd "claude") {
    Write-Host "  [4/10] Claude Code OK" -ForegroundColor Green
} else {
    Write-Host "  [4/10] Installing Claude Code..." -ForegroundColor Cyan
    try { irm https://claude.ai/install.ps1 | iex } catch {
        Write-Host "       (Manual install may be needed: irm https://claude.ai/install.ps1 | iex)" -ForegroundColor Yellow
    }
}

# --- Gemini CLI ---
if (Test-Cmd "gemini") {
    Write-Host "  [5/10] Gemini CLI OK" -ForegroundColor Green
} else {
    Write-Host "  [5/10] Installing Gemini CLI..." -ForegroundColor Cyan
    npm install -g @google/gemini-cli 2>$null
}

# --- Codex CLI ---
if (Test-Cmd "codex") {
    Write-Host "  [6/10] Codex CLI OK" -ForegroundColor Green
} else {
    Write-Host "  [6/10] Installing Codex CLI..." -ForegroundColor Cyan
    npm install -g @openai/codex 2>$null
}

# --- Clone & npm install ---
Write-Host "  [7/10] Setting up project..." -ForegroundColor Cyan
if (Test-Path (Join-Path $installDir ".git")) {
    Set-Location $installDir
    git pull --quiet origin main
} else {
    git clone --quiet $repoUrl $installDir
    Set-Location $installDir
}

Write-Host "  [8/10] Installing dependencies..." -ForegroundColor Cyan
npm install --silent

# --- Playwright browsers ---
Write-Host "  [9/10] Installing Playwright browser..." -ForegroundColor Cyan
npx playwright install chromium 2>$null

# --- Git ユーザー設定 ---
$gitUserName = git config user.name 2>$null
$gitUserEmail = git config user.email 2>$null

if ($gitUserName -and $gitUserEmail) {
    Write-Host "  [10/10] Git user: $gitUserName <$gitUserEmail> OK" -ForegroundColor Green
} else {
    Write-Host "  [10/10] Git ユーザー設定..." -ForegroundColor Cyan
    $inputName = Read-Host "  お名前（例: 山田太郎）"
    $inputEmail = Read-Host "  メールアドレス（例: taro@example.com）"
    git config --global user.name "$inputName"
    git config --global user.email "$inputEmail"
    Write-Host "  [OK] Git ユーザーを設定しました: $inputName <$inputEmail>" -ForegroundColor Green
}

# --- Done ---
Write-Host ""
Write-Host ("=" * 58) -ForegroundColor Blue
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host ("=" * 58) -ForegroundColor Blue
Write-Host ""
Write-Host "  Next 2 steps:" -ForegroundColor White
Write-Host ""
Write-Host "  Step 1: " -ForegroundColor Cyan -NoNewline
Write-Host "cd $installDir"
Write-Host ""
Write-Host "  Step 2: " -ForegroundColor Cyan -NoNewline
Write-Host "Start an AI agent (pick one):"
Write-Host "           claude   <- Anthropic"
Write-Host "           gemini   <- Google"
Write-Host "           codex    <- OpenAI"
Write-Host ""
Write-Host "  Then update the site:" -ForegroundColor White
Write-Host "  /site-update Change the homepage headline" -ForegroundColor White
Write-Host ""
Write-Host "  * You'll be asked to log in on first launch." -ForegroundColor Yellow
Write-Host ""

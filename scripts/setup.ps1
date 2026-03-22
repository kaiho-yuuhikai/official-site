# =============================================================================
# 開邦雄飛会 公式サイト - 開発環境セットアップスクリプト（Windows PowerShell用）
# =============================================================================
#
# 使い方（PowerShell にコピペして実行）:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\scripts\setup.ps1
#
# このスクリプトは以下を自動でインストール・設定します:
#   1. Git for Windows（未インストールの場合）
#   2. Node.js（未インストールの場合）
#   3. GitHub CLI（gh コマンド）
#   4. Claude Code（Anthropic の AI エージェント）
#   5. Gemini CLI（Google の AI エージェント）
#   6. Codex CLI（OpenAI の AI エージェント）
#   7. プロジェクトの依存パッケージ
# =============================================================================

$ErrorActionPreference = "Stop"

function Write-Header($text) {
    Write-Host ""
    Write-Host ("=" * 58) -ForegroundColor Blue
    Write-Host "  $text" -ForegroundColor Cyan
    Write-Host ("=" * 58) -ForegroundColor Blue
}

function Write-Step($text) {
    Write-Host "  [OK] $text" -ForegroundColor Green
}

function Write-Skip($text) {
    Write-Host "  [->] $text (already installed)" -ForegroundColor Yellow
}

function Write-Action($text) {
    Write-Host "  [..] $text" -ForegroundColor Cyan
}

function Write-Problem($text) {
    Write-Host "  [!!] $text" -ForegroundColor Red
}

function Write-Notice($text) {
    Write-Host "  [i]  $text" -ForegroundColor Yellow
}

function Test-Command($name) {
    $null -ne (Get-Command $name -ErrorAction SilentlyContinue)
}

# =============================================================================
Write-Header "Kaiho Yuuhikai Official Site - Dev Environment Setup"
Write-Host ""
Write-Host "  This script will install the tools needed to update the site."
Write-Host "  You may be prompted for confirmation during installation."
Write-Host ""

# =============================================================================
# Step 1: Git for Windows
# =============================================================================
Write-Header "Step 1/8: Git for Windows"

if (Test-Command "git") {
    $gitVer = (git --version) -replace "git version ", ""
    Write-Skip "Git $gitVer"
} else {
    Write-Action "Installing Git for Windows via WinGet..."
    try {
        winget install --id Git.Git --accept-source-agreements --accept-package-agreements
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        Write-Step "Git for Windows installed"
    } catch {
        Write-Problem "WinGet failed. Please install Git manually: https://git-scm.com/downloads/win"
    }
}

# =============================================================================
# Step 2: Node.js
# =============================================================================
Write-Header "Step 2/8: Node.js"

if (Test-Command "node") {
    $nodeVer = (node --version)
    $nodeMajor = [int]($nodeVer -replace "v(\d+)\..*", '$1')
    if ($nodeMajor -ge 20) {
        Write-Skip "Node.js $nodeVer"
    } else {
        Write-Action "Upgrading Node.js to v22..."
        winget install --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        Write-Step "Node.js upgraded to $(node --version)"
    }
} else {
    Write-Action "Installing Node.js..."
    winget install --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
    Write-Step "Node.js $(node --version) installed"
}

# =============================================================================
# Step 3: GitHub CLI
# =============================================================================
Write-Header "Step 3/8: GitHub CLI"

if (Test-Command "gh") {
    $ghVer = ((gh --version) | Select-Object -First 1) -replace "gh version (\S+).*", '$1'
    Write-Skip "GitHub CLI $ghVer"
} else {
    Write-Action "Installing GitHub CLI..."
    winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
    Write-Step "GitHub CLI installed"
}

# =============================================================================
# Step 4: Claude Code
# =============================================================================
Write-Header "Step 4/8: Claude Code (Anthropic)"

if (Test-Command "claude") {
    $claudeVer = (claude --version 2>$null) -join " "
    Write-Skip "Claude Code $claudeVer"
} else {
    Write-Action "Installing Claude Code..."
    try {
        irm https://claude.ai/install.ps1 | iex
        Write-Step "Claude Code installed"
    } catch {
        Write-Problem "Claude Code installation failed. Try manually: irm https://claude.ai/install.ps1 | iex"
    }
}

# =============================================================================
# Step 5: Gemini CLI
# =============================================================================
Write-Header "Step 5/8: Gemini CLI (Google)"

if (Test-Command "gemini") {
    $geminiVer = (gemini --version 2>$null) -join " "
    Write-Skip "Gemini CLI $geminiVer"
} else {
    Write-Action "Installing Gemini CLI..."
    npm install -g @google/gemini-cli
    Write-Step "Gemini CLI installed"
}

# =============================================================================
# Step 6: Codex CLI
# =============================================================================
Write-Header "Step 6/8: Codex CLI (OpenAI)"

if (Test-Command "codex") {
    $codexVer = (codex --version 2>$null) -join " "
    Write-Skip "Codex CLI $codexVer"
} else {
    Write-Action "Installing Codex CLI..."
    npm install -g @openai/codex
    Write-Step "Codex CLI installed"
}

# =============================================================================
# Step 7: Project dependencies
# =============================================================================
Write-Header "Step 7/8: Project Dependencies"

if (Test-Path "package.json") {
    Write-Action "Running npm install..."
    npm install
    Write-Step "Dependencies installed"
} else {
    Write-Notice "Not in project directory. Run 'npm install' after cloning the repo."
}

# =============================================================================
# Step 8/8: Git User Config
# =============================================================================
Write-Header "Step 8/8: Git User Config"

$gitUserName = git config user.name 2>$null
$gitUserEmail = git config user.email 2>$null

if ($gitUserName -and $gitUserEmail) {
    Write-Skip "Git user: $gitUserName <$gitUserEmail>"
} else {
    Write-Action "Git のコミットに使用するユーザー情報を設定します"
    $inputName = Read-Host "  お名前（例: 山田太郎）"
    $inputEmail = Read-Host "  メールアドレス（例: taro@example.com）"
    git config --global user.name "$inputName"
    git config --global user.email "$inputEmail"
    Write-Step "Git ユーザーを設定しました: $inputName <$inputEmail>"
}

# =============================================================================
# Done
# =============================================================================
Write-Header "Setup Complete!"

Write-Host ""
Write-Host "  All tools have been installed." -ForegroundColor Green
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor White
Write-Host ""
Write-Host "  1." -ForegroundColor Cyan -NoNewline
Write-Host " Log in to GitHub (if not already):"
Write-Host "     gh auth login" -ForegroundColor White
Write-Host ""
Write-Host "  2." -ForegroundColor Cyan -NoNewline
Write-Host " Start an AI agent:"
Write-Host "     claude" -ForegroundColor White -NoNewline
Write-Host "    <- Claude Code (Anthropic)"
Write-Host "     gemini" -ForegroundColor White -NoNewline
Write-Host "    <- Gemini CLI (Google)"
Write-Host "     codex" -ForegroundColor White -NoNewline
Write-Host "     <- Codex CLI (OpenAI)"
Write-Host ""
Write-Host "  3." -ForegroundColor Cyan -NoNewline
Write-Host " Update the site from within the agent:"
Write-Host "     /site-update Change the homepage headline" -ForegroundColor White
Write-Host ""
Write-Host "  * Each AI agent will ask you to log in on first launch." -ForegroundColor Yellow
Write-Host "    Follow the on-screen instructions." -ForegroundColor Yellow
Write-Host ""

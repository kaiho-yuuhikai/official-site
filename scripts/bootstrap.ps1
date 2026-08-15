# =============================================================================
# 開邦雄飛会 公式サイト - ワンライナー（Windows PowerShell）
# =============================================================================
#
#   irm https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts/bootstrap.ps1 | iex
#
# 中身は onboard.ps1（GScale-jp/fde-setup 由来の共通エンジン）に統合された。
# このファイルは、すでに配布済みのURLを壊さないための転送用。
# =============================================================================
$ErrorActionPreference = "Continue"

$base = "https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts"
$local = if ($PSScriptRoot) { Join-Path $PSScriptRoot "onboard.ps1" } else { "" }

if ($local -and (Test-Path $local)) {
  & powershell -NoProfile -ExecutionPolicy Bypass -File $local
  exit $LASTEXITCODE
}

$tmp = Join-Path $env:TEMP "onboard.ps1"
try {
  Invoke-WebRequest -Uri ($base + "/onboard.ps1") -OutFile $tmp -UseBasicParsing
} catch {
  Write-Host "セットアップスクリプトを取得できませんでした。ネット接続をご確認ください。" -ForegroundColor Red
  exit 1
}
& powershell -NoProfile -ExecutionPolicy Bypass -File $tmp
exit $LASTEXITCODE

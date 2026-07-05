$ErrorActionPreference = "SilentlyContinue"

$Root = Split-Path -Parent $PSScriptRoot
$PidFiles = @(
    (Join-Path $Root "backend-preview-9000.pid"),
    (Join-Path $Root "frontend-preview-2003.pid")
)

foreach ($pidFile in $PidFiles) {
    if (Test-Path $pidFile) {
        $processId = [int](Get-Content -Raw -LiteralPath $pidFile).Trim()
        taskkill /PID $processId /T /F | Out-Null
        Remove-Item -LiteralPath $pidFile -Force
    }
}

Write-Host "local preview stopped"

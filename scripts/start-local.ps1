$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$BackendOut = Join-Path $Root "backend-preview-9000.out.log"
$BackendErr = Join-Path $Root "backend-preview-9000.err.log"
$BackendPid = Join-Path $Root "backend-preview-9000.pid"
$FrontendOut = Join-Path $Root "frontend-preview-2003.out.log"
$FrontendErr = Join-Path $Root "frontend-preview-2003.err.log"
$FrontendPid = Join-Path $Root "frontend-preview-2003.pid"

Remove-Item -LiteralPath $BackendOut, $BackendErr, $BackendPid, $FrontendOut, $FrontendErr, $FrontendPid -Force -ErrorAction SilentlyContinue

$backendProcess = Start-Process `
    -FilePath "python" `
    -ArgumentList @("-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "9000") `
    -WorkingDirectory (Join-Path $Root "backend") `
    -WindowStyle Hidden `
    -RedirectStandardOutput $BackendOut `
    -RedirectStandardError $BackendErr `
    -PassThru

Set-Content -Encoding ASCII -LiteralPath $BackendPid -Value $backendProcess.Id

$frontendProcess = Start-Process `
    -FilePath "cmd.exe" `
    -ArgumentList @("/c", "npm.cmd run dev -- -p 2003") `
    -WorkingDirectory (Join-Path $Root "frontend") `
    -WindowStyle Hidden `
    -RedirectStandardOutput $FrontendOut `
    -RedirectStandardError $FrontendErr `
    -PassThru

Set-Content -Encoding ASCII -LiteralPath $FrontendPid -Value $frontendProcess.Id

Write-Host "Backend:  http://localhost:9000"
Write-Host "Frontend: http://localhost:2003"
Write-Host "PID files: backend-preview-9000.pid, frontend-preview-2003.pid"

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot

Write-Host "== Backend smoke tests =="
Push-Location (Join-Path $Root "backend")
python -c "from fastapi.testclient import TestClient; from main import app; client = TestClient(app); assert client.get('/api/health').status_code == 200; assert len(client.get('/api/tasks').json()['tasks']) == 30; assert client.get('/api/daily/7').status_code == 200; assert client.get('/api/frontier/7').status_code == 200; assert client.get('/api/progress').status_code == 200; print('backend ok')"
Pop-Location

Write-Host "== Frontend lint =="
Push-Location (Join-Path $Root "frontend")
npm.cmd run lint

Write-Host "== Frontend build =="
npm.cmd run build
Pop-Location

Write-Host "== Unified init check =="
$initScript = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $Root "init.sh")
Invoke-Expression $initScript

Write-Host "verify ok"

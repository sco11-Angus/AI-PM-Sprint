#!/usr/bin/env bash
# Linux CI verify script — mirrors scripts/verify.ps1
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "== Backend smoke tests =="
cd "$ROOT/backend"
python -c "
from fastapi.testclient import TestClient
from main import app
client = TestClient(app)
assert client.get('/api/health').status_code == 200
assert len(client.get('/api/tasks').json()['tasks']) == 30
assert client.get('/api/daily/7').status_code == 200
assert client.get('/api/frontier/7').status_code == 200
assert client.get('/api/progress').status_code == 200
print('backend ok')
"

echo "== Frontend lint =="
cd "$ROOT/frontend"
npm run lint

echo "== Frontend build =="
npm run build

echo "verify ok"

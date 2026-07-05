# AI PM Sprint Deployment Notes

## Local Preview

Backend:

```powershell
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 9000
```

Frontend:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev -- -p 2003
```

Open:

```text
http://localhost:2003
```

## Environment

Copy `backend/.env.example` to `backend/.env.local` and set the real API key.

The default model gateway is:

```text
AI_PROVIDER=minimax
AI_MODEL=MiniMax-M3
AI_BASE_URL=https://api.minimax.chat/v1/chat/completions
AI_API_KEY_ENV=MINIMAX_API_KEY
```

`backend/.env.local` is intentionally ignored by Git.

## Verification

Run:

```powershell
.\scripts\verify.ps1
```

This verifies:

- backend health and core API smoke tests
- frontend lint
- frontend production build
- repository `init.sh` content

## CI/CD Pipeline

### Overview

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| CI | `.github/workflows/ci.yml` | push/PR to main | Backend smoke tests + Frontend lint/build + Integration verify |
| PR Check | `.github/workflows/pr-check.yml` | Pull request to main | Quick quality gate (syntax, import, lint) |
| Deploy | `.github/workflows/deploy.yml` | CI passes on main | Auto-deploy frontend to Vercel, backend to Render |

```
push to main ──► CI (ci.yml)
                  ├─ backend-test  (Python smoke tests)
                  ├─ frontend-build (lint + build)
                  └─ integration   (full verify.sh)
                        │
                        ▼ (on success)
                  Deploy (deploy.yml)
                  ├─ deploy-frontend → Vercel
                  └─ deploy-backend  → Render
```

### Required GitHub Secrets

Configure in **Settings → Secrets and variables → Actions**:

| Secret | Required for | How to get |
|--------|-------------|------------|
| `VERCEL_TOKEN` | Frontend deploy | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | Frontend deploy | Vercel → Settings → General → ID |
| `VERCEL_PROJECT_ID` | Frontend deploy | `vercel link` then read `.vercel/project.json` |
| `RENDER_DEPLOY_HOOK` | Backend deploy | Render → Service → Settings → Deploy Hook |

> If secrets are not configured, deploy steps are **skipped** (not failed).

### Frontend: Vercel

1. Import the repo at https://vercel.com/new
2. Root Directory: `frontend`
3. Framework Preset: Next.js (auto-detected)
4. Build Command: `npm run build` (auto)
5. Set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend URL
6. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` to GitHub Secrets

### Backend: Render

1. Create a new Web Service at https://render.com
2. Connect the GitHub repo
3. Root Directory: `backend`
4. Runtime: Python 3
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Health Check Path: `/api/health`
8. Set environment variables (`MINIMAX_API_KEY`, etc.)
9. Create a Deploy Hook and add its URL as `RENDER_DEPLOY_HOOK` in GitHub Secrets

> `render.yaml` Blueprint is included for one-click setup via Render dashboard.

### Docker

The backend includes a `Dockerfile` for containerized deployment:

```bash
docker build -t ai-pm-sprint-backend ./backend
docker run -p 9000:9000 --env-file backend/.env.local ai-pm-sprint-backend
```

## Production Direction

- Database: SQLite for local MVP; migrate to managed Postgres when user accounts or collaboration are added
- Set `NEXT_PUBLIC_API_BASE_URL` for the frontend to the deployed backend URL

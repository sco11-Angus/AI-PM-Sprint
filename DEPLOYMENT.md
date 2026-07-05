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

## Production Direction

Recommended split deployment:

- Frontend: Vercel or any Node-compatible host
- Backend: Render, Fly.io, Railway, or any Python ASGI host
- Database: SQLite for local MVP; migrate to managed Postgres when user accounts or collaboration are added

Set `NEXT_PUBLIC_API_BASE_URL` for the frontend to the deployed backend URL.

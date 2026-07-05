from fastapi import FastAPI

from database import check_connection

app = FastAPI(title="AI PM Sprint API")


@app.get("/")
def read_root():
    return {"message": "Hello AI PM Sprint"}


@app.get("/api/health")
def health_check():
    database_ok = check_connection()
    return {
        "status": "ok" if database_ok else "degraded",
        "service": "ai-pm-sprint-backend",
        "database": "connected" if database_ok else "unavailable",
    }

from typing import Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from database import check_connection, initialize_database
from services import (
    get_daily_content,
    get_frontier_insight,
    get_progress_summary,
    get_task,
    list_tasks,
    update_progress,
)

app = FastAPI(title="AI PM Sprint API")


class ProgressUpdate(BaseModel):
    status: Literal["not_started", "in_progress", "completed"]
    user_output: str | None = None


@app.on_event("startup")
def startup() -> None:
    initialize_database()


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


@app.get("/api/tasks")
def get_tasks():
    return {"tasks": list_tasks()}


@app.get("/api/tasks/{day}")
def get_task_by_day(day: int):
    task = get_task(day)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.get("/api/daily/{day}")
def get_daily_by_day(day: int):
    if get_task(day) is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return get_daily_content(day)


@app.get("/api/frontier/{day}")
def get_frontier_by_day(day: int):
    if get_task(day) is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return get_frontier_insight(day)


@app.get("/api/progress")
def get_progress():
    return get_progress_summary()


@app.put("/api/progress/{day}")
def put_progress(day: int, payload: ProgressUpdate):
    if get_task(day) is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return update_progress(day, payload.status, payload.user_output)

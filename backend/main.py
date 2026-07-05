from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import check_connection, initialize_database
from services import (
    ask_model,
    configure_model,
    get_daily_content,
    get_frontier_insight,
    get_public_model_config,
    get_progress_summary,
    get_task,
    list_tasks,
    update_progress,
)

app = FastAPI(title="AI PM Sprint API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:2000",
        "http://localhost:2003",
        "http://127.0.0.1:2000",
        "http://127.0.0.1:2003",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProgressUpdate(BaseModel):
    status: Literal["not_started", "in_progress", "completed"]
    user_output: str | None = None


class ModelConfigUpdate(BaseModel):
    provider: str | None = None
    model: str | None = None
    base_url: str | None = None
    api_key: str | None = None
    api_key_env: str | None = None


class AskRequest(BaseModel):
    question: str
    context: str | None = None


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


@app.get("/api/model-config")
def get_model_configuration():
    return get_public_model_config()


@app.put("/api/model-config")
def put_model_configuration(payload: ModelConfigUpdate):
    return configure_model(
        provider=payload.provider,
        model=payload.model,
        base_url=payload.base_url,
        api_key=payload.api_key,
        api_key_env=payload.api_key_env,
    )


@app.post("/api/ai/ask")
def post_ai_ask(payload: AskRequest):
    try:
        return ask_model(payload.question, payload.context)
    except RuntimeError as error:
        raise HTTPException(status_code=502, detail=str(error)) from error


@app.put("/api/progress/{day}")
def put_progress(day: int, payload: ProgressUpdate):
    if get_task(day) is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return update_progress(day, payload.status, payload.user_output)

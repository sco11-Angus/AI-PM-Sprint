from datetime import datetime, timezone
from typing import Any

from database import get_connection
from models import DayTask, UserProgress


def _build_seed_task(day: int) -> DayTask:
    concepts = [
        "Prompt",
        "RAG",
        "Agent",
        "Embedding",
        "Evaluation",
        "Workflow",
        "AI Product Metrics",
    ]
    concept = concepts[(day - 1) % len(concepts)]
    return DayTask(
        id=None,
        day=day,
        title=f"Day {day}: {concept} Product Sprint",
        objective=f"Understand {concept} and identify one AI product opportunity.",
        thinking_prompt=f"Where can {concept} reduce user friction in a real workflow?",
        practice_prompt=f"Sketch a simple {concept}-powered feature and define its input/output.",
        output_prompt="Write one clear product insight and one next experiment.",
    )


def seed_day_tasks() -> None:
    with get_connection() as connection:
        count = connection.execute("SELECT COUNT(*) FROM day_tasks").fetchone()[0]
        if count >= 30:
            return

        tasks = [_build_seed_task(day) for day in range(1, 31)]
        connection.executemany(
            """
            INSERT OR IGNORE INTO day_tasks (
                day, title, objective, thinking_prompt, practice_prompt, output_prompt
            ) VALUES (?, ?, ?, ?, ?, ?)
            """,
            [
                (
                    task.day,
                    task.title,
                    task.objective,
                    task.thinking_prompt,
                    task.practice_prompt,
                    task.output_prompt,
                )
                for task in tasks
            ],
        )


def list_tasks() -> list[dict[str, Any]]:
    seed_day_tasks()
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, day, title, objective, thinking_prompt, practice_prompt, output_prompt
            FROM day_tasks
            ORDER BY day ASC
            """
        ).fetchall()
    return [DayTask.from_dict(dict(row)).to_dict() for row in rows]


def get_task(day: int) -> dict[str, Any] | None:
    seed_day_tasks()
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT id, day, title, objective, thinking_prompt, practice_prompt, output_prompt
            FROM day_tasks
            WHERE day = ?
            """,
            (day,),
        ).fetchone()
    if row is None:
        return None
    return DayTask.from_dict(dict(row)).to_dict()


def update_progress(day: int, status: str, user_output: str | None = None) -> dict[str, Any]:
    completed_at = datetime.now(timezone.utc).isoformat() if status == "completed" else None
    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO user_progress (day, status, user_output, completed_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(day) DO UPDATE SET
                status = excluded.status,
                user_output = excluded.user_output,
                completed_at = excluded.completed_at
            """,
            (day, status, user_output, completed_at),
        )
        row = connection.execute(
            """
            SELECT id, day, status, user_output, completed_at
            FROM user_progress
            WHERE day = ?
            """,
            (day,),
        ).fetchone()
    return UserProgress.from_dict(dict(row)).to_dict()

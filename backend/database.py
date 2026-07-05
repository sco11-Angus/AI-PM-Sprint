from pathlib import Path
import sqlite3


BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "ai_pm_sprint.db"


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    with get_connection() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS daily_content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                day INTEGER NOT NULL UNIQUE,
                tech_concept TEXT NOT NULL,
                tech_one_line TEXT NOT NULL,
                tech_principle TEXT NOT NULL,
                tech_example TEXT NOT NULL,
                news_title TEXT NOT NULL,
                news_summary TEXT NOT NULL,
                news_product_idea TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS day_tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                day INTEGER NOT NULL UNIQUE,
                title TEXT NOT NULL,
                objective TEXT NOT NULL,
                thinking_prompt TEXT NOT NULL,
                practice_prompt TEXT NOT NULL,
                output_prompt TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS user_progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                day INTEGER NOT NULL UNIQUE,
                status TEXT NOT NULL,
                user_output TEXT,
                completed_at TEXT
            );
            """
        )


def check_connection() -> bool:
    try:
        with get_connection() as connection:
            connection.execute("SELECT 1")
        return True
    except sqlite3.Error:
        return False

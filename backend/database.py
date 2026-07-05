from pathlib import Path
import sqlite3


BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "ai_pm_sprint.db"


def get_connection() -> sqlite3.Connection:
    return sqlite3.connect(DATABASE_PATH)


def check_connection() -> bool:
    try:
        with get_connection() as connection:
            connection.execute("SELECT 1")
        return True
    except sqlite3.Error:
        return False

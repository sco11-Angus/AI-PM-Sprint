from typing import Any

from database import get_connection
from models import DailyContent
from services.ai_service import generate_daily_content


def _row_to_daily_content(row: Any) -> dict[str, Any]:
    return DailyContent.from_dict(dict(row)).to_dict()


def get_daily_content(day: int) -> dict[str, Any]:
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT id, day, tech_concept, tech_one_line, tech_principle, tech_example,
                   news_title, news_summary, news_product_idea
            FROM daily_content
            WHERE day = ?
            """,
            (day,),
        ).fetchone()
        if row is not None:
            return _row_to_daily_content(row)

        generated = generate_daily_content(day)
        cursor = connection.execute(
            """
            INSERT INTO daily_content (
                day, tech_concept, tech_one_line, tech_principle, tech_example,
                news_title, news_summary, news_product_idea
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                generated["day"],
                generated["tech_concept"],
                generated["tech_one_line"],
                generated["tech_principle"],
                generated["tech_example"],
                generated["news_title"],
                generated["news_summary"],
                generated["news_product_idea"],
            ),
        )
        row = connection.execute(
            """
            SELECT id, day, tech_concept, tech_one_line, tech_principle, tech_example,
                   news_title, news_summary, news_product_idea
            FROM daily_content
            WHERE id = ?
            """,
            (cursor.lastrowid,),
        ).fetchone()
    return _row_to_daily_content(row)

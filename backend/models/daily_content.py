from dataclasses import asdict, dataclass
from typing import Any


@dataclass
class DailyContent:
    id: int | None
    day: int
    tech_concept: str
    tech_one_line: str
    tech_principle: str
    tech_example: str
    news_title: str
    news_summary: str
    news_product_idea: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "DailyContent":
        return cls(
            id=data.get("id"),
            day=int(data["day"]),
            tech_concept=data["tech_concept"],
            tech_one_line=data["tech_one_line"],
            tech_principle=data["tech_principle"],
            tech_example=data["tech_example"],
            news_title=data["news_title"],
            news_summary=data["news_summary"],
            news_product_idea=data["news_product_idea"],
        )

from dataclasses import asdict, dataclass
from typing import Any


@dataclass
class DayTask:
    id: int | None
    day: int
    title: str
    objective: str
    thinking_prompt: str
    practice_prompt: str
    output_prompt: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "DayTask":
        return cls(
            id=data.get("id"),
            day=int(data["day"]),
            title=data["title"],
            objective=data["objective"],
            thinking_prompt=data["thinking_prompt"],
            practice_prompt=data["practice_prompt"],
            output_prompt=data["output_prompt"],
        )

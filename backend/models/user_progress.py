from dataclasses import asdict, dataclass
from typing import Any


@dataclass
class UserProgress:
    id: int | None
    day: int
    status: str
    user_output: str | None = None
    completed_at: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "UserProgress":
        return cls(
            id=data.get("id"),
            day=int(data["day"]),
            status=data["status"],
            user_output=data.get("user_output"),
            completed_at=data.get("completed_at"),
        )

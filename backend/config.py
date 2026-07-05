import os
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any


BASE_DIR = Path(__file__).resolve().parent
ENV_LOCAL_PATH = BASE_DIR / ".env.local"


def load_local_env() -> None:
    if not ENV_LOCAL_PATH.exists():
        return

    for line in ENV_LOCAL_PATH.read_text(encoding="utf-8").splitlines():
        clean_line = line.strip()
        if not clean_line or clean_line.startswith("#") or "=" not in clean_line:
            continue
        key, value = clean_line.lstrip("\ufeff").split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


load_local_env()


@dataclass
class ModelConfig:
    provider: str
    model: str
    base_url: str
    api_key_env: str

    def to_public_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["has_api_key"] = bool(os.getenv(self.api_key_env))
        return data


_runtime_model_config = ModelConfig(
    provider=os.getenv("AI_PROVIDER", "minimax"),
    model=os.getenv("AI_MODEL", "MiniMax-M3"),
    base_url=os.getenv("AI_BASE_URL", "https://api.minimax.chat/v1/chat/completions"),
    api_key_env=os.getenv("AI_API_KEY_ENV", "MINIMAX_API_KEY"),
)


def get_model_config() -> ModelConfig:
    return _runtime_model_config


def update_model_config(
    provider: str | None = None,
    model: str | None = None,
    base_url: str | None = None,
    api_key: str | None = None,
    api_key_env: str | None = None,
) -> ModelConfig:
    global _runtime_model_config

    next_api_key_env = api_key_env or _runtime_model_config.api_key_env
    if api_key:
        os.environ[next_api_key_env] = api_key

    _runtime_model_config = ModelConfig(
        provider=provider or _runtime_model_config.provider,
        model=model or _runtime_model_config.model,
        base_url=base_url or _runtime_model_config.base_url,
        api_key_env=next_api_key_env,
    )
    return _runtime_model_config

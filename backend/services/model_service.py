import json
import os
import urllib.error
import urllib.request
from typing import Any

from config import get_model_config, update_model_config


def get_public_model_config() -> dict[str, Any]:
    return get_model_config().to_public_dict()


def configure_model(
    provider: str | None = None,
    model: str | None = None,
    base_url: str | None = None,
    api_key: str | None = None,
    api_key_env: str | None = None,
) -> dict[str, Any]:
    return update_model_config(
        provider=provider,
        model=model,
        base_url=base_url,
        api_key=api_key,
        api_key_env=api_key_env,
    ).to_public_dict()


def ask_model(question: str, context: str | None = None) -> dict[str, Any]:
    config = get_model_config()
    api_key = os.getenv(config.api_key_env)
    if not api_key:
        raise RuntimeError(f"Missing API key environment variable: {config.api_key_env}")

    prompt = question if not context else f"Context:\n{context}\n\nQuestion:\n{question}"
    payload = {
        "model": config.model,
        "messages": [
            {
                "role": "system",
                "content": "You are an AI product manager learning coach. Answer clearly and help the learner produce practical product output.",
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.3,
    }

    request = urllib.request.Request(
        config.base_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            result = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Model API HTTP {error.code}: {body}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"Model API connection failed: {error.reason}") from error

    answer = _extract_openai_compatible_answer(result)
    return {
        "provider": config.provider,
        "model": config.model,
        "answer": answer,
        "raw": result,
    }


def _extract_openai_compatible_answer(result: dict[str, Any]) -> str:
    choices = result.get("choices") or []
    if choices:
        message = choices[0].get("message") or {}
        content = message.get("content")
        if isinstance(content, str):
            return content
    return json.dumps(result, ensure_ascii=False)

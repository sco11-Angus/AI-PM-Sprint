from typing import Any


TECH_CARD_ROTATION = [
    {
        "concept": "Prompt",
        "one_line": "A prompt is the instruction that shapes what an AI model does next.",
        "principle": "Clear context, task, constraints, and output format make model responses more useful.",
        "example": "Ask the AI to turn a vague user need into three product hypotheses.",
    },
    {
        "concept": "RAG",
        "one_line": "RAG lets AI search trusted knowledge before it answers.",
        "principle": "The system retrieves relevant documents, adds them to the prompt, then generates an answer.",
        "example": "A learning assistant can answer from course notes instead of guessing from memory.",
    },
    {
        "concept": "Agent",
        "one_line": "An agent is an AI workflow that can plan and use tools toward a goal.",
        "principle": "It breaks a task into steps, calls tools, checks results, and continues until done.",
        "example": "An interview coach can ask questions, score answers, and suggest the next drill.",
    },
    {
        "concept": "Embedding",
        "one_line": "An embedding turns meaning into numbers that software can compare.",
        "principle": "Similar text produces nearby vectors, making semantic search and clustering possible.",
        "example": "Group similar user feedback and find repeated pain points automatically.",
    },
    {
        "concept": "Evaluation",
        "one_line": "Evaluation checks whether an AI feature is actually good enough for users.",
        "principle": "Define test cases, expected qualities, failure modes, and measurable acceptance thresholds.",
        "example": "Score whether AI feedback is specific, correct, actionable, and safe.",
    },
]


def generate_tech_card(day: int) -> dict[str, Any]:
    card = TECH_CARD_ROTATION[(day - 1) % len(TECH_CARD_ROTATION)]
    return {
        "concept": card["concept"],
        "oneLine": card["one_line"],
        "principle": card["principle"],
        "example": card["example"],
    }


def generate_daily_content(day: int) -> dict[str, Any]:
    tech_card = generate_tech_card(day)
    return {
        "day": day,
        "tech_concept": tech_card["concept"],
        "tech_one_line": tech_card["oneLine"],
        "tech_principle": tech_card["principle"],
        "tech_example": tech_card["example"],
        "news_title": f"Day {day} AI Product Signal",
        "news_summary": "AI tools are moving from single answers toward workflow support.",
        "news_product_idea": "Design a learning workspace that remembers user goals and retrieves the right context before coaching.",
    }

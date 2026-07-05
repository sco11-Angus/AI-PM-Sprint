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

NEWS_ROTATION = [
    {
        "title": "AI agents move from chat to workflow execution",
        "summary": "Teams are packaging models with tools, memory, and evaluation so AI can complete multi-step work instead of only answering questions.",
        "product_idea": "Build a sprint assistant that turns a learner's daily output into the next concrete project task.",
        "source": "OpenAI / Google AI / industry reports",
    },
    {
        "title": "Long-context models change knowledge product design",
        "summary": "Larger context windows make it easier to reason over full documents, interview transcripts, and project notes in one session.",
        "product_idea": "Create a PM interview workspace that reviews a full project PRD before asking follow-up questions.",
        "source": "Anthropic / Google AI / Hugging Face",
    },
    {
        "title": "Evaluation becomes a core AI product feature",
        "summary": "AI products increasingly need visible quality checks, test sets, and feedback loops to earn user trust.",
        "product_idea": "Add a rubric panel that scores whether a user's AI product answer is specific, testable, and user-centered.",
        "source": "NeurIPS / ICML / product engineering blogs",
    },
    {
        "title": "Multimodal AI expands product input surfaces",
        "summary": "Text, image, audio, and screen context can now be combined into richer product workflows.",
        "product_idea": "Let learners upload screenshots of AI tools and receive PM-style feature teardown prompts.",
        "source": "OpenAI / Google AI / research updates",
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


def generate_news(day: int) -> dict[str, Any]:
    news = NEWS_ROTATION[(day - 1) % len(NEWS_ROTATION)]
    return {
        "title": news["title"],
        "summary": news["summary"],
        "productIdea": news["product_idea"],
        "source": news["source"],
    }


def generate_daily_content(day: int) -> dict[str, Any]:
    tech_card = generate_tech_card(day)
    news = generate_news(day)
    return {
        "day": day,
        "tech_concept": tech_card["concept"],
        "tech_one_line": tech_card["oneLine"],
        "tech_principle": tech_card["principle"],
        "tech_example": tech_card["example"],
        "news_title": news["title"],
        "news_summary": news["summary"],
        "news_product_idea": news["productIdea"],
    }

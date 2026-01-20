import os
from pydantic_ai import Agent
from models import StudyRequest, StudyPlan
from dotenv import load_dotenv

load_dotenv()

# Set environment variables for the OpenAI client used by Pydantic AI
os.environ['OPENAI_API_KEY'] = os.getenv('OPENROUTER_API_KEY') or "dummy"
os.environ['OPENAI_BASE_URL'] = "https://openrouter.ai/api/v1"

agent = Agent(
    'openai:google/gemini-2.0-flash-exp:free',
    output_type=StudyPlan,
    system_prompt=(
        "You are an expert curriculum designer. "
        "Create a detailed, structured study plan based on the user's topic, level, and time commitment. "
        "Provide specific, actionable tasks and high-quality resource recommendations (books, official docs, videos)."
        "Structure the plan into weeks and days. If the time commitment is short (e.g. '1 day'), just use 'Week 1'."
    ),
)

async def generate_study_plan(request: StudyRequest) -> StudyPlan:
    prompt = f"Topic: {request.topic}\nCurrent Level: {request.current_level}\nTime Commitment: {request.time_commitment}"
    result = await agent.run(prompt)
    return result.data

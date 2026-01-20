from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import StudyRequest, StudyPlan
from agent import generate_study_plan
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="LearnPath AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/test")
async def test_endpoint():
    try:
        from pydantic_ai import Agent
        import os
        key_status = "Set" if os.environ.get("OPENROUTER_API_KEY") else "Missing"
        return {"status": "ok", "api_key": key_status, "agent_import": "success"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

@app.post("/api/generate-plan", response_model=StudyPlan)
async def create_study_plan(request: StudyRequest):
    try:
        logger.info(f"Generating plan for topic: {request.topic}")
        # Validate Env Var presence
        import os
        if not os.environ.get("OPENROUTER_API_KEY"):
            raise ValueError("OPENROUTER_API_KEY not found in environment variables")
            
        plan = await generate_study_plan(request)
        return plan
    except Exception as e:
        logger.error(f"Error generating plan: {str(e)}")
        # Return the actual error message to the client for debugging
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")

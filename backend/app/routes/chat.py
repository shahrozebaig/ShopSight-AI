from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_service import chat_with_ai
router = APIRouter()
class ChatRequest(BaseModel):
    message: str
@router.post("/")
async def chat(req: ChatRequest):
    response = chat_with_ai(req.message)
    return {"response": response}
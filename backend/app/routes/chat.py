from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_service import apply_filters
router = APIRouter()
class ChatRequest(BaseModel):
    query: str
    products: list
@router.post("/")
async def chat(req: ChatRequest):
    response = apply_filters(req.query, req.products)
    return {"response": response}
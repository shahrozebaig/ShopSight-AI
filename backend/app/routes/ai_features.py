from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from app.services.llm_service import compare_products, summarize_reviews, suggest_style
router = APIRouter()
class CompareRequest(BaseModel):
    products: List[Dict]
class SummarizeRequest(BaseModel):
    reviews: List[str]
class StyleRequest(BaseModel):
    preferences: str
    products: List[Dict]
@router.post("/compare")
async def compare(request: CompareRequest):
    try:
        analysis = compare_products(request.products)
        return {"analysis": analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.post("/summarize-reviews")
async def summarize(request: SummarizeRequest):
    try:
        summary = summarize_reviews(request.reviews)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.post("/style-recommendations")
async def style_profile(request: StyleRequest):
    try:
        recommendations = suggest_style(request.preferences, request.products)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
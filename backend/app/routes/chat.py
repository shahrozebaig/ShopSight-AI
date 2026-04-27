from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_service import chat_with_ai
from app.services.serp_service import search_products_text
router = APIRouter()
class ChatRequest(BaseModel):
    message: str
    products: list  
@router.post("/")
async def chat(req: ChatRequest):
    user_query = req.message.lower()
    products = req.products
    if not products:
        products = search_products_text(user_query)
    filtered = []
    for p in products:
        price = p.get("price", "")
        rating = p.get("rating", 0)
        try:
            product_price = int(''.join(filter(str.isdigit, price))) if price else 0
        except:
            product_price = 0
        if "under" in user_query:
            try:
                max_price = int(''.join(filter(str.isdigit, user_query)))
                if product_price and product_price <= max_price:
                    filtered.append(p)
            except:
                filtered.append(p)
        elif "rating" in user_query:
            if rating and rating >= 4:
                filtered.append(p)
        else:
            filtered.append(p)
    ai_response = chat_with_ai(req.message)
    return {
        "products": filtered,
        "response": ai_response
    }
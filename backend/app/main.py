from fastapi import FastAPI
from app.routes import search, chat, voice
app = FastAPI()
app.include_router(search.router, prefix="/search")
app.include_router(chat.router, prefix="/chat")
app.include_router(voice.router, prefix="/voice")
@app.get("/")
def home():
    return {"message": "Shopping Copilot Backend Running"}
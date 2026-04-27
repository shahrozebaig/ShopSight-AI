from fastapi import FastAPI
from app.routes import search, chat, voice
import uvicorn
app = FastAPI()
app.include_router(search.router, prefix="/search")
app.include_router(chat.router, prefix="/chat")
app.include_router(voice.router, prefix="/voice")
@app.get("/")
def home():
    return {"msg": "Backend Running"}
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
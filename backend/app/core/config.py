from dotenv import load_dotenv
import os

load_dotenv()

SERP_API_KEY = os.getenv("SERP_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
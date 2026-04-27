import google.generativeai as genai
from app.core.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

def get_product_name(image_bytes: bytes):
    model = genai.GenerativeModel("gemini-2.5-flash")

    response = model.generate_content([
        "Give ONLY the product name. No explanation. No extra text.",
        {"mime_type": "image/jpeg", "data": image_bytes}
    ])

    text = response.text.strip()

    # 🔥 CLEAN HARD (VERY IMPORTANT)
    text = text.split("(")[0]   # remove brackets garbage
    text = text.split(",")[0]
    text = text.replace("\n", "")
    text = text.strip()

    print("CLEAN PRODUCT:", text)

    return text
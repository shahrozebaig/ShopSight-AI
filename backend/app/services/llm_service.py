from groq import Groq
from app.core.config import GROQ_API_KEY
client = Groq(api_key=GROQ_API_KEY)
def chat_with_ai(message: str):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a helpful shopping assistant."},
            {"role": "user", "content": message}
        ]
    )
    return response.choices[0].message.content
def apply_filters(user_query, products):
    prompt = f"""
    User query: {user_query}
    Products: {products}
    Return best matching products.
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
def generate_description(products):
    if not products:
        return ""
    titles = [p["title"] for p in products[:3]]
    prompt = f"""
    Products: {titles}
    Write one short clean sentence describing them.
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
from groq import Groq
from app.core.config import GROQ_API_KEY
import json
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
    Return best matching products in JSON format.
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
def compare_products(products):
    prompt = f"""
    Compare these products: {products}
    Return ONLY a raw JSON string (no markdown, no code blocks, no explanation).
    Structure:
    {{
      "rows": [
        ["Price", "val1", "val2"],
        ["Rating", "val1", "val2"],
        ["Specs", "val1", "val2"],
        ["Pros", "val1", "val2"],
        ["Cons", "val1", "val2"]
      ],
      "verdict": "One short sentence recommendation."
    }}
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    content = response.choices[0].message.content.strip()
    if content.startswith("```"):
        content = content.replace("```json", "").replace("```", "").strip()
    return content
def summarize_reviews(reviews):
    if not reviews:
        return "No reviews found for this product yet."
    prompt = f"""
    Summarize these customer reviews into a single paragraph highlighting:
    - Overall sentiment
    - Common praise
    - Common complaints
    Reviews: {reviews}
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
def suggest_style(preferences, products):
    prompt = f"""
    Based on the user's style preferences: {preferences}
    Recommend the best items from this list: {products}
    Provide a brief reasoning for each recommendation.
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
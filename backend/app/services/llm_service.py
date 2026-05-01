from groq import Groq
from app.core.config import GROQ_API_KEY
import json
client = Groq(api_key=GROQ_API_KEY)
def chat_with_ai(message: str):
    system_prompt = """
    You are SHOPSIGHT AI, a brutalist shopping engine. 
    Provide advice strictly in a valid JSON object with the following structure:
    {
      "sections": [
        {"category": "KEY_FEATURES", "points": ["point 1", "point 2"]},
        {"category": "RECOMMENDATIONS", "points": ["item 1", "item 2"]},
        {"category": "CONSIDERATIONS", "points": ["fact 1", "fact 2"]}
      ]
    }
    RULES:
    - ONLY output valid JSON.
    - No conversational filler.
    - Max 3 points per section.
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
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
    system_prompt = "You are a shopping comparison engine. You ONLY output raw, valid JSON. Never explain, never use markdown. NEVER include URLs or links."
    user_prompt = f"""
    Compare these products: {products}
    Return a SINGLE JSON object with this exact structure:
    {{
      "rows": [
        ["Price", "val1", "val2", "val3"],
        ["Rating", "val1", "val2", "val3"],
        ["Key Spec", "val1", "val2", "val3"],
        ["Description", "val1", "val2", "val3"]
      ]
    }}
    RULES:
    - NEVER use the word "Pros". Use "Description" instead.
    - Each row MUST be an array of strings. 
    - The first element is the header (e.g. "Price").
    - Subsequent elements are the values for each product in order.
    - DO NOT return objects inside the rows array.
    - DO NOT include a "verdict" or "summary".
    - NO search links or URLs.
    - Ensure it is ONE valid JSON object.
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )
    content = response.choices[0].message.content.strip()
    start = content.find('{')
    end = content.rfind('}')
    if start != -1 and end != -1:
        return content[start:end+1]
    return content
def summarize_reviews(reviews):
    if not reviews:
        return "No reviews found for this product yet."
    prompt = f"""
    Summarize these customer reviews into a single paragraph highlighting:
    - Overall sentiment
    - Key pros and cons mentioned by users
    Reviews: {reviews}
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
def suggest_style(preferences, products):
    titles = [p["title"] for p in products[:5]]
    prompt = f"""
    User Preferences: {preferences}
    Product Options: {titles}
    Based on the preferences, suggest which products match best and why. 
    Keep it concise and brutalist.
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
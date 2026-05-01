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
    system_prompt = "You are a professional product comparison engine. You ONLY output raw, valid JSON. Never explain, never use markdown. NEVER include URLs."
    user_prompt = f"""
    Compare these specific products: {products}
    
    TASK:
    1. Identify the product category (e.g. Smartphones, Perfumes, Apparel).
    2. Select 5-7 most RELEVANT metrics for this category (e.g. for electronics: Battery, Processor; for beauty: Longevity, Scent Profile).
    3. Return a SINGLE JSON object with this exact structure:
    {{
      "rows": [
        ["Attribute_Name", "val1", "val2", "val3"],
        ...
      ]
    }}
    
    RULES:
    - ALWAYS include "Price" and "Rating" as the first two rows.
    - The following 3-5 rows MUST be dynamic specs based on the products.
    - Each row is an array where index 0 is the attribute name and indices 1+ are values for each product.
    - DO NOT use generic placeholders like "val1". Use real data from the products or AI knowledge about these models.
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
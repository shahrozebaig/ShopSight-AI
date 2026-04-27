from groq import Groq
from app.core.config import GROQ_API_KEY
client = Groq(api_key=GROQ_API_KEY)
def apply_filters(user_query, products):
    prompt = f"""
    User query: {user_query}
    Products: {products}
    Return filtered best products based on user need.
    """
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
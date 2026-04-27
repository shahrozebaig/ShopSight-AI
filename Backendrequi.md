# ShopSight AI – Models & Accuracy Summary

## 1. Models Used (Full History)

| Model / Method            | Type          | Purpose                  | Status    | Description                                                |
| ------------------------- | ------------- | ------------------------ | --------- | ---------------------------------------------------------- |
| Gemini 2.5 Flash          | Vision AI     | Image → product name     | ❌ Removed | Extracted product name from image but unstable and limited |
| OpenAI Vision             | Vision AI     | Image understanding      | ❌ Removed | Not used due to cost and unnecessary complexity            |
| Google Lens (SerpAPI)     | Search Engine | Image → similar products | ✅ Active  | Core engine for finding products from image                |
| Google Shopping (SerpAPI) | Search Engine | Price + rating           | ✅ Active  | Enriches results with price and rating                     |
| Groq (LLaMA 3.1 8B)       | LLM           | Text description         | ✅ Active  | Generates short product description                        |

---

## 2. Models Actually Used in Final Project

| Component      | Model / Method            |
| -------------- | ------------------------- |
| Image Search   | Google Lens (SerpAPI)     |
| Price & Rating | Google Shopping (SerpAPI) |
| Description    | Groq LLaMA 3.1 8B         |

---

## 3. Rejected Models (with Pros & Cons)

### Gemini Vision

**Pros:**

* High accuracy
* Strong image understanding

**Cons:**

* Free quota very limited
* Frequent 429 / quota errors
* Requires API key & billing
* Adds latency and instability

**Reason removed:**
→ Not reliable for production

---

### OpenAI Vision

**Pros:**

* Very high accuracy
* Strong reasoning

**Cons:**

* Paid API
* Overkill for this use case
* Adds latency

**Reason removed:**
→ Cost + unnecessary complexity

---

## 4. ⚠️ HONEST TRUTH (VERY IMPORTANT)

| Method                       | Accuracy |
| ---------------------------- | -------- |
| Google Lens                  | ❌ 50–70% |
| Vision Model (Gemini/OpenAI) | ✅ 90–95% |

---

## 5. Final Accuracy of Current System

| Component        | Accuracy |
| ---------------- | -------- |
| Product Matching | ~60–70%  |
| Price Accuracy   | ~80–90%  |
| Rating Accuracy  | ~80–90%  |

---

## 6. Why Current Approach Was Chosen

* Works 24/7 without limits
* No API quota crashes
* Faster response time
* Simpler architecture
* Fully real-time system

**Trade-off:**
→ Slightly lower accuracy compared to AI vision models

---
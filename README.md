# ShopSight AI

## Project Description

ShopSight AI is a multimodal shopping assistant that allows users to search for products using an image or a text query. Instead of relying on heavy vision models, the system uses real-time search engines to fetch product data and then applies intelligent filtering and AI-based enhancements to improve the results. The focus of the project is to build a fast, stable, and production-ready system that works without dependency on expensive or limited AI vision APIs.

---

## What This Project Does Not Use

* No heavy vision models like Gemini Vision or OpenAI Vision in the final system
* No pre-trained image classification pipeline
* No stored product database (fully real-time, no local dataset)
* No pagination system (uses continuous loading instead)
* No complex microservices or distributed system (single backend service)

---

## How It Works

1. User uploads an image or enters a text query
2. The image is uploaded to ImgBB to generate a public URL
3. The system sends the image to Google Lens (via SerpAPI)
4. Google Lens returns visually similar products
5. A deduplication system removes repeated or unwanted links
6. The system fetches price and rating using Google Shopping
7. Results are merged and ranked
8. An AI model optionally generates product insights and summaries
9. Final results are sent to the frontend and displayed

For text queries, the system directly applies filters such as price, rating, or category, and may trigger a re-search if needed.

---

## Summary

ShopSight AI is designed as a real-time product discovery system that prioritizes stability, speed, and simplicity over heavy AI dependency. It combines search APIs, filtering logic, and lightweight AI to deliver a practical and scalable shopping assistant.
import { useState } from "react";
import { sendChat } from "../services/api";

export default function ChatBox({ products, setProducts, setLoading }) {
  const [query, setQuery] = useState("");

  const handleSend = async () => {
    if (!query || !products.length) return;

    try {
      setLoading(true);
      const res = await sendChat(query, products);

      // Expecting backend to return filtered list OR text
      // If it's text, you can parse later; for now, keep products same
      // If you modify backend to return array, setProducts(res.products)
      if (Array.isArray(res.products)) {
        setProducts(res.products);
      } else {
        alert(res.response || "Processed");
      }
    } catch (e) {
      alert("Chat failed");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="Ask: under ₹1000, better rating..."
        className="flex-1 border p-2 rounded-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-black text-white px-4 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
import { useState } from "react";
import { sendChat } from "../services/api";

export default function ChatBox({ products, setProducts, setLoading }) {
  const [query, setQuery] = useState("");

  const handleSend = async () => {
    console.log("SEND CLICKED"); // debug

    if (!query) return;

    try {
      setLoading(true);

      const res = await sendChat(query, products);

      console.log("CHAT RESPONSE:", res);

      if (res.products) {
        setProducts(res.products);
      }

    } catch (e) {
      console.error("CHAT ERROR:", e);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="under 1000, rating 4..."
        className="flex-1 border p-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-black text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}
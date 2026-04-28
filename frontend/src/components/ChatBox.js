import { useState } from "react";
import { sendChat } from "../services/api";
export default function ChatBox({ setProducts, setLoading }) {
  const [query, setQuery] = useState("");
  const handleSend = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await sendChat(query); 
      if (res.products) setProducts(res.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };
  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-3 flex items-center gap-3 border">
      <input
        className="flex-1 px-4 py-2 outline-none text-sm"
        placeholder="Search anything... (e.g. laptop under 50000)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
      >
        Search
      </button>
    </div>
  );
}
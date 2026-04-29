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
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-300"></div>
      <div className="relative flex items-center gap-2 glass-input p-1.5 pl-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 py-2 text-sm md:text-base"
          placeholder="What are you looking for today?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          Search
        </button>
      </div>
    </div>
  );
}

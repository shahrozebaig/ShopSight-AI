import { useState } from "react";
import VoiceInput from "./VoiceInput";
export default function ChatBox({ setLoading, onSearch }) {
  const [query, setQuery] = useState("");
  const [interim, setInterim] = useState("");
  const handleSend = async (overrideQuery) => {
    const finalQuery = overrideQuery || query;
    if (!finalQuery.trim()) return;
    if (onSearch) {
      onSearch(finalQuery, 1);
      setQuery("");
      setInterim("");
    }
  };
  const handleVoice = (text) => {
    setQuery(text);
    handleSend(text);
  };
  return (
    <div className="w-full space-y-4">
      <div className="relative flex items-center border-4 border-black bg-[#f2f2f2] p-2 focus-within:bg-white transition-colors">
        <div className="pl-4">
          <svg className="w-6 h-6 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="flex-1 bg-transparent border-none outline-none p-4 text-lg font-bold uppercase tracking-tight placeholder:text-black/20"
          placeholder=""
          value={interim || query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <div className="flex items-center gap-2 pr-2">
          <VoiceInput onText={handleVoice} onInterim={setInterim} />
          <button
            onClick={() => handleSend()}
            className="bg-[#dc2626] text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-black transition-all"
          >
            Execute
          </button>
        </div>
        {interim && (
          <div className="absolute -top-12 left-0 w-full bg-[#dc2626] text-white p-2 text-[10px] font-black uppercase tracking-widest animate-pulse">
            LIVE_TRANSCRIPT: {interim}
          </div>
        )}
      </div>
    </div>
  );
}
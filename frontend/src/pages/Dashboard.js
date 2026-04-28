import React, { useState } from 'react';
import UploadBox from "../components/UploadBox";
import ProductGrid from "../components/ProductGrid";
import ChatBox from "../components/ChatBox";
import VoiceInput from "../components/VoiceInput";
import { sendChat } from "../services/api";
export default function Dashboard({ onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const handleVoiceText = async (text) => {
    try {
      setLoading(true);
      const res = await sendChat(text);
      if (res.products) setProducts(res.products);
      if (res.response) setDescription(res.response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <header className="fixed top-0 w-full z-50 glass-card py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">
                AI Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
          </div>
        </div>
      </header>
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        <section className="mb-12">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 glass-card p-8 rounded-[2rem] space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white">Visual Search</h4>
              </div>
              <UploadBox
                setProducts={setProducts}
                setLoading={setLoading}
                setDescription={setDescription}
              />
            </div>
            <div className="lg:col-span-7 glass-card p-8 rounded-[2rem] space-y-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white">Smart Concierge</h4>
              </div>
              <div className="flex-1 min-h-[120px]">
                <ChatBox
                  setProducts={setProducts}
                  setLoading={setLoading}
                />
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-500 italic">"Find me a mechanical keyboard with RGB"</span>
                <VoiceInput onText={handleVoiceText} />
              </div>
            </div>
          </div>
          {description && (
            <div className="mt-8 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 animate-fade-in">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                <p className="text-slate-300 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          )}
        </section>
        <section>
          <div className="flex justify-between items-end gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-bold text-white">
                Results <span className="text-gradient">Matrix</span>
              </h3>
            </div>
            {products.length > 0 && (
              <div className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700">
                {products.length} PRODUCTS ANALYZED
              </div>
            )}
          </div>
          <div className="min-h-[400px]">
            <ProductGrid products={products} loading={loading} />
          </div>
        </section>
      </main>
    </div>
  );
}
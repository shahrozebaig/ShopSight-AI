import React, { useState } from 'react';
import UploadBox from "../components/UploadBox";
import ProductGrid from "../components/ProductGrid";
import ChatBox from "../components/ChatBox";
import VoiceInput from "../components/VoiceInput";
import { sendChat, compareProducts, summarizeReviews } from "../services/api";
export default function Dashboard({ onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [comparedProducts, setComparedProducts] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [reviewSummary, setReviewSummary] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
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
  const handleCompare = (product) => {
    setComparedProducts(prev => {
      const isAlreadyAdded = prev.find(p => p.title === product.title);
      if (isAlreadyAdded) {
        return prev.filter(p => p.title !== product.title);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 products at a time.");
        return prev;
      }
      return [...prev, product];
    });
  };
  const runComparison = async () => {
    if (comparedProducts.length < 2) return;
    try {
      setAnalyzing(true);
      const res = await compareProducts(comparedProducts);
      setComparisonResult(res.analysis);
      setReviewSummary(null);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };
  const handleSummarize = async (product) => {
    try {
      setAnalyzing(true);
      const mockReviews = [
        "Great quality and feels premium.",
        "A bit expensive but worth it for the features.",
        "The battery life could be better.",
        "Exactly what I was looking for, highly recommend!"
      ];
      const res = await summarizeReviews(mockReviews);
      setReviewSummary({ title: product.title, summary: res.summary });
      setComparisonResult(null);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
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
            {comparedProducts.length >= 2 && (
              <button
                onClick={runComparison}
                disabled={analyzing}
                className="btn-primary !py-2 !px-4 text-xs animate-bounce-slow"
              >
                {analyzing ? "Analyzing..." : `Compare ${comparedProducts.length} Items`}
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        {(comparisonResult || reviewSummary) && (
          <section className="mb-12 animate-fade-in">
            <div className="glass-card p-8 rounded-[2rem] border-indigo-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={() => { setComparisonResult(null); setReviewSummary(null); }}
                  className="text-slate-500 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {comparisonResult ? "AI Comparison Analysis" : "AI Review Summary"}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {comparisonResult ? "Synthesized data from selected products" : `Summarized sentiment for ${reviewSummary?.title}`}
                  </p>
                </div>
              </div>

              {comparisonResult ? (() => {
                try {
                  const data = JSON.parse(comparisonResult);
                  return (
                    <div className="space-y-8">
                      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900/30">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5">
                              <th className="p-6 text-indigo-400 font-black uppercase tracking-widest text-[10px]">Feature</th>
                              {comparedProducts.map((p, i) => (
                                <th key={i} className="p-6 min-w-[200px]">
                                  <div className="flex flex-col gap-3">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shadow-lg">
                                      <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-white text-[11px] font-bold line-clamp-2 leading-tight">{p.title}</span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {data.rows.map((row, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-6 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/40 border-r border-white/5">{row[0]}</td>
                                {row.slice(1, comparedProducts.length + 1).map((cell, j) => (
                                  <td key={j} className="p-6 text-slate-300 text-sm leading-relaxed">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                        <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-2">AI Verdict</p>
                        <p className="text-white text-lg font-medium italic">"{data.verdict}"</p>
                      </div>
                    </div>
                  );
                } catch (e) {
                  return <div className="p-6 bg-slate-900/50 rounded-2xl text-slate-300 whitespace-pre-wrap">{comparisonResult}</div>;
                }
              })() : (
                <div className="bg-slate-900/50 rounded-2xl p-6 text-slate-300 whitespace-pre-wrap leading-relaxed border border-white/5">
                  {reviewSummary?.summary}
                </div>
              )}
            </div>
          </section>
        )}
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
          </div>
          <div className="min-h-[400px]">
            <ProductGrid
              products={products}
              loading={loading}
              onCompare={handleCompare}
              comparedProducts={comparedProducts}
              onSummarize={handleSummarize}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

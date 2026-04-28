import React from 'react';
export default function LandingPage({ onExplore }) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <nav className="fixed top-0 w-full z-50 bg-transparent py-5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              ShopSight <span className="text-indigo-400">AI</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
          </div>
        </div>
      </nav>
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <h2 className="text-6xl lg:text-8xl font-extrabold text-white leading-[1.1]">
              Search the <br />
              <span className="text-gradient">Future</span> of <br />
              Shopping.
            </h2>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Experience the world's most advanced AI shopping copilot. Use images, voice, or chat to find exactly what you're looking for in seconds.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onExplore}
                className="btn-primary !px-10 !py-4 text-lg"
              >
                Start Exploring
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/hero.png"
                alt="AI Shopping"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
      <footer className="py-10 border-t border-white/5 text-center text-slate-600 text-sm bg-slate-950">
        © {new Date().getFullYear()} ShopSight AI • All rights reserved.
      </footer>
    </div>
  );
}
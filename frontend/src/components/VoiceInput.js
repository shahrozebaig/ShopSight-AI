import { useState } from "react";
export default function VoiceInput({ onText }) {
  const [listening, setListening] = useState(false);
  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.start();
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onText(text);
    };
  };
  return (
    <button
      onClick={start}
      className={`relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 group
      ${listening
          ? "bg-red-500 shadow-lg shadow-red-500/40"
          : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        }`}
      title={listening ? "Listening..." : "Voice Search"}
    >
      {listening && (
        <span className="absolute inset-0 rounded-xl bg-red-500 animate-ping opacity-20"></span>
      )}
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${listening ? 'text-white' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
      {listening && (
        <span className="ml-2 text-white text-xs font-bold whitespace-nowrap">Listening...</span>
      )}
    </button>
  );
}

import { useState } from "react";
export default function VoiceInput({ onText, onInterim }) {
  const [listening, setListening] = useState(false);
  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join("");
      if (onInterim) onInterim(transcript);
      if (e.results[0].isFinal) {
        onText(transcript);
        if (onInterim) onInterim("");
      }
    };
    recognition.start();
  };
  return (
    <button
      onClick={start}
      className={`relative flex items-center justify-center p-3 transition-all duration-300 group border-2
      ${listening
          ? "bg-[#dc2626] border-[#dc2626] text-white shadow-lg shadow-red-500/40"
          : "bg-white border-black text-black hover:bg-black hover:text-white"
        }`}
      title={listening ? "Listening..." : "Voice Search"}
    >
      {listening && (
        <span className="absolute inset-0 bg-[#dc2626] animate-ping opacity-20"></span>
      )}
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    </button>
  );
}
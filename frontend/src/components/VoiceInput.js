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
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition 
      ${
        listening
          ? "bg-red-500 text-white animate-pulse"
          : "bg-gray-100 text-black hover:bg-gray-200"
      }`}
    >
      <span className="text-lg">🎤</span>
      <span>
        {listening ? "Listening..." : "Voice Search"}
      </span>
    </button>
  );
}
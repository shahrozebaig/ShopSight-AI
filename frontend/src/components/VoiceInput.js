import { useState } from "react";

export default function VoiceInput({ onText }) {
  const [listening, setListening] = useState(false);

  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech API not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onText(text);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  return (
    <div className="mt-3 text-center">
      <button
        onClick={start}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        {listening ? "Listening..." : "🎙️ Speak"}
      </button>
    </div>
  );
}
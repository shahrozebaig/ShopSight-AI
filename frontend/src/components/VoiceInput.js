export default function VoiceInput({ onText }) {
  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.start();
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onText(text);
    };
  };
  return (
    <button
      onClick={start}
      className="mt-3 bg-purple-600 text-white px-4 py-2 rounded"
    >
      🎙️ Speak
    </button>
  );
}
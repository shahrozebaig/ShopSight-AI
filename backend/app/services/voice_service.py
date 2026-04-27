from faster_whisper import WhisperModel
model = WhisperModel("base")
def speech_to_text(file_path):
    segments, _ = model.transcribe(file_path)
    text = ""
    for segment in segments:
        text += segment.text
    return text.strip()
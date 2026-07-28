import sys
from faster_whisper import WhisperModel

audio = sys.argv[1]

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

segments, info = model.transcribe(audio)

text = ""

for segment in segments:
    text += segment.text + " "

print(text.strip())
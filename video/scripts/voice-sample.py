"""Generate only the approved public audition text using Edge online TTS."""

import asyncio
import json
import math
from pathlib import Path
import struct
import wave

from voice_common import synthesize


ROOT = Path(__file__).resolve().parent.parent
TEXT = "AI新闻每天都在刷。可真要找一条之前看过的消息，又翻不到了。这个小站，就是想把这些信息整理清楚。"
VOICES = {
    "xiaoxiao": "zh-CN-XiaoxiaoNeural",
    "xiaoyi": "zh-CN-XiaoyiNeural",
}
FPS = 30
OFFSET_MS = 250


async def main():
    audio_dir = ROOT / "public" / "audio" / "v2"
    audio_dir.mkdir(parents=True, exist_ok=True)
    results = {}
    for key, voice in VOICES.items():
        audio = audio_dir / f"{key}.mp3"
        metadata = audio_dir / f"{key}.jsonl"
        duration, captions = await synthesize(TEXT, voice, audio, metadata, OFFSET_MS)
        if len(captions) != 3:
            raise ValueError(f"Expected three measured sentences for {voice}, got {len(captions)}")
        results[key] = {
            "voice": voice, "audio": f"audio/v2/{key}.mp3",
            "durationInFrames": math.ceil((duration + 1.15) * FPS),
            "captions": captions,
        }
        print(f"{voice}: {duration:.2f}s, natural rate, {len(captions)} measured captions")
    (ROOT / "src" / "generated" / "auditions.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8",
    )
    with wave.open(str(audio_dir / "click.wav"), "wb") as sound:
        sound.setparams((1, 2, 44100, 0, "NONE", "not compressed"))
        samples = []
        for i in range(4410):
            t = i / 44100
            sample = 0.16 * math.sin(2 * math.pi * 1700 * t) * math.exp(-t * 95) * min(1, t * 1800)
            samples.append(struct.pack("<h", round(sample * 32767)))
        sound.writeframes(b"".join(samples))


if __name__ == "__main__":
    asyncio.run(main())

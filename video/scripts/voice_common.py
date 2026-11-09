"""Shared natural-rate online synthesis and measured sentence timing."""

import json
from pathlib import Path
import subprocess

import edge_tts

ROOT = Path(__file__).resolve().parent.parent


async def synthesize(text, voice, audio, metadata, offset_ms=250):
    audio.parent.mkdir(parents=True, exist_ok=True)
    await edge_tts.Communicate(
        text, voice, rate="+0%", boundary="SentenceBoundary",
        connect_timeout=20, receive_timeout=60,
    ).save(str(audio), str(metadata))
    probe = ROOT / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffprobe.exe"
    duration = float(subprocess.check_output([
        str(probe), "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(audio),
    ], text=True).strip())
    captions = []
    for line in metadata.read_text(encoding="utf-8").splitlines():
        event = json.loads(line)
        if event["type"] != "SentenceBoundary":
            continue
        start = event["offset"] / 10000 + offset_ms
        end = start + event["duration"] / 10000
        captions.append({
            "text": event["text"], "startMs": round(start), "endMs": round(end),
            "timestampMs": None, "confidence": None,
        })
    if not captions or duration <= 0:
        raise ValueError(f"Missing speech or timing data: {voice}")
    # Service sentence boundaries can overlap slightly around punctuation.
    for current, following in zip(captions, captions[1:]):
        current["endMs"] = min(current["endMs"], following["startMs"])
    for caption in captions:
        if caption["startMs"] >= caption["endMs"]:
            raise ValueError(f"Invalid sentence timing: {caption}")
    if captions[-1]["endMs"] > duration * 1000 + offset_ms + 100:
        raise ValueError(f"Caption exceeds audio: {voice}")
    return duration, captions

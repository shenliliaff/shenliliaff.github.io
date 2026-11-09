"""Generate the approved full narration once, then derive the film timeline."""

import asyncio
import json
import math
from pathlib import Path
import shutil

from voice_common import synthesize

ROOT = Path(__file__).resolve().parent.parent


def timestamp(ms):
    ms = round(ms)
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


async def main():
    script = json.loads((ROOT / "full-script.json").read_text(encoding="utf-8"))
    if script["voice"] != "zh-CN-XiaoyiNeural" or script["rate"] != "+0%":
        raise ValueError("Full narration must retain the approved Xiaoyi natural-rate voice.")
    sentences = [text for scene in script["scenes"] for text in scene["sentences"]]
    audio_dir = ROOT / "public" / "audio" / "v2-full"
    audio = audio_dir / "xiaoyi.mp3"
    duration, captions = await synthesize(
        "".join(sentences), script["voice"], audio, audio_dir / "sentences.jsonl",
    )
    normalize = lambda text: "".join(text.split())
    if [normalize(c["text"]) for c in captions] != [normalize(s) for s in sentences]:
        raise ValueError("Service sentence output does not match the approved script.")
    fps = script["fps"]
    duration_in_frames = math.ceil((duration + 1.25) * fps)
    if not 40 <= duration_in_frames / fps <= 60:
        raise ValueError("Full narration is outside the 40-60s review range; revise text, not speed.")
    scenes = []
    cursor = 0
    for index, scene in enumerate(script["scenes"]):
        start = 0 if index == 0 else math.floor(captions[cursor]["startMs"] * fps / 1000)
        scenes.append({
            "id": scene["id"], "title": scene["title"], "from": start,
            "captionStart": cursor, "captionCount": len(scene["sentences"]),
        })
        cursor += len(scene["sentences"])
    for index, scene in enumerate(scenes):
        end = scenes[index + 1]["from"] if index + 1 < len(scenes) else duration_in_frames
        scene["durationInFrames"] = end - scene["from"]
    timeline = {
        "voice": script["voice"], "rate": script["rate"], "fps": fps,
        "audio": "audio/v2-full/xiaoyi.mp3", "audioOffsetFrames": round(0.25 * fps),
        "audioDurationSeconds": duration, "durationInFrames": duration_in_frames,
        "scenes": scenes, "captions": captions,
    }
    (ROOT / "src" / "generated" / "full-video.json").write_text(
        json.dumps(timeline, ensure_ascii=False, indent=2) + "\n", encoding="utf-8",
    )
    output = ROOT / "out" / "v2-full"
    output.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(audio, output / "xiaoyi-narration.mp3")
    (output / "fengskb-v2-zh.srt").write_text(
        "\n".join(f'{i + 1}\n{timestamp(c["startMs"])} --> {timestamp(c["endMs"])}\n{c["text"]}\n'
                  for i, c in enumerate(captions)), encoding="utf-8",
    )
    print(f"{script['voice']}: {duration:.3f}s narration, {duration_in_frames} frames")
    for scene in scenes:
        print(f"{scene['id']}: {scene['from'] / fps:.2f}s - {(scene['from'] + scene['durationInFrames']) / fps:.2f}s")


if __name__ == "__main__":
    asyncio.run(main())

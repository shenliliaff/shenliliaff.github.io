import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (file) =>
  JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const script = readJson("script.json");
const captions = readJson("src/generated/captions.json");
const clips = readJson("public/audio/clips.json");

test("full V2 keeps the approved Xiaoyi script, natural rate, and measured scene boundaries", () => {
  const full = readJson("src/generated/full-video.json");
  const approved = readJson("full-script.json");
  assert.equal(full.voice, "zh-CN-XiaoyiNeural");
  assert.equal(full.rate, "+0%");
  assert.equal(full.fps, 30);
  assert.ok(full.durationInFrames / full.fps >= 40);
  assert.ok(full.durationInFrames / full.fps <= 60);
  assert.deepEqual(
    full.captions.map((c) => c.text.replace(/\s/g, "")),
    approved.scenes
      .flatMap((s) => s.sentences)
      .map((s) => s.replace(/\s/g, "")),
  );
  let end = 0;
  let captionIndex = 0;
  for (const scene of full.scenes) {
    assert.equal(scene.from, end);
    assert.equal(scene.captionStart, captionIndex);
    assert.ok(scene.durationInFrames > 0);
    end = scene.from + scene.durationInFrames;
    captionIndex += scene.captionCount;
    const first = full.captions[scene.captionStart];
    const last = full.captions[captionIndex - 1];
    assert.ok(first.startMs >= (scene.from * 1000) / full.fps);
    assert.ok(last.endMs <= ((end + 1) * 1000) / full.fps);
  }
  assert.equal(end, full.durationInFrames);
  assert.equal(captionIndex, full.captions.length);
  let lastEnd = 0;
  for (const caption of full.captions) {
    assert.ok(caption.startMs >= lastEnd);
    assert.ok(caption.endMs > caption.startMs);
    assert.ok(caption.text.length <= 46);
    lastEnd = caption.endMs;
  }
  assert.ok(
    full.audioOffsetFrames + full.audioDurationSeconds * full.fps <
      full.durationInFrames,
  );
  assert.ok(fs.statSync(path.join(root, "public", full.audio)).size > 100000);
  const srt = fs.readFileSync(
    path.join(root, "out/v2-full/fengskb-v2-zh.srt"),
    "utf8",
  );
  for (const caption of full.captions) assert.ok(srt.includes(caption.text));
});

test("V2 auditions use natural-rate voices and nonoverlapping measured captions", () => {
  const auditions = readJson("src/generated/auditions.json");
  assert.deepEqual(Object.keys(auditions).sort(), ["xiaoxiao", "xiaoyi"]);
  for (const audition of Object.values(auditions)) {
    assert.equal(audition.captions.length, 3);
    assert.ok(
      audition.durationInFrames >= 300 && audition.durationInFrames <= 450,
    );
    let end = 0;
    for (const caption of audition.captions) {
      assert.ok(caption.startMs >= end);
      assert.ok(caption.endMs > caption.startMs);
      assert.ok(caption.endMs < (audition.durationInFrames / 30) * 1000);
      end = caption.endMs;
    }
    assert.ok(
      fs.statSync(path.join(root, "public", audition.audio)).size > 10000,
    );
  }
  assert.ok(
    fs.statSync(path.join(root, "public/audio/v2/click.wav")).size > 1000,
  );
});

test("six contiguous scenes cover exactly 45 seconds / 1350 frames", () => {
  assert.equal(script.fps, 30);
  assert.equal(script.durationInSeconds, 45);
  assert.equal(script.scenes.length, 6);
  let end = 0;
  for (const scene of script.scenes) {
    assert.equal(scene.start, end);
    assert.ok(scene.end > scene.start);
    assert.ok(scene.lines.length > 0);
    end = scene.end;
  }
  assert.equal(end, 45);
});

test("all spoken lines have measured, ordered captions within their scene", () => {
  assert.deepEqual(
    captions.map((c) => c.text),
    script.scenes.flatMap((s) => s.lines),
  );
  assert.equal(captions.length, clips.length);
  let endMs = 0;
  for (let i = 0; i < captions.length; i++) {
    const caption = captions[i];
    const clip = clips[i];
    const scene = script.scenes.find((s) => s.id === clip.scene);
    assert.ok(scene);
    assert.ok(caption.startMs >= endMs);
    assert.ok(caption.endMs > caption.startMs);
    assert.ok(caption.startMs >= scene.start * 1000);
    assert.ok(caption.endMs <= scene.end * 1000);
    assert.equal(caption.startMs, clip.startMs);
    assert.equal(caption.endMs, clip.endMs);
    assert.equal(caption.timestampMs, null);
    assert.equal(caption.confidence, null);
    assert.ok(
      caption.text.length <= 36,
      "Keep each subtitle readable on one line",
    );
    endMs = caption.endMs;
  }
});

test("voice and original music are 45-second PCM WAVs with no clipping or silence", () => {
  for (const file of ["voice.wav", "music.wav"]) {
    const buffer = fs.readFileSync(path.join(root, "public/audio", file));
    assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
    assert.equal(buffer.toString("ascii", 8, 12), "WAVE");
    assert.equal(buffer.readUInt32LE(24), 44100);
    const channels = buffer.readUInt16LE(22);
    assert.equal(channels, file === "voice.wav" ? 1 : 2);
    assert.equal(buffer.readUInt16LE(34), 16);
    assert.equal(buffer.readUInt32LE(40) / (44100 * channels * 2), 45);
    let peak = 0;
    let energy = 0;
    for (let offset = 44; offset < buffer.length; offset += 2) {
      const sample = buffer.readInt16LE(offset) / 32768;
      peak = Math.max(peak, Math.abs(sample));
      energy += sample * sample;
    }
    assert.ok(peak > 0.8 && peak < 0.9);
    assert.ok(Math.sqrt(energy / ((buffer.length - 44) / 2)) > 0.01);
  }
});

test("all real-page screenshots are 1600x1000 PNGs", () => {
  for (const name of [
    "home",
    "hot",
    "hot-search",
    "blog",
    "article",
    "reading",
    "thought",
  ]) {
    const buffer = fs.readFileSync(
      path.join(root, "public/images", `${name}.png`),
    );
    assert.equal(buffer.toString("ascii", 1, 4), "PNG");
    assert.equal(buffer.readUInt32BE(16), 1600);
    assert.equal(buffer.readUInt32BE(20), 1000);
    assert.ok(buffer.length > 15000);
  }
});

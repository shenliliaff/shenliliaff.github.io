import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = JSON.parse(
  fs.readFileSync(path.join(root, "script.json"), "utf8"),
);
const audioDir = path.join(root, "public", "audio");
const clips = JSON.parse(
  fs.readFileSync(path.join(audioDir, "clips.json"), "utf8"),
);
const sampleRate = 44100;
const length = sampleRate * script.durationInSeconds;

function readPcm(file) {
  const wav = fs.readFileSync(file);
  if (
    wav.toString("ascii", 0, 4) !== "RIFF" ||
    wav.toString("ascii", 8, 12) !== "WAVE"
  ) {
    throw new Error(`Invalid WAV: ${file}`);
  }
  let validFormat = false;
  for (let offset = 12; offset + 8 <= wav.length; ) {
    const size = wav.readUInt32LE(offset + 4);
    const id = wav.toString("ascii", offset, offset + 4);
    const start = offset + 8;
    if (start + size > wav.length) throw new Error(`Truncated WAV: ${file}`);
    if (id === "fmt ") {
      validFormat =
        wav.readUInt16LE(start) === 1 &&
        wav.readUInt16LE(start + 2) === 1 &&
        wav.readUInt32LE(start + 4) === sampleRate &&
        wav.readUInt16LE(start + 14) === 16;
    }
    if (id === "data") {
      if (!validFormat)
        throw new Error(`Expected mono 44.1 kHz 16-bit PCM: ${file}`);
      return Float64Array.from(
        { length: size / 2 },
        (_, i) => wav.readInt16LE(start + i * 2) / 32768,
      );
    }
    offset = start + size + (size % 2);
  }
  throw new Error(`Missing audio data: ${file}`);
}

function writeWav(name, channels) {
  let peak = 0;
  for (const channel of channels)
    for (const sample of channel) peak = Math.max(peak, Math.abs(sample));
  if (peak === 0) throw new Error(`Silent output: ${name}`);
  const gain = 0.85 / peak;
  const count = channels.length;
  const bytes = length * count * 2;
  const wav = Buffer.alloc(44 + bytes);
  wav.write("RIFF");
  wav.writeUInt32LE(36 + bytes, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(count, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * count * 2, 28);
  wav.writeUInt16LE(count * 2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(bytes, 40);
  for (let i = 0; i < length; i++) {
    for (let c = 0; c < count; c++)
      wav.writeInt16LE(
        Math.round(channels[c][i] * gain * 32767),
        44 + (i * count + c) * 2,
      );
  }
  fs.writeFileSync(path.join(audioDir, name), wav);
  console.log(
    `${name}: ${script.durationInSeconds}s, ${count} channel(s), normalized peak 0.85`,
  );
}

const voice = new Float64Array(length);
let previousEnd = 0;
for (const clip of clips) {
  if (
    clip.startMs < previousEnd ||
    clip.endMs > script.durationInSeconds * 1000
  ) {
    throw new Error(`Overlapping or out-of-range narration: ${clip.file}`);
  }
  const samples = readPcm(path.join(audioDir, clip.file));
  const start = Math.round((clip.startMs * sampleRate) / 1000);
  if (start + samples.length > length)
    throw new Error(`Narration exceeds film: ${clip.file}`);
  voice.set(samples, start);
  previousEnd = clip.endMs;
}
writeWav("voice.wav", [voice]);
const captions = clips.map(
  ({ text, startMs, endMs, timestampMs, confidence }) => ({
    text,
    startMs,
    endMs,
    timestampMs,
    confidence,
  }),
);
fs.mkdirSync(path.join(root, "src", "generated"), { recursive: true });
fs.writeFileSync(
  path.join(root, "src", "generated", "captions.json"),
  JSON.stringify(captions, null, 2) + "\n",
);

const left = new Float64Array(length);
const right = new Float64Array(length);
const beat = 60 / 90;
const chords = [
  [57, 60, 64, 67],
  [53, 57, 60, 64],
  [60, 64, 67, 71],
  [55, 59, 62, 69],
];
const frequency = (midi) => 440 * 2 ** ((midi - 69) / 12);

// Deterministic synthesis: no samples or third-party recordings.
function note(start, duration, midi, amplitude, pan, pad = false) {
  const begin = Math.round(start * sampleRate);
  const end = Math.min(length, Math.round((start + duration) * sampleRate));
  const hz = frequency(midi);
  for (let i = begin; i < end; i++) {
    const t = (i - begin) / sampleRate;
    const envelope = pad
      ? Math.min(1, t / 0.5) * Math.min(1, (duration - t) / 0.9)
      : (1 - Math.exp(-t * 90)) *
        Math.exp(-t * 3) *
        Math.min(1, (duration - t) / 0.1);
    const wave =
      Math.sin(2 * Math.PI * hz * t) +
      0.22 * Math.sin(2 * Math.PI * hz * 2 * t);
    const value = wave * envelope * amplitude;
    left[i] += value * Math.sqrt((1 - pan) / 2);
    right[i] += value * Math.sqrt((1 + pan) / 2);
  }
}

for (let bar = 0; bar * beat * 4 < 44; bar++) {
  const start = bar * beat * 4;
  const chord = chords[bar % chords.length];
  chord.forEach((midi, j) =>
    note(start, beat * 4 + 1, midi, 0.025, (j - 1.5) / 2, true),
  );
  for (let step = 0; step < 4; step++) {
    note(
      start + step * beat,
      beat * 1.8,
      chord[(step + bar) % 4] + 12,
      start < 10 ? 0.045 : 0.065,
      step % 2 ? 0.35 : -0.35,
    );
  }
  if (start >= 10 && start < 28) {
    note(start, beat * 2, chord[0] - 12, 0.07, 0, true);
    for (let b = 0; b < 4; b += 2) {
      const begin = Math.round((start + b * beat) * sampleRate);
      for (let j = 0; j < sampleRate * 0.22 && begin + j < length; j++) {
        const t = j / sampleRate;
        const kick =
          Math.sin(
            2 * Math.PI * (48 * t + (22 * (1 - Math.exp(-t * 30))) / 30),
          ) *
          Math.exp(-t * 25) *
          0.12 *
          Math.min(1, t * 500);
        left[begin + j] += kick;
        right[begin + j] += kick;
      }
    }
  }
}
for (let i = 0; i < length; i++) {
  const t = i / sampleRate;
  const fade =
    Math.min(1, t / 2) * Math.min(1, (script.durationInSeconds - t) / 3.5);
  left[i] *= fade;
  right[i] *= fade;
}
writeWav("music.wav", [left, right]);
const srtTime = (ms) => {
  const time = Math.round(ms);
  return `${String(Math.floor(time / 3600000)).padStart(2, "0")}:${String(Math.floor(time / 60000) % 60).padStart(2, "0")}:${String(Math.floor(time / 1000) % 60).padStart(2, "0")},${String(time % 1000).padStart(3, "0")}`;
};
fs.mkdirSync(path.join(root, "out"), { recursive: true });
fs.writeFileSync(
  path.join(root, "out", "fengskb-zh.srt"),
  captions
    .map(
      (c, i) =>
        `${i + 1}\n${srtTime(c.startMs)} --> ${srtTime(c.endMs)}\n${c.text}\n`,
    )
    .join("\n"),
);

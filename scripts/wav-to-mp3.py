#!/usr/bin/env python
"""把 WAV 转成 MP3，用于压缩 video 工程里的旁白与配乐。

用法：
    python scripts/wav-to-mp3.py <输入.wav> <输出.mp3> [码率kbps]

依赖 lameenc（pip install lameenc）。WAV 需为 16-bit PCM；24/32-bit 会先降到 16-bit。
"""

import sys
import wave
from array import array

import lameenc


def read_16bit(path):
    """读 WAV，返回 (pcm_bytes, 声道数, 采样率)。非 16-bit 会做降采样转换。"""
    with wave.open(path, "rb") as w:
        channels = w.getnchannels()
        rate = w.getframerate()
        width = w.getsampwidth()
        frames = w.getnframes()
        raw = w.readframes(frames)

    if width == 2:
        return raw, channels, rate

    # 24-bit / 32-bit 降为 16-bit
    if width == 3:
        step = 3
        scale = 65536
    elif width == 4:
        step = 4
        scale = 65536
    else:
        raise ValueError(f"不支持的位深: {width * 8} bit")

    samples = array("h")
    for i in range(0, len(raw), step):
        chunk = raw[i : i + step]
        if len(chunk) < step:
            break
        # 小端有符号整数，右移到 16-bit 量级
        value = int.from_bytes(chunk, "little", signed=True)
        samples.append(max(-32768, min(32767, value // scale)))

    return samples.tobytes(), channels, rate


def main() -> int:
    if len(sys.argv) < 3:
        print("用法: wav-to-mp3.py <输入.wav> <输出.mp3> [码率kbps]", file=sys.stderr)
        return 2

    src, dst = sys.argv[1], sys.argv[2]
    bitrate = int(sys.argv[3]) if len(sys.argv) > 3 else 192

    pcm, channels, rate = read_16bit(src)

    encoder = lameenc.Encoder()
    encoder.set_bit_rate(bitrate)
    encoder.set_in_sample_rate(rate)
    encoder.set_channels(channels)
    encoder.set_quality(2)

    # 分块编码，避免一次性占用大内存
    chunk = rate * channels * 2  # 约 1 秒
    out = bytearray()
    for i in range(0, len(pcm), chunk):
        out += encoder.encode(pcm[i : i + chunk])
    out += encoder.flush()

    with open(dst, "wb") as f:
        f.write(out)

    import os

    before = os.path.getsize(src)
    after = os.path.getsize(dst)
    print(
        f"{os.path.basename(src)} -> {os.path.basename(dst)}: "
        f"{before / 1048576:.1f} MB -> {after / 1048576:.2f} MB "
        f"({channels}ch / {rate}Hz / {bitrate}kbps)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

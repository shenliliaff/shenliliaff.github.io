#!/usr/bin/env python
"""把配图压成 WebP，供每日自动化任务调用。

用法：
    python scripts/optimize-cover.py <输入图> <输出.webp> [最长边] [质量]

默认最长边 1600、质量 82。实测 2.5 MB 的 1536x1024 PNG 大约压到 80–250 KB，
肉眼看不出差别（封面在页面上最宽也就 800 px 左右）。

依赖：Pillow（已装在 WorkBuddy 自带 python：C:/Users/anfeng/.workbuddy/binaries/python/versions/3.13.12/python.exe）
"""

import os
import sys

from PIL import Image


def main() -> int:
    if len(sys.argv) < 3:
        print("用法: optimize-cover.py <输入图> <输出.webp> [最长边] [质量]", file=sys.stderr)
        return 2

    src, dst = sys.argv[1], sys.argv[2]
    max_side = int(sys.argv[3]) if len(sys.argv) > 3 else 1600
    quality = int(sys.argv[4]) if len(sys.argv) > 4 else 82

    if not os.path.exists(src):
        print(f"输入不存在: {src}", file=sys.stderr)
        return 1

    before = os.path.getsize(src)

    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")

    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

    os.makedirs(os.path.dirname(os.path.abspath(dst)) or ".", exist_ok=True)
    im.save(dst, "WEBP", quality=quality, method=6)

    after = os.path.getsize(dst)
    print(
        f"{os.path.basename(src)} -> {os.path.basename(dst)}: "
        f"{before // 1024} KB -> {after // 1024} KB "
        f"({im.size[0]}x{im.size[1]})"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

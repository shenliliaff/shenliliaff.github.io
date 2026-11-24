import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import captions from "./generated/shorts-captions.json";

const FPS = 30;
const TOTAL_FRAMES = 900;
const GREEN = "#00A651";
const MINT = "#A7E6C3";
const WARN = "#FFB74D";
const TITLE = "一台机器说找到了，另一台说你再看看";

// 每句对应的视觉焦点：数字大字卡
const STAT_CARDS: Record<number, { big: string; label: string; warn?: boolean }> = {
  1: { big: "1700+", label: "次性能调查" },
  2: { big: "70%", label: "判为准确" },
  3: { big: "30%", label: "要修或说不清", warn: true },
};

export const TalkingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tMs = (frame / FPS) * 1000;

  const idx = captions.findIndex((c) => tMs >= c.startMs && tMs < c.endMs);
  const active = idx >= 0 ? captions[idx] : null;
  const startFrame = active ? Math.round((active.startMs / 1000) * FPS) : 0;
  const local = Math.max(0, frame - startFrame);

  // 逐句弹簧入场
  const enter = spring({ frame: local, fps, config: { damping: 200, mass: 0.6 } });
  const capY = interpolate(enter, [0, 1], [34, 0]);
  const capOpacity = interpolate(local, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Ken Burns 缓慢运镜
  const kenScale = interpolate(frame, [0, TOTAL_FRAMES], [1.08, 1.24], { extrapolateRight: "clamp" });
  const kenX = interpolate(frame, [0, TOTAL_FRAMES], [0, -46], { extrapolateRight: "clamp" });

  // 标题：开场出现，中段淡出
  const titleOpacity = interpolate(frame, [0, 24, 660, 740], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 数字卡
  const card = STAT_CARDS[idx];
  const cardEnter = spring({ frame: local - 5, fps, config: { damping: 200, mass: 0.8 } });
  const cardScale = 0.85 + cardEnter * 0.15;

  const progress = Math.min(frame / TOTAL_FRAMES, 1);

  return (
    <AbsoluteFill style={{ background: "#051b13", fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif' }}>
      {/* 封面 + Ken Burns */}
      <Img
        src={staticFile("media/cover.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.52,
          transform: `scale(${kenScale}) translateX(${kenX}px)`,
        }}
      />
      {/* 渐变遮罩：上暗下更暗，中间留出画面 */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4,24,16,.82) 0%, rgba(4,24,16,.28) 38%, rgba(4,24,16,.55) 62%, rgba(3,18,12,.95) 100%)",
        }}
      />
      {/* 顶部细线 */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: GREEN }} />

      {/* 顶部信息条 */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 96,
          right: 96,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: GREEN, boxShadow: `0 0 16px ${GREEN}` }} />
          <div style={{ fontSize: 20, letterSpacing: 6, color: MINT, fontWeight: 600 }}>AI 前沿 · fengsKB</div>
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,.55)", letterSpacing: 3 }}>2026.11.20</div>
      </div>

      {/* 主标题（开场） */}
      <div
        style={{
          position: "absolute",
          top: 132,
          left: 96,
          right: 96,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleOpacity) * 20}px)`,
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 700, color: "#fff", letterSpacing: 1, lineHeight: 1.4 }}>
          {TITLE}
        </div>
        <div style={{ width: 92, height: 4, background: GREEN, marginTop: 20 }} />
      </div>

      {/* 数字大字卡（分镜焦点） */}
      {card && (
        <div
          style={{
            position: "absolute",
            top: 300,
            right: 120,
            opacity: cardEnter,
            transform: `scale(${cardScale})`,
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: 168,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -4,
              color: card.warn ? WARN : MINT,
              textShadow: `0 0 56px ${card.warn ? "rgba(255,183,77,.4)" : "rgba(0,166,81,.5)"}`,
            }}
          >
            {card.big}
          </div>
          <div style={{ fontSize: 30, color: "#fff", letterSpacing: 3, marginTop: 12, opacity: 0.9 }}>
            {card.label}
          </div>
        </div>
      )}

      {/* 字幕条 */}
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 168,
            left: 96,
            right: 96,
            opacity: capOpacity,
            transform: `translateY(${capY}px)`,
          }}
        >
          <div
            style={{
              background: "rgba(3,20,13,.72)",
              borderLeft: `6px solid ${GREEN}`,
              borderRadius: 12,
              padding: "24px 34px",
              boxShadow: "0 12px 40px rgba(0,0,0,.35)",
            }}
          >
            <div style={{ fontSize: 46, lineHeight: 1.55, color: "#fff", fontWeight: 600, letterSpacing: 1 }}>
              {active.text}
            </div>
          </div>
        </div>
      )}

      {/* 底部品牌 + 句序 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 96,
          right: 96,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "rgba(255,255,255,.6)",
          fontSize: 20,
          letterSpacing: 2,
        }}
      >
        <div>fengsKB · 追寻属于自己的北极星</div>
        <div>{idx >= 0 ? idx + 1 : 0} / {captions.length}</div>
      </div>

      {/* 进度条 */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 6, background: "rgba(255,255,255,.10)" }}>
        <div style={{ width: `${progress * 100}%`, height: "100%", background: GREEN }} />
      </div>

      <Audio src={staticFile("media/2026-11-20-two-machines.mp3")} />
    </AbsoluteFill>
  );
};

import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import captions from "./generated/captions-copypaste.json";

const FPS = 30;
const TOTAL_FRAMES = 1687; // 56.23s，对齐口播音频 56.208s
const GREEN = "#00A651";
const MINT = "#A7E6C3";
const WARN = "#FFB74D";
const TITLE = "医院里最贵的工种是复制粘贴";
const DATE = "2026.11.17";

// 时间轴（帧）：kb-in 105 → 4×AI 镜头(2x慢放,各310) → kb-out 342
const CLIP_FRAMES = 310;
const KB_IN = 105;
const KB_OUT = 342;
const CLIPS = [
  "media/clips/c1-corridor.mp4",
  "media/clips/c2-typing.mp4",
  "media/clips/c3-forms.mp4",
  "media/clips/c4-dawn.mp4",
];

// 每句对应的视觉焦点：数字大字卡（取自本篇真实数据）
const STAT_CARDS: Record<number, { big: string; label: string; warn?: boolean }> = {
  5: { big: "99%", label: "被评为临床安全" },
  6: { big: "60.7%", label: "必查项全过", warn: true },
};
// 收尾金句：放大高亮
const QUOTE_IDX = 11;

const CoverKenBurns: React.FC<{ mode: "in" | "out"; durationInFrames: number }> = ({
  mode,
  durationInFrames,
}) => {
  const f = useCurrentFrame();
  const scale =
    mode === "in"
      ? interpolate(f, [0, durationInFrames], [1.02, 1.26], { extrapolateRight: "clamp" })
      : interpolate(f, [0, durationInFrames], [1.26, 1.03], { extrapolateRight: "clamp" });
  return (
    <Img
      src={staticFile("media/cover.webp")}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${scale})`,
      }}
    />
  );
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

  // 标题：开场 Ken Burns 段出现，随 AI 镜头切入淡出
  const titleOpacity = interpolate(frame, [6, 26, 86, 108], [0, 1, 1, 0], {
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
      {/* ── 背景时间轴 ── */}
      <Sequence from={0} durationInFrames={KB_IN}>
        <CoverKenBurns mode="in" durationInFrames={KB_IN} />
      </Sequence>
      {CLIPS.map((src, i) => (
        <Sequence key={src} from={KB_IN + i * CLIP_FRAMES} durationInFrames={CLIP_FRAMES}>
          <OffthreadVideo
            src={staticFile(src)}
            playbackRate={0.5}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Sequence>
      ))}
      <Sequence from={KB_IN + CLIPS.length * CLIP_FRAMES} durationInFrames={KB_OUT}>
        <CoverKenBurns mode="out" durationInFrames={KB_OUT} />
      </Sequence>

      {/* 渐变遮罩：保证字幕可读，中间透出画面 */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4,24,16,.62) 0%, rgba(4,24,16,.10) 38%, rgba(4,24,16,.30) 62%, rgba(3,18,12,.92) 100%)",
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
        <div style={{ fontSize: 18, color: "rgba(255,255,255,.55)", letterSpacing: 3 }}>{DATE}</div>
      </div>

      {/* 主标题（开场 Ken Burns 段） */}
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
            <div
              style={{
                fontSize: idx === QUOTE_IDX ? 58 : 46,
                lineHeight: 1.55,
                color: idx === QUOTE_IDX ? MINT : "#fff",
                fontWeight: idx === QUOTE_IDX ? 800 : 600,
                letterSpacing: 1,
                textShadow: idx === QUOTE_IDX ? "0 0 30px rgba(0,166,81,.55)" : "none",
              }}
            >
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

      <Audio src={staticFile("media/copy-paste.mp3")} />
    </AbsoluteFill>
  );
};

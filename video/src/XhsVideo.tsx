import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
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
const TOTAL_FRAMES = 1687; // 56.23s，完整音频 56.208s
const TITLE = "医院里最贵的工种，是复制粘贴";
const DATE = "11.17";

// 4 段写实镜头，2.78x 慢放铺满全片（音频完整不切）
const CLIPS = [
  { src: "media/clips-real/r1-desk.mp4", frames: 421, focal: "50% 50%" },
  { src: "media/clips-real/r2-typing.mp4", frames: 421, focal: "50% 50%" },
  { src: "media/clips-real/r3-forms.mp4", frames: 421, focal: "50% 50%" },
  { src: "media/clips-real/r4-dawn.mp4", frames: 424, focal: "35% 45%" },
];

// 数字高亮卡：对齐本篇真实数据，小红书观感（中等字号、暖白）
const STAT_CARDS: Record<number, { big: string; label: string }> = {
  5: { big: "99%", label: "被评为临床安全" },
  6: { big: "60.7%", label: "必查项全过" },
};
const QUOTE_IDX = 11;

export const XhsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tMs = (frame / FPS) * 1000;

  const idx = captions.findIndex((c) => tMs >= c.startMs && tMs < c.endMs);
  const active = idx >= 0 ? captions[idx] : null;
  const startFrame = active ? Math.round((active.startMs / 1000) * FPS) : 0;
  const local = Math.max(0, frame - startFrame);

  const enter = spring({ frame: local, fps, config: { damping: 200, mass: 0.6 } });
  const capY = interpolate(enter, [0, 1], [26, 0]);
  const capOpacity = interpolate(local, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 标题：开场 4 秒淡入淡出
  const titleOpacity = interpolate(frame, [4, 18, 96, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const card = STAT_CARDS[idx];
  const cardEnter = spring({ frame: local - 4, fps, config: { damping: 200, mass: 0.8 } });

  let cursor = 0;
  const bg = CLIPS.map((c) => {
    const from = cursor;
    cursor += c.frames;
    return (
      <Sequence key={c.src} from={from} durationInFrames={c.frames}>
        <OffthreadVideo
          src={staticFile(c.src)}
          playbackRate={0.36}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: c.focal }}
        />
      </Sequence>
    );
  });

  return (
    <AbsoluteFill
      style={{ background: "#0c0c0d", fontFamily: '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif' }}
    >
      {bg}

      {/* 中性暗化：不用企业绿，保住写实画面本色 */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.06) 32%, rgba(0,0,0,.20) 62%, rgba(0,0,0,.72) 100%)",
        }}
      />

      {/* 右上角日期，极简弱化 */}
      <div
        style={{
          position: "absolute",
          top: 46,
          right: 54,
          fontSize: 22,
          color: "rgba(255,255,255,.55)",
          letterSpacing: 1,
        }}
      >
        {DATE}
      </div>

      {/* 开场标题：居中大白字，口语化 */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 60,
          right: 60,
          opacity: titleOpacity,
          textAlign: "center",
          transform: `translateY(${(1 - titleOpacity) * 18}px)`,
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.5,
            color: "#fff",
            textShadow: "0 2px 18px rgba(0,0,0,.7)",
          }}
        >
          {TITLE}
        </div>
        <div style={{ width: 64, height: 4, background: "rgba(255,255,255,.85)", margin: "24px auto 0" }} />
      </div>

      {/* 数字高亮：居中偏上，暖白，不用品牌色 */}
      {card && (
        <div
          style={{
            position: "absolute",
            top: 610,
            left: 0,
            right: 0,
            opacity: cardEnter,
            transform: `scale(${0.88 + cardEnter * 0.12})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 1,
              color: "#FFE9B8",
              textShadow: "0 4px 30px rgba(0,0,0,.6)",
            }}
          >
            {card.big}
          </div>
          <div style={{ fontSize: 30, color: "#fff", marginTop: 14, textShadow: "0 2px 12px rgba(0,0,0,.8)" }}>
            {card.label}
          </div>
        </div>
      )}

      {/* 字幕：居中偏下、大白字黑描边，小红书/抖音原生观感 */}
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 300,
            left: 52,
            right: 52,
            opacity: capOpacity,
            transform: `translateY(${capY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: idx === QUOTE_IDX ? 60 : 50,
              lineHeight: 1.6,
              fontWeight: idx === QUOTE_IDX ? 800 : 600,
              color: idx === QUOTE_IDX ? "#FFE9B8" : "#fff",
              textShadow:
                "0 2px 2px rgba(0,0,0,.9), 2px 0 2px rgba(0,0,0,.9), -2px 0 2px rgba(0,0,0,.9), 0 6px 24px rgba(0,0,0,.7)",
            }}
          >
            {active.text}
          </div>
        </div>
      )}

      {/* 底部极淡落款，不抢画面 */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 20,
          color: "rgba(255,255,255,.45)",
          letterSpacing: 2,
        }}
      >
        fengsKB
      </div>

      <Audio src={staticFile("media/copy-paste.mp3")} />
    </AbsoluteFill>
  );
};

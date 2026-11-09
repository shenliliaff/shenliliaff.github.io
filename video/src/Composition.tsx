import type { CSSProperties, ReactNode } from "react";
import { Audio } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import script from "../script.json";
import captionData from "./generated/captions.json";

const GREEN = "#2f855a";
const INK = "#153328";
const MINT = "#a7e6c3";
const PAPER = "#f5f5ee";
const FPS = script.fps;
const captions: Caption[] = captionData;
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
const ease = { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) };
const bodyFont = '"Microsoft YaHei", "PingFang SC", sans-serif';
const serifFont = 'Georgia, "Songti SC", SimSun, serif';

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 24], [0, 1], ease);
  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 36}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      style={{
        fontSize: 21,
        letterSpacing: 5,
        color: light ? MINT : GREEN,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

function Constellation({ muted = false }: { muted?: boolean }) {
  const frame = useCurrentFrame();
  const points = [
    [85, 600],
    [180, 440],
    [320, 490],
    [420, 300],
    [570, 360],
    [630, 175],
    [785, 235],
    [885, 70],
  ];
  return (
    <svg
      viewBox="0 0 1000 720"
      style={{
        position: "absolute",
        right: -20,
        top: 20,
        width: 1120,
        height: 870,
        opacity: muted ? 0.2 : 0.7,
      }}
    >
      <defs>
        <radialGradient id={muted ? "halo-muted" : "halo"}>
          <stop offset="0" stopColor={MINT} stopOpacity="0.32" />
          <stop offset="1" stopColor={MINT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="885"
        cy="70"
        r="155"
        fill={`url(#${muted ? "halo-muted" : "halo"})`}
      />
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        stroke={MINT}
        strokeOpacity=".5"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="1500"
        strokeDashoffset={interpolate(frame, [0, 75], [1500, 0], ease)}
      />
      <path
        d="M180 440L420 300L570 360L785 235M320 490L630 175"
        stroke={MINT}
        strokeOpacity=".18"
        fill="none"
      />
      {points.map(([x, y], i) => (
        <circle
          key={x}
          cx={x}
          cy={y}
          r={i === 7 ? 9 : 5}
          fill={MINT}
          opacity={interpolate(frame, [i * 5, i * 5 + 20], [0, 0.9], clamp)}
        />
      ))}
      <path
        d="M885 45L891 64L910 70L891 76L885 95L879 76L860 70L879 64Z"
        fill="#effbd9"
      />
    </svg>
  );
}

function Browser({
  image,
  nextImage,
  switchAt = 100,
  width = 1280,
  left = 540,
  top = 160,
  rotation = 0,
  label = "shenliliaff.github.io",
}: {
  image: string;
  nextImage?: string;
  switchAt?: number;
  width?: number;
  left?: number;
  top?: number;
  rotation?: number;
  label?: string;
}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [5, 36], [0, 1], ease);
  const zoom = interpolate(frame, [35, 260], [1, 1.035], clamp);
  const crossfade = interpolate(
    frame,
    [switchAt, switchAt + 18],
    [0, 1],
    clamp,
  );
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        opacity: progress,
        transform: `translateY(${(1 - progress) * 65}px) rotate(${rotation}deg)`,
        border: "1px solid #c7d8c9",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 35px 90px #122c2426",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          height: 45,
          backgroundColor: "#f1f4f0",
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "0 20px",
          borderBottom: "1px solid #dce5dc",
        }}
      >
        {["#c6d5c9", "#d4dfce", "#9ebfa9"].map((c) => (
          <span
            key={c}
            style={{
              width: 9,
              height: 9,
              backgroundColor: c,
              borderRadius: "50%",
            }}
          />
        ))}
        <span
          style={{
            margin: "auto",
            fontSize: 15,
            color: "#799382",
            fontFamily: "Consolas, monospace",
            paddingRight: 45,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: (width * 1000) / 1600,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(`images/${image}.png`)}
          style={{
            width: "100%",
            display: "block",
            transform: `scale(${zoom})`,
            transformOrigin: "50% 30%",
          }}
        />
        {nextImage && (
          <Img
            src={staticFile(`images/${nextImage}.png`)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              opacity: crossfade,
              transform: `scale(${zoom})`,
              transformOrigin: "50% 30%",
            }}
          />
        )}
      </div>
    </div>
  );
}

function Question() {
  const frame = useCurrentFrame();
  const cards = [
    { text: "新模型 / NEW MODELS", x: 1180, y: 210, angle: 8 },
    { text: "论文 · 开源 · 智能体", x: 1280, y: 410, angle: -6 },
    { text: "又一次更新。", x: 1070, y: 690, angle: 4 },
  ];
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#10271f",
        color: PAPER,
        padding: "105px 120px",
      }}
    >
      <Constellation muted />
      <Reveal>
        <Eyebrow light>FENGSKB / A PERSONAL KNOWLEDGE SPACE</Eyebrow>
      </Reveal>
      <Reveal delay={8} style={{ marginTop: 155 }}>
        <div style={{ fontSize: 112, lineHeight: 1.35, letterSpacing: -5 }}>
          信息很多。
          <br />
          留下多少<span style={{ color: MINT }}>理解</span>？
        </div>
      </Reveal>
      <Reveal
        delay={26}
        style={{
          width: 610,
          height: 1,
          backgroundColor: "#83a993",
          marginTop: 70,
        }}
      >
        <span />
      </Reveal>
      {cards.map((card, i) => (
        <div
          key={card.text}
          style={{
            position: "absolute",
            left: card.x,
            top: card.y,
            padding: "26px 32px",
            border: "1px solid #7b9c8144",
            borderRadius: 8,
            color: "#a5c3ae",
            fontSize: 27,
            backgroundColor: "#16392b",
            opacity: interpolate(
              frame,
              [10 + i * 8, 35 + i * 8, 100, 145],
              [0, 0.85, 0.85, 0.12],
              clamp,
            ),
            transform: `translateY(${interpolate(frame, [0, 150], [35, -25])}px) rotate(${card.angle}deg)`,
          }}
        >
          {card.text}
        </div>
      ))}
    </AbsoluteFill>
  );
}

function Brand() {
  return (
    <AbsoluteFill style={{ backgroundColor: PAPER, color: INK }}>
      <Reveal style={{ position: "absolute", top: 100, left: 110 }}>
        <Eyebrow>一个持续生长的知识空间</Eyebrow>
      </Reveal>
      <Reveal
        delay={5}
        style={{ position: "absolute", top: 325, left: 110, zIndex: 2 }}
      >
        <Img
          src={staticFile("images/fengskb-icon.svg")}
          style={{ width: 90, height: 90, marginBottom: 18 }}
        />
        <div
          style={{
            fontFamily: serifFont,
            fontSize: 125,
            letterSpacing: -6,
            color: GREEN,
          }}
        >
          fengsKB
        </div>
        <div style={{ marginTop: 35, fontSize: 35, lineHeight: 1.9 }}>
          技术。阅读。生活。
          <br />
          <span style={{ color: "#718477", fontSize: 25 }}>
            记录它们如何彼此塑造。
          </span>
        </div>
      </Reveal>
      <Browser image="home" width={1090} left={760} top={220} rotation={-2} />
      <Reveal
        delay={30}
        style={{
          position: "absolute",
          bottom: 190,
          left: 113,
          color: GREEN,
          fontSize: 17,
          letterSpacing: 6,
        }}
      >
        RECORD / CONNECT / UNDERSTAND
      </Reveal>
    </AbsoluteFill>
  );
}

function Tracking() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#e8f0e7", color: INK }}>
      <Reveal style={{ position: "absolute", top: 90, left: 110 }}>
        <Eyebrow>01 / 追踪</Eyebrow>
      </Reveal>
      <Reveal delay={4} style={{ position: "absolute", top: 235, left: 110 }}>
        <div style={{ fontSize: 75, lineHeight: 1.4 }}>
          热点之外，
          <br />
          <span style={{ color: GREEN }}>找到出处。</span>
        </div>
        <div style={{ fontSize: 24, color: "#687d6e", marginTop: 30 }}>
          从一条动态开始，
          <br />
          保留追溯信息的路径。
        </div>
      </Reveal>
      <Browser
        image="hot"
        nextImage="hot-search"
        switchAt={105}
        width={1250}
        left={590}
        top={125}
        label="fengsKB / 热点榜单"
      />
      <div style={{ position: "absolute", left: 110, top: 600 }}>
        {["按日期浏览", "跨历史搜索", "查看来源"].map((label, i) => (
          <Reveal delay={20 + i * 20} key={label}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontSize: 25,
                marginBottom: 26,
                color: frame > 100 && i === 1 ? GREEN : "#54735f",
              }}
            >
              <span
                style={{
                  fontFamily: serifFont,
                  fontSize: 22,
                  color: "#8aa493",
                }}
              >
                0{i + 1}
              </span>
              {label}
            </div>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function Insight() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f2f1e8", color: INK }}>
      <Reveal style={{ position: "absolute", top: 90, left: 110 }}>
        <Eyebrow>02 / 理解</Eyebrow>
      </Reveal>
      <Reveal delay={5} style={{ position: "absolute", top: 240, left: 110 }}>
        <div style={{ fontSize: 75, lineHeight: 1.4 }}>
          不止发生。
          <br />
          <span style={{ color: GREEN }}>更问意义。</span>
        </div>
        <div
          style={{
            fontSize: 27,
            lineHeight: 2,
            marginTop: 60,
            color: "#637969",
          }}
        >
          技术的边界
          <br />
          落地的成本
          <br />
          变化的意义
        </div>
      </Reveal>
      <Browser
        image="blog"
        nextImage="article"
        switchAt={105}
        width={1240}
        left={590}
        top={130}
        rotation={-1.2}
        label="fengsKB / 博客"
      />
    </AbsoluteFill>
  );
}

function Reading() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#f1ecdf", color: INK }}>
      <Reveal style={{ position: "absolute", top: 90, left: 110 }}>
        <Eyebrow>03 / 沉淀</Eyebrow>
      </Reveal>
      <Reveal delay={6} style={{ position: "absolute", top: 195, left: 110 }}>
        <div style={{ fontSize: 68, lineHeight: 1.45 }}>
          技术之外，
          <br />
          还有<span style={{ color: GREEN }}>生活。</span>
        </div>
      </Reveal>
      <div
        style={{
          position: "absolute",
          top: 495,
          left: 130,
          width: 255,
          height: 330,
          padding: "40px 30px",
          borderLeft: "9px solid #c6af7e",
          backgroundColor: "#e1d5b7",
          boxShadow: "12px 20px 35px #4e3f231a",
          transform: `rotate(${interpolate(frame, [0, 50], [-13, -7], ease)}deg)`,
        }}
      >
        <div style={{ fontSize: 15, letterSpacing: 3, color: "#7e755d" }}>
          READING NOTES
        </div>
        <div
          style={{
            fontFamily: serifFont,
            fontSize: 43,
            lineHeight: 1.6,
            marginTop: 35,
          }}
        >
          我看见
          <br />
          的世界
        </div>
        <div style={{ fontSize: 19, color: "#827b63", marginTop: 20 }}>
          阅读与思考
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 565,
          left: 340,
          width: 205,
          height: 285,
          padding: "32px 25px",
          borderLeft: "7px solid #91a895",
          backgroundColor: "#ccdccc",
          boxShadow: "12px 20px 35px #263e241a",
          transform: "rotate(6deg)",
        }}
      >
        <div style={{ fontSize: 15, color: "#718373" }}>读书笔记</div>
        <div
          style={{
            fontFamily: serifFont,
            fontSize: 39,
            lineHeight: 1.6,
            marginTop: 30,
          }}
        >
          万历
          <br />
          十五年
        </div>
      </div>
      <Browser
        image="reading"
        nextImage="thought"
        switchAt={130}
        width={1180}
        left={660}
        top={155}
        rotation={1}
        label="fengsKB / 阅读与思考"
      />
    </AbsoluteFill>
  );
}

function Outro() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#10271f", color: PAPER }}>
      <Constellation />
      <div style={{ position: "absolute", left: 110, top: 95 }}>
        <Eyebrow light>RECORD. CONNECT. KEEP THINKING.</Eyebrow>
      </div>
      <Reveal delay={4} style={{ position: "absolute", left: 200, top: 245 }}>
        <Img
          src={staticFile("images/fengskb-icon.svg")}
          style={{ width: 110, height: 110 }}
        />
        <div
          style={{
            fontFamily: serifFont,
            fontSize: 142,
            letterSpacing: -5,
            marginTop: 15,
          }}
        >
          fengsKB
        </div>
        <div
          style={{ fontSize: 43, color: MINT, marginTop: 35, letterSpacing: 3 }}
        >
          追寻属于自己的北极星。
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 70,
            paddingBottom: 15,
            borderBottom: "1px solid #7cab8b",
            fontFamily: "Consolas, monospace",
            fontSize: 29,
            color: "#b3cbb9",
          }}
        >
          shenliliaff.github.io <span style={{ marginLeft: 20 }}>↗</span>
        </div>
      </Reveal>
      <div
        style={{
          position: "absolute",
          bottom: 160,
          right: 115,
          color: "#7ca58a",
          fontSize: 20,
          letterSpacing: 5,
        }}
      >
        技术 / 阅读 / 生活
      </div>
    </AbsoluteFill>
  );
}

const scenes = [Question, Brand, Tracking, Insight, Reading, Outro];

function Subtitles() {
  const frame = useCurrentFrame();
  const ms = (frame * 1000) / FPS;
  const caption = captions.find((c) => ms >= c.startMs && ms < c.endMs);
  if (!caption) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 42,
        left: 100,
        right: 100,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#0c211ced",
          color: "#f6faf5",
          padding: "16px 34px",
          borderRadius: 8,
          fontSize: 34,
          lineHeight: 1.4,
          textAlign: "center",
          maxWidth: 1600,
          letterSpacing: 1,
        }}
      >
        {caption.text}
      </div>
    </div>
  );
}

export function FengsKBVideo() {
  const frame = useCurrentFrame();
  const musicVolume = (audioFrame: number) => {
    const ms = (audioFrame * 1000) / FPS;
    const duck = Math.max(
      ...captions.map((c) =>
        interpolate(
          ms,
          [c.startMs - 200, c.startMs, c.endMs, c.endMs + 300],
          [0, 1, 1, 0],
          clamp,
        ),
      ),
    );
    return 0.15 - duck * 0.05;
  };
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont, backgroundColor: PAPER }}>
      {script.scenes.map((scene, i) => {
        const Scene = scenes[i];
        return (
          <Sequence
            key={scene.id}
            from={scene.start * FPS}
            durationInFrames={(scene.end - scene.start) * FPS}
          >
            <Scene />
          </Sequence>
        );
      })}
      <Subtitles />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${(frame / (script.durationInSeconds * FPS - 1)) * 100}%`,
          height: 4,
          backgroundColor: GREEN,
        }}
      />
      <Audio src={staticFile("audio/voice.wav")} volume={1} />
      <Audio src={staticFile("audio/music.wav")} volume={musicVolume} />
    </AbsoluteFill>
  );
}

import type { ReactNode } from "react";
import type { Caption } from "@remotion/captions";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BloggerOpening, Pointer } from "./BloggerSample";
import timeline from "./generated/full-video.json";

const ink = "#081718";
const mint = "#b2f4cb";
const green = "#3eaf7c";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) };
type SceneData = (typeof timeline.scenes)[number];
const captions: Caption[] = timeline.captions;
const fps = timeline.fps;

function Surface({
  children,
  chapter,
}: {
  children: ReactNode;
  chapter: string;
}) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: ink,
        color: "#f4f5ed",
        fontFamily: '"Microsoft YaHei", sans-serif',
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.24,
          backgroundImage:
            "linear-gradient(#427c701b 1px,transparent 1px),linear-gradient(90deg,#427c701b 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 60,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Img
          src={staticFile("images/fengskb-icon.svg")}
          style={{ width: 43, height: 43 }}
        />
        <span style={{ fontSize: 25 }}>fengsKB</span>
        <span
          style={{
            width: 1,
            height: 18,
            backgroundColor: "#46605b",
            margin: "0 12px",
          }}
        />
        <span style={{ fontSize: 19, color: "#8baba2" }}>
          一个知识库，怎么用？
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 73,
          fontSize: 17,
          letterSpacing: 3,
          color: "#8baba2",
        }}
      >
        {chapter}
      </div>
      {children}
    </AbsoluteFill>
  );
}

function Tag({
  children,
  active = true,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "10px 20px",
        fontSize: 21,
        border: "1px solid #658a73",
        borderRadius: 5,
        color: active ? ink : "#a7bcad",
        backgroundColor: active ? mint : "transparent",
      }}
    >
      {children}
    </span>
  );
}

function Window({
  children,
  label,
  left = 650,
  top = 175,
  width = 1170,
  height = 680,
}: {
  children: ReactNode;
  label: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}) {
  const frame = useCurrentFrame();
  const entrance = interpolate(frame, [0, 18], [0, 1], ease);
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        border: "1px solid #719982",
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 30px 100px #0005",
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 35}px)`,
      }}
    >
      <div
        style={{
          height: 46,
          padding: "12px 22px",
          fontSize: 17,
          backgroundColor: "#17312a",
          color: "#aecbbb",
        }}
      >
        {label}
        <span style={{ float: "right", fontSize: 14 }}>真实页面局部</span>
      </div>
      <div
        style={{
          position: "relative",
          height: height - 46,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Crop({
  image,
  x,
  y,
  scale = 1.3,
  opacity = 1,
}: {
  image: string;
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <Img
      src={staticFile(`images/${image}.png`)}
      style={{
        position: "absolute",
        width: 1600 * scale,
        maxWidth: "none",
        left: -x * scale,
        top: -y * scale,
        opacity,
      }}
    />
  );
}

function SearchScene({ scene }: { scene: SceneData }) {
  const f = useCurrentFrame();
  const sourceAt =
    Math.round((captions[scene.captionStart + 1].startMs / 1000) * fps) -
    scene.from;
  const source = interpolate(f, [sourceAt, sourceAt + 20], [0, 1], ease);
  const typing = f < 28 ? "" : f < 38 ? "开" : "开源";
  const result = interpolate(f, [48, 62], [0, 1], clamp);
  return (
    <Surface chapter="01 / 找信息">
      <div style={{ position: "absolute", left: 110, top: 205, width: 510 }}>
        <div style={{ fontSize: 24, color: mint, marginBottom: 35 }}>
          比如，最近有什么开源项目？
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: -3,
          }}
        >
          不用翻半天。
          <br />
          <span style={{ color: mint }}>直接搜。</span>
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 13 }}>
          <Tag>开源</Tag>
          <Tag active={false}>机构</Tag>
          <Tag active={false}>模型</Tag>
        </div>
        <div
          style={{
            marginTop: 55,
            fontSize: 27,
            color: "#a5c0b1",
            lineHeight: 1.9,
          }}
        >
          找到消息，
          <br />
          再往来源走一步。
        </div>
      </div>
      <Window label="fengsKB / 热点榜单" height={660}>
        <Crop image="hot-search" x={430} y={77} scale={1.42} />
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 34,
            width: 430,
            height: 42,
            backgroundColor: "#fff",
            fontSize: 27,
            color: "#264d3b",
            paddingLeft: 8,
          }}
        >
          {typing}
          <span style={{ opacity: f < 48 ? 1 : 0 }}>｜</span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: "111px 0 0",
            backgroundColor: "#fff",
            opacity: 1 - result,
          }}
        />
        <Pointer
          x={interpolate(f, [0, 30, 75], [840, 170, 680], ease)}
          y={interpolate(f, [0, 30, 75], [300, 50, 455], ease)}
          click={interpolate(f, [36, 55], [0, 1], clamp)}
        />
      </Window>
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 635,
          width: 1100,
          height: 214,
          backgroundColor: "#fff",
          border: `2px solid ${mint}`,
          borderRadius: 12,
          boxShadow: "0 15px 60px #0007",
          overflow: "hidden",
          opacity: source,
          transform: `translateY(${(1 - source) * 50}px)`,
        }}
      >
        <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
          <Crop image="hot-search" x={470} y={530} scale={1.4} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "15px 24px",
            fontSize: 24,
            backgroundColor: "#17312a",
            color: mint,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>从这条链接，回到出处。</span>
          <span>↗</span>
        </div>
      </div>
    </Surface>
  );
}

function BlogScene({ scene }: { scene: SceneData }) {
  const f = useCurrentFrame();
  const articleAt =
    Math.round((captions[scene.captionStart + 1].startMs / 1000) * fps) -
    scene.from;
  const article = interpolate(
    f,
    [articleAt - 10, articleAt + 10],
    [0, 1],
    clamp,
  );
  const highlight = interpolate(
    f,
    [articleAt + 15, articleAt + 42],
    [0, 1],
    ease,
  );
  return (
    <Surface chapter="02 / 多看一层">
      <div style={{ position: "absolute", left: 110, top: 205 }}>
        <div style={{ fontSize: 24, color: mint, marginBottom: 32 }}>
          看完新闻，还可以多问一句。
        </div>
        <div style={{ fontSize: 79, fontWeight: 700, lineHeight: 1.4 }}>
          然后呢？
          <br />
          <span style={{ color: mint }}>到底有什么用？</span>
        </div>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            gap: 30,
            fontSize: 29,
            color: "#adbfaf",
          }}
        >
          {["发生了什么", "有什么限制", "和使用有什么关系"].map((s, i) => (
            <div
              key={s}
              style={{
                opacity: interpolate(f, [i * 18, i * 18 + 18], [0, 1], clamp),
              }}
            >
              <span style={{ color: mint, marginRight: 18 }}>0{i + 1}</span>
              {s}
            </div>
          ))}
        </div>
      </div>
      <Window label="fengsKB / 博客" left={735} width={1080} height={665}>
        <Crop image="blog" x={430} y={235} scale={1.35} opacity={1 - article} />
        <Crop image="article" x={430} y={145} scale={1.35} opacity={article} />
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 112,
            width: 1000 * highlight,
            height: 54,
            backgroundColor: "#66d7a133",
            borderBottom: `2px solid ${green}`,
            opacity: article,
          }}
        />
        <Pointer
          x={interpolate(f, [0, 40, 80], [850, 470, 610], ease)}
          y={interpolate(f, [0, 40, 80], [420, 180, 240], ease)}
          click={interpolate(f, [42, 65], [0, 1], clamp)}
        />
      </Window>
      <div
        style={{
          position: "absolute",
          left: 1180,
          top: 795,
          fontSize: 24,
          padding: "16px 26px",
          backgroundColor: mint,
          color: ink,
          transform: `rotate(-3deg) translateY(${(1 - highlight) * 30}px)`,
          opacity: highlight,
        }}
      >
        参数之外，也看现实限制。
      </div>
    </Surface>
  );
}

function ReadingScene({ scene }: { scene: SceneData }) {
  const f = useCurrentFrame();
  const reveal = interpolate(f, [0, 24], [0, 1], ease);
  const thoughtAt = Math.floor(scene.durationInFrames * 0.58);
  const thought = interpolate(f, [thoughtAt, thoughtAt + 18], [0, 1], clamp);
  return (
    <Surface chapter="03 / 慢慢记下来">
      <div style={{ position: "absolute", left: 110, top: 195 }}>
        <div style={{ fontSize: 25, color: mint, marginBottom: 30 }}>
          换个话题，也没关系。
        </div>
        <div style={{ fontSize: 79, fontWeight: 700, lineHeight: 1.4 }}>
          这里，
          <br />
          也不只有 <span style={{ color: mint }}>AI。</span>
        </div>
      </div>
      {[
        {
          title: <>读过的书</>,
          sub: "我看见的世界",
          left: 120,
          top: 550,
          angle: -7,
          color: "#d6dcc2",
        },
        {
          title: <>看过的电影</>,
          sub: "信任与选择",
          left: 315,
          top: 605,
          angle: 5,
          color: "#a9cbb9",
        },
      ].map((book) => (
        <div
          key={book.sub}
          style={{
            position: "absolute",
            left: book.left,
            top: book.top,
            width: 235,
            height: 250,
            padding: "28px 23px",
            backgroundColor: book.color,
            color: "#17392c",
            borderLeft: "7px solid #718f79",
            boxShadow: "0 15px 40px #0004",
            transform: `rotate(${book.angle}deg) translateY(${(1 - reveal) * 45}px)`,
            opacity: reveal,
          }}
        >
          <div style={{ fontSize: 15, letterSpacing: 2, marginBottom: 28 }}>
            READ / THINK
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{book.title}</div>
          <div style={{ fontSize: 19, marginTop: 23, lineHeight: 1.7 }}>
            {book.sub}
          </div>
        </div>
      ))}
      <Window
        label="fengsKB / 阅读与想法"
        left={690}
        width={1120}
        top={190}
        height={665}
      >
        <Crop
          image="reading"
          x={345}
          y={55}
          scale={1.2}
          opacity={1 - thought}
        />
        <Crop image="thought" x={375} y={40} scale={1.2} opacity={thought} />
      </Window>
      <div
        style={{
          position: "absolute",
          right: 130,
          top: 818,
          padding: "16px 24px",
          border: "1px solid #a1cbb0",
          backgroundColor: "#17372c",
          color: mint,
          fontSize: 24,
          opacity: interpolate(f, [70, 95], [0, 1], clamp),
        }}
      >
        没想明白的，也值得先记下来。
      </div>
    </Surface>
  );
}

function OutroScene({ scene }: { scene: SceneData }) {
  const f = useCurrentFrame();
  const progress = interpolate(f, [0, 25], [0, 1], ease);
  const wordsAt =
    Math.round((captions[scene.captionStart + 1].startMs / 1000) * fps) -
    scene.from;
  const words = interpolate(f, [wordsAt, wordsAt + 24], [0, 1], ease);
  return (
    <Surface chapter="FENGSKB / KEEP THINKING">
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 220,
          opacity: progress,
          transform: `translateY(${(1 - progress) * 30}px)`,
        }}
      >
        <div style={{ fontSize: 28, color: mint, marginBottom: 28 }}>它叫</div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 145,
            letterSpacing: -6,
          }}
        >
          fengsKB<span style={{ color: mint }}>.</span>
        </div>
        <div
          style={{
            fontSize: 48,
            marginTop: 32,
            color: "#d9e7d8",
            opacity: words,
          }}
        >
          不只是一个收藏夹。
        </div>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.9,
            marginTop: 28,
            color: "#a6c6af",
            opacity: words,
          }}
        >
          下次还能找到。
          <br />
          也能多理解一点。
        </div>
        <div
          style={{
            fontFamily: "Consolas,monospace",
            fontSize: 29,
            paddingBottom: 14,
            borderBottom: "1px solid #649578",
            display: "inline-block",
            marginTop: 52,
            color: mint,
          }}
        >
          shenliliaff.github.io ↗
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1020,
          top: 190,
          width: 750,
          height: 640,
        }}
      >
        <svg viewBox="0 0 750 640" width="750" height="640">
          <defs>
            <radialGradient id="end-light">
              <stop offset="0" stopColor="#c8f9b9" stopOpacity=".3" />
              <stop offset="1" stopColor={mint} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="590" cy="105" r="160" fill="url(#end-light)" />
          {[110, 200, 290].map((r) => (
            <circle
              key={r}
              cx="390"
              cy="320"
              r={r}
              fill="none"
              stroke="#6f998334"
              strokeDasharray="3 10"
            />
          ))}
          <path
            d="M70 520L195 380L310 415L380 270L475 310L590 105"
            stroke={mint}
            strokeWidth="2"
            fill="none"
            strokeDasharray="1000"
            strokeDashoffset={interpolate(f, [0, 75], [1000, 0], ease)}
          />
          {[
            [70, 520],
            [195, 380],
            [310, 415],
            [380, 270],
            [475, 310],
          ].map(([x, y], i) => (
            <circle
              key={x}
              cx={x}
              cy={y}
              r="6"
              fill={mint}
              opacity={interpolate(f, [i * 8, i * 8 + 20], [0, 1], clamp)}
            />
          ))}
          <path
            d="M590 76L597 98L619 105L597 112L590 134L583 112L561 105L583 98Z"
            fill="#e5fdd0"
          />
          <text x="70" y="565" fill="#94b3a0" fontSize="22">
            记录
          </text>
          <text x="332" y="238" fill="#94b3a0" fontSize="22">
            连接
          </text>
          <text x="580" y="55" fill="#e5fdd0" fontSize="24">
            理解
          </text>
        </svg>
      </div>
    </Surface>
  );
}

const remainingScenes = [SearchScene, BlogScene, ReadingScene, OutroScene];

export function BloggerFull() {
  const frame = useCurrentFrame();
  const opening = timeline.scenes[0];
  const caption = captions.find(
    (c) => (frame / fps) * 1000 >= c.startMs && (frame / fps) * 1000 < c.endMs,
  );
  return (
    <AbsoluteFill style={{ backgroundColor: ink }}>
      <Sequence durationInFrames={opening.durationInFrames}>
        <BloggerOpening captions={captions.slice(0, opening.captionCount)} />
      </Sequence>
      {timeline.scenes.slice(1).map((scene, i) => {
        const Scene = remainingScenes[i];
        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
          >
            <Scene scene={scene} />
          </Sequence>
        );
      })}
      {frame >= opening.durationInFrames && caption && (
        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            bottom: 53,
            display: "flex",
            justifyContent: "center",
            fontFamily: '"Microsoft YaHei", sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 500,
              letterSpacing: 1,
              color: "#fff",
              backgroundColor: "#081718ed",
              padding: "15px 30px",
              borderRadius: 6,
              borderBottom: "2px solid #9ac7a4",
              textAlign: "center",
              maxWidth: 1700,
              lineHeight: 1.5,
            }}
          >
            {caption.text}
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 3,
          width: `${(frame / (timeline.durationInFrames - 1)) * 100}%`,
          backgroundColor: mint,
        }}
      />
      <Sequence from={timeline.audioOffsetFrames}>
        <Audio src={staticFile(timeline.audio)} />
      </Sequence>
      <Audio
        src={staticFile("audio/music.wav")}
        volume={(f) => {
          const ms = (f / fps) * 1000;
          const speech = Math.max(
            ...captions.map((c) =>
              interpolate(
                ms,
                [c.startMs - 180, c.startMs, c.endMs, c.endMs + 250],
                [0, 1, 1, 0],
                clamp,
              ),
            ),
          );
          return (
            (0.08 - speech * 0.035) *
            interpolate(
              f,
              [
                0,
                20,
                timeline.durationInFrames - 60,
                timeline.durationInFrames,
              ],
              [0, 1, 1, 0],
              clamp,
            )
          );
        }}
      />
      {timeline.scenes.slice(1, 3).map((scene) => (
        <Sequence key={scene.id} from={scene.from + 42} durationInFrames={5}>
          <Audio src={staticFile("audio/v2/click.wav")} volume={0.45} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

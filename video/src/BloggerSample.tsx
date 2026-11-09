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
  useVideoConfig,
} from "remotion";
import auditions from "./generated/auditions.json";

export type SampleProps = { voice: keyof typeof auditions };
const ink = "#081718";
const mint = "#b2f4cb";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const smooth = { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) };
const font = '"Microsoft YaHei", sans-serif';

export function Pointer({
  x,
  y,
  click,
}: {
  x: number;
  y: number;
  click: number;
}) {
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 8 }}>
      <div
        style={{
          position: "absolute",
          left: -30,
          top: -30,
          width: 60,
          height: 60,
          border: "2px solid #b2f4cb",
          borderRadius: "50%",
          opacity: 1 - click,
          transform: `scale(${0.5 + click * 1.6})`,
        }}
      />
      <svg width="48" height="55" viewBox="0 0 40 48">
        <path
          d="M3 2L3 36L12 27L21 44L28 40L19 24L33 24Z"
          fill="#ecfff3"
          stroke="#152e2e"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function BloggerOpening({ captions }: { captions: Caption[] }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const firstCut = Math.round((captions[1].startMs / 1000) * fps);
  const secondCut = Math.round((captions[2].startMs / 1000) * fps);
  const part = frame < firstCut ? 0 : frame < secondCut ? 1 : 2;
  const local = frame - (part === 0 ? 0 : part === 1 ? firstCut : secondCut);
  const entrance = interpolate(local, [0, 16], [0, 1], smooth);
  const caption = captions.find((c) => ms >= c.startMs && ms < c.endMs);
  const resultVisible = local > 35;
  const zoom = interpolate(local, [35, 90], [1, 1.065], smooth);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: ink,
        color: "#f4f5ed",
        fontFamily: font,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.25,
          backgroundImage:
            "linear-gradient(#427c701b 1px, transparent 1px),linear-gradient(90deg,#427c701b 1px, transparent 1px)",
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
        <span style={{ fontSize: 25, letterSpacing: 1 }}>fengsKB</span>
        <span
          style={{
            height: 18,
            width: 1,
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
          fontSize: 16,
          letterSpacing: 3,
          color: "#8baba2",
        }}
      >
        工具分享 / 01
      </div>
      {part === 0 && (
        <>
          <div
            style={{
              position: "absolute",
              left: 110,
              top: 240,
              transform: `translateY(${(1 - entrance) * 25}px)`,
              opacity: entrance,
            }}
          >
            <div style={{ fontSize: 25, color: mint, marginBottom: 34 }}>
              每天打开浏览器，都像在追连续剧。
            </div>
            <div
              style={{
                fontSize: 125,
                fontWeight: 700,
                lineHeight: 1.24,
                letterSpacing: -5,
              }}
            >
              AI 新闻，
              <br />
              <span style={{ color: mint }}>又更新了。</span>
            </div>
            <div style={{ marginTop: 43, fontSize: 27, color: "#a2b6ac" }}>
              模型 / 工具 / 论文 / 开源
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: 100,
              top: 200,
              width: 710,
              height: 640,
              overflow: "hidden",
              transform: "rotate(-5deg)",
            }}
          >
            {[
              "刚看完一个模型发布",
              "又有新工具上线",
              "这篇论文先收藏",
              "还有这个开源项目",
              "晚点再看……",
            ].map((text, i) => (
              <div
                key={text}
                style={{
                  position: "absolute",
                  top:
                    i * 147 -
                    interpolate(frame, [0, firstCut], [0, 135], clamp),
                  left: 35,
                  width: 635,
                  padding: "30px 34px",
                  backgroundColor: i === 2 ? "#b2f4cb" : "#172c2b",
                  color: i === 2 ? ink : "#c9ddd1",
                  border: "1px solid #36524a",
                  borderRadius: 12,
                  boxShadow: "0 20px 40px #0003",
                  opacity: interpolate(
                    frame,
                    [i * 3, i * 3 + 12],
                    [0, 1],
                    clamp,
                  ),
                }}
              >
                <div
                  style={{
                    fontFamily: "Consolas,monospace",
                    fontSize: 17,
                    opacity: 0.65,
                    marginBottom: 12,
                  }}
                >
                  INBOX / 0{i + 1}
                </div>
                <div style={{ fontSize: 32 }}>{text}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {part === 1 && (
        <>
          <div style={{ position: "absolute", left: 110, top: 210 }}>
            <div style={{ fontSize: 26, color: mint, marginBottom: 26 }}>
              等一下，那条消息呢？
            </div>
            <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4 }}>
              明明
              <span style={{ position: "relative", display: "inline-block" }}>
                看过
                <svg
                  style={{ position: "absolute", left: -10, bottom: -20 }}
                  width="240"
                  height="35"
                >
                  <path
                    d="M8 20Q110 0 230 16"
                    fill="none"
                    stroke="#c7f68a"
                    strokeWidth="6"
                    strokeDasharray="250"
                    strokeDashoffset={interpolate(
                      local,
                      [8, 28],
                      [250, 0],
                      clamp,
                    )}
                  />
                </svg>
              </span>
              。
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                marginTop: 12,
                color: "#9ab5a7",
              }}
            >
              就是找不到。
            </div>
            <div style={{ fontSize: 25, color: "#98b0a6", marginTop: 55 }}>
              收藏，不等于整理。
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 950,
              top: 215,
              width: 825,
              height: 570,
              border: "1px solid #49685c",
              borderRadius: 16,
              backgroundColor: "#102a25",
              padding: 44,
              transform: `translateY(${(1 - entrance) * 40}px)`,
              opacity: entrance,
            }}
          >
            <div style={{ display: "flex", gap: 9, marginBottom: 36 }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#658675",
                  }}
                />
              ))}
              <span
                style={{ marginLeft: "auto", fontSize: 16, color: "#729889" }}
              >
                信息整理 · 概念演示
              </span>
            </div>
            <div
              style={{
                border: "1px solid #7bb29b",
                backgroundColor: ink,
                borderRadius: 7,
                padding: "20px 22px",
                fontSize: 28,
                color: mint,
              }}
            >
              那条……之前的 AI 消息
              <span
                style={{ opacity: Math.floor(local / 12) % 2 === 0 ? 1 : 0 }}
              >
                ｜
              </span>
            </div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  marginTop: 29,
                  opacity: 0.6 - i * 0.15,
                  transform: `translateX(${Math.sin(local / 25 + i) * 5}px)`,
                }}
              >
                <div
                  style={{
                    height: 12,
                    width: `${80 - i * 12}%`,
                    backgroundColor: "#3c6858",
                    borderRadius: 6,
                  }}
                />
                <div
                  style={{
                    height: 9,
                    width: `${65 - i * 10}%`,
                    backgroundColor: "#244a3a",
                    borderRadius: 5,
                    marginTop: 17,
                  }}
                />
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                right: 46,
                bottom: 38,
                transform: "rotate(-7deg)",
                padding: "13px 22px",
                color: "#e4f1d1",
                border: "2px solid #96b36f",
                fontSize: 24,
              }}
            >
              不如，换个找法。
            </div>
          </div>
        </>
      )}
      {part === 2 && (
        <>
          <div style={{ position: "absolute", left: 110, top: 190 }}>
            <div style={{ fontSize: 23, color: mint, marginBottom: 27 }}>
              把信息放回能找到的地方。
            </div>
            <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.4 }}>
              少翻一会儿。
              <br />
              <span style={{ color: mint }}>多看明白一点。</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 25,
                marginTop: 65,
                fontSize: 27,
              }}
            >
              {["搜关键词", "看上下文", "沿来源继续读"].map((text, i) => (
                <div
                  key={text}
                  style={{
                    opacity: interpolate(
                      local,
                      [i * 15, i * 15 + 15],
                      [0.15, 1],
                      clamp,
                    ),
                  }}
                >
                  <span
                    style={{
                      color: mint,
                      fontFamily: "Consolas",
                      marginRight: 24,
                    }}
                  >
                    0{i + 1}
                  </span>
                  {text}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 64,
                fontFamily: "Consolas,monospace",
                fontSize: 19,
                color: "#92b2a2",
              }}
            >
              shenliliaff.github.io
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 770,
              top: 185,
              width: 1050,
              height: 680,
              border: "1px solid #739c84",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 25px 90px #0006",
              transform: `translateY(${(1 - entrance) * 45}px) scale(${zoom})`,
              opacity: entrance,
            }}
          >
            <div
              style={{
                height: 46,
                backgroundColor: "#17312a",
                fontSize: 17,
                padding: "12px 22px",
                color: "#a7c3b3",
              }}
            >
              fengsKB / 热点榜单{" "}
              <span style={{ float: "right", fontSize: 14 }}>真实页面局部</span>
            </div>
            <div
              style={{
                position: "relative",
                height: 634,
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <Img
                src={staticFile("images/hot-search.png")}
                style={{
                  position: "absolute",
                  width: 2090,
                  maxWidth: "none",
                  left: -540,
                  top: -105,
                }}
              />
              {!resultVisible && (
                <div
                  style={{
                    position: "absolute",
                    inset: "108px 0 0",
                    backgroundColor: "#fff",
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  left: 82,
                  top: 26,
                  width: 490,
                  height: 42,
                  backgroundColor: "#fff",
                  padding: "3px 0",
                  color: "#314c41",
                  fontSize: 28,
                }}
              >
                {local > 23 ? "开源" : local > 15 ? "开" : ""}
                <span style={{ opacity: local < 35 ? 1 : 0 }}>｜</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 47,
                  top: 126,
                  width: 975,
                  height: 440,
                  border: "2px solid #3eaf7c",
                  borderRadius: 4,
                  opacity: interpolate(
                    local,
                    [35, 47, 76, 95],
                    [0, 0.9, 0.9, 0],
                    clamp,
                  ),
                  boxShadow: "0 0 25px #3eaf7c22",
                }}
              />
            </div>
            <Pointer
              x={interpolate(local, [0, 22, 55], [730, 190, 710], smooth)}
              y={interpolate(local, [0, 22, 55], [430, 82, 495], smooth)}
              click={interpolate(local, [23, 43], [0, 1], clamp)}
            />
          </div>
        </>
      )}
      {caption && (
        <div
          style={{
            position: "absolute",
            left: 100,
            right: 100,
            bottom: 53,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 35,
              fontWeight: 500,
              letterSpacing: 1,
              color: "#fff",
              backgroundColor: "#081718eb",
              padding: "15px 30px",
              borderRadius: 6,
              borderBottom: "2px solid #9ac7a4",
              textAlign: "center",
              maxWidth: 1660,
            }}
          >
            {caption.text}
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          width: `${(frame / (durationInFrames - 1)) * 100}%`,
          backgroundColor: mint,
        }}
      />
    </AbsoluteFill>
  );
}

export function BloggerSample({ voice }: SampleProps) {
  const { fps, durationInFrames } = useVideoConfig();
  const data = auditions[voice];
  const secondCut = Math.round((data.captions[2].startMs / 1000) * fps);
  return (
    <AbsoluteFill>
      <BloggerOpening captions={data.captions} />
      <Sequence from={Math.round(0.25 * fps)}>
        <Audio src={staticFile(data.audio)} />
      </Sequence>
      <Audio
        src={staticFile("audio/music.wav")}
        trimBefore={10 * fps}
        volume={(f) =>
          interpolate(
            f,
            [0, 12, durationInFrames - 25, durationInFrames],
            [0, 0.045, 0.045, 0],
            clamp,
          )
        }
      />
      <Sequence from={secondCut + 25} durationInFrames={5}>
        <Audio src={staticFile("audio/v2/click.wav")} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
}

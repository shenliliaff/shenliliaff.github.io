import { Composition } from "remotion";
import { FengsKBVideo } from "./Composition";
import script from "../script.json";
import { BloggerSample } from "./BloggerSample";
import auditions from "./generated/auditions.json";
import { BloggerFull } from "./BloggerFull";
import fullVideo from "./generated/full-video.json";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FengsKBV2"
        component={BloggerFull}
        durationInFrames={fullVideo.durationInFrames}
        fps={fullVideo.fps}
        width={1920}
        height={1080}
      />
      <Composition
        id="FengsKB"
        component={FengsKBVideo}
        durationInFrames={script.durationInSeconds * script.fps}
        fps={script.fps}
        width={1920}
        height={1080}
      />
      <Composition
        id="BloggerXiaoxiao"
        component={BloggerSample}
        defaultProps={{ voice: "xiaoxiao" as const }}
        durationInFrames={auditions.xiaoxiao.durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BloggerXiaoyi"
        component={BloggerSample}
        defaultProps={{ voice: "xiaoyi" as const }}
        durationInFrames={auditions.xiaoyi.durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

# fengsKB 产品介绍视频

## 第二版完整版：已选择晓伊

合成 ID：`FengsKBV2`。保持晓伊自然语速，完整视频约 45.63 秒（1369 帧），1920×1080、30 fps、H.264/AAC。播放用文件和独立旁白、SRT、封面保存在 `out/v2-full`。第一版与 A/B 小样保持不变。

```powershell
Set-Location video
npm run audio:v2
npm run render:v2
npm run render:v2-preview
npm run still:v2
Copy-Item full-preview.html out\v2-full\index.html
python -m http.server 58583 --bind 127.0.0.1 --directory out\v2-full
```

查看 `http://127.0.0.1:58583/`。已生成音频与时间线保存在工程内，正常渲染不用联网生成配音；仅重做旁白时运行 `audio:v2`。该命令会将 [完整已批准口播](full-script.json) 发送到微软在线服务，需要此前说明的 Python 依赖。

整段配音一次合成；共享的 `scripts/voice_common.py` 从服务句级时间戳生成字幕并校验，`scripts/voice-full.py` 据此生成镜头时间线。过长/过短或文本不一致时明确报错，不静默截断或加速。新文案需要重新确认后生成，不能将旧时间戳直接套在新音频上。

## 第二版：女声与科技博主风格小样

第一版保持不变。新增 `BloggerXiaoxiao` 和 `BloggerXiaoyi` 两个独立合成，约 12 秒，使用相同文案比较在线神经女声。

已获准将这一段公开试听文案发送至微软在线语音服务；通过非官方 `edge-tts` 接入，无需 API 密钥，不代表真人配音，也不保证服务长期可用或正式商用许可。用户试听后已选择晓伊用于上方的第二版完整版；两种小样继续保留。

```powershell
Set-Location video
python -m pip install -r scripts\requirements-voice.txt
python scripts\voice-sample.py
npx remotion render BloggerXiaoxiao out\v2\xiaoxiao.mp4
npx remotion render BloggerXiaoyi out\v2\xiaoyi.mp4
Copy-Item public\audio\v2\xiaoxiao.mp3 out\v2\xiaoxiao.mp3
Copy-Item public\audio\v2\xiaoyi.mp3 out\v2\xiaoyi.mp3
Copy-Item sample-preview.html out\v2\index.html
npx remotion still BloggerXiaoxiao out\v2\poster.png --frame=270
python -m http.server 58582 --bind 127.0.0.1 --directory out\v2
```

浏览器访问 `http://127.0.0.1:58582/`。页面提供无配乐原声与配乐视频，播放一个时自动暂停其他媒体。时长由真实音频决定，字幕使用服务返回的句级时间戳，修正标点处短暂重叠，不进行加速或音高调整。

B 站工具类搜索及具体视频页已访问，但视频播放返回网络错误 6004，未完成逐帧风格参考分析。小样是原创的科技工具分享方向，不冒充复现任何博主作品；未下载使用 B 站音频或画面。

## 第一版完整视频

独立 Remotion 工程，不改变 VuePress 主站构建与发布流程。

- 45 秒，1920×1080，30 fps，H.264 MP4。
- 六镜头：信息过载 → 品牌 → 热点追踪 → 博客解读 → 阅读沉淀 → 北极星。
- 中文旁白、烧录字幕、独立 SRT、原创合成配乐。
- [完整脚本](SCRIPT.md)，[可编辑时间线](script.json)。

## 使用

推荐 Node.js 22.13+ 和 npm。这个子工程使用自己的 `package-lock.json`；主站继续使用 pnpm。

```powershell
Set-Location video
npm ci
npm run dev
npm run render:preview
npm run render
npm run still
```

产物位于 `out`：`fengskb-intro.mp4` 为全高清版，`fengskb-preview.mp4` 为半分辨率样片，`cover.png` 为封面，`fengskb-zh.srt` 为字幕。`out` 不进入 Git，但会保留在本地。

首次渲染时 Remotion 会准备浏览器。也可以显式指定已安装的 Chrome：

```powershell
npm run render -- --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

字体使用 Windows 已安装的 Microsoft YaHei、Georgia、SimSun；没有重新分发字体文件。其他平台需要安装合适字体并检查排版。

## 配音、音乐与字幕

```powershell
npm run audio
```

该命令需要 Windows PowerShell、System.Speech 和已安装的 `zh-CN` 语音。本版使用 Microsoft Huihui Desktop，属于**本地机器配音样片**，不是录音演员或高自然度在线配音。

每句单独合成，读取真实 WAV 时长，再对齐字幕；镜头时长固定，脚本不能容纳时明确报错，不截断旁白。生成文件包括：

- `public/audio/voice.wav`：45 秒独立旁白。
- `public/audio/music.wav`：45 秒、90 BPM、无歌词的简单原创合成伴奏。
- `public/audio/clips.json`：逐句实测时间和语速。
- `src/generated/captions.json`：Remotion Caption 格式。
- `out/fengskb-zh.srt`：可导入剪辑工具的字幕。

音乐由 `scripts/audio.mjs` 确定性合成，不使用第三方录音、采样包或商业歌曲。旁白播放时配乐平滑压低，结尾淡出。没有调用付费 API，没有将项目内容上传到语音服务。

更换真人或在线配音时，必须重新对齐字幕和镜头，不能只替换 WAV 而保留旧时间。正式商用前应确认所使用语音引擎及 Remotion 的适用许可。

## 更新真实页面截图

截图已保存在 `public/images`，渲染不依赖在线网站。页面内容按项目现状展示，不代表本视频已核验其中新闻事实。

先在仓库根目录启动本地站点：

```powershell
pnpm exec vuepress-vite dev docs --host 127.0.0.1 --port 58580
```

另一个终端运行：

```powershell
Set-Location video
node scripts\capture.mjs
```

截图工具使用系统 Chrome，禁用评论服务请求，等待首页进场动画完成后捕获桌面页面。阅读页依赖其原有 Docsify CDN；失败会明确报错。可通过 `SITE_URL` 指向其他本地地址。

品牌 SVG 来自本仓库；书籍展示为自制文字卡片，不使用外部书封。真实页面截图中的原有封面和文章仍沿用其原有权利归属。

## 检查

```powershell
npm run lint
npm test
```

检查类型、代码规范、1350 帧时间线、逐句字幕对应关系、音轨格式/长度/峰值、截图尺寸。导出后还需用 FFprobe 检查实际视频规格，并播放确认最终声音效果。

Remotion 本身有单独许可要求，参见 https://www.remotion.dev/license 。

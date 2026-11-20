# fengsKB

个人 AI 科技博客。追踪 AI 前沿动态，写长文，也写听歌的感想。

- 站点：<https://ai.upcloudtech.cn>
- 仓库：<https://github.com/shenliliaff/shenliliaff.github.io>
- 技术栈：VuePress 2 + vuepress-theme-hope，GitHub Pages 托管，内容由自动化任务每日产出

---

## 站点组成

| 模块 | 路径 | 说明 |
|---|---|---|
| AI 科技博客 | `/blog/` | 主体。每日 AI 动态长文，按「月 → 周」两级折叠 |
| AI 热点 | `/hot/` | 已回溯官方一手信源的事件榜单，带搜索与分页 |
| 听点东西 | `/music/` | 音乐推荐与听后感，每页一首歌 |
| 笔记 | `/notes/` | AI 动态追踪等技术笔记 |
| 读书笔记 | `/reading/` | 独立的 docsify 子站，支持 mermaid |

首页不堆内容，只做入口。

---

## 架构

```mermaid
%%{init: {"theme":"base","themeVariables":{"lineColor":"#a7b0bd","edgeLabelBackground":"#ffffff","fontSize":"13px"}}}%%
flowchart TB
  B["访客浏览器"]

  subgraph pages["GitHub Pages · 静态"]
    P["VuePress 站点<br/>ai.upcloudtech.cn"]
  end

  subgraph vc["Vercel · 动态"]
    W["Waline 后端<br/>评论读写"]
    A["auth 中转<br/>登录"]
  end

  subgraph sb["Supabase · 数据"]
    D["评论数据<br/>PostgreSQL"]
    S["评论图片<br/>Storage"]
  end

  G["GitHub OAuth"]

  B -->|"页面"| P
  B -->|"评论"| W
  B -->|"贴图"| S
  B -->|"登录"| A
  A -->|"OAuth"| G
  W -->|"读写"| D
  W -->|"校验登录态"| A

  classDef page fill:#eef6ec,stroke:#3b6d11,stroke-width:1px,color:#173404
  classDef svc fill:#e8f1fb,stroke:#185fa5,stroke-width:1px,color:#042c53
  classDef store fill:#fdf3e3,stroke:#854f0b,stroke-width:1px,color:#412402
  classDef ext fill:#f6f8fa,stroke:#d0d7de,stroke-width:1px,color:#1f2328

  class P page
  class W,A svc
  class D,S store
  class B,G ext
```

三条链路各自独立：

| 链路 | 谁在跑 | 出问题时的表现 |
|---|---|---|
| 页面 | GitHub Pages，纯静态 | 整站打不开 |
| 评论 | Vercel + Supabase | 页面正常，评论区转圈或报错 |
| 音乐 | 腾讯 / Audius 的 iframe | 播放器空白，正文不受影响 |

**为什么评论要外挂**：博客是纯静态的，没有服务端，而读者需要匿名留言、贴图、作者能管理。GitHub Pages 给不了这些。

**为什么是两个 Vercel 项目**：Waline 默认走公共中转 `oauth.lithub.cc`，它固定返回 5 个社交按钮且无法裁剪。自建 `walinejs/auth` 后，登录页只显示你配了凭证的平台——现在只有 GitHub。

---

## 评论系统

### 访客能做什么

- **匿名留言**：填昵称即可，邮箱和网址选填（填邮箱才会在被回复时收到通知）
- **GitHub 登录**：登录后带头像，并且可以删除自己的评论
- **贴图**：点图片按钮，浏览器先把图压成 WebP 再上传，正文里只留一个链接
- **表情**：五套（推特 / B博 / ALUS / 微博 / 贴吧），全部本地托管

### 四个非默认配置

**1. 评论组件被替换了。** `theme-hope` 会把评论配置 JSON.stringify 后注入客户端常量，函数会在序列化时丢失，所以 `imageUploader` 无法从 `theme.ts` 传进去。解法是在 `config.ts` 里用别名把插件内部的组件入口指向 `components/WalineCommentService.ts`：

```ts
alias: {
  "@vuepress/plugin-comment/service": path.resolve(__dirname, "components/WalineCommentService.ts"),
}
```

> 判断别名是否失效：构建产物里出现 `WALINE_LOCALES` 就说明默认组件回来了。升级 theme-hope 大版本后要回归测一次上传。

**2. 评论图片进 Supabase Storage。** 默认行为是把图片转 Base64 塞进正文，一张图吃掉几千字额度。改造后：

- bucket `comment-images`（Public），单文件上限 2 MB
- RLS 只开 insert，匿名只能新增，不能遍历/覆盖/删除
- 前端压缩：长边 1280 → 优先 AVIF，不支持则 WEBP → 目标 ≤150 KB → 超标降到 900px
- 实测：Chrome 的 `canvas.toBlob("image/avif")` 不受支持会静默回落 PNG（反而更大），代码里校验了返回的 MIME

**3. 表情本地托管。** Waline 默认从 unpkg 拉 GIF，国内常超时，表现为表情面板能开、图全裂。五套表情包已放进 `docs/.vuepress/public/vendor/emojis/`，主站和读书笔记站两处都指向本地。

**4. 头像不走 Waline 默认逻辑。**

Waline 的 Vercel 版有个坑：`@waline/vercel/src/service/avatar.js` 里写死了一段模板，头像是**按邮箱和昵称现算**的，从头到尾不读 `wl_users.avatar`。所以：

- 用 GitHub 登录、数据库里头像也对，前台照样显示邮箱算出来的图
- 只要邮箱是 `数字@qq.com`，就永远命中 `https://q1.qlogo.cn/g?b=qq&nk=<QQ号>` 那条分支
- 改数据库、重新登录、清缓存，全都没用——它根本不看那个字段

解法是覆盖环境变量 `GRAVATAR_STR`（Vercel 项目 `waline-blog`），用 GitHub 的**动态头像端点**，而不是写死某张图：

```nunjucks
{%- set numExp = r/^[0-9]+$/g -%}
{%- set qqMailExp = r/^[0-9]+@qq.com$/ig -%}
{%- if mail == '1304610940@qq.com' -%}
https://github.com/shenliliaff.png?size=200
{%- elif numExp.test(nick) -%}
https://q1.qlogo.cn/g?b=qq&nk={{nick}}&s=100
{%- elif qqMailExp.test(mail) -%}
https://q1.qlogo.cn/g?b=qq&nk={{mail|replace('@qq.com', '')}}&s=100
{%- else -%}
https://seccdn.libravatar.org/avatar/{{mail|trim|lower|md5}}
{%- endif -%}
```

关键在 `github.com/<用户名>.png?size=200` 这个地址：它 302 跳转到当前的 `avatars.githubusercontent.com/u/<id>?...`，重定向响应是 `Cache-Control: no-cache`，图片本身只缓存 5 分钟。**以后在 GitHub 换头像，这里最多 5 分钟就跟着变，不需要再改任何配置。**

> 改环境变量后必须 Redeploy 才生效。验证：
> `curl -s "https://waline.upcloudtech.cn/api/comment?path=<页面路径>" | grep -o '"avatar":"[^"]*"'`

### 管理员

- 后台：<https://waline.upcloudtech.cn/ui/>
- 用**邮箱 + 密码**登录，不要用 GitHub（社交登录是 guest 身份）
- 第一个注册的邮箱账号自动成为管理员（`wl_users.type = 'administrator'`）

### 能力边界

| 能力 | 状态 |
|---|---|
| 匿名评论 | ✅ |
| GitHub 登录 | ✅（国内需能访问 github.com）|
| 微信 / 知乎登录 | ❌ Waline 不提供，与主体资质无关 |
| 点赞一人一次 | ❌ 前端计数，与匿名机制矛盾 |
| 邮件通知 | ❌ 未配 SMTP |

---

## 音乐推荐

`/music/` 是独立的一块：不追新歌、不做榜单，每篇只放一首歌，写一点当时的感受。右下角挂一条 66px 的播放器，点「登录」可扫码，登录后按钮自动隐藏。

### 播放器选型

| 方案 | 结论 |
|---|---|
| **QQ 音乐官方外链播放器** | ✅ 采用。`i.y.qq.com/n2/m/outchain/player`，66px，带封面/歌名/进度条；配一个小窗登录入口 |
| 页面内嵌完整歌曲页 | ❌ 扫码显示成功，刷新后又变未登录——第三方 cookie 被拦 |
| 自建 `<audio>` 播放器 | ❌ 会员曲目匿名拿不到直链（`purl` 为空、`result: 104003`），没有音频文件就无从播起 |
| B 站 iframe | ❌ 能播但有画面，且需要登录才能看 |
| Audius（去中心化音乐）| ⚠️ 保留给英文独立音乐，华语歌几乎没有 |

**一个必须知道的事实**：这个官方插件在第三方网站上**只做展示**。实测点击播放键后，6 秒内音频请求 0 个、vkey 接口调用 0 次、进度条停在 `00:00`。腾讯对授权播放按来源判断，非微信生态的站点拿不到音频流。所以它看起来能点、数字会动，但不出声。

真正听完整版要点进去，用自己在 QQ 音乐的账号。

### 登录按钮的行为

- 点「登录」→ 480×720 居中弹窗，在里面扫码登录 QQ 音乐
- 关掉弹窗 → 播放器自动重建，**登录按钮隐藏**，提示变成「已登录 · 点播放」
- 标记存在 `localStorage`（`qqmusic-logged`），下次访问不再显示按钮
- 右侧留一个极轻的「重新登录」文字链接，防止误隐藏后卡死

> 这个“已登录”是本地标记，不是读到了 QQ 音乐的登录态——跨域读不到 iframe 的 DOM，也读不到 `y.qq.com` 的 cookie。只能以「用户点过登录并关了窗」为准。

### 怎么加一首歌

子页面里写一行：

```md
<QQMusicBar songid="231594573" label="出现又离开 · 梁博" />
```

`songid` 是**数字 ID**，不是 `004DiVWg09UKQx` 那种 mid。取法：QQ 音乐网页版打开歌曲 → 分享 → 复制链接，链接里带 `songid=`。

### 已知限制

- **拖动进度条、倍速、单曲循环都做不了**：这三个是原生 `<audio>` 的能力，第三方 iframe 里的控件碰不到。要这些功能只能去 QQ 音乐 App
- **读不到用户名**：跨域拿不到 iframe 的 DOM，QQ 音乐也没有对第三方开放「查当前用户」的接口
- **会员是访客自己的**：站点不代持账号、不转发 cookie、不共用会员
- **小窗可能被拦截**：浏览器拦截弹窗时提示「请允许弹出窗口后重试」

### 页面结构

| 文件 | 作用 |
|---|---|
| `docs/music/README.md` | 列表页，一篇文章一行 |
| `docs/music/*.md` | 子页面：播放入口 + 听后感正文 |
| `components/QQMusicBar.vue` | 右下角悬浮播放器（官方插件 + 登录小窗）|
| `components/SongPlayer.vue` | Audius 单曲播放器（英文独立音乐备用）|

---

## 本地开发

```bash
pnpm install
pnpm docs:dev      # http://localhost:8080
pnpm docs:build
```

推送到 `main` 后，GitHub Actions 会构建并发布到 `gh-pages` 分支。

> 不要用 `docs:clean-dev`：它会跳过 `prepare-reading` 预脚本，破坏 `/reading/` 与搜索。
> 构建前必须跑 `scripts/prepare-reading.mjs` 和 `scripts/prepare-blog.mjs`，`/blog/` 列表与侧边栏都依赖后者生成的清单。

## 目录结构

```
docs/
├── .vuepress/
│   ├── config.ts            # 站点配置 + 评论组件别名
│   ├── theme.ts             # 主题、评论、搜索
│   ├── navbar.ts / sidebar.ts
│   ├── components/          # HotRanking / BlogPostList / QQMusicBar / SongPlayer …
│   ├── data/                # blog-posts.ts（生成物）、hot-ranking.ts
│   └── public/vendor/       # 本地托管的 mermaid / waline / 表情包
├── blog/                    # 每日 AI 动态文章
├── music/                   # 听点东西
├── hot/                     # AI 热点榜单
├── notes/                   # 技术笔记
└── reading/                 # docsify 独立子站
scripts/                     # prepare-* 预脚本、验证脚本
video/                       # 独立 Remotion 视频工程
```

## 文档索引

| 文档 | 内容 |
|---|---|
| `docs/comment-images.md` | 评论图床的部署细节 |
| `docs/music/README.md` | 音乐页说明 |
| `docs/notes/AI 动态追踪.md` | 追踪的机构与信源清单 |

---

## 产品介绍视频

发布于 [GitHub Releases：fengsKB 产品介绍视频 V2（晓伊配音）](https://github.com/shenliliaff/shenliliaff.github.io/releases/tag/product-video-v2)，可[直接下载 1080p MP4](https://github.com/shenliliaff/shenliliaff.github.io/releases/download/product-video-v2/fengskb-v2.mp4)。视频约 45 秒，含中文合成旁白与字幕。

独立的 [Remotion 视频工程](video/README.md) 还提供[口播脚本](video/SCRIPT.md)、配音、字幕和原创合成配乐，不影响主站构建与发布。

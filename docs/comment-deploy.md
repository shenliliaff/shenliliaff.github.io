# 评论系统部署指南（Waline）

本站评论用 **Waline** 实现，支持**匿名评论** + **微信 / 知乎 / 微博 / GitHub 登录**。

Waline 分前后端两部分：
- **前端**：已在代码里配好（`docs/.vuepress/theme.ts` 的 `comment` 插件 + `docs/reading/index.html` 的 docsify 注入）。
- **后端**：一个独立部署的 Waline 服务，负责存评论数据 + 处理 OAuth 登录。本指南就是教你把后端搭起来。

---

## 一、整体架构

```
访客浏览器 ──评论/登录──> Waline 后端(Vercel) ──读写──> LeanCloud 数据库(存评论)
                                                    └──OAuth──> 微信/知乎/微博/GitHub
```

前端只需填一个 `serverURL`（你的 Waline 后端地址），登录按钮由后端按配置返回。

---

## 二、第 1 步：创建 LeanCloud 数据库（免费）

1. 打开 <https://console.leancloud.cn/>，注册 / 登录（国内版即可）。
2. 点「创建应用」，名字随意，比如 `fengskb-comment`，开发版（免费）即可。
3. 进应用 →「设置」→「应用凭证」，记下三个值：
   - **AppID**
   - **AppKey**
   - **MasterKey**
4. 进应用 →「数据存储」→「结构化数据」，新建三个 **Class**（表），名字和字段**必须**照抄（区分大小写）：

| Class 名 | 说明 |
| --- | --- |
| `Comment` | 评论本体 |
| `Counter` | 访问量 / 评论计数 |
| `Users` | 登录用户 |

> 如果你导入过官方模板可以跳过，但手建更稳。字段不用手动加，Waline 第一次运行时会自动建字段，只需确保这三个 Class 存在。

---

## 三、第 2 步：部署 Waline 后端到 Vercel（免费）

### 方式 A：一键部署（推荐）

1. 打开 Waline 官方部署模板：
   <https://vercel.com/new/clone?repository-url=https://github.com/walinejs/waline&env=LEAN_ID,LEAN_KEY,LEAN_MASTER_KEY,JWT_TOKEN,SITE_NAME,SITE_URL>
2. 按提示登录 Vercel（用 GitHub 账号即可），填写环境变量：

| 环境变量 | 值 |
| --- | --- |
| `LEAN_ID` | 第 1 步记下的 AppID |
| `LEAN_KEY` | 第 1 步记下的 AppKey |
| `LEAN_MASTER_KEY` | 第 1 步记下的 MasterKey |
| `JWT_TOKEN` | 自己编一段长随机字符串（用来签发登录态，别泄露） |
| `SITE_NAME` | 站点名，如 `fengsKB` |
| `SITE_URL` | 你的站点地址 `https://shenliliaff.github.io` |

3. 点 Deploy，等 1~2 分钟部署完成。
4. 部署完成后，Vercel 会给你一个地址，形如 `https://xxx.vercel.app`。
   - **这就是你的 `serverURL`**。
   - 测试后端是否正常：浏览器打开 `https://xxx.vercel.app/api/comment?type=list&path=/test`，能返回 JSON（哪怕是空列表 `{}`）就说明后端活了。

### 方式 B：本地 Docker 部署

```bash
docker run -d --name waline \
  -p 8360:8360 \
  -e LEAN_ID=你的AppID \
  -e LEAN_KEY=你的AppKey \
  -e LEAN_MASTER_KEY=你的MasterKey \
  -e JWT_TOKEN=你自己编的长随机串 \
  -e SITE_NAME=fengsKB \
  -e SITE_URL=https://shenliliaff.github.io \
  lizheming/waline
```

本地 `http://localhost:8360` 即 serverURL。适合先用 Docker 测试、再上 Vercel。

---

## 四、第 3 步：把 serverURL 填进代码

部署好后，改两处（把占位的 `https://your-waline-server.vercel.app` 换成你的真实地址）：

1. `docs/.vuepress/theme.ts` → `comment.serverURL`
2. `docs/reading/index.html` → 两处 `serverURL: "https://your-waline-server.vercel.app"`

然后重新构建推送即可。

---

## 五、第 4 步：配置社交登录（微信 / 知乎 / 微博）

匿名评论**开箱即用**，不需要任何配置。社交登录需要在对应开放平台申请 AppID，再填进 LeanCloud 的设置里。

> ⚠️ 注意：知乎、微博的开放平台近年对个人开发者收紧，微信开放平台需要**企业主体**。GitHub 登录最容易（个人即可申请）。建议**先上匿名 + GitHub**，社交登录逐个补。

### GitHub 登录（最容易，先做）

1. 打开 <https://github.com/settings/developers> →「OAuth Apps」→「New OAuth App」。
2. 填写：
   - **Homepage URL**：`https://shenliliaff.github.io`
   - **Authorization callback URL**：`https://你的serverURL/oauth/redirect?type=github`（注意用你的 Vercel 地址）
3. 创建后拿到 `Client ID` 和 `Client Secret`。
4. 打开 LeanCloud 应用 →「设置」→「安全中心」→「Web 安全域名」，把 `https://你的serverURL` 加进去。
5. 在 Waline 后端的环境变量里加：

| 环境变量 | 值 |
| --- | --- |
| `GITHUB_CLIENT_ID` | 你的 Client ID |
| `GITHUB_CLIENT_SECRET` | 你的 Client Secret |

### 微信登录（需企业主体）

1. 微信开放平台 <https://open.weixin.qq.com/> 注册（企业认证）→「创建网站应用」。
2. 回调域名填 `https://你的serverURL`。
3. 拿到 `AppID` / `AppSecret`，加到环境变量 `WECHAT_APP_ID` / `WECHAT_APP_SECRET`。

### 知乎 / 微博登录

- 知乎：<https://open.zhihu.com/>（个人可申请，但审核慢）。
- 微博：<https://open.weibo.com/>（个人可申请「网页应用」）。
- 同理拿到对应 AppID/Secret 后填入环境变量（字段名见 Waline 官方文档：<https://waline.js.org/guide/server/config.html>）。

> 每改一次 Vercel 环境变量，需在 Vercel 项目 → Settings → Environment Variables 里添加，然后 Redeploy 才生效。

---

## 六、验证清单（上线前必须全过）

- [ ] 后端 `/api/comment?type=list` 能返回 JSON（非报错）
- [ ] 站点页脚出现「评论」区，能**匿名**提交一条评论
- [ ] 提交后评论即时显示，刷新仍在（说明存进了 LeanCloud）
- [ ] 登录按钮出现，GitHub 登录跳转、回调后显示头像昵称
- [ ] 明暗主题切换，评论区颜色跟随
- [ ] `hot/`、`blog/` 文章、`notes/AI 动态追踪`、`reading/` 读书笔记都有评论区
- [ ] 手机端评论区不溢出、可正常输入

---

## 七、常见问题

| 现象 | 原因 / 解决 |
| --- | --- |
| 页面没有评论区 | serverURL 还是占位符，或前端没重新构建推送 |
| 评论区一直转圈 | 后端没部署成功，检查 `/api/comment` 是否返回 JSON |
| 提交评论报错 | LeanCloud 三个 Class 没建，或 AppKey/MasterKey 填错 |
| 登录按钮点开是空的 | 对应社交登录的环境变量没配 |
| 评论存上了但看不到 | `JWT_TOKEN` 泄露 / 被改，或 LeanCloud 权限没放开 |

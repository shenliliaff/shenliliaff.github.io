# 评论系统部署文档（Waline 双项目架构）

本站由 **GitHub Pages（博客）+ 两个 Vercel 项目（评论后端 / 登录中转）+ Supabase 数据库** 组成。
本文档记录当前线上配置与完整部署步骤，含踩坑说明，供运维与故障排查使用。

## 零、当前线上地址

| 用途 | 地址 | 托管 |
|---|---|---|
| 博客 | `https://ai.upcloudtech.cn` | GitHub Pages（自定义域名）|
| 评论后端 | `https://waline.upcloudtech.cn` | Vercel 项目 `waline-blog` |
| 登录中转 | `https://auth.upcloudtech.cn` | Vercel 项目 `auth` |
| 评论数据库 | Supabase PostgreSQL（大阪 ap-northeast-2）| Supabase 免费版 |
| 管理员后台 | `https://waline.upcloudtech.cn/ui/` | — |

> `upcloudtech.cn` 需持续续费：域名一旦过期，评论与 GitHub 登录会**同时失效**。

## 一、架构总览

```
访客浏览器
  │ 匿名评论 / GitHub 登录
  ▼
[项目 1] Waline 后端 (waline-blog)
  域名: waline.upcloudtech.cn
  ├─ 读写评论数据 ──> Supabase PostgreSQL
  └─ 登录跳转 ──> [项目 2] auth 中转
                    域名: auth.upcloudtech.cn
                    └─ GitHub OAuth ──> github.com
```

| 项目 | 仓库 | 作用 |
|---|---|---|
| `waline-blog` | walinejs/waline（example 模板）| 评论主后端：存取评论、评论管理 |
| `auth` | walinejs/auth 的 fork | 登录中转：只代理 GitHub 授权，**决定登录页显示哪些社交按钮** |

**为什么要两个项目**：Waline 默认走公共中转 `oauth.lithub.cc`，它会返回固定的 5 个社交按钮
（GitHub / 微博 / Twitter / Facebook / QQ），无法裁剪。自建 auth 后，中转按「配了哪些平台的
环境变量」动态返回服务列表——只配 GitHub 就只显示 GitHub。

---

## 二、DNS（阿里云云解析，upcloudtech.cn）

| 主机记录 | 记录类型 | 记录值 | 用途 |
|---|---|---|---|
| `ai` | CNAME | `shenliliaff.github.io` | 博客（GitHub Pages）|
| `waline` | CNAME | `cname.vercel-dns.com` | 评论后端 |
| `auth` | CNAME | `cname.vercel-dns.com` | 登录中转 |
| `_github-pages-challenge-shenliliaff.ai` | TXT | GitHub 提供的验证串 | 域名归属验证（首次绑定 Pages 时用）|

说明：

- 主机记录只填前缀，不要带 `.upcloudtech.cn`
- Vercel 面板的黄色「DNS Change Recommended」可忽略：它推荐的新专属 CNAME 值可能尚未上线
  （实测解析为 Non-existent domain），旧值 `cname.vercel-dns.com` 官方承诺继续生效
- **博客必须有 `docs/.vuepress/public/CNAME` 文件**（内容 `ai.upcloudtech.cn`），否则自定义域名
  会返回 404「There isn't a GitHub Pages site here」

---

## 三、数据库（Supabase）

> LeanCloud 国内版已停止新用户注册，改用 Supabase（免费 PostgreSQL，GitHub 账号登录即可）。

### 连接要点（关键坑）

- Vercel 函数**只支持 IPv4 出站**，必须用 Supabase 的 **Transaction pooler** 地址；
  **不能用**直连地址 `db.<ref>.supabase.co`（仅 IPv6，会 ENOTFOUND）
- Pooler 端口 `6543`，用户名格式 `postgres.<项目标识符>`

### 建表 SQL

三个坑：`like` 和 `2fa` 是保留字/非法列名要加双引号；**表名、字段名必须全小写**（Waline 用小写查询）；
`wl_comment` 必须有 `url`、`status` 列。

```sql
CREATE TABLE IF NOT EXISTS wl_comment (
  id BIGSERIAL PRIMARY KEY, user_id INTEGER, comment TEXT,
  insertedat TIMESTAMP DEFAULT NOW(), ip VARCHAR(100) DEFAULT '',
  link VARCHAR(255) DEFAULT '', mail VARCHAR(255) DEFAULT '',
  nick VARCHAR(255) DEFAULT '', pid INTEGER, rid INTEGER,
  sticky BOOLEAN DEFAULT FALSE, "like" INTEGER DEFAULT 0, ua VARCHAR(255),
  url VARCHAR(1024) DEFAULT '', status VARCHAR(10) DEFAULT 'approved'
);

CREATE TABLE IF NOT EXISTS wl_counter (
  id BIGSERIAL PRIMARY KEY, url VARCHAR(1024) DEFAULT '', time INTEGER DEFAULT 0,
  reaction0 INTEGER DEFAULT 0, reaction1 INTEGER DEFAULT 0,
  reaction2 INTEGER DEFAULT 0, reaction3 INTEGER DEFAULT 0,
  reaction4 INTEGER DEFAULT 0, reaction5 INTEGER DEFAULT 0,
  reaction6 INTEGER DEFAULT 0, reaction7 INTEGER DEFAULT 0,
  reaction8 INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS wl_users (
  id BIGSERIAL PRIMARY KEY, display_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, label VARCHAR(50) DEFAULT '',
  url VARCHAR(255) DEFAULT '', avatar VARCHAR(255) DEFAULT '',
  github VARCHAR(255) DEFAULT '', twitter VARCHAR(255) DEFAULT '',
  facebook VARCHAR(255) DEFAULT '', google VARCHAR(255) DEFAULT '',
  weibo VARCHAR(255) DEFAULT '', qq VARCHAR(255) DEFAULT '',
  "2fa" VARCHAR(255) DEFAULT '', createdat TIMESTAMP DEFAULT NOW(),
  updatedat TIMESTAMP DEFAULT NOW()
);
```

---

## 四、项目 1：Waline 后端（waline-blog）

**部署**：Vercel → Import `walinejs/waline` 的 example 模板（官方一键部署链接见 Waline 文档）。

**环境变量**（数据库用 `PG_*`，不是 `POSTGRES_*`——后者不被识别，报 `No valid storage found`）：

| 变量名 | 值 |
|---|---|
| `PG_HOST` | `aws-0-ap-northeast-2.pooler.supabase.com` |
| `PG_PORT` | `6543` |
| `PG_DB` | `postgres` |
| `PG_USER` | `postgres.<项目标识符>` |
| `PG_PASSWORD` | Supabase 数据库密码 |
| `SITE_NAME` | `fengsKB` |
| `SITE_URL` | `https://ai.upcloudtech.cn` |
| `OAUTH_URL` | `https://auth.upcloudtech.cn`（指向自建中转，见第六节）|

> 改任何环境变量后必须 **Redeploy** 才生效。

**域名**：`waline.upcloudtech.cn`（阿里云 CNAME → `cname.vercel-dns.com`，再到 Vercel 项目 Domains 添加）

---

## 五、管理员注册（重要）

1. 访问 `https://waline.upcloudtech.cn/ui/register` 注册
2. **第一个用「邮箱 + 密码」注册的账号自动成为管理员**
3. 登录 `https://waline.upcloudtech.cn/ui/` 后可见「评论管理」「用户管理」等菜单

**判定规则与常见坑**：

- 管理员身份存在 `wl_users.type` 字段（值为 `administrator`），可查可改：
  ```sql
  SELECT id, display_name, email, type FROM wl_users ORDER BY id;
  UPDATE wl_users SET type = 'administrator' WHERE email = '<邮箱>';
  ```
- **GitHub 社交登录 ≠ 管理员**：社交登录创建的是独立 guest 身份，除非把该身份的 `wl_users` 行改成 administrator
- 浏览器里残留旧 token 时，会出现「明明是管理员却被跳到个人资料页」——先退出登录
  （或 F12 → Application → Local Storage 清空 `https://waline.upcloudtech.cn`）再用邮箱密码登录
- 登录用户可删除**自己**的评论；匿名评论只能由管理员删除

---

## 六、项目 2：auth 中转（只保留 GitHub 登录按钮）

**部署步骤**：

1. GitHub 上 Fork `walinejs/auth`（注意是 auth 仓库，**不是 waline**）
2. Vercel → Add New → Project → Import 这个 fork
   - 列表里看不到：GitHub → Settings → Applications → Vercel → 调整仓库授权范围
   - Framework Preset 选 **Other**
3. 环境变量只配两个：
   - `GITHUB_ID` = GitHub OAuth Client ID
   - `GITHUB_SECRET` = GitHub OAuth Client Secret
4. Deploy
5. 域名：阿里云加 `auth` CNAME → Vercel auth 项目 Domains 添加 `auth.upcloudtech.cn`

**GitHub OAuth App 配置**（GitHub → Settings → Developer settings → OAuth Apps）：

| 字段 | 值 |
|---|---|
| Homepage URL | `https://ai.upcloudtech.cn` |
| Authorization callback URL | `https://auth.upcloudtech.cn/github` |

**关键：域名必须绑在 auth 项目上**。若 `auth.upcloudtech.cn` 打开是 Waline 管理后台（fengsKB 标志 +
5 个图标），说明域名绑错到 waline-blog 了——去 waline-blog 的 Domains 移除，再到 auth 项目添加。

**让 Waline 使用自建中转**：waline-blog 加环境变量 `OAUTH_URL = https://auth.upcloudtech.cn` → Redeploy。

**验证**：

| 地址 | 应该看到 |
|---|---|
| `https://auth.upcloudtech.cn/` | JSON，`services` 数组**只有 github** |
| `https://waline.upcloudtech.cn/ui/login`（Ctrl+F5） | 社交图标只剩 GitHub |
| 评论区点 GitHub 登录 | 跳 GitHub 授权 → 回到评论框带头像 |

---

## 七、能力边界与已知限制

| 项目 | 结论 |
|---|---|
| 匿名评论 | ✅ 填昵称即可，无需账号 |
| GitHub 登录 | ✅ 已上线，但**国内直连 github.com 会超时**，访客需能访问 GitHub 才可用（见下）|
| 微信登录 | ❌ Waline 不支持（社交列表无微信，与主体资质无关）|
| 微博 / QQ / Twitter / Facebook | 已隐藏（auth 未配凭证）；企业主体可后补 |
| 知乎登录 | ❌ 开放平台基本不开放申请 |
| 点赞一人一次 | ❌ Waline 点赞是纯前端计数，与匿名矛盾；保留原生（可多次点）|
| 用户自删评论 | 登录用户可删自己的；匿名用户删不了（无身份凭证）|

**GitHub 登录在国内的现实**：OAuth 授权必须让浏览器跳转 `github.com`，而国内直连常报
`ERR_CONNECTION_TIMED_OUT`。此时点「登录」是死路。若希望访客体验干净，可在 `theme.ts` 的
`comment` 配置里把 `login` 改成 `"disable"`，只保留匿名评论（访客不再看到登录按钮）。

---

## 八、故障排查速查

| 症状 | 原因 | 处理 |
|---|---|---|
| `No valid storage found` | 环境变量用了 `POSTGRES_*` 或缺失 | 改 `PG_*` 那套，Redeploy |
| `ENOTFOUND db.xxx.supabase.co` | 用了直连地址（仅 IPv6）| 改 pooler 地址 + 端口 6543 + 用户名 `postgres.<ref>` |
| `column "url" does not exist` | 建表 SQL 缺列 / 表名大小写不对 | 按第三节 SQL 重建（全小写）|
| `https://ai.upcloudtech.cn` 404 | 构建产物缺 `CNAME` 文件 | 确认 `docs/.vuepress/public/CNAME` 存在且内容为 `ai.upcloudtech.cn`，重新部署 |
| Pages 提示 Add a verified domain | 首次绑定自定义域名需验证归属 | 加 `_github-pages-challenge-shenliliaff.ai` TXT 记录，点 Verify |
| `/ui` 白屏或一闪而过 | `OAUTH_URL` 指向的 auth 不可达 | 检查 `auth.upcloudtech.cn` 解析与部署状态 |
| auth 域名 506 | auth 函数崩溃（导入错仓库、缺环境变量）| 确认部署的是 walinejs/auth（打开应是 JSON），补齐 env 后 Redeploy |
| 登录页出现 5 个社交图标 | `OAUTH_URL` 未配或仍指向公共中转 | 配 `OAUTH_URL = https://auth.upcloudtech.cn` 并 Redeploy |
| 域名打开的是错误服务 | 域名绑错 Vercel 项目 | 在两个项目的 Domains 里挪正 |
| GitHub 登录页打不开 | 国内网络无法访问 github.com | 走代理/合规出口，或改为只保留匿名评论 |
| 管理员进不去管理面板 | 浏览器残留普通用户 token | 退出登录 / 清 Local Storage 后用邮箱密码重登 |

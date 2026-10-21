# 评论系统部署指南（Waline 后端）

站点评论用 [Waline](https://waline.js.org)：**匿名评论（昵称+邮箱/网址选填）+ GitHub 登录**。
前端已配好（`docs/.vuepress/theme.ts` 的 `comment` 配置 + `docs/reading/index.html` 的注入脚本）。

本文档是**已完成的部署实录 + 后续扩展指引**，供运维参考和故障排查。

---

## 一、当前线上架构

```
访客浏览器 ──评论/登录──> Waline 后端 (Vercel, waline.vttjit.tech)
                            └──读写──> Supabase PostgreSQL（大阪 ap-northeast-2）
                            └──OAuth──> GitHub（GITHUB_ID/SECRET）
```

- **serverURL**：`https://waline.vttjit.tech`（自有域名，绕开 vercel.app 被墙问题）
- **数据库**：Supabase（Transaction pooler 连接）
- **登录**：匿名 + GitHub；微信/微博预留（见第五节）

---

## 二、数据库（Supabase）

> ⚠️ LeanCloud 国内版已停止新用户注册，改用 Supabase（免费 PostgreSQL，GitHub 登录）。

### 连接方式（关键坑）

Vercel 函数**只支持 IPv4 出站**，必须用 Supabase 的 **Transaction pooler** 地址，不能用直连地址：

| 项 | 值 |
|---|---|
| 直连 host（❌ 不要用）| `db.<ref>.supabase.co`（仅 IPv6，Vercel 连不上）|
| Pooler host（✅ 用这个）| `aws-0-<region>.pooler.supabase.com` |
| Pooler port | `6543` |
| Pooler user | `postgres.<ref>`（不是单纯的 `postgres`）|

### 建表 SQL（在 Supabase SQL Editor 执行）

注意三个坑：`like` 和 `2fa` 是保留字/非法列名要加双引号；**表名和字段名必须全小写**（Waline 后端用小写查询）；`wl_comment` 要有 `url` 和 `status` 列。

```sql
CREATE TABLE IF NOT EXISTS wl_comment (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER,
  comment TEXT,
  insertedat TIMESTAMP DEFAULT NOW(),
  ip VARCHAR(100) DEFAULT '',
  link VARCHAR(255) DEFAULT '',
  mail VARCHAR(255) DEFAULT '',
  nick VARCHAR(255) DEFAULT '',
  pid INTEGER,
  rid INTEGER,
  sticky BOOLEAN DEFAULT FALSE,
  "like" INTEGER DEFAULT 0,
  ua VARCHAR(255),
  url VARCHAR(1024) DEFAULT '',
  status VARCHAR(10) DEFAULT 'approved'
);

CREATE TABLE IF NOT EXISTS wl_counter (
  id BIGSERIAL PRIMARY KEY,
  url VARCHAR(1024) DEFAULT '',
  time INTEGER DEFAULT 0,
  reaction0 INTEGER DEFAULT 0,
  reaction1 INTEGER DEFAULT 0,
  reaction2 INTEGER DEFAULT 0,
  reaction3 INTEGER DEFAULT 0,
  reaction4 INTEGER DEFAULT 0,
  reaction5 INTEGER DEFAULT 0,
  reaction6 INTEGER DEFAULT 0,
  reaction7 INTEGER DEFAULT 0,
  reaction8 INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS wl_users (
  id BIGSERIAL PRIMARY KEY,
  display_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  label VARCHAR(50) DEFAULT '',
  url VARCHAR(255) DEFAULT '',
  avatar VARCHAR(255) DEFAULT '',
  github VARCHAR(255) DEFAULT '',
  twitter VARCHAR(255) DEFAULT '',
  facebook VARCHAR(255) DEFAULT '',
  google VARCHAR(255) DEFAULT '',
  weibo VARCHAR(255) DEFAULT '',
  qq VARCHAR(255) DEFAULT '',
  "2fa" VARCHAR(255) DEFAULT '',
  createdat TIMESTAMP DEFAULT NOW(),
  updatedat TIMESTAMP DEFAULT NOW()
);
```

---

## 三、后端环境变量（Vercel）

**数据库用 `PG_*` 变量名**（不是 `POSTGRES_*`，那是别的用途，会报 `No valid storage found`）：

| 变量名 | 值 |
|---|---|
| `PG_HOST` | `aws-0-ap-northeast-2.pooler.supabase.com` |
| `PG_PORT` | `6543` |
| `PG_DB` | `postgres` |
| `PG_USER` | `postgres.hpuaegzzooqsorqabeut` |
| `PG_PASSWORD` | Supabase 数据库密码 |
| `SITE_NAME` | `fengsKB` |
| `SITE_URL` | `https://vttjit.tech` |

> 改动任何环境变量后必须 **Redeploy** 才生效。

---

## 四、域名（vttjit.tech）

阿里云云解析三条 CNAME：

| 主机记录 | 记录值 | 用途 |
|---|---|---|
| `@` | `shenliliaff.github.io` | 博客主域 |
| `www` | `shenliliaff.github.io` | 博客 www |
| `waline` | `cname.vercel-dns.com` | 评论后端 |

> ⚠️ Vercel 新版会「建议」改成它的专属 CNAME 值（如 `20d9f26e2cf64802.vercel-dns-017c.com`），**那个值可能尚未上线（解析为 Non-existent domain）**。旧值 `cname.vercel-dns.com` Vercel 官方承诺继续生效，保持旧值即可。面板上的黄色「DNS Change Recommended」提示可忽略，不影响功能。

---

## 五、社交登录

### 登录按钮的真实机制（重要）

Waline 的登录按钮**不是**由后端环境变量直接决定，而是：

1. 后端启动时向 `OAUTH_URL`（默认 `https://oauth.lithub.cc`）请求一个「可用社交列表」
2. 官方中转返回的是**写死的 5 个**：github、weibo、twitter、facebook、qq
3. 前端登录弹窗按这个列表渲染按钮

所以「只配 GitHub、不配微博」并不能隐藏微博按钮——必须**自建 auth 中转**，让中转服务只返回 GitHub。

### 当前方案：自建 auth 中转，只保留 GitHub

目标是登录页只显示 GitHub 一个按钮（去掉微博/Twitter/Facebook/QQ）。

**第一步：部署 auth 服务**

1. 打开 https://github.com/walinejs/auth → **Fork** 到自己的账号
2. Vercel → Add New → Project → Import 这个 fork 的 `auth` 仓库
3. 环境变量只配两个：
   - `GITHUB_ID` = GitHub OAuth Client ID
   - `GITHUB_SECRET` = GitHub OAuth Client Secret
4. Deploy

**第二步：GitHub OAuth 回调地址**

GitHub → Settings → Developer settings → OAuth Apps → 你的应用 → Authorization callback URL 改为：
```
https://auth.vttjit.tech/github
```

**第三步：绑子域名**

1. 阿里云云解析加一条 CNAME：主机记录 `auth`、记录值 `cname.vercel-dns.com`
2. Vercel auth 项目 → Settings → Domains → 添加 `auth.vttjit.tech` → 等变绿

**第四步：让 Waline 用自建中转**

waline-blog 项目 → Settings → Environment Variables → 加：
| Key | Value |
|---|---|
| `OAUTH_URL` | `https://auth.vttjit.tech` |

然后 Redeploy。

**第五步：验证**

- 打开 `https://auth.vttjit.tech/` 应返回 JSON，`services` 里**只有 github**（auth 服务源码按「是否配了环境变量」动态过滤服务列表，只配 GITHUB 就只返回 github）
- 刷新 `https://waline.vttjit.tech/ui/login`，社交按钮只剩 GitHub

> ⚠️ 若 `/ui` 白屏或 auth 返回空，通常是 `auth` 子域名的 CNAME 解析没加/没生效，或 auth 项目未配 GITHUB_ID/SECRET、未部署成功。

### GitHub 登录（已启用）

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App：
   - Homepage URL：`https://vttjit.tech`
   - Authorization callback URL：`https://auth.vttjit.tech/github`（自建中转后改为此地址）
2. 拿到 Client ID + Client Secret，配到 auth 项目环境变量（`GITHUB_ID` / `GITHUB_SECRET`）

### 微信登录（不支持）

**Waline 的社交登录列表里没有微信**。官方支持 GitHub / Twitter / Facebook / Google / 微博 / QQ / OIDC / 华为，无论个人还是企业主体都无法通过 Waline 原生实现「微信登录」。如需微信登录需自研/换方案，本项目不做。

### 微博 / QQ / Twitter / Facebook（已隐藏）

自建 auth 中转后，只要 auth 项目**不配**这些平台的 `*_ID`/`*_SECRET`，登录页就不会显示对应按钮。当前只配了 GitHub，故这些按钮全部隐藏。若以后要加回某平台，在 auth 项目补配对应变量即可（微博回调页须精确填 `https://auth.vttjit.tech/weibo`）。

### 知乎登录（放弃）

知乎开放平台长期不开放新网站接入申请，基本拿不到，不做。

---

## 六、管理后台

- 访问 `https://waline.vttjit.tech/ui/register` 注册管理员（第一个注册的是管理员）
- 之后在 `https://waline.vttjit.tech/ui` 管理评论（删除垃圾、置顶等）

---

## 七、给访客的体验

- **匿名评论**：填昵称就能发（邮箱、网址选填），无需任何账号
- **GitHub 登录**：一键登录（登录用户可删除自己的评论）
- **点赞**：原生表情反应（可多次点，不做一人一次去重）

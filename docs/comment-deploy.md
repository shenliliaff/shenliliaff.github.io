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

### GitHub 登录（已启用）

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App：
   - Homepage URL：`https://vttjit.tech`
   - Authorization callback URL：`https://waline.vttjit.tech/oauth/github`
2. 拿到 Client ID + Client Secret，配 Vercel 环境变量：
   - `GITHUB_ID`
   - `GITHUB_SECRET`
3. Redeploy

> 登录按钮显隐由后端环境变量决定：配了哪个平台的 `*_ID`/`*_SECRET`，登录弹窗就显示哪个按钮；不配就不显示。

### 微信登录（预留，需企业主体 + AppID）

1. 微信开放平台（open.weixin.qq.com）用企业主体注册 → 创建「网站应用」（认证费 ¥300/年）
2. 拿到 AppID + AppSecret，配环境变量：
   - `WECHAT_APP_ID`
   - `WECHAT_APP_SECRET`
3. Redeploy

### 微博登录（预留，企业可申请）

- 微博开放平台「网站接入」→ 企业认证 → 申请网站应用
- 授权回调页必须精确填 `https://waline.vttjit.tech/oauth/weibo`（严格全等）
- 环境变量：`WEIBO_ID` / `WEIBO_SECRET`
- 注：当前已主动删除微博变量（隐藏微博按钮），需要时再加回

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

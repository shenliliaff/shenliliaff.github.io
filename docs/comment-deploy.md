# 评论系统部署文档（Waline 双项目架构 · 最终实录）

本站的评论系统由**两个 Vercel 项目 + 一个 Supabase 数据库 + 自有域名**组成。
本文档是完整的部署实录，包含全部踩坑记录，供运维参考与故障排查。

## 一、架构总览

```
访客浏览器
  │ 匿名评论 / GitHub 登录
  ▼
[项目 1] Waline 后端 (waline-blog)
  域名: waline.vttjit.tech
  ├─ 读写评论数据 ──> Supabase PostgreSQL (大阪)
  └─ 登录时跳转 ──> [项目 2] auth 中转
                      域名: auth.vttjit.tech
                      └─ GitHub OAuth ──> github.com
```

| 项目 | 仓库 | 作用 |
|---|---|---|
| `waline-blog` | walinejs/waline（example 模板）| 评论主后端：存取评论、评论管理 |
| `auth` | walinejs/auth 的 fork | 登录中转：只代理 GitHub 授权（**决定登录页显示哪些社交按钮**）|

**为什么要两个项目**：Waline 默认用公共中转 `oauth.lithub.cc`，它会返回固定的 5 个社交按钮（GitHub/微博/Twitter/Facebook/QQ），无法裁剪。自建 auth 中转后，中转按「配了哪些平台的环境变量」动态返回服务列表——只配 GitHub 就只显示 GitHub。

---

## 二、数据库（Supabase）

> LeanCloud 国内版已停止新用户注册，故用 Supabase（免费 PostgreSQL，GitHub 账号登录即可）。

### 连接要点（关键坑）

- Vercel 函数**只支持 IPv4 出站**，必须用 Supabase 的 **Transaction pooler** 地址，
  **不能用**直连地址 `db.<ref>.supabase.co`（仅 IPv6，会 ENOTFOUND）
- Pooler 端口 `6543`，用户名格式 `postgres.<项目标识符>`

### 建表 SQL

三个坑：`like` 和 `2fa` 是保留字/非法列名要加双引号；**表名、字段名必须全小写**（Waline 查询用小写）；`wl_comment` 必须有 `url`、`status` 列。

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

## 三、项目 1：Waline 后端（waline-blog）

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
| `SITE_URL` | `https://vttjit.tech` |
| `OAUTH_URL` | `https://auth.vttjit.tech`（指向自建 auth 中转，见第五节）|

> 改任何环境变量后必须 **Redeploy** 才生效。

**域名**：`waline.vttjit.tech`（阿里云 CNAME → `cname.vercel-dns.com`）

> Vercel 面板的黄色「DNS Change Recommended」可忽略——它推荐的新专属 CNAME 值可能尚未上线
> （实测 Non-existent domain），旧值 `cname.vercel-dns.com` 官方承诺继续生效。

---

## 四、管理员注册（重要）

1. 部署完成后访问 `https://waline.vttjit.tech/ui/register` 注册
2. **第一个用「邮箱 + 密码」注册的账号自动成为管理员**
3. 管理员登录 `https://waline.vttjit.tech/ui/` 后可见「评论管理」「用户管理」等菜单

**管理员判定规则与常见坑**：

- 管理员身份存在 `wl_users.type` 字段（`administrator`）。可用 SQL 查看/修正：
  ```sql
  SELECT id, display_name, email, type FROM wl_users ORDER BY id;
  UPDATE wl_users SET type = 'administrator' WHERE email = '<邮箱>';
  ```
- **GitHub 社交登录 ≠ 管理员**。社交登录创建的是独立身份（guest），除非把该身份对应的
  `wl_users` 行改成 administrator
- 浏览器里 GitHub 登录过的 token 会留在 Local Storage，切换账号时若出现「明明是管理员却
  跳到个人资料页」，先**退出登录**（或 F12 → Application → Local Storage 清空）再用邮箱密码登录
- 登录用户可删除**自己**的评论；匿名评论只能由管理员删除

---

## 五、项目 2：auth 中转（只保留 GitHub 登录按钮）

**目的**：登录页默认显示 5 个社交按钮（来自公共中转 oauth.lithub.cc 的固定列表，无法裁剪）。
自建 auth 后，中转按「配置了哪些平台的环境变量」动态返回服务列表——只配 GitHub 就只显示 GitHub。

**部署步骤**：

1. GitHub 上 Fork `walinejs/auth`（注意是 auth 仓库，**不是 waline**）
2. Vercel → Add New → Project → Import 这个 fork
   - 若列表里看不到：GitHub → Settings → Applications → Vercel → 调整仓库授权范围
   - Framework Preset 选 **Other**
3. 环境变量只配两个：
   - `GITHUB_ID` = GitHub OAuth Client ID
   - `GITHUB_SECRET` = GitHub OAuth Client Secret
4. Deploy

**GitHub OAuth App 配置**（GitHub → Settings → Developer settings → OAuth Apps）：

- Homepage URL：`https://vttjit.tech`
- Authorization callback URL：`https://auth.vttjit.tech/github`

**域名**：`auth.vttjit.tech`（阿里云 CNAME → `cname.vercel-dns.com`；Vercel auth 项目 → Domains 添加）

**关键：域名必须绑在 auth 项目上**。如果 `auth.vttjit.tech` 打开出现的是 Waline 管理后台
（fengsKB 标志 + 5 个图标），说明域名绑错到 waline-blog 了——去 waline-blog 的 Domains 里
移除，再到 auth 项目的 Domains 里添加。

**让 Waline 使用自建中转**：waline-blog 加环境变量 `OAUTH_URL = https://auth.vttjit.tech` → Redeploy。

**验证**：

| 地址 | 应该看到 |
|---|---|
| `https://auth.vttjit.tech/` | JSON，`services` 数组**只有 github** |
| `https://waline.vttjit.tech/ui/login`（Ctrl+F5） | 社交图标只剩 GitHub |
| 评论区点 GitHub 登录 | 跳 GitHub 授权 → 回到评论框带头像 |

---

## 六、DNS（阿里云云解析，vttjit.tech）

| 主机记录 | 记录值 | 用途 |
|---|---|---|
| `@` | `shenliliaff.github.io` | 博客主域 |
| `www` | `shenliliaff.github.io` | 博客 www |
| `waline` | `cname.vercel-dns.com` | 评论后端 |
| `auth` | `cname.vercel-dns.com` | 登录中转 |

> - Vercel 新版会「建议」换成专属 CNAME 值，但那个值可能尚未上线（实测 Non-existent domain），
>   旧值 `cname.vercel-dns.com` 官方承诺继续生效，保持旧值即可
> - 每加一个子域名都要在对应 Vercel 项目的 Domains 里添加，否则 506/404

---

## 七、能力边界（明确不做/做不到的）

| 功能 | 结论 |
|---|---|
| 匿名评论 | ✅ 填昵称即可，无需账号 |
| GitHub 登录 | ✅ 已上线 |
| **微信登录** | ❌ **Waline 不支持**（社交列表无微信，与主体资质无关），不做 |
| 微博 / QQ / Twitter / Facebook 登录 | 已隐藏（auth 未配凭证）；企业主体可后补 |
| 知乎登录 | ❌ 开放平台基本不开放申请，放弃 |
| 点赞一人一次 | ❌ Waline 点赞是纯前端计数，与匿名矛盾，保留原生（可多次点）|
| 用户自删评论 | 登录用户可删自己的；匿名用户删不了（无身份凭证）|

---

## 八、故障排查速查

| 症状 | 原因 | 处理 |
|---|---|---|
| `No valid storage found` | 环境变量用了 `POSTGRES_*` 或缺失 | 用 `PG_*` 那套，Redeploy |
| `ENOTFOUND db.xxx.supabase.co` | 用了直连地址（IPv6）| 改 pooler 地址 + 端口 6543 + 用户名 `postgres.<ref>` |
| `column "url" does not exist` | 建表 SQL 缺列/表名大小写不对 | 按第二节 SQL 重建（全小写）|
| `/ui` 白屏或一闪而过 | `OAUTH_URL` 指向的 auth 服务不可达 | 检查 auth 域名解析 + 部署状态 |
| auth 域名 506 | auth 函数崩溃（如导入错仓库、缺环境变量）| 确认部署的是 walinejs/auth（打开应是 JSON），补齐 env 后 Redeploy |
| 登录页出现 5 个社交图标 | `OAUTH_URL` 未配或指向公共中转 | 配 `OAUTH_URL` 指向自建 auth 并 Redeploy |
| 域名打开的是错误的服务 | 域名绑错 Vercel 项目 | 在两个项目的 Domains 里挪正 |
| 微博登录报 `invalid authorization code` | 回调页不匹配 / code 被复用 | 回调页严格全等 `https://auth.vttjit.tech/weibo`；重新发起授权，别刷新旧报错页 |
| 管理员进不去管理面板 | 浏览器残留普通用户 token | 退出登录/清 Local Storage 后用邮箱密码重登 |

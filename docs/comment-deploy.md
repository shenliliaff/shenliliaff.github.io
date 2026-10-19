# 评论系统部署指南（Waline 后端）

站点评论用 [Waline](https://waline.js.org)（匿名 + 昵称/邮箱选填 + GitHub/微信/知乎/微博登录）。
前端已配好（`docs/.vuepress/theme.ts` 的 `comment` 配置 + `docs/reading/index.html` 的注入脚本），
本指南只差**后端**一步。

> ⚠️ LeanCloud 国内版（console.leancloud.cn）已停止新用户注册，本指南改用 **Supabase（免费 PostgreSQL）+ Vercel**，
> 两个平台都用 GitHub 账号直接登录，无需手机号实名，全程免费。

前端 `serverURL` 目前是占位符 `https://your-waline-server.vercel.app`，
**部署完成后把它替换成你的真实地址**（共两处：`theme.ts` + `reading/index.html`），然后构建推送。

---

## 第一步：Supabase 建数据库（约 5 分钟）

1. 打开 https://supabase.com → 点 **Sign In** → 选 **Continue with GitHub**（用你的 GitHub 账号授权）
2. 新建项目：
   - 点 **New project**
   - Name：`waline`（随意）
   - Database Password：点 Generate 设置一个强密码，**记下来**（后面要用）
   - Region：选 **Singapore** 或 **Tokyo**（离中国近，延迟低）
   - 等待 1-2 分钟初始化
3. 初始化 Waline 数据表：
   - 左侧菜单 → **SQL Editor** → **New query**
   - 把下面这段 SQL 粘贴进去，点 **Run**：

```sql
CREATE TABLE IF NOT EXISTS wl_Comment (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER,
  comment TEXT,
  insertedAt TIMESTAMP DEFAULT NOW(),
  ip VARCHAR(100) DEFAULT '',
  link VARCHAR(255) DEFAULT '',
  mail VARCHAR(255) DEFAULT '',
  nick VARCHAR(255) DEFAULT '',
  pid INTEGER,
  rid INTEGER,
  sticky BOOLEAN DEFAULT FALSE,
  like INTEGER DEFAULT 0,
  ua VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS wl_Counter (
  id BIGSERIAL PRIMARY KEY,
  time INTEGER DEFAULT 0,
  reaction0 INTEGER DEFAULT 0,
  reaction1 INTEGER DEFAULT 0,
  reaction2 INTEGER DEFAULT 0,
  reaction3 INTEGER DEFAULT 0,
  reaction4 INTEGER DEFAULT 0,
  reaction5 INTEGER DEFAULT 0,
  reaction6 INTEGER DEFAULT 0,
  reaction7 INTEGER DEFAULT 0,
  reaction8 INTEGER DEFAULT 0,
  meta JSONB
);

CREATE TABLE IF NOT EXISTS wl_Users (
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
  2fa VARCHAR(255) DEFAULT '',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

4. 拿数据库连接信息：
   - 左侧菜单 → **Project Settings** → **Database**
   - 找到 **Connection string → URI**（选 **Connection pooling** / 端口 6543 的那个）
   - 格式形如 `postgresql://postgres.abc123:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`
   - 把 `[YOUR-PASSWORD]` 换成第一步记下的密码
   - **记下这个完整连接串**（下面要拆成 HOST / PORT / USER / PASSWORD / DB 五个变量）

## 第二步：Vercel 部署 Waline 后端（约 5 分钟）

1. 打开 https://vercel.com → 点 **Sign Up** → 选 **Continue with GitHub**（授权）
2. 部署 Waline 官方模板：
   - 在浏览器打开 Waline 官方一键部署链接：https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample&project-name=waline-blog
   - Vercel 会自动把 Waline 的示例仓库复制到你的账号下
3. 在部署页的 **Environment Variables** 里填：

| 变量名 | 值 |
| --- | --- |
| `POSTGRES_HOST` | Supabase 连接串里的主机部分，如 `aws-0-ap-southeast-1.pooler.supabase.com` |
| `POSTGRES_PORT` | `6543` |
| `POSTGRES_DB` | `postgres` |
| `POSTGRES_USER` | 连接串里的用户名，如 `postgres.abc123` |
| `POSTGRES_PASSWORD` | 第一步的数据库密码 |
| `SITE_NAME` | `fengsKB`（随意） |
| `SITE_URL` | `https://shenliliaff.github.io` |

4. 点 **Deploy**，等 1 分钟部署完成
5. 部署成功后你会得到一个地址，形如 `https://waline-blog-xxxx.vercel.app` —— **这就是你的 serverURL**

## 第三步：验证后端

浏览器打开 `https://你的地址/ui`（Vercel 分配的域名 + `/ui`），
能进入 Waline 的**管理后台登录页**即部署成功。首次访问用邮箱注册一个管理员账号（这个邮箱就是你的评论管理员身份）。

## 第四步：告诉我 serverURL

把 `https://xxxx.vercel.app` 这个地址发我，我会：
1. 替换 `theme.ts` 和 `reading/index.html` 两处 `serverURL`
2. 构建并做真实联调（发一条测试评论验证读写闭环）
3. 推送上线

## 第五步（可选，以后再做）：社交登录

默认已支持：**匿名评论（填昵称即可）+ GitHub 登录**。GitHub 登录需要配置 OAuth：

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
2. Homepage URL：`https://shenliliaff.github.io`；Callback URL：`https://你的serverURL/oauth/github`
3. 拿到 Client ID / Client Secret，在 Vercel 项目的环境变量里加 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`，然后 Redeploy

微信/知乎/微博登录需要去各平台开放平台申请 AppID（微信要企业资质），审核慢，建议以后有需要再补。
配置方法见 Waline 官方文档：https://waline.js.org/guide/get-started.html#登录配置

---

## 给访客的体验（部署完成后）

- **匿名评论**：填昵称就能发（邮箱、网址选填）——不需要任何账号
- **登录评论**：GitHub 一键登录（配置 OAuth 后）；微信/知乎/微博以后可加
- **管理**：访问 `https://你的serverURL/ui` 管理评论（删垃圾、置顶等）

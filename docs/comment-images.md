# 评论图片存储（Supabase Storage）

评论里的图片不再转成 Base64 塞进正文，而是压缩后上传到 Supabase Storage，正文里只留一个图片地址。

**为什么必须自己写组件**：`theme-hope` 会把评论配置 `JSON.stringify` 后注入客户端常量（`__COMMENT_OPTIONS__`），函数会在序列化时被丢弃，所以 `imageUploader` 无法从 `theme.ts` 传进去。只能用 alias 替换插件内部的 `@vuepress/plugin-comment/service`，在组件里手动传。

## 链路

```
选图 → canvas 重绘（长边 1280，铺白底）→ AVIF/WEBP 逐级降质到 ≤150 KB
     → POST https://<ref>.supabase.co/storage/v1/object/comment-images/comments/YYYY-MM/<uuid>.avif
     → 返回公开地址，插入评论正文 ![](url)
```

压缩策略（`docs/.vuepress/components/WalineCommentService.ts`）：

| 步骤 | 规则 |
|---|---|
| 跳过 | GIF（保动图）、SVG（有 XSS 风险，直接拒绝）、≤100 KB 且尺寸合规的原图 |
| 首轮 | 长边缩到 1280，优先 AVIF（0.55 → 0.28），不支持则 WEBP（0.8 → 0.5），达标即停 |
| 兜底 | 降到底仍 >150 KB，缩到 900px 再压一次 |
| 保险 | 压完反而更大、或任一步报错，一律用原图 |

### 实测数据（Chrome 120+，2400×1600 测试图，原始 PNG 3067 KB）

| 输出 | 参数 | 体积 |
|---|---|---|
| WEBP 1280 | q 0.8 | **85 KB** |
| WEBP 1280 | q 0.7 | 72 KB |
| WEBP 1280 | q 0.6 | 67 KB |
| WEBP 900 | q 0.5 | 35 KB |
| JPEG 1280 | q 0.85 | 178 KB |

**结论：AVIF 这条路目前走不通**——Chrome 的 `canvas.toBlob("image/avif")` 不受支持，会静默回落成 PNG（946 KB，且与质量参数无关）。代码里用 `probe.type === "image/avif"` 做了 MIME 校验，会自动退到 WEBP。留 AVIF 分支是为了将来浏览器支持后自动启用，不影响现在。

实际生效的是 WEBP 0.8 起步：3 MB 截图 → 约 85 KB，**省 97%**。1 GB 免费额度约可存 **10000+ 张**。

## 一、建 bucket

Supabase 控制台 → **Storage** → **New bucket**：

- Name：`comment-images`
- **Public bucket 勾选**（图片链接要能被直接打开）
- File size limit：`2 MB`（前端已压到 150 KB，这里卡住异常请求）
- Allowed MIME types：`image/jpeg, image/png, image/webp, image/avif, image/gif`

## 二、放行匿名上传（RLS）

Storage → Policies → `comment-images` → **New policy** → 用 SQL 编辑器执行：

```sql
create policy "anon upload comment images"
on storage.objects
for insert
to anon
with check (bucket_id = 'comment-images');
```

**不要再建 select / update / delete 策略。** 匿名用户只能新增文件，不能列出、覆盖、删除。
Public bucket 的读取走公开 URL，不走 RLS，所以不需要 select 策略。

## 三、拿 anon key

Project Settings → **API Keys** → 复制 `anon` / `public` 那个 key（`eyJ...` 开头）。

填进 `docs/.vuepress/components/WalineCommentService.ts` 顶部：

```ts
const SUPABASE_URL = "https://hpuaegzzooqsorqabeut.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOi...";   // ← 这里
const BUCKET = "comment-images";
```

`SUPABASE_URL` 和项目 ref 请核对成你自己的。

## 四、接线（已完成，仅备查）

`docs/.vuepress/config.ts`：

```ts
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  alias: {
    "@vuepress/plugin-comment/service": path.resolve(__dirname, "components/WalineCommentService.ts"),
  },
});
```

> 升级 theme-hope / `@vuepress/plugin-comment` 大版本后要回归测一次上传。
> 判断 alias 是否失效：看构建产物里有没有 `WALINE_LOCALES`（有就说明默认组件又回来了）。

## 五、验证

1. 构建：`NODE_OPTIONS="" node scripts/prepare-reading.mjs && NODE_OPTIONS="" node scripts/prepare-blog.mjs && NODE_OPTIONS="" node node_modules/vuepress/bin/vuepress.js build docs`
2. 打开任意文章 → 评论区点图片按钮传一张手机截图
3. 控制台应打印 `[评论图片] 3.1 MB → 98 KB（省 97%）`
4. 正文里应该是 `![](https://hpuaegz....supabase.co/storage/v1/object/public/comment-images/comments/2026-11/xxx.avif)`，不是 `data:image/...`
5. Supabase → Storage → `comment-images` 里能看到这个文件
6. 查表 `wl_comment`，新评论的 `comment` 字段里应是 URL

## 六、注意

**anon key 是公开的**（打包进前端 JS），任何人都能往这个 bucket 传图。缓解措施：

- bucket 的 File size limit 设 2 MB，单文件占不了太多
- 只能 insert，不能遍历/覆盖/删除，无法污染已有图片
- 定期看 Supabase → Usage 的 Storage 曲线，异常增长就清空 bucket 并换 anon key（Settings → API Keys → 重新生成）
- 真要彻底堵住，加一层 Vercel Serverless 中转（密钥放服务端），但需要另建一个 Vercel 项目，个人博客通常不必

**历史评论里的 Base64 图片不会自动迁移**，它们仍在 `wl_comment.comment` 里。要清理只能逐条改写，一般不值得。

**出网额度（egress）**：图片走 Supabase 的公开 URL，浏览量计入 5 GB/月的 egress。按 150 KB/张、每月 3 万次浏览算约 4.5 GB，接近上限；超出后按 Fair Use 限流。真到那一步，要么加缓存（Supabase Smart CDN 是付费项），要么换成国内 OSS。

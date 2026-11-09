/**
 * 生成 docs/.vuepress/data/blog-posts.ts
 *
 * 从 docs/blog/*.md 的 frontmatter 读取 title / date / writtenAt，排序后输出。
 * 供两处消费，避免两处各维护一份清单：
 *   1. docs/.vuepress/components/BlogPostList.vue —— /blog/ 文章列表（月 + 周折叠）
 *   2. docs/.vuepress/sidebar.ts —— 侧边栏「月 → 周 → 文章」
 * 因此新增文章只需把 .md 放进 docs/blog/，文章列表与侧边栏都会自动更新。
 *
 * 排序规则（最新在最前）：
 *   1. date 降序；
 *   2. 同一天内按 frontmatter 的 writtenAt（HH:MM）降序——当天后写的排前面；
 *      没有 writtenAt 的视为当天最早，排在该日最后；
 *   3. 仍相同则按 url 降序，保证生成结果稳定。
 * 注意：不能叫 time —— time 是 VuePress 的保留字段（已废弃），会被并进 date 导致解析失败。
 * 注意：不能用文件 mtime 排序，GitHub Actions 检出后 mtime 全变，顺序会乱。
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const blogDir = "docs/blog";
const outFile = "docs/.vuepress/data/blog-posts.ts";

const stripQuotes = (s) => s.replace(/^["']|["']$/g, "");

const posts = [];

for (const fileName of readdirSync(blogDir)) {
  if (!fileName.endsWith(".md") || fileName === "README.md" || fileName.startsWith("_")) continue;

  const source = readFileSync(join(blogDir, fileName), "utf8");
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!frontmatter) continue;

  const block = frontmatter[1];
  const title = stripQuotes((/^title:[ \t]*(.+)$/m.exec(block)?.[1] ?? "").trim());
  const date = stripQuotes((/^date:[ \t]*(.+)$/m.exec(block)?.[1] ?? "").trim());
  const writtenAt = stripQuotes((/^writtenAt:[ \t]*(.+)$/m.exec(block)?.[1] ?? "").trim());
  if (!title || !date) continue;

  posts.push({ title, date, writtenAt, url: `/blog/${basename(fileName, ".md")}.html` });
}

// date 降序 → writtenAt 降序（无 writtenAt 的排当天最后）→ url 降序兜底
posts.sort((a, b) => {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;

  const ta = a.writtenAt || "";
  const tb = b.writtenAt || "";
  if (ta !== tb) return ta < tb ? 1 : -1;

  return b.url.localeCompare(a.url);
});

const body = posts
  .map(
    (p) =>
      `  {\n    title: ${JSON.stringify(p.title)},\n    date: ${JSON.stringify(p.date)},\n    url: ${JSON.stringify(p.url)},\n  },`,
  )
  .join("\n");

writeFileSync(
  outFile,
  `/* 本文件由 scripts/prepare-blog.mjs 依据 docs/blog/*.md 的 frontmatter 自动生成，请勿手工修改 */

/** 站内文章条目 */
export interface BlogPost {
  /** 文章标题 */
  title: string;
  /** 发布日期，YYYY-MM-DD */
  date: string;
  /** 站内链接 */
  url: string;
}

/** 全部文章，按日期降序（最新在最前） */
export const blogPosts: BlogPost[] = [
${body}
];
`,
  "utf8",
);

console.log(`[prepare-blog] 已生成 ${outFile}，共 ${posts.length} 篇`);

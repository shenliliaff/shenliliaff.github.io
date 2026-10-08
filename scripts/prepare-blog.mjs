/**
 * 生成 docs/.vuepress/data/blog-posts.ts
 *
 * 从 docs/blog/*.md 的 frontmatter 读取 title / date，按日期降序输出。
 * 供两处消费，避免两处各维护一份清单：
 *   1. docs/.vuepress/components/BlogPostList.vue —— /blog/ 文章列表（每页最多 5 篇 + 分页）
 *   2. docs/.vuepress/sidebar.ts —— 侧边栏条目「YYYY-MM-DD 标题」
 * 因此新增文章只需把 .md 放进 docs/blog/，文章列表与侧边栏都会自动更新。
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
  if (!title || !date) continue;

  posts.push({ title, date, url: `/blog/${basename(fileName, ".md")}.html` });
}

// 日期降序；同一天按链接降序，保证每次生成顺序稳定
posts.sort((a, b) => (a.date === b.date ? b.url.localeCompare(a.url) : a.date < b.date ? 1 : -1));

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

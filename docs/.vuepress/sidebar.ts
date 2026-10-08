import { sidebar } from "vuepress-theme-hope";
import { blogPosts } from "./data/blog-posts.js";

// 图标：https://theme-hope.vuejs.press/zh/guide/interface/icon.html#%E8%AE%BE%E7%BD%AE%E5%9B%BE%E6%A0%87
// https://fontawesome.com/search?m=free&o=r
//
// 博客文章分组不再用 children: "structure"（只会渲染标题），而是直接消费
// scripts/prepare-blog.mjs 生成的文章清单，把条目写成「YYYY-MM-DD 标题」。
// 清单已按日期降序排好，这里保持原顺序输出，不要再交给 sidebarSorter 重排。
export default sidebar({
  "": [
    {
      text: "笔记",
      icon: "fa6-solid:book-open",
      prefix: "/notes/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "热点榜单",
      icon: "fa6-solid:fire",
      prefix: "/hot/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "博客文章",
      icon: "fa6-solid:feather-pointed",
      prefix: "/blog/",
      collapsible: true,
      children: [
        { text: "博客", link: "README.md", icon: "fa6-solid:blog" },
        ...blogPosts.map((post) => ({
          text: `${post.date} ${post.title}`,
          link: post.url.replace("/blog/", ""),
        })),
      ],
    },
  ],
});

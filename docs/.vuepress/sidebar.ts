import { sidebar } from "vuepress-theme-hope";
import { blogPosts } from "./data/blog-posts.js";

// 图标：https://theme-hope.vuejs.press/zh/guide/interface/icon.html#%E8%AE%BE%E7%BD%AE%E5%9B%BE%E6%A0%87
// https://fontawesome.com/search?m=free&o=r
//
// 博客文章分组不再用 children: "structure"（只会渲染标题），而是直接消费
// scripts/prepare-blog.mjs 生成的文章清单，把条目写成「YYYY-MM-DD 标题」。
// 清单已按日期降序排好，这里保持原顺序输出，不要再交给 sidebarSorter 重排。
//
// 侧边栏与 /blog/ 页面保持一致的两级折叠：月 → 日历周（周一至周日）。
// 跨月的周在相邻两个月里各出现一次，各自只含本月的文章。

const pad = (n: number) => String(n).padStart(2, "0");

/** 取某天所在日历周的周一与周日 */
const weekOf = (year: number, month: number, day: number) => {
  const dt = new Date(year, month - 1, day);
  const offset = (dt.getDay() + 6) % 7; // 周一 = 0
  const monday = new Date(dt);
  monday.setDate(dt.getDate() - offset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { monday, sunday };
};

interface WeekBucket {
  key: string;
  range: string;
  items: { text: string; link: string }[];
}

interface MonthBucket {
  label: string;
  weeks: Map<string, WeekBucket>;
}

/** 按「月 → 日历周」把文章清单分组，月与周都按时间降序（最新在上） */
const buildBlogGroups = () => {
  const months = new Map<string, MonthBucket>();

  blogPosts.forEach((post) => {
    const [year, month, day] = post.date.split("-").map(Number);
    const monthKey = `${year}-${pad(month)}`;

    let bucket = months.get(monthKey);
    if (!bucket) {
      bucket = { label: `${year} 年 ${month} 月`, weeks: new Map() };
      months.set(monthKey, bucket);
    }

    const { monday, sunday } = weekOf(year, month, day);
    const weekKey = `${monday.getFullYear()}-${pad(monday.getMonth() + 1)}-${pad(monday.getDate())}`;

    let week = bucket.weeks.get(weekKey);
    if (!week) {
      week = {
        key: weekKey,
        range: `${pad(monday.getMonth() + 1)}-${pad(monday.getDate())} ~ ${pad(sunday.getMonth() + 1)}-${pad(sunday.getDate())}`,
        items: [],
      };
      bucket.weeks.set(weekKey, week);
    }

    week.items.push({ text: `${post.date} ${post.title}`, link: post.url });
  });

  const monthKeys = [...months.keys()].sort().reverse();

  return monthKeys.map((monthKey, monthIndex) => {
    const bucket = months.get(monthKey)!;
    const ascWeeks = [...bucket.weeks.keys()].sort();
    const descWeeks = [...ascWeeks].reverse();

    return {
      text: bucket.label,
      collapsible: true,
      // 只默认展开最新的月份，其余收起，避免侧边栏过长
      expanded: monthIndex === 0,
      children: descWeeks.map((weekKey, weekIndex) => {
        const week = bucket.weeks.get(weekKey)!;
        const no = ascWeeks.indexOf(weekKey) + 1;
        return {
          text: `第 ${no} 周 ${week.range}`,
          collapsible: true,
          // 每个月的第一周默认展开：月份收起时其子项不渲染，所以不会拉长侧边栏，
          // 效果是「点开某个月份就能看到该月最新一周的文章」，与 /blog/ 页面一致。
          expanded: weekIndex === 0,
          children: week.items,
        };
      }),
    };
  });
};

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
      collapsible: true,
      children: [
        { text: "博客", link: "/blog/", icon: "fa6-solid:blog" },
        ...buildBlogGroups(),
      ],
    },
  ],
});

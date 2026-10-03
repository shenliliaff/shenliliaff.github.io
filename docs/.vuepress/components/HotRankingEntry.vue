<script setup lang="ts">
import { hotRanking, hotRankingUpdatedAt } from "../data/hot-ranking.js";

/** 与榜单页保持一致的排序：日期降序，同日按热度 */
const sorted = [...hotRanking].sort((a, b) =>
  a.date !== b.date ? (a.date < b.date ? 1 : -1) : b.heat - a.heat,
);

/** 最新一条，用于入口卡片文案 */
const latest = sorted[0];
const latestDate = latest?.date ?? "";
const latestDateShort = latestDate ? latestDate.slice(5) : "";

/**
 * 按自然周（周一起）统计页数，与榜单页的分页口径保持一致。
 * 榜单页只渲染「有事件的周」，因此这里也按有事件的周去重计数。
 */
const weekCount = new Set(
  sorted.map((i) => {
    const [y, m, d] = i.date.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() - ((dt.getDay() + 6) % 7));
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
  }),
).size;
</script>

<template>
  <a class="hot-rank-entry" href="/hot/">
    <div class="hot-rank-entry__text">
      <div class="hot-rank-entry__title">
        热点榜单 · {{ hotRanking.length }} 条已核实事件 / {{ weekCount }} 页
      </div>
      <div class="hot-rank-entry__desc">
        最新（{{ latestDateShort }}）：{{ latest?.title }} · 按周分页，支持搜索 · 更新于
        {{ hotRankingUpdatedAt }}
      </div>
    </div>
    <span class="hot-rank-entry__cta">查看榜单 →</span>
  </a>
</template>

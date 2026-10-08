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

/** 与榜单页分页口径保持一致：每页最多 5 条 */
const PAGE_SIZE = 5;
const pageCount = Math.max(Math.ceil(sorted.length / PAGE_SIZE), 1);
</script>

<template>
  <a class="hot-rank-entry" href="/hot/">
    <div class="hot-rank-entry__text">
      <div class="hot-rank-entry__title">
        热点榜单 · {{ hotRanking.length }} 条已核实事件 / {{ pageCount }} 页
      </div>
      <div class="hot-rank-entry__desc">
        最新（{{ latestDateShort }}）：{{ latest?.title }} · 每页最多 5 条，可分页浏览与搜索 ·
        更新于 {{ hotRankingUpdatedAt }}
      </div>
    </div>
    <span class="hot-rank-entry__cta">查看榜单 →</span>
  </a>
</template>

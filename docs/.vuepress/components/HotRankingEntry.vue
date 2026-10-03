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
</script>

<template>
  <a class="hot-rank-entry" href="/hot/">
    <div class="hot-rank-entry__text">
      <div class="hot-rank-entry__title">
        热点榜单 · {{ hotRanking.length }} 条已核实事件
      </div>
      <div class="hot-rank-entry__desc">
        最新（{{ latestDateShort }}）：{{ latest?.title }} · 更新于 {{ hotRankingUpdatedAt }}
      </div>
    </div>
    <span class="hot-rank-entry__cta">查看榜单 →</span>
  </a>
</template>

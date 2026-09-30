<script setup lang="ts">
import { hotRanking, hotRankingUpdatedAt } from "../data/hot-ranking.js";

/** 榜单按热度降序，取榜首用于入口卡片文案 */
const sorted = [...hotRanking].sort((a, b) => b.heat - a.heat);
const top = sorted[0];
const recent = sorted.filter((i) => i.date >= "2026-09-23").length;
</script>

<template>
  <a class="hot-rank-entry" href="/hot/">
    <div class="hot-rank-entry__text">
      <div class="hot-rank-entry__title">
        热点榜单 · {{ hotRanking.length }} 条已核实事件
      </div>
      <div class="hot-rank-entry__desc">
        榜首：{{ top.title }} · 近一周 {{ recent }} 条 · 更新于 {{ hotRankingUpdatedAt }}
      </div>
    </div>
    <span class="hot-rank-entry__cta">查看榜单 →</span>
  </a>
</template>

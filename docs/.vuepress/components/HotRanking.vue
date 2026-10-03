<script setup lang="ts">
import { computed } from "vue";
import {
  hotRanking,
  categoryColors,
  type HotCategory,
  type HotItem,
  type SourcePrecision,
} from "../data/hot-ranking.js";

/** 信源精确度 → 展示文案与提示 */
const precisionLabel = (p: SourcePrecision) =>
  p === "exact" ? "直达原文" : p === "section" ? "官方栏目页" : "官方站点";

const precisionHint = (p: SourcePrecision) =>
  p === "exact"
    ? "链接直达该事件的具体官方公告/博文页"
    : p === "section"
      ? "链接指向官方栏目/列表页，内容真实，需在列表内定位该条"
      : "链接指向官方站点入口，为该来源的兜底地址";

/**
 * 榜单排序：事件日期降序（最新在最上）为主，同一天内按热度降序。
 * 说明：榜单以「时间线」形态呈现，热度只用于同日内排序与条形图可视化。
 */
const list = computed<HotItem[]>(() =>
  [...hotRanking].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return b.heat - a.heat;
  }),
);

/** 条目总数（渲染条目序号用） */
const total = computed(() => list.value.length);

/** 榜内涉及的一手信源机构数 */
const sourceCount = computed(() => {
  const set = new Set(
    list.value.flatMap((item) => [item.sourceName, ...(item.refs ?? []).map((r) => r.name)]),
  );
  return set.size;
});

/** 类别分布，用于概览条形图 */
const categoryStats = computed(() => {
  const map = new Map<HotCategory, number>();
  for (const item of list.value) map.set(item.category, (map.get(item.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / list.value.length) * 100),
      color: categoryColors[name],
    }))
    .sort((a, b) => b.count - a.count);
});

/** 榜单最高热度，用于条形图归一化 */
const maxHeat = computed(() => Math.max(...list.value.map((i) => i.heat)));

/** 信源直达原文的条数（precision === "exact"） */
const exactCount = computed(() => list.value.filter((i) => i.precision === "exact").length);

/** 最新事件的日期（榜单顶部那条） */
const topDate = computed(() => list.value[0]?.date ?? "");

/** 概览指标卡 */
const metrics = computed(() => [
  { label: "上榜事件", value: String(total.value), unit: "条" },
  { label: "直达原文", value: `${exactCount.value}/${total.value}`, unit: "" },
  { label: "一手信源", value: String(sourceCount.value), unit: "个" },
  { label: "最新事件", value: topDate.value.slice(5), unit: "" },
]);

/** 换行安全的日期格式：09-29 */
const shortDate = (date: string) => date.slice(5);
</script>

<template>
  <div class="hot-rank">
    <!-- ===== 概览指标 ===== -->
    <div class="hot-rank__metrics">
      <div v-for="m in metrics" :key="m.label" class="hot-rank__metric">
        <div class="hot-rank__metric-value">
          {{ m.value }}<span v-if="m.unit" class="hot-rank__metric-unit">{{ m.unit }}</span>
        </div>
        <div class="hot-rank__metric-label">{{ m.label }}</div>
      </div>
    </div>

    <!-- ===== 类别分布图 ===== -->
    <div class="hot-rank__chart-card">
      <div class="hot-rank__chart-title">类别分布</div>
      <div class="hot-rank__chart">
        <div v-for="c in categoryStats" :key="c.name" class="hot-rank__bar-row">
          <div class="hot-rank__bar-label">{{ c.name }}</div>
          <div class="hot-rank__bar-track">
            <div
              class="hot-rank__bar-fill"
              :style="{ width: c.percent + '%', background: c.color }"
            />
          </div>
          <div class="hot-rank__bar-value">{{ c.count }} 条 · {{ c.percent }}%</div>
        </div>
      </div>
    </div>

    <!-- ===== 热度榜列表 ===== -->
    <ol class="hot-rank__list">
      <li v-for="(item, index) in list" :key="item.id" class="hot-rank__item">
        <a
          class="hot-rank__item-link"
          :href="item.sourceUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="hot-rank__item-head">
            <span class="hot-rank__index" :class="{ 'is-top': index < 3 }">
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <div class="hot-rank__item-main">
              <div class="hot-rank__item-title-row">
                <span class="hot-rank__item-title">{{ item.title }}</span>
                <span
                  class="hot-rank__tag"
                  :style="{ color: categoryColors[item.category], borderColor: categoryColors[item.category] }"
                >
                  {{ item.category }}
                </span>
              </div>
              <p class="hot-rank__item-summary">{{ item.summary }}</p>

              <!-- 热度条 -->
              <div class="hot-rank__heat">
                <div class="hot-rank__heat-track">
                  <div
                    class="hot-rank__heat-fill"
                    :style="{
                      width: (item.heat / maxHeat) * 100 + '%',
                      background: categoryColors[item.category],
                    }"
                  />
                </div>
                <span class="hot-rank__heat-value">{{ item.heat }}</span>
              </div>

              <!-- 信源 -->
              <div class="hot-rank__item-meta">
                <span class="hot-rank__date">{{ shortDate(item.date) }}</span>
                <span class="hot-rank__org">{{ item.org }}</span>
                <span class="hot-rank__source">
                  <svg class="hot-rank__source-icon" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M6.5 3.5 8 2h5.5V7.5L12 9M9.5 6.5 14 2M13 9.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ item.sourceName }}
                </span>
                <span v-if="item.authority === 'verified'" class="hot-rank__verified">
                  官方一手 · 已交叉印证
                </span>
                <span v-else class="hot-rank__verified">官方一手</span>
                <span
                  class="hot-rank__precision"
                  :class="'is-' + item.precision"
                  :title="precisionHint(item.precision)"
                >
                  {{ precisionLabel(item.precision) }}
                </span>
              </div>
            </div>
          </div>
        </a>

        <!-- 站内延伸阅读，独立链接，不嵌套在外链里 -->
        <div v-if="item.article" class="hot-rank__article">
          <a :href="item.article">站内深读 →</a>
        </div>
      </li>
    </ol>

    <div class="hot-rank__legend">
      <span class="hot-rank__legend-item"><i class="is-exact"></i>直达原文：链接直达具体官方公告页</span>
      <span class="hot-rank__legend-item"><i class="is-section"></i>官方栏目页：内容真实，需在列表内定位</span>
      <span class="hot-rank__legend-item"><i class="is-homepage"></i>官方站点：该来源的入口地址</span>
    </div>

    <p class="hot-rank__note">
      排序规则：<strong>按事件日期降序</strong>（最新在最上），同一天内按热度降序。 热度为站内指数（权威等级 ×
      事件量级 × 跨信源印证数折算），非平台真实播放量，仅用于同日内排序与条形图可视化。
      每条均回溯官方一手信源，二手转述不入榜。
    </p>
  </div>
</template>

<style lang="scss">
.hot-rank {
  --hr-border: var(--vp-c-border, #e5e7eb);
  --hr-bg-soft: var(--vp-c-bg-soft, #f7f8fa);
  --hr-text-soft: var(--vp-c-text-mute, #6b7280);
  --hr-accent: #3eaf7c;
  margin: 1.5rem 0 2.5rem;

  /* ---------- 指标卡 ---------- */
  &__metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  &__metric {
    padding: 0.9rem 1rem;
    border: 1px solid var(--hr-border);
    border-radius: 10px;
    background: var(--hr-bg-soft);
  }

  &__metric-value {
    color: var(--hr-accent);
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.1;
  }

  &__metric-unit {
    margin-left: 0.2rem;
    color: var(--hr-text-soft);
    font-weight: 400;
    font-size: 0.8rem;
  }

  &__metric-label {
    margin-top: 0.25rem;
    color: var(--hr-text-soft);
    font-size: 0.8rem;
  }

  /* ---------- 类别分布图 ---------- */
  &__chart-card {
    padding: 1rem 1.15rem 1.15rem;
    border: 1px solid var(--hr-border);
    border-radius: 10px;
    background: var(--hr-bg-soft);
    margin-bottom: 1.75rem;
  }

  &__chart-title {
    margin-bottom: 0.85rem;
    color: var(--hr-text-soft);
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.02em;
  }

  &__bar-row {
    display: grid;
    grid-template-columns: 4.5rem 1fr auto;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.55rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__bar-label {
    font-size: 0.82rem;
    white-space: nowrap;
  }

  &__bar-track {
    height: 10px;
    border-radius: 5px;
    background: var(--vp-c-bg-alt, #eceef1);
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    border-radius: 5px;
    transition: width 0.6s cubic-bezier(0.25, 0.8, 0.3, 1);
  }

  &__bar-value {
    color: var(--hr-text-soft);
    font-variant-numeric: tabular-nums;
    font-size: 0.78rem;
    white-space: nowrap;
  }

  /* ---------- 榜单列表 ---------- */
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: hotrank;
  }

  &__item {
    border-bottom: 1px solid var(--hr-border);
    padding: 0.95rem 0;

    &:first-child {
      border-top: 1px solid var(--hr-border);
    }
  }

  &__item-link {
    display: block;
    color: inherit;
    text-decoration: none !important;
  }

  &__item-head {
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
  }

  &__index {
    flex: 0 0 auto;
    min-width: 2rem;
    color: var(--hr-text-soft);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    font-size: 1.05rem;
    line-height: 1.5;

    &.is-top {
      color: var(--hr-accent);
    }
  }

  &__item-main {
    flex: 1 1 auto;
    min-width: 0;
  }

  &__item-title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &__item-title {
    font-weight: 600;
    font-size: 1rem;
  }

  &__item-link:hover &__item-title {
    color: var(--hr-accent);
  }

  &__tag {
    padding: 0.05rem 0.45rem;
    border: 1px solid currentcolor;
    border-radius: 4px;
    font-size: 0.7rem;
    line-height: 1.4;
    opacity: 0.85;
  }

  &__item-summary {
    margin: 0.35rem 0 0.55rem;
    color: var(--vp-c-text-2, #4b5563);
    font-size: 0.86rem;
    line-height: 1.65;
  }

  &__heat {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__heat-track {
    flex: 0 1 14rem;
    height: 6px;
    border-radius: 3px;
    background: var(--vp-c-bg-alt, #eceef1);
    overflow: hidden;
  }

  &__heat-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.6s cubic-bezier(0.25, 0.8, 0.3, 1);
  }

  &__heat-value {
    color: var(--hr-text-soft);
    font-variant-numeric: tabular-nums;
    font-size: 0.78rem;
  }

  &__item-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3rem 0.75rem;
    margin-top: 0.55rem;
    color: var(--hr-text-soft);
    font-size: 0.75rem;
  }

  &__date {
    font-variant-numeric: tabular-nums;
  }

  &__org {
    font-weight: 500;
  }

  &__source {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__source-icon {
    width: 0.85em;
    height: 0.85em;
  }

  &__verified {
    padding: 0.05rem 0.4rem;
    border: 1px solid var(--hr-border);
    border-radius: 4px;
    background: var(--vp-c-bg, #fff);
    font-size: 0.7rem;
  }

  /* 信源精确度徽标：exact 绿 / section 蓝 / homepage 灰 */
  &__precision {
    padding: 0.05rem 0.4rem;
    border: 1px solid;
    border-radius: 4px;
    font-size: 0.7rem;

    &.is-exact {
      color: #2f855a;
      border-color: color-mix(in srgb, #3eaf7c 45%, transparent);
      background: color-mix(in srgb, #3eaf7c 10%, transparent);
    }

    &.is-section {
      color: #3b6ea8;
      border-color: color-mix(in srgb, #5aa9e6 45%, transparent);
      background: color-mix(in srgb, #5aa9e6 10%, transparent);
    }

    &.is-homepage {
      color: var(--hr-text-soft);
      border-color: var(--hr-border);
      background: transparent;
    }
  }

  &__article {
    margin-top: 0.4rem;
    padding-left: 2.8rem;
    font-size: 0.78rem;

    a {
      color: var(--hr-accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  &__note {
    margin-top: 1.1rem;
    padding: 0.7rem 0.9rem;
    border-left: 3px solid var(--hr-accent);
    border-radius: 0 6px 6px 0;
    background: var(--hr-bg-soft);
    color: var(--hr-text-soft);
    font-size: 0.76rem;
    line-height: 1.7;

    strong {
      color: var(--vp-c-text-1, #1f2328);
    }
  }

  /* 信源精确度图例 */
  &__legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1.1rem;
    margin-top: 1rem;
    color: var(--hr-text-soft);
    font-size: 0.72rem;
  }

  &__legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;

    i {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      border: 1px solid;
      border-radius: 3px;

      &.is-exact {
        border-color: color-mix(in srgb, #3eaf7c 45%, transparent);
        background: color-mix(in srgb, #3eaf7c 20%, transparent);
      }

      &.is-section {
        border-color: color-mix(in srgb, #5aa9e6 45%, transparent);
        background: color-mix(in srgb, #5aa9e6 20%, transparent);
      }

      &.is-homepage {
        border-color: var(--hr-border);
        background: transparent;
      }
    }
  }
}

/* ---------- 入口按钮（供 blog 页调用） ---------- */
.hot-rank-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0 2rem;
  padding: 1rem 1.25rem;
  border: 1px solid color-mix(in srgb, #3eaf7c 35%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, #3eaf7c 8%, transparent);
  text-decoration: none !important;

  &__text {
    min-width: 0;
  }

  &__title {
    color: #2f855a;
    font-weight: 600;
    font-size: 1rem;
  }

  &__desc {
    margin-top: 0.2rem;
    color: var(--vp-c-text-2, #4b5563);
    font-size: 0.82rem;
  }

  &__cta {
    flex: 0 0 auto;
    padding: 0.35rem 0.9rem;
    border-radius: 6px;
    background: #3eaf7c;
    color: #fff;
    font-size: 0.85rem;
    white-space: nowrap;
  }
}

@media (width <= 719px) {
  .hot-rank__bar-row {
    grid-template-columns: 3.6rem 1fr;
  }

  .hot-rank__bar-value {
    grid-column: 2;
    text-align: right;
  }

  .hot-rank__heat-track {
    flex-basis: 8rem;
  }

  .hot-rank__article {
    padding-left: 0;
  }
}
</style>

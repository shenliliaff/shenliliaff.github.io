<script setup lang="ts">
import { computed, ref } from "vue";
import {
  hotRanking,
  categoryColors,
  type HotCategory,
  type HotItem,
  type SourcePrecision,
} from "../data/hot-ranking.js";

/* ==================== 信源精确度文案 ==================== */

/** 信源精确度 → 展示文案 */
const precisionLabel = (p: SourcePrecision) =>
  p === "exact" ? "直达原文" : p === "section" ? "官方栏目页" : "官方站点";

/** 信源精确度 → 悬浮提示 */
const precisionHint = (p: SourcePrecision) =>
  p === "exact"
    ? "链接直达该事件的具体官方公告/博文页"
    : p === "section"
      ? "链接指向官方栏目/列表页，内容真实，需在列表内定位该条"
      : "链接指向官方站点入口，为该来源的兜底地址";

/* ==================== 排序 ==================== */

/**
 * 主排序：事件日期降序（最新在最上），同一天内按热度降序。
 * 榜单以「时间线」形态呈现，热度只用于同日内排序与条形图可视化。
 */
const list = computed<HotItem[]>(() =>
  [...hotRanking].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return b.heat - a.heat;
  }),
);

/* ==================== 分页（每页最多 5 条） ==================== */

/** 每页条数上限 */
const PAGE_SIZE = 5;

const page = ref(0);
const totalPages = computed(() => Math.max(Math.ceil(list.value.length / PAGE_SIZE), 1));
/** 兜底：数据变化时页码不越界 */
const safePage = computed(() => Math.min(page.value, totalPages.value - 1));

/** 当前页的条目（数组已是日期降序，直接切片即可） */
const pageItems = computed<HotItem[]>(() => {
  const start = safePage.value * PAGE_SIZE;
  return list.value.slice(start, start + PAGE_SIZE);
});

/** 当前页首位条目的全局序号（列表编号跨页连续） */
const pageStartIndex = computed(() => safePage.value * PAGE_SIZE);

/** 当前页覆盖的事件日期区间，如 10-06 ~ 10-02 */
const pageRange = computed(() => {
  const items = pageItems.value;
  if (!items.length) return "";
  const newest = items[0].date.slice(5);
  const oldest = items[items.length - 1].date.slice(5);
  return newest === oldest ? newest : `${newest} ~ ${oldest}`;
});

const goPage = (i: number) => {
  page.value = Math.min(Math.max(i, 0), totalPages.value - 1);
};
const prevPage = () => goPage(page.value - 1);
const nextPage = () => goPage(page.value + 1);

/**
 * 页码按钮序列：页数少时全部铺开，页数多时只保留首尾页与当前页左右一页，
 * 中间用 "gap" 占位渲染成省略号，避免页码按钮无限制增长。
 */
const pageTokens = computed<(number | "gap")[]>(() => {
  const last = totalPages.value - 1;
  if (totalPages.value <= 7) return Array.from({ length: totalPages.value }, (_, i) => i);

  const keep = new Set<number>([
    0,
    last,
    safePage.value - 1,
    safePage.value,
    safePage.value + 1,
  ]);
  const pages = [...keep].filter((i) => i >= 0 && i <= last).sort((a, b) => a - b);

  const tokens: (number | "gap")[] = [];
  let prev = -1;
  for (const p of pages) {
    if (prev !== -1 && p - prev > 1) tokens.push("gap");
    tokens.push(p);
    prev = p;
  }
  return tokens;
});

/* ==================== 搜索（跨全部记录） ==================== */

const keyword = ref("");
/** 空格分词，全部命中才算匹配（AND） */
const terms = computed(() => keyword.value.trim().toLowerCase().split(/\s+/).filter(Boolean));
const isSearching = computed(() => terms.value.length > 0);

const searchResults = computed<HotItem[]>(() => {
  if (!isSearching.value) return [];
  const ts = terms.value;
  return list.value.filter((item) => {
    const hay = [
      item.title,
      item.summary,
      item.org,
      item.category,
      item.sourceName,
      ...(item.refs ?? []).map((r) => r.name),
    ]
      .join(" ")
      .toLowerCase();
    return ts.every((t) => hay.includes(t));
  });
});

/** 当前要渲染的条目：搜索态平铺全部命中（搜索不受分页约束），浏览态只渲染当前页 */
const visibleItems = computed<HotItem[]>(() =>
  isSearching.value ? searchResults.value : pageItems.value,
);

/* ==================== 文本高亮（避免 v-html） ==================== */

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (text: string): { text: string; hit: boolean }[] => {
  const ts = terms.value;
  if (!ts.length) return [{ text, hit: false }];
  const set = new Set(ts);
  const re = new RegExp(`(${ts.map(escapeRe).join("|")})`, "gi");
  return text
    .split(re)
    .filter((s) => s !== "")
    .map((s) => ({ text: s, hit: set.has(s.toLowerCase()) }));
};

/* ==================== 概览指标 ==================== */

const total = computed(() => list.value.length);

/** 榜内涉及的信源机构数 */
const sourceCount = computed(() => {
  const set = new Set(
    list.value.flatMap((item) => [item.sourceName, ...(item.refs ?? []).map((r) => r.name)]),
  );
  return set.size;
});

/** 直达原文的条数 */
const exactCount = computed(() => list.value.filter((i) => i.precision === "exact").length);

/** 最新事件的日期 */
const topDate = computed(() => list.value[0]?.date ?? "");

const metrics = computed(() => [
  { label: "上榜事件", value: String(total.value), unit: "条" },
  { label: "本页事件", value: String(pageItems.value.length), unit: "条" },
  { label: "一手信源", value: String(sourceCount.value), unit: "个" },
  { label: "直达原文", value: `${exactCount.value}/${total.value}`, unit: "" },
  { label: "最新事件", value: topDate.value.slice(5), unit: "" },
]);

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

/** 榜单最高热度，用于条形图归一化（全榜统一，跨页可比较） */
const maxHeat = computed(() => Math.max(...list.value.map((i) => i.heat), 1));

/** 换行安全的日期格式：09-29 */
const shortDate = (date: string) => date.slice(5);

/** 列表序号：浏览态跨页连续编号（1、2、3…），搜索态从 1 重新编号 */
const rowNo = (i: number) => (isSearching.value ? i + 1 : pageStartIndex.value + i + 1);
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

    <!-- ===== 搜索框 ===== -->
    <div class="hot-rank__toolbar">
      <div class="hot-rank__search">
        <svg class="hot-rank__search-icon" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="6.8" cy="6.8" r="4.4" fill="none" stroke="currentColor" stroke-width="1.4" />
          <path
            d="M10.1 10.1 14 14"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </svg>
        <input
          v-model="keyword"
          class="hot-rank__search-input"
          type="search"
          aria-label="搜索热点"
          placeholder="搜索热点：机构 / 模型 / 类别，如 Gemini、Anthropic、安全，可用空格组合多个词"
        />
        <button
          v-if="keyword"
          class="hot-rank__search-clear"
          type="button"
          aria-label="清除搜索"
          @click="keyword = ''"
        >
          ×
        </button>
      </div>
      <div class="hot-rank__toolbar-hint">
        <template v-if="isSearching">跨全部 {{ total }} 条命中 {{ searchResults.length }} 条</template>
        <template v-else>共 {{ total }} 条 · 每页最多 {{ PAGE_SIZE }} 条</template>
      </div>
    </div>

    <!-- ===== 分页控件（浏览态，顶部） ===== -->
    <div v-if="!isSearching && totalPages > 1" class="hot-rank__pager">
      <button
        class="hot-rank__pager-btn"
        type="button"
        :disabled="safePage === 0"
        @click="prevPage"
      >
        ← 上一页
      </button>
      <div class="hot-rank__pager-info">
        <span class="hot-rank__pager-page">第 {{ safePage + 1 }} / {{ totalPages }} 页</span>
        <span class="hot-rank__pager-range">{{ pageRange }} · {{ pageItems.length }} 条</span>
      </div>
      <button
        class="hot-rank__pager-btn"
        type="button"
        :disabled="safePage >= totalPages - 1"
        @click="nextPage"
      >
        下一页 →
      </button>
    </div>

    <!-- ===== 页码按钮（浏览态，可直接跳页） ===== -->
    <nav v-if="!isSearching && totalPages > 1" class="hot-rank__pages" aria-label="榜单分页">
      <template v-for="(t, i) in pageTokens" :key="`${t}-${i}`">
        <span v-if="t === 'gap'" class="hot-rank__pages-gap">…</span>
        <button
          v-else
          class="hot-rank__page-num"
          :class="{ 'is-active': t === safePage }"
          type="button"
          :aria-current="t === safePage ? 'page' : undefined"
          :aria-label="`第 ${t + 1} 页`"
          @click="goPage(t)"
        >
          {{ t + 1 }}
        </button>
      </template>
    </nav>

    <!-- ===== 搜索结果头（搜索态） ===== -->
    <div v-if="isSearching" class="hot-rank__search-head">
      <span>
        搜索「{{ keyword.trim() }}」，找到 <strong>{{ searchResults.length }}</strong> 条
      </span>
      <button class="hot-rank__link-btn" type="button" @click="keyword = ''">
        清除搜索，回到按周浏览
      </button>
    </div>

    <!-- ===== 榜单列表 ===== -->
    <ol v-if="visibleItems.length" class="hot-rank__list">
      <li v-for="(item, index) in visibleItems" :key="item.id" class="hot-rank__item">
        <a
          class="hot-rank__item-link"
          :href="item.sourceUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="hot-rank__item-head">
            <span class="hot-rank__index" :class="{ 'is-top': rowNo(index) <= 3 }">
              {{ String(rowNo(index)).padStart(2, "0") }}
            </span>

            <div class="hot-rank__item-main">
              <div class="hot-rank__item-title-row">
                <span class="hot-rank__item-title">
                  <template v-for="(seg, si) in highlight(item.title)" :key="si">
                    <mark v-if="seg.hit" class="hot-rank__hit">{{ seg.text }}</mark>
                    <template v-else>{{ seg.text }}</template>
                  </template>
                </span>
                <span
                  class="hot-rank__tag"
                  :style="{
                    color: categoryColors[item.category],
                    borderColor: categoryColors[item.category],
                  }"
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

    <p v-else class="hot-rank__empty">
      没有匹配的热点。换个关键词试试——可以搜机构（Anthropic）、模型（Gemini）、类别（安全对齐）。
    </p>

    <!-- ===== 底部分页（浏览态） ===== -->
    <div v-if="!isSearching && totalPages > 1" class="hot-rank__pager is-bottom">
      <button class="hot-rank__pager-btn" type="button" :disabled="safePage === 0" @click="prevPage">
        ← 上一页
      </button>
      <div class="hot-rank__pager-info">
        <span class="hot-rank__pager-page">第 {{ safePage + 1 }} / {{ totalPages }} 页</span>
      </div>
      <button
        class="hot-rank__pager-btn"
        type="button"
        :disabled="safePage >= totalPages - 1"
        @click="nextPage"
      >
        下一页 →
      </button>
    </div>

    <nav v-if="!isSearching && totalPages > 1" class="hot-rank__pages is-bottom" aria-label="榜单分页">
      <template v-for="(t, i) in pageTokens" :key="`bottom-${t}-${i}`">
        <span v-if="t === 'gap'" class="hot-rank__pages-gap">…</span>
        <button
          v-else
          class="hot-rank__page-num"
          :class="{ 'is-active': t === safePage }"
          type="button"
          :aria-label="`第 ${t + 1} 页`"
          @click="goPage(t)"
        >
          {{ t + 1 }}
        </button>
      </template>
    </nav>

    <div class="hot-rank__legend">
      <span class="hot-rank__legend-item"><i class="is-exact"></i>直达原文：链接直达具体官方公告页</span>
      <span class="hot-rank__legend-item"><i class="is-section"></i>官方栏目页：内容真实，需在列表内定位</span>
      <span class="hot-rank__legend-item"><i class="is-homepage"></i>官方站点：该来源的入口地址</span>
    </div>

    <p class="hot-rank__note">
      排序规则：<strong>按事件日期降序</strong>（最新在最上），同一天内按热度降序；前台<strong>每页最多 5 条</strong>分页，可用「上一页 / 下一页」或页码按钮跳转，搜索可跨全部记录检索。
      热度为站内指数（权威等级 × 事件量级 × 跨信源印证数折算），非平台真实播放量，仅用于同日内排序与条形图可视化。
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
    grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
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

  /* ---------- 搜索框 ---------- */
  &__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem 1rem;
    margin-bottom: 1rem;
  }

  &__search {
    position: relative;
    display: flex;
    flex: 1 1 22rem;
    align-items: center;
    min-width: 0;
    padding: 0 0.65rem;
    border: 1px solid var(--hr-border);
    border-radius: 8px;
    background: var(--vp-c-bg, #fff);
    transition: border-color 0.2s;

    &:focus-within {
      border-color: var(--hr-accent);
    }
  }

  &__search-icon {
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
    color: var(--hr-text-soft);
  }

  &__search-input {
    flex: 1 1 auto;
    min-width: 0;
    padding: 0.5rem;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 0.86rem;

    &::placeholder {
      color: var(--hr-text-soft);
      opacity: 0.85;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  &__search-clear {
    flex: 0 0 auto;
    padding: 0 0.25rem;
    border: none;
    background: transparent;
    color: var(--hr-text-soft);
    font-size: 1.15rem;
    line-height: 1;
    cursor: pointer;

    &:hover {
      color: var(--hr-accent);
    }
  }

  &__toolbar-hint {
    flex: 0 0 auto;
    color: var(--hr-text-soft);
    font-size: 0.76rem;
  }

  /* ---------- 分页控件 ---------- */
  &__pager {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin: 0 0 0.85rem;
    padding: 0.5rem 0.7rem;
    border: 1px solid var(--hr-border);
    border-radius: 10px;
    background: var(--hr-bg-soft);

    &.is-bottom {
      margin: 1rem 0 0;
    }
  }

  &__pager-btn {
    flex: 0 0 auto;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--hr-border);
    border-radius: 6px;
    background: var(--vp-c-bg, #fff);
    color: inherit;
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition:
      border-color 0.2s,
      color 0.2s;

    &:hover:not(:disabled) {
      border-color: var(--hr-accent);
      color: var(--hr-accent);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__pager-info {
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: center;
    gap: 0.15rem 0.7rem;
    min-width: 0;
    font-size: 0.78rem;
    text-align: center;
  }

  &__pager-page {
    font-weight: 600;
  }

  &__pager-range {
    color: var(--hr-text-soft);
    font-variant-numeric: tabular-nums;
  }

  /* ---------- 页码按钮 ---------- */
  &__pages {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 1.1rem;

    &.is-bottom {
      margin: 0.85rem 0 0;
    }
  }

  &__page-num {
    min-width: 2rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--hr-border);
    border-radius: 6px;
    background: var(--vp-c-bg, #fff);
    color: inherit;
    font-family: inherit;
    font-size: 0.78rem;
    font-variant-numeric: tabular-nums;
    line-height: 1.6;
    cursor: pointer;
    transition:
      border-color 0.2s,
      color 0.2s,
      background 0.2s;

    &:hover {
      border-color: var(--hr-accent);
      color: var(--hr-accent);
    }

    &.is-active {
      border-color: var(--hr-accent);
      background: var(--hr-accent);
      color: #fff;
    }
  }

  &__pages-gap {
    padding: 0 0.15rem;
    color: var(--hr-text-soft);
    font-size: 0.78rem;
  }

  /* ---------- 搜索结果头 ---------- */
  &__search-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem 0.9rem;
    margin-bottom: 0.9rem;
    padding: 0.55rem 0.8rem;
    border-left: 3px solid var(--hr-accent);
    border-radius: 0 6px 6px 0;
    background: var(--hr-bg-soft);
    font-size: 0.82rem;

    strong {
      color: var(--hr-accent);
    }
  }

  &__link-btn {
    padding: 0;
    border: none;
    background: transparent;
    color: var(--hr-accent);
    font-family: inherit;
    font-size: 0.78rem;
    text-decoration: underline;
    cursor: pointer;
  }

  /* ---------- 空态 ---------- */
  &__empty {
    margin: 1.25rem 0;
    padding: 1.5rem 1rem;
    border: 1px dashed var(--hr-border);
    border-radius: 10px;
    color: var(--hr-text-soft);
    font-size: 0.85rem;
    text-align: center;
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

  &__hit {
    padding: 0 0.12em;
    border-radius: 3px;
    background: color-mix(in srgb, var(--hr-accent) 26%, transparent);
    color: inherit;
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

  .hot-rank__pager {
    flex-wrap: wrap;
  }

  .hot-rank__pager-info {
    order: -1;
    flex-basis: 100%;
  }
}
</style>

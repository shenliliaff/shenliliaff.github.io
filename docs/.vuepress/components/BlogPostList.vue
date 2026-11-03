<script setup lang="ts">
import { computed } from "vue";
import { blogPosts } from "../data/blog-posts.js";

/**
 * /blog/ 文章列表：按月折叠，月内按周折叠。
 * 数据来自 scripts/prepare-blog.mjs 生成的 blog-posts.ts（已按日期降序）。
 * 默认展开「最新月份 + 该月第 1 周」，其余收起，避免页面越滚越长。
 */

type Post = (typeof blogPosts)[number];

interface WeekGroup {
  key: string;
  label: string;
  range: string;
  items: (Post & { no: number })[];
}

interface MonthGroup {
  key: string;
  label: string;
  count: number;
  weeks: WeekGroup[];
}

/** 按「日」把一个月切成 5 周桶：1-7 / 8-14 / 15-21 / 22-28 / 29-31 */
const weekBucket = (day: number) => Math.min(Math.floor((day - 1) / 7) + 1, 5);

const pad = (n: number) => String(n).padStart(2, "0");

const groups = computed<MonthGroup[]>(() => {
  const months = new Map<string, MonthGroup>();

  blogPosts.forEach((post, index) => {
    const [year, month, day] = post.date.split("-").map(Number);
    const monthKey = `${year}-${pad(month)}`;
    const bucket = weekBucket(day);
    const weekKey = `${monthKey}-w${bucket}`;

    let monthGroup = months.get(monthKey);
    if (!monthGroup) {
      monthGroup = { key: monthKey, label: `${year} 年 ${month} 月`, count: 0, weeks: [] };
      months.set(monthKey, monthGroup);
    }

    let weekGroup = monthGroup.weeks.find((w) => w.key === weekKey);
    if (!weekGroup) {
      const startDay = (bucket - 1) * 7 + 1;
      const endDay = Math.min(bucket * 7, new Date(year, month, 0).getDate());
      weekGroup = {
        key: weekKey,
        label: `第 ${bucket} 周`,
        range: `${pad(month)}-${pad(startDay)} ~ ${pad(month)}-${pad(endDay)}`,
        items: [],
      };
      monthGroup.weeks.push(weekGroup);
    }

    weekGroup.items.push({ ...post, no: index + 1 });
    monthGroup.count += 1;
  });

  return [...months.values()];
});

const total = computed(() => blogPosts.length);
</script>

<template>
  <div class="post-list">
    <p class="post-list__summary">共 {{ total }} 篇 · 按月份折叠，点开月份可看周内文章</p>

    <details
      v-for="(month, mi) in groups"
      :key="month.key"
      class="post-list__month"
      :open="mi === 0"
    >
      <summary class="post-list__month-head">
        <span class="post-list__month-name">{{ month.label }}</span>
        <span class="post-list__count">{{ month.count }} 篇</span>
        <span class="post-list__chevron" aria-hidden="true">›</span>
      </summary>

      <div class="post-list__weeks">
        <details
          v-for="(week, wi) in month.weeks"
          :key="week.key"
          class="post-list__week"
          :open="mi === 0 && wi === 0"
        >
          <summary class="post-list__week-head">
            <span class="post-list__week-name">{{ week.label }}</span>
            <span class="post-list__week-range">{{ week.range }}</span>
            <span class="post-list__count">{{ week.items.length }} 篇</span>
          </summary>

          <ol class="post-list__items">
            <li v-for="post in week.items" :key="post.url" class="post-list__item">
              <a class="post-list__link" :href="post.url">
                <span class="post-list__no">{{ String(post.no).padStart(2, "0") }}</span>
                <span class="post-list__date">{{ post.date }}</span>
                <span class="post-list__title">{{ post.title }}</span>
              </a>
            </li>
          </ol>
        </details>
      </div>
    </details>
  </div>
</template>

<style lang="scss">
.post-list {
  --pl-border: var(--vp-c-border, #e5e7eb);
  --pl-bg-soft: var(--vp-c-bg-soft, #f7f8fa);
  --pl-text-soft: var(--vp-c-text-mute, #6b7280);
  --pl-accent: #3eaf7c;
  margin: 0.5rem 0 1.5rem;

  &__summary {
    margin: 0 0 0.75rem;
    color: var(--pl-text-soft);
    font-size: 0.82rem;
  }

  &__month {
    margin-bottom: 0.6rem;
    border: 1px solid var(--pl-border);
    border-radius: 10px;
    background: var(--vp-c-bg, #fff);
    overflow: hidden;

    &[open] {
      background: var(--vp-c-bg, #fff);
    }
  }

  &__month-head,
  &__week-head {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 0.7rem 0.9rem;
    cursor: pointer;
    list-style: none;
    user-select: none;

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      background: var(--pl-bg-soft);
    }
  }

  &__month-head {
    background: var(--pl-bg-soft);
    font-weight: 600;
  }

  &__month-name {
    flex: 1 1 auto;
    font-size: 0.95rem;
  }

  &__chevron {
    color: var(--pl-text-soft);
    font-size: 1rem;
    transition: transform 0.2s;
  }

  &__month[open] > &__month-head &__chevron {
    transform: rotate(90deg);
  }

  &__count {
    flex: 0 0 auto;
    padding: 0.05rem 0.45rem;
    border-radius: 999px;
    background: rgba(62, 175, 124, 0.12);
    color: var(--pl-accent);
    font-size: 0.72rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  &__weeks {
    padding: 0.35rem 0.6rem 0.6rem;
  }

  &__week {
    border-top: 1px dashed var(--pl-border);

    &:first-child {
      border-top: none;
    }
  }

  &__week-head {
    font-size: 0.85rem;
  }

  &__week-name {
    flex: 0 0 auto;
    color: var(--pl-accent);
    font-weight: 600;
  }

  &__week-range {
    flex: 1 1 auto;
    color: var(--pl-text-soft);
    font-size: 0.76rem;
    font-variant-numeric: tabular-nums;
  }

  &__items {
    margin: 0 0 0.4rem;
    padding: 0 0 0 0.4rem;
    list-style: none;
  }

  &__item {
    border-top: 1px solid var(--pl-border);
  }

  &__link {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.55rem 0.25rem;
    color: inherit;
    text-decoration: none !important;
    transition: background 0.2s;
  }

  &__link:hover {
    background: var(--pl-bg-soft);
  }

  &__no {
    flex: 0 0 auto;
    min-width: 1.6rem;
    color: var(--pl-text-soft);
    font-weight: 700;
    font-size: 0.78rem;
    font-variant-numeric: tabular-nums;
  }

  &__date {
    flex: 0 0 auto;
    color: var(--pl-accent);
    font-size: 0.78rem;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }

  &__title {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 0.92rem;
    line-height: 1.6;
  }

  &__link:hover &__title {
    color: var(--pl-accent);
  }
}

@media (width <= 719px) {
  .post-list {
    &__link {
      flex-wrap: wrap;
      gap: 0.15rem 0.6rem;
    }

    &__title {
      flex: 1 1 100%;
    }

    &__week-range {
      display: none;
    }
  }
}
</style>

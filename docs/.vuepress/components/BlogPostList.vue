<script setup lang="ts">
import { ref } from "vue";
import { blogPosts } from "../data/blog-posts.js";

/**
 * /blog/ 文章列表：按月折叠，月内按日历周（周一 ~ 周日）折叠。
 * 数据来自 scripts/prepare-blog.mjs 生成的 blog-posts.ts（已按日期降序）。
 *
 * 三条体验规则：
 * 1. 展开某个月份时，若该月没有展开的周，自动展开最新的一周；
 * 2. 某月只有一个周时，不再套一层折叠，直接铺开文章；
 * 3. 「周」按真实日历周（周一至周日）切分，跨月的周会在两个月份里各出现一次，
 *    各自只含本月的文章，并标注「跨月」。
 */

type Post = (typeof blogPosts)[number];

interface WeekGroup {
  /** 周一日期 YYYY-MM-DD，用于排序与跨月识别 */
  key: string;
  /** 月内第几周（按时间升序编号） */
  no: number;
  label: string;
  range: string;
  crossMonth: boolean;
  items: (Post & { no: number })[];
}

interface MonthGroup {
  key: string;
  label: string;
  count: number;
  weeks: WeekGroup[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** 取某天所在日历周的周一与周日 */
const weekOf = (year: number, month: number, day: number) => {
  const dt = new Date(year, month - 1, day);
  const offset = (dt.getDay() + 6) % 7; // 周一 = 0，周日 = 6
  const monday = new Date(dt);
  monday.setDate(dt.getDate() - offset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { monday, sunday };
};

const buildGroups = (): MonthGroup[] => {
  const months = new Map<string, MonthGroup>();

  blogPosts.forEach((post, index) => {
    const [year, month, day] = post.date.split("-").map(Number);
    const monthKey = `${year}-${pad(month)}`;

    let monthGroup = months.get(monthKey);
    if (!monthGroup) {
      monthGroup = { key: monthKey, label: `${year} 年 ${month} 月`, count: 0, weeks: [] };
      months.set(monthKey, monthGroup);
    }

    const { monday, sunday } = weekOf(year, month, day);
    const weekKey = iso(monday);

    let weekGroup = monthGroup.weeks.find((w) => w.key === weekKey);
    if (!weekGroup) {
      weekGroup = {
        key: weekKey,
        no: 0,
        label: "",
        range: `${pad(monday.getMonth() + 1)}-${pad(monday.getDate())} ~ ${pad(sunday.getMonth() + 1)}-${pad(sunday.getDate())}`,
        crossMonth: monday.getMonth() !== sunday.getMonth(),
        items: [],
      };
      monthGroup.weeks.push(weekGroup);
    }

    weekGroup.items.push({ ...post, no: index + 1 });
    monthGroup.count += 1;
  });

  const result = [...months.values()];

  result.forEach((monthGroup) => {
    // 先按时间升序编号，再倒序展示（最新的一周在最上面）
    monthGroup.weeks.sort((a, b) => a.key.localeCompare(b.key));
    monthGroup.weeks.forEach((week, i) => {
      week.no = i + 1;
      week.label = `第 ${i + 1} 周`;
    });
    monthGroup.weeks.reverse();
  });

  return result;
};

const groups = buildGroups();

/** 折叠状态：key 用「月份索引::周一日期」，避免跨月周在两个月份间串状态 */
const weekStateKey = (mi: number, weekKey: string) => `${mi}::${weekKey}`;

const monthOpen = ref<boolean[]>(groups.map((_, i) => i === 0));
const weekOpen = ref<Record<string, boolean>>({});

// 默认展开最新月份的最新一周（单周月份无需状态，恒为展开）
if (groups[0] && groups[0].weeks.length > 1) {
  weekOpen.value[weekStateKey(0, groups[0].weeks[0].key)] = true;
}

const onMonthToggle = (event: Event, mi: number) => {
  const el = event.target as HTMLDetailsElement;
  if (el.open === monthOpen.value[mi]) return; // 由状态同步触发的 toggle，忽略

  monthOpen.value[mi] = el.open;
  if (!el.open) return;

  // 体验点 1：展开月份时，若该月没有任何展开的周，自动展开最新一周
  const month = groups[mi];
  if (month.weeks.length <= 1) return;
  const hasOpenWeek = month.weeks.some((w) => weekOpen.value[weekStateKey(mi, w.key)]);
  if (!hasOpenWeek) weekOpen.value[weekStateKey(mi, month.weeks[0].key)] = true;
};

const onWeekToggle = (event: Event, mi: number, weekKey: string) => {
  const el = event.target as HTMLDetailsElement;
  const key = weekStateKey(mi, weekKey);
  if (el.open === !!weekOpen.value[key]) return; // 状态同步触发，忽略
  weekOpen.value[key] = el.open;
};

const total = blogPosts.length;
</script>

<template>
  <div class="post-list">
    <p class="post-list__summary">共 {{ total }} 篇 · 按月份折叠，月内按周折叠（周一至周日）</p>

    <details
      v-for="(month, mi) in groups"
      :key="month.key"
      class="post-list__month"
      :open="monthOpen[mi]"
      @toggle="onMonthToggle($event, mi)"
    >
      <summary class="post-list__month-head">
        <span class="post-list__month-name">{{ month.label }}</span>
        <span class="post-list__count">{{ month.count }} 篇</span>
        <span class="post-list__chevron" aria-hidden="true">›</span>
      </summary>

      <div class="post-list__weeks">
        <details
          v-for="week in month.weeks"
          :key="week.key"
          class="post-list__week"
          :class="{ 'post-list__week--single': month.weeks.length === 1 }"
          :open="month.weeks.length === 1 ? true : !!weekOpen[weekStateKey(mi, week.key)]"
          @toggle="onWeekToggle($event, mi, week.key)"
        >
          <summary class="post-list__week-head">
            <span class="post-list__week-name">{{ week.label }}</span>
            <span class="post-list__week-range">{{ week.range }}</span>
            <span v-if="week.crossMonth" class="post-list__cross">跨月</span>
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

  /* 体验点 2：单周月份直接铺开文章，隐藏这层「第 1 周」的折叠头 */
  &__week--single {
    border-top: none;

    > .post-list__week-head {
      display: none;
    }

    > .post-list__items {
      margin-top: 0.35rem;
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

  &__cross {
    flex: 0 0 auto;
    padding: 0 0.35rem;
    border: 1px solid var(--pl-border);
    border-radius: 4px;
    color: var(--pl-text-soft);
    font-size: 0.68rem;
    line-height: 1.4;
  }

  &__items {
    margin: 0 0 0.4rem;
    padding: 0 0 0 0.4rem;
    list-style: none;
  }

  &__item {
    border-top: 1px solid var(--pl-border);

    &:first-child {
      border-top: none;
    }
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

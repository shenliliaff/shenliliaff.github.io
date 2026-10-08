<script setup lang="ts">
import { computed, ref } from "vue";
import { blogPosts } from "../data/blog-posts.js";

/**
 * /blog/ 文章列表：每页最多 5 篇，可用「上一页 / 下一页」或页码按钮翻页。
 * 数据来自 scripts/prepare-blog.mjs 生成的 blog-posts.ts（已按日期降序）。
 * 注：这里只做展示，真正的「最新在上」排序在生成阶段完成，保证与侧边栏口径一致。
 */

/** 每页最多篇数 */
const PAGE_SIZE = 5;

const page = ref(0);
const total = computed(() => blogPosts.length);
const totalPages = computed(() => Math.max(Math.ceil(total.value / PAGE_SIZE), 1));
/** 兜底：数据变化时页码不越界 */
const safePage = computed(() => Math.min(page.value, totalPages.value - 1));

const pageItems = computed(() => {
  const start = safePage.value * PAGE_SIZE;
  return blogPosts.slice(start, start + PAGE_SIZE);
});

/** 当前页首篇的全局序号，用于列表编号 */
const pageStart = computed(() => safePage.value * PAGE_SIZE);

const goPage = (i: number) => {
  page.value = Math.min(Math.max(i, 0), totalPages.value - 1);
};

/** 页码按钮序列：页数少时全铺开，页数多时保留首尾与当前页左右一页，中间折成省略号 */
const pageTokens = computed<(number | "gap")[]>(() => {
  const last = totalPages.value - 1;
  if (totalPages.value <= 7) return Array.from({ length: totalPages.value }, (_, i) => i);

  const keep = new Set<number>([0, last, safePage.value - 1, safePage.value, safePage.value + 1]);
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
</script>

<template>
  <div class="post-list">
    <ol class="post-list__items">
      <li v-for="(post, i) in pageItems" :key="post.url" class="post-list__item">
        <a class="post-list__link" :href="post.url">
          <span class="post-list__no">{{ String(pageStart + i + 1).padStart(2, "0") }}</span>
          <span class="post-list__date">{{ post.date }}</span>
          <span class="post-list__title">{{ post.title }}</span>
        </a>
      </li>
    </ol>

    <div v-if="totalPages > 1" class="post-list__pager">
      <button
        class="post-list__btn"
        type="button"
        :disabled="safePage === 0"
        @click="goPage(safePage - 1)"
      >
        ← 上一页
      </button>
      <span class="post-list__info">
        第 {{ safePage + 1 }} / {{ totalPages }} 页 · 共 {{ total }} 篇
      </span>
      <button
        class="post-list__btn"
        type="button"
        :disabled="safePage >= totalPages - 1"
        @click="goPage(safePage + 1)"
      >
        下一页 →
      </button>
    </div>

    <nav v-if="totalPages > 1" class="post-list__pages" aria-label="文章分页">
      <template v-for="(t, i) in pageTokens" :key="`${t}-${i}`">
        <span v-if="t === 'gap'" class="post-list__gap">…</span>
        <button
          v-else
          class="post-list__num"
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
  </div>
</template>

<style lang="scss">
.post-list {
  --pl-border: var(--vp-c-border, #e5e7eb);
  --pl-bg-soft: var(--vp-c-bg-soft, #f7f8fa);
  --pl-text-soft: var(--vp-c-text-mute, #6b7280);
  --pl-accent: #3eaf7c;
  margin: 0.5rem 0 1.5rem;

  &__items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    border-bottom: 1px solid var(--pl-border);

    &:first-child {
      border-top: 1px solid var(--pl-border);
    }
  }

  &__link {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.7rem 0.25rem;
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
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
  }

  &__date {
    flex: 0 0 auto;
    color: var(--pl-accent);
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }

  &__title {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  &__link:hover &__title {
    color: var(--pl-accent);
  }

  &__pager {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem 0.75rem;
    margin-top: 1rem;
    padding: 0.5rem 0.7rem;
    border: 1px solid var(--pl-border);
    border-radius: 10px;
    background: var(--pl-bg-soft);
  }

  &__btn {
    flex: 0 0 auto;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--pl-border);
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
      border-color: var(--pl-accent);
      color: var(--pl-accent);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__info {
    flex: 1 1 auto;
    color: var(--pl-text-soft);
    font-size: 0.78rem;
    text-align: center;
  }

  &__pages {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.85rem;
  }

  &__num {
    min-width: 2rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--pl-border);
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
      border-color: var(--pl-accent);
      color: var(--pl-accent);
    }

    &.is-active {
      border-color: var(--pl-accent);
      background: var(--pl-accent);
      color: #fff;
    }
  }

  &__gap {
    padding: 0 0.15rem;
    color: var(--pl-text-soft);
    font-size: 0.78rem;
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

    &__pager {
      justify-content: center;
    }

    &__info {
      order: -1;
      flex-basis: 100%;
    }
  }
}
</style>

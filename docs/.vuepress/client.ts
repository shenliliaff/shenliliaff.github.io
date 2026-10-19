import { defineClientConfig } from "vuepress/client";
import { onMounted, onUnmounted } from "vue";

import BlogPostList from "./components/BlogPostList.vue";
import HotRanking from "./components/HotRanking.vue";
import HotRankingEntry from "./components/HotRankingEntry.vue";

export default defineClientConfig({
	// 全局注册自定义组件，Markdown 中可直接写 <HotRanking /> / <HotRankingEntry /> / <BlogPostList />
	enhance({ app }) {
		app.component("HotRanking", HotRanking);
		app.component("HotRankingEntry", HotRankingEntry);
		app.component("BlogPostList", BlogPostList);
	},
	setup() {
		const openReadingApp = (event: MouseEvent) => {
			if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

			const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href="/reading/"], a[href="/reading/index.html"]') : null;

			if (!link || (link.target && link.target !== "_self")) return;

			event.preventDefault();
			window.location.assign(new URL("/reading/index.html", window.location.origin));
		};
		const openSearch = (event: KeyboardEvent) => {
			if (event.defaultPrevented || event.altKey || event.shiftKey || !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;

			const searchButton = document.querySelector<HTMLButtonElement>(".slimsearch-button");

			if (searchButton) {
				event.preventDefault();
				searchButton.click();
			}
		};

		const injectMailHint = () => {
			// 在评论区（giscus）上方加「留言邮箱」入口，方便不愿注册 GitHub 的访客
			const commentEl = document.querySelector<HTMLElement>("#comment");
			if (!commentEl) return;
			if (commentEl.querySelector(".mail-comment-hint")) return;

			const hint = document.createElement("div");
			hint.className = "mail-comment-hint";
			hint.style.cssText =
				"margin: 8px 0 16px; padding: 10px 14px; border: 1px solid var(--border-color, #eaecef); " +
				"border-radius: 8px; font-size: 0.9rem; color: var(--text-color-lighter, #666); " +
				"background: var(--bg-color-secondary, #f6f8fa);";
			const link = document.createElement("a");
			link.href = "mailto:anfng@schaeffler.com?subject=博客留言";
			link.textContent = "给我发邮件留言";
			link.style.cssText = "font-weight: 600; text-decoration: none;";
			hint.appendChild(document.createTextNode("不想注册 GitHub？也可以 "));
			hint.appendChild(link);
			hint.appendChild(document.createTextNode("，我会收到你的反馈。"));
			commentEl.parentElement?.insertBefore(hint, commentEl);
		};

		onMounted(() => {
			document.addEventListener("click", openReadingApp, true);
			document.addEventListener("keydown", openSearch);
			// 评论组件为懒加载，轮询注入留言邮箱提示牌（最多等 8 秒）
			let tries = 0;
			const timer = window.setInterval(() => {
				tries++;
				injectMailHint();
				if (tries >= 16) window.clearInterval(timer);
			}, 500);
		});
		onUnmounted(() => {
			document.removeEventListener("click", openReadingApp, true);
			document.removeEventListener("keydown", openSearch);
		});
	},
});

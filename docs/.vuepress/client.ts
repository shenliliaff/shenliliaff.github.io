import { defineClientConfig } from "vuepress/client";
import { onMounted, onUnmounted } from "vue";

// Waline 的基础样式表。替换了 plugin-comment 的默认评论组件后，
// 原有的 import 也一起没了，缺了它评论区会退化成无样式的裸 DOM
// （表情全铺开、输入框变原生控件）。必须在客户端入口重新引入。
import "@waline/client/waline.css";
// 评论者头像 / 表情图标用的图标字体
import "@waline/client/waline-meta.css";

import BlogPostList from "./components/BlogPostList.vue";
import HotRanking from "./components/HotRanking.vue";
import HotRankingEntry from "./components/HotRankingEntry.vue";
import SongPlayer from "./components/SongPlayer.vue";
import BiliPlayer from "./components/BiliPlayer.vue";
import QQMusicBar from "./components/QQMusicBar.vue";

export default defineClientConfig({
	// 全局注册自定义组件，Markdown 中可直接写 <HotRanking /> / <HotRankingEntry /> / <BlogPostList /> / <SongPlayer /> / <BiliPlayer /> / <QQMusicBar />
	enhance({ app }) {
		app.component("HotRanking", HotRanking);
		app.component("HotRankingEntry", HotRankingEntry);
		app.component("BlogPostList", BlogPostList);
		app.component("SongPlayer", SongPlayer);
		app.component("BiliPlayer", BiliPlayer);
		app.component("QQMusicBar", QQMusicBar);
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

		onMounted(() => {
			document.addEventListener("click", openReadingApp, true);
			document.addEventListener("keydown", openSearch);
		});
		onUnmounted(() => {
			document.removeEventListener("click", openReadingApp, true);
			document.removeEventListener("keydown", openSearch);
		});
	},
});

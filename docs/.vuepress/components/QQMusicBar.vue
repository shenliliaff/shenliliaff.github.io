<template>
	<div class="qmb" :class="{ expanded }">
		<div class="qmb-head">
			<span class="qmb-name">{{ label }}</span>
			<button class="qmb-toggle" type="button" @click="toggle">
				{{ expanded ? "收起" : "登录 / 展开" }}
			</button>
		</div>

		<iframe
			:key="`${expanded}-${reloadKey}`"
			:src="src"
			:title="`QQ 音乐 · ${label}`"
			frameborder="0"
			:scrolling="expanded ? 'yes' : 'no'"
			allow="autoplay"
			loading="lazy"
		></iframe>

		<div class="qmb-tip">
			<template v-if="expanded">
				在面板里登录后即可完整播放、拖动进度条
			</template>
			<template v-else>
				完整播放 · 拖动进度条 需 QQ 音乐会员
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * QQ 音乐播放器：迷你条 + 可展开的完整页。
 *
 * 为什么必须"展开"才能在页面里登录：
 *   迷你条嵌的是 i.y.qq.com 的 outchain 播放器，它自己没有登录入口；
 *   如果在外部新窗口登录，回到页面时 iframe 里的 y.qq.com 属于第三方上下文，
 *   Chrome / Safari 默认不发送第三方 cookie，播放器读不到登录态，表现为"登录了还是听不了"。
 *   所以登录和播放必须发生在同一个 iframe 内——展开后加载的就是 y.qq.com 自己的页面，
 *   在里面点登录、扫码、播放，全在第一方上下文完成，不存在 cookie 共享问题。
 *
 * 用法：<QQMusicBar songid="231594573" label="出现又离开 · 梁博" />
 * songid 是数字 id，不是 mid。
 */
const props = withDefaults(
	defineProps<{
		songid: string | number;
		label?: string;
	}>(),
	{ label: "音乐" },
);

const expanded = ref(false);
const reloadKey = ref(0);

/** 迷你态：官方外链播放器（66px）*/
const miniSrc = computed(
	() => `https://i.y.qq.com/n2/m/outchain/player/index.html?songid=${props.songid}&songtype=0`,
);

/** 展开态：完整歌曲页，含登录入口与可拖动的进度条 */
const fullSrc = computed(() => `https://y.qq.com/n/ryqq/songDetail/${props.songid}`);

const src = computed(() => (expanded.value ? fullSrc.value : miniSrc.value));

function toggle() {
	expanded.value = !expanded.value;
	// 每次展开都重新加载，避免停留在旧的未登录页面
	if (expanded.value) reloadKey.value += 1;
}
</script>

<style scoped>
.qmb {
	position: fixed;
	right: 20px;
	bottom: 20px;
	z-index: 60;
	width: 340px;
	max-width: calc(100vw - 24px);
	border-radius: 12px;
	overflow: hidden;
	background: #fcfcfc;
	box-shadow: 0 6px 26px rgb(0 0 0 / 14%);
	isolation: isolate;
	transition: width 0.18s ease;
}

.qmb.expanded {
	width: 430px;
}

.qmb-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	padding: 6px 10px;
	border-bottom: 1px solid rgb(0 0 0 / 6%);
}

.qmb-name {
	font-size: 12px;
	color: rgb(0 0 0 / 55%);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.qmb-toggle {
	flex: none;
	border: 1px solid rgb(0 0 0 / 10%);
	background: #fff;
	color: #31c27c;
	border-radius: 999px;
	padding: 2px 10px;
	font-size: 11.5px;
	cursor: pointer;
}

.qmb-toggle:hover {
	border-color: #31c27c;
}

.qmb iframe {
	display: block;
	width: 100%;
	height: 66px;
	border: 0;
}

.qmb.expanded iframe {
	height: 560px;
}

.qmb-tip {
	padding: 5px 10px 6px;
	border-top: 1px solid rgb(0 0 0 / 6%);
	font-size: 11.5px;
	line-height: 1.45;
	color: rgb(0 0 0 / 45%);
}

@media (max-width: 719px) {
	.qmb,
	.qmb.expanded {
		left: 12px;
		right: 12px;
		bottom: 12px;
		width: auto;
		max-width: none;
	}

	.qmb.expanded iframe {
		height: 520px;
	}
}
</style>

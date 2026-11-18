<template>
	<div class="bp">
		<div class="bp-frame">
			<iframe
				:src="src"
				title="B站播放器"
				frameborder="0"
				scrolling="no"
				allow="autoplay; fullscreen; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>
		<p v-if="caption" class="bp-caption">{{ caption }}</p>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * B 站官方 iframe 播放器。
 *
 * 为什么用它：网易云/QQ 音乐的音频直链要么需要 VIP、要么要 vkey 会过期，
 * 拿不到稳定的可播放地址；B 站官方提供可嵌入的播放器，国内直连，
 * 视频背后的音轨就是原曲，能直接听到。
 *
 * 用法：在 Markdown 里写 <BiliPlayer bvid="BV1yo4y1i7fq" caption="梁博 · 出现又离开" />
 */
const props = withDefaults(
	defineProps<{
		/** 视频 BV 号 */
		bvid: string;
		/** 播放器下方的小字说明 */
		caption?: string;
		/** 是否默认静音（浏览器自动播放策略） */
		muted?: boolean;
	}>(),
	{ caption: "", muted: false },
);

const src = computed(() => {
	const params = new URLSearchParams({
		bvid: props.bvid,
		page: "1",
		high_quality: "1",
		danmaku: "0",
		autoplay: "0",
	});
	if (props.muted) params.set("muted", "1");
	return `https://player.bilibili.com/player.html?${params.toString()}`;
});
</script>

<style scoped>
.bp {
	margin: 22px 0 24px;
}

.bp-frame {
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9;
	border-radius: 12px;
	overflow: hidden;
	background: #000;
	border: 1px solid var(--vp-c-border, #e4e4e7);
}

.bp-frame iframe {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	border: 0;
}

.bp-caption {
	margin: 8px 0 0;
	font-size: 12px;
	color: var(--vp-c-text-mute, #8a8a8a);
}
</style>

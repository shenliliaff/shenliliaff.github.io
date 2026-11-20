<template>
	<div class="qmb">
		<button class="qmb-main" type="button" @click="openPlayer" :aria-label="`在 QQ 音乐播放 ${label}`">
			<span class="qmb-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="15" height="15">
					<path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
				</svg>
			</span>
			<span class="qmb-meta">
				<span class="qmb-title">{{ label }}</span>
				<span class="qmb-sub">{{ opened ? "已在小窗打开" : "QQ 音乐 · 完整播放" }}</span>
			</span>
			<span class="qmb-cta">{{ opened ? "再开一个" : "播放" }}</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**
 * QQ 音乐播放入口：点一下弹居中小窗，在窗内登录与播放。
 *
 * 为什么不嵌 iframe：QQ 音乐登录靠 y.qq.com 的 cookie，而本站里的 iframe
 * 属于第三方上下文，Chrome / Safari 默认不写入也不发送第三方 cookie，
 * 表现就是「扫码成功、刷新后又变成未登录、歌播不出来」。
 * 小窗是独立的第一方上下文，登录态能正常保存。
 *
 * 为什么不显示用户名：跨域读不到 iframe 的 DOM，也读不到 y.qq.com 的 cookie
 * （httpOnly + 跨域双重限制），QQ 音乐也没有给第三方查询当前用户的接口。
 * 这是浏览器的安全边界，不是配置问题。
 */
const props = withDefaults(
	defineProps<{
		songid: string | number;
		label?: string;
	}>(),
	{ label: "音乐" },
);

const opened = ref(false);
let winRef: Window | null = null;

function openPlayer() {
	const width = 480;
	const height = 720;
	const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
	const top = Math.round(window.screenY + (window.outerHeight - height) / 2);

	winRef = window.open(
		`https://y.qq.com/n/ryqq/songDetail/${props.songid}`,
		"qqmusic-player",
		`popup=yes,width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`,
	);

	// 被浏览器拦截时退化为当前页跳转，不让用户卡在原地
	if (!winRef) {
		window.location.href = `https://y.qq.com/n/ryqq/songDetail/${props.songid}`;
		return;
	}

	opened.value = true;

	const timer = window.setInterval(() => {
		if (winRef?.closed) {
			window.clearInterval(timer);
			opened.value = false;
		}
	}, 800);
}
</script>

<style scoped>
.qmb {
	position: fixed;
	right: 20px;
	bottom: 20px;
	z-index: 60;
	width: 268px;
	max-width: calc(100vw - 24px);
	border-radius: 14px;
	overflow: hidden;
	background: #fcfcfc;
	box-shadow: 0 6px 24px rgb(0 0 0 / 13%);
	isolation: isolate;
}

.qmb-main {
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
	padding: 10px 12px;
	border: 0;
	background: transparent;
	cursor: pointer;
	text-align: left;
	font: inherit;
	color: inherit;
}

.qmb-main:hover .qmb-cta {
	background: #2aad6c;
	color: #fff;
}

.qmb-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	flex: none;
	border-radius: 50%;
	background: #31c27c;
	color: #fff;
	transition: transform 0.12s;
}

.qmb-main:active .qmb-icon {
	transform: scale(0.94);
}

.qmb-meta {
	display: flex;
	flex-direction: column;
	min-width: 0;
	flex: 1;
	line-height: 1.3;
}

.qmb-title {
	font-size: 13px;
	font-weight: 500;
	color: rgb(0 0 0 / 82%);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.qmb-sub {
	font-size: 11.5px;
	color: rgb(0 0 0 / 42%);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.qmb-cta {
	flex: none;
	padding: 4px 12px;
	border-radius: 999px;
	background: rgb(49 194 124 / 12%);
	color: #2aad6c;
	font-size: 12px;
	transition: background 0.15s, color 0.15s;
}

@media (max-width: 719px) {
	.qmb {
		left: 12px;
		right: 12px;
		bottom: 12px;
		width: auto;
		max-width: none;
	}
}
</style>

<template>
	<div class="qmb">
		<iframe
			:key="reloadKey"
			:src="playerSrc"
			:title="`QQ 音乐 · ${label}`"
			frameborder="0"
			scrolling="no"
			allow="autoplay"
			loading="lazy"
		></iframe>

		<div class="qmb-tip">
			<span class="qmb-tip-text">{{ logged ? "已登录 · 点播放" : tipText }}</span>
			<button v-if="!logged" class="qmb-tip-btn" type="button" @click="openLogin">
				登录
				<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
					<path d="M8 5h11v11h-2V8.4l-8.3 8.3-1.4-1.4L15.6 7H8V5z" fill="currentColor" />
				</svg>
			</button>
			<button v-else class="qmb-tip-reset" type="button" @click="resetLogin" title="重新登录">
				重新登录
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

/**
 * QQ 音乐官方外链播放器 + 登录小窗。
 *
 * 播放器是公众号那套 i.y.qq.com/n2/m/outchain/player，66px，自带封面/歌名/进度条。
 * 它自己不带登录入口，而 y.qq.com 与 i.y.qq.com 同属 qq.com，登录态存在同一份 cookie 里，
 * 所以做法是：弹一个第一方小窗让你登录 y.qq.com，关窗后重建 iframe，
 * 播放器重新请求时就会带上新 cookie。
 *
 * 前提是浏览器允许第三方 cookie。若仍显示未登录，多半是 Chrome/Safari 开了
 * 「阻止第三方 Cookie」，需要在站点设置里放行一次，否则任何内嵌播放器都读不到登录态。
 */
const props = withDefaults(
	defineProps<{
		songid: string | number;
		label?: string;
	}>(),
	{ label: "音乐" },
);

const reloadKey = ref(0);
const tipText = ref("完整播放需 QQ 音乐会员");

/**
 * 登录标记。
 * 跨域读不到 iframe 内是否真的登录，只能以「用户点过登录、并且关掉了小窗」为准。
 * 存 localStorage，下次进来直接隐藏登录按钮，不再打扰。
 */
const LOGGED_KEY = "qqmusic-logged";
const logged = ref(false);

onMounted(() => {
	try {
		logged.value = localStorage.getItem(LOGGED_KEY) === "1";
	} catch {}
});

function markLogged() {
	logged.value = true;
	try {
		localStorage.setItem(LOGGED_KEY, "1");
	} catch {}
}

function resetLogin() {
	logged.value = false;
	try {
		localStorage.removeItem(LOGGED_KEY);
	} catch {}
	tipText.value = "完整播放需 QQ 音乐会员";
	openLogin();
}

/** 播放器地址；重建时带个时间戳，确保不吃中间层缓存 */
const playerSrc = computed(
	() =>
		`https://i.y.qq.com/n2/m/outchain/player/index.html?songid=${props.songid}&songtype=0&_r=${reloadKey.value}`,
);

function openLogin() {
	const width = 480;
	const height = 720;
	const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
	const top = Math.round(window.screenY + (window.outerHeight - height) / 2);

	const win = window.open(
		`https://y.qq.com/n/ryqq/songDetail/${props.songid}`,
		"qqmusic-login",
		`popup=yes,width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`,
	);

	if (!win) {
		tipText.value = "弹窗被拦了，请允许弹出窗口后重试";
		return;
	}

	tipText.value = "登录完成后关掉小窗，这里会自动刷新";

	// 用户关掉小窗 → 认为已登录：重建播放器让新 cookie 生效，并隐藏登录按钮
	const timer = window.setInterval(() => {
		if (win.closed) {
			window.clearInterval(timer);
			reloadKey.value += 1;
			markLogged();
			tipText.value = "已登录 · 点播放";
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
	width: 340px;
	max-width: calc(100vw - 24px);
	border-radius: 12px;
	overflow: hidden;
	background: #fcfcfc;
	box-shadow: 0 4px 20px rgb(0 0 0 / 12%);
	isolation: isolate;
}

.qmb iframe {
	display: block;
	width: 100%;
	height: 66px;
	border: 0;
}

.qmb-tip {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	padding: 5px 10px 6px;
	border-top: 1px solid rgb(0 0 0 / 6%);
	font-size: 11.5px;
	line-height: 1.4;
}

.qmb-tip-text {
	color: rgb(0 0 0 / 45%);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.qmb-tip-btn {
	display: inline-flex;
	align-items: center;
	gap: 2px;
	flex: none;
	border: 0;
	padding: 2px 8px;
	border-radius: 999px;
	background: rgb(49 194 124 / 12%);
	color: #2aad6c;
	font: inherit;
	font-size: 11.5px;
	cursor: pointer;
	transition: background 0.15s, color 0.15s;
}

.qmb-tip-btn:hover {
	background: #2aad6c;
	color: #fff;
}

/* 登录后只留一个极轻的文字入口，万一没登成功还能重来 */
.qmb-tip-reset {
	flex: none;
	border: 0;
	padding: 0;
	background: transparent;
	color: rgb(0 0 0 / 26%);
	font: inherit;
	font-size: 11px;
	cursor: pointer;
	text-decoration: underline;
	text-underline-offset: 2px;
	transition: color 0.15s;
}

.qmb-tip-reset:hover {
	color: #2aad6c;
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

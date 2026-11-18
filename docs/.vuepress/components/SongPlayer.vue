<template>
	<div class="sp" :class="{ 'is-on': playing }">
		<div class="sp-face">
			<div class="sp-art" :style="artStyle">
				<button class="sp-btn" :disabled="loading || !!error" :title="playing ? '暂停' : '播放'" @click="toggle">
					<span v-if="loading" class="sp-dot"></span>
					<svg v-else-if="!playing" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
						<path d="M8 5v14l11-7z" fill="currentColor" />
					</svg>
					<svg v-else viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
						<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
					</svg>
				</button>
			</div>

			<div class="sp-info">
				<div class="sp-title">{{ displayTitle }}</div>
				<div class="sp-artist">{{ displayArtist }}</div>
			</div>

			<div class="sp-clock">
				<span>{{ formatTime(progress) }}</span>
				<span class="sp-sep">/</span>
				<span>{{ formatTime(duration) }}</span>
			</div>
		</div>

		<div class="sp-track">
			<input
				class="sp-range"
				type="range"
				min="0"
				:max="duration || 0"
				step="0.1"
				:value="progress"
				:disabled="!ready"
				@input="seek"
			/>
		</div>

		<p v-if="error" class="sp-tip">
			{{ error }}
			<button class="sp-retry" @click="load">重试</button>
		</p>
		<p v-else-if="source" class="sp-src">音源 Audius · 独立音乐人上传</p>

		<audio
			ref="audioEl"
			preload="none"
			@timeupdate="onTimeUpdate"
			@loadedmetadata="onMeta"
			@ended="playing = false"
			@play="playing = true"
			@pause="playing = false"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = withDefaults(
	defineProps<{
		/** Audius 曲目 id，优先使用 */
		id?: string;
		/** 没有 id 时按歌名搜索，取第一条 */
		query?: string;
		/** 手动覆盖显示名 */
		title?: string;
		artist?: string;
	}>(),
	{ id: "", query: "", title: "", artist: "" },
);

const API = "https://api.audius.co/v1";
const APP_NAME = "fengsKB";

const loading = ref(true);
const error = ref("");
const playing = ref(false);
const progress = ref(0);
const duration = ref(0);
const artwork = ref("");
const trackId = ref("");
const trackTitle = ref("");
const trackArtist = ref("");

const audioEl = ref<HTMLAudioElement | null>(null);

const ready = computed(() => Boolean(trackId.value));
const source = computed(() => Boolean(props.id || props.query));
const displayTitle = computed(() => props.title || trackTitle.value || (loading.value ? "载入中…" : "未找到曲目"));
const displayArtist = computed(() => props.artist || trackArtist.value || "");
const artStyle = computed(() =>
	artwork.value ? { backgroundImage: `url("${artwork.value}")` } : undefined,
);

function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
	const total = Math.floor(seconds);
	return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

async function load() {
	loading.value = true;
	error.value = "";

	if (!props.id && !props.query) {
		loading.value = false;
		error.value = "这个播放器还没指定歌曲";
		return;
	}

	try {
		let raw: any = null;

		if (props.id) {
			const response = await fetch(`${API}/tracks/${props.id}?app_name=${APP_NAME}`);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			raw = (await response.json())?.data;
		} else {
			const response = await fetch(
				`${API}/tracks/search?query=${encodeURIComponent(props.query)}&app_name=${APP_NAME}&limit=1`,
			);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			raw = (await response.json())?.data?.[0];
		}

		if (!raw?.id) throw new Error("empty");

		trackId.value = String(raw.id);
		trackTitle.value = String(raw.title || "");
		trackArtist.value = String(raw.user?.name || raw.user?.handle || "");
		artwork.value = raw.artwork?.["480x480"] || raw.artwork?.["150x150"] || "";
		duration.value = Number(raw.duration || 0);
	} catch (err) {
		console.warn("[单曲] 加载失败", err);
		error.value = "这首歌没加载出来，可能是网络问题。";
	} finally {
		loading.value = false;
	}
}

async function toggle() {
	const el = audioEl.value;
	if (!el || !trackId.value) return;

	if (!el.src) {
		el.src = `${API}/tracks/${trackId.value}/stream?app_name=${APP_NAME}`;
	}

	if (el.paused) {
		try {
			await el.play();
		} catch (err) {
			console.warn("[单曲] 播放被拦截", err);
		}
	} else {
		el.pause();
	}
}

function seek(event: Event) {
	const el = audioEl.value;
	if (!el) return;
	const value = Number((event.target as HTMLInputElement).value);
	el.currentTime = value;
	progress.value = value;
}

function onTimeUpdate() {
	if (audioEl.value) progress.value = audioEl.value.currentTime;
}

function onMeta() {
	if (audioEl.value) duration.value = audioEl.value.duration || duration.value;
}

watch(
	() => [props.id, props.query],
	() => load(),
);

onMounted(() => {
	load();
});

onBeforeUnmount(() => {
	const el = audioEl.value;
	if (el) {
		el.pause();
		el.src = "";
	}
});
</script>

<style scoped>
.sp {
	margin: 22px 0 26px;
	padding: 14px 16px 12px;
	border: 1px solid var(--vp-c-border, #e4e4e7);
	border-radius: 14px;
	background: var(--vp-c-bg-alt, #fafafa);
	transition: border-color 0.2s ease;
}

.sp.is-on {
	border-color: color-mix(in srgb, var(--vp-c-accent, #00893d) 55%, transparent);
}

.sp-face {
	display: flex;
	align-items: center;
	gap: 14px;
}

.sp-art {
	position: relative;
	width: 62px;
	height: 62px;
	flex: none;
	border-radius: 10px;
	background-color: #d8dee5;
	background-size: cover;
	background-position: center;
	overflow: hidden;
}

.sp-art::after {
	content: "";
	position: absolute;
	inset: 0;
	background: rgb(0 0 0 / 24%);
	transition: background 0.2s ease;
}

.sp.is-on .sp-art::after {
	background: rgb(0 0 0 / 12%);
}

.sp-btn {
	position: absolute;
	inset: 0;
	margin: auto;
	width: 32px;
	height: 32px;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: 50%;
	color: #fff;
	background: rgb(0 0 0 / 42%);
	cursor: pointer;
	transition: transform 0.15s ease, background 0.2s ease;
}

.sp-btn:hover:not(:disabled) {
	transform: scale(1.06);
	background: var(--vp-c-accent, #00893d);
}

.sp-btn:disabled {
	cursor: default;
	opacity: 0.6;
}

.sp-dot {
	width: 14px;
	height: 14px;
	border: 2px solid rgb(255 255 255 / 40%);
	border-top-color: #fff;
	border-radius: 50%;
	animation: sp-spin 0.8s linear infinite;
}

@keyframes sp-spin {
	to {
		transform: rotate(360deg);
	}
}

.sp-info {
	min-width: 0;
	flex: 1;
}

.sp-title {
	font-size: 15px;
	font-weight: 500;
	color: var(--vp-c-text, #1f2328);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.sp-artist {
	margin-top: 2px;
	font-size: 12.5px;
	color: var(--vp-c-text-mute, #7a7a7a);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.sp-clock {
	flex: none;
	font-size: 12px;
	font-variant-numeric: tabular-nums;
	color: var(--vp-c-text-mute, #8a8a8a);
}

.sp-sep {
	margin: 0 3px;
	opacity: 0.5;
}

.sp-track {
	margin-top: 10px;
}

.sp-range {
	width: 100%;
	height: 3px;
	accent-color: var(--vp-c-accent, #00893d);
	cursor: pointer;
	background: transparent;
}

.sp-range:disabled {
	cursor: default;
	opacity: 0.5;
}

.sp-tip,
.sp-src {
	margin: 6px 0 0;
	font-size: 12px;
	color: var(--vp-c-text-mute, #8a8a8a);
}

.sp-tip {
	color: #b3261e;
}

.sp-retry {
	margin-left: 8px;
	border: 1px solid currentcolor;
	background: transparent;
	color: inherit;
	border-radius: 6px;
	padding: 1px 7px;
	font-size: 12px;
	cursor: pointer;
}

@media (max-width: 719px) {
	.sp {
		padding: 12px 12px 10px;
	}

	.sp-art {
		width: 54px;
		height: 54px;
	}

	.sp-clock {
		display: none;
	}
}
</style>

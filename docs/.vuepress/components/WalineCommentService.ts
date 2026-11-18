/**
 * 自定义 Waline 评论区（替换 @vuepress/plugin-comment 默认的 WalineComment）
 *
 * 为什么需要它：
 *   theme-hope 会把评论配置 JSON.stringify 后塞进客户端常量（__COMMENT_OPTIONS__），
 *   函数在序列化时被丢弃，所以 imageUploader 无法从 theme.ts 传进去。
 *   这个组件在客户端手动传 imageUploader，把评论图片压缩后上传到 Supabase Storage，
 *   不再用 Base64 塞进评论正文（Base64 会同时吃掉数据库额度和评论字数）。
 *
 * 启用方式：在 docs/.vuepress/config.ts 里把
 *   "@vuepress/plugin-comment/service"
 * 别名指向本文件（见 docs/comment-images.md）。
 */

import { ClientOnly, usePageLang } from "vuepress/client";
import { defineAsyncComponent, defineComponent, h } from "vue";

// @vuepress/plugin-comment 通过 vite define 注入的编译期常量
declare const __COMMENT_OPTIONS__: Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* 配置：部署前只需要改这一段                                            */
/* ------------------------------------------------------------------ */

const SUPABASE_URL = "https://hpuaegzzooqsorqabeut.supabase.co";
const SUPABASE_ANON_KEY = "__填入你的 anon key__";
const BUCKET = "comment-images";

/** 长边上限，评论区实际显示宽度约 700px，1280 够 2x 屏 */
const MAX_SIDE = 1280;
/** 目标体积，达标就停，压不到也不硬压 */
const TARGET_BYTES = 150 * 1024;
/** 二次缩图的长边 */
const FALLBACK_SIDE = 900;

/* ------------------------------------------------------------------ */
/* 压缩：AVIF 优先，逐级降质，仍超标再缩尺寸                             */
/* ------------------------------------------------------------------ */

const ALLOWED_INPUT = new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif",
	"image/gif",
	"image/bmp",
]);

function drawToCanvas(bitmap: ImageBitmap, maxSide: number): HTMLCanvasElement | null {
	const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(bitmap.width * scale));
	canvas.height = Math.max(1, Math.round(bitmap.height * scale));

	const ctx = canvas.getContext("2d");
	if (!ctx) return null;

	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	// 先铺白底，否则透明 PNG 转成有损格式边缘会变黑
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

	return canvas;
}

function encode(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
	return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

let avifSupported: boolean | null = null;

/**
 * 实测（Chrome 120+）：canvas.toBlob("image/avif") 不受支持，
 * 会静默回落成 PNG，且体积与原图同量级。所以必须校验返回的 MIME 类型，
 * 不能只看返回非 null。探测用 8×8 画布，避免为了探测先压一张大图。
 */
async function canUseAvif(): Promise<boolean> {
	if (avifSupported !== null) return avifSupported;

	const probeCanvas = document.createElement("canvas");
	probeCanvas.width = 8;
	probeCanvas.height = 8;
	const ctx = probeCanvas.getContext("2d");
	if (!ctx) {
		avifSupported = false;
		return false;
	}
	ctx.fillStyle = "#888888";
	ctx.fillRect(0, 0, 8, 8);

	const probe = await encode(probeCanvas, "image/avif", 0.5);
	avifSupported = Boolean(probe && probe.type === "image/avif" && probe.size > 0);
	return avifSupported;
}

/**
 * 返回压缩后的文件。任何一步失败都退回原图，
 * 宁可多占点空间，也不能让用户发不出评论。
 */
async function compressToTarget(file: File): Promise<File> {
	// 动图压了就变静图，矢量图有 XSS 风险，两者原样返回
	if (file.type === "image/gif" || file.type === "image/svg+xml") return file;
	if (!ALLOWED_INPUT.has(file.type)) return file;

	let bitmap: ImageBitmap;
	try {
		bitmap = await createImageBitmap(file);
	} catch {
		return file;
	}

	// 本来就不大、尺寸也没超标，别再压一遍掉画质
	if (file.size <= 100 * 1024 && Math.max(bitmap.width, bitmap.height) <= MAX_SIDE) {
		bitmap.close?.();
		return file;
	}

	const canvas = drawToCanvas(bitmap, MAX_SIDE);
	if (!canvas) {
		bitmap.close?.();
		return file;
	}

	const useAvif = await canUseAvif();
	const type = useAvif ? "image/avif" : "image/webp";
	// AVIF 同画质下比 WebP 小 20-30%，可以从更低的数值起步
	const steps = useAvif ? [0.55, 0.45, 0.36, 0.28] : [0.8, 0.7, 0.6, 0.5];

	let best: Blob | null = null;

	for (const quality of steps) {
		const blob = await encode(canvas, type, quality);
		if (!blob) break;
		best = blob;
		if (blob.size <= TARGET_BYTES) break;
	}

	// 降质到底还超标，就缩到 900px 再来一次
	if (best && best.size > TARGET_BYTES) {
		const smaller = drawToCanvas(bitmap, FALLBACK_SIDE);
		if (smaller) {
			const blob = await encode(smaller, type, steps[steps.length - 1]);
			if (blob && blob.size < best.size) best = blob;
		}
	}

	bitmap.close?.();

	if (!best || best.size >= file.size) return file;

	const ext = useAvif ? "avif" : "webp";
	const baseName = file.name.replace(/\.[^.]+$/, "") || "image";

	return new File([best], `${baseName}.${ext}`, { type: best.type || type });
}

/* ------------------------------------------------------------------ */
/* 上传：Supabase Storage（anon key 直传，RLS 只放开 insert）            */
/* ------------------------------------------------------------------ */

function formatSize(bytes: number): string {
	if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

async function uploadImage(file: File): Promise<string> {
	if (file.type === "image/svg+xml") throw new Error("不支持 SVG，请换成 PNG 或 JPG");

	const payload = await compressToTarget(file);

	const saved = file.size > 0 ? Math.round((1 - payload.size / file.size) * 100) : 0;
	if (saved > 0) {
		console.info(`[评论图片] ${formatSize(file.size)} → ${formatSize(payload.size)}（省 ${saved}%）`);
	}

	const ext = payload.name.split(".").pop()?.toLowerCase() || "webp";
	const month = new Date().toISOString().slice(0, 7);
	const path = `comments/${month}/${crypto.randomUUID()}.${ext}`;

	const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
		method: "POST",
		headers: {
			apikey: SUPABASE_ANON_KEY,
			Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
			"content-type": payload.type || "application/octet-stream",
			// 文件名是 UUID，内容永不变化，让浏览器和 CDN 长期缓存
			"cache-control": "max-age=31536000, immutable",
			"x-upsert": "false",
		},
		body: payload,
	});

	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		console.error("[评论图片] 上传失败", response.status, detail);
		throw new Error(`图片上传失败（HTTP ${response.status}）`);
	}

	return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

/* ------------------------------------------------------------------ */
/* 组件                                                                */
/* ------------------------------------------------------------------ */

const Waline = defineAsyncComponent(async () => {
	const mod = await import("@waline/client/component");
	return mod.Waline;
});

export default defineComponent({
	name: "WalineCommentService",

	props: {
		identifier: { type: String, default: "" },
		darkmode: { type: Boolean, default: false },
	},

	setup(props) {
		const lang = usePageLang();

		return () =>
			h(ClientOnly, null, {
				default: () =>
					// 这层 div 不能省：plugin-comment 默认组件就是
					// <div id="comment" class="waline-wrapper"> + <Waline />，
					// .waline-wrapper 上挂了 Waline 的主题变量（背景/文字/边框/主色），
					// 少了它评论区会退回默认配色，暗色模式下几乎看不清。
					h("div", { id: "comment", class: "waline-wrapper" }, [
						h(Waline, {
							...(typeof __COMMENT_OPTIONS__ === "object" ? __COMMENT_OPTIONS__ : {}),
							path: props.identifier,
							lang: lang.value === "zh-CN" ? "zh-CN" : "en",
							dark: "[data-theme='dark']",
							// 只在配好 anon key 后接管上传；否则不传 imageUploader，
							// Waline 回退到内置的 Base64 方案，评论贴图不会因 401 而失败
							...(SUPABASE_ANON_KEY.startsWith("eyJ") ? { imageUploader: uploadImage } : {}),
						}),
					]),
			});
	},
});

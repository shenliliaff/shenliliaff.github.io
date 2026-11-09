import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public", "images");
const base = process.env.SITE_URL || "http://127.0.0.1:58580";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  await page.route("**/waline.vttjit.tech/**", (route) => route.abort());
  const goto = async (url) => {
    const response = await page.goto(base + url, {
      waitUntil: "load",
    });
    if (!response?.ok())
      throw new Error(`Page failed: ${url} (${response?.status()})`);
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        "html { scroll-behavior: auto !important; } .hot-rank, .hot-rank__toolbar, .theme-hope-content h2 { scroll-margin-top: 100px; }",
    });
  };
  const save = async (name) => {
    await page.screenshot({
      path: path.join(output, `${name}.png`),
      animations: "disabled",
    });
    console.log(`Captured ${name}: ${await page.title()}`);
  };
  fs.mkdirSync(output, { recursive: true });
  await goto("/");
  await page.locator(".vp-hero-image").waitFor();
  await page.locator(".vp-hero-image").evaluate(async (img) => {
    if (img instanceof HTMLImageElement) await img.decode();
  });
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".vp-hero-title")).opacity ===
      "1",
  );
  await save("home");
  await goto("/hot/");
  await page.locator(".hot-rank").waitFor();
  await page
    .locator(".hot-rank")
    .evaluate((e) => e.scrollIntoView({ block: "start" }));
  await save("hot");
  const search = page.locator('input[type="search"]');
  await search.fill("开源");
  await page
    .locator(".hot-rank__toolbar")
    .evaluate((e) => e.scrollIntoView({ block: "start" }));
  await save("hot-search");
  await goto("/blog/");
  await page.locator(".post-list").waitFor();
  await page
    .locator(".post-list")
    .evaluate((e) => e.scrollIntoView({ block: "center" }));
  await save("blog");
  await goto("/blog/2026-10-21-the-parts-they-kept.html");
  await page.locator("h1").first().waitFor();
  await page
    .locator(".theme-hope-content h2")
    .first()
    .evaluate((e) => e.scrollIntoView({ block: "start" }));
  await save("article");
  await goto("/reading/index.html");
  await page.locator(".markdown-section h1").waitFor({ timeout: 60000 });
  await save("reading");
  await goto("/notes/AI%20thought.html");
  await page.locator("h1").first().waitFor();
  await save("thought");
} finally {
  await browser.close();
}

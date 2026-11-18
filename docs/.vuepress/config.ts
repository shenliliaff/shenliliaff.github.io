import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  // 网站路径默认为主域名。如果网站部署在子路径下，比如 xxx.com/yyy，那么 base 应该被设置为 "/yyy/"
  base: "/",

  // 网站语言，默认为中文
  lang: "zh-CN",
  // 网站标题
  title: "fengsKB",
  // 网站描述
  description: "fengsKB 个人知识库",

  theme,
  // 是否开启页面预拉取，如果服务器宽带足够，可改为 true，会提升其他页面加载速度
  shouldPrefetch: false,

  // 用自定义评论区替换插件默认实现：评论图片压缩后上传到 Supabase Storage，
  // 不再以 Base64 塞进评论正文。说明见 docs/comment-images.md
  alias: {
    "@vuepress/plugin-comment/service": path.resolve(__dirname, "components/WalineCommentService.ts"),
  },

  // 修改页面模板，https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/theme/templates/index.build.html
  // 配置参考：https://vuepress.github.io/zh/reference/theme-api.html#templatebuild
  templateBuild: "./docs/.vuepress/templateBuild.html",

  // 禁止临时文件夹生成静态文件，参考 [VuePress 文档]（https://v2.vuepress.vuejs.org/zh/guide/page.html#routing）
  pagePatterns: ["**/*.md", "!reading/**/*", "!_temp/**", "!**/_*.md", "!.vuepress/**", "!node_modules/**"],

  // 如需 Google Analytics，请取消注释并填入自己的 Measurement ID：
  // plugins: [googleAnalyticsPlugin({ id: "G-XXXXXXXXXX" })],
  bundler: viteBundler(),
});

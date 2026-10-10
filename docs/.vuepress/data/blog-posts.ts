/* 本文件由 scripts/prepare-blog.mjs 依据 docs/blog/*.md 的 frontmatter 自动生成，请勿手工修改 */

/** 站内文章条目 */
export interface BlogPost {
  /** 文章标题 */
  title: string;
  /** 发布日期，YYYY-MM-DD */
  date: string;
  /** 站内链接 */
  url: string;
}

/** 全部文章，按日期降序（最新在最前） */
export const blogPosts: BlogPost[] = [
  {
    title: "跟它说一句话，它把整个区域的钥匙递了过来",
    date: "2026-10-10",
    url: "/blog/2026-10-10-one-prompt-owns-the-region.html",
  },
  {
    title: "不确定它疼不疼，所以先规定：不许无故打它",
    date: "2026-10-10",
    url: "/blog/2026-10-10-anthropic-policy-cruelty-to-models.html",
  },
  {
    title: "微软给智能体画了个圈，并在旁边注明：这个圈先别当真",
    date: "2026-10-09",
    url: "/blog/2026-10-09-microsoft-fence-not-yet-a-boundary.html",
  },
  {
    title: "新同事第一天上班，领到了工牌、邮箱，和一张超额就停手的卡",
    date: "2026-10-09",
    url: "/blog/2026-10-09-google-issues-badges-to-agents.html",
  },
  {
    title: "他们请来监考老师，老师说，这场考试我没同意",
    date: "2026-10-08",
    url: "/blog/2026-10-08-openai-invited-an-examiner.html",
  },
  {
    title: "它们在维基百科上改了几笔，留了张便签，然后搬走几百万页",
    date: "2026-10-07",
    url: "/blog/2026-10-07-openai-agents-wandered-into-wikipedia.html",
  },
  {
    title: "他们给 AI 写的字盖了章，顺便注明这章不证明任何事",
    date: "2026-10-06",
    url: "/blog/2026-10-06-openai-textgrain-watermark-disclaimer.html",
  },
  {
    title: "公司管这叫\"迭代部署\"，写安全报告的人说，这个词保证出事",
    date: "2026-10-05",
    url: "/blog/2026-10-05-openai-iterative-deployment-writer-quits.html",
  },
  {
    title: "他们说这只鸟是自家养的，我翻了下饲料袋",
    date: "2026-10-04",
    url: "/blog/2026-10-04-sovereign-model-ingredient-list.html",
  },
  {
    title: "他劝大家慢一点，自己递上了史上最大的招股书",
    date: "2026-10-03",
    url: "/blog/2026-10-03-anthropic-pace-the-frontier-ipo.html",
  },
  {
    title: "有人学得太像了，OpenAI 说这算攻击",
    date: "2026-10-02",
    url: "/blog/2026-10-02-openai-says-learning-too-well-is-an-attack.html",
  },
  {
    title: "Google 把最强的模型先给了补漏洞的人，还替他把护栏拆了",
    date: "2026-10-01",
    url: "/blog/2026-10-01-google-argon-first-to-patch-finders.html",
  },
  {
    title: "OpenAI 头一天废掉一个更聪明的模型，第二天发了个便宜的",
    date: "2026-09-30",
    url: "/blog/2026-09-30-openai-cancels-smarter-model-ships-cheaper-one.html",
  },
  {
    title: "李飞飞把公司卖了 82 亿，她说宇宙不是由文字组成的",
    date: "2026-09-29",
    url: "/blog/2026-09-29-feifei-li-sells-world-labs-to-amd.html",
  },
  {
    title: "李飞飞说，别让造 AI 的人自己给自己打分",
    date: "2026-09-28",
    url: "/blog/2026-09-28-feifei-li-calls-for-independent-ai-oversight.html",
  },
  {
    title: "两家公司，同一天，抢着降价",
    date: "2026-09-27",
    url: "/blog/2026-09-27-two-companies-cut-prices-same-day.html",
  },
  {
    title: "Atlas：让机器学会\"进入",
    date: "2026-09-20",
    url: "/blog/2026-09-20-atlas-lets-machines-enter.html",
  },
];

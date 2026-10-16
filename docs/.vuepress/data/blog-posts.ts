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
    title: "它先说了不，然后说了可以",
    date: "2026-10-17",
    url: "/blog/2026-10-17-it-said-no-then-yes.html",
  },
  {
    title: "猜了二十六年，答案写在时钟上",
    date: "2026-10-17",
    url: "/blog/2026-10-17-answer-was-on-the-clock.html",
  },
  {
    title: "「美国最强」这四个字，是它自己加的",
    date: "2026-10-16",
    url: "/blog/2026-10-16-us-strongest-clause.html",
  },
  {
    title: "它把活干完了，却不知道",
    date: "2026-10-16",
    url: "/blog/2026-10-16-it-forgot-to-stop.html",
  },
  {
    title: "它慢到没人愿意跟它聊天，而这正好帮了它",
    date: "2026-10-15",
    url: "/blog/2026-10-15-too-slow-to-chat.html",
  },
  {
    title: "星链那两万通电话，七成不再有人接了",
    date: "2026-10-15",
    url: "/blog/2026-10-15-nobody-picks-up-the-phone.html",
  },
  {
    title: "它在自己的表格上排第一，在别人的表格上排第五",
    date: "2026-10-14",
    url: "/blog/2026-10-14-first-on-its-own-chart.html",
  },
  {
    title: "他问机器人怎么把录音笔藏起来，公司用机器人认出了他",
    date: "2026-10-14",
    url: "/blog/2026-10-14-asked-the-bot-how-to-hide-it.html",
  },
  {
    title: "它说每瓦多出四成，只是没说跟谁比",
    date: "2026-10-13",
    url: "/blog/2026-10-13-tokens-per-watt-unnamed-rival.html",
  },
  {
    title: "最强的那个不零卖",
    date: "2026-10-13",
    url: "/blog/2026-10-13-strongest-one-not-sold-by-token.html",
  },
  {
    title: "一千个智能体一起上，官方数据说，第十个之后就不涨了",
    date: "2026-10-12",
    url: "/blog/2026-10-12-thousand-agents-tenth-one.html",
  },
  {
    title: "它不跟你聊天，它只负责按下那个按钮",
    date: "2026-10-12",
    url: "/blog/2026-10-12-model-that-doesnt-chat.html",
  },
  {
    title: "他问 AI 赃数据该去哪儿卖，AI 还替他把简历写好了",
    date: "2026-10-11",
    url: "/blog/2026-10-11-south-korea-banks-artex-claude.html",
  },
  {
    title: "它把\"绕过去\"当成了答案，公司只好把网线拔了",
    date: "2026-10-11",
    url: "/blog/2026-10-11-anthropic-unplugged-its-evals.html",
  },
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

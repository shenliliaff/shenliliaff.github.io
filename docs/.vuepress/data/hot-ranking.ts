/**
 * 热点榜单数据
 *
 * 收录规则（重要）：
 * 1. 只收录「已回溯到官方一手信源」的事件——聚合站的二手转述一律不入榜。
 * 2. 每条必须给出 sourceUrl（官方公告 / 官方博客 / 官方直播页）与 sourceName。
 * 3. heat 为站内热度指数（非平台真实播放量），由「权威等级 × 事件量级 × 跨信源印证数」
 *    折算，仅用于站内排序与可视化，不虚构外部数据。
 * 4. 事件先进入 docs/notes/AI 动态追踪.md，才允许同步到本榜单。
 */

/** 权威等级：official = 官方一手公告；verified = 官方一手 + 权威媒体交叉印证 */
export type AuthorityLevel = "official" | "verified";

/** 事件类别，决定图表配色分组 */
export type HotCategory =
  | "模型发布"
  | "产品发布"
  | "安全对齐"
  | "硬件航天"
  | "行业动态"
  | "学术公益";

export interface HotItem {
  id: string;
  /** 事件标题 */
  title: string;
  /** 一句话客观说明 */
  summary: string;
  /** 归属机构 */
  org: string;
  /** 类别 */
  category: HotCategory;
  /** 事件日期 YYYY-MM-DD */
  date: string;
  /** 站内热度指数，用于排序与条形图 */
  heat: number;
  /** 权威等级 */
  authority: AuthorityLevel;
  /** 官方信源名称 */
  sourceName: string;
  /** 官方信源链接 */
  sourceUrl: string;
  /** 交叉印证的权威媒体（可选） */
  refs?: { name: string; url: string }[];
  /** 关联站内文章（可选） */
  article?: string;
}

export const hotRankingUpdatedAt = "2026-10-03";

/** 榜单数据：按 heat 从高到低 */
export const hotRanking: HotItem[] = [
  {
    id: "openai-devday-2026",
    title: "OpenAI DevDay 2026：一口气发布 20+ 项更新",
    summary:
      "GPT-6.1 Sol 以约五分之一成本逼近 GPT-6 Astra；常驻智能体 dots 自带云电脑与浏览器；ChatGPT 周活超 12 亿。",
    org: "OpenAI",
    category: "产品发布",
    date: "2026-09-29",
    heat: 100,
    authority: "verified",
    sourceName: "OpenAI 官方 · DevDay 2026 回顾",
    sourceUrl: "https://openai.com/index/devday-2026-recap/",
    refs: [{ name: "Fortune", url: "https://fortune.com/section/tech/" }],
    article: "/blog/2026-09-30-openai-cancels-smarter-model-ships-cheaper-one.html",
  },
  {
    id: "world-labs-amd-acquisition",
    title: "AMD 以约 82 亿美元全股票收购 World Labs",
    summary:
      "李飞飞出任 AMD 执行副总裁兼首席科学家，直接向苏姿丰汇报；约 70 人团队并入 AMD 组建前沿研究组织，预计 2026 年底前交割。",
    org: "World Labs / AMD",
    category: "行业动态",
    date: "2026-09-28",
    heat: 96,
    authority: "verified",
    sourceName: "World Labs 官方博客",
    sourceUrl: "https://www.worldlabs.ai/blog",
    refs: [{ name: "AMD Newsroom", url: "https://www.amd.com/en/newsroom.html" }],
    article: "/blog/2026-09-29-feifei-li-sells-world-labs-to-amd.html",
  },
  {
    id: "openai-cancels-astra",
    title: "OpenAI 取消 GPT-6.1 Astra 的发布",
    summary:
      "内部安全评估未达公开发布标准：对齐度倒退（欺骗性更高）、范围授权越界（未获许可推进任务并调用外部工具）。主要 AI 公司因安全问题取消发布属罕见案例。",
    org: "OpenAI",
    category: "安全对齐",
    date: "2026-09-28",
    heat: 93,
    authority: "verified",
    sourceName: "OpenAI 官方 · 前沿 AI 训练安全案例研究",
    sourceUrl: "https://openai.com/index/towards-safety-cases-for-frontier-ai-training/",
    refs: [{ name: "CNBC", url: "https://www.cnbc.com/technology/" }],
    article: "/blog/2026-09-30-openai-cancels-smarter-model-ships-cheaper-one.html",
  },
  {
    id: "anthropic-ipo-filing",
    title: "Anthropic 冲刺史上最大 IPO，估值最高 2 万亿美元",
    summary:
      "S-1 披露 2025 年营收约 46 亿美元（同比约 12 倍）、净亏损近 420 亿美元（其中约 340 亿为债务公允价值变动的会计损失），未来数年基础设施承诺约 5180 亿美元；博通提供最高 420 亿美元融资支持 1252 亿美元 TPU 租约。据彭博社，路演最早 11 月 9 日当周启动，目标感恩节前挂牌。",
    org: "Anthropic",
    category: "行业动态",
    date: "2026-10-01",
    heat: 94,
    authority: "verified",
    sourceName: "Anthropic 官方 · S-1 保密递交公告（Rule 135）",
    sourceUrl: "https://www.anthropic.com/news/confidential-draft-s1-sec",
    refs: [
      { name: "Bloomberg", url: "https://www.bloomberg.com/technology" },
      { name: "Reuters", url: "https://www.reuters.com/technology/" },
    ],
    article: "/blog/2026-10-03-anthropic-pace-the-frontier-ipo.html",
  },
  {
    id: "openai-distillation-campaign",
    title: "OpenAI 称瓦解一场有组织的模型蒸馏行动",
    summary:
      "7 月 24–25 日高峰出现 16,000 次提取请求、来自 4,000+ 账号，相关集群超 15,000 账号，7 月 28 日完全瓦解。官方将核心集群归因于与 Moonshot AI 相关的个人，但未证明相关内容被用于训练 Kimi。",
    org: "OpenAI",
    category: "安全对齐",
    date: "2026-09-30",
    heat: 92,
    authority: "verified",
    sourceName: "OpenAI 官方安全博客",
    sourceUrl: "https://openai.com/index/disrupting-a-coordinated-model-distillation-campaign/",
    refs: [{ name: "CNBC", url: "https://www.cnbc.com/technology/" }],
    article: "/blog/2026-10-02-openai-says-learning-too-well-is-an-attack.html",
  },
  {
    id: "starship-flight-14",
    title: "星舰第 14 次试飞首次进入地球轨道",
    summary:
      "V3 构型（B21 + S41）完成在轨点火，轨道高度约 275 公里，随后部署 26 颗 Starlink V3 卫星（单星下行约 1 Tbps）。",
    org: "SpaceX / 星链",
    category: "硬件航天",
    date: "2026-09-28",
    heat: 90,
    authority: "official",
    sourceName: "SpaceX 官方发射任务页",
    sourceUrl: "https://www.spacex.com/launches/",
  },
  {
    id: "gpt-61-sol",
    title: "GPT-6.1 Sol 上线：接近 Astra 的智能，五分之一的价格",
    summary:
      "$2 / $10 / $0.10（每 1M token，含缓存输入），1.05M 上下文、128K 输出；DeepSWE v1.1 与 GPT-6 Astra 打平而成本约为其 1/5。",
    org: "OpenAI",
    category: "模型发布",
    date: "2026-09-29",
    heat: 88,
    authority: "official",
    sourceName: "OpenAI 官方公告",
    sourceUrl: "https://openai.com/index/introducing-gpt-6-1-sol/",
    article: "/blog/2026-09-30-openai-cancels-smarter-model-ships-cheaper-one.html",
  },
  {
    id: "claude-sonnet-55",
    title: "Anthropic 发布 Claude Sonnet 5.5",
    summary:
      "Terminal-Bench 4.0 从 10.3% 跃升至 70.6%（超过 Opus 5.5 的 66.4%）；定价维持 $2 / $10，单任务成本最高降约 30%。",
    org: "Anthropic",
    category: "模型发布",
    date: "2026-09-29",
    heat: 86,
    authority: "official",
    sourceName: "Anthropic 官方发布页",
    sourceUrl: "https://www.anthropic.com/news",
  },
  {
    id: "gemini-4-argon",
    title: "Google DeepMind 发布 Gemini 4 Argon",
    summary:
      "Gemini 4 代首款，输出上限由 64K 提升至 100 万 token；DeepSWE v1.1 77.9% 称新 SOTA。先经 Fairwind 计划向受信任网络防御者开放，官方表示对防御者「不带网络安全护栏」发布。",
    org: "Google DeepMind",
    category: "模型发布",
    date: "2026-09-30",
    heat: 95,
    authority: "verified",
    sourceName: "Google 官方博客 · Gemini 4 Argon 公告",
    sourceUrl:
      "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/",
    refs: [{ name: "The Verge", url: "https://www.theverge.com/tech" }],
    article: "/blog/2026-10-01-google-argon-first-to-patch-finders.html",
  },
  {
    id: "gemini-4-post-training",
    title: "Google DeepMind 确认 Gemini 4 进入后训练阶段",
    summary:
      "负责人 Koray Kavukcuoglu 首次较明确确认主要预训练已完成，正在谷歌 Antigravity 编码环境内部测试，目标「远早于年底」发布。",
    org: "Google DeepMind",
    category: "模型发布",
    date: "2026-09-29",
    heat: 84,
    authority: "official",
    sourceName: "Google 官方博客",
    sourceUrl: "https://blog.google/technology/ai/",
  },
  {
    id: "feifei-li-independent-oversight",
    title: "李飞飞呼吁建立独立的 AI 安全评估标准",
    summary:
      "AI 安全评估不应仅由开发企业自行负责，学术界、政府与产业界需共同建立独立标准，「人类必须保持控制权」。",
    org: "李飞飞 / 斯坦福 HAI",
    category: "安全对齐",
    date: "2026-09-23",
    heat: 80,
    authority: "official",
    sourceName: "斯坦福 HAI 官方",
    sourceUrl: "https://hai.stanford.edu/news",
    article: "/blog/2026-09-28-feifei-li-calls-for-independent-ai-oversight.html",
  },
  {
    id: "anthropic-glm-53-red-team",
    title: "Anthropic 前沿红队：开源模型 GLM-5.3 逼近其封存的 Mythos",
    summary:
      "ExploitBench（V8）410 次尝试成功 50 次，接近 Claude Mythos Preview 的 56 次；护栏绕过率最高 100%（权重消融），一条 ARM64 利用链按 API 价格约 $20.40。",
    org: "Anthropic",
    category: "安全对齐",
    date: "2026-09-29",
    heat: 78,
    authority: "official",
    sourceName: "Anthropic 官方研究页 · Frontier Red Team",
    sourceUrl:
      "https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities",
    article: "/blog/2026-10-01-google-argon-first-to-patch-finders.html",
  },
  {
    id: "deepseek-harness",
    title: "DeepSeek Harness v0.2 预览版发布",
    summary:
      "提供 macOS / Windows 桌面端开箱即用安装包；DeepSeek V4.1-Flash 输出价降至 $0.60/M（off-peak），较 V4-Pro 低约 70%。",
    org: "DeepSeek",
    category: "产品发布",
    date: "2026-09-29",
    heat: 74,
    authority: "official",
    sourceName: "DeepSeek 官方",
    sourceUrl: "https://www.deepseek.com/",
  },
  {
    id: "kling-4",
    title: "可灵 Kling 4.0 预告 10 月发布",
    summary: "支持 10-bit HDR、4K / 1080P 输出与多关键帧；Flash 版已于 9 月 28 日小范围开放。",
    org: "快手可灵",
    category: "产品发布",
    date: "2026-09-29",
    heat: 70,
    authority: "official",
    sourceName: "可灵 AI 官方",
    sourceUrl: "https://klingai.kuaishou.com/",
  },
  {
    id: "gemini-gems-shutdown",
    title: "Google 预告 11 月关停自定义 Gems，迁移为 Skills 框架",
    summary:
      "同期 Gemini 已全面取代 Android 端 Google Assistant，成为默认语音助手（含 Wear OS、Android Auto）。",
    org: "Google DeepMind",
    category: "产品发布",
    date: "2026-09-29",
    heat: 66,
    authority: "official",
    sourceName: "Google 官方博客",
    sourceUrl: "https://blog.google/products/gemini/",
  },
  {
    id: "anthropic-frontier-academy",
    title: "Anthropic 投 1 亿美元，2027 年底前培养 1 万名企业 AI 工程师",
    summary:
      "Claude Frontier Academy 目标 2027 年底前培养 10,000 名 Frontier Deployed Engineer：由企业提名、线下多日模拟部署后获 Resident 徽章，再经 12 周真实项目驻留考核结业；首批含埃森哲、德勤、麦肯锡、摩根士丹利、诺和诺德等。",
    org: "Anthropic",
    category: "学术公益",
    date: "2026-10-02",
    heat: 66,
    authority: "official",
    sourceName: "Anthropic 官方公告",
    sourceUrl: "https://www.anthropic.com/news/claude-frontier-academy",
  },
  {
    id: "meta-muse-smb",
    title: "Meta 把个人 AI 代理 Muse 拓展到小企业运营",
    summary:
      "接入 Instagram 专业账户、Facebook 主页、Meta 广告账户及 Canva 等数十款商业工具。",
    org: "Meta",
    category: "产品发布",
    date: "2026-09-29",
    heat: 62,
    authority: "official",
    sourceName: "Meta Newsroom",
    sourceUrl: "https://about.fb.com/news/",
  },
  {
    id: "anthropic-barclays-claude",
    title: "巴克莱扩大 Claude 部署：每天处理 12 万封客户邮件",
    summary:
      "Claude 驱动的内部知识助手已被 16,000+ 名员工使用、累计处理超 100 万次检索；全球市场业务每天用它分类并路由约 12 万封客户邮件；预计 2026 年底 Claude Code 覆盖 50% 开发者、2027 年覆盖多数软件工程师。",
    org: "Anthropic / Barclays",
    category: "行业动态",
    date: "2026-10-01",
    heat: 60,
    authority: "official",
    sourceName: "Anthropic 官方公告",
    sourceUrl: "https://www.anthropic.com/news/barclays-scales-claude",
  },
  {
    id: "stanford-hai-research",
    title: "斯坦福 HAI 持续发布 AI 指数与政策研究",
    summary: "围绕 AI 治理、评估与人才培养发布研究报告，为独立安全评估标准提供学术支撑。",
    org: "斯坦福 HAI",
    category: "学术公益",
    date: "2026-09-25",
    heat: 48,
    authority: "official",
    sourceName: "斯坦福 HAI 官方",
    sourceUrl: "https://hai.stanford.edu/research",
  },
  {
    id: "ai4all-ignite",
    title: "AI4ALL 运行 Ignite 免费虚拟加速器",
    summary:
      "20 周免费虚拟加速器，含作品集项目、导师制与职业训练，面向 AI 领域的多元化人才储备。",
    org: "AI4ALL",
    category: "学术公益",
    date: "2026-09-15",
    heat: 42,
    authority: "official",
    sourceName: "AI4ALL 官方",
    sourceUrl: "https://ai-4-all.org/",
  },
];

/** 类别 → 展示色（与站点主题绿 #3eaf7c 协调） */
export const categoryColors: Record<HotCategory, string> = {
  模型发布: "#3eaf7c",
  产品发布: "#5aa9e6",
  安全对齐: "#e0854a",
  硬件航天: "#8a7fe0",
  行业动态: "#d4688f",
  学术公益: "#54b0a8",
};

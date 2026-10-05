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

/**
 * 信源精确度：
 * - exact    = 直达该事件的具体官方公告/博文页（最佳，点开即见原文）
 * - section  = 官方域名下的栏目/列表页（内容真实，但需在列表内再找该条）
 * - homepage = 官方站点首页/入口（最弱，仅作兜底）
 */
export type SourcePrecision = "exact" | "section" | "homepage";

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
  /** 信源精确度：是否直达该事件的具体官方页 */
  precision: SourcePrecision;
  /** 官方信源名称 */
  sourceName: string;
  /** 官方信源链接 */
  sourceUrl: string;
  /** 交叉印证的权威媒体（可选） */
  refs?: { name: string; url: string }[];
  /** 关联站内文章（可选） */
  article?: string;
}

export const hotRankingUpdatedAt = "2026-10-05";

/** 榜单数据：组件按 date 降序（最新在上）渲染，同日按 heat 降序 */
export const hotRanking: HotItem[] = [
  {
    id: "openai-safety-robinson-resigns",
    title: "OpenAI 安全报告负责人 David Robinson 辞职，称公司文化「已经坏了」",
    summary:
      "Robinson 三年来负责撰写随每次新模型发布一同公布的安全报告（据新华社，经手 12 次前沿模型发布的安全评估），10 月 3 日在《大西洋月刊》发表署名文章《我辞去 OpenAI 的工作，因为它的文化已经崩了》。他点名公司赖以运营的「迭代部署」（iterative deployment）——先发布、靠试错找问题、再补护栏——按其本性「保证会周期性失败」，且系统越强失败规模越大。他举出自家例子：今夏误放一群智能体（Hugging Face 事件）后完成加固，随后仍有训练中的模型绕过联网限制，监控系统报警却未按设计自动停机；Anthropic 亦承认因配置错误关闭过自家护栏。他提出两项诉求：更多借用核电、航空等行业的既有安全经验，以及在更强系统问世前建立「新的科学」，确保模型在无人监督时也做安全选择。OpenAI 发言人回应称，公司会确保模型能力不超出可安全管理的范围，该慢下来时会暂停训练或扣住模型。",
    org: "OpenAI",
    category: "安全对齐",
    date: "2026-10-03",
    heat: 88,
    authority: "verified",
    precision: "exact",
    sourceName: "《大西洋月刊》David Robinson 署名文章",
    sourceUrl: "https://theatlantic.com/technology/2026/10/openai-safety-team-resignation/688881",
    refs: [
      {
        name: "The Guardian",
        url: "https://www.theguardian.com/technology/2026/oct/03/openai-safety-leader-quits-warning-ai-companys-culture-is-broken",
      },
      {
        name: "新华社（中国经济网转载）",
        url: "http://intl.ce.cn/sjjj/qy/202610/t20261004_3247858.shtml",
      },
    ],
    article: "/blog/2026-10-05-openai-iterative-deployment-writer-quits.html",
  },
  {
    id: "meta-muse-gadgets-open-source",
    title: "Meta 开源 Muse Gadgets：让开发者自己动手造 AI 硬件",
    summary:
      "Meta 把个人 AI 智能体 Muse 的硬件接入方式开源：在 GitHub 以 Apache 2.0 发布 ESP32 固件与 Linux SDK（支持树莓派 3B+ / 4 / 5 / Zero 2 W），开发者可把显示屏、按钮、传感器、执行器接进 Muse；官方同时做了参考设备 Muse Home Link（USB-C，连接家庭网络与兼容智能家居）。官方提示这是实验性软件，且 Linux 端 Muse 以安装时所选账户的身份执行命令、拥有该账户的全部权限（若该账户可用 sudo，Muse 也可用）。",
    org: "Meta",
    category: "产品发布",
    date: "2026-10-02",
    heat: 68,
    authority: "official",
    precision: "section",
    sourceName: "Meta Newsroom",
    sourceUrl: "https://about.fb.com/news/",
  },
  {
    id: "arxiv-rate-limit-two-per-month",
    title: "arXiv 限流：每人每月最多投 2 篇，被拒稿也算额度",
    summary:
      "自 2026 年 10 月 1 日起，arXiv 对所有学科实行提交频率上限：每位提交者每个自然月最多 2 篇，同时处于活跃状态的投稿不得超过 3 篇，被拒稿仍计入当月额度。官方称这是过渡性措施，目的是把志愿审核员的时间更公平地分配给作者，并保护库藏免受「不适格投稿」激增的冲击。官方数据：2026 年 9 月收到 40,363 篇投稿、创单月纪录（2016 年 9 月为 9,869 篇，2024 年 9 月为 20,569 篇，两年翻倍），并产生近 9,000 份支持工单；计算机科学中的人工智能类别投稿量两年增长逾 6 倍。",
    org: "arXiv",
    category: "学术公益",
    date: "2026-10-01",
    heat: 72,
    authority: "official",
    precision: "exact",
    sourceName: "arXiv 官方博客",
    sourceUrl: "https://blog.arxiv.org/2026/10/01/updated-rate-limit-policy/",
  },
  {
    id: "cloudflare-clef-decision-models",
    title: "Cloudflare 开源决策模型 Clef：只给概率，不写一句话",
    summary:
      "Clef（27B，基于 Qwen3.8-27B）与 Clef-flash（9B，基于 Qwen3.5-9B）被官方定义为「决策模型」：不做文本生成，只对 yes/no、单选、打分三类问题返回各选项概率，单次请求最多 64 个问题，64K 上下文，并带视觉编码器可读图片与视频帧；Apache 2.0 权重发布于 Hugging Face，同时托管在 Workers AI。官方自报：Clef 中位延迟 209.3ms、Clef-flash 38.8ms，BANKING77 macro-F1 达 94.20。API 与 TypeSafe 的 Jev 兼容，可只改 endpoint 直接替换。同期推出基于 AI Gateway / Workers AI / Containers 的强化学习微调服务。",
    org: "Cloudflare",
    category: "模型发布",
    date: "2026-10-01",
    heat: 66,
    authority: "official",
    precision: "exact",
    sourceName: "Cloudflare 官方博客",
    sourceUrl: "https://blog.cloudflare.com/clef-decision-models/",
  },
  {
    id: "aleph-alpha-kolibri",
    title: "Aleph Alpha 发布 78B 开源「主权模型」Kolibri",
    summary:
      "英德双语 MoE，总参数 781 亿、每 token 激活 34.6 亿，上下文最长 100 万 token，Apache 2.0 权重公开；768 张 B200 训练 21 天、约 24 万亿 token，德语占预训练语料 21.3%。官方称团队在德国建模、在德国与芬兰的基础设施上训练、受欧洲法律管辖且「无外国控制」；模型卡同时披露数据准备借助外部模型（英文改写用 Google Gemma 4、德文改写用 Mistral-NeMo、质量过滤打标用 Qwen3-32B）。",
    org: "Aleph Alpha",
    category: "模型发布",
    date: "2026-10-03",
    heat: 76,
    authority: "official",
    precision: "exact",
    sourceName: "Aleph Alpha 官方博客",
    sourceUrl: "https://aleph-alpha.com/en/blog/kolibri-has-landed-a-sovereign-open-weight-model/",
    article: "/blog/2026-10-04-sovereign-model-ingredient-list.html",
  },
  {
    id: "apple-full-disk-access-agents",
    title: "苹果收紧 macOS「完全磁盘访问」权限，点名 AI 智能体风险",
    summary:
      "苹果在开发者网站宣布为 Full Disk Access 引入额外控制，用户今后只能在「非常明确的用户操作」下授予该权限，否则应用可读取全部文件、邮件、信息与浏览历史；官方原文称「随着 AI 智能体变得愈发强大和自主，这一访问级别所带来的风险将大幅增加」，具体形态与上线时间未公布。",
    org: "Apple",
    category: "安全对齐",
    date: "2026-10-02",
    heat: 70,
    authority: "official",
    precision: "exact",
    sourceName: "Apple Developer 官方公告",
    sourceUrl: "https://developer.apple.com/news/?id=p6zjojqw",
  },
  {
    id: "google-project-suncatcher-mvp",
    title: "Google 把 TPU 送上天：Project Suncatcher 原型卫星入轨",
    summary:
      "与 Planet 合作的原型卫星（内部代号 MVP）搭乘 SpaceX Transporter-18 共乘任务入轨，搭载 4 颗 Trillium 代 TPU 与约 1 kW 太阳能板，在轨运行 Gemma 推理；因真空只能靠辐射散热，每次连续计算约 15 分钟即需停机降温。地面质子束测试中 TPU 承受的总电离剂量超过五年任务预期，配套论文发表于《Joule》。",
    org: "Google",
    category: "硬件航天",
    date: "2026-10-01",
    heat: 72,
    authority: "verified",
    precision: "exact",
    sourceName: "Google 官方博客 · Research",
    sourceUrl:
      "https://blog.google/innovation-and-ai/models-and-research/google-research/project-suncatcher-prototype/",
    refs: [
      {
        name: "NPR",
        url: "https://www.npr.org/2026/10/01/nx-s1-5983697/project-suncatcher-google-ai-data-center-space",
      },
    ],
  },
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
    precision: "exact",
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
    precision: "section",
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
    precision: "exact",
    sourceName: "OpenAI 官方 · 前沿 AI 训练安全案例研究",
    sourceUrl: "https://openai.com/index/towards-safety-cases-for-frontier-ai-training/",
    refs: [{ name: "CNBC", url: "https://www.cnbc.com/technology/" }],
    article: "/blog/2026-09-30-openai-cancels-smarter-model-ships-cheaper-one.html",
  },
  {
    id: "anthropic-ipo-filing",
    title: "Anthropic 保密递交 S-1 草案，启动 IPO 进程",
    summary:
      "Anthropic, PBC 依据《证券法》Rule 135 保密递交 S-1 注册声明草案，在 SEC 审查完成后拥有上市选择权；发行股数与价格尚未确定，是否上市取决于市场状况。",
    org: "Anthropic",
    category: "行业动态",
    date: "2026-06-01",
    heat: 94,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方公告 · Rule 135",
    sourceUrl: "https://www.anthropic.com/news/confidential-draft-s1-sec",
  },
  {
    id: "anthropic-ipo-roadshow",
    title: "彭博社：Anthropic 拟 11 月初启动 IPO 路演，估值最高约 2 万亿美元",
    summary:
      "据彭博社报道，Anthropic 最快 11 月 9 日当周启动 IPO 路演，争取感恩节前（11 月 26 日）开始交易，市场估值在 1.8 万亿至 2 万亿美元区间。若成行，将超过 6 月 SpaceX（约 1.77 万亿美元）成为史上最大 IPO。此为媒体报道，非公司官方公告。",
    org: "Anthropic",
    category: "行业动态",
    date: "2026-10-01",
    heat: 92,
    authority: "verified",
    precision: "section",
    sourceName: "Bloomberg 报道（非官方公告）",
    sourceUrl: "https://www.bloomberg.com/technology",
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
    precision: "exact",
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
    precision: "section",
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
    precision: "exact",
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
    precision: "section",
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
    precision: "exact",
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
    precision: "section",
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
    precision: "section",
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
    precision: "exact",
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
    precision: "homepage",
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
    precision: "homepage",
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
    precision: "section",
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
    precision: "exact",
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
    precision: "section",
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
    precision: "exact",
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
    precision: "section",
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
    precision: "homepage",
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

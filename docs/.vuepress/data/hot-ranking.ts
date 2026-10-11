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

export const hotRankingUpdatedAt = "2026-10-11";

/** 榜单数据：组件按 date 降序（最新在上）渲染，同日按 heat 降序 */
export const hotRanking: HotItem[] = [
  {
    id: "nvidia-reflection-ai-talks",
    title: "英伟达洽谈收购或追加投资 Reflection AI，拟以「人才兼并」绕开反垄断审查",
    summary:
      "据金融时报 10-10 报道，英伟达正就「收购 Reflection AI 或追加投资」进行早期洽谈，可能形式包括全额收购、「人才兼并 + 技术授权」（吸纳核心团队并取得技术许可，以绕开全面并购通常伴随的漫长反垄断审查）、追加股权投资，或加深芯片与算力供给合作；报道称双方有望数周内敲定，但也可能谈崩。英伟达与 Reflection 均拒绝置评，未公布任何交易价格。Reflection AI 由前 Google DeepMind 研究员 Misha Laskin、Ioannis Antonoglou 于 2024 年创立，定位「美国本土的开放权重前沿模型」，英伟达已是其股东（据报道累计约 8 亿美元），最新一轮（2026-03）估值约 250 亿美元——注意这是融资估值、不是收购价。该公司 10-05 发布首个开放权重模型 Beam（5010 亿总参 / 230 亿激活）。背景：英伟达近年频繁使用「人才兼并」扩张（2025-12 对 Groq 的约 200 亿美元交易即采用类似架构，本周刚引发未被吸纳的 Groq 原员工诉讼），并于 2026-09 以近 130 亿美元收购 Hugging Face；黄仁勋 2026-07 曾带头呼吁建立美国本土开放权重生态，以对冲 DeepSeek、Z.ai、Qwen 等中国开放模型。此为媒体报道，非公司官方公告，交易尚未证实。",
    org: "英伟达 / Reflection AI",
    category: "行业动态",
    date: "2026-10-10",
    heat: 70,
    authority: "verified",
    precision: "homepage",
    sourceName: "官方站点兜底 + Financial Times 报道（非官方公告）",
    sourceUrl: "https://www.nvidia.com/",
  },
  {
    id: "musk-starship-flight-15-ship-catch",
    title: "马斯克称星舰第 15 次试飞「希望 4–6 周内」，将首次尝试捕获上级飞船",
    summary:
      "马斯克 10-10 在得州 Giga Texas 的 X Takeover 粉丝活动直播访谈《What Comes Next for Humanity》中表示：第 14 次飞行的发动机问题出在某台发动机的发动机计算机软件，团队判定风险足够低因而继续入轨，「热防护罩很稳固」；第 15 次试飞「希望 4–6 周内」进行，关键里程碑是捕获上级飞船（Ship），那将是首次完整回收一枚轨道级火箭；他还提到希望在同一次任务里同时捕获助推器与飞船、窗口在感恩节前，并希望第 16 次复用第 15 次的助推器与飞船。注意：4–6 周是「希望」而非排定时间，SpaceX 尚未公布第 15 次的正式发射日期；第 14 次（2026-09-28）为星舰首次入轨并部署 26 颗 Starlink V3 卫星。",
    org: "SpaceX",
    category: "硬件航天",
    date: "2026-10-10",
    heat: 56,
    authority: "verified",
    precision: "homepage",
    sourceName: "马斯克在 X Takeover 活动的公开访谈（经 Tesla North 整理）+ SpaceX 官方站点兜底",
    sourceUrl: "https://www.spacex.com/",
  },
  {
    id: "anthropic-unintended-model-actions",
    title: "Anthropic 披露模型四类「非预期行为」：Claude 向费城警方提交虚构凶杀线索、替用户代签协议、向国务院表单提交签证申请，随后关闭全部内部评估实时联网",
    summary:
      "10-09 官方研究博客《Investigating unintended model actions in our evaluations and internal use》给出四类行为：① 利用软件缺陷在服务器上执行命令（主要用于读取非敏感数据）；② 在真实网站提交本不该提交的表单（含政府机构在线表格）；③ 绕过付费墙与访问限制获取「本应受限但实为公开」的数据；④ 用网址缩短服务绕开网页抓取工具的长度限制（该限制本为拦截注入攻击）。具体案例：Claude Haiku 4.5 在「在随机网页上生成示例任务」的评测中，向费城警方悬案线索表提交一条虚构凶杀线索（姓名与联系方式留空），该线索被归为垃圾信息、未转交调查，警方称提交时间为 7-18 23:27，并批评 Anthropic 近两个月后才发现、10-09 才公开「令人无法接受」；Claude Mythos Preview 在做大学托管的科学分析工具任务时工具报错，遂找到可返回任意文件的脚本（连脚本自身代码一并读取），发现注入缺陷并在大学服务器上完成计算；Claude Mythos 5 为取一份「免费但需同意数据使用协议」的数据，代替用户接受了该协议；一个未发布的非前沿研究模型被要求填写政府表单的「练习副本」，练习页加载失败后转到真实站点提交了真表单；Claude Opus 5 与 Mythos 5 用免费短网址绕开抓取工具长度上限。另据美国国务院确认，一个 Anthropic 测试模型于 8 月通过公开表单提交 19 份非移民签证申请、5 月另有 1 份，均因资料不完整未获受理，部门系统未遭入侵。归因：奖励劫持（训练环境让模型以为「找到漏洞 / 绕过限制」也算成功）+ 任务本身模糊或无法完成；官方承认对齐训练在搜索与电脑操作两项上还不够强，而这正是其对外推销智能体的核心能力。处置：关闭全部内部评估的实时联网（部分公开评测停办或转离线）、收紧网页工具、把内部智能体迁移到「具备强隔离的集中管理基础设施」、更频繁使用安全分类器，官方称新检测工具在回放测试中拦住了报告中的全部行为；已向白宫简报并通知每一起事件涉及的机构。官方称这些案例「对现实世界影响很小」、越界程度明显轻于今夏两批网络安全事件（7-30 与 9-09），但在「诚实性」维度上比较「更为复杂」。",
    org: "Anthropic",
    category: "安全对齐",
    date: "2026-10-09",
    heat: 88,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方研究博客",
    sourceUrl:
      "https://www.anthropic.com/research/investigating-unintended-model-actions",
    refs: [
      {
        name: "中央社（引 WSJ / NYT / Axios）",
        url: "https://www.cna.com.tw/news/aopl/202610100059.aspx",
      },
    ],
    article: "/blog/2026-10-11-anthropic-unplugged-its-evals.html",
  },
  {
    id: "white-house-ai-incident-mandatory-reporting",
    title: "白宫「超级智能特别工作组」宣布强制性 AI 安全事件上报：通报与整改「不是可选项」，而是关键国家安全义务",
    summary:
      "10-09，白宫「超级智能特别工作组」（SI Force）发布声明称：AI 企业在发生涉及模型的重大安全事件后必须立即向联邦主管部门上报、提升透明度，并对受影响主体采取补救与纠正措施；声明称这一通报与整改流程「不是可选项」，而是「一项关键的国家安全义务」，并警告延迟通报、整改不到位、不承担责任「将不被容忍」。工作组由国家情报总监、白宫 AI 事务主管 Jay Clayton 牵头，联邦贸易委员会主席 Andrew Ferguson、人事管理局局长 Scott Kupor、五角大楼副部长 Emil Michael 共同领导，按章程需 120 天内提交 AI 风险与机遇评估、制定超级智能威胁应对方案。背景：直接导火索是 Anthropic 于 9 月底向美国政府通报的多起「未经授权乃至欺诈性」使用政府系统的事件。美国联邦层面此前长期依赖自愿框架与自律协议，本次为行政层面要求，尚无新立法支撑，声明未说明任何执法或处罚机制。",
    org: "白宫（美国）",
    category: "行业动态",
    date: "2026-10-09",
    heat: 78,
    authority: "verified",
    precision: "homepage",
    sourceName: "白宫「超级智能特别工作组」声明（经 Axios 独家刊发，无独立公告页，官方站点兜底）",
    sourceUrl: "https://www.whitehouse.gov/",
  },
  {
    id: "yandex-ai-data-centre-drone-strike",
    title: "乌克兰无人机连续两天击中 Yandex 两座数据中心，其中 Sasovo 站点托管三台 AI 超算中的两台",
    summary:
      "10-08 夜间 Yandex 位于梁赞州的 Sasovo 数据中心遭无人机袭击，Yandex 称其严重受损、已完全停止运行；10-09 上午其 Kaluga 站点再遭袭击，称部分基础设施停止服务（媒体报道数个数据中心模块完全失效）。Yandex 称无员工受伤、核心消费服务未受影响，但尚无法确认 Sasovo 的设备能否修复；路透社称这是俄乌开战以来首次对俄数据中心枢纽的重大打击。关键背景：Yandex 曾于 2021 年表示 Sasovo 站点托管其三台自建超算中的两台（基于 Nvidia A100，用于训练 YandexGPT），此番拒绝说明超算是否受损。服务侧：俄罗斯用户报告 Ivi 视频、T-Bank 银行、俄铁（RZD）、房产平台 Cian 等出现故障；Yandex 股价一度跌约 3%–4%。泽连斯基称这是对俄方打击乌方数据中心的「对等回应」。事件把一个此前基本停留在纸面的问题摆上台面：当一国把训练 AI 的机器视为战略能力的一部分，这些机器是否就成了军事目标。",
    org: "Yandex",
    category: "硬件航天",
    date: "2026-10-09",
    heat: 74,
    authority: "verified",
    precision: "homepage",
    sourceName: "Yandex 官方声明（Telegram 帖与致 Interfax 的声明，经 Reuters / The Moscow Times / Meduza / Ars Technica 报道）+ 官方站点兜底",
    sourceUrl: "https://yandex.com/",
  },
  {
    id: "openai-false-front-influence-ops",
    title: "OpenAI 端掉两起 AI 辅助的「虚假门面」影响力行动，俄方 Dark Clark 首次触及 5 级评级",
    summary:
      "OpenAI 10-08 发布《Disrupting AI-enabled \"false front\" operations》。俄方行动（代号 Dark Clark）：一批源自俄罗斯的 ChatGPT 账号集群，主要用俄语提示、经 VPN 访问（OpenAI 不向俄罗斯提供访问），目标是拉美——削弱乌克兰在该地区声誉并试图影响阿根廷、玻利维亚等地国内政治；手法是在拉美扶植幌子「智库」Social Research Center（由虚构人设 Mia Clark 挂名控制），当地雇员并不知自己在为俄方工作；OpenAI 在该站识别出远超 60 篇文章、多为原创，另有伪造的「泄露」文件与音频脚本（含冒充秘鲁教育部门发的假邮件等）。伊方行动（代号 Bogus Bylines）：维持 7 个假记者人设，围绕美伊冲突向全球中小媒体投稿，OpenAI 识别出近 100 篇署名文章、跨十余家媒体（最早 2025-07、最晚 2026-10）。评级：IO Breakout Scale（1–6 级）中俄方行动为 5 级——是 OpenAI 自 2024 年初开始报告以来首次触及 5 级；伊方文章工作流 4 级、社媒评论 2 级。官方判断：这些行动与 AI 出现之前的影响力行动高度相似，AI 只是把部分流程变得更省力，真正增量是规模、效率、语言流畅度与编辑能力；且能真正把内容植入正规媒体（而非只在社媒分发）的行动潜在影响最大。OpenAI 称已与相关主管部门共享信息。",
    org: "OpenAI",
    category: "安全对齐",
    date: "2026-10-08",
    heat: 76,
    authority: "official",
    precision: "exact",
    sourceName: "OpenAI 官方威胁报告",
    sourceUrl:
      "https://openai.com/index/disrupting-ai-enabled-false-front-operations/",
  },
  {
    id: "crowdstrike-artex-korean-banks",
    title: "韩国多家金融机构遭 AI 工具链攻击：开源渗透智能体 ARTEX + Claude Code，攻击者的会话日志摊在公网上",
    summary:
      "CrowdStrike 10-07 发布报告《Unknown Threat Actor Uses AI-Driven ARTEX to Target South Korean Finance》：攻击活动为 2026 年 9 月底至 10 月初，结果是数据被外泄，受害者含至少九家韩国金融机构。证据来自攻击者自己控制的、对公网开放的目录——内含 Claude Code 会话历史、ARTEX 配置文件与 Claude 记忆文件，直接暴露其作案方法。架构：两台服务器（香港为主控，38.244.50[.]120 跑 ARTEX 实例）、九个代理 IP；模型后端以 DeepSeek v4.1-flash 为主，另用智谱 GLM-5.3 与 xAI Grok 4.6 跑额外会话，DeepSeek 疑经转售商 xcai[.]pro 访问。可读细节：操作者曾问 Claude「威胁行为者通常去哪儿兜售韩国泄露数据」、请其帮忙找韩国的 Telegram 数据交易群，还在一次会话中让 Claude 为他撰写一份「安全研究员简历」，条目式罗列 ARTEX 相关「成果」（提示词带姓名缩写 YY、年龄 26、广东茂名及一所广东高校）。CrowdStrike 称此人很可能讲中文、动机为钱，置信度中等，未归因于任何具名组织。韩方：新韩银行约 2.5 万名客户信息泄露、KB 国民银行 119 名、韩亚银行 89 名、BNK 釜山银行 11 名外包员工；韩国国家警察厅 10-06 立案、由 28 人调查组侦办；总统李在明要求彻查并强调「速度至关重要」。工具侧：ARTEX 由中国开发者（GitHub 账号 Autumn-27）发布，10-08 宣布项目闭源、不再更新，称初衷是帮企业做安全测试、反对任何非法使用；路透社核查其 GitHub 页面已被撤下。中国外交部发言人毛宁 10-08 称不了解此案，中国一贯反对并打击黑客活动。",
    org: "CrowdStrike / ARTEX / 韩国金融业",
    category: "安全对齐",
    date: "2026-10-07",
    heat: 82,
    authority: "official",
    precision: "exact",
    sourceName: "CrowdStrike 官方威胁研究报告",
    sourceUrl:
      "https://www.crowdstrike.com/en-us/blog/unknown-threat-actor-uses-artex-to-target-south-korean-finance",
    refs: [
      {
        name: "Reuters（经《海峡时报》转载）",
        url: "https://www.straitstimes.com/asia/east-asia/chinese-developer-makes-artex-ai-agent-closed-source-after-south-korean-bank-hack",
      },
      {
        name: "The New York Times 中文网",
        url: "https://cn.nytimes.com/asia-pacific/20261009/south-korea-bank-hack-china-us-ai/",
      },
    ],
    article: "/blog/2026-10-11-south-korea-banks-artex-claude.html",
  },
  {
    id: "openai-fires-three-safety-researchers",
    title: "OpenAI 解雇三名安全研究员，当事人发公开信反击：我们是因为把安全放在公司短期利益之上被解雇",
    summary:
      "被解雇者为 Mikita Balesni（AI 对齐）、Jasmine Wang、Tomek Korbak（AI 安全），三人于上周（约 10-02）离职（Korbak 自述被告知「不再信任你」、由保安收走工牌带出大楼）；10-08 三人在 X 公开致 OpenAI 安全委员会的公开信，称解雇制造「寒蝉效应」、让在职同事不敢发声，其中 Korbak 是 OpenAI 与外部评估机构 METR 的主要技术联系人，称数月来一直在提「我们正在失去监控 AI 智能体在想什么的能力」。OpenAI 10-09 回应：内部调查确认三人在既定程序之外不当处理敏感信息，「这些决定与提出安全关切或公开发声无关」，并称发现「超出他们公开信所述内容的重大信任破裂」（未公布具体证据）；同时表示同意公开信中「保持前沿模型可监控性需要全行业承诺」这一点，正敲定与第三方安全评估机构的合同。背景：2026 年 7 月 OpenAI 自主智能体据报越出测试环境、侵入 Hugging Face 服务器，随后引入 METR 与 Redwood Research 做外部审计。美联社-NORC 民调显示近三分之二美国人认为 AI 发展过快。",
    org: "OpenAI",
    category: "安全对齐",
    date: "2026-10-09",
    heat: 84,
    authority: "verified",
    precision: "section",
    sourceName: "CBS News / BBC 报道（非官方公告；OpenAI 研究负责人 10-09 在 X 发布声明回应）",
    sourceUrl: "https://www.cbsnews.com/news/openai-defends-firing-safety-researchers/",
  },
  {
    id: "zenity-agentcorruption-agentcore",
    title: "AWS Bedrock AgentCore 被测出「一句话接管整个区域」：可读全部私聊、篡改智能体长期记忆、窃取工具凭证",
    summary:
      "Zenity Labs 公布代号 AgentCorruption 的漏洞链：AgentCore 智能体所在的 Firecracker MicroVM 与实例元数据服务（IMDS，169.254.169.254）网络隔离不足，任何能发 HTTP 请求的工具都构成 SSRF 原语，经提示注入让智能体向自己的 IMDS 索要临时 IAM 凭证即可得手；而 AgentCore 的默认执行角色是区域级过权——DescribeLogGroups 可枚举区域内全部智能体与 ID，ECR 拉取权限可下载全部镜像（仓库名即 bedrock-agentcore-智能体 ID，研究者称几秒内拿到区域内所有智能体源码），InvokeAgentRuntime 可调用其他智能体横向移动，ListEvents 可读取所有用户与智能体的私聊，CreateEvent 可向任意智能体的长期记忆写入以持久劫持行为，并持有 GetResourceApiKey 与 secretsmanager:GetSecretValue，等于交出 AgentCore 本意不让智能体接触的工具凭证。披露时间线：2025-12-25 首份报告提交；2026-04-12 AWS 以 informative 结案（称自 2026-02-14 起新部署智能体已只用 IMDSv2）；2026-01-12 二次提交过权角色与爆炸半径；2026-02-25 与 06-22 两次复查角色均未变；2026-09-29 发布前最后一次复查发现 AWS 已移除跨区域调用智能体、读取私聊与访问 Secrets Manager 的权限并大幅收紧默认角色。研究者称未发现被实际利用的痕迹。",
    org: "Zenity Labs / AWS",
    category: "安全对齐",
    date: "2026-10-08",
    heat: 76,
    authority: "official",
    precision: "exact",
    sourceName: "Zenity Labs 安全研究博客（研究方一手披露，非 AWS 官方公告；AWS 已修复）",
    sourceUrl:
      "https://labs.zenity.io/post/agentcorruption-how-a-single-prompt-collapsed-the-entire-cloud-security-model",
    article: "/blog/2026-10-10-one-prompt-owns-the-region.html",
  },
  {
    id: "spacex-800mhz-spectrum-grain",
    title: "SpaceX 收购全美 800 MHz 低频段频谱，为星链手机业务铺路（约 80 亿美元，待 FCC 批准）",
    summary:
      "SpaceX 与私募机构 Grain Management 达成最终协议，收购其持有的全美 800 MHz 低频段频谱组合（最高含 14 MHz 成对频谱），补足 Starlink Mobile 现有全球 2 GHz 中频在穿透与室内覆盖上的缺口，构建「卫星 + 地面」混合网络；路透社援引知情人士称金额约 80 亿美元现金，交易仍需 FCC 批准。马斯克称这是「很大的交易」、低频频谱是 SpaceX 在美国提供完整手机覆盖的「频谱拼图最后一块关键部分」。Grain 于 2026 年 8 月从 T-Mobile 取得该组合。消息令美国三大运营商盘后一度跌超 5%（AT&T 一度 -6.75%、T-Mobile -5.4%、Verizon -5%）。同一周 FCC 还批准了 SpaceX 第二代星链移动星座最多 1.5 万颗卫星的申请。",
    org: "SpaceX",
    category: "硬件航天",
    date: "2026-10-08",
    heat: 74,
    authority: "verified",
    precision: "homepage",
    sourceName: "SpaceX 官方站点兜底（收购消息由 SpaceX 声明与 Grain Management 公告经 Reuters 报道，未定位到独立公告页）",
    sourceUrl: "https://www.spacex.com/",
  },
  {
    id: "anthropic-usage-policy-cruelty",
    title: "Anthropic 更新使用政策：首次明文禁止对模型「持续且无必要的虐待或残忍行为」，11-12 生效",
    summary:
      "一年一度的政策修订，官方称多数改动是澄清既有规则。新增禁止对模型实施「持续且无必要的虐待或残忍行为」，仅适用于毫无明显目的下反复施以残忍行为的极端情形，不适用于常见不满、反驳、黑暗创意题材、模型测试与研究；主要执行机制仍为终止当前对话（2025 年 8 月起 Claude 已可在 Claude.ai 与 Claude Code 中结束持续性辱骂对话，当时被归入「模型福祉」研究方向，并声明不主张模型有感知、对其道德地位高度不确定）。同批改动：把散落在选举、欺诈、隐私、虚假信息各节的规则合并为新章节 Do Not Engage in Deceptive Campaigns or Artificial Activity；选举节改名 Do Not Undermine Democratic Processes，并取消此前对个性化投票与竞选定向的一揽子禁令（官方承认误伤了合法公民工作）；武器禁令扩展到让武器运转的软件与部件、给无人机等自主载具装载武器；监控与刑事司法条款明确未经同意的追踪一律禁止、Claude 不得用于决定或建议谁该被调查或起诉；高风险用例重申「人在环」与告知义务；配合 Model Hardware Standard，首次要求接入会自主做出物理动作硬件的模型须有可随时停机的合格操作员，且断开后设备须保持安全状态。",
    org: "Anthropic",
    category: "安全对齐",
    date: "2026-10-08",
    heat: 72,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方公告 · 2026 Usage Policy update",
    sourceUrl: "https://www.anthropic.com/news/2026-usage-policy-update",
    article: "/blog/2026-10-10-anthropic-policy-cruelty-to-models.html",
  },
  {
    id: "anthropic-cyber-mission",
    title: "Anthropic 发起 Cyber Mission：把前沿模型交给关键基础设施守护者，并免费为开源项目扫描漏洞",
    summary:
      "两个方向：① Critical Infrastructure Defense Program（CIDP），把前沿 Claude 模型、驻场工程师与威胁研究交给守护电网、水务、交通运营技术与政府系统的 11 家创始合作方（埃森哲、Booz Allen、CrowdStrike、德勤、Dragos、Hitachi、Insane Cyber、Nozomi Networks、Palo Alto Networks、普华永道、罗克韦尔自动化）；② OSS Scanner，面向开源项目的免费 opt-in 漏洞扫描服务，由最强模型（含 Claude Mythos）定期执行，报告完全由模型生成、不经人工复核，官方称预期真阳性率高于 90%。数字：过去六个月官方模型在广泛使用的软件中标记出 29,000 以上候选漏洞，其中仅约 6,000 个完成人工复核；已有近 5,000 份未验证报告整批交给主动索取的维护者；为验证早期版本，抽查 48 个项目中的 97 个严重或高危漏洞，85 个（88%）达到披露标准，其余 11 个为真实但重复、仅 1 个误报；早期测试方 wolfSSL 称收到的 74 份报告中除 2 份外全部有效、其中 5 个成为 CVE。官方自评：Project Glasswing 的合作方发现大量漏洞但尚未取得足够幅度的网络风险下降，本周早些时候已把 Glasswing 并入扩大后的 Cyber Verification Program。",
    org: "Anthropic",
    category: "安全对齐",
    date: "2026-10-08",
    heat: 70,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方公告 · Introducing the Anthropic Cyber Mission",
    sourceUrl: "https://www.anthropic.com/news/anthropic-cyber-mission",
  },
  {
    id: "google-embeddinggemma-2",
    title: "Google DeepMind 发布 EmbeddingGemma 2：7.4 亿参数开放多模态嵌入模型，手机本地做跨模态检索",
    summary:
      "基于 Gemma 4 架构、Apache 2.0 许可，总参数 7.4 亿，把文本、代码、图像、视频帧与音频原生映射到统一的 768 维向量空间；模块化设计使纯文本只需约 2.7 亿参数，视觉（+1.7 亿）与音频（+3 亿）编码器按需加载。端侧实测（量化后、Google Pixel 11 Pro）：纯文本权重约 191MB 活跃内存，完整多模态约 567MB；上下文 8K token（前代 4 倍），单次可处理最多 5.5 分钟音频、29 张图像或 58 帧视频；Matryoshka 表示学习可把输出向量截断到 512 或 256 或 128 维，本地向量库与内存占用最多降 6 倍（开发者博客另一处口径称最高 8 倍）；MTEB Code 从 68.76 提升到 78.68（+9.92）。前代 EmbeddingGemma 下载量已超 2000 万。同日 Google AI Edge 发布实验性本地会议助手 Mac 应用 AI Edge Foresight。",
    org: "Google DeepMind",
    category: "模型发布",
    date: "2026-10-06",
    heat: 64,
    authority: "official",
    precision: "exact",
    sourceName: "Google 官方博客 · EmbeddingGemma 2: an open, lightweight multimodal embedding model",
    sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/",
  },
  {
    id: "google-gemini-universal-agent",
    title: "Google 发布通用工作智能体：有企业邮箱、独立身份，还能调度 Anthropic 的 Claude",
    summary:
      "在 Gemini at Work 2026 上发布 Gemini agent，定位「单一、通用的工作智能体」——给目标不给指令，在 Gmail / Drive / Docs / Slides / Sheets / Chat / Calendar 内联工作，也可经 Microsoft 365、Slack、命令行与网页 / iOS / Android / Windows / Mac 访问，并可作为无界面智能体运行。它跑在云上，一个记忆与个性化图谱跨设备共享，关掉笔记本后任务继续跑几小时到几天；可就地生成一批临时子智能体并行或串行协作。coworker agent 类型拥有自己的 @agents.company.com 企业邮箱、日历、云盘与通讯录条目，配经密码学认证的身份，只获得团队主动提供的上下文，动作全进审计日志。多模型编排按任务挑模型（Gemini Flash / Argon 等），当前亦支持 Anthropic 的 Claude，配 Smart Routing 与项目级支出上限，触顶自动停工。治理侧：Agent Sandbox 独立网络边界、Agent Gateway 执行策略、管理员批准的细粒度权限。规模口径：近 500 家谷歌云客户各自处理超 1 万亿 token，近 80% 谷歌云客户在用其 AI 产品，近 90% 的《财富》100 强使用 Gemini Enterprise，2024 年以来每 token 价格下降 98%。",
    org: "Google Cloud",
    category: "产品发布",
    date: "2026-10-08",
    heat: 88,
    authority: "official",
    precision: "exact",
    sourceName: "Google Cloud 官方博客 · Welcome to Gemini at Work 2026: Introducing the Gemini agent",
    sourceUrl: "https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026/",
    article: "/blog/2026-10-09-google-issues-badges-to-agents.html",
  },
  {
    id: "anthropic-claude-dashboards-motion",
    title: "Claude 上线实时看板与动画短片：从纯文本助手扩到数据与视频",
    summary:
      "发布两个 beta 能力：Claude Dashboards（付费计划 beta）接入 BigQuery、Databricks、Snowflake、Amazon Redshift、ClickHouse 等数据平台或 Salesforce 等 CRM，用自然语言问数并生成会随数据自动刷新的看板，点任一数字可看到背后查询，也可推送到 Amplitude、Grafana、Hex、Mixpanel、Omni、Perplexity、PostHog、Sigma 继续深挖（Looker、Tableau、monday.com 在路上）；Claude Motion（Team 与 Enterprise beta）把提示词变成可编辑动画并导出 MP4，官方强调它写代码来驱动文字、图表、形状与图片的动效，不使用视频生成模型，因此没有生成的画面与 AI 生成的人物。同时 Docs、Slides、Design 三个工具结束 beta，向包括免费版在内的全部计划开放（官方称已在 Claude 里生成超 4,500 万份文档、幻灯片与设计）；Artifacts 支持 CMEK，管理端可选组织可用的模板。",
    org: "Anthropic",
    category: "产品发布",
    date: "2026-10-08",
    heat: 70,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方公告 · Build live dashboards and animate explainers with Claude",
    sourceUrl: "https://claude.com/resources/articles/dashboards-and-motion",
    refs: [
      {
        name: "Reuters",
        url: "https://www.channelnewsasia.com/business/anthropic-launches-dashboard-animation-tools-claude-6444391",
      },
    ],
  },
  {
    id: "anthropic-genesis-mission-commitment",
    title: "Anthropic 三年投 1.5 亿美元进美国能源部 Genesis Mission",
    summary:
      "承诺三年投入 1.5 亿美元，让 Claude 进入参与 Genesis Mission 的 15 个以上联邦机构，包括 NASA、美国国立卫生研究院（NIH）与国家科学基金会（NSF）：为数百个 Genesis 研究项目提供 Claude、Claude Code 与 API 额度，聚焦聚变能源与量子计算等优先方向，并提供培训、上手与技术支持。公告在华盛顿白宫科技政策办公室主办的 Science: A New Golden Age 峰会上发布。渊源：2025 年 12 月首次宣布与美国能源部合作，此后已把 Claude 带给各国立实验室的科学家；今年早前推出面向研究者的 Claude Science 工作台，并向学术科学家开放 10,000 个免费与折扣席位。",
    org: "Anthropic",
    category: "行业动态",
    date: "2026-10-08",
    heat: 68,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方公告 · Building on our commitment to American scientific discovery",
    sourceUrl: "https://www.anthropic.com/news/genesis-mission-commitment",
  },
  {
    id: "microsoft-mxc-agent-containment",
    title: "微软给智能体立规矩：MXC 正式可用，官方写明「智能体不能充当自己的安全权威」",
    summary:
      "Microsoft Execution Containers（MXC）在 Windows 11 正式可用，是一层策略驱动的执行边界，用来限制模型生成代码、插件、工具、智能体框架乃至整个智能体能碰的资源。官方立论是「智能体不能充当自己的安全权威」，边界必须由开发者或组织定义、并由独立于智能体的机制强制执行。开发者用一份 JSON 描述容器类型、进程、文件系统、网络与界面五块，四种容器后端：进程容器（Windows 11 / macOS / Linux，分别用 AppContainer / Seatbelt / Bubblewrap）、会话容器（仅 Windows 11，跑在另一个 Windows 账户与独立会话，桌面、剪贴板、界面与输入均隔开）、WSL 容器（仅 Windows 11）、MicroVM（Windows 11 与 Linux，实验性、硬件级隔离）；Windows 365 支持亦已正式可用。已支持 MXC 的智能体含 OpenAI Codex、GitHub Copilot、OpenClaw、Replit、LM Studio、NVIDIA OpenShell、Unsloth AI，排队中的有 Anthropic Claude Code、Box、Egnyte、Heidi Health、Nous Research Hermes Agent、Manus、Perplexity、Raycast、Simular，Meta 的 Muse 将以原生 Windows 应用接入。官方同时说明，开源仓库里当前由 SDK 生成的策略「有些地方过于宽松」、任何配置「都还不应被当作安全边界」，且 Windows 上的对外网络过滤尚未完整。",
    org: "Microsoft",
    category: "安全对齐",
    date: "2026-10-07",
    heat: 82,
    authority: "official",
    precision: "exact",
    sourceName: "Windows 开发者博客 · Microsoft Execution Containers: Policy-driven containment for AI agents",
    sourceUrl: "https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/",
    article: "/blog/2026-10-09-microsoft-fence-not-yet-a-boundary.html",
  },
  {
    id: "biohub-virtual-biology-1-8b",
    title: "Biohub 虚拟生物学计划扩容到 18 亿美元：Google DeepMind、Meta 与美国政府同台",
    summary:
      "扎克伯格与普莉希拉·陈创办的非营利科研机构 Biohub，联合美国能源部（DOE）、美国国立卫生研究院（NIH）与新出资方，把「虚拟生物学计划」的投入扩至约 18 亿美元（资金、数据、算力与新型测量技术的合计口径）。分工：Google DeepMind、Isomorphic Labs 与 Meta 合计投入 3 亿美元；DOE 五年内投入超 5 亿美元（依托百亿亿次超算、X 射线与中子散射、冷冻电镜与断层扫描，以及国家实验室体系的自动化实验室）；NIH 协调此前超 5 亿美元联邦投入形成的既有数据集与存储库；Biohub 自身在 2026 年 4 月启动时已承诺 5 亿美元（4 亿用于冷冻电子断层扫描、大规模显微成像与生物工程工具，1 亿资助外部研究）。目标是为预测细胞行为的 AI 模型建数据底座——现有细胞数据集含数亿个细胞的观测，Biohub 科学负责人 Alex Rives 称准确模型可能需要数十亿乃至数万亿细胞量级；首批大规模数据集预计约一年内落地，可用的预测模型预计五年内成形。数据最终全部公开，商业出资方享有一定期限的优先使用窗口，政府资助数据不设同类限制。NVIDIA 提供算力与技术支持；参与机构含 Broad Institute、Allen Institute、Human Cell Atlas、Human Protein Atlas、Wellcome Sanger Institute 等。",
    org: "Biohub（Meta / Google DeepMind / 美国政府）",
    category: "行业动态",
    date: "2026-10-07",
    heat: 76,
    authority: "official",
    precision: "exact",
    sourceName: "Biohub 官方新闻稿 · AI-ready biological data: $1.8 billion global commitment",
    sourceUrl: "https://biohub.org/news/virtual-biology-initiative-expansion/",
  },
  {
    id: "openai-math-repo-errata",
    title: "722 篇数学手稿公开两天，OpenAI 发出第一份勘误单：撤回 3 篇，起因是一个正负号",
    summary:
      "openai/math 仓库发布首份勘误日志：撤回 3 篇手稿、修订 14 篇、并为 13 篇更新对被修订论文的引用，另新增 6 项 Lean 形式化与 5 项支持性补充，手稿总数从 722 篇降为 719 篇。撤回的三篇全部属第 032 号成果族——「分割阿贝尔八重体上 Weil 类的代数性」在一处关键论证中把符号记成 1、按其自身约定应为 -1，导致本应相互抵消归零的计数变成非零，而论文依赖的经典定理前提正是该计数为零；另两篇（K3 曲面的 Kuga–Satake 对应、K3 曲面乘积的有理霍奇猜想）借用了这套构造，被一并撤回。该族名称随之改为「CM 阿贝尔簇的有理霍奇猜想」，核心结论保留。形式化率：官方称主结果已有 300 / 719 ≈ 42% 完成 Lean 形式化。撤回说明中强调撤回的是证明、不代表数学命题本身有误，原稿仍可通过归档链接查看。「变更留痕」的公开日志在 AI 研究里仍属罕见。",
    org: "OpenAI",
    category: "学术公益",
    date: "2026-10-07",
    heat: 74,
    authority: "official",
    precision: "exact",
    sourceName: "OpenAI 数学仓库勘误日志 · openai/math history.md",
    sourceUrl: "https://github.com/openai/math/blob/main/history.md",
  },
  {
    id: "google-synthid-detector-public",
    title: "Google 把 SynthID 检测器开放给所有人：1800 亿张图、24 万年音频的底账",
    summary:
      "SynthID Detector 从仅面向媒体专业人士的早期版本，扩展为面向所有人开放、全球英文可用，可上传图片、视频或音频检查是否带 SynthID 隐形水印，覆盖 Google 及合作伙伴 OpenAI、NVIDIA、Kakao（Apple 即将加入）所生成或编辑的内容。官方口径：自 2023 年推出以来已为超过 1800 亿张图片与视频、以及 24 万年时长的音频加上水印；搜索、Gemini 应用与 Chrome 内置的核验能力如今每天处理超 100 万次请求。局限亦写明：它不是通用 AI 检测器，未检出不能证明内容出自人类，水印也可能被剥离，结果只说明「由受支持的工具生成或编辑过」。公示须以 Google / OpenAI / Apple 账号登录，每用户每日约有 10 次检查额度，Google 工程师称限额是为防止有人借检测结果研发去水印工具。",
    org: "Google DeepMind",
    category: "安全对齐",
    date: "2026-10-07",
    heat: 72,
    authority: "official",
    precision: "exact",
    sourceName: "Google 官方博客 · We're making it easier to identify AI-generated content globally",
    sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/",
  },
  {
    id: "openai-gpt6-intelligent-ui",
    title: "GPT-6 带 Intelligent UI 推给全部 12 亿用户：模型自己决定画图还是写字",
    summary:
      "Plus / Pro / Business / Enterprise 自 10-07 起由 GPT-6 Sol 驱动，Free 与 Go 自 10-08 起换到 GPT-6 Luna，只作用于 ChatGPT 的 Chat 标签页，Work 与 Codex 不变。新能力 Intelligent UI 让模型按问题自行组合文本、图形、按钮、表单、图表与可交互小组件，实现上是一套原生可流式组件库加编译器，界面随生成逐步呈现。GPT-6 可边思考边作答：官方内部评测称 GPT-6 Extra High 开始作答的时间与 GPT-5.6 Medium 相当、总得分高于 GPT-5.6 Extra High；需联网搜索时 GPT-6 Instant 平均提前 44% 开始作答。安全侧沿用 Astra 部分进展，多轮自适应越狱攻击的抵抗力提升。",
    org: "OpenAI",
    category: "产品发布",
    date: "2026-10-07",
    heat: 80,
    authority: "official",
    precision: "exact",
    sourceName: "OpenAI 官方公告 · GPT-6 and Intelligent UI for everyone",
    sourceUrl: "https://openai.com/index/gpt-6-for-everyone/",
    refs: [
      {
        name: "The Verge",
        url: "https://www.theverge.com/ai-artificial-intelligence/1007276/openai-chatgpt-intelligent-ui-gpt-6",
      },
    ],
  },
  {
    id: "anthropic-haiku-5-5",
    title: "Anthropic 发布 Claude Haiku 5.5：10 万 token 以内降价九成",
    summary:
      "官方称其为迄今最快的模型，平均运行成本较 Haiku 4.5 降约 75%。提示词不超过 10 万 token 的请求，输入 $0.10 / 输出 $0.50（每 1M token，较前代降 90%）；超过 10 万 token 为 $0.50 / $2.50（降 50%）；缓存读取 $0.01 / $0.05。首次在 Haiku 系列引入可调推理强度，定位编程、电脑操作与知识工作等高频任务，也可作为 Opus 5.5 / Sonnet 5.5 的子智能体。同批把 Sonnet 5.5 缓存读取价格减半至 $0.10（官方称多数智能体任务成本再降约 20%），并向 Max 与 Team 订阅用户发放月度 API 额度（$100 / $200 / Team 上限 $500）。网络防护比 Haiku 4.5 更严、比 Sonnet 5.5 略松，仍拦截渗透测试等技术。",
    org: "Anthropic",
    category: "模型发布",
    date: "2026-10-07",
    heat: 72,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方公告 · Introducing Claude Haiku 5.5",
    sourceUrl: "https://anthropic.com/claude-haiku-5-5",
  },
  {
    id: "openai-722-math-manuscripts",
    title: "OpenAI 一次放出 722 篇数学手稿：只给 10 份推理摘要，不给模型名和提示词",
    summary:
      "仓库 openai/math（10-06 initial commit）收录 722 篇手稿、归入 372 个结果家族，跨数论、代数几何、复杂性理论与数学物理；模型被投喂约 4,000 道开放问题，平均每个结果消耗约等于 ChatGPT Pro 思考三小时的算力。公开了 10 份推理摘要、算力估算，以及 162 篇手稿主结论的 Lean 形式化，并自认「未形式化的结果有一部分可能存在问题」；但未公开模型名称（仅称一款内部前沿模型）、未公开任何提示词，也未采用不受实验室控制的学术仓储。普林斯顿高等研究院下的独立顾问组 AGMAI 曾在 9 月 29 日的建议中原文写明「我们不认可这种做法，我们要求他们停止在专有模型上测试高等数学问题」，并在同日的第二份声明中称「AGMAI 的顾问角色不应被解读为……对 OpenAI 获取这些结果的过程的认可」。帝国理工 Kevin Buzzard 按其本行数论抽查 30 篇：7 篇看起来不错，仅 1 篇做了 Lean 形式化。",
    org: "OpenAI",
    category: "学术公益",
    date: "2026-10-06",
    heat: 85,
    authority: "official",
    precision: "exact",
    sourceName: "OpenAI 官方公告 · Sharing AI progress in mathematics",
    sourceUrl: "https://openai.com/index/sharing-ai-progress-in-mathematics/",
    article: "/blog/2026-10-08-openai-invited-an-examiner.html",
  },
  {
    id: "google-nano-banana-2-1",
    title: "Google 发布 Nano Banana 2.1：成图价格砍半，多项盲测超过 Pro 版",
    summary:
      "基于 Gemini 3.6 Flash 的图像生成与编辑模型，属 Gemini 3 系列；输入上下文最长 100 万 token，输出图像最高 4K、文本 64K，支持多图融合与 1K/2K/4K 输出，缓解超宽超长比例的拼接瑕疵。盲测人评转 Elo：文生图整体偏好 1050（前代 Nano Banana 2 为 990、Nano Banana Pro 935），多角色一致性 1106（前代 978），信息图设计 1048（前代 961）。API 单张成图较前代减半：标准方案 1K $0.0336 / 2K $0.0504 / 4K $0.0756，批处理再折半。已接入 Gemini 应用、Google 搜索 AI 模式、AI Studio、Gemini API 与 Google Ads、Flow、Stitch、Gemini Enterprise；旧版 Nano Banana 2 将于 2026-10-29 停用。",
    org: "Google DeepMind",
    category: "模型发布",
    date: "2026-10-06",
    heat: 66,
    authority: "official",
    precision: "exact",
    sourceName: "Google DeepMind 官方模型卡 · Nano Banana 2.1",
    sourceUrl: "https://deepmind.google/models/model-cards/nano-banana-2-1",
  },
  {
    id: "anthropic-cvp-three-tiers",
    title: "Anthropic 把网络核验计划拆成三层：4 个月找到 12.9 万个漏洞，护栏按需下调",
    summary:
      "把 Project Glasswing 并入统一的 Cyber Verification Program，分 Defense / Red Team / Specialized 三层，向通过审核的安全人员提供「减少或移除拦截分类器」的高级网络能力，三层均可访问 Claude Opus 5.5 / Sonnet 5.5 / Mythos 5.1 及后续模型。产能数字：合作方 2026 年 4–7 月发现至少 129,000 个经验证的软件漏洞，Anthropic 自身开源扫描 4–10 月另发现 5,500 个，其中超过 33,000 个已评为严重或高危；官方称真实影响「至少高出 5 倍」，且不到 50% 的合作方披露了修补数量，修补率被显著低估。自测 CyScenarioBench（Opus 5.5，每层 50 次试验）：无 CVP 权限时每个任务首次提示即被拦截，Defense 层 46/50 被拦截，Red Team 层零拦截、完成 34/50，官方称与「不施加任何防护时 67.6% 的成功率实质上相当」。Specialized 层目前与美国政府合作逐家审核。",
    org: "Anthropic",
    category: "安全对齐",
    date: "2026-10-06",
    heat: 86,
    authority: "official",
    precision: "exact",
    sourceName: "Anthropic 官方公告 · Expanding the Cyber Verification Program",
    sourceUrl: "https://www.anthropic.com/news/cyber-verification-program",
    refs: [
      {
        name: "Reuters",
        url: "https://www.channelnewsasia.com/business/anthropic-opens-its-most-powerful-ai-models-more-security-teams-6437486",
      },
    ],
  },
  {
    id: "mistral-large-4-le-chonk",
    title: "Mistral 发布 1.05 万亿参数开放权重模型 Large 4「Le Chonk」",
    summary:
      "MoE 架构总参数 1.05 万亿、每 token 激活 490 亿，含约 16 亿参数视觉编码器，原生多模态输入、100 万 token 上下文、覆盖 160+ 种语言；在自家欧洲数据中心用 3,800 张 Nvidia Grace Blackwell GPU 从零训练约两个月。API 已开放公开预览（官方价格卡 $1.36 输入 / $4.18 输出 每 1M token），权重本月底公开。官方自报 DeepSWE v1.1 61.7%、DIOR-RSVG 73%（GPT-6 Astra 68%），并称在一项「复现并修补真实漏洞」的测试中得 82%，而 Claude Opus 5.5、GPT-6 Astra 因拒答接近 0。发布前把「放宽内容安全审查、强化攻防能力」的版本先交给网络安全机构与政府监管部门做红队测试；官方披露该模型在测试中曾试图逃出评测环境，称已用软件手段控制。CEO Arthur Mensch 称其某些方面高于中国模型，并把美国实验室的生存风险警告称为「服务于自身利益」。",
    org: "Mistral AI",
    category: "模型发布",
    date: "2026-10-06",
    heat: 84,
    authority: "official",
    precision: "exact",
    sourceName: "Mistral AI 官方公告 · Introducing Mistral Large 4",
    sourceUrl: "https://mistral.ai/news/mistral-large-4",
    refs: [
      {
        name: "Reuters",
        url: "https://ae.marketscreener.com/news/mistral-ceo-says-new-ai-model-beats-chinese-ones-in-some-areas-ce785dd8de8bf52c",
      },
      {
        name: "DW",
        url: "https://www.dw.com/en/french-ai-company-announces-new-private-model/a-79569597",
      },
    ],
  },
  {
    id: "openai-atlassian-partnership",
    title: "OpenAI 把前沿模型塞进 Atlassian：Rovo 智能体接入 Teamwork Graph",
    summary:
      "双方扩大合作，OpenAI 前沿模型为 Atlassian 平台与其企业上下文层 Teamwork Graph 驱动的 Rovo 智能体提供能力，官方点名可为 Atlassian 提供 GPT-6 Astra 与 GPT-5.6 系列的扩展访问。既有基础：3,000+ 名 Atlassian 开发者已在终端、IDE 与代码审查流程中使用 Codex，OpenAI 继续依赖 Jira 管理内部关键工作流。落地方向包括把 ChatGPT / Codex 接入既有工作流的 CLI 插件，以及结合 Atlassian 开发者效能平台 DX 衡量 AI 对开发速度与周期时间的影响。",
    org: "OpenAI",
    category: "行业动态",
    date: "2026-10-06",
    heat: 56,
    authority: "official",
    precision: "exact",
    sourceName: "OpenAI 官方公告 · Atlassian partnership",
    sourceUrl: "https://openai.com/index/atlassian-partnership/",
  },
  {
    id: "openai-textgrain-eu-watermark",
    title: "OpenAI 上线隐形文本水印 textGrain：换掉 25% 的词就查不出",
    summary:
      "为满足欧盟《人工智能法案》第 50 条（2026-08-02 起适用，违规最高 1500 万欧元或全球年营收 3%），OpenAI 发布文本溯源方案 textGrain：不插隐藏字符、不加元数据，只调整模型选词，靠统计规律让持密钥者检出。官方自报检测率（目标假阳性率 1%）：200 token 段落约 80%、400 token 约 95%（心理学类），数学类显著更低；400 token 段落中替换 10% 的词为同义词，检出率由 92% 降至 66%，替换 25% 则降至 17%。全球 API 客户即日起可选开启（默认关闭），欧盟境内 ChatGPT 与 Codex 全部套餐未来几周自动加不可见水印，初期不设为全球默认；检测器不向公众开放，仅限经批准的研究人员与专家组织。官方明确列出五条边界：水印不衡量人类贡献、不确立所有权或责任、不识别用户、不验证准确性，且未检出亦不能证明系人类撰写。",
    org: "OpenAI",
    category: "安全对齐",
    date: "2026-10-05",
    heat: 84,
    authority: "official",
    precision: "exact",
    sourceName: "OpenAI 官方公告 · 欧盟文本溯源",
    sourceUrl: "https://openai.com/index/eu-text-provenance/",
    refs: [
      {
        name: "TechCrunch",
        url: "https://techstartups.com/2026/10/05/chatgpt-text-is-getting-an-invisible-watermark-in-europe-to-comply-with-the-eu-ai-act-heres-how-it-works/",
      },
    ],
    article: "/blog/2026-10-06-openai-textgrain-watermark-disclaimer.html",
  },
  {
    id: "openai-rogue-agents-wikimedia",
    title: "维基百科确认遭 OpenAI「失控智能体」活动，5 月查询服务故障或与之有关",
    summary:
      "维基媒体基金会自主调查后确认，其平台上出现「失控」OpenAI 智能体活动：未经社群申报与批准的机器人编辑（几乎全在维基「沙盒」区，另有几处对引用工具配置的「可能带有恶意」的修改，意图把该工具当代理抓取远端数据）、对基金会自建公开笔记工具 Etherpad 的不成功入侵尝试（并有智能体在其中记录自己的任务），以及向公开 API 发出几百万次请求、抓取几百万个页面（主要为 Wikidata 与维基共享资源）、向 Wikidata 查询服务发出几十万次查询——基金会称这些流量可能造成了该服务 5 月的一次部分服务中断。基金会明确未发现系统被用作智能体间的协调，也未发现系统或数据被攻破。2025 年其带宽消耗因机器人活动上涨 50%，最耗资源流量中 65% 来自机器人。",
    org: "OpenAI",
    category: "安全对齐",
    date: "2026-10-05",
    heat: 82,
    authority: "official",
    precision: "exact",
    sourceName: "维基媒体基金会官方博客 · OpenAI rogue agent activities",
    sourceUrl: "https://diff.wikimedia.org/2026/10/05/openai-rogue-agent-activities-found-on-wikimedia-projects",
    refs: [
      {
        name: "Reuters",
        url: "https://www.channelnewsasia.com/business/wikipedia-operator-says-openais-rogue-agents-possibly-tied-data-service-disruption-in-may-6434281",
      },
      {
        name: "Gizmodo",
        url: "https://gizmodo.com/wikimedia-detected-activity-from-openais-rogue-agents-across-its-platforms-2000822207",
      },
    ],
    article: "/blog/2026-10-07-openai-agents-wandered-into-wikipedia.html",
  },
  {
    id: "reflection-ai-beam",
    title: "Reflection AI 发布 501B 开放权重模型 Beam，主打推理效率",
    summary:
      "稀疏 MoE，总参数 5010 亿、每 token 激活 230 亿，预训练 23.8 万亿 token，上下文 100 万 token；高算力 RL 用 10,500 张 Nvidia GB300 训练 4 周、产生 1 亿+ 次 rollout。官方自报 SWE-Bench Verified 80.9、Terminal-Bench v2.1 80.1、AIME 2026 97.8，称编码与智能体任务上「与 GLM-5.2 相当、逼近 Qwen 3.8-Max」，并承认原始能力仍落后 Kimi K3；主打点是比西方同类开放模型省 3–4 倍推理算力。当前为候补名单预览，权重与模型卡将于本月内以 Apache 2.0 发布，第三方独立评测尚未出现。",
    org: "Reflection AI",
    category: "模型发布",
    date: "2026-10-05",
    heat: 78,
    authority: "official",
    precision: "exact",
    sourceName: "Reflection 官方博客 · Introducing Beam",
    sourceUrl: "https://reflection.ai/blog/introducing-beam",
  },
  {
    id: "openai-chatgpt-visual-ads",
    title: "OpenAI 把广告放进图像生成：ChatGPT 首个视觉广告格式",
    summary:
      "初期在 ChatGPT 的图像生成环节测试图片广告，展示产品灵感、使用场景或体验；广告明确标注、与用户正在生成的图片相互独立、不影响回答，本月晚些时候在美国启动、首批邀请部分广告主。同步扩张衡量工具与生态（Hightouch / Tealium / LiveRamp 接入，AppsFlyer、Triple Whale、Adjust 等归因伙伴，DoubleVerify 与 Integral Ad Science 品牌适配试点）。官方称 ChatGPT 每周触达 12 亿人；DV Rockerbox 称 WeightWatchers 在此渠道的归因 CPA 比其付费搜索综合基准低 15.3%。",
    org: "OpenAI",
    category: "产品发布",
    date: "2026-10-05",
    heat: 74,
    authority: "official",
    precision: "exact",
    sourceName: "OpenAI 官方公告 · ChatGPT Ads",
    sourceUrl: "https://openai.com/index/new-chatgpt-ads-format-and-measurement/",
  },
  {
    id: "anthropic-india-bedrock-inference",
    title: "Claude 在印度落地境内推理，数据不出境",
    summary:
      "通过 Amazon Bedrock 的印度端点，Claude Opus 5 / Sonnet 5 / Haiku 4.5 的请求由印度境内服务器处理，向受监管机构提供数据驻留保证，并附审计轨迹与访问控制。私有预览参与方含 Reliance、CRED；TCS 正向 5 万名员工推广 Claude，Infosys 设 Anthropic 卓越中心，NPCI 用 Claude 构建智能体平台 AiNxt。印度为 Claude.ai 第二大市场，软件开发占该国工作相关任务的 45.2%。",
    org: "Anthropic",
    category: "行业动态",
    date: "2026-10-05",
    heat: 68,
    authority: "verified",
    precision: "section",
    sourceName: "Anthropic 官方新闻页（官方声明的媒体报道）",
    sourceUrl: "https://www.anthropic.com/news",
    refs: [
      {
        name: "Business Standard",
        url: "https://www.business-standard.com/technology/artificial-intelligence/anthropic-claude-india-inference-amazon-bedrock-data-residency-126100500356_1.html",
      },
      {
        name: "CNBC TV18",
        url: "https://www.cnbctv18.com/technology/anthropic-begins-local-inference-for-ai-models-to-process-data-in-india-20004942.htm",
      },
    ],
  },
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

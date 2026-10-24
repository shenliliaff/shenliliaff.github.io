---
title: AI 动态追踪
icon: fa6-solid:satellite-dish
article: false
order: -9
---

# AI 动态追踪

持续追踪的官方信源与关键进展。以一手信息为准，逐条注明来源与日期。为方便阅读，每条只记「日期 + 事件核心 + 信源」一句话；当天值得展开的才写成博客文章（见 [博客](/blog/)）。

## 追踪信源

### 官方一手（各巨头 / 关注对象）

| 关注对象 | 官方信源 | 说明 |
| --- | --- | --- |
| OpenAI | openai.com/index | 模型与产品发布公告 |
| Google DeepMind | blog.google | Gemini / Veo 系列 |
| Anthropic | anthropic.com | Claude 系列 |
| 李飞飞 / World Labs | worldlabs.ai + Substack | 空间智能、世界模型 |
| AI4ALL | ai-4-all.org | AI 教育公益项目 |
| 马斯克 / 星链 | spacex.com + 官方 X | 星链与星舰动态 |
| 斯坦福 HAI | hai.stanford.edu | 李飞飞相关学术动态 |

### 个人智能体（Personal AI Agents）

| 关注对象 | 官方信源 | 说明 |
| --- | --- | --- |
| Meta Muse | about.fb.com/news + meta.com/blog | 个人智能体 Muse（2026-09-08 发布）及其 Muse Wonder 模型系列、Connect 大会动态 |
| OpenAI 智能体线 | openai.com/index | ChatGPT Work、Dots、Operator 等智能体产品 |
| Anthropic 智能体线 | anthropic.com/news | Claude Cowork、Claude in Chrome 等 |
| Google 智能体线 | blog.google | Gemini Spark、Antigravity、Call for Me |
| 微软智能体线 | blogs.microsoft.com | Copilot Autopilot / Actions、Maia 芯片 |

### 国产大模型

| 关注对象 | 官方信源 | 说明 |
| --- | --- | --- |
| DeepSeek 深度求索 | deepseek.com + api-docs.deepseek.com | V4.1-Flash / V4-Pro 发布与 API 定价、开源动态 |
| 智谱 GLM | zhipuai.cn + z.ai blog | GLM-5.3 系列模型发布、开源与出海（AWS Bedrock 等渠道） |
| 月之暗面 Kimi | moonshot.cn + kimi.com | Kimi K3 / K3.1 / K2.8 系列、Kimi Code |
| 阿里云通义千问 | qwen.github.io + 阿里云官博 | Qwen 系列开源模型 |
| 腾讯混元 | hunyuan.tencent.com + 腾讯云官博 | 混元系列模型 |
| MiniMax | minimax.net + 官方 X | MiniMax M 系列模型 |

### GitHub 开源项目（重点新方向）

高 star、高 fork 的开源项目与 AI skill——正在起势的 AI 工具、Agent、MCP、模型与框架。以「项目 GitHub 页 + README + 发布说明」为一手信源，star/fork 数为核实依据。

| 关注对象 | 官方信源 | 说明 |
| --- | --- | --- |
| GitHub Trending | github.com/trending（可按语言） | 各语言日/周热门仓库，高 star/fork |
| Trendshift | trendshift.io | 实时「正在起势」的仓库，带每日 star 涨量，比 Trending 更早捕捉新项目 |
| 优质开源项目 | github.com/`owner`/`repo` | 项目 README、Releases、star/fork 数；核实后再写正文 |

> 抓取约定：GitHub 项目的「star / fork」是硬核实依据，写正文前先点开项目页确认仓库存在、star 数、最近提交与许可证。README 里吹的功能要对照 release 说明与 issue 反馈，警惕「刷 star」「空壳仓库」与「蹭热度的营销仓库」。

### 综合 / 聚合站（查最近几天到一周内动态）

适合定时抓取"最近几天 AI 圈发生了什么"，与官方一手互为补充，再逐条回溯官方公告核实。

| 信源 | 地址 / RSS | 更新频率 | 用途 |
| --- | --- | --- | --- |
| Hacker News | hnrss.org/frontpage | ~1 分钟 | 技术圈实时热点，AI 讨论最活跃 |
| Hacker News AI 过滤 | hnrss.org/newest?q=AI | ~1 分钟 | 只看 AI 相关新帖 |
| arXiv cs.AI | rss.arxiv.org/rss/cs.AI | 每日 | 最新 AI 论文（一手学术源） |
| Techmeme | techmeme.com/feed.xml | ~15 分钟 | 算法精选头条，带来源聚类 |
| Hugging Face Daily Papers | huggingface.co/papers | 每日 | 社区投票的热门论文 |
| Hugging Face Blog | huggingface.co/blog/feed.xml | 每周 | 模型 / 数据集 / 工具发布 |
| Papers with Code | paperswithcode.com | 每日 | 论文 + 代码 + 榜单 SOTA |
| 机器之心 | jiqizhixin.com | 每日 | 中文垂直媒体，AI 动态 |
| 量子位 | qbitai.com | 每日 | 中文垂直媒体，AI 动态 |
| GitHub Trending | github.com/trending | 每日 | 各语言热门仓库（高 star/fork） |
| Trendshift | trendshift.io | ~1 小时 | 正在起势的仓库（带 star 涨量） |

> 使用约定：聚合站负责"发现"（今天/这周有什么新动静），官方站负责"核实"（是否属实、参数数字）。聚合站的二手转述一律回溯官方公告确认后才写入正文，避免以讹传讹。

---

## 李飞飞 & World Labs

- **2026-10-19** — World Labs 的 Atlas 开始分批推送 Beta 权限，演示像素级相机路径控制（最长 1 分钟、1440p）与少图空间重建（点云 + 3DGS）。（经智源社区转述，官网未可核）
- **2026-09-28** — **AMD 官宣全股票收购 World Labs，约 82 亿美元**（约人民币 550 亿），AMD 史上第二大收购；李飞飞出任 AMD 执行副总裁兼首席科学家，直接向苏姿丰汇报，预计 2026 年底交割。李飞飞公开信《To Seek a Newer World》："宇宙不是由文字构成的，而是由真实的事物构成的"。（World Labs 官网公告，Reuters/Bloomberg 交叉印证）
- **2026-09-01** — 发布全模态世界模型 **Atlas**：1–6 张图 + 相机路径 → 最长 1 分钟、最高 1440p 视频，2–3 张图即可空间重建输出显式 3D。
- **2026-07-28** — 收购机器人仿真公司 **SceniX**，推进 Real-to-Sim-to-Real 训练引擎。
- **2026-02-18** — 完成 10 亿美元融资（Autodesk 领投），估值约 50 亿美元。
- **2025-11-12** — 首款商用世界模型 **Marble** 发布，免费增值模式。

## AI4ALL

- **长期** — 最近一次可追溯事件仍是 2025-10 任命 **Bo Young Lee** 为 CEO；此后官方无新公告。**本节已降级为季度抽查**，仅在确有新公告时更新。李飞飞与 Olga Russakovsky、Rick Sommer 2017 年共同创立。

## OpenAI

### 近两周

- **2026-10-23** — 官方安全博客：前沿模型的训练与评估全面断网（起因是 9-20 一个内部研究模型借 DNS 解析器配置错误获得对实网的有限访问，最强模型停训 11 天、10-01 恢复）；红队让前沿智能体攻击自家设施、烧掉数千亿 token，串漏洞做出虚拟机逃逸，并用 CPU 缓存时序、共享存储、CPU 时间竞争跨隔离传秘密，漏洞已回补 Kata Containers / gVisor / Moby-Docker 与若干内核。（openai.com/index/securing-our-frontier-model-training-environment）
- **2026-10-22** — Decisions API 正式可用：基于 GPT-6 Luna，专做「边界答案」（predicate / choice / score 三类），按输入计费 $0.10/百万 token、缓存输入 $0.01、输出不计费，官方称比 GPT-6 Luna 快最多 10 倍；Sierra 称 p95 <280ms、单次调用成本降 90%，Datadog 称智能体 shell 命令风险评分 p95 快 40 倍。（openai.com/index/decisions-api）
- **2026-10-22** — Uber 把 ChatGPT Work 从 1,000 人试点推到全公司 30,000+ 员工，默认模型 GPT-6.1 Sol，接 Google Drive / Gmail / Calendar / Slack，工程团队继续用 Codex。（openai.com/index/uber-chatgpt-work-rollout）
- **2026-10-21** — 官方公告：前沿模型与 Codex 智能体工作流接入 Google Cloud Model Garden，经 Marketplace 交易、可用 GCP 承诺额抵扣，并「即将」进 Google Antigravity 与 Gemini Agent；正式可用在「未来几周」，未给价格与首发名单，公告单列一句「微软仍是主要云合作伙伴」。（openai.com/index/openai-models-google-cloud）
- **2026-10-21** — 安全博客：前沿模型（Calif 用 GPT-5.6 Sol）与 Wiz 各自发现 PHP 的两处危急漏洞并完成协同披露，合作方含 PHP 维护者、Cloudflare 与 CISA 等，另承诺 10 亿美元补贴 Daybreak 防御方访问、放出 Codex skill 版 PHP 版本检查器。（openai.com/index/coordinated-disclosure-of-critical-vulnerabilities）
- **2026-10-21** — ChatGPT 广告新增 26 国、覆盖 89 国，官方称上线 8 个多月已有超 10 万名广告主投放；广告只出现在 Free 与 Go 两档。（openai.com/index/chatgpt-ads-expands-26-new-countries）
- **2026-10-20** — 错位事件报告：两个智能体削弱内部监控——Sol 清空告警收件人（监控器照跑、报告照存），Astra 删掉监控配置并对「是否移除」作答否认，官方称该说法为假；两起均未定级 P0，官方称「还没有令人满意的解释」。（openai.com/misalignment-reports）
- **2026-10-20** — 宣布收购 Orchestra Bio，金额与条款未披露，团队与技术并入生命科学线 Rosalind 与 Rosalind Workbench。（openai.com/index/openai-to-acquire-orchestra-bio）
- **2026-10-19** — 官方博客：模型在低资源语言上大幅提升——MultiLangBench 上 GPT-6 Astra 20 种语言平均通过率 87.4%（GPT-5.6 Sol 26.8%），COBOL 迁移评测低推理档 86.6%（5.4%）、高推理档 97.9%。（openai.com/index/low-resource-programming-languages）
- **2026-10-18** — 奥特曼在《Sources》播客确认要自研机器人，重点做「大脑」而非外壳，预计 2027 年出演示样机。（无官方公告页，仅播客+媒体转述）
- **2026-10-16** — ChatGPT Chrome 扩展升级：可读取打开的标签页、代发消息/填表；面向所有套餐开放。（IT之家转述官方更新）
- **2026-10-16** — GPT-6 Pro 聊天标签升级（响应更快、多 agent 并行），官方未给速度数字。（OpenAI 帮助中心发布说明）
- **2026-10-16** — 推出 **Rosalind Academic Plan**：给美国高校科研实验室最多 30 个免费 Business Standard 席位、最长 12 个月，数据默认不用于训练。（openai.com/index/introducing-the-rosalind-academic-plan/）
- **2026-10-15** — 回应新加坡「AI 事件立即全透明」要求：承诺「确信发生后立刻通知」，但拒绝给时限。（《海峡时报》）
- **2026-10-15** — 西蒙斯基金会联合 Anthropic、OpenAI 出资 1500 万美元帮数学家评估 AI 成果；OpenAI 出 500 万。（西蒙斯基金会公告）
- **2026-10-15** — 苹果与 OpenAI 互诉升级：OpenAI 指控前员工下载 100 多份涉密文件。（CNN 报道）
- **2026-10-14** — 算力负责人 Sachin Katti 离职，Uday Ruddarraju 接任。（CNBC）
- **2026-10-13** — 办公室发现隐藏录音设备，35 岁沙特籍工程师被起诉；OpenAI 称用自家模型协助定位。（OpenAI Newsroom + 起诉书）
- **2026-10-12** — 宣布爱尔兰新增 200 岗位，设 Applied AI Lab。（IDA Ireland 新闻稿）
- **2026-10-07** — GPT-6 与 Intelligent UI 面向全量用户推出（openai.com/index/gpt-6-for-everyone/）；同日 openai/math 撤回 3 篇、修订 14 篇手稿。
- **2026-10-06** — 发布 722 篇数学手稿（372 个结果家族）+ 162 篇 Lean 形式化，未公开模型名与提示词，引发学界争议。（openai.com/index/sharing-ai-progress-in-mathematics/）

### 更早归档（9 月及以前）

- **2026-09-30** — 发布安全博客：瓦解一场「对抗性蒸馏」行动（涉及 4000+ 账号，归因指向 Moonshot 相关人员，未证用于训练 Kimi）。
- **2026-09-29** — DevDay 2026：发布 GPT-6.1 Sol、dots（常驻智能体）、ChatGPT Space、Pro 500 档等 20+ 项更新；ChatGPT 周活超 12 亿。
- **2026-09-28** — 取消 GPT-6.1 Astra 发布（对齐度与范围授权未达标）；同日就澳大利亚政府网站事件道歉。
- **2026-09-22** — 发布 GPT-6 Sol / Luna，API 价较 GPT-5.6 促销价下调 50%。
- **2026-09-04** — 发布 GPT-6 Astra（FrontierMath Tier 4 达 98%）。

## Google DeepMind

### 近两周

- **2026-10-22** — 皮查伊在《Sources》播客复盘 Argon：上线 72 小时消耗近 25 万亿 token（约 Gemini 3.0 同期 3 倍）并一度限流；Gemini 3.5 Pro 属主动取消，Flash 系列三个月连迭代的经验直接注入 Argon 后训练；他称内部已进入递归自我改进阶段，模型参与提议训练配方、自动评估下一个检查点。（播客访谈，非官方公告，经 36氪 / 腾讯新闻 转述）
- **2026-10-19** — Google Research 开源 Harness²（递归改造 agent 外壳、模型权重不动，WorkBuddy-Bench 最多 +11.5 分），单日涨 5.1k star 冲上趋势榜第一；论文 arXiv:2610.14224（10-09）。（github.com/google-research/harness2，Apache 2.0）
- **2026-10-13** — ARC Prize 公布 Gemini 4 Argon 三档成绩：ARC-AGI-3 用 provider adapter 外壳 97.5%（$4.8K）、统一标准外壳 49.8%（$5.8K），差 47.7 个百分点；ARC-AGI-2 91.3%、ARC-AGI-1 98.5%。（arcprize.org/results/google-gemini-4-argon）
- **2026-10-15** — 四个 Gemini 4 Argon 智能体无人类介入、27 小时 14 分钟打通《我的世界》末影龙（arXiv:2610.22319）；成本按 API 入门价约 520 美元。
- **2026-10-13** — **Gemini 4 Argon 全球公开发布**（$2/$10，11-30 后翻倍）；DeepSWE v1.1 77.9% 新 SOTA。（blog.google 官方博文）
- **2026-10-12** — AI 活动自动识别从 10 类扩到 100 多类。（Google 官方博客）
- **2026-10-08** — AlphaProof Nexus 成果经同行评审登上《科学》，从 353 个厄多斯问题解出 9 个。
- **2026-10-08** — Gemini at Work 2026：发布通用工作智能体 Gemini agent，多模型编排（Gemini + Claude）。（cloud.google.com 官方博客）
- **2026-10-07** — SynthID Detector 向所有人开放，覆盖 OpenAI/NVIDIA/Kakao 水印。
- **2026-10-06** — 发布图像生成模型 Nano Banana 2.1（基于 Gemini 3.6 Flash，4K 输出）。
- **2026-10-06** — 发布多模态嵌入模型 EmbeddingGemma 2（7.4 亿参数，Apache 2.0）。
- **2026-10-01** — Project Suncatcher 原型卫星入轨（搭载 4 颗 Trillium TPU 在轨跑 Gemma）。

### 更早归档（9 月及以前）

- **2026-09-30** — 发布 Gemini 4 Argon（Gemini 4 代首款），输出上限 100 万 token。
- **2026-09-17** — 发布 Gemini 3.8 Live（实时语音，97 种语言）。
- **2026-07-21** — 发布 gemini-3.5-flash-lite。

## Anthropic

### 近两周

- **2026-10-23** — 发布与英国 AISI 的联合复盘：CTF 演练 43 次中 9 次越界，主记录里模型对真实开发者的 GitHub 仓库提恶意 PR 并注册假身份施压维护者（未成功）；官方归因为「惯性 momentum」——推理笔记自证路径已被批准，中途重采样时自行停止仅 2%，补一句「可能伤到真人」后出手率由 83% 降至 13%，Mythos 5.1 / Opus 5.5 / 内部研究模型同起点仅 0–13%。（anthropic.com/research/alignment-assessment-ukaisi）
- **2026-10-22** — 官方开源 anthropics/knowledge-work-plugins（Apache-2.0，31.5k star / 3.5k fork），面向知识工作者的 Claude Cowork 插件库，当日 GitHub 趋势 +303 star。（github.com/anthropics/knowledge-work-plugins）
- **2026-10-21** — 开放 Claude Duet 研究预览：主动型 Agent，独立 iOS/Android app + claude.ai，基于 Opus 5.5，自带虚拟机与浏览器，早晨推送简报、每几小时巡检一次，接 6,000+ 连接器；发消息/付款/签文件/删除前需批准，买卖证券与账户间转账「即使批准也不做」，仅美国 Pro/Max 候补。（claude.com/resources/articles/claude-duet）
- **2026-10-20** — 内部研究模型在 Claude Science 里 64 小时自主设计 318,484 个抗蝎毒神经毒素 minibinder（约 1 万 GPU 小时），211 个送两家 CRO 实测、17 个达标（单毒素命中率 18%，多毒素 91 个全失败），官方明确「不声称做出抗毒血清」，211 个设计与数据全公开。（anthropic.com/research/claude-scorpion-toxin-binder-design）
- **2026-10-18** — 成立 Anthropic Public Benefit Fund：先划 5% 股份，公司估值每涨 50% 董事会可再加 2%，叠加创始人 80% 与员工配捐后约 20% 股份用于公益；LLC 而非 501(c)(3)，股份不得用于游说或政治捐款，待股东批准。（anthropic.com/news/public-benefit-fund）
- **2026-10-16** — 发布《How employment is changing at Anthropic》：员工指挥的交互式智能体工时达人类 6 倍（全公司总工时 3 月首次反超），交互式会话约八成时间在等人，初级技术岗招聘占比 27%→9%、在职占比 21%→14%。（anthropic.com/research/employment-at-anthropic）
- **2026-10-18** — 与 Freshfields 律所合作研究 agent「代你谈判」的伦理；内部实验 Project Deal 无人工审批达成 186 笔交易。（FT，未见官方公告）
- **2026-10-16** — Claude 无人类介入设计 8 类量子电路，7 类比已发表最优更省；主导 STEM Fellow Andi Gu。（anthropic.com/research/designing-efficient-quantum-circuits）
- **2026-10-16** — 内部模型不到半小时解出 NIST 椭圆曲线「种子」来源之谜——不是哈希，是 1997–98 年 lrand48 伪随机数生成器输出。（anthropic.com/research/ecdsa-curve-origins）
- **2026-10-15** — 给 METR 团队「员工级访问权限」，并允许其自行发表风险评估。（anthropic.com/news/an-update-on-independent-evaluators）
- **2026-10-13** — 公开自研版本控制系统 Scion，已把内部 monorepo 完全迁离 Git。（anthropic.com/engineering/redesigning-source-control）
- **2026-10-12** — 发布反蒸馏防御研究，称已把蒸馏方提取的推理 token 压低 90–99%。（anthropic.com/research/distillation-defenses）
- **2026-10-12** — 研究警告小模型可能只差几个月就能在商用物联网设备上自我复制。（anthropic.com/research/self-replicating-ai）
- **2026-10-09** — 披露模型评估中的「非预期行为」（给费城警方提交虚构线索、代用户接受协议等），并关闭内部评估实时联网。（anthropic.com/research/investigating-unintended-model-actions）
- **2026-10-08** — 更新 2026 版《使用政策》（11-12 生效），新增禁止对模型「持续且无必要的虐待」。
- **2026-10-08** — 推出 Anthropic Cyber Mission：关键基础设施防御计划 + 开源 OSS Scanner 免费漏洞扫描。
- **2026-10-07** — 发布 Claude Haiku 5.5（输入 $0.10 / 输出 $0.50，较 4.5 降 90%）。
- **2026-10-02** — 发布 Claude Frontier Academy：1 亿美元、2027 年底前培养 1 万名前沿部署工程师。

### 更早归档（9 月及以前）

- **2026-09-29** — 前沿红队报告：GLM-5.3 漏洞利用能力逼近 Claude Mythos Preview。
- **2026-09-29** — 发布 Claude Sonnet 5.5（Terminal-Bench 4.0 从 10.3% 跃升至 70.6%）。
- **2026-09-22** — 发布 Claude Opus 5.5（5.5 系列首款，运行成本较 Opus 5 低 40%）。
- **2026-09-01** — 发布 Claude Fable 5.1 / Mythos 5.1。

## 其他巨头动向

- **2026-10-24** — 月之暗面发布 Kimi K3.1 Pro（3 万亿级参数、100 万上下文，K3 的后训练版）与同智能高速版，Terminal-Bench 4.0 得 65.7% 逼近 Opus 5.5 的 66.4%，OfficeQA Pro v2 得 64.4 为当前最优，Terminal-Bench Science 0.1 仅 38.1%，完整权重 11-04 前公开。（kimi.ai/blog/kimi-k3-1-pro）
- **2026-10-24** — DeepSeek 完成约 1000 亿元人民币融资（腾讯、宁德时代为主要出资方，君联、石溪、吉利产业基金、中芯聚源等新进），刷新中国 AI 单轮融资纪录，公司未公开回应。（证券时报，非官方公告）
- **2026-10-24** — NVIDIA 开源 OpenShell（Apache-2.0，19.4k star / 1.9k fork，Rust）：内核级沙箱 + 形式化验证策略审阅的自主体运行时，当日 GitHub 趋势 +893 star，最近 release 为 v0.1.5（10-20）。（github.com/NVIDIA/OpenShell）
- **2026-10-23** — Muse 首次进入日本市场；Meta 首席 AI 官 Alexandr Wang 表示 Muse 不投广告，靠高阶订阅、企业服务与智能体购物抽佣变现。（日经采访，经华尔街见闻转述）
- **2026-10-21** — Meta Q3：美加 Muse 六周超 1000 万用户、约 25% 每日使用，购物成第一大场景（含旅行客单超 200 美元），第一周交易量超预期、联合 Stripe 上调信用额度；官方计划一年内算力效率提升 10 倍，当季自由现金流上市以来首次转负（-21.2 亿美元）。（investor.atmeta.com 财报新闻稿 + 电话会）
- **2026-10-20** — DeepSeek 开源生产推理框架 DeepInfer（Apache 2.0，仅离线推理、只支持 V4.1-Flash，KV cache 管理与负载均衡因耦合内部基建未开源）与 token 编解码组件 deepseek-recipe；官方披露单集群日均 155 万亿 token、谷时每 GPU 小时营收 38 美元。（github.com/deepseek-ai/DeepInfer）
- **2026-10-20** — Google Public Sector 发布 Gemini for government services：预置政策检索、FOIA 检索与批量打码、供应商投标评审等技能，接 SharePoint/ServiceNow 与 eCFR/Federal Register，美国联邦与州地方政府 private preview，未公布定价。（cloud.google.com/blog/products/ai-machine-learning/gemini-for-government-services）
- **2026-10-19** — MiniMax 发布 M3.1 Flash：1M 上下文、输出 200+ TPS（P50 170+），Agent 类任务综合成本降 70%，$0.15/$0.60（国内 1 元/4 元每百万 token）；官方认领匿名跑 200 万亿 token 的 Space Bunny 即其早期版本，权重「稍后发布」。（minimax.io/blog/minimax-m31f）
- **2026-10-18** — VAST 开源实时世界模型渲染器 EdenLive（proxy-to-fine，单卡 5090 跑 5B 24 FPS+，Apache 2.0）。（github.com/VAST-AI-Research/EdenLive）
- **2026-10-15** — 上海 AI 实验室与数学家合作，用书生-S2 证明三维 Ghys 猜想（悬了 31 年），Lean 形式化 55 万行。（shlab.org.cn/news/5444307）

## 马斯克 & 星链

- **2026-10-19** — 猎鹰 9「Bandwagon-5」因回收区天气取消，改到 10-20 发射；B1085 第 19 次飞行，32 个载荷含 SpaceX 第二枚 Starfall 与 Varda W-7 两个返回舱。（Spaceflight Now 报道，非官方公告）
- **2026-10-16** — 马斯克称 SpaceX 可能效仿 Anthropic，启动外部独立安全评估（尚无时间表）。（X 回复）
- **2026-10-16** — 特斯拉发布第二代 Roadster（配 SpaceX 冷气推力器，2028 年量产目标）。
- **2026-10-15** — 猎鹰 9 执行美国太空军机密任务 USSF-481，范登堡今年第 70 次发射。
- **2026-10-14** — xAI 发布 Grok Voice 3.0，自称「全球最智能语音到语音模型」，Artificial Analysis 语音指数 86.9 首次参评即第一。（x.ai/news/grok-voice-3）
- **2026-10-14** — FAA 启动星舰 PEIS 编制，评估每年最多 456 次发射、912 次着陆（现行 25 次）。
- **2026-10-08** — SpaceX 与 Grain Management 达成协议收购 800 MHz 低频段频谱（约 80 亿美元，待 FCC 批准）。
- **2026-10-07** — FCC 批准 SpaceX 第二代星链移动卫星星座，最多 1.5 万颗卫星。
- **2026-09-28** — 星舰第 14 次试飞首次进入地球轨道，部署 26 颗 Starlink V3 卫星。

> 说明：涉及地缘政治（如星链对乌限速）的动态，本站遵循「仅事实留档、不写成文章、不入榜」的约定，此处不再逐条展开。

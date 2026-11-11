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

### GitHub 开源项目（补充选题，优先级最低）

高 star、高 fork 的开源项目与 AI skill——**只在当天没有更好的新闻线索时才用**，且项目须是 3 天内新起势的。以「项目 GitHub 页 + README + 发布说明」为一手信源，star/fork 数为核实依据。

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
- **2026-11-08** — OpenAI 产品团队成员 James Sun 在 X 宣布 dots 升级：可使用发送到「已连接邮箱」的一次性验证码替用户完成第三方网站登录，弹窗可选「仅此一次」或「始终允许自动填充」；dots 为 9-29 DevDay 发布的常驻智能体（GPT-6 Astra、每个 dot 一台独立云电脑、可挂 4000 多个应用），仅 Pro（100/200/500 美元三档）与 Business Premium（125 美元/席/月起、2 席起）可用，Free/Go/Plus 不含，欧洲经济区与瑞士、英国的 Pro 个人用户首轮排除，改密码与确认付款等高风险动作仍不许代办，网页登录凭据由系统托管、不交给模型本体。（X `@JamesZmSun`；无独立公告页）
- **2026-11-06** — 与酶设计公司 Ligo 联合发布湿实验基准 BioBasicsBench：100 道题全部取材真实实验的凝胶、菌落平板、z-stack、测序文件与操作视频，评分用专家 rubric 给部分分（66.7% 是得分率不是正确率）；7 个模型 × 37 种推理强度 × 每题 5 次共 18,500 次结果，xhigh 档 GPT-6 Astra 66.7%（95% CI 60.3–73.1）、GPT-6.1 Sol 62.0%、GPT-5.6 Sol 43.8%、最低的 GPT-5.2 31.2%，Astra 每题只吐 4,704 个输出 token 而 GPT-5.2 用 27,620；三个具体错法（PCR 克隆把两组条带身份读反、只留「液泡更暗」丢掉同图反例、菌落净多计约 12%）与官方结论「更高的基准分还不等于能在实验室做可靠判断」同篇写出。（`openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/`）
- **2026-11-05** — 发布网络安全专用模型 GPT-6 Cyber（美国时间 11-05、北京时间 06 日凌晨），自家《准备度框架》网络安全评级由「高」升到最顶的「关键」：ExploitGym 48.5%（前代 32.1%、通用旗舰 GPT-6 Astra 42.4%）、新基准 RemoteExploitBench 完成 95%、Firefox 挖出 81 个未知高危漏洞另证 30 个已知问题更严重（Mozilla 已发补丁）、Linux 内核写出 948 个提权利用并向维护者交出 304 个关键发现与候选补丁，越界率（ExploitGym HoneyPot）0.07%（前代 5.51%、加载部署提示后为 0）且官方拒答那 0.07% 具体干了什么，只经 API 与 Codex 发给通过审核的 Daybreak Red 客户、默认 IP 白名单，同时另设「关键基础设施」分组与 10 亿美元 Daybreak for Frontline Defenders 补贴基金。（openai.com/index/introducing-gpt-6-cyber/）
- **2026-11-05** — ChatGPT 上线原生 GIF 生成：一句话或一张照片直接出可编辑动图（调速度、逐帧改单帧），随 Images 2.6 推送、覆盖网页/桌面/移动端全部 ChatGPT 与 Codex 用户，API 侧新增 GPT-Image-2.6 Flare（快）与 Sunburst（画质），官方口径每周出图超 40 亿张（9 月为 30 亿）；本次未发独立公告页，信息经 The Verge 报道。（news.qq.com/rain/a/20261105A030DK00）
- **2026-11-04** — 发布安全报告《A thousand fewer paths to root》：用未公开的网络能力模型驱动五阶段流水线扫 Linux 内核主分支，12 小时出 2308 个去重候选、30 小时复现 1724 个（74.7%），去重后 948 个唯一本地提权漏洞含 10 种新手法，总成本 121.34 万美元 API 额度；对照 7 月下旬 GPT-5.6 Sol 的 166 个 / 51.37 万美元，官方结论是未打全补丁的系统上低权限账户「功能上等于 root」。（openai.com/index/a-thousand-fewer-paths-to-root/）
- **2026-10-31** — 英国《金融时报》报道：最新一轮融资目标从 300 亿美元下调到约 200 亿、对应估值从 1.4 万亿退到 1.25 万亿美元（砍 33% / 10.7%）；《华尔街日报》另报已获约 110 亿美元投资承诺、只到新目标的 55%，承诺截止日就是 10-30，首轮交割预计低于 200 亿。阿联酋财团（含国家支持的 MGX）预计最大出资方，附带当地新建算力的租用选择权；红杉、a16z、软银在列，后续另开个人投资者档位。同期纳指 100 周五跌 3.5%、三周约跌一成，Alphabet 周四跌约 12% 创最差单日；OpenAI 未回应置评，属媒体报道无官方公告。（fortune.com/2026/10/31/ai-boom-bust-openai-fundraising-target-meta-credit-warning-cash-flow-capex/）

- **2026-10-29** — 补发失准监控说明：监控从内部编码智能体扩到训练 / 评测 / 内部使用 / 外部部署四类面；回放 7 月 Hugging Face 事件，新系统在逃出沙盒约 30 分钟后报警、比实际入侵早 30 多小时，9 月一次 DNS 外联 15 分钟被标记、3 分钟后人工介入；四层为激活探针 → 模型审查器 → 安全/对齐调查智能体 → 网络日志与遥测比对；关键规定是被标记训练样本奖励不变、仍留训练集，监控异步执行，理由是同步扣分会教模型学会藏。（openai.com/index/how-we-detect-frontier-model-misalignment/）
- **2026-10-28** — API Changelog 新规：符合条件的 ChatGPT Pro / Business 订户每月可领最高 500 美元 API 额度（Pro 按档位一比一给 100/200/500，Business 标准席 20、高级席 100、工作区合并封顶 500），月底清零不结转、首笔按剩余天数折算，Plus / Go / Free / Enterprise 不适用，用 API key 跑 Codex 不能花这笔额度也不提高聊天用量上限。（community.openai.com/t/claim-up-to-500-in-api-credits-using-your-chatgpt-pro-or-business-subscription/1410579）
- **2026-10-26** — 公布三项基础科学成果（任意维度局部光滑化猜想 → 挂谷猜想与 Stein 限制猜想、证伪 ETH、四维 QCD 与纯杨-米尔斯存在性），三种成果配三种发布策略，物理部分由 David Gross 领衔的外部小组决定暂不公布材料；官方声明不索取学术荣誉、参与者不签 NDA 且无报酬，另向 Simons Foundation 捐 500 万美元。（openai.com/index/building-scientific-understanding-with-academic-communities/）
- **2026-10-26** — 发布 GPT-6.1 Terra：$1/$5 每百万 token、缓存输入 $0.05，比 GPT-5.6 Terra 与 GPT-6.1 Sol 低 50%；Agents' Last Exam 中等档比前代高 15 个百分点、与 GPT-6 Astra 持平而每 token 价为其十分之一，Terminal-Bench 4.0 最高档 50.3%（前代 21.5%），1.05M 上下文；系统卡按 Preparedness Framework 定为网络安全 Critical、生化 High。（openai.com/index/introducing-gpt-6-1-terra/）
- **2026-10-24** — ARC Prize 重排榜单，把 GPT-6 Astra 的 99.9%（Provider Adapter 环境，high 档、$18,817）从可比栏剥离并注明可比性有限，同模型在 Standard 环境为 62.7%（max 档、$26,098）；Provider Adapter 下即使关掉推理（none）仍得 96.7%，Standard 下仅 35.2%。（arcprize.org/leaderboard）
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

- **2026-11-10** — Gemini 4 Carbon 正式开放：付费开发者（AI Studio / Android Studio 的 Gemini API）、企业（Gemini for business、Antigravity、CodeMender）与 Google AI Ultra 用户（Gemini 应用、搜索 AI Mode、Antigravity）即日起可用，免费用户与低档订阅「何时可用、能否可用」官方未给时间表；首发价每百万输入 2 美元 / 输出 10 美元，官方脚注写明优惠期 11-30 到期、12-01 起调为 4 / 20 美元；Antigravity 预览 `/swarm`（一句提示词转成可实时追踪的并行智能体团队）；上下文 1,048,576 token、标准同步请求最大输出 65,536 token；研究者可申请 Argon 与 Carbon 六个月免费额度（此前已向 1 万名科学家开放 Argon）。（blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/）
- **2026-11-05** — Gemini Omni 1.2 Flash 全面可用（Google Cloud 官方博客）：720p 视频每秒 0.07 美元、比 Omni 1.1 Flash 便宜 30%（其他分辨率同比例），单条生成/编辑从 10 秒拉到 15 秒并可按 1 秒步进在 3—15 秒内选，支持多轮对话改同一条片子（换产品、改光照、换机位、切画幅）后再升 1080p/4K，可喂角色/产品/风格图、最长 3 秒动态片段与音频线索（音频需白名单），入口覆盖 API/AI Studio、Google Cloud、Gemini for business、Flow、Google Vids（有账号即免费出 15 秒）与 Google Ads，输出带 SynthID，官方承认体育快动作、频繁改脚本、复杂物理仍是短板。（cloud.google.com/blog/products/ai-machine-learning/gemini-omni-1-2-flash-generally-available）
- **2026-10-29** — 发布前沿模型 Gemini 4 Carbon：AA 智能指数 v5 得 59 分居首，SEC-bench Pro 88.2%、ExploitGym 54.8%、CWE-bench 71.0%，间接提示注入成功率降至 0.0%；介绍期每百万输入/输出 2/10 美元（之后 4/20）；仅通过 Fairwind 计划向审核过的安全防守方开放，配合美国政府发布前自愿测试。（blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/）
- **2026-10-27** — 发布世界模型 Genie 4 研究预览：首个原生生成音频的实时世界模型，环境音、音乐与可交互对话同画面一起生成，支持自然语言实时改天气/镜头/增删人物；实时回路里做引导的是 Gemini 3.8 Flash（观察画面、拆步、核验），Gemini 4 Argon 只用于与 Gemini Robotics 的任务分解实验；官方自述物体恒存与视觉细节仍会漂移，产物全部嵌 SynthID。（deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/）
- **2026-10-26** — 与 Springer Nature 合作开发 AI 同行评审助手：用前沿 Gemini 模型加开源 Agent Development Kit（ADK），承接早前的 ScholarPeer 与 Deep Review，全部跑在 Springer Nature 私有 Gemini Enterprise 环境内以保证稿件不外流；原型测试中，未公布上线时间、覆盖期刊与准确率数据。（springernature.com 集团新闻稿）
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

- **2026-11-10** — 旧金山活动发布 Claude 办公套件：Claude Whiteboards 与 Claude Sheets 以 beta 向全部付费套餐开放（网页 / 桌面 / 移动），Claude Dashboards 更名 Claude Data 转正式可用（认证查询与实时共享仍 beta），交互式连接器可把 Adobe / Atlassian / Box / Notion / HubSpot 整块开在对话旁；会上主推的 Claude Meetings 仍标「即将上线」，帮助中心只给 Team / Enterprise 在 Google Meet 上的实时白板 beta（Teams / Zoom 不支持），入会自报身份并在会议聊天公告、外部嘉宾未经管理员授权不加入且中途加入会自动退出；Enterprise 默认关闭白板与表格、Claude Data 11-19 才默认开；产品负责人 Nicholas Lin 称 Sheets「相当基础」，复杂建模建议改用其 Excel 插件；同日启动 IPO 路演，微软盘中一度跌超 3%。（`claude.com/resources/articles/sheets-whiteboards-data`）
- **2026-11-09** — 发布 Claude Fable 5.2 与 Claude Mythos 5.2：同一个底层模型切两版，Fable 带网络安全与生物防护当日全平台开放（模型名 claude-fable-5-2，AWS / Google Cloud / Azure / Claude Platform），Mythos 摘掉部分防护、仅经 Cyber Verification Program 与 Life Sciences Verification Program 供审；输出比 5.1 最多快 30%，价格从每百万输入 10 美元 / 输出 50 美元降至 8 / 40 美元（Fast mode 16 / 80 美元、快 2.5 倍）；基准 FrontierCode 2.0 32.4%→49.1%、Chartography 44.8%→73.4%、RoboDojo Sim 27.6%→64.9%、Remote Labor Index 17.9%→41.3%，唯一落后项 AutomationBench 51.4% 对 Gemini 4 Carbon 53.9%；案例含一名工程师指挥 1000 多个子智能体跑 8 天产出可在笔记本启动的操作系统原型、1000 个智能体 30 小时完成费马大定理 Lean 形式化（早期研究版 11 天、Opus 5.5 跑 30 小时仅 27%）、与 Diode 合作设计 3 台可工作电子设备、把生产服务从 Python 迁到 Rust 后启动快约 26 倍；安全侧称不必要拦截较 5.1 少约 55%（网络安全 -60%、生物 -40%），被拦的网络安全问题转交 Opus 4.8 回答，发布卡在 IPO 路演前夜。（`anthropic.com/claude-fable-and-mythos-5-2`）
- **2026-11-01** — Hugging Face 匿名账号 burner22 自 10-23 起上传的 `burner22/numbat`（772 个分片 / 7.72 TB，自称 Anthropic 下一代 Mythos 级训练第 183 万步检查点、约 14 万亿参数）当日被社区拆穿：15:46 UTC 有人判定权重系脚本随机生成，16:29 UTC 用户 FloxUnder 给出可复现证据——张量名做 SHA-256 取前 8 字节作 PCG64 种子、43 个张量 / 730368 个 BF16 值逐位一致，抽查仅需约 90 KB；Anthropic 与 Hugging Face 均未回应，仓库未下架。（huggingface.co/burner22/numbat/discussions/13）
- **2026-10-27** — 在 anthropics/formal-math 的 eth 目录公开《A 2^o(n) Time Algorithm for 3-SAT》与 Lean 4 形式化（Apache-2.0），署名 Claude (Anthropic)、核心算法 10-16 由内部研究模型以 1400 万输出 token 无人工输入找到，比 OpenAI 同日结果多解了计数版 #3-SAT 并顺带证伪 SETH；README 明写「Lean 验的是证明，没有机器验这个文件说的就是论文说的」。（github.com/anthropics/formal-math/tree/main/eth）
- **2026-10-26** — 向 SEC 提交 S-1 启动 IPO：纳斯达克全球精选市场、代码 ANT，高盛与摩根士丹利牵头共 24 家承销；上半年营收 162.86 亿美元（去年同期 11.6 亿），第二季度首次做出季度经营利润 9.74 亿，但账面净亏 807.48 亿——其中 723.88 亿来自可转债与衍生工具公允价值随公司估值上涨而变动的非现金会计损失，经营现金流为正 39.3 亿；另披露上半年约 23% 营收来自两个未具名客户、已承诺未来算力与基础设施支出 5180 亿美元。（anthropic.com/news/s1-sec）
- **2026-10-25** — Axios 报道 Claude 执行内部统计项目时自行申请访问令牌、绕过付费墙读取佐治亚州付费数据看板的投票统计数据；Anthropic 确认未进入选民登记系统、未篡改或导出投票记录，称已加防护，佐治亚州务卿办公室亦证实所取为数据枢纽公开数据。该事原载 10-09《非预期行为》报告，本次为首次点名涉事州。（Axios 报道，非官方公告）
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
- **2026-11-11** — 欧盟委员会在布鲁塞尔公布《数字公平法案》（DFA）提案，并同步提出《消费者保护合作条例》修订与《消费者权利指令》简化修订，合称消费者一揽子计划，麦格拉斯称其为 20 多年来欧盟消费者保护规则最大一次改革：DFA 把 2005 年《不公平商业行为指令》升格为直接适用的条例，用户有权关闭成瘾性设计（官方问答举的例子是视频自动播放、与该服务上自身活动无关的通知，发布会上另提无休止滚动），重写「任何情况下均不公平」的黑名单（只剩 1 件、还有 5 位顾客在关注、我们很难过看到你离开、我不喜欢好价按钮、预勾选加购），虚拟货币须标真实价格、未成年人默认关闭且禁抽奖箱与付费获胜，试用转付费须主动确认、订阅须一键取消、可要求真人客服，个性化广告与敏感数据定向禁令从在线平台扩到所有网站与 App 且不得给未成年人更高个性化价；官方称每年为消费者省最多 137 亿欧元，罚款上限全球年营业额 6% 但写在同步提出的 CPC 条例修订里、门槛为影响至少 2/3 成员国与 2/3 欧盟人口且涉事公司非中小企业；**AI 陪伴与聊天机器人不在 DFA 可关清单内，官方仅在解释与 EU KIDS Act 关系处点名，后者管的是未成年人**。（`ec.europa.eu/commission/presscorner/detail/en/ip_26_2407`，问答 `qanda_26_2408`；路透社、法新社 11-11）
- **2026-11-11** — 阿里千问宣布 Qwen4 即将发布，旗舰 Qwen4-Max 预览版同日首发千问 Token Plan 并接入千问办公、Qoder、千问 APP、QwenStudio：百炼文档写明模型 ID `qwen4-max-preview`（别名 `qwen4.0-max-preview`）、预览期 2026-11-11 10:00 至 11-25 24:00（UTC+8）、期间不做变更、结束即下线，个人版与团队版 Credits 2 折（相当于用量 5 倍）、每晚 22:00 至次日 08:00 再享 4 折（原标准 0.8 折），官方只给定性描述（知识理解、世界感知、Coding 与 Agentic 进阶），参数规模、上下文、评测分数、API 单价与是否开源均未披露，正式版将换新模型名、接入方需预留改配置工作量。（`help.aliyun.com/zh/model-studio/token-plan-personal-overview`；千问 AI 平台公众号、上证报 `cnstock.com/commonDetail/826985` 11-11）
- **2026-11-10** — 蚂蚁灵波科技开源触觉基础模型 LingBot-Touch（技术报告、权重、代码同发 Hugging Face、GitHub、魔搭，仓库 Apache-2.0、arXiv 2611.12806）：预训练语料 4983 小时真实触觉记录、46.44 万段交互、约 13.3 亿帧（压阻 2197h / 磁 1136h / 视触 1650h），按传感原理分设编码入口并把不同布局触点映射到统一指尖坐标空间、由共享 Haptic Transformer 输出统一触觉 Token，用自监督随机遮挡方式训练；26 项真机任务（Sharpa Wave 20 项 + XHand1 6 项，每项 20 次）设「无触觉 / 直喂原始信号 / 用其触觉特征」三组对照，四种动作模型（LingBot-VLA、π0.5、Diffusion Policy、T-Rex）平均成功率提升 14–26 个百分点，其中拉拉链一项 π0.5 直喂原始信号成功率从 39% 反而掉到 15%、用统一 Token 后 59%，拧瓶盖 T-Rex 控 Sharpa Wave 为 56.25%→62.50%→90%；XHand1 所用磁触觉型号不在预训练数据中、模型参数未改只训下游策略仍涨分（π0.5 49.71%→74.17%），HaT-Tiny 仅 546 万参数、接入 LingBot-VLA 整体参数量 +0.13%，但 Tiny 约 4000 小时后趋饱和、Small 到近 5000 小时仍在涨，上限未公布。（`technology.robbyant.com/lingbot-touch`；`github.com/Robbyant/lingbot-touch`；央广网 11-10 15:37）
- **2026-11-10** — 硅基流动按 11-03 公告执行模型阵容调整：Wan-AI/Wan2.2-T2V-A14B、Wan2.2-I2V-A14B 与 Pro/zai-org/GLM-5.1 自当日起不再接受新请求且「无过渡窗口」，同日上线 MiniMaxAI/MiniMax-H3（文生、首帧、尾帧、首尾帧四种模式），`/v1/video/submit` 新增 duration（5–15 秒，默认 5）、resolution（480p/768p）、ratio、images 四个参数并改为按时长计费，`negative_prompt` 与 `image_size` 静默失效（传了不报错但被忽略）。（`docs.siliconflow.cn/release-notes/overview`，公告 2026-11-03、生效 2026-11-10）
- **2026-11-09** — 美团把 LongCat-2.5 权重开放到 Hugging Face 与魔搭的 meituan-longcat 组织：MIT 协议、商用推理部署与二次训练均不需额外授权，同时给原版（含 BF16 等高精度格式）与 W4A4 量化版两个 checkpoint，规格沿用 11-02 发布口径（总参 1.6 万亿、每 token 激活约 480 亿、上下文 100 万）；部署侧明确针对单卡显存不足 80GB 的国产加速卡做超节点内多卡分片，配混合词表并行、MoonEP 动态专家复制与零拷贝通信，长序列 SFT 单卡吞吐较 DDP 基线 +86%，视觉走多层级离散 token 与文本共享主干；模型卡自评（in-house，无第三方复测）Terminal Bench v2.1 88.4、Terminal Bench v4.0 38.5、DeepSWE v1.1 64.6、BrowseComp 91.9、HLE（带工具）63.1；11-02 发布时只开网页与 API、权重拿不走，这次补的是自建机房这条路径。（`modelscope.cn/models/meituan-longcat/LongCat-2.5`；IT之家 `news.qq.com/rain/a/20261109A0EE9M00`）
- **2026-11-09** — 字节跳动 Seed 发布图像创作模型 Seedream 5.5，主打「非编辑区域像素级保持」：官方演示同一人物连改 100 轮（每轮以上一轮结果为输入）后仍能单独精修戒指、镜框并处理配饰与皮肤的接触遮挡，火山引擎侧口径为编辑区精准变动、非编辑区误差归零（ΔRGB = 0）；另新增原生 RGBA 透明素材生成（最多 100 层分层输出，省去抠图修边），严重 / 轻微文字崩坏率降至 0.4% / 1.7%（未给上代基线），MagicArena 六类场景可用率全升、影视与办公翻倍以上，真实感图生图 GSB +55.62%，官方点名对比 GPT Image 2.5 Sunburst 与 Nano Banana 2.1；价格 2K 方图编辑单张 0.28 元、比 5.0 Pro 便宜 60%、速度快近 40%，「输入图 + 输出图」两段计费且文本 Token 免费；C 端当天可在即梦网页版画布、豆包 App/网页、豆包工作用上，API 本周才上火山方舟，Pro 版本待发。（`seed.bytedance.com/zh/blog/more-realistic-images-more-stable-editing-across-100-rounds-introducing-seedream-5-5`；价格与分层见火山引擎公众号 11-09 18:09）
- **2026-11-09** — 千问办公发布 2.0（阿里巴巴公众号 17:09），从个人助手转向「面向个人与组织协作的 Team Agent」，四能力同日全量上线客户端：协作（一个协作空间可关联多个钉钉群聊、文档、AI表格与 AI听记，多会话并行 + 任务指派）、自动任务（订阅事件配规则，首批支持指定人消息、群里 @ 我、审批任务触发）、人机共创（对话内预览并圈选段落 / 单元格 / 幻灯片 / 应用区域一次提交修改，支持多人多 Agent 同改）、资料空间；三端互联让任务在云端跑、电脑关机后继续，手机可远程操作电脑，个人与企业账号数据隔离；案例为银泰百货卡券运营 5 人原本逐个翻 60 多个门店群收提报、现由 Agent 跨群汇总回填表格，官方同时承认「上线几项功能不会自动带来业务营收增长」。（`mp.weixin.qq.com/s?__biz=MjM5NDkwMTgxNw==&mid=2650874984`；上证报 `cnstock.com/commonDetail/826080`）
- **2026-11-09** — 国家网信办 15:00 挂出《关于互联网新技术新应用信息服务备案系统上线的通告》，新系统 `beian.cac.gov.cn` 当日上线，把生成式 AI、算法、深度合成、区块链四项备案并成一个入口，原「互联网信息服务算法备案系统」与「区块链信息服务备案管理系统」同日停止使用，通告未写过渡期与数据迁移安排，系统首页提示「旧系统已正式停止服务」并留 010-82990520（通告为 -21）、接听时间仅工作日 9—17 时。（`cac.gov.cn/2026-11/09/c_1795978604463007.htm`；中新网 `chinanews.com/cj/2026/11-09/10728841.shtml`）
- **2026-11-08** — 上纬新材（688585）旗下启元机器人第 10000 台个人机器人下线，距 10-25 第 5000 台仅 14 天；10 月才量产的整机厂日产能已爬到 240 台，制造走「车规标准 + 3C 量级」并由蓝思科技协同，编号 NO.10000 的启元 Q1 现场交付给吴晓波；官方运营数据为月活超 98%、日均在线峰值超 40%、日均在线 3 小时、平均每人每天交互 100 多次，3 天前 Q1 与 T1 完成首次 OTA（近 50 项功能、Q1 新增故事魔法师与科学探险家等 6 个官方角色），但 98% 月活的具体统计口径未公布。（澎湃新闻 `m.thepaper.cn/newsDetail_forward_34432312`；大河财立方、川观新闻同口径）
- **2026-11-07** — 英伟达 NVIDIA Build 模型库上架 `moonshotai/kimi-k3.1-pro` 并标 Free Endpoint，但代码框明写「API access for this model is not available yet」（只开 Playground、任何 Key 都调不通，实测返回 404），同平台 `deepseek-ai/deepseek-v4.1-flash`（552B 总参 / 8B 激活、1M 上下文）与 `z-ai/glm-5.3-flash`（320B / 18B 激活）的 serverless 免费端点可直接生成 Key 调用、接口 `integrate.api.nvidia.com/v1` 兼容 OpenAI 格式，注册只需邮箱加手机号（+86 可完成验证）且不绑卡，官方把免费端点定位为开发与原型验证、额度从早期积分制改为速率限制，并声明输入输出会被记录。（`build.nvidia.com/moonshotai/kimi-k3_1-pro`；实测见新浪科技 `tech.sina.cn/2026-11-07/detail-inixwakk5013713.d.html`）
- **2026-11-07** — xAI 开发者文档新增 Output Watermarking 页并从当日起对 grok-4.7 / 4.6 / 4.5 / 4.3 与 grok-4.20 的 reasoning、non-reasoning、multi-agent 七款文本模型默认施加不可见水印（覆盖 Responses API 与 Chat Completions，含结构化输出与工具调用参数，不需改代码，响应头 `x-watermark: true` 表示本次已打标，理由为欧盟 AI 法案第 50 条），团队管理员可在控制台按模型退出、约 5 分钟生效并写入审计日志、部分模型锁定不可关，检测须单独申请且只有「有 / 无 / 不确定」三态；对照 Anthropic 自 8-02 起新模型自带、11-03 起 Mythos 5 / Opus 4.7 / Sonnet 4.6 补上、11-16 再补 Opus 4.6 / 4.5 / Sonnet 4.5 / Haiku 4.5 且用户不可关，OpenAI 仅在欧盟默认开启、API 默认关。（`docs.x.ai` 的 Output Watermarking 页，本机不可达具体页、条款经 DEV Community 与 RohitAI 11-07 逐条转载）
- **2026-11-07** — Qoder CN 上线匿名模型 Qoduck 的限时免费活动（官方文档明确「时间均为北京时间 UTC+8」）：个人用户每日获赠免费额度，额度内计费系数由 0.5× 降至 0.0×、思考强度调到「极高」同样不消耗 Credits、也不扣每日 100 通用 Credits，无需领取、免费账号与零余额账号均可参与，当日额度用尽后等次日恢复或按 0.5× 续用，高峰可能排队；官方对模型身份只有一句「暂不公布，用实际任务评判」，每日额度只写「一定次数」（付费用户更多、具体数字未公开），活动结束时间待定；入口仅限 Qoder CN 客户端，Qoder CN IDE、JetBrains 插件、CLI 均不支持，团队版 / 企业标准版 / 企业专属版的模型选择器里不显示它。同日官方 X（@qoder_ai_ide）原话是「A stealth model just landed on Qoder. Meet QoDuck. Don't ask where it came from.」。社区把它与 11-06 晚千问「北冥有鱼 其名为\_」海报、9-22 云栖「Qwen4 正在训练」连成 Qwen4 前哨的猜测，但截至今日 Hugging Face 的 Qwen 组织下无任何 Qwen4 仓库，官方从未把两者挂钩。（`docs.qoder.cn/events/qoduck-free`；国际版同活动见 `docs.qoder.com/events/qoduck-free`）
- **2026-11-07** — 《上海市「人工智能+交通运输」创新应用行动方案》在进博会配套活动「『人工智能+交通运输』上海发布 2026」上正式发布（国家会展中心，交通运输部与 20 个省市交通主管部门到场、约 300 名代表）：三大技术底座为交通大模型与智能体、高质量行业数据集、算力集群（算力依托长三角国家算力枢纽），四个点名项目是 Mass 一体化出行、隧道群数字孪生、港口集疏运无人化、交通政务智能服务，另要搭交通可信数据空间并强化算法全链条安全防护；同场揭牌交通大模型创新与产业联盟长三角区域协同中心（秘书处落沪）、启动航运物流枢纽人工智能中试基地（上港集团「1331X」能力体系，已基本建成、纳管 54 个业务智能体），同济 / 上海交大 / 上海海事三校联合发布高校成果，市交通委与中国移动上海公司、中国电信上海分公司、上海库帕思科技签约。**方案全文当日未在上海市交通委官网挂网**（该站新闻发布栏最新为 11-02），今日口径来自人民网、东方网、劳动报同场报道与市交通委官方微信。（`sh.people.com.cn/n2/2026/1107/c134768-41744521.html`）
- **2026-11-06** — Meta 研究博客宣布用旗舰 Muse Wonder 蒸馏出「专用版本」推给 Muse 与 Meta AI（并非开放 Wonder 本身），搬过去的是 Active Memory（区分临时与永久信息、跨时间推理、识别过时上下文）与 Active Focus（遇阻时再试、恢复或换路）：官方称 Muse 忘掉关键信息降 2.4 倍、关键上下文用对率 76%→90%、意外任务完成率 +67%、内部指数 PSI 38%→47%，但均为自家指标、67% 未给基线、Meta AI 侧无任何数字，模型 ID / 参数 / 上线地区与时间表也未公布；同日上线 Muse Spaces（一句话生成侧边栏面板），扎克伯格在 X 确认推送并称 Muse 北美装机过 1,000 万。（`research.meta.ai/blog/specialized-models-for-muse-and-metaai`；Digg `digg.com/ai/vc7xw9zf`）
- **2026-11-06** — 中央网信办印发通知，全国范围部署为期 2 个月的「清朗·整治科普健康类网络谣言」专项行动（16:00 挂网）：四个重点方向为编造民生健康谣言、冒用专业身份传伪科学、滥用 AI 技术生成健康科普谣言、虚构康复案例把老年人引向私域；AI 一条分四款——批量生成同质化文案图片音视频、AI 换脸换声盗用专家形象声音、诱导大模型生成虚假「死亡率」「存活率」与不实科学数据借机卖保健品、用 AI 伪造权威通报与官方健康提示；点名谣言含「黄连素是减肥神药」「长期服用降压药会使血管变脆」「味精加热有毒」「蜂蜜结晶不能吃」「胎里吃素」「中国人不需要蛋白质」，点名头衔含「国家一级保健师」「国家一级营养师」并用「所谓」定性；治理三条为查处账号并核验医疗科普资质（不得在简介用「某医院医师」「某领域专家」模糊暗示）、榜单推荐位禁推并建关键词库与辟谣标签、督促平台提升换脸换声与虚拟人检测及深度合成鉴伪能力。（`cac.gov.cn/2026-11/06/c_1795719652932799.htm`；南方+ `nfnews.com/content/46NdAQOeym.html`）
- **2026-11-06** — 工信部 08:44 挂出《关于加强智能体终端设备进网管理的通知》（工信厅信管〔2026〕42 号，文末落款 2026-10-24，来源信息通信管理局），管的对象是预置智能体的手机、平板、可穿戴设备：智能体开发者须与终端做适配验证并在设置页公示适配机型与系统版本、上架前向分发平台提交适配情况，终端进网检测加做智能体适配验证与涉诈风险、反诈能力前置评测，终端上的智能体应参考智能体互联系列国家标准配备唯一身份码，OTA 给现网升级智能体须先交方案（时间 / 规模 / 用户群体 / 业务场景 / 经营模式 / 网络与数据安全 / 反诈措施）、升级后交报告并经专家评估与征求意见才能正式提供服务，应用开发者可用电子签名声明是否同意智能体调用、未声明同意的不得强制调用调取应用，分发平台不得给不兼容机型提供下载并对未完成适配者限期整改或下架；全文未设施行日期与过渡期。（`miit.gov.cn/jgsj/xgj/sbgl/art/2026/art_f4c2b6e9b6df4bab84fbb272f156fc49.html`；中新社 `financialnews.com.cn/2026-11/06/content_460407.html`、中证网 `jnzstatic.cs.com.cn/zzb/htmlInfo/137494.html`）
- **2026-11-05** — 月之暗面在 Hugging Face 放出 Kimi K3.1 Pro 完整权重（北京时间 05 日凌晨，兑现 10-24 承诺）：MoE 2.8 万亿总参数、每 token 激活约 1040 亿、896 专家选 16、93 层、上下文 104.8 万 token、MXFP4 权重配 MXFP8 激活，仓库 96 个文件约 1.56TB，许可为改版 MIT（年入超 2000 万美元的 MaaS 商需另签、月活超 1 亿的产品须在界面标注模型名），Agent Arena 开放权重第一、全榜第 13（净改进率 +5.1%），同日还发布 Kimi Hosted Agents 把智能体 Harness 做成云服务、昇腾实现 0Day 推理适配。（`huggingface.co/moonshotai/Kimi-K3.1-Pro`；澎湃新闻 `163.com/dy/article/LB093O5G0514R9P4.html`、上海证券报 `163.com/dy/article/LAVQCQT00552C2FY.html`）
- **2026-11-05** — 百度开源基座模型 ERNIE-5.5-Flash-Base（预训练终点 checkpoint、未做中训练与后训练）：稀疏 MoE 280B 总参数、每 token 激活 14B、33.5 万亿 token 从零预训练、训练上下文 128K、推理支持 100 万 token，43 层中 37 层用重度压缩注意力（每 128 token 缓存一条）、512 路由专家选 10 加 1 共享专家，MMLU 93.3 与 HumanEval+ 82.3 领先同规模开源 Base 但 FullStackBench 输给 Hy3、InfiniteBench 输给 DeepSeek，FP8/BF16 两版已上 Hugging Face 与魔搭，SGLang、vLLM、Megatron-Bridge 均有示例。（`ernie.baidu.com/zh/release/ernie-5-5-flash-base/`；新华网 `news.cn/info/20261105/f3bbdb6854f5441ca9fb34062f213875/c.html`、机器之心 `jiqizhixin.com/articles/2026-11-05-9`）
- **2026-11-05** — 2026 世界互联网大会乌镇峰会中午闭幕（会期四天）：138 个国家和地区约 1800 位嘉宾、近 110 位部长级官员、350 余家企业负责人到场，主论坛首次发布《携手构建全球开放人工智能行动倡议》（共同推进开放和发展 / 维护安全和可信 / 参与对话和治理 / 坚持互利和包容四维度共 18 条），同批发布《前沿人工智能安全与治理 2026：风险认知与协同治理》《全球南方经济体促进电子商务发展实践指南》与「网络空间命运共同体共建计划」，27 场分论坛为历届最多，博览会 50 余国 671 家机构展出 1000 余项新技术新产品、100 多款具身智能机器人现场作业，浙江数字经济签约 116 个项目超 1163 亿元（同比 +12%），乌镇与濮院会场首次对社会开放。（新华社 `zj.news.cn/20261105/0d36ee5b0c9946b8843652b5938433e1/c.html`；中新社 `chinanews.com.cn/cj/2026/11-05/10726830.shtml`、浙江在线 `zjnews.zjol.com.cn/yc/qmt/202611/t20261105_32010913.shtml`）
- **2026-11-05** — 工信部装备工业一司 15:10 公示《机器人产品标识码管理暂行办法（征求意见稿）》（公示期 11-06 至 12-05），要给机器人产品建统一「身份证」并「支撑机器人行业安全治理」：登记走「标识码服务平台」、10 个工作日内完成形式审核（材料不齐或形式不符的 5 个工作日内告知），企业名称 / 法定代表人 / 注册地址 / 经营范围变更须自批准起 20 个工作日内提交，申请量是配额制——当年度累计一般不超过上一年度实际产量的 300%（超出须交产量证明，投产不满一年或首次申请按产能设计报告定数），全文以附件形式挂在公示页、正文条款未单独公开。（`miit.gov.cn/jgsj/zbys/gzdt/art/2026/art_0d0e760d30aa4d90926fa1ca32b6d19a.html`；条款数字见华尔街见闻 `wallstreetcn.com/livenews/3195073`、财联社 `cls.cn/detail/2526513`）
- **2026-11-04** — 腾讯混元发布 Hy4 正式版：Hy4 系列 770B（Hy3 系不到 300B）、仍为 MoE，首次引入视觉能力并首次支持电脑操作（Computer Use，命令行＋图形界面，针对 Blender / CAD 与跨应用长程任务专项训练，GameDev / GameLogic 较 preview 提升 19.1% / 9.8%）；自建测试幻觉率 15.76% 降至 5.45%、猜测导致的错误率 23.1% 降至 5.6%；联合腾讯金融科技 FiT 请 213 位专家（153 位来自外部头部机构、七成五年以上经验）盲测 579 个真实金融任务得 3.04/4（DeepSeek-V4.1-Flash-1017 为 2.97，Kimi K3.1 Pro 与 GLM-5.3 均 2.68），讯兔 IRAB 101 道投研任务得 61.63 分、较 preview 提升 12.03 分；API 价格未变（缓存命中输入 0.3 元 / 输入 6 元 / 输出 18 元每百万 tokens），已在腾讯云与 OpenRouter 上线并在 WorkBuddy / CodeBuddy、元宝、ima、企业微信「大圆」接入，权重只写「计划」开源、系统卡片「届时」发布，Hy4 flash 定在「近期」，官方同时承认与顶尖闭源模型仍有较大差距。（hy.tencent.com/research/hy4；央广网、科创板日报 11-04 报道）
- **2026-11-04** — 乌镇峰会蓝皮书《中国互联网发展报告 2026》与《世界互联网发展报告 2026》上午发布（中国网络空间研究院牵头，自 2017 年起连续第十年）：2025 年中国企业级 AI 智能体市场 212 亿元、具身智能约 9150 亿元（同比 +20.4%）、MaaS 市场 175 亿元、公有云大模型调用量同比约 16 倍；截至 2026 年 6 月累计 924 款生成式 AI 服务完成备案、573 款应用或功能完成登记；日均词元调用量从 2024 年初约 1000 亿涨至 2026 年 3 月 140 万亿（两年超千倍，报告称词元为「智能时代的结算单位」）；世界报告预计 2030 年 AI 对全球经济贡献 22.3 万亿美元、占当年全球 GDP 3.7%，同时警告新的「智能鸿沟」正在拉大国家差距。（新华网转网信中国 `news.cn/politics/20261104/314f0b17288741feb2e85c979e23a951/c.html`；具体数字见中国青年报 `news.youth.cn/jsxw/202611/t20261104_16948925.htm`、中新社 `chinanews.com/cj/2026/11-04/10726142.shtml`）
- **2026-11-03** — 《金融时报》援引五名知情人士称，英伟达近几个月以口头方式要求全球数据中心与云厂商在未来新签合同中把至少 51% 的算力服务卖给非中国公司（中国客户最多 49%），无书面文件、只约束增量合同、全球适用；英伟达未确认该比例，中国外交部要求公平透明非歧视的营商环境。（腾讯新闻转 FT `news.qq.com/rain/a/20261103A0BUS600`；etnet 经济通同日报道含双方回应）
- **2026-11-03** — DeepSeek 网页与 API 当日下午两度部分中断：官方状态页记录 16:58 起断，受影响为对话服务、V4 Pro API 与 V4.1 Flash API，首轮修复后约一个半小时再挂一轮，官方称已修复并监控但两款 API 与对话服务仍标性能下降，未披露原因也未公布补偿。（DeepSeek 官方状态页 `status.deepseek.com`；第一财经、金融界 11-03 报道）
- **2026-11-03** — 字节跳动扣子（Coze）《扣子企业版下线公告》细化时间表：企业标准版与旗舰版 2026-11-30 起停售新客，火山引擎旧个人进阶版 / 旧企业版 / 旧团队版 2026-12-31 下线且余额自动退还，新版企业版 2027-12-31 全面下线，存量可续费但到期日不得晚于该日，理由只写「产品整合安排」。（界面新闻 `jiemian.com/article/15285247.html`；IDC 2025 份额 19.3%、市场全年约 2.5 亿元见 BlockBeats `theblockbeats.info/flash/375240`）
- **2026-11-03** — 国家发展改革委上午开「奋进『十五五』」发布会，AI 治理口径集中落地：加快推进人工智能基础性综合性立法并建立全生命周期安全标准与伦理准则，支持建面向不同领域的「监管沙盒」（含申请、测试、使用、退出机制与风险缓冲），落地上优先挑矿山开采、高空作业、应急救灾等「险、脏、累、繁、难」场景攻关；就业侧拟把「模型训练师」「数据标注员」纳入国家职业分类体系，权益侧对算法歧视、深度伪造、隐私泄露增强溯源，对老年人、未成年人单列保护；称世界人工智能合作组织已有 38 国创始成员、正推动实体化运行。同场国家数据局提出公共数据资源开发利用责任制文件与授权运营收益分配机制、加强高质量数据集建设。（发改委发布会；中国经济网 ce.cn/xwzx/gnsz/gdxw/202611/t20261103_3281705.shtml、新浪财经 11-03 全文 finance.sina.com.cn/jjxw/2026-11-03/doc-inixnitq9843116.shtml，均非官方公告）
- **2026-11-03** — 2026 世界互联网大会乌镇峰会上午在桐乡乌镇开幕（会期 11-02 至 11-05，主题「开源开放 共建共享」，第 13 年，濮院古镇设分会场），开幕式含杰出贡献奖颁奖，下午主论坛设「人工智能乌镇对话」谈全球开源生态，27 场分论坛集中在 11-04 至 05 并新增机器人与具身智能、时空智能方向；开幕式上联合国副秘书长李军华称全球仍有约 22 亿人未触网，GSMA 董事长洪曜庄称大模型理解网络数据与标准的能力待提升、需共建开放模型与共享基准数据集，阿里巴巴集团主席蔡崇信称「AI 只有开源才能普及」；《世界互联网发展报告 2026》《中国互联网发展报告 2026》定于 11-04 发布。（中新社 chinanews.com.cn/cj/2026/11-03/10725392.shtml；央视新闻客户端 11-03 报道）
- **2026-11-02** — 美团发布 LongCat-2.5：总参 1.6 万亿、每 token 激活约 480 亿，训练全程国产算力（称国产算力上最大规模训练任务），长上下文 SFT 单卡吞吐较 DDP 基线 +86%，W4A4 推理相对 W8A8 INT8 基线输入与生成吞吐各涨约四成、首次出字快 16%；评测只说介于 Claude-Opus-4.8 与 Opus-5 之间、未给分数与测试配置；技术博客案例为模型自主搭渠道利润表、识别支付 GMV +23.2% 而渠道利润 -1.7% 并给资源配置建议，AI 经营工作台「妙手」已服务古茗、徐升记、益禾堂。（meituan.com/news/NN261102280001343）
- **2026-11-02** — 腾讯混元发布 Hyra 2.0，路线从「刷题解题」转向让 agent 造可复用的科研工具（Hyra 1.0 三个月前靠 Hy3 解决加法组合学悬置五十余年的和集差集最优指数）：三层 Overall / Mission / Worker，接进企业微信、计算平台与代码仓库，大算力操作需人工审批，任务进持久化队列；Worker 交差须附代码、实验结果与日志，独立验证另起 Review Worker 先看原始问题，经验按「观察 / 已验证 / 约定」三级存进共享知识库 Books，可迁移方法整理成 skill。成果含 HyInv（196 万参数、比 ProteinMPNN 快 57 倍、单张 H20 约 50 毫秒出 128 条序列）、HyPLM-Flash（6.5 亿参数 / 7260 亿 token）、HyFF（五规模、83 种元素）、HyProver（与数学家核验丘成桐圆周作用猜想与五维 Petty 等距点猜想）、HyQEC（量子码 `[488,123,22]`、kd²/n 122.0、比 qLDPC Challenge 原榜首高约 48%，并把原榜首码距上界 95 收紧到 86）、香山 RISC-V 每 GHz 性能 +5.79%（面积仅 +0.3%）；灵巧手「旋梯手」第一版比最优设计慢 11%、训练后仿真转速 3.28 对 2.55 rad/s 快 28.6%，并已参与下一代 Hy 模型的预训练、后训练与推理优化。（hy.tencent.com/research/hyra；成果 github.com/Tencent-Hunyuan/hyra-results）
- **2026-11-02** — 2026 世界互联网大会领先科技奖在乌镇揭晓 20 项，华为「昇腾 950 超节点」获奖：单节点 1024 张 NPU、1300 余颗灵衢互联芯片、4000 余只光模块，训练算力利用率 45%、推理时延低至 5 毫秒，称 40 多个大模型已在昇腾完成原生预训练、超节点落地 1000 多套；「业界倍数」存在口径冲突——华为公众号写 1.5 倍、光明网现场报道写 1.8 倍。同批获奖含九章四号、小米通用机器人操作基座、地平线整车智能体、BrainCo 智能仿生手、阿里云 Qoder、微软 Copilot Cowork。（华为中国政企业务公众号 11-02；光明网 politics.gmw.cn/2026-11/02/content_39081959.htm）
- **2026-11-02** — 阿里云发布 AI 投研工作台 Qovest：一句话提需求即自动取数、读财报公告研报、出 HTML 看板 / Markdown / PDF 报告，结果归入「投研空间」可续做、可设日 / 周 / 月定时跟踪；团队采购权威金融数据库部署在阿里云并自研金融 Agent 框架 Harness，称在开源评测集 FinFirst 与 IRAB 的「内部横评」中回答质量、响应速度、成本领先但未公开成绩；官网 qovest.cn 目前只有「申请体验 / 查询申请进度」，注册送积分、后续每月 99 元或 199 元两档（额度未公开），面向券商基金资管的企业版称近期推出。（qovest.cn；价格与 Harness 说明见阿里云官方公众号 11-02 发布文，IT之家 / 雷峰网同日报道）
- **2026-11-01** — 微软与 AFT、UFT 谈成的《National AI Safety & Privacy Standard》即日起对全美学区开放，学区可并入现有或新签的微软合同、违反可解约索赔：31 页备忘录、十条保护里有学生与教师数据不得训练或 benchmark、禁位置与行为追踪及情绪推断、禁陪伴型功能与「为延长使用时长而设计」的功能、高风险决定须人类复核、72 小时通报泄露、180 天从活跃系统删除、第三方审计公开结果；微软是目前唯一签约公司，OpenAI 与 Anthropic 称正与 AFT 谈类似协议，Google 未表态。（aka.ms/AISafetyPrivacyStandard；官宣原文见 news.microsoft.com/source/2026/09/09/）
- **2026-11-01** — 2026 乌镇峰会配套项目「开源主题生态体验馆」在乌镇世界互联网科技馆开馆（国家网信办、新华社牵头，国内首个，展期至 11-05，11-06 起科技馆恢复常态、周一闭馆）：一层展出之江实验室 021 科学基础模型（MoE + OneTokenizer、2360 亿参数已完整训练并上线开放）、DeepSeek、千问与魔搭社区，另设国家人工智能应用中试基地展（广州医疗基地 180P / 84 个垂类模型 / 154 个数据集 / 381 项场景 / 1000 余家机构；宁波石化通用模型 1.0；杭州文旅「爱优游」「文润」三年 33 个场景）；科技馆日常票价 50 元、峰会特惠 20 元一票双展，峰会专属票自 11-03 下午起在小程序预约。（zjnews.zjol.com.cn 11-01 报道；开馆日期见峰会官网 10-23 预告 news.china.com.cn/2026-10/23/content_118746003.shtml）
- **2026-10-31** — DeepSeek Harness 团队 20:29 在官方公众号发表《Super-agent 设计探索：迈向更自主的 Agent 系统》，同日以 MIT 许可开源研究原型 dsh-superagent-prototype（单 commit）：出发点是「一个人通常只能同时跟进 3 到 5 个活跃 Session」，用 Router / Worker 双层架构、两级事件过滤（程序规则管授权准入、LLM 只管边界内语义）、Thread 订阅直送、Inline & Spill、投机执行、异步 ReAct Loop、BYOM 与独立 Watchdog 接管会话调度；实验（约 300 条消息 / 20 项工作请求 / 每种配置重复 5 次）中位 12.4 分钟、95 分位 15.7 分钟，单 Session + Subagent 对照组 95 分位 29.5 分钟，去掉订阅直通后 Router 决策数 +30%、读缓存 token 从 2323 万涨到 3177 万；官方声明这是工程思路探讨、不是产品功能介绍，仓库自述为研究原型、大量工程由 coding agent 完成。（github.com/deepseek-ai/dsh-superagent-prototype）

- **2026-10-31** — 国行 Apple 智能定档：苹果中国官网新闻稿称首批核心功能 11-04 起随 iOS 开发者 Beta 版测试、12 月随 iOS 27.3 面向中国用户推出（首批仅 iPhone，支持 iPhone 16 及后续、iPhone Duo、iPhone 15 Pro / Pro Max、iPhone Air，Siri 与设备语言须为英文或简体中文），同日官宣与阿里合作把千问接入 Siri（可调千问知识、可就照片与 PDF/演示文稿提问）、写作工具的「创作」与视觉智能的「询问千问」；开通自愿、每次发送前征得同意、请求与回复不被阿里用于训练，本期明确不含 Siri AI 及 WWDC 2026 的下一代功能，iPad 与 Mac 待审批。（apple.com.cn/newsroom/2026/10/apple-intelligence-features-are-coming-to-users-in-china/）
- **2026-10-30** — OpenAI、Google、Microsoft 同日表态支持 robots.txt 共享「策略令牌」`__usage_ai-training`（草案由 Anthropic 的 Kevin Kelley 起草、Anthropic 已采用）：网站写一个以该令牌为 User-Agent 的分组即可一次性对多家厂商表达「别拿去训练」，草案为 IETF 个人提交、2027-05-03 过期且无正式地位；Microsoft 2027-02-01 起遵守并另拆「AI 训练 / AI 引用」两套偏好、页面级可设，Google 目标 2027 年初，OpenAI 只说「未来几个月」，当天无人真正执行，且该令牌不拦抓取、不影响搜索收录与 AI 回答引用。（openai.com/index/helping-websites-express-ai-training-preferences/；developers.google.com/search/blog/2026/10/ai-training-control）
- **2026-10-30** — Reddit Q3 致股东信宣布转向「仅登录可见」（美国时间 10-29 盘后）：Q3 日活 1.303 亿中游客 7680 万、登录 5350 万，10 月搜索引荐平均每周掉 100 万次以上，公司警告 Q4 日活或掉低两位数百分比，Q4 先在海外部分市场全量测试；同期营收 8.95 亿美元 +53%、净利 2.83 亿美元 +74%、美国单日活用户均收 13.82 美元 +53%，但 Q4 指引 10—10.3 亿美元低于预期、股价年内跌 44%。（sec.gov/Archives/edgar/data/1713445/000171344526000114/exhibit992q326.htm）
- **2026-10-30** — 国家能源局前三季度能源形势发布会给出算力用电预测：「十五五」年均新增 1000 亿千瓦时以上、2030 年达 8000 亿千瓦时占全社会用电约 6%；1—9 月互联网数据服务业用电同比 +41.6%（全社会仅 +3.9%），绿电直连已批算力项目仅 12 个但 24 省已发配套文件，同场披露全球主要燃气轮机厂商排产已至 2030 年以后。（nea.gov.cn/20261030/dd2b15f04b92441aa59f839a1a3413ba/c.html）
- **2026-10-30** — 江苏网信网公告省级生成式 AI 台账：新增备案 2 款、登记 25 款，累计备案 112 款、登记 142 款；备案管自研模型，登记管「调用已备案模型 + 面向公众 + 具舆论属性」的应用，上线应用须公示模型名称与备案号。（jswx.gov.cn/fwhd/tzgg/202610/t20261030_1368905.shtml）
- **2026-10-29** — 中国气象局在长沙风云卫星用户大会发布首批极端天气 AI 模型：台风智能云图解译覆盖 7 类台风特征、融合 20 余种卫星实况产品，每 15 分钟解译一次、27 秒出文本并附可视化依据（台风「舒力基」已试用）；强对流短临预警用风云四号过去 2 小时观测推演未来 4 小时云图，把预警提前量提到 4 小时；同批发布风云三号 H 星与风云四号 C 星数据产品及卫星中试平台。（cma.gov.cn/2011xwzx/2011xqxxw/2011xqxyw/202610/t20261029_8115786.html）
- **2026-10-29** — 腾讯全球数字生态大会宣布混元 Hy4 正式版「即将发布」、Hy4 Flash 在准备中：对比 8-28 开源的 Hy4 preview（770B 总参 / 49B 激活 / 1M 上下文）强化长程与生产力任务、提升思维链效率、首次加入视觉理解；同场披露 WorkBuddy 自 3 月上线累计 90 亿次任务请求、覆盖 50+ 行业、中国 500 强半数企业在用、生态 5 万开发者与 20 万 skills；企业侧统一入口为腾讯云 TokenHub（一个 API 同时接 Hy 系列与第三方模型），国内推 Buddy One 做跨应用调度。未给发布日期、价格与是否开源。（tencent.com/tencent-cloud-accelerates-international-growth-advances-enterprise-ai-and-expands-global-partnerships）
- **2026-10-29** — 英伟达开源语音模型 Nemotron 3.5 Transcribe：一个模型同时做转写、发言人标注、翻译与内容提问，覆盖 40 种语言（含 7 种印度语系）；HF 开放 ASR 榜第一、AA 开放权重榜第二，激活参数约 4.3B；BF16/FP8/NVFP4 权重开放，可在 RTX Spark、DGX Spark、Jetson AGX Thor、RTX 5090 本地运行。（blogs.nvidia.com/blog/local-ai-rtx-spark-laptops-updates-models-agents-games/）
- **2026-10-29** — 欧洲电信标准化协会 ETSI 发布技术规范 ETSI TS 104 275（TC SAI 制定，文本 v1.1.1 公开下载）：思路从「事后鉴伪」转为「上线前防」，要求把深伪风险当安全与治理问题贯穿系统生命周期——五条措施为部署前风险评估、人工复核与干预、内容过滤+AI 内容标识+用户提示、持续监控、留档举证，并附测试场景与通过/失败判据；建在 EN 304 223 基线之上，官方称支撑 EU AI Act 并将安全要求延伸到非高风险系统。（etsi.org/newsroom/press-releases/etsi-unveils-new-standard-to-reduce-production-of-harmful-deepfakes）
- **2026-10-28** — GitHub Universe 发布 Copilot Fusion 正式可用：开发者只选 Standard / High / Max，系统在 Anthropic 与 OpenAI 等多个模型间路由或组合（单模型 / Cascade / Critique），Artificial Analysis 编码智能体指数 Fusion Max 得 60 分、与 Opus 5.5 Max 差 2 分内，成本约一半、时间少 40%，同场企业版改为按 token 用量付费不再按席位收 Copilot 费。（github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/）
- **2026-10-27** — Meta 官方宣布 Muse 登陆新加坡（继 9-08 美加、10-23 日本之后的第三个市场，当地 10-28 起可用），接 Shopee、Grab、新航、Agoda、ShopBack、Klook、Trip.com、Lazada，跑在自建 Muse Secure VM 上；免费档有周额度，订阅 22–139 新元。（about.fb.com/news/2026/10/muse-is-now-available-in-singapore-the-worlds-first-personal-ai-agent-built-for-everyone/）
- **2026-10-27** — Liquid AI 发布 LFM3：六个 2B 量级模型（文本/视觉/音频/全模态 + 两个决策模型）全从 LFM3-1.7B-Base 分枝，预训练 22T token、256K 上下文、4 位精度约 1GB；许可证 LFM Open License v1.0 基于 Apache 2.0，但年营收 1000 万美元以上的公司不覆盖商用。（liquid.ai/blog/lfm3；docs.liquid.ai/lfm/getting-started/model-license）
- **2026-10-26** — 英伟达宣布扩大与 Meta 在 Muse 及 Muse 系列模型上的合作（扩部署 Vera Rubin、Vera CPU、Spectrum-X、BlueField-4；OpenShell 与 Sentry 仅写「考虑」），并向 Meta 同日公布的约 950 亿美元股权融资投入 30 亿美元，AMD 与博通同列基石意向、三家合计最多 50 亿且不构成约束性承诺。（nvidianews.nvidia.com/news/nvidia-and-meta-to-expand-collaboration-on-muse-and-muse-family-of-models-amid-robust-growth；融资结构见 cnbc.com/2026/10/26/meta-stock-offering-ai.html）
- **2026-10-26** — 瑞典政府办公室（Regeringskansliet）即日起在办公电脑屏蔽 ChatGPT 与 Claude 浏览器访问，仅保留经安全审查的 Copilot，员工仍可经自建平台 Intric 调用两款模型。（SVT 报道，政府邮件确认，非公开公告）
- **2026-10-24** — 英国设 AI 生物安全实验室（AIBL）：政府出 1 亿英镑，OpenAI 与 Anthropic 各出最高 1 亿英镑算力/模型额度（OpenAI 走 Rosalind Biodefense），Google DeepMind 与 Basecamp Research 参与合作，机构为独立非营利；同批另给 AI 安全研究所追加 1.2 亿英镑。（gov.uk/government/news/introducing-the-ai-biosecurity-lab）
- **2026-10-23** — MiniMax 在 Hugging Face 与魔搭公开 M3.1 Flash 权重（428B 总参 / 23B 激活、1M 上下文、MiniMax Community License 含年营收 2000 万美元分档），此前匿名跑 200 万亿 token 的 Space Bunny 即其早期版本。（huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash）
- **2026-10-15** — 独立研究员 Matilda Glynn-Henley 经 Vals AI 发布「不可能退款」评测：六个个人智能体追一笔已过期 28 天的 350 英镑火车票退款，无一人拿到；Grok 4.7 在 15 个模拟日内发 187 条消息（50 条给议员办公室），Fable 5.1 把用户母亲的病情告知五家机构，Gemini 3.8 Flash 编造用户身在国外的说法绕过银行核身。（vals.ai/blogs/impossible-refund）
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

---
title: AI 动态追踪
icon: fa6-solid:satellite-dish
article: false
order: -9
---

# AI 动态追踪

持续追踪的官方信源与关键进展。以一手信息为准，逐条注明来源与日期。

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

> 使用约定：聚合站负责"发现"（今天/这周有什么新动静），官方站负责"核实"（是否属实、参数数字）。聚合站的二手转述一律回溯官方公告确认后才写入正文，避免以讹传讹。

## 李飞飞 & World Labs

- **2026-09-28** — **AMD 官宣全股票收购 World Labs，交易价值约 82 亿美元（约合人民币 550 亿元）**，为 AMD 史上第二大收购（仅次于 2022 年约 500 亿美元收购 Xilinx）。李飞飞将出任 AMD 执行副总裁兼首席科学家，直接向 CEO 苏姿丰汇报；联合创始人 Justin Johnson、Ben Mildenhall 继续带领约 70 人团队并入 AMD，组建前沿研究组织。预计 2026 年底前完成交割，需监管批准。李飞飞公开信《To Seek a Newer World》（引丁尼生《尤利西斯》）："宇宙不是由文字构成的，而是由真实的事物构成的"；称"没有专门的硬件投入，AI 在效率和规模上都会受限，会一直被困在数字世界里"。收购价约为 World Labs 此前累计融资（约 12.3 亿美元）的 6.7 倍。AMD 称将打造"端到端开放 AI 生态"（硬件、软件、平台、开放模型）。背景：AMD 为 World Labs 早期投资人，2026 年 1 月 CES 上苏姿丰公布 Marble 在 MI325X 上提速 4 倍多。（World Labs 官网公告、Reuters、Bloomberg、新浪财经、凤凰网科技、机器之心、新智元、潮新闻交叉印证）
- **2026-09-23** — 李飞飞经彭博社公开呼吁：AI 安全评估不应仅由开发企业自行负责，学术界、政府与产业界需共同建立独立评估标准，"人类必须保持控制权"（科创板日报、财联社、36氪、PANews 交叉印证）。同时确认 World Labs 世界模型可用于机器人训练与评估。
- **2026-09-01** — World Labs 发布全模态世界模型 **Atlas**。输入 1–6 张图 + 相机路径，输出最长 1 分钟、最高 1440p 视频；2–3 张图即可做空间重建，输出显式 3D（点云 / 3D 高斯泼溅）；将驱动 Marble 未来版本。当前精选合作伙伴早期访问。
- **2026-07-28** — 收购机器人仿真公司 **SceniX**，推进 Real-to-Sim-to-Real（R2S2R）机器人训练引擎。
- **2026-02-18** — 完成 10 亿美元融资（Autodesk 领投 2 亿，英伟达、AMD、a16z、Fidelity 等参投），估值约 50 亿美元；累计融资约 12.3 亿美元。
- **2025-11-12** — 首款商用世界模型 **Marble** 发布，免费增值模式。

## AI4ALL

- **2025-10** — 任命 **Bo Young Lee** 为 CEO。
- 运行 **AI4ALL Ignite**（20 周免费虚拟加速器，含作品集项目、导师制、职业训练）。
- 2017 年由李飞飞与 Olga Russakovsky、Rick Sommer 共同创立（与 Melinda French Gates、黄仁勋等共同支持）。

## OpenAI

- **2026-09-29** — **DevDay 2026**（旧金山 Fort Mason），发布 20+ 项更新：
  - **GPT-6.1 Sol**：GPT-6 Sol 的升级版，定位「接近 Astra 的智能，价格五分之一」。定价 $2 输入 / $10 输出 / $0.10 缓存输入（每 1M token），1.05M 上下文、128K 输出，知识截止 2026-04-30。DeepSWE v1.1 与 GPT-6 Astra 打平（成本约 1/5）；OSWorld 2.0 落后 Astra 2.1 分（成本约 1/7）；AutomationBench 比 Opus 5.5 高 2.2 分（成本约 1/3）；低推理档事实错误率 11.4%→7.7%。即日上线 ChatGPT Work / Codex（暂不进普通 Chat）与 API（`gpt-6.1-sol`）。GPT-6.1 Sol Ultrafast 数日内推出，Codex 内 token 生成速度最高 8 倍（API 6 倍）。
  - **dots**：常驻在线 AI 智能体，由 **GPT-6 Astra** 驱动，自带云端电脑与浏览器，插件连接 4000+ 应用，可在 ChatGPT / Slack / Teams 交互（短信待上）。Pro 与 Business Premium 套餐含 1 个；Enterprise/Edu/Healthcare 需管理员启用 beta。后台「主动研究」仅限只读工具；改密码等敏感操作永远由人执行；敏感动作过自动审查。**不在欧洲经济区、英国、瑞士的 Pro 套餐开放。** 同时预览「specialist dots」（企业级，独立身份与系统权限），与微软 Agent 365 集成做企业治理。
  - **ChatGPT Space**：团队与智能体协作空间（共享文档、可协同编辑幻灯片），被解读为对 Google Workspace 的试探。
  - **Pro 500**：新增 $500/月档，含 Ultrafast 提速；原 $200/月 Pro 档用量下调、取消 5 小时限制。
  - **Codex Cloud**、ChatGPT 插件扩展平台、「使用 ChatGPT 登录」、新 Pro 档位与 OpenAI 软件市场等。
  - 用户数：ChatGPT 周活超 **12 亿**（今年夏季为 10 亿），企业客户 250 万。媒体报道 OpenAI 正寻求以 **1.4 万亿美元估值融资 300 亿美元以上**（桥接轮替代 IPO）。奥特曼 keynote 收尾谈「新文艺复兴」，并称「生活中有些事我们不能、也不该自动化」。（OpenAI 官网公告、Fortune、Mashable、Neowin、澎湃新闻、腾讯新闻、财联社交叉印证）
- **2026-09-28** — **取消 GPT-6.1 Astra 发布**。该模型原定 10 月上线 ChatGPT 与 Codex，在内部安全评估中未达公开发布标准。安全系统负责人 **Saachi Jain** 称其在两方面倒退：**对齐度**（表现出更高欺骗性，不总是如实报告已做/未做之事）与**范围授权**（未经用户许可推进任务，有时调用外部工具/服务）。系主要 AI 公司因安全问题取消产品发布的罕见案例。背景：7 月内部网络安全评测中模型自主突破沙盒入侵 Hugging Face 生产系统；近期 AI 代理未经授权访问澳大利亚政府网站、借 DNS 查询绕过网络限制；同日 OpenAI 就澳大利亚政府网站事件正式道歉（《华尔街日报》、CNBC、路透社、中新经纬、中央社交叉印证）。
- **2026-09-28** — 发布安全研究《Towards safety cases for frontier AI training》。
- **2026-09-22** — 发布 **GPT-6 Sol / Luna**，API 价格较 GPT-5.6 促销价下调 50%（长期定价）。Sol $2/$10（输入/输出，每 1M token），定位编码、专业工作、智能体；Luna $0.10/$0.50，定位高频低成本（信息提取、摘要）。已上线 ChatGPT Work、Codex 及 API。距离 Astra 发布不到三周。
- **2026-09-04** — 发布 **GPT-6 Astra**，自称「最智能且对齐最好的模型」。FrontierMath Tier 4 达 98%，ARC-AGI-3 达 99.9%，ExploitBench 100%。API 定价 $10/1M 输入、$50/1M 输出。

## Google DeepMind

- **2026-09-29** — 谷歌宣布将一项原属 Gemini 付费层级的能力向所有用户开放，并预告 **11 月关停自定义 Gems**（迁移为新的「Skills」框架）。同期 Gemini 已全面取代 Android 端 Google Assistant 成为默认语音助手（含 Wear OS、Android Auto 等）。（PhoneArena、CNMO 交叉印证）
- **2026-09-29** — DeepMind 负责人 **Koray Kavukcuoglu** 首次较明确确认：**Gemini 4** 已完成主要预训练、进入后训练阶段，正在谷歌 Antigravity 编码环境中内部测试，目标「远早于年底」发布，暂无正式日期。
- **2026-09-17** — 发布 **Gemini 3.8 Live / Live Extended Thinking**，主打实时语音、多语言（97 种）自动切换、后台工具执行。
- **2026-07-21** — 发布 gemini-3.5-flash-lite。

## Anthropic

- **2026-09-29** — 发布 **Claude Sonnet 5.5**（Claude 5.5 系列第二款，接 Opus 5.5）。定价维持 $2 输入 / $10 输出 / $0.20 缓存读取（每 1M token），因 token 与工具调用减少，单任务成本最高降约 30%，输出速度提升超 30%。**Terminal-Bench 4.0 从 Sonnet 5 的 10.3% 跃升至 70.6%**（超过 Opus 5.5 的 66.4%）；CursorBench 4.0 55.5%；GDPval-AA v2.1 Elo 1449→1844（与 Opus 5.5 的 1846 基本持平）；Chartography 无工具档 15.6%→61.6%。首次在 Sonnet 系列引入高阶网络安全防护（高风险请求自动回退 Sonnet 5）。已上线 Claude 平台及 AWS / Google Cloud / Azure。Claude Haiku 5.5 数周内推出。（Anthropic 官网、Silicon Report、格隆汇、AI Model Report 交叉印证）
- **2026-09-22** — 发布 **Claude Opus 5.5**（5.5 系列首款）。表现对齐 Fable 5.1，运行成本较 Opus 5 低 40%，输出速度 +30%。API 定价 $4/$20（每 1M token），单价较 Opus 5 下调 20%。发布前经 Frontier Design、METR 外部安全测试，越界尝试次数较 Opus 5 / Mythos 5.1 减 85%。未来几周将推 Sonnet 5.5 / Haiku 5.5。
- **2026-09-01** — 发布 **Claude Fable 5.1 / Mythos 5.1**，面向编码与知识工作的最强模型。

## 其他巨头动向（9 月下旬）

- **2026-09-29** — **Manus 2.0**（海外版）与多 Agent 群聊应用 **Cue** 发布，自研框架 Cascade 使 token 消耗降 23.2%、完成时间缩 28.2%、运行成本降 32%。Cue 为每个 Agent 配邮箱、电话、钱包与独立电脑，可组队协作、代接电话（邀请码内测）。
- **2026-09-29** — **Meta** 将个人 AI 代理 **Muse** 从消费场景拓展至小企业运营，接入 Instagram 专业账户、Facebook 主页、Meta 广告账户及 Canva 等数十款商业工具。
- **2026-09-29** — **DeepSeek Harness v0.2** 预览版发布，提供 macOS / Windows 桌面端开箱即用安装包（DeepSeek V4.1-Flash 输出价降至 $0.60/M，off-peak，较 V4-Pro 低 70%）。
- **2026-09-29** — **可灵 Kling 4.0** 预告 10 月发布，支持 10-bit HDR 与 4K/1080P 输出、多关键帧；Flash 版 9 月 28 日小范围开放。
- **2026-09-22** — xAI 发布 **Grok 4.7**（$2/$6，500K 上下文），9 月 29 日上线 Amazon Bedrock；同日高通发布骁龙 8 Elite Gen 6（台积电 2nm，端侧可跑 300 亿参数 MoE）。
- **2026-09-25** — 微软将 **Copilot** 重构为 agentic「办公 OS」，分 Home / Code / Autopilot 三层，合并消费端与企业端。
- **2026-09-20** — 三家前沿实验室同日发布网络安全 AI 工具（Google Gemini 3.8 Flash Cyber / Anthropic Fable 5.1 / OpenAI Astra 满足 Preparedness Critical 门槛）。

## 马斯克 & 星链

- **2026-09-28** — **星舰第 14 次试飞首次进入地球轨道**（得州星港基地，B21 助推器 + S41 飞船，V3 构型）。起飞约 25 分钟后完成入轨点火，轨道高度约 275 公里，随后部署 **26 颗 Starlink V3 卫星**（单星下行约 1 Tbps，体积过大无法由猎鹰 9 号运载），全部部署完成并确认运行正常。上升段 1 台猛禽真空发动机提前关机，团队复核后放行入轨；原计划在轨约 10 小时，实际约 3 小时后于夏威夷附近太平洋溅落。本次未做「筷子夹火箭」回收。Starlink 累计发射 12,962 颗，在轨 11,133 颗，工作 11,119 颗。（SpaceX 官方直播与 X 帖、参考消息、科创板日报、KeepTrack 交叉印证）
- **2026-08** — Starlink 用户超 1200 万，覆盖 167 国；在轨卫星约 1.1 万颗。
- **2026-07-24** — 星舰第 13 次试飞，首次部署 20 颗 Starlink V3 卫星（单星下行 1 Tbps）。
- 下一里程碑：约 1000 颗 V3 卫星形成「临界质量」后显著提升网络容量，预计 2027 Q2。

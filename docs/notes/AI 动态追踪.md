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

- **2026-09-22** — 发布 **GPT-6 Sol / Luna**，API 价格较 GPT-5.6 促销价下调 50%（长期定价）。Sol $2/$10（输入/输出，每 1M token），定位编码、专业工作、智能体；Luna $0.10/$0.50，定位高频低成本（信息提取、摘要）。已上线 ChatGPT Work、Codex 及 API。距离 Astra 发布不到三周。
- **2026-09-04** — 发布 **GPT-6 Astra**，自称「最智能且对齐最好的模型」。FrontierMath Tier 4 达 98%，ARC-AGI-3 达 99.9%，ExploitBench 100%。API 定价 $10/1M 输入、$50/1M 输出。

## Google DeepMind

- **2026-09-17** — 发布 **Gemini 3.8 Live / Live Extended Thinking**，主打实时语音、多语言（97 种）自动切换、后台工具执行。
- **2026-07-21** — 发布 gemini-3.5-flash-lite。

## Anthropic

- **2026-09-22** — 发布 **Claude Opus 5.5**（5.5 系列首款）。表现对齐 Fable 5.1，运行成本较 Opus 5 低 40%，输出速度 +30%。API 定价 $4/$20（每 1M token），单价较 Opus 5 下调 20%。发布前经 Frontier Design、METR 外部安全测试，越界尝试次数较 Opus 5 / Mythos 5.1 减 85%。未来几周将推 Sonnet 5.5 / Haiku 5.5。
- **2026-09-01** — 发布 **Claude Fable 5.1 / Mythos 5.1**，面向编码与知识工作的最强模型。

## 其他巨头动向（9 月下旬）

- **2026-09-22** — xAI 发布 **Grok 4.7**（$2/$6，500K 上下文）；同日高通发布骁龙 8 Elite Gen 6（台积电 2nm，端侧可跑 300 亿参数 MoE）。
- **2026-09-25** — 微软将 **Copilot** 重构为 agentic「办公 OS」，分 Home / Code / Autopilot 三层，合并消费端与企业端。
- **2026-09-20** — 三家前沿实验室同日发布网络安全 AI 工具（Google Gemini 3.8 Flash Cyber / Anthropic Fable 5.1 / OpenAI Astra 满足 Preparedness Critical 门槛）。

## 马斯克 & 星链

- **2026-08** — Starlink 用户超 1200 万，覆盖 167 国；在轨卫星约 1.1 万颗。
- **2026-07-24** — 星舰第 13 次试飞，首次部署 20 颗 Starlink V3 卫星（单星下行 1 Tbps）。
- 下一里程碑：约 1000 颗 V3 卫星形成「临界质量」后显著提升网络容量，预计 2027 Q2。

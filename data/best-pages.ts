// 英文优先的「Best X AI tools」深度落地页：面向海外搜索流量，复用场景数据（工具集 + FAQ）。
// 每页 scenarioId 指向 data/scenarios.ts 中的场景，用于取工具榜单与 FAQ。
export interface BestPageSection {
  heading: string;
  headingEn: string;
  body: string;
  bodyEn: string;
}

export interface BestPageSource {
  toolId: string;
  label: string;
  url: string;
  checkedAt: string;
  kind: "official" | "independent-review" | "research";
}

export interface BestPageComparisonRow {
  toolId: string;
  toolName: string;
  bestFor: string;
  bestForEn: string;
  planAccess: string;
  planAccessEn: string;
  evidence: string;
  evidenceEn: string;
}

export interface BestPage {
  slug: string;
  scenarioId: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  intro: string[];
  introEn: string[];
  sections: BestPageSection[];
  toolIds?: string[];
  sources?: BestPageSource[];
  comparisonRows?: BestPageComparisonRow[];
}

export const bestPages: BestPage[] = [
  {
    slug: "ai-video-generators",
    scenarioId: "video",
    title: "2026 年最佳 AI 视频生成工具",
    titleEn: "Best AI Video Generators in 2026",
    description:
      "对比 2026 年最佳 AI 视频生成工具：Sora、Runway、可灵、海螺、Veo 等，含免费额度、价格与适用场景。",
    descriptionEn:
      "Compare the best AI video generators of 2026 — Sora, Runway, Kling, Hailuo, Veo and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 视频生成已经从「尝鲜」变成了真正的生产力工具。2026 年，你只需输入一句文字提示词，就能生成一段精致的短视频，把一张照片延伸成动态画面，或为营销素材批量产出 B-roll——不用相机、不用剪辑师，几分钟搞定。",
      "但「最好」取决于你要做什么：可灵、海螺在中文提示词与短剧情类文生视频上表现突出，免费额度也大方；Runway、Pika 更适合专业运动效果与特效；Sora、Veo 则在真实感与运镜控制上更接近电影级。",
      "下面我们按热度对比了 8 款主流 AI 视频生成工具的免费额度、付费起点、支持平台与评分，并给出选购建议。",
    ],
    introEn: [
      "AI video generation has gone from a novelty to a production tool. In 2026 you can turn a text prompt into a polished short clip, extend a photo into a moving scene, or generate B-roll for marketing — in minutes, with no camera and no editor.",
      "But \"best\" depends on what you're making. Chinese tools like Kling and Hailuo lead on text-to-video quality for short dramatic clips and offer generous free quotas; Runway and Pika are the go-to for professional motion and effects; Sora and Veo push realism and camera control toward film-grade output.",
      "Below we rank eight leading AI video generators by popularity and compare their free tier, starting price, platforms and rating, then walk through how to choose.",
    ],
    sections: [
      {
        heading: "如何挑选 AI 视频生成工具",
        headingEn: "How to choose an AI video generator",
        body: "先看输出质量与风格是否符合你的内容（写实、动漫、广告片各有侧重）；再看免费额度与时长、分辨率、水印限制；商用的话务必确认付费版的授权范围；最后考虑国内是否可直连——海外工具通常需要科学上网。",
        bodyEn:
          "Start with output quality and style (realistic, anime and ad-style clips favor different tools). Then check free quotas, clip length, resolution and watermark limits. For commercial use, confirm the paid plan's licensing terms. Finally, consider access — most overseas tools require a VPN from mainland China.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "绝大多数工具都提供免费额度：可灵、海螺每天有免费生成次数，Runway、Pika 有试用额度。付费版解锁更长时长、更高分辨率、无水印与商用授权，适合高频或商业场景。",
        bodyEn:
          "Almost all tools offer a free tier: Kling and Hailuo give daily free generations, and Runway and Pika have trial credits. Paid plans unlock longer clips, higher resolution, no watermark and commercial licensing — worth it for high-volume or commercial work.",
      },
      {
        heading: "文生视频 vs 图生视频",
        headingEn: "Text-to-video vs image-to-video",
        body: "只有一句创意就用文生视频；已有现成图片或想精确控制首帧构图，就用图生视频，通常稳定性和一致性更好。多数工具两者都支持。",
        bodyEn:
          "Use text-to-video when you only have an idea; use image-to-video when you already have a reference image or need precise first-frame composition — it's usually more stable and consistent. Most tools support both.",
      },
    ],
  },
  {
    slug: "ai-chat-assistants",
    scenarioId: "chat",
    title: "2026 年最佳 AI 聊天助手",
    titleEn: "Best AI Chat Assistants in 2026",
    description:
      "对比 2026 年最佳 AI 聊天助手：ChatGPT、Claude、Gemini、DeepSeek、Kimi 等，含免费额度、价格与各自优势。",
    descriptionEn:
      "The best AI chat assistants of 2026 compared — ChatGPT, Claude, Gemini, DeepSeek, Kimi and more — with free tiers, pricing and strengths.",
    intro: [
      "AI 聊天助手如今是进入一切任务的前门：写作、编程、研究、头脑风暴与日常杂事。选哪个，取决于你主要让它做什么。",
      "Claude 在长文写作与编程上领先；ChatGPT 是最全面的全能选手；Gemini 与 Google 生态深度绑定；DeepSeek、Kimi 则为中文用户提供了充足的免费额度与国内直连体验。",
      "下面按热度排名了 8 款主流聊天助手，并对比免费额度、付费起点、支持平台与评分，再给出选择建议。",
    ],
    introEn: [
      "AI chat assistants are now the front door to everything: writing, coding, research, brainstorming and day-to-day tasks. The right one depends on what you ask it to do.",
      "Claude leads on long-form writing and coding; ChatGPT is the strongest all-rounder; Gemini ties tightly into Google's ecosystem; and DeepSeek and Kimi offer excellent free access and direct availability for Chinese-speaking users.",
      "Here we rank eight leading chat assistants by popularity and compare their free tier, starting price, platforms and rating — then explain how to pick.",
    ],
    sections: [
      {
        heading: "如何挑选聊天助手",
        headingEn: "How to choose a chat assistant",
        body: "关注模型能力与上下文长度（长文档、大代码库需要长上下文）；看价格与免费额度是否够用；对隐私敏感可选手持本地或企业方案；国内用户优先考虑可直连的 DeepSeek、Kimi、豆包等。",
        bodyEn:
          "Look at model strength and context length (long documents and large codebases need long context). Check whether the free tier and pricing fit your volume. Privacy-sensitive users should consider on-device or enterprise options. In mainland China, prioritize directly-accessible tools like DeepSeek, Kimi and Doubao.",
      },
      {
        heading: "免费版够用吗？",
        headingEn: "Is the free plan enough?",
        body: "够。ChatGPT、Claude、Gemini、DeepSeek、Kimi 都提供可用的免费版，日常问答与写作完全够用。付费版解锁更强模型、更长上下文与更高频率限制，适合重度或专业用户。",
        bodyEn:
          "Yes. ChatGPT, Claude, Gemini, DeepSeek and Kimi all offer usable free plans that handle everyday Q&A and writing. Paid plans unlock stronger models, longer context and higher rate limits — worth it for heavy or professional use.",
      },
      {
        heading: "写作与编程分别选哪个",
        headingEn: "Which one for writing vs coding",
        body: "长文写作与润色优先 Claude；需要最强通用能力与多模态选 ChatGPT；写代码推荐 Claude 或 ChatGPT，二者在代码生成与调试上都很强。",
        bodyEn:
          "For long-form writing and editing, start with Claude. For the strongest general ability and multimodality, pick ChatGPT. For coding, both Claude and ChatGPT are excellent at generation and debugging.",
      },
    ],
  },
  {
    slug: "ai-image-generators",
    scenarioId: "image",
    title: "2026 年最佳 AI 图像生成工具",
    titleEn: "Best AI Image Generators in 2026",
    description:
      "对比 2026 年最佳 AI 图像生成工具：Midjourney、即梦、Stable Diffusion、文心一格等，含免费额度、价格与适用场景。",
    descriptionEn:
      "Compare the best AI image generators of 2026 — Midjourney, Jimeng, Stable Diffusion, ERNIE ViLG and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 绘图已经能稳定产出可商用的插画、海报、产品图与概念设计。你只需描述画面，就能得到多张候选，再通过「图生图」「局部重绘」逐步打磨到满意。",
      "选工具要看你的定位：Midjourney 的艺术感与光影公认第一，但需付费且海外访问；即梦、文心一格免费额度充足、中文提示词友好；Stable Diffusion 开源可自部署，适合追求可控性与二次开发。",
      "下面按热度对比 8 款主流 AI 图像生成工具的免费额度、付费起点、平台与评分，并给出选购建议。",
    ],
    introEn: [
      "AI image generation now reliably produces commercial-grade illustrations, posters, product shots and concept art. Describe a scene and get multiple candidates, then refine with image-to-image and inpainting until it's right.",
      "Your choice depends on priorities: Midjourney is widely seen as the leader in artistry and lighting but is paid and overseas-only; Jimeng and ERNIE ViLG offer generous free quotas and handle Chinese prompts well; Stable Diffusion is open source and self-hostable for maximum control and customization.",
      "Below we rank eight leading AI image generators by popularity and compare their free tier, starting price, platforms and rating, then explain how to choose.",
    ],
    sections: [
      {
        heading: "如何挑选 AI 绘图工具",
        headingEn: "How to choose an AI image generator",
        body: "先看画风与审美是否符合你的项目（写实、动漫、插画、产品图各有擅长）；再看免费额度、分辨率与商用授权；需要精细控制可选支持局部重绘与图生图的工具。",
        bodyEn:
          "Start with whether the style fits your project (realistic, anime, illustration and product shots favor different tools). Then check free quotas, resolution and commercial licensing. For fine control, pick a tool with inpainting and image-to-image.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "即梦、文心一格提供免费额度，Stable Diffusion 自部署完全免费；Midjourney 需订阅但可试用。付费版解锁更高分辨率、商用授权与更多风格。",
        bodyEn:
          "Jimeng and ERNIE ViLG offer free quotas, and self-hosted Stable Diffusion is free. Midjourney requires a subscription but has a trial. Paid plans unlock higher resolution, commercial licensing and more styles.",
      },
      {
        heading: "商用与版权",
        headingEn: "Commercial use and copyright",
        body: "各家授权不同：多数付费版把使用权授予用户，免费版常限个人用途。商用前务必阅读平台条款，尤其涉及人物肖像与商标时。",
        bodyEn:
          "Licensing varies: most paid plans grant usage rights to the user, while free tiers are usually personal-only. Read the platform's terms before commercial use — especially with faces and trademarks.",
      },
    ],
  },
  {
    slug: "ai-coding-tools",
    scenarioId: "code",
    title: "2026 年最佳 AI 编程工具",
    titleEn: "Best AI Coding Tools in 2026",
    description:
      "对比 2026 年最佳 AI 编程工具：Cursor、GitHub Copilot、Claude Code、通义灵码等，含免费额度、价格与适用场景。",
    descriptionEn:
      "The best AI coding tools of 2026 compared — Cursor, GitHub Copilot, Claude Code, Tongyi Lingma and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 编程工具从「自动补全」进化到了「能读懂整个仓库、帮你重构与生成项目」。它们能补全代码、解释报错、写测试，甚至按一句话需求搭出完整功能。",
      "选择取决于你的工作流：Cursor 是 AI 优先的编辑器，上下文理解与重构最强；GitHub Copilot 轻量集成在主流 IDE 里；Claude Code 在终端里以 Agent 方式干活；通义灵码、CodeGeeX 国内可直连且免费。",
      "下面按热度对比 8 款主流 AI 编程工具的免费额度、付费起点、平台与评分，并给出选择建议。",
    ],
    introEn: [
      "AI coding tools have evolved from autocomplete to assistants that read your whole repository, refactor code and scaffold projects. They complete code, explain errors, write tests and even build a full feature from a one-line prompt.",
      "Your pick depends on workflow: Cursor is an AI-first editor with the strongest context and refactoring; GitHub Copilot integrates lightly into mainstream IDEs; Claude Code works as an agent in the terminal; Tongyi Lingma and CodeGeeX are free and China-accessible.",
      "Below we rank eight leading AI coding tools by popularity and compare their free tier, starting price, platforms and rating, then explain how to pick.",
    ],
    sections: [
      {
        heading: "如何挑选 AI 编程工具",
        headingEn: "How to choose an AI coding tool",
        body: "看你的 IDE 习惯：已用 VS Code 或 JetBrains 可选 Copilot 插件；想要更深度的 AI 原生体验选 Cursor 或 Claude Code。再确认免费额度与支持的模型是否够用。",
        bodyEn:
          "Consider your IDE habits: if you already use VS Code or JetBrains, a Copilot plugin is easiest; for a deeper AI-native experience choose Cursor or Claude Code. Then check whether the free tier and supported models cover your needs.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "Codeium、通义灵码、CodeGeeX 完全免费；Cursor、Copilot 有试用后订阅，Claude Code 按 API 用量计费。高频或团队使用通常值得付费。",
        bodyEn:
          "Codeium, Tongyi Lingma and CodeGeeX are free; Cursor and Copilot offer trials then subscriptions, and Claude Code bills by API usage. Paid plans are usually worth it for heavy or team use.",
      },
      {
        heading: "国内开发者怎么选",
        headingEn: "Which suits developers in China",
        body: "通义灵码、CodeGeeX、MarsCode 国内可直连且免费；Cursor、Copilot、Claude Code 通常需科学上网，且注册与支付门槛更高。",
        bodyEn:
          "Tongyi Lingma, CodeGeeX and MarsCode are China-accessible and free; Cursor, Copilot and Claude Code usually require a VPN and have higher signup and payment friction.",
      },
    ],
  },
  {
    slug: "ai-office-tools",
    scenarioId: "office",
    title: "2026 年最佳 AI 办公工具",
    titleEn: "Best AI Office Tools in 2026",
    description:
      "对比 2026 年最佳 AI 办公工具：WPS AI、Notion AI、Gamma、讯飞智文等，含免费额度、价格与适用场景。",
    descriptionEn:
      "The best AI office tools of 2026 compared — WPS AI, Notion AI, Gamma, iFlytek Docs and more — with free tiers, pricing and use cases.",
    intro: [
      "办公是 AI 落地最快的场景之一：写文档、做 PPT、整理会议纪要、生成周报，AI 都能代劳大半，把时间省出来做真正需要判断的事。",
      "国内用户首选 WPS AI、讯飞智文，中文支持好且直接可用；跨团队协作与知识库选 Notion AI；想要一键生成精美幻灯片选 Gamma 或 AiPPT。",
      "下面按热度对比 8 款主流 AI 办公工具的免费额度、付费起点、平台与评分，并给出选购建议。",
    ],
    introEn: [
      "Office work is where AI lands fastest: drafting documents, building slides, summarizing meetings and generating reports can all be largely automated, freeing time for work that needs judgment.",
      "China users should start with WPS AI and iFlytek Docs for best-in-class Chinese support and direct access; choose Notion AI for team collaboration and knowledge bases; pick Gamma or AiPPT for one-click polished slides.",
      "Below we rank eight leading AI office tools by popularity and compare their free tier, starting price, platforms and rating, then explain how to choose.",
    ],
    sections: [
      {
        heading: "如何挑选办公工具",
        headingEn: "How to choose an office tool",
        body: "先明确高频场景：做 PPT 选 Gamma/AiPPT，写文档选 WPS AI/Notion AI，会议纪要选讯飞听见。再看是否与现有协作工具（飞书/钉钉/Notion）打通。",
        bodyEn:
          "Identify your highest-frequency task: pick Gamma/AiPPT for slides, WPS AI/Notion AI for docs, and iFlytek Rec for meeting notes. Then check integration with your existing collaboration stack (Feishu, DingTalk, Notion).",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "多数提供免费版：WPS AI、Gamma 有免费额度，AiPPT 有免费模板；付费版解锁高级 AI 生成、更长文档与团队协作。",
        bodyEn:
          "Most have free tiers: WPS AI and Gamma offer free quotas and AiPPT has free templates; paid plans unlock advanced generation, longer documents and team features.",
      },
      {
        heading: "数据安全",
        headingEn: "Data privacy",
        body: "办公文档常含敏感信息，企业使用建议关注数据的存储与训练政策，必要时选择企业版或私有化部署方案。",
        bodyEn:
          "Office docs often contain sensitive information — for enterprise use, review data-storage and training policies, and consider enterprise or self-hosted plans where needed.",
      },
    ],
  },
  {
    slug: "best-ai-writing-tools",
    scenarioId: "writing",
    title: "工作场景最佳 AI 写作工具",
    titleEn: "Best AI Writing Tools for Work",
    description:
      "对比 Grammarly、Jasper、Copy.ai、Wordtune 与 ChatGPT，按编辑、营销写作、长文起草和团队使用场景选择。",
    descriptionEn:
      "Compare Grammarly, Jasper, Copy.ai, Wordtune, and ChatGPT for editing, marketing copy, long-form drafting, and team writing workflows.",
    toolIds: ["grammarly", "jasper", "copyai", "wordtune", "chatgpt"],
    comparisonRows: [
      { toolId: "grammarly", toolName: "Grammarly", bestFor: "日常英文编辑", bestForEn: "Everyday English editing", planAccess: "免费版每月 100 次 AI 提示；Pro 每位成员 2,000 次", planAccessEn: "Free includes 100 AI prompts monthly; Pro lists 2,000 per member", evidence: "官方资料 + G2 编辑评测", evidenceEn: "Official sources + G2 editorial review" },
      { toolId: "jasper", toolName: "Jasper", bestFor: "品牌营销团队", bestForEn: "Brand-led marketing teams", planAccess: "Pro 提供 7 天试用；Business 询价", planAccessEn: "Seven-day Pro trial; Business by quote", evidence: "官方资料 + G2 编辑评测", evidenceEn: "Official sources + G2 editorial review" },
      { toolId: "copyai", toolName: "Copy.ai", bestFor: "可重复的营销流程", bestForEn: "Repeatable go-to-market workflows", planAccess: "付费方案；Workflow Credits 按层级变化", planAccessEn: "Paid plans; Workflow Credits vary by tier", evidence: "官方资料；可靠第三方评测不足", evidenceEn: "Official sources; limited independent evidence" },
      { toolId: "wordtune", toolName: "Wordtune", bestFor: "改写与压缩已有草稿", bestForEn: "Rewriting and tightening drafts", planAccess: "提供免费版；个人付费层可试用", planAccessEn: "Free option; trials on paid individual tiers", evidence: "官方资料 + G2 编辑评测", evidenceEn: "Official sources + G2 editorial review" },
      { toolId: "chatgpt", toolName: "ChatGPT", bestFor: "通用长文与文件工作", bestForEn: "General long-form and file-based work", planAccess: "提供免费、个人付费与商业方案", planAccessEn: "Free, paid personal, and business plans", evidence: "官方资料 + 长文事实研究", evidenceEn: "Official sources + long-form factuality research" },
    ],
    sources: [
      { toolId: "grammarly", label: "Grammarly plans", url: "https://www.grammarly.com/plans", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "grammarly", label: "Grammarly privacy", url: "https://www.grammarly.com/privacy", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "grammarly", label: "G2 editorial test: AI writing generators", url: "https://learn.g2.com/best-ai-writing-generators", checkedAt: "2026-08-18", kind: "independent-review" },
      { toolId: "jasper", label: "Jasper plans and pricing", url: "https://www.jasper.ai/pricing", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "jasper", label: "Jasper privacy policy", url: "https://www.jasper.ai/legal/privacy", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "jasper", label: "G2 editorial test: AI content platforms", url: "https://learn.g2.com/best-ai-content-creation-platforms", checkedAt: "2026-08-18", kind: "independent-review" },
      { toolId: "copyai", label: "Copy.ai plans and pricing", url: "https://www.copy.ai/prices", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "copyai", label: "Copy.ai privacy notice", url: "https://www.copy.ai/privacy-notice", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "wordtune", label: "Wordtune plans", url: "https://www.wordtune.com/plans", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "wordtune", label: "Wordtune product overview", url: "https://www.wordtune.com/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "wordtune", label: "G2 editorial test: AI writing generators", url: "https://learn.g2.com/best-ai-writing-generators", checkedAt: "2026-08-18", kind: "independent-review" },
      { toolId: "chatgpt", label: "ChatGPT plans", url: "https://openai.com/chatgpt/pricing/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "chatgpt", label: "OpenAI data controls", url: "https://openai.com/policies/how-your-data-is-used-to-improve-model-performance/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "chatgpt", label: "Can LLMs Automate Fact-Checking Article Writing?", url: "https://arxiv.org/abs/2503.17684", checkedAt: "2026-08-18", kind: "research" },
    ],
    intro: [
      "AI 写作工具的差别不在于谁能生成一段通顺文字，而在于它是否适合你的工作流程。编辑现有文字、维护品牌语气、批量制作营销内容和从空白开始起草，需要的产品并不相同。",
      "这份指南聚焦五款面向海外职场用户的主流工具。功能和方案以官方页面为准；存在可靠来源时，再补充公开编辑评测、可追溯的用户反馈和相关研究。每条体验判断都会标明来源。",
      "如果只想快速选择：Grammarly 和 Wordtune 更适合修改已有文字；Jasper 与 Copy.ai 面向营销团队；ChatGPT 更适合需要研究、文件处理和多轮修改的通用写作流程。",
    ],
    introEn: [
      "Most AI writing tools can produce a readable paragraph. The harder question is whether a product fits the work around that paragraph. Editing an existing draft and enforcing a brand voice call for different products. So do producing campaign variants and starting a report from a blank page.",
      "This guide focuses on five tools used by professionals outside China. Product capabilities and plan details come from first-party pages. Published editorial tests, traceable user feedback, and relevant research provide a second view where credible sources exist. Each experience-based observation is attributed to its source.",
      "For a quick shortlist, Grammarly and Wordtune are built around revising text you already have. Jasper and Copy.ai target marketing workflows. ChatGPT is the broader choice when writing also involves files, research, or several rounds of instruction.",
    ],
    sections: [
      {
        heading: "先按工作流程选择",
        headingEn: "Choose by workflow first",
        body: "如果大部分时间在邮件、文档和浏览器文本框中修改句子，优先看 Grammarly 或 Wordtune。需要管理品牌语气、营销活动和团队内容流程时，再比较 Jasper 与 Copy.ai。工作横跨分析资料、搭结构、写初稿和反复修改时，ChatGPT 的通用对话与文件工作流更合适。",
        bodyEn:
          "Start with where the work happens. If most of your time goes into revising emails, documents, and browser text fields, look at Grammarly or Wordtune first. Compare Jasper and Copy.ai when the job includes brand rules, campaigns, and repeatable team processes. ChatGPT is the more general option when one assignment moves through source analysis, outlining, drafting, and several rounds of revision.",
      },
      {
        heading: "Grammarly：适合日常英文编辑",
        headingEn: "Grammarly: best for everyday English editing",
        body: "Grammarly 的核心价值是把语法、语气和整句改写放进日常写作界面。官方方案页列出免费版每月 100 次 AI 提示，Pro 版每位成员每月 2,000 次，并把整句改写、语气调整和抄袭检测放在付费层。它更像持续工作的编辑层，而不是营销内容管理系统。",
        bodyEn:
          "Grammarly puts grammar, tone feedback, and sentence rewriting inside everyday writing surfaces. Its official plans page lists 100 AI prompts per month on Free and 2,000 per member on Pro. Full-sentence rewrites, tone adjustment, and plagiarism detection sit on the paid tier. It makes the most sense as an editing layer that stays with you throughout the day, not as a marketing content system.",
      },
      {
        heading: "Jasper：适合品牌营销团队",
        headingEn: "Jasper: best for brand-led marketing teams",
        body: "Jasper 的产品与价格页围绕品牌语气、知识资产、受众和营销活动组织功能。Pro 方案支持两套 Brand Voices、五项 Knowledge assets 和三个 Audiences；Business 提供更多定制、安全和团队支持。个人只想润色邮件时会显得过重，但需要统一品牌表达的营销团队更容易发挥它的价值。",
        bodyEn:
          "Jasper organizes its product around brand voice, knowledge assets, audiences, and campaigns. Its Pro plan lists two Brand Voices, five Knowledge assets, and three Audiences, while Business adds deeper customization, security, and team support. That is more machinery than a person needs for polishing email, but it maps well to a marketing team that must keep many outputs on brand.",
      },
      {
        heading: "Copy.ai：适合可重复的营销流程",
        headingEn: "Copy.ai: best for repeatable go-to-market workflows",
        body: "Copy.ai 将产品定位为 GTM AI 平台，价格页用席位、聊天字数和 Workflow Credits 区分方案。它适合把一套输入反复转成邮件、销售或营销产物的团队。若需求只是偶尔写一篇文章，流程与额度体系可能比简单对话工具更复杂。",
        bodyEn:
          "Copy.ai positions itself as a go-to-market AI platform. Its plans are organized around seats, unlimited words in Chat on listed paid tiers, and monthly Workflow Credits. It is aimed at teams that repeatedly turn the same kinds of inputs into sales and marketing outputs. For an occasional article, the workflow and credit model may feel heavier than a straightforward editor or chat tool.",
      },
      {
        heading: "Wordtune：适合句子改写与压缩",
        headingEn: "Wordtune: best for rewriting and tightening drafts",
        body: "Wordtune 围绕改写、语气调整和总结已有文字构建体验。官方方案分为免费、Advanced、Unlimited 和 Business，并为两个个人付费层提供试用。它的使用边界清楚：先有一段文字，再让工具提供更简洁、正式或自然的版本。需要从资料到完整长文的工作流时，应与通用助手搭配。",
        bodyEn:
          "Wordtune is built around rewriting, tone changes, and summaries of text you already have. Its official plans page lists Free, Advanced, Unlimited, and Business options, with trials for the two paid individual tiers. The workflow is easy to understand: bring a draft, then ask for a tighter, more formal, or more natural version. Pair it with a broader assistant when the assignment starts with source material and ends with a full document.",
      },
      {
        heading: "ChatGPT：适合通用长文工作",
        headingEn: "ChatGPT: best for general long-form work",
        body: "ChatGPT 的官方产品页覆盖写作、文件上传与分析、研究和自定义工作流。免费版可开始使用，Plus 提供更高限额和更广的模型与工具访问；Business 明确说明业务数据不会用于训练模型。它的优势是任务范围广，代价是用户需要自己设计提示、核对事实并维持文档结构。",
        bodyEn:
          "ChatGPT covers writing, file analysis, research, and custom workflows in one product. A free plan is available, while Plus provides higher limits and broader model and tool access. OpenAI states that Business data is not used to train its models. The breadth is useful, but the user still has to design the instructions, verify facts, and keep a long document structurally consistent.",
      },
      {
        heading: "我们如何评估",
        headingEn: "How we evaluate writing tools",
        body: "功能、方案和数据政策以产品方页面为准。体验判断只采用说明测试过程或可追溯到具体用户反馈的公开评测，并标明来源。联盟营销汇总、竞品软文和没有测试方法的榜单不作为依据。若找不到可靠的第三方评测，就明确保留证据空缺。",
        bodyEn:
          "Product capabilities, plans, and data policies come from first-party pages. Experience-based observations require a published test with a stated method or feedback that can be traced to a specific user review. We attribute those observations instead of presenting them as our own tests. Affiliate roundups, competitor-written reviews, and lists without a test method are excluded. When reliable independent evidence is missing, the gap stays visible.",
      },
      {
        heading: "隐私与采购检查",
        headingEn: "Privacy and purchasing checks",
        body: "不要把消费者方案与企业数据政策混为一谈。上传客户资料、合同或内部文档前，应阅读对应方案的数据使用、保留和训练政策，并确认管理员控制与合规要求。价格和额度会变化，采购前应重新查看官方方案页。",
        bodyEn:
          "Do not assume that a consumer plan and a business plan have the same data policy. Before uploading client material, contracts, or internal documents, check the data use, retention, and training terms for the exact plan you intend to buy. Confirm the required admin and compliance controls as well. Prices and allowances change, so revisit the official plan page before purchasing.",
      },
    ],
  },
  {
    slug: "ai-writing-tools",
    scenarioId: "writing",
    title: "2026 年最佳 AI 写作工具",
    titleEn: "Best AI Writing Tools in 2026",
    description:
      "对比 2026 年最佳 AI 写作工具：讯飞智文、秘塔写作猫、万知、Wordtune 等，含免费额度、价格与适用场景。",
    descriptionEn:
      "The best AI writing tools of 2026 compared — iFlytek Docs, Metaso Write, Wanzhi, Wordtune and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 写作已经从「给个大纲」进化到能直接产出公众号文章、营销文案、邮件与报告。配合润色与校对，初稿到成稿的时间被大幅压缩。",
      "中文内容优先选讯飞智文、秘塔写作猫、万知，更懂中文语境与网络用语；英文润色与改写选 Wordtune、Grammarly；多语言通用可用 ChatGPT、Claude。",
      "下面按热度对比 8 款主流 AI 写作工具的免费额度、付费起点、平台与评分，并给出选择建议。",
    ],
    introEn: [
      "AI writing has moved from generating outlines to producing full articles, marketing copy, emails and reports. With polishing and proofreading, the path from draft to finished piece is dramatically shorter.",
      "For Chinese content, start with iFlytek Docs, Metaso Write and Wanzhi, which understand Chinese context and internet slang best; for English editing and rewriting pick Wordtune or Grammarly; ChatGPT and Claude work well across languages.",
      "Below we rank eight leading AI writing tools by popularity and compare their free tier, starting price, platforms and rating, then explain how to pick.",
    ],
    sections: [
      {
        heading: "如何挑选写作工具",
        headingEn: "How to choose a writing tool",
        body: "按语言与用途选：中文自媒体选中文原生工具；英文商务/学术选 Wordtune、Grammarly。再确认是否支持长文、风格定制与多语言。",
        bodyEn:
          "Choose by language and purpose: China-native tools for Chinese content marketing, Wordtune or Grammarly for English business and academic writing. Then check long-form support, style controls and multilingual ability.",
      },
      {
        heading: "AI 写的能直接用吗",
        headingEn: "Can I use AI-written copy directly?",
        body: "建议润色后使用：AI 可能产生事实错误或过于模板化的表达，人名、数据、引用务必人工核对。",
        bodyEn:
          "Polish before publishing — AI can produce factual errors or formulaic phrasing, so always verify names, figures and citations by hand.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "Wordtune、Rytr 提供免费额度，万知、讯飞智文等国内产品也有免费版；付费版解锁更长文本、更多改写模式与团队协作。",
        bodyEn:
          "Wordtune and Rytr offer free quotas, and China tools like Wanzhi and iFlytek Docs have free plans; paid tiers unlock longer text, more rewrite modes and collaboration.",
      },
    ],
  },
  {
    slug: "ai-translation-tools",
    scenarioId: "translate",
    title: "2026 年最佳 AI 翻译工具",
    titleEn: "Best AI Translation Tools in 2026",
    description:
      "对比 2026 年最佳 AI 翻译工具：DeepL、Google 翻译、沉浸式翻译、彩云小译等，含免费额度、价格与适用场景。",
    descriptionEn:
      "The best AI translation tools of 2026 compared — DeepL, Google Translate, Immersive Translate, Caiyun Xiaoyi and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 翻译已经不止「词对词」，而是能结合上下文，把整段话翻得自然流畅。从网页、文档到实时对话，翻译工具覆盖了你几乎所有的跨语言场景。",
      "通用多语言选 Google 翻译，覆盖面最广；欧洲语种与文学性文本 DeepL 更自然；需要浏览外文网页的选沉浸式翻译、彩云小译的浏览器插件，双语对照即点即译。",
      "下面按热度对比 8 款主流 AI 翻译工具的免费额度、付费起点、平台与评分，并给出选购建议。",
    ],
    introEn: [
      "AI translation has moved past word-for-word to context-aware, natural-sounding output. From web pages and documents to real-time conversation, translation tools now cover almost every cross-language scenario.",
      "For general multilingual use, Google Translate has the widest coverage; DeepL reads more naturally for European languages and literary text; Immersive Translate and Caiyun Xiaoyi offer browser extensions for bilingual, click-to-translate web reading.",
      "Below we rank eight leading AI translation tools by popularity and compare their free tier, starting price, platforms and rating, then explain how to choose.",
    ],
    sections: [
      {
        heading: "如何挑选翻译工具",
        headingEn: "How to choose a translation tool",
        body: "按语种与场景选：多语种通用选 Google 翻译；欧洲语种与正式文本选 DeepL；浏览网页选沉浸式翻译/彩云小译；文档翻译看是否支持格式保留。",
        bodyEn:
          "Choose by language and scenario: Google Translate for broad multilingual use, DeepL for European languages and formal text, Immersive Translate and Caiyun Xiaoyi for web reading, and check format retention for documents.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "Google 翻译免费；DeepL 有免费额度与 Pro 订阅；沉浸式翻译、彩云小译有免费版，高级功能需订阅。",
        bodyEn:
          "Google Translate is free; DeepL has a free tier plus Pro; Immersive Translate and Caiyun Xiaoyi have free plans with premium features on subscription.",
      },
      {
        heading: "翻译质量与隐私",
        headingEn: "Quality and privacy",
        body: "免费版可能把内容用于训练，敏感或保密内容建议使用付费/企业版，或选择可本地部署的翻译模型。",
        bodyEn:
          "Free tiers may use your content for training — for sensitive or confidential material, choose paid or enterprise plans, or a self-hostable translation model.",
      },
    ],
  },
  {
    slug: "ai-search-engines",
    scenarioId: "search",
    title: "2026 年最佳 AI 搜索工具",
    titleEn: "Best AI Search Engines in 2026",
    description:
      "对比 2026 年最佳 AI 搜索工具：Perplexity、秘塔、Devv、夸克 AI 等，含免费额度、价格与适用场景。",
    descriptionEn:
      "The best AI search engines of 2026 compared — Perplexity, Metaso, Devv, Quark AI and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 搜索用自然语言提问，直接给你带来源引用的答案，省去逐个点开网页的麻烦。它对复杂问题、对比调研和资料整理尤其高效。",
      "海外综合能力最强的是 Perplexity；国内可直连且体验好的是秘塔、夸克 AI；面向开发者的 Devv 擅长技术问答。",
      "下面按热度对比 8 款主流 AI 搜索工具的免费额度、付费起点、平台与评分，并给出选择建议。",
    ],
    introEn: [
      "AI search answers questions in natural language with cited sources, saving you from opening links one by one. It's especially efficient for complex questions, comparison research and gathering material.",
      "Perplexity is the strongest all-rounder overseas; Metaso and Quark AI offer a great China-accessible experience; Devv is tuned for developer-focused technical Q&A.",
      "Below we rank eight leading AI search engines by popularity and compare their free tier, starting price, platforms and rating, then explain how to pick.",
    ],
    sections: [
      {
        heading: "AI 搜索和普通搜索区别",
        headingEn: "How AI search differs from regular search",
        body: "普通搜索返回链接列表，AI 搜索直接汇总答案并标注来源，适合复杂问题、对比与资料整理；但需留意引用是否准确。",
        bodyEn:
          "Regular search returns a list of links; AI search synthesizes an answer with citations — great for complex questions, comparisons and research — but verify the citations yourself.",
      },
      {
        heading: "如何挑选 AI 搜索",
        headingEn: "How to choose an AI search engine",
        body: "看重答案深度与来源可信选 Perplexity；国内直连选秘塔、夸克 AI；开发者技术问答选 Devv；学术研究可关注能否检索论文。",
        bodyEn:
          "Pick Perplexity for depth and source credibility, Metaso or Quark AI for China access, Devv for technical and developer queries, and check whether it can search papers for academic work.",
      },
      {
        heading: "答案可靠吗",
        headingEn: "Are the answers reliable?",
        body: "多数工具会标注来源可核验，但 AI 仍可能出错或引用过期信息，重要结论建议点开原文二次确认。",
        bodyEn:
          "Most tools cite verifiable sources, but AI can still err or cite outdated info — confirm important conclusions against the original source.",
      },
    ],
  },
  {
    slug: "ai-voice-generators",
    scenarioId: "voice",
    title: "2026 年最佳 AI 配音工具",
    titleEn: "Best AI Voice Generators in 2026",
    description:
      "对比 2026 年最佳 AI 配音工具：ElevenLabs、魔音工坊、Fish Audio、讯飞听见等，含免费额度、价格与适用场景。",
    descriptionEn:
      "The best AI voice generators of 2026 compared — ElevenLabs, Moyin, Fish Audio, iFlytek Rec and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 配音已经能生成几乎以假乱真的声音，甚至用几十秒样本克隆你自己的声线。从短视频旁白、有声书到企业宣传片，文字变声音只需一键。",
      "英文配音 ElevenLabs 最自然；中文配音魔音工坊、讯飞听见更贴近语境、情感表现好；Fish Audio 的音色克隆社区活跃，开源可玩性强。",
      "下面按热度对比 8 款主流 AI 配音工具的免费额度、付费起点、平台与评分，并给出选购建议。",
    ],
    introEn: [
      "AI voice generation now produces near-indistinguishable speech and can even clone your own voice from seconds of audio. From short-video narration and audiobooks to corporate promos, text-to-speech is one click away.",
      "ElevenLabs is the most natural for English; Moyin and iFlytek Rec suit Chinese with better emotion; Fish Audio has an active voice-cloning community and is open and hackable.",
      "Below we rank eight leading AI voice generators by popularity and compare their free tier, starting price, platforms and rating, then explain how to choose.",
    ],
    sections: [
      {
        heading: "如何挑选配音工具",
        headingEn: "How to choose a voice generator",
        body: "按语言与用途选：英文旁白选 ElevenLabs；中文短视频选魔音工坊、讯飞听见；需要克隆声线确认是否支持、以及商用授权范围。",
        bodyEn:
          "Choose by language and use case: ElevenLabs for English narration, Moyin or iFlytek Rec for Chinese short-video, and confirm voice-cloning support and commercial licensing if you need it.",
      },
      {
        heading: "可以克隆声音吗",
        headingEn: "Can I clone my own voice?",
        body: "可以，ElevenLabs、魔音工坊、Fish Audio 都支持上传样本克隆，通常需付费版。请确保拥有声音的授权再克隆他人声线。",
        bodyEn:
          "Yes — ElevenLabs, Moyin and Fish Audio support cloning from samples, usually on paid plans. Make sure you have permission before cloning someone else's voice.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "多数免费增值：有免费字符额度，商用或高级音色需订阅；按用量计费的工具需留意时长消耗。",
        bodyEn:
          "Mostly freemium: free character quotas, with subscriptions for commercial use or premium voices; watch usage on metered plans.",
      },
    ],
  },
  {
    slug: "ai-design-tools",
    scenarioId: "design",
    title: "2026 年最佳 AI 设计工具",
    titleEn: "Best AI Design Tools in 2026",
    description:
      "对比 2026 年最佳 AI 设计工具：Canva、Framer、Figma、Spline 等，含免费额度、价格与适用场景。",
    descriptionEn:
      "The best AI design tools of 2026 compared — Canva, Framer, Figma, Spline and more — with free tiers, pricing and use cases.",
    intro: [
      "AI 设计让「不会用 Photoshop 的人」也能做出像样的海报、UI 与 3D 视觉。模板拖拽、文字生成页面、一句话出 3D 模型，门槛被降到极低。",
      "做海报与社交媒体素材选 Canva，模板海量；做网站落地页选 Framer，AI 直接生成可上线页面；专业 UI 协作选 Figma；3D 视觉选 Spline。",
      "下面按热度对比 8 款主流 AI 设计工具的免费额度、付费起点、平台与评分，并给出选购建议。",
    ],
    introEn: [
      "AI design lets people with no Photoshop skills produce decent posters, UI and 3D visuals. Drag-and-drop templates, text-to-page generation and one-line 3D models have lowered the barrier dramatically.",
      "Choose Canva for posters and social assets with a huge template library; Framer for landing pages that ship directly; Figma for professional UI collaboration; Spline for 3D visuals.",
      "Below we rank eight leading AI design tools by popularity and compare their free tier, starting price, platforms and rating, then explain how to choose.",
    ],
    sections: [
      {
        heading: "不会设计能用吗",
        headingEn: "Can I use these without design skills?",
        body: "能。Canva 提供海量模板拖拽即用，Framer 用 AI 生成页面，Spline 用文字生成 3D，都无需专业基础。",
        bodyEn:
          "Yes — Canva offers drag-and-drop templates, Framer generates pages with AI, and Spline builds 3D from text, none requiring a design background.",
      },
      {
        heading: "如何挑选设计工具",
        headingEn: "How to choose a design tool",
        body: "按产出类型选：海报/社媒素材选 Canva；落地页选 Framer；专业 UI 协作选 Figma；3D 选 Spline。再看团队协作与导出格式。",
        bodyEn:
          "Choose by output type: Canva for posters and social, Framer for landing pages, Figma for professional UI collaboration, Spline for 3D. Then check team collaboration and export formats.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "Canva、Figma 有免费版（含大量模板），Framer、Spline 有免费额度；付费解锁高级 AI、品牌工具与团队协作。",
        bodyEn:
          "Canva and Figma have free plans with many templates, and Framer and Spline offer free quotas; paid tiers unlock advanced AI, brand tools and team collaboration.",
      },
    ],
  },
  {
    slug: "ai-website-builders",
    scenarioId: "code",
    toolIds: ["framer", "lovable", "v0", "bolt", "replit"],
    title: "2026 年最佳 AI 网站建设工具",
    titleEn: "Best AI Website Builders in 2026",
    description: "对比 Framer、Lovable、v0、Bolt.new 和 Replit，按新手建站、产品原型、代码控制和发布方式选择。",
    descriptionEn: "Compare Framer, Lovable, v0, Bolt.new and Replit for beginner websites, product prototypes, code control and publishing workflows.",
    intro: [
      "AI 建站工具大致分为两类：直接生成并托管网页的可视化平台，以及生成真实代码、适合继续开发的产品构建工具。",
      "选择时不要只看第一次生成效果，还要检查域名、导出、代码所有权、数据库、团队协作和长期维护成本。",
      "下面的工具集合聚焦海外用户能够实际用于发布网站或产品原型的平台。",
    ],
    introEn: [
      "AI website builders fall into two broad groups: visual platforms that generate and host pages, and product builders that create real code for continued development.",
      "Do not judge only the first generated screen. Check domains, exports, code ownership, databases, collaboration, and long-term maintenance cost.",
      "This shortlist focuses on tools international users can actually use to publish websites or working product prototypes.",
    ],
    sections: [
      {
        heading: "新手应该选哪一种",
        headingEn: "Which type is best for beginners?",
        body: "只需要营销网站或作品集，优先选择 Framer。需要生成可继续开发的应用原型，可以考虑 Lovable、Bolt.new 或 Replit。",
        bodyEn: "For a marketing site or portfolio, start with Framer. For a working app prototype you can continue developing, consider Lovable, Bolt.new, or Replit.",
      },
      {
        heading: "代码所有权与导出",
        headingEn: "Code ownership and export",
        body: "购买前确认是否可以导出代码、连接自己的 Git 仓库、迁移数据库，以及停止订阅后网站是否继续运行。",
        bodyEn: "Before paying, verify code export, Git integration, database portability, and whether the site continues running after a subscription ends.",
      },
      {
        heading: "发布成本",
        headingEn: "Publishing cost",
        body: "除了订阅价格，还要计算自定义域名、托管、数据库、团队席位和 AI 生成额度。",
        bodyEn: "Beyond the subscription, account for custom domains, hosting, databases, team seats, and AI generation credits.",
      },
    ],
  },
];

export const bestPageMap: Record<string, BestPage> = Object.fromEntries(
  bestPages.map((p) => [p.slug, p]),
);

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
    title: "选择 AI 视频生成器：控制、速度与访问",
    titleEn: "Choosing an AI Video Generator: Control, Speed, and Access",
    description:
      "对比 2026 年最佳 AI 视频生成工具：Sora、Runway、可灵、海螺、Veo 等，含免费额度、价格与适用场景。",
    descriptionEn:
      "Compare Sora, Runway, Kling, and Hailuo by creation workflow, plan access, regional availability, and the official product evidence behind each pick.",
    toolIds: ["sora", "runway", "kling", "hailuo"],
    comparisonRows: [
      { toolId: "sora", toolName: "Sora", bestFor: "OpenAI 工作流中的视频生成", bestForEn: "Video generation in an OpenAI workflow", planAccess: "访问权限与生成限制按 ChatGPT 方案变化", planAccessEn: "Access and generation limits vary by ChatGPT plan", evidence: "OpenAI 官方产品资料", evidenceEn: "OpenAI official product sources" },
      { toolId: "runway", toolName: "Runway", bestFor: "生成与编辑结合的制作流程", bestForEn: "Combined generation and editing workflows", planAccess: "提供试用入口；额度和导出按方案变化", planAccessEn: "Trial access with credits and exports varying by plan", evidence: "Runway 官方产品资料", evidenceEn: "Runway official product sources" },
      { toolId: "kling", toolName: "Kling", bestFor: "中文提示与图生视频", bestForEn: "Chinese prompts and image-to-video", planAccess: "提供账户访问；生成额度按当前方案变化", planAccessEn: "Account access with generation allowances varying by plan", evidence: "Kling 官方产品资料", evidenceEn: "Kling official product sources" },
      { toolId: "hailuo", toolName: "Hailuo", bestFor: "快速尝试短视频镜头", bestForEn: "Rapid short-clip exploration", planAccess: "提供网页生成入口；队列和额度可能变化", planAccessEn: "Web generation with queues and allowances subject to change", evidence: "Hailuo 官方产品资料", evidenceEn: "Hailuo official product sources" },
    ],
    sources: [
      { toolId: "sora", label: "OpenAI Sora", url: "https://openai.com/sora/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "runway", label: "Runway product", url: "https://runwayml.com/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "runway", label: "Runway pricing", url: "https://runwayml.com/pricing", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "kling", label: "Kling AI", url: "https://klingai.com/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "hailuo", label: "Hailuo AI Video", url: "https://hailuoai.video/", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "选择视频生成工具时，先看你需要在生成前后保留多少控制。这个区别比单一的效果排名更适合用来筛选产品。",
      "Sora 适合已经使用 OpenAI 产品的工作流。Runway 把生成放进更完整的制作环境。Kling 和 Hailuo 提供直接的网页工作流，可用于比较中文提示和短片段的生成方式。",
      "本页依据官方产品和方案页面整理。片段长度、队列、额度、水印和地区访问可能变化，开始付费或正式制作前请核对链接中的当前信息。",
    ],
    introEn: [
      "AI video products now cover text-to-video, image animation, shot extension, and editing. The useful distinction is not a single quality score. It is how much control the product gives you before and after generation.",
      "Sora fits people already using OpenAI products. Runway combines generation with a broader production workspace. Kling and Hailuo provide direct web workflows that are easier to evaluate with Chinese prompts and short clips.",
      "This shortlist uses official product and plan pages. Clip length, queues, credits, watermarks, and regional access can change, so check the linked source before starting a paid production workflow.",
    ],
    sections: [
      {
        heading: "如何挑选 AI 视频生成工具",
        headingEn: "How to choose an AI video generator",
        body: "先确定工作流程需要的控制范围。若已使用 OpenAI 产品，可从 Sora 开始。若希望在生成之外继续处理项目，可看 Runway。若主要比较网页创作流程中的中文提示和短片段，可查看 Kling 与 Hailuo 的官方信息。",
        bodyEn:
          "Start with the amount of workflow control you need. Consider Sora if the work already uses OpenAI products. Look at Runway when the project needs work beyond generation. Compare Kling and Hailuo through their official information when Chinese prompts and short clips are central to the workflow.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "方案、生成额度和输出限制会变化。将当前官方方案与项目的生成频率、所需访问方式和发布要求逐项对照，再决定是否付费。",
        bodyEn:
          "Plans, generation allowances, and output limits can change. Compare the current official offering with the project's generation frequency, required access, and publishing needs before paying.",
      },
      {
        heading: "文生视频 vs 图生视频",
        headingEn: "Text-to-video vs image-to-video",
        body: "用已有素材和目标发布渠道准备一份小型制作说明，再用它核对各产品的当前输入方式、编辑步骤和导出限制。这样能直接看出哪一种流程适合团队。",
        bodyEn:
          "Prepare a short production brief using the available assets and target publishing channel, then use it to check each product's current input methods, editing steps, and export limits. That shows which workflow fits the team.",
      },
    ],
  },
  {
    slug: "ai-chat-assistants",
    scenarioId: "chat",
    title: "哪款 AI 助手适合你的工作？",
    titleEn: "Which AI Assistant Fits Your Work?",
    description:
      "按文件处理、生态连接、访问限制和地区可用性比较 ChatGPT、Claude、Gemini 与 DeepSeek。",
    descriptionEn:
      "Choose between ChatGPT, Claude, Gemini, and DeepSeek by workflow, access, product limits, and the official evidence available for each service.",
    toolIds: ["chatgpt", "claude", "gemini", "deepseek"],
    comparisonRows: [
      { toolId: "chatgpt", toolName: "ChatGPT", bestFor: "通用文件与多步骤工作", bestForEn: "General file and multi-step work", planAccess: "提供免费层；高级工具限额更严格", planAccessEn: "Free tier with tighter limits on advanced tools", evidence: "OpenAI 官方产品资料", evidenceEn: "OpenAI official product sources" },
      { toolId: "claude", toolName: "Claude", bestFor: "长文阅读与写作", bestForEn: "Long documents and writing", planAccess: "提供免费访问；使用限额会随负载变化", planAccessEn: "Free access with usage limits that can vary", evidence: "Anthropic 官方产品资料", evidenceEn: "Anthropic official product sources" },
      { toolId: "gemini", toolName: "Gemini", bestFor: "Google 应用工作流", bestForEn: "Google app workflows", planAccess: "提供免费访问；高级模型与功能按方案开放", planAccessEn: "Free access with advanced models and features by plan", evidence: "Google 官方产品资料", evidenceEn: "Google official product sources" },
      { toolId: "deepseek", toolName: "DeepSeek", bestFor: "中文问答与推理", bestForEn: "Chinese Q&A and reasoning", planAccess: "网页与应用可免费使用；服务限制可能变化", planAccessEn: "Free web and app access with variable service limits", evidence: "DeepSeek 官方产品资料", evidenceEn: "DeepSeek official product sources" },
    ],
    sources: [
      { toolId: "chatgpt", label: "ChatGPT overview", url: "https://openai.com/chatgpt/overview/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "chatgpt", label: "ChatGPT plans", url: "https://openai.com/chatgpt/pricing/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "claude", label: "Claude product overview", url: "https://www.anthropic.com/claude", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "claude", label: "Claude plans", url: "https://www.anthropic.com/pricing", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "gemini", label: "Gemini overview", url: "https://gemini.google.com/overview", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "deepseek", label: "DeepSeek product", url: "https://www.deepseek.com/", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "AI 聊天助手如今是进入一切任务的前门：写作、编程、研究、头脑风暴与日常杂事。选哪个，取决于你主要让它做什么。",
      "Claude 在长文写作与编程上领先；ChatGPT 是最全面的全能选手；Gemini 与 Google 生态深度绑定；DeepSeek、Kimi 则为中文用户提供了充足的免费额度与国内直连体验。",
      "下面按热度排名了 8 款主流聊天助手，并对比免费额度、付费起点、支持平台与评分，再给出选择建议。",
    ],
    introEn: [
      "Chat assistants now overlap on basic writing, analysis, and coding. The meaningful differences appear in the surrounding product: file handling, connected apps, usage limits, data controls, and regional access.",
      "ChatGPT covers a broad set of tools in one workspace. Claude is oriented toward sustained work with documents and prose. Gemini fits people already working in Google's products. DeepSeek offers a direct Chinese-language option with web and app access.",
      "This guide uses product documentation for capabilities and plan access. It does not turn popularity scores into a quality ranking, and it does not describe web research as first-hand testing.",
    ],
    sections: [
      {
        heading: "如何挑选聊天助手",
        headingEn: "How to choose a chat assistant",
        body: "先看任务发生在哪里。需要上传文件和组合多种工具，可比较 ChatGPT；长时间处理文档与文字，可关注 Claude；工作依赖 Google 应用，Gemini 的连接方式更自然；中文访问与问答可考虑 DeepSeek。然后再核对当前方案的数据政策与限额。",
        bodyEn:
          "Start with where the task happens. Compare ChatGPT when files and several tools need to share one workspace. Look at Claude for sustained work with documents and prose. Gemini is the natural comparison when the work already lives in Google products, while DeepSeek offers a direct Chinese-language route. Then check the current plan limits and data policy.",
      },
      {
        heading: "免费版够用吗？",
        headingEn: "Is the free plan enough?",
        body: "免费访问通常足以判断产品是否适合日常问答和轻量写作，但文件、研究、上下文和高频使用更容易触及限制。先记录哪一种限制真正中断工作，再决定是否升级。",
        bodyEn:
          "Free access is usually enough to judge fit for routine questions and light writing. Files, research, long context, and frequent use tend to hit limits sooner. Note which restriction actually interrupts the work before deciding whether to upgrade.",
      },
      {
        heading: "写作与编程分别选哪个",
        headingEn: "Which one for writing vs coding",
        body: "不要只按“写作”或“编程”选择。先用自己的文档长度、文件格式、连接需求和审阅流程筛选产品。任何助手生成的代码都应运行测试，长文中的数字、名称和引用也应回到原始来源核对。",
        bodyEn:
          "Do not choose on a broad label such as writing or coding alone. Filter by document length, file formats, connected services, and the review process you already use. Run tests on generated code, and check names, numbers, and citations in long-form drafts against original sources.",
      },
    ],
  },
  {
    slug: "ai-image-generators",
    scenarioId: "image",
    title: "选择 AI 图像生成器：风格、集成与控制",
    titleEn: "Choosing an AI Image Generator: Style, Integration, and Control",
    description:
      "按创作方式、Adobe 工作流与本地控制比较 Midjourney、Adobe Firefly 和 Stable Diffusion。",
    descriptionEn:
      "Compare Midjourney, Adobe Firefly, and Stable Diffusion by creative workflow, Adobe integration, and the degree of local control each option supports.",
    toolIds: ["midjourney", "firefly", "stable-diffusion"],
    comparisonRows: [
      { toolId: "midjourney", toolName: "Midjourney", bestFor: "在 Midjourney 工作区探索图像风格", bestForEn: "Exploring image styles in the Midjourney workspace", planAccess: "通过 Midjourney 账户和当前方案访问", planAccessEn: "Access through a Midjourney account and the current plan", evidence: "Midjourney 官方产品资料", evidenceEn: "Midjourney official product sources" },
      { toolId: "firefly", toolName: "Adobe Firefly", bestFor: "使用 Adobe 创意应用的图像生成", bestForEn: "Image generation in Adobe creative applications", planAccess: "功能与生成额度按 Adobe 账户和方案变化", planAccessEn: "Features and generation allowances vary by Adobe account and plan", evidence: "Adobe 官方 Firefly 产品资料", evidenceEn: "Adobe official Firefly product sources" },
      { toolId: "stable-diffusion", toolName: "Stable Diffusion", bestFor: "需要模型和部署选择的团队", bestForEn: "Teams that need model and deployment options", planAccess: "模型和服务访问按所选提供方式变化", planAccessEn: "Model and service access vary by the chosen delivery option", evidence: "Stability AI 官方产品资料", evidenceEn: "Stability AI official product sources" },
    ],
    sources: [
      { toolId: "midjourney", label: "Midjourney", url: "https://www.midjourney.com/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "firefly", label: "Adobe Firefly", url: "https://www.adobe.com/products/firefly.html", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "stable-diffusion", label: "Stable Diffusion", url: "https://stability.ai/stable-diffusion", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "先决定你是要在专用创作工作区中探索风格、留在 Adobe 工作流中，还是需要更大的模型和部署选择空间。这个差别比单一的图像质量排名更适合用来筛选工具。",
      "Midjourney 面向其网页创作工作区。Adobe Firefly 适合已经使用 Adobe 创意应用的流程。Stable Diffusion 则适合需要研究模型或部署方案的人。",
      "本页依据各产品的官方页面整理。功能、生成额度和可用方式会变化，开始正式项目或付费前请核对链接中的当前信息。",
    ],
    introEn: [
      "Choose first between a dedicated creative workspace, an Adobe-centered workflow, and a route with broader model and deployment options. That distinction is more useful than a single image-quality ranking.",
      "Midjourney centers its image creation in its own web workspace. Adobe Firefly suits work that already uses Adobe creative applications. Stable Diffusion is the option to investigate when model and deployment choices matter.",
      "This guide draws on official product pages. Features, generation allowances, and ways to access a product can change, so check the linked source before committing a paid or production workflow.",
    ],
    sections: [
      {
        heading: "如何挑选 AI 绘图工具",
        headingEn: "How to choose an AI image generator",
        body: "先从现有工作流开始筛选。若希望在单独的创作空间里试验图像方向，可看 Midjourney。若团队已使用 Adobe 创意应用，可看 Firefly。若需要评估模型或部署路线，可研究 Stable Diffusion。",
        bodyEn:
          "Start with the workflow you already have. Consider Midjourney for a separate creative workspace, Firefly for Adobe creative applications, and Stable Diffusion when you need to evaluate models or deployment routes.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "各产品的计划和生成额度会调整。将当前方案与项目的生成频率、协作方式和所需应用集成逐项对照，再决定是否付费。",
        bodyEn:
          "Plans and generation allowances can change. Compare the current offering with the project's generation frequency, collaboration needs, and required application integrations before paying.",
      },
      {
        heading: "商用与版权",
        headingEn: "Commercial use and copyright",
        body: "发布前请阅读所选产品的当前条款，并为素材中的人物、商标和其他受保护内容取得必要许可。",
        bodyEn:
          "Read the current terms for the selected product before publishing, and obtain any needed permissions for people, trademarks, and other protected material in the output.",
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
    title: "按任务选择 AI 办公工具",
    titleEn: "AI Office Tools by Task: Documents, Knowledge, and Slides",
    description:
      "按传统办公文档、团队知识库和演示文稿三类任务比较 WPS AI、Notion AI 与 Gamma。",
    descriptionEn:
      "Choose between WPS AI, Notion AI, and Gamma based on whether the work starts in office documents, a shared knowledge base, or a presentation.",
    toolIds: ["notion-ai", "wps-ai", "gamma"],
    comparisonRows: [
      { toolId: "notion-ai", toolName: "Notion AI", bestFor: "团队知识库与项目文档", bestForEn: "Team knowledge and project docs", planAccess: "工作区内提供 AI 功能；具体访问按方案变化", planAccessEn: "AI inside the workspace with access varying by plan", evidence: "Notion 官方产品资料", evidenceEn: "Notion official product sources" },
      { toolId: "wps-ai", toolName: "WPS AI", bestFor: "中文文档与办公套件", bestForEn: "Chinese documents and office files", planAccess: "产品内提供 AI 服务；权益以当前账户为准", planAccessEn: "AI services in the suite with account-specific allowances", evidence: "WPS 官方产品资料", evidenceEn: "WPS official product sources" },
      { toolId: "gamma", toolName: "Gamma", bestFor: "快速生成演示与网页式文档", bestForEn: "Fast decks and web-style documents", planAccess: "提供免费层；生成与导出能力按方案变化", planAccessEn: "Free tier with generation and export features varying by plan", evidence: "Gamma 官方产品资料", evidenceEn: "Gamma official product sources" },
    ],
    sources: [
      { toolId: "notion-ai", label: "Notion AI", url: "https://www.notion.com/product/ai", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "notion-ai", label: "Notion pricing", url: "https://www.notion.com/pricing", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "wps-ai", label: "WPS AI", url: "https://ai.wps.cn/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "gamma", label: "Gamma product", url: "https://gamma.app/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "gamma", label: "Gamma pricing", url: "https://gamma.app/pricing", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "办公是 AI 落地最快的场景之一：写文档、做 PPT、整理会议纪要、生成周报，AI 都能代劳大半，把时间省出来做真正需要判断的事。",
      "国内用户首选 WPS AI、讯飞智文，中文支持好且直接可用；跨团队协作与知识库选 Notion AI；想要一键生成精美幻灯片选 Gamma 或 AiPPT。",
      "下面按热度对比 8 款主流 AI 办公工具的免费额度、付费起点、平台与评分，并给出选购建议。",
    ],
    introEn: [
      "The phrase AI office tool hides three different jobs: editing conventional office files, maintaining shared knowledge, and turning an outline into a presentation. One product rarely handles all three equally well.",
      "WPS AI stays close to documents and the Chinese office workflow. Notion AI works inside a collaborative knowledge base. Gamma is narrower, but its presentation and web-document workflow is faster when the output must be visual.",
      "The shortlist is organized by task and official product information. Plan access and allowances can change, so purchasing decisions should be checked against the linked product pages.",
    ],
    sections: [
      {
        heading: "如何挑选办公工具",
        headingEn: "How to choose an office tool",
        body: "先确定最终产物。需要继续交付传统办公文件，优先检查 WPS AI；团队资料本来就在共享知识库中，可比较 Notion AI；需要快速把提纲变成演示或网页式文档，则看 Gamma。",
        bodyEn:
          "Start with the final deliverable. Check WPS AI when the work must remain in conventional office files. Compare Notion AI when team material already lives in a shared knowledge base. Look at Gamma when an outline needs to become a presentation or web-style document quickly.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "免费入口适合确认编辑方式和输出格式，但生成额度、导出、品牌控制和团队权限通常按方案变化。购买前应在官方页面核对当前账户所在地区和所需功能。",
        bodyEn:
          "Free access is useful for checking the editing model and output format. Generation allowances, exports, brand controls, and team permissions vary by plan. Before paying, verify the required feature and regional availability on the official page.",
      },
      {
        heading: "数据安全",
        headingEn: "Data privacy",
        body: "办公文档可能包含客户资料、合同和内部决策。上传前应确认对应方案的数据使用、保留、训练政策和管理员控制，不要把消费者账户的规则等同于企业方案。",
        bodyEn:
          "Office documents can contain client records, contracts, and internal decisions. Before uploading them, check data use, retention, training terms, and admin controls for the exact plan. Do not assume a consumer account follows the same rules as an enterprise plan.",
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
    slug: "best-free-ai-writing-tools",
    scenarioId: "writing",
    title: "免费 AI 写作工具：付费前能完成什么",
    titleEn: "Free AI Writing Tools: What You Can Do Before Paying",
    description: "比较 Grammarly、Wordtune、QuillBot 与 ChatGPT 的免费写作功能、额度限制和升级时机。",
    descriptionEn: "Compare the free writing features, usage limits, and upgrade triggers in Grammarly, Wordtune, QuillBot, and ChatGPT.",
    toolIds: ["grammarly", "wordtune", "quillbot", "chatgpt"],
    comparisonRows: [
      { toolId: "grammarly", toolName: "Grammarly", bestFor: "跨应用英文纠错", bestForEn: "English correction across apps", planAccess: "免费基础纠错；每月有限 AI 提示", planAccessEn: "Free core correction with a monthly AI prompt allowance", evidence: "Grammarly 官方方案", evidenceEn: "Grammarly official plans" },
      { toolId: "wordtune", toolName: "Wordtune", bestFor: "少量句子改写", bestForEn: "Occasional sentence rewriting", planAccess: "Basic 免费方案；功能为有限使用", planAccessEn: "Free Basic plan with limited use", evidence: "Wordtune 官方方案", evidenceEn: "Wordtune official plans" },
      { toolId: "quillbot", toolName: "QuillBot", bestFor: "短段落释义改写", bestForEn: "Short passage paraphrasing", planAccess: "每次最多 125 词；两种免费模式", planAccessEn: "Up to 125 words per input with two free modes", evidence: "QuillBot 官方产品与帮助页", evidenceEn: "QuillBot official product and help pages" },
      { toolId: "chatgpt", toolName: "ChatGPT", bestFor: "从提纲到完整初稿", bestForEn: "Outlines and full first drafts", planAccess: "文本聊天额度宽松；工具与上下文有限", planAccessEn: "Broad text chat access with limited tools and context", evidence: "OpenAI 官方方案", evidenceEn: "OpenAI official plans" },
    ],
    sources: [
      { toolId: "grammarly", label: "Grammarly plans", url: "https://www.grammarly.com/plans", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "wordtune", label: "Wordtune plans", url: "https://www.wordtune.com/plans", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "quillbot", label: "QuillBot plans", url: "https://quillbot.com/upgrade", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "quillbot", label: "QuillBot free and Premium account differences", url: "https://help.quillbot.com/hc/en-us/articles/360058341753-What-s-the-difference-between-a-free-and-a-Premium-account", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "quillbot", label: "QuillBot Paraphraser", url: "https://quillbot.com/paraphrasing-tool", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "chatgpt", label: "ChatGPT plans", url: "https://openai.com/chatgpt/pricing/", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "免费 AI 写作工具并不只是付费产品的试用版。它们适合不同的任务：Grammarly 负责持续纠错，Wordtune 和 QuillBot 修改已有句子，ChatGPT 则能从提纲开始生成较长的草稿。",
      "真正需要比较的是限制如何计算。限制可能按月、按每天、按单次输入或按工具功能计算。只看“免费”标签，往往会在工作进行到一半时才发现额度不够。",
      "本指南只采用产品方公开页面描述免费方案。没有把网络资料包装成亲自实测，具体额度仍应在使用前重新查看官方方案页。",
    ],
    introEn: [
      "Free AI writing tools are not interchangeable samples of paid products. Grammarly handles ongoing correction, Wordtune and QuillBot revise text you already have, and ChatGPT can take a task from outline to a longer first draft.",
      "The useful comparison is how each limit works. A restriction may reset monthly or daily, apply to each input, or affect only certain tools. A product can look generous until the limit interrupts the middle of an assignment.",
      "This guide uses the free-plan descriptions published by each product. It does not present web research as first-hand testing, and limits should be checked again before relying on them for ongoing work.",
    ],
    sections: [
      {
        heading: "快速选择",
        headingEn: "The short answer",
        body: "需要浏览器和文档中的持续英文纠错，先选 Grammarly。主要任务是修改少量句子，可比较 Wordtune 与 QuillBot。需要搭提纲、扩写段落和反复调整完整草稿，ChatGPT 的工作范围更广。",
        bodyEn: "Choose Grammarly for correction that follows you across browsers and documents. Compare Wordtune and QuillBot when the job is revising a small amount of existing text. ChatGPT covers more of the process when you need an outline, expanded sections, and several rounds of revision on a full draft.",
      },
      {
        heading: "Grammarly：适合持续英文纠错",
        headingEn: "Grammarly: best for ongoing English correction",
        body: "Grammarly 免费方案聚焦拼写、语法和基础语气反馈，并提供有限的 AI 提示额度。它的优势不是一次生成很长的文章，而是在邮件、浏览器文本框和文档中持续发现问题。需要大量整句改写、品牌语气或抄袭检测时，免费层会较快触及边界。",
        bodyEn: "Grammarly Free focuses on spelling, grammar, and basic tone feedback, with a limited allowance for AI prompts. Its value is not producing a long article in one pass. It catches problems while you work in email, browser text fields, and documents. Frequent full-sentence rewrites, brand controls, and plagiarism checks push the workflow beyond the free tier.",
      },
      {
        heading: "Wordtune：适合偶尔改写句子",
        headingEn: "Wordtune: best for occasional sentence rewrites",
        body: "Wordtune 将 Basic 定位为有限使用的免费方案，重点是基础拼写与语法修正。它适合偶尔需要更自然或更简洁表达的用户。若每天需要连续处理大量句子，有限使用会比功能本身更早成为瓶颈。",
        bodyEn: "Wordtune describes Basic as a free plan for limited use, centered on basic spelling and grammar correction. It fits someone who occasionally wants a cleaner or more natural sentence. For daily editing at volume, the usage ceiling is likely to matter before the feature set does.",
      },
      {
        heading: "QuillBot：适合短段落释义改写",
        headingEn: "QuillBot: best for short passage paraphrasing",
        body: "QuillBot 免费 Paraphraser 每次最多处理 125 词，并开放 Standard 与 Fluency 两种模式。官方产品页说明免费改写没有每日次数限制，因此它适合反复处理短段落。较长文档需要拆分输入，更多改写模式和更高容量则属于付费层。",
        bodyEn: "QuillBot's free Paraphraser accepts up to 125 words per input and includes Standard and Fluency modes. Its product page says free paraphrases do not have a daily count limit, which makes it useful for repeated short passages. Longer documents must be split into chunks, while additional modes and higher capacity sit behind Premium.",
      },
      {
        heading: "ChatGPT：适合完整初稿和多轮修改",
        headingEn: "ChatGPT: best for full drafts and iterative revision",
        body: "ChatGPT 免费方案适合从想法、提纲到完整初稿的连续对话。官方方案页将文本聊天与上传、图片、语音、深度研究、记忆和上下文区分开来，后几项在免费层都有更严格限制。它能覆盖更长的工作流程，但不会自动保证事实准确或文档结构稳定。",
        bodyEn: "ChatGPT Free can carry a task from an idea and outline into a full first draft through conversation. OpenAI separates text chat from uploads, images, voice, deep research, memory, and context, with tighter limits on those tools in the free tier. It covers a longer workflow than a paraphraser, but it does not guarantee factual accuracy or a stable document structure.",
      },
      {
        heading: "什么时候值得升级",
        headingEn: "When an upgrade makes sense",
        body: "先记录真正阻碍工作的限制。如果问题是单次输入太短，升级 QuillBot 可能比换成聊天工具更直接；如果需要跨应用持续改写，可考虑 Grammarly 付费层；如果瓶颈来自文件上传、研究或长上下文，则应比较 ChatGPT 的付费方案。不要只因为免费提示出现就订阅。",
        bodyEn: "Track the limit that actually stops the work. If the input cap is the problem, a QuillBot upgrade may be more direct than moving to a chat tool. If you need frequent rewriting across apps, Grammarly's paid tier is the relevant comparison. If uploads, research, or long context are the bottleneck, compare ChatGPT's paid options. An upgrade prompt by itself is not a reason to subscribe.",
      },
      {
        heading: "隐私与事实核对",
        headingEn: "Privacy and fact checking",
        body: "免费方案不适合默认接收客户合同、未发布文稿或内部资料。上传敏感内容前，应查看对应方案的数据使用、保留和训练政策。任何生成式工具写出的名称、数字、引用和链接都需要回到原始来源核对。",
        bodyEn: "Do not treat a free plan as the default place for client contracts, unpublished manuscripts, or internal material. Check the exact plan's data use, retention, and training policy before uploading sensitive content. Names, numbers, quotations, and links produced by a generative tool still need to be checked against the original source.",
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
    title: "适合可核验研究的 AI 搜索工具",
    titleEn: "AI Search Tools for Research You Can Verify",
    description:
      "按来源可见性、地区访问和问题类型比较 Perplexity、秘塔 AI 搜索与 Devv。",
    descriptionEn:
      "Compare Perplexity, Metaso, and Devv by source visibility, regional access, and the kind of research question each product is built to answer.",
    toolIds: ["perplexity", "metaso", "devv"],
    comparisonRows: [
      { toolId: "perplexity", toolName: "Perplexity", bestFor: "带来源的通用网络研究", bestForEn: "General web research with sources", planAccess: "提供免费搜索；高级模型与研究能力按方案开放", planAccessEn: "Free search with advanced models and research features by plan", evidence: "Perplexity 官方产品资料", evidenceEn: "Perplexity official product sources" },
      { toolId: "metaso", toolName: "秘塔 AI 搜索", bestFor: "中文网页与国内访问", bestForEn: "Chinese web research and mainland access", planAccess: "可直接使用；账户权益与功能可能变化", planAccessEn: "Direct access with account allowances and features subject to change", evidence: "秘塔官方产品资料", evidenceEn: "Metaso official product sources" },
      { toolId: "devv", toolName: "Devv", bestFor: "开发者技术资料检索", bestForEn: "Developer-focused technical research", planAccess: "提供网页搜索入口；功能按当前产品开放", planAccessEn: "Web search access with features based on the current product", evidence: "Devv 官方产品资料", evidenceEn: "Devv official product sources" },
    ],
    sources: [
      { toolId: "perplexity", label: "Perplexity product", url: "https://www.perplexity.ai/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "perplexity", label: "Perplexity Pro", url: "https://www.perplexity.ai/pro", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "metaso", label: "Metaso AI Search", url: "https://metaso.cn/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "devv", label: "Devv AI Search", url: "https://devv.ai/", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "AI 搜索用自然语言提问，直接给你带来源引用的答案，省去逐个点开网页的麻烦。它对复杂问题、对比调研和资料整理尤其高效。",
      "海外综合能力最强的是 Perplexity；国内可直连且体验好的是秘塔、夸克 AI；面向开发者的 Devv 擅长技术问答。",
      "下面按热度对比 8 款主流 AI 搜索工具的免费额度、付费起点、平台与评分，并给出选择建议。",
    ],
    introEn: [
      "AI search is useful when it shortens the path from a question to a set of sources. The answer itself is only a working summary. A research workflow still depends on opening citations and checking whether they support the claim.",
      "Perplexity is the general-purpose option in this shortlist. Metaso is designed around Chinese-language search and direct mainland access. Devv narrows the task to developer and technical questions.",
      "These products are compared by workflow and official product information, not by an unexplained popularity score. Important conclusions should always be verified against the original page.",
    ],
    sections: [
      {
        heading: "AI 搜索和普通搜索区别",
        headingEn: "How AI search differs from regular search",
        body: "普通搜索返回链接列表，AI 搜索直接汇总答案并标注来源，适合复杂问题、对比与资料整理；但需留意引用是否准确。",
        bodyEn:
          "Regular search returns links, while AI search assembles a working answer and attaches sources. That can speed up comparison and discovery, but the citations still need to be opened and checked against the claims they appear to support.",
      },
      {
        heading: "如何挑选 AI 搜索",
        headingEn: "How to choose an AI search engine",
        body: "一般网络调研可从 Perplexity 开始；中文网页和国内访问可看秘塔；开发文档与技术问题可看 Devv。学术或高风险问题还应确认产品能否定位到原始论文、法规或一手资料。",
        bodyEn:
          "Start with Perplexity for general web research, Metaso for Chinese web results and mainland access, and Devv for developer documentation and technical questions. Academic or high-stakes work also requires a path to original papers, regulations, or other primary material.",
      },
      {
        heading: "答案可靠吗",
        headingEn: "Are the answers reliable?",
        body: "多数工具会标注来源可核验，但 AI 仍可能出错或引用过期信息，重要结论建议点开原文二次确认。",
        bodyEn:
          "A citation is useful only when the linked page contains the claimed evidence. Open the source, check its date and author, and distinguish a primary source from a summary. Important conclusions should not rely on the generated answer alone.",
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
    title: "按交付物选择 AI 设计工具：画布、界面、网站或 3D",
    titleEn: "AI Design Tools by Deliverable: Canvas, Interface, Site, or 3D",
    description:
      "按海报与内容、界面协作、网站页面和交互式 3D 比较 Canva、Figma、Framer 与 Spline。",
    descriptionEn:
      "Compare Canva, Figma, Framer, and Spline for content design, interface collaboration, website pages, and interactive 3D work.",
    toolIds: ["canva", "figma", "framer", "spline"],
    comparisonRows: [
      { toolId: "canva", toolName: "Canva", bestFor: "制作内容和版式设计", bestForEn: "Content creation and layout design", planAccess: "功能按 Canva 账户和当前方案开放", planAccessEn: "Features are available through a Canva account and the current plan", evidence: "Canva 官方产品资料", evidenceEn: "Canva official product sources" },
      { toolId: "figma", toolName: "Figma", bestFor: "界面设计和团队协作", bestForEn: "Interface design and team collaboration", planAccess: "访问方式和功能按 Figma 账户及方案变化", planAccessEn: "Access and features vary by Figma account and plan", evidence: "Figma 官方产品资料", evidenceEn: "Figma official product sources" },
      { toolId: "framer", toolName: "Framer", bestFor: "设计与发布网站页面", bestForEn: "Designing and publishing website pages", planAccess: "发布和协作功能按当前方案变化", planAccessEn: "Publishing and collaboration features vary by current plan", evidence: "Framer 官方产品资料", evidenceEn: "Framer official product sources" },
      { toolId: "spline", toolName: "Spline", bestFor: "交互式 3D 场景", bestForEn: "Interactive 3D scenes", planAccess: "项目功能按 Spline 账户和方案变化", planAccessEn: "Project features vary by Spline account and plan", evidence: "Spline 官方产品资料", evidenceEn: "Spline official product sources" },
    ],
    sources: [
      { toolId: "canva", label: "Canva", url: "https://www.canva.com/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "figma", label: "Figma AI", url: "https://www.figma.com/ai/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "framer", label: "Framer AI", url: "https://www.framer.com/ai/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "spline", label: "Spline", url: "https://spline.design/", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "先明确交付物是内容版式、产品界面、网站页面还是交互式 3D 场景。不同的交付物会决定编辑方式、协作需求和发布路径。",
      "Canva 适合内容和版式设计，Figma 适合界面协作，Framer 将网站页面设计与发布放在同一流程，Spline 面向交互式 3D。",
      "本页依据各产品的官方页面整理。账户权限、协作功能和发布方式可能变化，开始团队项目前请核对链接中的当前信息。",
    ],
    introEn: [
      "Start with the deliverable: content layouts, product interfaces, website pages, or interactive 3D scenes. That choice determines the editing model, collaboration needs, and publishing route.",
      "Canva is for content and layout work. Figma is for interface collaboration. Framer puts website design and publishing in one workflow. Spline focuses on interactive 3D.",
      "This guide draws on official product pages. Account access, collaboration features, and publishing options can change, so check the linked source before starting a team project.",
    ],
    sections: [
      {
        heading: "不会设计能用吗",
        headingEn: "Can I use these without design skills?",
        body: "可以先从要交付的内容入手。内容版式可看 Canva，网站页面可看 Framer，交互式 3D 可看 Spline。需要共同维护产品界面时，可看 Figma 的协作方式。",
        bodyEn:
          "Start with the artifact you need to deliver. Consider Canva for content layouts, Framer for website pages, and Spline for interactive 3D. For a shared product interface, examine Figma's collaboration workflow.",
      },
      {
        heading: "如何挑选设计工具",
        headingEn: "How to choose a design tool",
        body: "比较时让团队使用同一份真实内容、界面或场景草稿。再核对评论、共享、发布和导出选项是否符合现有流程。",
        bodyEn:
          "Compare products using the same real content, interface, or scene draft. Then confirm that the available commenting, sharing, publishing, and export options fit the existing workflow.",
      },
      {
        heading: "免费 vs 付费",
        headingEn: "Free vs paid",
        body: "计划和功能会调整。先核对当前账户能否覆盖团队成员、项目数量、所需的发布方式和协作流程，再决定是否升级。",
        bodyEn:
          "Plans and features can change. Confirm that the current account supports the needed teammates, project count, publishing route, and collaboration workflow before upgrading.",
      },
    ],
  },
  {
    slug: "ai-website-builders",
    scenarioId: "code",
    toolIds: ["framer", "lovable", "v0", "bolt", "replit"],
    title: "选择 AI 建站工具：发布页面还是开发应用",
    titleEn: "Choosing an AI Website Builder: Publish a Page or Develop an App",
    description: "按页面发布、应用原型、代码工作区和部署流程比较 Framer、Lovable、v0、Bolt 和 Replit。",
    descriptionEn: "Compare Framer, Lovable, v0, Bolt, and Replit for page publishing, app prototyping, code workspaces, and deployment workflows.",
    comparisonRows: [
      { toolId: "framer", toolName: "Framer", bestFor: "发布设计驱动的网站页面", bestForEn: "Publishing design-led website pages", planAccess: "发布功能按 Framer 账户和当前方案变化", planAccessEn: "Publishing features vary by Framer account and current plan", evidence: "Framer 官方产品资料", evidenceEn: "Framer official product sources" },
      { toolId: "lovable", toolName: "Lovable", bestFor: "构建应用原型", bestForEn: "Building app prototypes", planAccess: "使用方式和额度按当前账户方案变化", planAccessEn: "Usage and allowances vary by the current account plan", evidence: "Lovable 官方产品资料", evidenceEn: "Lovable official product sources" },
      { toolId: "v0", toolName: "v0", bestFor: "从提示生成界面和应用起点", bestForEn: "Generating interface and app starting points from prompts", planAccess: "功能按 v0 账户和当前方案变化", planAccessEn: "Features vary by v0 account and current plan", evidence: "v0 官方产品资料", evidenceEn: "v0 official product sources" },
      { toolId: "bolt", toolName: "Bolt", bestFor: "在浏览器中构建和迭代项目", bestForEn: "Building and iterating on projects in the browser", planAccess: "可用功能按 Bolt 账户和当前方案变化", planAccessEn: "Available features vary by Bolt account and current plan", evidence: "Bolt 官方产品资料", evidenceEn: "Bolt official product sources" },
      { toolId: "replit", toolName: "Replit", bestFor: "编码、运行和部署项目", bestForEn: "Coding, running, and deploying projects", planAccess: "工作区和部署功能按 Replit 账户及方案变化", planAccessEn: "Workspace and deployment features vary by Replit account and plan", evidence: "Replit 官方产品资料", evidenceEn: "Replit official product sources" },
    ],
    sources: [
      { toolId: "framer", label: "Framer AI", url: "https://www.framer.com/ai/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "lovable", label: "Lovable", url: "https://lovable.dev/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "v0", label: "v0", url: "https://v0.dev/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "bolt", label: "Bolt", url: "https://bolt.new/", checkedAt: "2026-08-18", kind: "official" },
      { toolId: "replit", label: "Replit", url: "https://replit.com/", checkedAt: "2026-08-18", kind: "official" },
    ],
    intro: [
      "先判断目标是尽快发布网站页面，还是继续开发需要代码、数据和部署的应用。这个选择会影响生成后的编辑方式和团队的维护责任。",
      "Framer 适合设计驱动的网站页面。Lovable、v0 和 Bolt 面向应用起点与浏览器中的构建流程。Replit 把编码、运行和部署放在同一工作区。",
      "本页依据各产品的官方页面整理。域名、导出、集成、额度和部署方式会变化，开始付费或生产项目之前请核对链接中的当前信息。",
    ],
    introEn: [
      "First decide whether the goal is to publish a website page quickly or to continue developing an app that needs code, data, and deployment. That decision changes how the generated work can be edited and maintained.",
      "Framer suits design-led website pages. Lovable, v0, and Bolt focus on app starting points and browser-based building. Replit combines coding, running, and deployment in one workspace.",
      "This guide draws on official product pages. Domains, exports, integrations, allowances, and deployment options can change, so check the linked source before starting a paid or production project.",
    ],
    sections: [
      {
        heading: "新手应该选哪一种",
        headingEn: "Which type is best for beginners?",
        body: "若目标是营销网站或作品集，可先看 Framer。若需要继续迭代的应用起点，可在 Lovable、v0、Bolt 和 Replit 的工作方式之间比较。",
        bodyEn: "For a marketing site or portfolio, start by evaluating Framer. For an app starting point that needs further iteration, compare the workflows offered by Lovable, v0, Bolt, and Replit.",
      },
      {
        heading: "代码所有权与导出",
        headingEn: "Code ownership and export",
        body: "购买前请在官方文档中核对代码导出、Git 集成、数据服务和部署的当前支持情况。这些要求应与团队的维护计划相匹配。",
        bodyEn: "Before paying, use the official documentation to verify the current support for code export, Git integration, data services, and deployment. Match those requirements to the team's maintenance plan.",
      },
      {
        heading: "发布成本",
        headingEn: "Publishing cost",
        body: "成本取决于所需的域名、托管、数据服务、团队账户和生成额度。用当前官方方案核对项目需要的每一项服务。",
        bodyEn: "Costs depend on the required domains, hosting, data services, team accounts, and generation allowances. Check each required service against the current official offering.",
      },
    ],
  },
];

export const bestPageMap: Record<string, BestPage> = Object.fromEntries(
  bestPages.map((p) => [p.slug, p]),
);

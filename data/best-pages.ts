// 英文优先的「Best X AI tools」深度落地页：面向海外搜索流量，复用场景数据（工具集 + FAQ）。
// 每页 scenarioId 指向 data/scenarios.ts 中的场景，用于取工具榜单与 FAQ。
export interface BestPageSection {
  heading: string;
  headingEn: string;
  body: string;
  bodyEn: string;
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
];

export const bestPageMap: Record<string, BestPage> = Object.fromEntries(
  bestPages.map((p) => [p.slug, p]),
);

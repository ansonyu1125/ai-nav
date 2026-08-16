import type { Scenario } from "@/lib/types";

// 场景 = 用户意图（"我想…"），对应一个工具分类，用于场景导航与「最佳 XX 工具」对比榜单页。
export const scenarios: Scenario[] = [
  {
    id: "chat",
    name: "聊天问答",
    nameEn: "Chat",
    intent: "我想找个 AI 聊天助手",
    intentEn: "Chat with an AI assistant",
    emoji: "💬",
    category: "chat",
    intro:
      "收录 ChatGPT、Claude、DeepSeek、Kimi 等主流对话式 AI，覆盖写作、问答、编程与多模态理解，助你快速找到适合自己的聊天助手。",
    introEn:
      "Top conversational AI assistants — ChatGPT, Claude, DeepSeek, Kimi and more — for writing, Q&A, coding and multimodal understanding.",
    faqs: [
      {
        q: "哪个 AI 对话助手最好用？",
        qEn: "Which AI chat assistant is the best?",
        a: "没有绝对最好，取决于需求：综合能力选 ChatGPT 或 Claude，追求免费与国内直连选 DeepSeek、Kimi，写作润色选 Claude，编程选 Claude 或 ChatGPT。",
        aEn: "It depends on your needs: ChatGPT or Claude for overall ability, DeepSeek or Kimi for free access and China availability, Claude for writing, Claude or ChatGPT for coding.",
      },
      {
        q: "有没有完全免费的聊天助手？",
        qEn: "Are any chat assistants completely free?",
        a: "有。DeepSeek、Kimi、豆包、文心一言等国内产品免费额度充足，ChatGPT 也提供免费版，付费版解锁更强模型与功能。",
        aEn: "Yes — DeepSeek, Kimi, Doubao and ERNIE Bot offer generous free tiers, and ChatGPT has a free plan. Paid plans unlock stronger models and features.",
      },
      {
        q: "国内能直接用吗？",
        qEn: "Do they work in mainland China?",
        a: "国内产品（DeepSeek、Kimi、豆包、文心）可直接访问；海外产品（ChatGPT、Claude、Gemini）通常需要科学上网。",
        aEn: "China-made tools (DeepSeek, Kimi, Doubao, ERNIE) are directly accessible; overseas tools (ChatGPT, Claude, Gemini) usually require a VPN.",
      },
    ],
  },
  {
    id: "video",
    name: "做视频",
    nameEn: "Video",
    intent: "我想用 AI 生成视频",
    intentEn: "Generate videos with AI",
    emoji: "🎬",
    category: "video",
    intro:
      "从文生视频到图生视频，可灵、即梦、Runway、Sora 等工具让任何人都能一键生成短视频、宣传片与动画。",
    introEn:
      "From text-to-video to image-to-video, Kling, Jimeng, Runway and Sora let anyone generate short clips, promos and animation in one click.",
    faqs: [
      {
        q: "哪款 AI 视频生成工具最好？",
        qEn: "Which AI video generator is the best?",
        a: "国内用可灵、即梦（中文友好、免费额度多）；海外专业场景用 Runway、Pika、Sora。质量与功能各家各有侧重，建议按需求试用。",
        aEn: "For China users, Kling and Jimeng (Chinese-friendly, generous free tiers); for pro workflows, Runway, Pika and Sora. Each has strengths, so try by use case.",
      },
      {
        q: "有免费的视频生成工具吗？",
        qEn: "Are there free video generators?",
        a: "多数提供免费额度：可灵、即梦每日有免费生成次数，Runway、Pika 也有试用额度，付费版解锁更长时长、更高画质与无水印。",
        aEn: "Most offer free quotas: Kling and Jimeng give daily free generations, and Runway/Pika have trials. Paid plans unlock longer clips, higher quality and no watermark.",
      },
      {
        q: "生成的视频能商用吗？",
        qEn: "Can I use generated videos commercially?",
        a: "需看各平台条款：免费版通常限个人使用，付费版（如可灵会员、Runway 订阅）大多支持商业用途，商用前建议确认授权范围。",
        aEn: "Check each platform's terms: free tiers are usually personal use, while paid plans (Kling membership, Runway subscription) generally allow commercial use. Confirm licensing before commercial use.",
      },
    ],
  },
  {
    id: "image",
    name: "画图",
    nameEn: "Image",
    intent: "我想用 AI 生成图片",
    intentEn: "Generate images with AI",
    emoji: "🎨",
    category: "image",
    intro:
      "Midjourney、Stable Diffusion、即梦、文心一格……文生图工具帮你生成艺术插画、产品图与海报。",
    introEn:
      "Midjourney, Stable Diffusion, Jimeng, ERNIE ViLG and more — text-to-image tools for illustrations, product shots and posters.",
    faqs: [
      {
        q: "Midjourney 和即梦怎么选？",
        qEn: "Midjourney vs. Jimeng?",
        a: "追求艺术感与画质选 Midjourney（需付费、海外）；免费、国内直连、中文提示词友好选即梦或文心一格。",
        aEn: "Pick Midjourney for art quality (paid, overseas); pick Jimeng or ERNIE ViLG for free access, China availability and Chinese prompts.",
      },
      {
        q: "有没有免费的 AI 绘画工具？",
        qEn: "Are there free AI image tools?",
        a: "有，即梦、文心一格、Stable Diffusion（自部署）都提供免费额度，Midjourney 需订阅但可试用。",
        aEn: "Yes — Jimeng, ERNIE ViLG and self-hosted Stable Diffusion offer free tiers; Midjourney requires a subscription but has a trial.",
      },
      {
        q: "生成的图片版权归谁？",
        qEn: "Who owns the generated images?",
        a: "各家不同：多数工具（付费版）将使用权授予用户，商用前务必阅读平台的服务条款与授权说明。",
        aEn: "It varies: most tools (paid plans) grant usage rights to the user. Always read the platform's terms before commercial use.",
      },
    ],
  },
  {
    id: "code",
    name: "写代码",
    nameEn: "Coding",
    intent: "我想用 AI 辅助编程",
    intentEn: "Code with AI",
    emoji: "💻",
    category: "code",
    intro:
      "Cursor、GitHub Copilot、Claude Code、通义灵码等 AI 编程工具，帮你补全代码、修复 bug、生成整个项目。",
    introEn:
      "Cursor, GitHub Copilot, Claude Code, Tongyi Lingma and more — AI coding tools that complete code, fix bugs and scaffold projects.",
    faqs: [
      {
        q: "Cursor 和 GitHub Copilot 哪个好？",
        qEn: "Cursor vs. GitHub Copilot?",
        a: "Cursor 是 AI 优先的编辑器，重构与上下文理解更强；Copilot 集成在主流 IDE 里更轻量。深度开发选 Cursor，轻量补全选 Copilot。",
        aEn: "Cursor is an AI-first editor with stronger refactoring and context; Copilot is a lighter plugin inside mainstream IDEs. Pick Cursor for deep work, Copilot for light completion.",
      },
      {
        q: "AI 编程工具要钱吗？",
        qEn: "Do AI coding tools cost money?",
        a: "多数有免费额度：Codeium、通义灵码、CodeGeeX 免费，Cursor、Copilot 有免费试用后订阅。",
        aEn: "Most have free tiers: Codeium, Tongyi Lingma and CodeGeeX are free, while Cursor and Copilot offer trials then subscriptions.",
      },
      {
        q: "哪个适合国内开发者？",
        qEn: "Which suits developers in China?",
        a: "通义灵码、CodeGeeX、MarsCode 国内可直连且免费；海外工具（Cursor、Copilot、Claude Code）通常需科学上网。",
        aEn: "Tongyi Lingma, CodeGeeX and MarsCode are China-accessible and free; overseas tools (Cursor, Copilot, Claude Code) usually need a VPN.",
      },
    ],
  },
  {
    id: "office",
    name: "做 PPT 与办公",
    nameEn: "Office",
    intent: "我想用 AI 提效办公",
    intentEn: "Boost productivity with AI",
    emoji: "📊",
    category: "office",
    intro:
      "WPS AI、Notion AI、Gamma、AiPPT……从文档、PPT 到会议纪要，AI 帮你把办公效率翻倍。",
    introEn:
      "WPS AI, Notion AI, Gamma, AiPPT and more — from docs and slides to meeting notes, AI doubles your productivity.",
    faqs: [
      {
        q: "有没有一键生成 PPT 的工具？",
        qEn: "Are there one-click PPT generators?",
        a: "有，Gamma、AiPPT、WPS AI 输入主题即可生成整套幻灯片，再手动微调即可。",
        aEn: "Yes — Gamma, AiPPT and WPS AI generate a full slide deck from a topic, then you fine-tune manually.",
      },
      {
        q: "国内办公用哪个最方便？",
        qEn: "Which is best for China office work?",
        a: "WPS AI 与讯飞智文中文支持最好、可直接使用；Notion AI、Gamma 适合海外协作场景。",
        aEn: "WPS AI and iFlytek Docs have the best Chinese support and are directly accessible; Notion AI and Gamma suit overseas collaboration.",
      },
      {
        q: "这些工具免费吗？",
        qEn: "Are these tools free?",
        a: "多数提供免费版：WPS AI、Gamma 有免费额度，AiPPT 免费模板，付费版解锁高级 AI 功能。",
        aEn: "Most have free tiers: WPS AI and Gamma offer free quotas, AiPPT has free templates, and paid plans unlock advanced AI features.",
      },
    ],
  },
  {
    id: "writing",
    name: "写文案",
    nameEn: "Writing",
    intent: "我想用 AI 写文案",
    intentEn: "Write copy with AI",
    emoji: "✍️",
    category: "writing",
    intro:
      "用 AI 生成公众号文章、营销文案、邮件，并润色校对——写作类工具让你的产出又快又好。",
    introEn:
      "Generate articles, marketing copy and emails, then polish and proofread — writing tools make your output faster and better.",
    faqs: [
      {
        q: "写中文文案哪款最好？",
        qEn: "Which is best for Chinese copywriting?",
        a: "讯飞智文、秘塔写作猫、万知等中文原生工具更懂中文语境；ChatGPT、Claude 也能胜任但需调整提示词。",
        aEn: "China-native tools like iFlytek Docs, Metaso Write and Wanzhi understand Chinese better; ChatGPT and Claude also work with tuned prompts.",
      },
      {
        q: "AI 写的文案能直接用吗？",
        qEn: "Can I use AI-written copy directly?",
        a: "建议润色后使用，尤其是事实与数据需人工核对，AI 可能产生不准确内容。",
        aEn: "Polish before publishing — especially verify facts and figures, as AI can produce inaccuracies.",
      },
      {
        q: "有没有免费的写作工具？",
        qEn: "Are there free writing tools?",
        a: "有，Wordtune、Rytr 提供免费额度，万知、讯飞智文等国内产品也有免费版。",
        aEn: "Yes — Wordtune and Rytr offer free tiers, and China tools like Wanzhi and iFlytek Docs have free plans.",
      },
    ],
  },
  {
    id: "translate",
    name: "翻译",
    nameEn: "Translation",
    intent: "我想用 AI 翻译",
    intentEn: "Translate with AI",
    emoji: "🌐",
    category: "translate",
    intro:
      "DeepL、Google 翻译、沉浸式翻译、彩云小译等工具，覆盖网页、文档与实时翻译。",
    introEn:
      "DeepL, Google Translate, Immersive Translate, Caiyun Xiaoyi and more — covering web pages, documents and real-time translation.",
    faqs: [
      {
        q: "DeepL 和 Google 翻译哪个准？",
        qEn: "DeepL vs. Google Translate?",
        a: "多语言互译、通用场景 Google 翻译覆盖广；欧洲语种与文学性文本 DeepL 更自然。中文场景两者都可用。",
        aEn: "Google Translate covers more languages for general use; DeepL reads more naturally for European languages and literary text. Both work for Chinese.",
      },
      {
        q: "有没有网页划词翻译工具？",
        qEn: "Any inline web-page translation tools?",
        a: "沉浸式翻译、彩云小译提供浏览器插件，浏览外文网页时可双语对照、划词即译。",
        aEn: "Immersive Translate and Caiyun Xiaoyi offer browser extensions for bilingual web pages and instant word lookup.",
      },
      {
        q: "这些翻译工具收费吗？",
        qEn: "Do these translation tools cost money?",
        a: "多数免费或免费增值：Google 翻译免费，DeepL 有免费额度与 Pro 订阅，彩云小译有免费版。",
        aEn: "Mostly free or freemium: Google Translate is free, DeepL has a free tier plus Pro, and Caiyun Xiaoyi has a free plan.",
      },
    ],
  },
  {
    id: "search",
    name: "AI 搜索",
    nameEn: "Search",
    intent: "我想用 AI 搜索与问答",
    intentEn: "Search with AI",
    emoji: "🔍",
    category: "search",
    intro:
      "Perplexity、秘塔、Devv、夸克等 AI 搜索工具，用自然语言提问，直接得到带来源的答案。",
    introEn:
      "Perplexity, Metaso, Devv, Quark and more — ask in natural language and get cited answers directly.",
    faqs: [
      {
        q: "AI 搜索和普通搜索有什么区别？",
        qEn: "How is AI search different from regular search?",
        a: "AI 搜索直接汇总答案并标注来源，不用逐个点开网页；适合复杂问题、对比与资料整理。",
        aEn: "AI search synthesizes answers with citations instead of listing links — great for complex questions, comparisons and research.",
      },
      {
        q: "国内用什么 AI 搜索？",
        qEn: "Which AI search works in China?",
        a: "秘塔、夸克 AI、Devv 国内可直连；Perplexity 需科学上网但综合能力更强。",
        aEn: "Metaso, Quark AI and Devv are China-accessible; Perplexity needs a VPN but is more capable overall.",
      },
      {
        q: "AI 搜索的答案可靠吗？",
        qEn: "Are AI search answers reliable?",
        a: "多数工具会标注来源可核验，但 AI 仍可能出错，重要信息建议点开原文二次确认。",
        aEn: "Most tools cite sources you can verify, but AI can still err — confirm important facts against the original source.",
      },
    ],
  },
  {
    id: "voice",
    name: "配音",
    nameEn: "Voice",
    intent: "我想用 AI 合成语音",
    intentEn: "Generate speech with AI",
    emoji: "🎙️",
    category: "voice",
    intro:
      "ElevenLabs、魔音工坊、Fish Audio、讯飞听见等语音合成与配音工具，让文字变声音、克隆你的声线。",
    introEn:
      "ElevenLabs, Moyin, Fish Audio, iFlytek Rec and more — turn text into speech and clone your own voice.",
    faqs: [
      {
        q: "哪款 AI 配音最自然？",
        qEn: "Which AI voice sounds most natural?",
        a: "英文配音 ElevenLabs 最自然；中文配音魔音工坊、讯飞听见更贴近中文语境，情感表现好。",
        aEn: "ElevenLabs is the most natural for English; Moyin and iFlytek Rec suit Chinese with better emotion.",
      },
      {
        q: "可以克隆自己的声音吗？",
        qEn: "Can I clone my own voice?",
        a: "可以，ElevenLabs、魔音工坊、Fish Audio 都支持上传样本克隆声线，通常需付费版。",
        aEn: "Yes — ElevenLabs, Moyin and Fish Audio support voice cloning from samples, usually on paid plans.",
      },
      {
        q: "配音工具收费吗？",
        qEn: "Do voice tools cost money?",
        a: "多数免费增值：有免费额度，商用或高级音色需订阅。",
        aEn: "Mostly freemium: free quotas available, with subscriptions for commercial use or premium voices.",
      },
    ],
  },
  {
    id: "design",
    name: "做设计",
    nameEn: "Design",
    intent: "我想用 AI 做设计",
    intentEn: "Design with AI",
    emoji: "🖌️",
    category: "design",
    intro:
      "Canva、Framer、Spline、Figma 等设计创意工具，从海报、UI 到 3D，快速产出视觉作品。",
    introEn:
      "Canva, Framer, Spline, Figma and more — from posters and UI to 3D, produce visuals fast.",
    faqs: [
      {
        q: "不会设计也能用吗？",
        qEn: "Can I use these without design skills?",
        a: "能。Canva 海量模板拖拽即可，Framer 用 AI 生成页面，无需专业设计基础。",
        aEn: "Yes — Canva offers drag-and-drop templates, and Framer generates pages with AI, no design background needed.",
      },
      {
        q: "Canva 免费吗？",
        qEn: "Is Canva free?",
        a: "有免费版（含大量模板与 1GB 存储），Pro 订阅解锁高级 AI 与品牌工具。",
        aEn: "There's a free plan (templates + 1GB storage); Pro unlocks advanced AI and brand tools.",
      },
      {
        q: "国内能用哪些设计工具？",
        qEn: "Which design tools work in China?",
        a: "Canva 可直连；Figma、Framer、Spline 部分功能可能需要科学上网或海外账号。",
        aEn: "Canva is directly accessible; Figma, Framer and Spline may require a VPN or overseas account for some features.",
      },
    ],
  },
];

export const scenarioMap: Record<string, Scenario> = Object.fromEntries(
  scenarios.map((s) => [s.id, s]),
);

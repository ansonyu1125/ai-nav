import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "chat", name: "对话助手", nameEn: "Chat Assistants", emoji: "💬", description: "多轮对话、问答、写作与任务助手", descriptionEn: "Multi-turn chat, Q&A, writing & task assistants" },
  { id: "image", name: "图像生成", nameEn: "Image Generation", emoji: "🎨", description: "文生图、艺术风格与创意绘图", descriptionEn: "Text-to-image, artistic styles & creative illustration" },
  { id: "image-edit", name: "图片编辑", nameEn: "Image Editing", emoji: "✂️", description: "抠图、去背景、局部重绘与修图", descriptionEn: "Cutout, background removal, inpainting & retouching" },
  { id: "video", name: "视频生成", nameEn: "Video Generation", emoji: "🎬", description: "文生视频、图生视频与视频编辑", descriptionEn: "Text/image-to-video & video editing" },
  { id: "avatar", name: "数字人", nameEn: "Digital Humans", emoji: "🧑‍💼", description: "AI 数字人口播与虚拟主播", descriptionEn: "AI avatar narration & virtual presenters" },
  { id: "music", name: "音乐生成", nameEn: "Music Generation", emoji: "🎵", description: "AI 作曲、编曲与人声歌曲", descriptionEn: "AI composition, arrangement & vocal songs" },
  { id: "voice", name: "语音合成", nameEn: "Voice Synthesis", emoji: "🎙️", description: "语音合成、声音克隆与配音", descriptionEn: "TTS, voice cloning & dubbing" },
  { id: "code", name: "编程开发", nameEn: "Coding & Dev", emoji: "💻", description: "代码补全、AI 编程与低代码", descriptionEn: "Code completion, AI coding & low-code" },
  { id: "office", name: "办公效率", nameEn: "Productivity", emoji: "📊", description: "文档、PPT、会议与协作提效", descriptionEn: "Docs, slides, meetings & collaboration" },
  { id: "writing", name: "写作助手", nameEn: "Writing Assistants", emoji: "✍️", description: "文案生成、润色与校对", descriptionEn: "Copywriting, polishing & proofreading" },
  { id: "search", name: "AI 搜索", nameEn: "AI Search", emoji: "🔍", description: "AI 驱动的搜索与问答引擎", descriptionEn: "AI-powered search & Q&A engines" },
  { id: "translate", name: "翻译工具", nameEn: "Translation", emoji: "🌐", description: "机器翻译与沉浸式翻译", descriptionEn: "Machine & immersive translation" },
  { id: "design", name: "设计创意", nameEn: "Design & Creative", emoji: "🖌️", description: "平面设计、UI 与创意素材", descriptionEn: "Graphic design, UI & creative assets" },
  { id: "companion", name: "角色陪伴", nameEn: "Companion AI", emoji: "💕", description: "AI 角色对话与情感陪伴", descriptionEn: "AI character chat & companionship" },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
);

import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "chat", name: "对话助手", emoji: "💬", description: "多轮对话、问答、写作与任务助手" },
  { id: "image", name: "图像生成", emoji: "🎨", description: "文生图、艺术风格与创意绘图" },
  { id: "image-edit", name: "图片编辑", emoji: "✂️", description: "抠图、去背景、局部重绘与修图" },
  { id: "video", name: "视频生成", emoji: "🎬", description: "文生视频、图生视频与视频编辑" },
  { id: "avatar", name: "数字人", emoji: "🧑‍💼", description: "AI 数字人口播与虚拟主播" },
  { id: "music", name: "音乐生成", emoji: "🎵", description: "AI 作曲、编曲与人声歌曲" },
  { id: "voice", name: "语音合成", emoji: "🎙️", description: "语音合成、声音克隆与配音" },
  { id: "code", name: "编程开发", emoji: "💻", description: "代码补全、AI 编程与低代码" },
  { id: "office", name: "办公效率", emoji: "📊", description: "文档、PPT、会议与协作提效" },
  { id: "writing", name: "写作助手", emoji: "✍️", description: "文案生成、润色与校对" },
  { id: "search", name: "AI 搜索", emoji: "🔍", description: "AI 驱动的搜索与问答引擎" },
  { id: "translate", name: "翻译工具", emoji: "🌐", description: "机器翻译与沉浸式翻译" },
  { id: "design", name: "设计创意", emoji: "🖌️", description: "平面设计、UI 与创意素材" },
  { id: "companion", name: "角色陪伴", emoji: "💕", description: "AI 角色对话与情感陪伴" },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
);

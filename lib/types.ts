export type Pricing = "free" | "freemium" | "paid" | "trial";

export type Region = "domestic" | "overseas";

export interface Category {
  id: string;
  name: string;
  nameEn?: string;
  emoji: string;
  description?: string;
  descriptionEn?: string;
}

// 使用环境（平台）固定词表，便于统一展示图标与双语标签
export const PLATFORM_KEYS = [
  "web",
  "macos",
  "windows",
  "linux",
  "ios",
  "android",
  "api",
  "extension",
  "desktop",
  "wechat",
] as const;

export type PlatformKey = (typeof PLATFORM_KEYS)[number];

export const PLATFORM_LABEL: Record<PlatformKey, { zh: string; en: string; icon: string }> = {
  web: { zh: "网页版", en: "Web", icon: "🌐" },
  macos: { zh: "macOS", en: "macOS", icon: "🍎" },
  windows: { zh: "Windows", en: "Windows", icon: "🪟" },
  linux: { zh: "Linux", en: "Linux", icon: "🐧" },
  ios: { zh: "iOS", en: "iOS", icon: "📱" },
  android: { zh: "Android", en: "Android", icon: "🤖" },
  api: { zh: "API 接口", en: "API", icon: "🔌" },
  extension: { zh: "浏览器插件", en: "Browser extension", icon: "🧩" },
  desktop: { zh: "桌面客户端", en: "Desktop app", icon: "🖥️" },
  wechat: { zh: "微信小程序", en: "WeChat Mini Program", icon: "💬" },
};

// 费用档位（pricingTiers 为中文数组，pricingTiersEn 为英文数组，逐项对应）
export interface PricingTier {
  name: string;
  price: string;
  note?: string;
}

export interface Tool {
  id: string;
  name: string;
  nameZh: string;
  category: string;
  region: Region;
  description: string;
  descriptionEn?: string;
  officialUrl: string;
  pricing: Pricing;
  pricingNote?: string;
  pricingNoteEn?: string;
  tags: string[];
  tagsEn?: string[];
  score: number;
  popularity: number;
  featured?: boolean;
  emoji: string;
  logo?: string;
  releaseYear?: number;

  // 详情页扩展内容（AI 生成，可编辑）
  features?: string[];
  featuresEn?: string[];
  howToUse?: string[];
  howToUseEn?: string[];
  advantages?: string[];
  advantagesEn?: string[];
  platforms?: PlatformKey[];
  apiName?: string;
  apiNameEn?: string;
  pricingTiers?: PricingTier[];
  pricingTiersEn?: PricingTier[];
}

export interface Tutorial {
  id: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  category: string;
  categoryEn?: string;
  emoji: string;
  date: string;
  readMinutes: number;
  tags: string[];
  tagsEn?: string[];
  content: string;
  contentEn?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  english: string;
  category: string;
  categoryEn?: string;
  definition: string;
  definitionEn?: string;
  related?: string[];
}

export const PRICING_LABEL: Record<Pricing, { zh: string; en: string }> = {
  free: { zh: "免费", en: "Free" },
  freemium: { zh: "免费增值", en: "Freemium" },
  paid: { zh: "付费", en: "Paid" },
  trial: { zh: "免费试用", en: "Trial" },
};

export const REGION_LABEL: Record<Region, { zh: string; en: string }> = {
  domestic: { zh: "国内", en: "China" },
  overseas: { zh: "海外", en: "Global" },
};

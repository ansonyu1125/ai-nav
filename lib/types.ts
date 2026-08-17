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

// 平台分组（用于二级筛选与导航下拉）：把多个平台键归为一个「专区」
export interface PlatformGroup {
  id: string;
  zh: string;
  en: string;
  icon: string;
  keys: PlatformKey[];
}

export const PLATFORM_GROUPS: PlatformGroup[] = [
  { id: "mobile", zh: "手机应用", en: "Mobile", icon: "📱", keys: ["ios", "android"] },
  { id: "extension", zh: "浏览器插件", en: "Extensions", icon: "🧩", keys: ["extension"] },
  { id: "desktop", zh: "桌面客户端", en: "Desktop", icon: "🖥️", keys: ["macos", "windows", "linux", "desktop"] },
  { id: "api", zh: "API 接口", en: "API", icon: "🔌", keys: ["api"] },
  { id: "web", zh: "网页版", en: "Web", icon: "🌐", keys: ["web"] },
  { id: "wechat", zh: "微信小程序", en: "Mini Program", icon: "💬", keys: ["wechat"] },
];

// 费用档位（pricingTiers 为中文数组，pricingTiersEn 为英文数组，逐项对应）
export interface PricingTier {
  name: string;
  price: string;
  note?: string;
  features?: string[]; // 该档位包含的功能权限（中文）
  featuresEn?: string[]; // 英文，逐项对应
}

// 常见问题（详情页 FAQ）
export interface ToolFaq {
  q: string;
  a: string;
}

// 公司信息（详情页）
export interface ToolCompany {
  name: string; // 公司名
  nameEn?: string;
  location: string; // 地理位置，如 "美国 · 旧金山"
  locationEn?: string;
  officialUrl?: string; // 公司官网（可与产品官网不同）
  loginUrl?: string; // 登录链接
  signupUrl?: string; // 注册链接
}

// 流量来源占比
export interface TrafficSource {
  name: string; // 中文，如 "直接访问"
  nameEn?: string; // "Direct"
  percent: number; // 0-100
}

// 流量地理分布
export interface TrafficRegion {
  country: string; // 中文，如 "美国"
  countryEn?: string; // "United States"
  percent: number; // 0-100
}

// 数据分析（官网流量/来源/地区/关键词）——数据需来自 Apify 等真实统计源
export interface ToolTraffic {
  monthlyVisits?: number; // 月访问量（估算）
  visitsUnit?: string; // 单位，如 "M"、"万"
  trend?: number; // 环比变化百分比，正负
  growth?: number; // 环比增长绝对值（本月 - 上月访问量）
  sources?: TrafficSource[]; // 流量来源
  regions?: TrafficRegion[]; // 地理分布
  keywords?: string[]; // 热门关键词
  savedCount?: number; // 目录站收藏数
  rank?: number; // 目录排名
  updatedAt?: string; // 数据更新时间，如 "2026-08"
}

export interface Tool {
  id: string;
  name: string;
  nameZh: string;
  category: string; // 主分类
  categories?: string[]; // 所属全部分类（含主分类），多领域工具用
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
  verified?: boolean; // 官方认证（官网/官方出品，可信度标识）
  trending?: boolean; // 正在爆火（趋势榜）
  lastChecked?: string; // 最近核验日期（如 "2026-08"，用于展示新鲜度）
  emoji: string;
  logo?: string;
  releaseYear?: number;
  model?: string; // 核心模型（对比用）
  modelEn?: string;

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

  // 详情页扩展内容（第二批新增）
  useCases?: string[]; // 使用案例（中文）
  useCasesEn?: string[]; // 使用案例（英文）
  faqs?: ToolFaq[]; // 常见问题（中文）
  faqsEn?: ToolFaq[]; // 常见问题（英文）
  company?: ToolCompany; // 公司信息
  traffic?: ToolTraffic; // 数据分析（流量/来源/地区/关键词）
  alternatives?: string[]; // 代替品（显式指定的工具 id，缺省时按同分类自动推荐）
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

// 场景（用户意图）："我想做视频 / 写代码 / 做 PPT…" 对应到工具分类，用于场景导航与对比榜单页
export interface ScenarioFAQ {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
}

export interface Scenario {
  id: string;
  name: string;
  nameEn: string;
  intent: string;
  intentEn: string;
  emoji: string;
  category: string;
  intro: string;
  introEn: string;
  faqs: ScenarioFAQ[];
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

// 取工具所属的全部分类：多领域工具返回 categories，否则回退到主分类。
// 纯函数（不依赖 data），可安全用于客户端组件。
export function getToolCategories(tool: Tool): string[] {
  return tool.categories && tool.categories.length > 0
    ? tool.categories
    : [tool.category];
}

// 判断工具是否属于某个平台分组（二级筛选用）
export function matchesPlatformGroup(tool: Tool, groupId: string): boolean {
  const g = PLATFORM_GROUPS.find((x) => x.id === groupId);
  if (!g) return true;
  return g.keys.some((k) => tool.platforms?.includes(k));
}

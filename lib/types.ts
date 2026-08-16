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

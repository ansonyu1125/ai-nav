export type Pricing = "free" | "freemium" | "paid" | "trial";

export type Region = "domestic" | "overseas";

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description?: string;
}

export interface Tool {
  id: string;
  name: string;
  nameZh: string;
  category: string;
  region: Region;
  description: string;
  officialUrl: string;
  pricing: Pricing;
  pricingNote?: string;
  tags: string[];
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
  summary: string;
  category: string;
  emoji: string;
  date: string;
  readMinutes: number;
  tags: string[];
  content: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  english: string;
  category: string;
  definition: string;
  related?: string[];
}

export const PRICING_LABEL: Record<Pricing, string> = {
  free: "免费",
  freemium: "免费增值",
  paid: "付费",
  trial: "免费试用",
};

export const REGION_LABEL: Record<Region, string> = {
  domestic: "国内",
  overseas: "海外",
};

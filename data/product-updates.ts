export interface ProductUpdate {
  toolId: string;
  date: string;
  type: "pricing" | "free-tier" | "feature" | "closure" | "terms";
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  sourceUrl: string;
}

// Add only source-backed changes that can affect a buying decision.
export const productUpdates: ProductUpdate[] = [];

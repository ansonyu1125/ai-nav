export type PricingRecordStatus = "verified" | "source_pending" | "legacy_unverified";
export type BillingInterval = "free" | "month" | "year" | "usage" | "custom" | "unknown";

export interface StructuredPrice {
  amount: number | null;
  currency: "USD" | "CNY" | "EUR" | "GBP" | null;
  interval: BillingInterval;
  perSeat: boolean;
  approximate: boolean;
  raw: string;
}

export interface PricingPlanRecord {
  id: string;
  name: string;
  note: string | null;
  features: string[];
  price: StructuredPrice;
}

export interface ProductPricingRecord {
  toolId: string;
  pricingModel: "free" | "freemium" | "paid" | "trial";
  status: PricingRecordStatus;
  sourceUrl: string | null;
  sourceLabel: string | null;
  verifiedAt: string | null;
  importedAt: string;
  plans: PricingPlanRecord[];
}

export interface PriceHistoryEvent {
  toolId: string;
  detectedAt: string;
  effectiveAt: string | null;
  planId: string | null;
  field: "amount" | "currency" | "interval" | "availability" | "plan_added" | "plan_removed";
  previousValue: string | number | null;
  newValue: string | number | null;
  sourceUrl: string;
  note: string | null;
}

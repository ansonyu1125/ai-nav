import pricingData from "@/data/pricing-database.json";
import priceHistoryData from "@/data/price-history.json";
import type { PriceHistoryEvent, ProductPricingRecord } from "@/lib/pricing-types";

export const pricingRecords = pricingData as ProductPricingRecord[];
export const priceHistory = priceHistoryData as PriceHistoryEvent[];

const pricingByTool = new Map(pricingRecords.map((record) => [record.toolId, record]));

export function getPricingRecord(toolId: string): ProductPricingRecord | undefined {
  return pricingByTool.get(toolId);
}

export function getPriceHistory(toolId: string): PriceHistoryEvent[] {
  return priceHistory.filter((event) => event.toolId === toolId).sort((a, b) => b.detectedAt.localeCompare(a.detectedAt));
}

export function pricingCoverage() {
  return pricingRecords.reduce((result, record) => {
    result.total += 1;
    result[record.status] += 1;
    if (record.plans.length) result.withPlans += 1;
    if (record.sourceUrl) result.withOfficialSource += 1;
    return result;
  }, { total: 0, verified: 0, source_pending: 0, legacy_unverified: 0, withPlans: 0, withOfficialSource: 0 });
}

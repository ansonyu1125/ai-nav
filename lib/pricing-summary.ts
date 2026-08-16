import type { Tool } from "./types";

// 从工具的定价档位里提炼「一眼能看懂的收费结论」：
// 有没有免费额度、付费起点是多少 —— 直接回答用户最关心的「要钱吗、多少钱」。
export interface PricingSummary {
  isFree: boolean; // 完全免费
  hasFree: boolean; // 有免费额度 / 免费试用
  startingPrice: string | null; // 付费起点（最低付费档价格，无则为 null）
}

function isFreeTier(name: string, price: string): boolean {
  return /免费|Free/i.test(name) || /免费|Free/i.test(price);
}

function isConcretePrice(price: string): boolean {
  return /[$¥￥€£₩]/.test(price) || /\d/.test(price);
}

export function summarizePricing(tool: Tool): PricingSummary {
  const tiers = tool.pricingTiers ?? [];
  const isFree = tool.pricing === "free";

  const hasFree =
    isFree ||
    tool.pricing === "freemium" ||
    tool.pricing === "trial" ||
    tiers.some((t) => isFreeTier(t.name, t.price));

  const firstPaid = tiers.find((t) => isConcretePrice(t.price));
  const startingPrice = isFree ? "免费" : firstPaid?.price ?? null;

  return { isFree, hasFree, startingPrice };
}

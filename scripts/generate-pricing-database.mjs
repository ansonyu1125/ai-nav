import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const tools = JSON.parse(fs.readFileSync(path.join(root, "data", "tools.json"), "utf8"));
const evidence = fs.readFileSync(path.join(root, "data", "evidence-sources.ts"), "utf8");
const sourceMap = new Map();
for (const match of evidence.matchAll(/^\s*(?:"([^"]+)"|([\w-]+)):\s*\{\s*pricingUrl:\s*"([^"]+)",\s*pricingLabel:\s*"([^"]+)"/gm)) sourceMap.set(match[1] ?? match[2], { url: match[3], label: match[4] });

function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "plan"; }
function parsePrice(raw) {
  const value = String(raw || "").trim();
  const lower = value.toLowerCase();
  const currency = value.includes("$") ? "USD" : /[¥￥]/.test(value) ? "CNY" : value.includes("€") ? "EUR" : value.includes("£") ? "GBP" : null;
  const number = value.match(/\d+(?:\.\d+)?/);
  const interval = /free|免费/.test(lower) ? "free" : /custom|contact|定制|联系/.test(lower) ? "custom" : /month|月/.test(lower) ? "month" : /year|annual|年/.test(lower) ? "year" : /token|request|image|minute|credit|pay.as.you.go|用量|调用/.test(lower) ? "usage" : "unknown";
  return { amount: number ? Number(number[0]) : null, currency, interval, perSeat: /user|seat|成员|用户/.test(lower), approximate: /~|approx|about|from|起|约/.test(lower), raw: value };
}

const importedAt = "2026-08-17";
const records = tools.map((tool) => {
  const source = sourceMap.get(tool.id);
  const tiers = tool.pricingTiersEn?.length ? tool.pricingTiersEn : tool.pricingTiers ?? [];
  return {
    toolId: tool.id,
    pricingModel: tool.pricing,
    status: tool.pricingLastChecked && source ? "verified" : source ? "source_pending" : "legacy_unverified",
    sourceUrl: source?.url ?? null,
    sourceLabel: source?.label ?? null,
    verifiedAt: tool.pricingLastChecked ?? null,
    importedAt,
    plans: tiers.map((tier, index) => ({ id: `${slug(tier.name)}-${index + 1}`, name: tier.name, note: tier.note ?? null, features: tier.featuresEn ?? tier.features ?? [], price: parsePrice(tier.price) })),
  };
});
fs.writeFileSync(path.join(root, "data", "pricing-database.json"), `${JSON.stringify(records, null, 2)}\n`);
const stats = records.reduce((x, r) => { x.total++; x[r.status]++; if (r.sourceUrl) x.sources++; if (r.plans.length) x.plans++; return x; }, { total: 0, verified: 0, source_pending: 0, legacy_unverified: 0, sources: 0, plans: 0 });
console.log(JSON.stringify(stats, null, 2));

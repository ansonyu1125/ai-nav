import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const records = JSON.parse(fs.readFileSync(path.join(root, "data", "pricing-database.json"), "utf8"));
const ids = new Set(); const errors = [];
for (const record of records) {
  if (ids.has(record.toolId)) errors.push(`${record.toolId}: duplicate product record`); ids.add(record.toolId);
  if (record.status === "verified" && (!record.sourceUrl || !record.verifiedAt)) errors.push(`${record.toolId}: verified without source and date`);
  for (const plan of record.plans) {
    if (!plan.price.raw) errors.push(`${record.toolId}/${plan.id}: missing raw price`);
    if (plan.price.amount != null && !Number.isFinite(plan.price.amount)) errors.push(`${record.toolId}/${plan.id}: invalid amount`);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Pricing database valid: ${records.length} products, ${records.reduce((n, r) => n + r.plans.length, 0)} plans.`);

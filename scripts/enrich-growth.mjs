// 从 traffic-raw.json 的月度历史（monthlyVisits[]）计算环比增长/增长率，写回 tools.json 的 traffic.trend / traffic.growth。
// 用法：node scripts/enrich-growth.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function domainOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return null; }
}

function computeGrowth(monthly) {
  if (!Array.isArray(monthly) || monthly.length < 2) return { trend: undefined, growth: undefined };
  const last = monthly[monthly.length - 1].visits;
  const prev = monthly[monthly.length - 2].visits;
  if (!prev) return { trend: undefined, growth: undefined };
  const growth = last - prev;
  return { growth, trend: Math.round((growth / prev) * 1000) / 10 };
}

const raw = JSON.parse(readFileSync(join(root, "traffic-raw.json"), "utf8"));
const byDomain = new Map(raw.map((o) => [String(o.domain || "").toLowerCase().replace(/^www\./, ""), o]));

const tools = JSON.parse(readFileSync(join(root, "data", "tools.json"), "utf8"));
let ok = 0, nope = 0;
for (const t of tools) {
  const d = domainOf(t.officialUrl);
  if (!d) continue;
  const o = byDomain.get(d);
  if (!o) continue;
  const { trend, growth } = computeGrowth(o.monthlyVisits);
  if (!t.traffic) t.traffic = {};
  t.traffic.trend = trend;
  t.traffic.growth = growth;
  if (growth != null) ok++; else nope++;
}
writeFileSync(join(root, "data", "tools.json"), JSON.stringify(tools, null, 2) + "\n", "utf8");
console.log(`增长已计算：${ok} 个有环比，${nope} 个无（月度历史不足或共享域名无数据）。`);

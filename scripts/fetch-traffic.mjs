// 用 Apify 的 SimilarWeb 爬虫，批量抓取全部工具的流量数据，写回 data/tools.json 的 traffic 字段。
// 用法：node scripts/fetch-traffic.mjs
// 流程：读取 domains.json -> 异步启动 actor -> 轮询 -> 抓取结果 -> 映射写入 tools.json
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// ---- 极简 .env 加载 ----
function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadEnvFile(join(root, ".env.local"));
loadEnvFile(join(root, ".env"));

const TOKEN = process.env.APIFY_API_KEY;
const ACTOR = "vortex_data~similarweb-scraper";
const BASE = "https://api.apify.com/v2";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 国家代码 -> 中英文名（用系统内置的地区名）
const enNames = new Intl.DisplayNames(["en"], { type: "region" });
const zhNames = new Intl.DisplayNames(["zh"], { type: "region" });
function countryZh(code) { try { return zhNames.of(code) || code; } catch { return code; } }
function countryEn(code) { try { return enNames.of(code) || code; } catch { return code; } }

// 域名 -> 工具 id 的映射（用于写回）
function domainOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return null; }
}

function buildSources(o) {
  const defs = [
    ["直接访问", "Direct", o.directTraffic],
    ["自然搜索", "Organic search", o.searchOrganicTraffic],
    ["付费搜索", "Paid search", o.searchPaidTraffic],
    ["引荐", "Referral", o.referralTraffic],
    ["社交媒体", "Social", o.socialTraffic],
    ["邮件", "Email", o.mailTraffic],
    ["展示广告", "Display ads", o.displayAdsTraffic],
    ["AI 引荐", "AI referral", o.aiReferralTraffic],
  ];
  const out = [];
  for (const [name, nameEn, val] of defs) {
    if (val == null) continue;
    const pct = Math.round(val * 1000) / 10; // 分数 -> 百分比，1 位小数
    if (pct > 0) out.push({ name, nameEn, percent: pct });
  }
  // 按占比降序，取前 6
  out.sort((a, b) => b.percent - a.percent);
  return out.slice(0, 6);
}

function buildRegions(countries) {
  if (!Array.isArray(countries)) return [];
  return countries.slice(0, 6).map((c) => ({
    country: countryZh(c.country),
    countryEn: countryEn(c.country),
    percent: Math.round(c.share * 1000) / 10,
  }));
}

function toTraffic(o) {
  const kw = (o.topKeywords || []).slice(0, 10).map((k) => k.keyword).filter(Boolean);
  const lastMonth = (o.monthlyVisits || []).at(-1);
  const updatedAt = lastMonth ? lastMonth.month : (o.snapshotDate || "").slice(0, 7);
  return {
    monthlyVisits: o.totalVisits ?? undefined,
    trend: undefined, // 环比可由 monthlyVisits 后算，这里先不填
    sources: buildSources(o),
    regions: buildRegions(o.website_traffic_by_country),
    keywords: kw,
    rank: o.rankGlobal ?? undefined,
    updatedAt: updatedAt || undefined,
  };
}

async function main() {
  if (!TOKEN) {
    throw new Error("缺少 APIFY_API_KEY（.env.local）");
  }
  const domains = JSON.parse(readFileSync(join(root, "domains.json"), "utf8"));
  console.log(`待抓取域名：${domains.length} 个`);

  // 1. 启动异步 run（成本上限 4 美元，防超免费额度；timeout 1 小时）
  const runRes = await fetch(`${BASE}/actors/${ACTOR}/runs?token=${TOKEN}&maxTotalChargeUsd=4&timeout=3600`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domains, datasets: "base_data" }),
  });
  const runJson = await runRes.json();
  if (!runRes.ok) {
    throw new Error("启动失败: " + JSON.stringify(runJson).slice(0, 500));
  }
  const runId = runJson.data?.id;
  console.log(`run 已启动，runId=${runId}`);
  writeFileSync(join(root, ".traffic-run-id"), runId, "utf8");

  // 2. 轮询状态
  for (let i = 0; i < 120; i++) {
    await sleep(30000);
    const stRes = await fetch(`${BASE}/actor-runs/${runId}?token=${TOKEN}`);
    const st = (await stRes.json()).data || {};
    const cost = st.usageTotalUsd ?? 0;
    console.log(`[轮询 ${i + 1}] 状态=${st.status} 已用≈$${Number(cost).toFixed(3)}`);
    if (["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"].includes(st.status)) {
      console.log("最终状态:", st.status);
      break;
    }
  }

  // 3. 拉取结果
  const itemsRes = await fetch(`${BASE}/actor-runs/${runId}/dataset/items?token=${TOKEN}&format=json&clean=true`);
  const items = await itemsRes.json();
  const arr = Array.isArray(items) ? items : items.data || [];
  console.log(`拿到数据条数：${arr.length}`);
  writeFileSync(join(root, "traffic-raw.json"), JSON.stringify(arr, null, 2), "utf8");

  // 4. 映射写回 tools.json
  const byDomain = new Map(arr.map((o) => [String(o.domain || o.searchUrl || "").toLowerCase().replace(/^www\./, ""), o]));
  const tools = JSON.parse(readFileSync(join(root, "data", "tools.json"), "utf8"));
  let matched = 0, missing = 0;
  for (const t of tools) {
    const d = domainOf(t.officialUrl);
    if (!d) continue;
    const o = byDomain.get(d);
    if (o) {
      t.traffic = toTraffic(o);
      matched++;
    } else {
      missing++;
    }
  }
  writeFileSync(join(root, "data", "tools.json"), JSON.stringify(tools, null, 2) + "\n", "utf8");
  console.log(`\n完成：匹配写入 ${matched} 个工具的 traffic，缺失 ${missing} 个（无数据）。`);
  if (missing > 0) {
    const missDomains = tools.filter((t) => { const d = domainOf(t.officialUrl); return d && !byDomain.has(d); }).map((t) => domainOf(t.officialUrl));
    writeFileSync(join(root, "traffic-missing.json"), JSON.stringify(missDomains, null, 2), "utf8");
    console.log(`缺失域名已存 traffic-missing.json（${missDomains.length} 个）`);
  }
}

main().catch((e) => { console.error("脚本错误:", e); process.exitCode = 1; });

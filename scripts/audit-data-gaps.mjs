import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const tools = JSON.parse(fs.readFileSync(path.join(root, "data/tools.json"), "utf8"));

function parseDestinations(file) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const matcher = /^  (?:"([^"]+)"|([a-z0-9-]+)): \[/gm;
  const matches = [...source.matchAll(matcher)];
  const result = new Map();
  matches.forEach((match, index) => {
    const id = match[1] || match[2];
    const segment = source.slice(match.index, matches[index + 1]?.index ?? source.length);
    result.set(id, [...segment.matchAll(/platform: "([^"]+)"/g)].map((item) => item[1]));
  });
  return result;
}

const evidenceSourceText = fs.readFileSync(path.join(root, "data/evidence-sources.ts"), "utf8");
const pricingSourceIds = new Set([...evidenceSourceText.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)): \{/gm)].map((match) => match[1] || match[2]));
const scoreSourceText = fs.readFileSync(path.join(root, "data/tool-scores.ts"), "utf8");
const scoredToolIds = new Set([...scoreSourceText.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)): \{/gm)].map((match) => match[1] || match[2]));

const destinations = new Map();
for (const file of ["data/platform-links.ts", "data/product-destinations.ts"]) {
  for (const [id, platforms] of parseDestinations(file)) {
    destinations.set(id, [...new Set([...(destinations.get(id) ?? []), ...platforms])]);
  }
}

const shapePlatforms = {
  app: ["ios", "android"],
  plugin: ["extension"],
  api: ["api"],
  desktop: ["desktop", "macos", "windows", "linux"],
};

function csv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const rows = tools.map((tool) => {
  const platforms = tool.platforms ?? [];
  const recorded = new Set([...(tool.platformLinks ?? []).map((link) => link.platform), ...(destinations.get(tool.id) ?? [])]);
  const missingDestinations = Object.entries(shapePlatforms)
    .filter(([, keys]) => keys.some((key) => platforms.includes(key)) && !keys.some((key) => recorded.has(key)))
    .map(([shape]) => shape);
  const missing = {
    model: !tool.model,
    score_breakdown: !scoredToolIds.has(tool.id),
    official_url: !tool.officialUrl,
    english_description: !tool.descriptionEn,
    english_features: !(tool.featuresEn?.length),
    last_verified: !tool.lastChecked,
    pricing_source: !pricingSourceIds.has(tool.id),
    pricing_last_checked: !tool.pricingLastChecked,
    latest_major_update: !tool.latestMajorUpdate,
    available_countries: !(tool.availableCountriesEn?.length || tool.availableCountries?.length),
    free_trial_requirements: !tool.freeTrialRequirementsEn && !tool.freeTrialRequirements,
    affiliate_disclosure: !tool.affiliateDisclosure || tool.affiliateDisclosure === "unknown",
    logo: !tool.logo,
  };
  const missingCount = Object.values(missing).filter(Boolean).length + missingDestinations.length;
  const action = missing.official_url ? "DELETE_OR_FIND_OFFICIAL_SOURCE" : missingCount >= 7 ? "REVIEW_PRIORITY" : missingCount >= 3 ? "REVIEW" : "KEEP";
  return {
    id: tool.id,
    name: tool.name,
    region: tool.region,
    platforms: platforms.join(";"),
    missing_dedicated_destinations: missingDestinations.join(";"),
    ...missing,
    missing_count: missingCount,
    action,
  };
});

const headers = Object.keys(rows[0]);
const output = [headers.join(","), ...rows.map((row) => headers.map((header) => csv(row[header])).join(","))].join("\n");
fs.writeFileSync(path.join(root, "DATA_GAPS.csv"), output, "utf8");

const counts = {
  total: rows.length,
  model: rows.filter((row) => row.model).length,
  scoreBreakdown: rows.filter((row) => row.score_breakdown).length,
  destination: rows.filter((row) => row.missing_dedicated_destinations).length,
  lastVerified: rows.filter((row) => row.last_verified).length,
  pricingSource: rows.filter((row) => row.pricing_source).length,
  pricingChecked: rows.filter((row) => row.pricing_last_checked).length,
  countries: rows.filter((row) => row.available_countries).length,
  deleteCandidates: rows.filter((row) => row.action === "DELETE_OR_FIND_OFFICIAL_SOURCE").length,
  priority: rows.filter((row) => row.action === "REVIEW_PRIORITY").length,
};
const summary = `# AINav Data Gap Audit\n\nGenerated: ${new Date().toISOString().slice(0, 10)}\n\n- Total tools: ${counts.total}\n- Missing model information: ${counts.model}\n- Missing score breakdown: ${counts.scoreBreakdown}\n- Missing dedicated product-form destination: ${counts.destination}\n- Missing last verified date: ${counts.lastVerified}\n- Missing official pricing source: ${counts.pricingSource}\n- Missing pricing checked date: ${counts.pricingChecked}\n- Missing available-country data: ${counts.countries}\n- Missing official URL (delete or source): ${counts.deleteCandidates}\n- Priority review rows: ${counts.priority}\n\nOpen \`DATA_GAPS.csv\` and filter the \`action\`, \`missing_count\`, or any \`missing_*\` column. No product is deleted automatically.\n`;
fs.writeFileSync(path.join(root, "DATA_GAPS.md"), summary, "utf8");
console.log(JSON.stringify(counts, null, 2));



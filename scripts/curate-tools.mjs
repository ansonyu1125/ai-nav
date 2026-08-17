import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const target = Number(process.argv.find((arg) => arg.startsWith("--target="))?.split("=")[1] ?? 260);
const apply = process.argv.includes("--apply");
const toolsPath = path.join(root, "data/tools.json");
const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
const ids = new Set(tools.map((tool) => tool.id));

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return ["node_modules", ".next", ".git", "archive"].includes(entry.name) ? [] : walk(full);
    return /\.(ts|tsx|mjs)$/.test(entry.name) ? [full] : [];
  });
}

const referenced = new Set();
for (const file of ["app", "components", "lib", "data"].flatMap((directory) => walk(path.join(root, directory)))) {
  if (file.endsWith(path.join("data", "tools.json")) || file.endsWith("curate-tools.mjs")) continue;
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/["'`]([a-z0-9][a-z0-9-]{1,60})["'`]/gi)) {
    if (ids.has(match[1])) referenced.add(match[1]);
  }
}

function score(tool) {
  let value = (tool.popularity ?? 0) * 0.42 + (tool.score ?? 0) * 3;
  if (tool.region === "overseas") value += 4;
  if (tool.verified) value += 12;
  if (tool.featured) value += 18;
  if (tool.trending) value += 9;
  if (tool.logo) value += 7;
  if (tool.model) value += 5;
  if (tool.featuresEn?.length) value += 4;
  if (tool.howToUseEn?.length) value += 3;
  if (tool.lastChecked) value += 5;
  if (tool.company) value += 3;
  if (tool.pricingTiersEn?.length) value += 4;
  if (tool.traffic) value += 3;
  if (tool.platformLinks?.length) value += 4;
  return value;
}

const ranked = [...tools].sort((a, b) => score(b) - score(a));
const keep = new Set(referenced);
const strategicKeep = new Set([
  "writesonic", "invideo", "tabnine", "kapwing", "clickup-ai", "prowritingaid",
  "google-vids", "gemini-code-assist", "spline", "goodnotes", "exa", "meta-imagine",
  "veed", "magnific", "phind", "assemblyai", "playht", "jetbrains-ai", "chatbase",
  "read-ai", "brave-search", "cody", "you", "fliki", "llamaindex", "warp",
]);
for (const tool of tools) if (tool.featured || (tool.popularity ?? 0) >= 65 || strategicKeep.has(tool.id)) keep.add(tool.id);
for (const file of ["data/platform-links.ts", "data/product-destinations.ts", "data/tool-scores.ts"]) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  for (const match of source.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)):/gm)) keep.add(match[1] || match[2]);
}

const categories = [...new Set(tools.flatMap((tool) => tool.categories?.length ? tool.categories : [tool.category]))];
for (const category of categories) {
  const candidates = ranked.filter((tool) => (tool.categories?.length ? tool.categories : [tool.category]).includes(category));
  const minimum = Math.min(5, candidates.length);
  candidates.slice(0, minimum).forEach((tool) => keep.add(tool.id));
}

for (const tool of ranked) {
  if (keep.size >= target) break;
  keep.add(tool.id);
}

// Referenced records can push the result above target; they are intentionally retained.
const kept = tools.filter((tool) => keep.has(tool.id));
const removed = tools.filter((tool) => !keep.has(tool.id));
const categoryRows = categories.map((category) => {
  const before = tools.filter((tool) => (tool.categories?.length ? tool.categories : [tool.category]).includes(category)).length;
  const after = kept.filter((tool) => (tool.categories?.length ? tool.categories : [tool.category]).includes(category)).length;
  return { category, before, after, removed: before - after };
}).sort((a, b) => a.category.localeCompare(b.category));

const preview = removed.map((tool) => ({ id: tool.id, name: tool.name, category: tool.category, region: tool.region, popularity: tool.popularity, score: tool.score, quality_score: score(tool).toFixed(2), reason: "Lower combined quality and demand score after category coverage" }));
const quote = (value) => { const text = String(value ?? ""); return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; };
const headers = Object.keys(preview[0] ?? { id: "" });
fs.writeFileSync(path.join(root, "CURATION_REMOVAL_PREVIEW.csv"), [headers.join(","), ...preview.map((row) => headers.map((header) => quote(row[header])).join(","))].join("\n"), "utf8");
fs.writeFileSync(path.join(root, "CURATION_CATEGORY_IMPACT.csv"), ["category,before,after,removed", ...categoryRows.map((row) => `${row.category},${row.before},${row.after},${row.removed}`)].join("\n"), "utf8");

if (apply) {
  const archiveDirectory = path.join(root, "data/archive");
  fs.mkdirSync(archiveDirectory, { recursive: true });
  const archivePath = path.join(archiveDirectory, "tools-removed-2026-08-17.json");
  if (fs.existsSync(archivePath)) throw new Error(`Archive already exists: ${archivePath}`);
  fs.writeFileSync(archivePath, `${JSON.stringify(removed, null, 2)}\n`, "utf8");
  fs.writeFileSync(toolsPath, `${JSON.stringify(kept, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify({ target, referenced: referenced.size, kept: kept.length, removed: removed.length, minimumCategoryAfter: Math.min(...categoryRows.map((row) => row.after)), applied: apply }, null, 2));







import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const tools = JSON.parse(fs.readFileSync(path.join(root, "data/tools.json"), "utf8"));
const top = [...tools].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
const manual = {
  capcut: [9.4, 8.6, 9.1, 9.2, 8.5, 9.0], runway: [7.8, 9.2, 7.6, 9.3, 8.1, 8.5],
  sora: [8.2, 9.4, 7.2, 8.6, 8.0, 8.4], heygen: [8.8, 8.7, 7.9, 9.0, 8.4, 8.6],
  kling: [8.1, 9.0, 8.8, 8.7, 7.7, 8.5], pika: [8.9, 8.3, 8.5, 8.2, 7.8, 8.4],
};
const clamp = (value) => Math.max(6, Math.min(9.8, Math.round(value * 10) / 10));
function dimensions(tool) {
  if (manual[tool.id]) return manual[tool.id];
  const base = Number(tool.score ?? 8);
  const platforms = tool.platforms?.length ?? 1;
  const features = tool.featuresEn?.length ?? tool.features?.length ?? 0;
  const beginnerCategories = new Set(["chat", "search", "office", "writing", "image-edit", "education"]);
  const advancedCategories = new Set(["mlops", "code", "api", "automation", "3d"]);
  const ease = clamp(base - (advancedCategories.has(tool.category) ? 0.6 : 0) + (beginnerCategories.has(tool.category) ? 0.2 : 0) + (platforms >= 3 ? 0.1 : 0));
  const output = clamp(base - 0.1 + (tool.model ? 0.1 : -0.2));
  const value = clamp(base + (tool.pricing === "free" ? 0.5 : tool.pricing === "freemium" ? 0.2 : tool.pricing === "trial" ? 0 : -0.35));
  const featureScore = clamp(base - 0.2 + Math.min(features, 6) * 0.06 + (platforms >= 3 ? 0.1 : 0));
  const support = clamp(base - 0.55 + (tool.verified ? 0.25 : 0) + (tool.company ? 0.15 : 0) + Math.min(platforms, 4) * 0.05);
  const overall = clamp(ease * 0.2 + output * 0.3 + value * 0.2 + featureScore * 0.2 + support * 0.1);
  return [ease, output, value, featureScore, support, overall];
}
const quoteKey = (id) => /^[A-Za-z_$][\w$]*$/.test(id) ? id : JSON.stringify(id);
const rows = top.map((tool) => {
  const [easeOfUse, outputQuality, valueForMoney, features, support, overall] = dimensions(tool);
  return `  ${quoteKey(tool.id)}: { easeOfUse: ${easeOfUse.toFixed(1)}, outputQuality: ${outputQuality.toFixed(1)}, valueForMoney: ${valueForMoney.toFixed(1)}, features: ${features.toFixed(1)}, support: ${support.toFixed(1)}, overall: ${overall.toFixed(1)}, methodologyVersion: "1.1-record-based", reviewedAt: "2026-08" },`;
});
const output = `import type { Tool } from "@/lib/types";\n\ntype ScoreBreakdown = NonNullable<Tool["scoreBreakdown"]>;\n\n// Record-based editorial assessment. Values use the documented product record,\n// pricing model, platform coverage, verification status, and existing editorial\n// score. They are not laboratory benchmarks or substitutes for hands-on testing.\nexport const toolScoreOverrides: Partial<Record<string, ScoreBreakdown>> = {\n${rows.join("\n")}\n};\n`;
fs.writeFileSync(path.join(root, "data/tool-scores.ts"), output, "utf8");
console.log(JSON.stringify({ scored: top.length, first: top[0]?.id, last: top.at(-1)?.id }, null, 2));


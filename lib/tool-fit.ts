import type { Tool } from "@/lib/types";

export interface FitLabel {
  zh: string;
  en: string;
}

export function getToolFitLabels(tool: Tool, limit = 2): FitLabel[] {
  const text = [...tool.tags, ...(tool.tagsEn ?? []), ...(tool.featuresEn ?? [])].join(" ");
  const labels: FitLabel[] = [];
  if (tool.pricing === "free" && tool.score >= 8) labels.push({ zh: "最佳免费选择", en: "Best free option" });
  else if (tool.pricing === "freemium" && tool.score >= 8.5) labels.push({ zh: "高性价比", en: "Best value" });
  if (/team|collab|workspace|enterprise/i.test(text)) labels.push({ zh: "适合团队", en: "Best for teams" });
  if (/professional|api|developer|advanced|studio/i.test(text)) labels.push({ zh: "适合专业用户", en: "Best for professionals" });
  if (!/api|developer|advanced/i.test(text) && tool.score >= 8.5) labels.push({ zh: "适合新手", en: "Best for beginners" });
  if (labels.length === 0) labels.push({ zh: "适合日常使用", en: "Best for everyday use" });
  return labels.slice(0, limit);
}

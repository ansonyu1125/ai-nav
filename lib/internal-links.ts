import { bestPages } from "@/data/best-pages";
import { scenarios } from "@/data/scenarios";
import { tutorialRelations } from "@/data/tutorial-relations";
import { tutorials } from "@/lib/tutorials";
import type { Tool } from "@/lib/types";

export interface InternalLinkItem { href: string; labelZh: string; labelEn: string; descriptionZh: string; descriptionEn: string; }

export function getInternalLinksForTool(tool: Tool): InternalLinkItem[] {
  const links: InternalLinkItem[] = [
    { href: "/pricing", labelZh: "核对价格记录", labelEn: "Check pricing records", descriptionZh: "查看套餐、官方来源与核验状态", descriptionEn: "Inspect plans, official sources and verification status" },
    { href: `/compare?tools=${tool.id}`, labelZh: "比较同类产品", labelEn: "Compare similar tools", descriptionZh: "并排比较价格、平台和适用对象", descriptionEn: "Compare pricing, platforms and best fit side by side" },
  ];
  const scenario = scenarios.find((item) => item.category === tool.category);
  const best = scenario ? bestPages.find((page) => page.scenarioId === scenario.id) : undefined;
  if (best) links.push({ href: `/best/${best.slug}`, labelZh: best.title, labelEn: best.titleEn, descriptionZh: "查看编辑精选、取舍和购买建议", descriptionEn: "See the editorial shortlist, trade-offs and buying guidance" });
  if (scenario) links.push({ href: `/scenarios/${scenario.id}`, labelZh: scenario.intent, labelEn: scenario.intentEn, descriptionZh: "从任务出发浏览这一类工具", descriptionEn: "Browse this category from a task-first view" });
  const toolTerms = [tool.id, tool.name, tool.nameZh].map((value) => value.toLowerCase());
  const relatedTutorials = tutorials
    .filter((tutorial) => tutorialRelations[tutorial.id]?.toolIds.includes(tool.id))
    .map((tutorial) => {
      const directText = [tutorial.id, tutorial.title, tutorial.titleEn, ...tutorial.tags, ...(tutorial.tagsEn ?? [])].filter(Boolean).join(" ").toLowerCase();
      const score = toolTerms.reduce((total, term) => total + (term && directText.includes(term) ? 10 : 0), 1);
      return { tutorial, score };
    })
    .sort((a, b) => b.score - a.score || b.tutorial.date.localeCompare(a.tutorial.date))
    .slice(0, 2)
    .map(({ tutorial }) => tutorial);
  for (const tutorial of relatedTutorials) links.push({ href: `/tutorials/${tutorial.id}`, labelZh: tutorial.title, labelEn: tutorial.titleEn ?? tutorial.title, descriptionZh: "通过实操教程了解使用方式", descriptionEn: "Learn the workflow through a practical tutorial" });
  if (tool.pricing === "trial") links.push({ href: "/deals#free-trials", labelZh: "查看免费试用", labelEn: "Check free trials", descriptionZh: "核对试用条件和有效状态", descriptionEn: "Check trial requirements and current status" });
  links.push({ href: "/updates", labelZh: "查看产品变化", labelEn: "Review product changes", descriptionZh: "跟踪价格、免费额度和条款变化", descriptionEn: "Track pricing, free-tier and terms changes" });
  return links.slice(0, 7);
}

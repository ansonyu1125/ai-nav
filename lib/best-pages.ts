import { bestPages, bestPageMap, type BestPage } from "@/data/best-pages";
import { scenarioMap } from "@/data/scenarios";
import { getScenarioTools } from "./scenarios";
import { getTool } from "./tools";

export function getAllBestPages(): BestPage[] {
  return bestPages;
}

// 返回最佳页 + 对应场景 + 榜单工具（供页面渲染）
export function getBestPage(slug: string) {
  const page = bestPageMap[slug];
  if (!page) return undefined;
  const scenario = scenarioMap[page.scenarioId];
  const tools = page.toolIds
    ? page.toolIds.map((id) => getTool(id)).filter((tool): tool is NonNullable<ReturnType<typeof getTool>> => Boolean(tool))
    : scenario
      ? getScenarioTools(scenario, 8)
      : [];
  return { page, scenario, tools };
}

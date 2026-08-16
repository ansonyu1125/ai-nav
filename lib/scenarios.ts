import type { Scenario } from "@/lib/types";
import { scenarios } from "@/data/scenarios";
import { getToolsByCategory, sortTools } from "./tools";

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function getAllScenarios(): Scenario[] {
  return scenarios;
}

// 场景榜单：取该分类下按热度排序的工具（用于对比表 + 网格）
export function getScenarioTools(scenario: Scenario, limit = 8) {
  const list = getToolsByCategory(scenario.category);
  return sortTools(list, "popularity").slice(0, limit);
}

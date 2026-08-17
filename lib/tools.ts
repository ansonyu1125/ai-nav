import toolsData from "@/data/tools.json";
import { getToolCategories, type Tool } from "@/lib/types";

export const tools = toolsData as Tool[];

export type SortKey = "popularity" | "score" | "newest";

export function getTool(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

// 手机应用：含 iOS / Android 平台的工具，按热度排序
export function getMobileTools(limit = 8): Tool[] {
  return tools
    .filter((t) => t.platforms?.some((p) => p === "ios" || p === "android"))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

// 浏览器插件：含 extension 平台的工具，按热度排序
export function getExtensionTools(limit = 8): Tool[] {
  return tools
    .filter((t) => t.platforms?.includes("extension"))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => getToolCategories(t).includes(categoryId));
}

export function countByCategory(categoryId: string): number {
  return tools.filter((t) => getToolCategories(t).includes(categoryId)).length;
}

export function getRelatedTools(tool: Tool, limit = 6): Tool[] {
  const mine = getToolCategories(tool);
  return tools
    .filter(
      (t) =>
        t.id !== tool.id &&
        getToolCategories(t).some((c) => mine.includes(c)),
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

// 代替品：优先用显式指定的 alternatives，不足再按同分类自动补齐
export function getAlternatives(tool: Tool, limit = 6): Tool[] {
  const explicit = (tool.alternatives ?? [])
    .map((id) => getTool(id))
    .filter((t): t is Tool => !!t && t.id !== tool.id);
  const seen = new Set(explicit.map((t) => t.id));
  const rest = getRelatedTools(tool, limit).filter((t) => !seen.has(t.id));
  return [...explicit, ...rest].slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter((t) => {
    const haystack = [
      t.name,
      t.nameZh,
      t.description,
      ...t.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function sortTools(list: Tool[], sort: SortKey): Tool[] {
  const arr = [...list];
  switch (sort) {
    case "score":
      return arr.sort((a, b) => b.score - a.score);
    case "newest":
      return arr.sort(
        (a, b) => (b.releaseYear ?? 0) - (a.releaseYear ?? 0),
      );
    case "popularity":
    default:
      return arr.sort((a, b) => b.popularity - a.popularity);
  }
}

export function topTools(sort: SortKey = "popularity", limit = 10): Tool[] {
  return sortTools(tools, sort).slice(0, limit);
}

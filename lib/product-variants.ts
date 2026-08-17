import { getToolCategories, type PlatformKey, type PlatformLink, type Tool } from "@/lib/types";
import { tools } from "@/lib/tools";

export type ProductVariant = "web" | "app" | "plugin" | "api" | "desktop";

const variantPlatforms: Record<ProductVariant, PlatformKey[]> = {
  web: ["web"],
  app: ["ios", "android"],
  plugin: ["extension"],
  api: ["api"],
  desktop: ["desktop", "macos", "windows", "linux"],
};

export const variantRoutes: Record<ProductVariant, string> = {
  web: "web",
  app: "apps",
  plugin: "plugins",
  api: "api",
  desktop: "desktop",
};

export function getVariantLinks(tool: Tool, variant: ProductVariant): PlatformLink[] {
  const keys = variantPlatforms[variant];
  const links = (tool.platformLinks ?? []).filter((link) => keys.includes(link.platform));
  if (variant === "web" && links.length === 0 && tool.platforms?.includes("web")) {
    return [{ platform: "web", url: tool.officialUrl, name: "官方网站", nameEn: "Official web app" }];
  }
  return links;
}

export function getAppLinks(tool: Tool) { return getVariantLinks(tool, "app"); }
export function getPluginLinks(tool: Tool) { return getVariantLinks(tool, "plugin"); }

export function hasVariantPage(tool: Tool, variant: ProductVariant): boolean {
  return getVariantLinks(tool, variant).length > 0;
}

export function hasAppPage(tool: Tool) { return hasVariantPage(tool, "app"); }
export function hasPluginPage(tool: Tool) { return hasVariantPage(tool, "plugin"); }

export function getVariantTools(variant: ProductVariant): Tool[] {
  return tools.filter((tool) => hasVariantPage(tool, variant)).sort((a, b) => b.popularity - a.popularity);
}

export function getAppTools() { return getVariantTools("app"); }
export function getPluginTools() { return getVariantTools("plugin"); }

export function getVariantAlternatives(tool: Tool, variant: ProductVariant, limit = 5): Tool[] {
  const categories = getToolCategories(tool);
  return getVariantTools(variant)
    .filter((candidate) => candidate.id !== tool.id && getToolCategories(candidate).some((category) => categories.includes(category)))
    .slice(0, limit);
}

export function getPreferredVariant(tool: Tool): ProductVariant | null {
  const order: ProductVariant[] = ["web", "app", "plugin", "desktop", "api"];
  return order.find((variant) => hasVariantPage(tool, variant)) ?? null;
}

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools";
import { tutorials } from "@/lib/tutorials";
import { glossary } from "@/lib/glossary";
import { getAllScenarios } from "@/lib/scenarios";
import { getAllBestPages } from "@/lib/best-pages";
import { getAppTools, getPluginTools, getVariantTools } from "@/lib/product-variants";

// 生成 /sitemap.xml：覆盖全部静态页 + 动态详情页，便于 Google/Bing 抓取收录
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/choose`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/updates`, lastModified: now, changeFrequency: "daily", priority: 0.75 },
    { url: `${base}/apps`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/plugins`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/web`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/api`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/desktop`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/ranking`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tutorials`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/scenarios`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/best`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${base}/tools/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tutorialPages: MetadataRoute.Sitemap = tutorials.map((t) => ({
    url: `${base}/tutorials/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const appPages: MetadataRoute.Sitemap = getAppTools().map((tool) => ({
    url: `${base}/apps/${tool.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const pluginPages: MetadataRoute.Sitemap = getPluginTools().map((tool) => ({
    url: `${base}/plugins/${tool.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const webPages: MetadataRoute.Sitemap = getVariantTools("web").map((tool) => ({ url: `${base}/web/${tool.id}`, lastModified: now, changeFrequency: "monthly", priority: 0.75 }));
  const apiPages: MetadataRoute.Sitemap = getVariantTools("api").map((tool) => ({ url: `${base}/api/${tool.id}`, lastModified: now, changeFrequency: "monthly", priority: 0.75 }));
  const desktopPages: MetadataRoute.Sitemap = getVariantTools("desktop").map((tool) => ({ url: `${base}/desktop/${tool.id}`, lastModified: now, changeFrequency: "monthly", priority: 0.75 }));

  const glossaryPages: MetadataRoute.Sitemap = glossary.map((g) => ({
    url: `${base}/glossary/${g.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const scenarioPages: MetadataRoute.Sitemap = getAllScenarios().map((s) => ({
    url: `${base}/scenarios/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const bestPages: MetadataRoute.Sitemap = getAllBestPages().map((p) => ({
    url: `${base}/best/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...statics,
    ...toolPages,
    ...appPages,
    ...pluginPages,
    ...webPages,
    ...apiPages,
    ...desktopPages,
    ...tutorialPages,
    ...glossaryPages,
    ...scenarioPages,
    ...bestPages,
  ];
}


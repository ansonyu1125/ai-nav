"use client";

import { useMemo, useState } from "react";
import type { Category, Pricing, Region, Tool } from "@/lib/types";
import { PRICING_LABEL, REGION_LABEL, getToolCategories } from "@/lib/types";
import ToolCard from "./ToolCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

interface ToolsExplorerProps {
  tools: Tool[];
  categories: Category[];
  initial: {
    q: string;
    category: string;
    region: string;
    pricing: string;
    sort: string;
  };
}

export default function ToolsExplorer({
  tools,
  categories,
  initial,
}: ToolsExplorerProps) {
  const { lang } = useLanguage();
  const [q, setQ] = useState(initial.q);
  const [category, setCategory] = useState(initial.category);
  const [region, setRegion] = useState(initial.region);
  const [pricing, setPricing] = useState(initial.pricing);
  const [sort, setSort] = useState(initial.sort);

  const pricingOptions = useMemo(
    () => [
      { value: "all", label: localize(lang, "全部费用", "All pricing") },
      ...(Object.keys(PRICING_LABEL) as Pricing[]).map((p) => ({
        value: p,
        label: localize(lang, PRICING_LABEL[p].zh, PRICING_LABEL[p].en),
      })),
    ],
    [lang],
  );

  const sortOptions = [
    { value: "popularity", label: localize(lang, "热度", "Popular") },
    { value: "score", label: localize(lang, "评分", "Rating") },
    { value: "newest", label: localize(lang, "最新", "Newest") },
  ];

  const regionOptions = useMemo(
    () => [
      { value: "all", label: localize(lang, "全部", "All") },
      ...(Object.keys(REGION_LABEL) as Region[]).map((r) => ({
        value: r,
        label: localize(lang, REGION_LABEL[r].zh, REGION_LABEL[r].en),
      })),
    ],
    [lang],
  );

  const filtered = useMemo(() => {
    let list = tools;

    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((t) =>
        [
          t.name,
          t.nameZh,
          t.description,
          t.descriptionEn,
          ...t.tags,
          ...(t.tagsEn ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }
    if (category !== "all")
      list = list.filter((t) => getToolCategories(t).includes(category));
    if (region !== "all") list = list.filter((t) => t.region === region);
    if (pricing !== "all") list = list.filter((t) => t.pricing === pricing);

    const arr = [...list];
    if (sort === "score") arr.sort((a, b) => b.score - a.score);
    else if (sort === "newest")
      arr.sort((a, b) => (b.releaseYear ?? 0) - (a.releaseYear ?? 0));
    else arr.sort((a, b) => b.popularity - a.popularity);
    return arr;
  }, [tools, q, category, region, pricing, sort]);

  const catName = (c: Category) => localize(lang, c.name, c.nameEn);

  return (
    <div>
      {/* 搜索框 */}
      <div className="rounded-full border border-slate-200 bg-white p-1.5 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
        <div className="flex items-center gap-2">
          <span className="pl-3 text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={localize(
              lang,
              "搜索工具名称、描述或标签…",
              "Search tools by name, description or tag…",
            )}
            className="h-10 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition",
            category === "all"
              ? "bg-indigo-600 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
          )}
        >
          {localize(lang, "全部", "All")}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition",
              category === c.id
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {c.emoji} {catName(c)}
          </button>
        ))}
      </div>

      {/* 地区筛选 */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-slate-400">
          {localize(lang, "地区", "Region")}
        </span>
        {regionOptions.map((r) => (
          <button
            key={r.value}
            onClick={() => setRegion(r.value)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition",
              region === r.value
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* 费用 + 排序 */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {pricingOptions.map((p) => (
            <button
              key={p.value}
              onClick={() => setPricing(p.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                pricing === p.value
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-white p-1 ring-1 ring-slate-200">
          {sortOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => setSort(s.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition",
                sort === s.value
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        {lang === "en" ? (
          <>
            Found{" "}
            <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            tools
          </>
        ) : (
          <>
            {localize(lang, "共找到")}{" "}
            <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            {localize(lang, "款工具")}
          </>
        )}
      </p>

      {/* 结果 */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 font-medium text-slate-700">
            {localize(lang, "没有找到匹配的工具", "No matching tools found")}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {localize(
              lang,
              "试试更换关键词，或清空筛选条件",
              "Try a different keyword or clear the filters",
            )}
          </p>
          <button
            onClick={() => {
              setQ("");
              setCategory("all");
              setRegion("all");
              setPricing("all");
            }}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {localize(lang, "清空筛选", "Clear filters")}
          </button>
        </div>
      )}
    </div>
  );
}

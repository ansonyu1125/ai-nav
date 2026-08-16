"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Tool } from "@/lib/types";
import { categoryMap } from "@/data/categories";
import { formatVisits, formatGrowth, formatPercent, cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { localize, localizeArray } from "@/lib/i18n";
import ToolLogo from "./ToolLogo";

type SortKey = "growth" | "visits" | "trend";

interface Props {
  items: Tool[];
}

// 奖牌配色：金 / 橙 / 紫（对应第 1/2/3 名）
const MEDAL = [
  "bg-amber-400 text-white ring-amber-400",
  "bg-orange-400 text-white ring-orange-400",
  "bg-violet-500 text-white ring-violet-500",
];

export default function TrafficRankingTable({ items }: Props) {
  const { lang } = useLanguage();
  const [sortKey, setSortKey] = useState<SortKey>("growth");
  const [desc, setDesc] = useState(true);

  const valueOf = (t: Tool, k: SortKey): number | null => {
    const tr = t.traffic;
    if (!tr) return null;
    if (k === "growth") return tr.growth ?? null;
    if (k === "visits") return tr.monthlyVisits ?? null;
    return tr.trend ?? null;
  };

  const sorted = useMemo(() => {
    const arr = [...items];
    arr.sort((a, b) => {
      const av = valueOf(a, sortKey);
      const bv = valueOf(b, sortKey);
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return desc ? bv - av : av - bv;
    });
    return arr;
  }, [items, sortKey, desc]);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setDesc((d) => !d);
    else {
      setSortKey(k);
      setDesc(true);
    }
  };

  const th = (
    key: SortKey,
    zh: string,
    en: string,
    align: "right" | "left" = "right",
  ) => {
    const active = sortKey === key;
    return (
      <th
        className={cn(
          "whitespace-nowrap px-4 py-3 text-xs font-semibold text-slate-500 select-none",
          align === "right" ? "text-right" : "text-left",
          "cursor-pointer hover:text-violet-600",
        )}
        onClick={() => toggleSort(key)}
      >
        <span className="inline-flex items-center gap-1">
          {localize(lang, zh, en)}
          <span
            className={cn(
              "text-[10px]",
              active ? "text-violet-600" : "text-slate-300",
            )}
          >
            {active ? (desc ? "▼" : "▲") : "⇅"}
          </span>
        </span>
      </th>
    );
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="w-14 px-3 py-3 text-center text-xs font-semibold text-slate-500">
              {localize(lang, "排行", "Rank")}
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
              {localize(lang, "工具", "Tool")}
            </th>
            {th("visits", "月访问量", "Monthly visits")}
            {th("growth", "增长", "Growth")}
            {th("trend", "增长率", "Growth rate")}
            <th className="hidden px-4 py-3 text-left text-xs font-semibold text-slate-500 lg:table-cell">
              {localize(lang, "介绍", "Description")}
            </th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold text-slate-500 xl:table-cell">
              {localize(lang, "标签", "Tags")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((tool, i) => {
            const tr = tool.traffic;
            const cat = categoryMap[tool.category];
            const catName = localize(lang, cat?.name ?? "", cat?.nameEn);
            const descText = localize(lang, tool.description, tool.descriptionEn);
            const tags = localizeArray(lang, tool.tags, tool.tagsEn).slice(0, 3);
            const rank = i + 1;
            const up = tr && tr.trend != null ? tr.trend >= 0 : null;
            return (
              <tr
                key={tool.id}
                className="border-b border-slate-100 transition last:border-0 hover:bg-violet-50/40"
              >
                {/* 排行 */}
                <td className="px-3 py-3 text-center align-middle">
                  {rank <= 3 ? (
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ring-2",
                        MEDAL[rank - 1],
                      )}
                    >
                      {rank}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-slate-400">
                      {rank}
                    </span>
                  )}
                </td>

                {/* 工具 */}
                <td className="px-4 py-3 align-middle">
                  <Link
                    href={`/tools/${tool.id}`}
                    className="group flex items-center gap-3"
                  >
                    <ToolLogo tool={tool} size="sm" />
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-slate-900 group-hover:text-violet-600">
                        {tool.name}
                      </span>
                      <span className="block truncate text-xs text-slate-400">
                        {catName}
                      </span>
                    </span>
                  </Link>
                </td>

                {/* 月访问量 */}
                <td className="whitespace-nowrap px-4 py-3 text-right align-middle font-medium text-slate-700">
                  {formatVisits(tr?.monthlyVisits, lang)}
                </td>

                {/* 增长（绝对值） */}
                <td
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-right align-middle font-semibold",
                    tr?.growth == null
                      ? "text-slate-300"
                      : tr.growth >= 0
                        ? "text-emerald-600"
                        : "text-rose-600",
                  )}
                >
                  {formatGrowth(tr?.growth, lang)}
                </td>

                {/* 增长率 */}
                <td
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-right align-middle font-semibold",
                    up == null
                      ? "text-slate-300"
                      : up
                        ? "text-emerald-600"
                        : "text-rose-600",
                  )}
                >
                  {tr?.trend != null ? (
                    <>
                      <span className="mr-0.5">{up ? "▲" : "▼"}</span>
                      {formatPercent(tr.trend)}
                    </>
                  ) : (
                    "—"
                  )}
                </td>

                {/* 介绍 */}
                <td className="hidden max-w-[320px] px-4 py-3 align-middle lg:table-cell">
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {descText}
                  </p>
                </td>

                {/* 标签 */}
                <td className="hidden px-4 py-3 align-middle xl:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <div className="py-16 text-center text-sm text-slate-400">
          {localize(lang, "该维度下暂无流量数据", "No traffic data for this view")}
        </div>
      )}
    </div>
  );
}

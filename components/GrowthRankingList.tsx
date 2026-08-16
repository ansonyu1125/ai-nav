"use client";

import Link from "next/link";
import type { Tool } from "@/lib/types";
import { categoryMap } from "@/data/categories";
import { formatGrowth, formatPercent, cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import ToolLogo from "./ToolLogo";

// 奖牌配色：金 / 橙 / 紫
const MEDAL = ["bg-amber-400 text-white", "bg-orange-400 text-white", "bg-violet-500 text-white"];

export default function GrowthRankingList({ items }: { items: Tool[] }) {
  const { lang } = useLanguage();

  return (
    <ol className="space-y-2.5">
      {items.map((tool, i) => {
        const rank = i + 1;
        const tr = tool.traffic;
        const cat = categoryMap[tool.category];
        const catName = localize(lang, cat?.name ?? "", cat?.nameEn);
        const up = tr && tr.trend != null ? tr.trend >= 0 : null;
        return (
          <li key={tool.id}>
            <Link
              href={`/tools/${tool.id}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-violet-300 hover:shadow-sm"
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  rank <= 3 ? MEDAL[rank - 1] : "text-slate-400",
                )}
              >
                {rank}
              </span>
              <ToolLogo tool={tool} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-slate-900">{tool.name}</div>
                <div className="text-xs text-slate-400">{catName}</div>
              </div>
              <div className="shrink-0 text-right">
                <div
                  className={cn(
                    "text-sm font-semibold",
                    tr?.growth == null
                      ? "text-slate-300"
                      : tr.growth >= 0
                        ? "text-emerald-600"
                        : "text-rose-600",
                  )}
                >
                  {formatGrowth(tr?.growth, lang)}
                </div>
                {tr?.trend != null && (
                  <div
                    className={cn(
                      "text-xs font-medium",
                      up ? "text-emerald-600" : "text-rose-600",
                    )}
                  >
                    {up ? "▲" : "▼"} {formatPercent(tr.trend)}
                  </div>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

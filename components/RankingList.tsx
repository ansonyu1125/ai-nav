import Link from "next/link";
import type { Tool } from "@/lib/types";
import { categoryMap } from "@/data/categories";
import { formatScore } from "@/lib/utils";
import ToolLogo from "./ToolLogo";

interface RankingListProps {
  items: Tool[];
  metric?: "score" | "popularity";
}

export default function RankingList({ items, metric = "score" }: RankingListProps) {
  return (
    <ol className="space-y-2.5">
      {items.map((tool, i) => {
        const rank = i + 1;
        const value =
          metric === "popularity" ? tool.popularity : formatScore(tool.score);
        return (
          <li key={tool.id}>
            <Link
              href={`/tools/${tool.id}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-indigo-300 hover:shadow-sm"
            >
              <span
                className={`w-6 shrink-0 text-center text-base font-bold ${
                  rank === 1
                    ? "text-amber-500"
                    : rank === 2
                      ? "text-slate-400"
                      : rank === 3
                        ? "text-amber-700"
                        : "text-slate-300"
                }`}
              >
                {rank}
              </span>
              <ToolLogo tool={tool} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-slate-900">
                  {tool.name}
                </div>
                <div className="text-xs text-slate-400">
                  {categoryMap[tool.category]?.name}
                </div>
              </div>
              <span className="shrink-0 text-sm font-semibold text-amber-500">
                {metric === "popularity" ? (
                  <span className="text-slate-400">🔥 {value}</span>
                ) : (
                  <span>★ {value}</span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

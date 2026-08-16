import Link from "next/link";
import { tools, sortTools } from "@/lib/tools";
import { categories } from "@/data/categories";
import RankingList from "@/components/RankingList";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "排行榜",
};

interface SearchParams {
  category?: string;
  metric?: string;
}

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : "all";
  const metric = sp.metric === "popularity" ? "popularity" : "score";

  const pool = category === "all" ? tools : tools.filter((t) => t.category === category);
  const ranked = sortTools(pool, metric).slice(0, 20);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">排行榜</h1>
        <p className="mt-2 text-slate-600">按评分或热度查看各分类的 AI 工具榜单。</p>
      </div>

      {/* 指标切换 */}
      <div className="flex gap-2">
        {[
          { value: "score", label: "综合评分榜" },
          { value: "popularity", label: "热度榜" },
        ].map((m) => (
          <Link
            key={m.value}
            href={`/ranking?category=${category}&metric=${m.value}`}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition",
              metric === m.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {m.label}
          </Link>
        ))}
      </div>

      {/* 分类切换 */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/ranking?category=all&metric=${metric}`}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition",
            category === "all"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
          )}
        >
          全部
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/ranking?category=${c.id}&metric=${metric}`}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition",
              category === c.id
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {c.emoji} {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        {ranked.length > 0 ? (
          <RankingList items={ranked} metric={metric} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center text-slate-500">
            该分类下暂无工具
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { tools } from "@/lib/tools";
import { categories } from "@/data/categories";
import ToolsExplorer from "@/components/ToolsExplorer";
import { BilingualText } from "@/components/Bilingual";

export const metadata = {
  title: "工具库",
};

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const initial = {
    q: typeof sp.q === "string" ? sp.q : "",
    category: typeof sp.category === "string" ? sp.category : "all",
    region: typeof sp.region === "string" ? sp.region : "all",
    pricing: typeof sp.pricing === "string" ? sp.pricing : "all",
    sort: typeof sp.sort === "string" ? sp.sort : "popularity",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="工具库" en="Tools" />
        </h1>
        <p className="mt-2 text-slate-600">
          <BilingualText
            zh={`浏览全部 ${tools.length} 款 AI 工具，按分类、费用与评分筛选。`}
            en={`Browse all ${tools.length} AI tools, filter by category, pricing and rating.`}
          />
        </p>
      </div>

      <Link
        href="/ranking"
        className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-100"
      >
        <span className="text-sm font-medium text-violet-700">
          📈 <BilingualText zh="AI 月度增长榜" en="AI Monthly Growth Ranking" />
          <span className="ml-2 hidden font-normal text-violet-500 sm:inline">
            <BilingualText
              zh="上月流量增长最快的 AI 工具"
              en="Fastest-growing AI tools last month"
            />
          </span>
        </span>
        <span className="text-violet-400">→</span>
      </Link>

      <ToolsExplorer tools={tools} categories={categories} initial={initial} />
    </div>
  );
}

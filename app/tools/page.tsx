import Link from "next/link";
import { tools } from "@/lib/tools";
import { categories } from "@/data/categories";
import ToolsExplorer from "@/components/ToolsExplorer";
import { BilingualText } from "@/components/Bilingual";
import { ArrowRightIcon } from "@/components/SignalIcon";

export const metadata = {
  title: "AI Tools Directory: Compare 300+ Products",
  description: "Browse and compare 300+ AI tools by use case, pricing, platform, rating, and verified product data.",
  alternates: { canonical: "/tools" },
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
    platform: typeof sp.platform === "string" ? sp.platform : "all",
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
        className="mb-6 flex items-center justify-between gap-3 border border-[#315148] bg-[#0a1815] px-4 py-3 transition hover:bg-[#11231e]"
      >
        <span className="text-sm font-medium text-[#eef4f1]">
          <BilingualText zh="AI 30 天流量变化榜" en="AI 30-day traffic movement" />
          <span className="ml-2 hidden font-normal text-[#9fb3ac] sm:inline">
            <BilingualText
              zh="查看近期流量变化较快的 AI 工具"
              en="Inspect AI tools with notable recent traffic movement"
            />
          </span>
        </span>
        <ArrowRightIcon className="h-4 w-4 text-[#7dd3fc]" />
      </Link>

      <ToolsExplorer tools={tools} categories={categories} initial={initial} />
    </div>
  );
}

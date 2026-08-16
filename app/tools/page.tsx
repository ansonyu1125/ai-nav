import { tools } from "@/lib/tools";
import { categories } from "@/data/categories";
import ToolsExplorer from "@/components/ToolsExplorer";

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
          工具库
        </h1>
        <p className="mt-2 text-slate-600">
          浏览全部 {tools.length} 款 AI 工具，按分类、费用与评分筛选。
        </p>
      </div>
      <ToolsExplorer tools={tools} categories={categories} initial={initial} />
    </div>
  );
}

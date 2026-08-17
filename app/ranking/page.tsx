import Link from "next/link";
import { tools } from "@/lib/tools";
import { getToolCategories } from "@/lib/types";
import { categories } from "@/data/categories";
import TrafficRankingTable from "@/components/TrafficRankingTable";
import DimensionSelect, { type DimensionOption } from "@/components/DimensionSelect";
import { BilingualText } from "@/components/Bilingual";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "AI Tool Rankings by Traffic and Category",
  description: "Explore AI tool rankings by monthly traffic movement, category, region, and acquisition source.",
  alternates: { canonical: "/ranking" },
};

// 统计 top 地区/来源，用于下拉选项（按出现频次降序）
function topRegions(): DimensionOption[] {
  const m = new Map<string, DimensionOption & { count: number }>();
  for (const t of tools) {
    for (const r of t.traffic?.regions ?? []) {
      const key = r.countryEn || r.country;
      const e = m.get(key) || { value: key, zh: r.country, en: r.countryEn, count: 0 };
      e.count++;
      m.set(key, e);
    }
  }
  return [...m.values()].sort((a, b) => b.count - a.count).slice(0, 25);
}

function topSources(): DimensionOption[] {
  const m = new Map<string, DimensionOption & { count: number }>();
  for (const t of tools) {
    for (const s of t.traffic?.sources ?? []) {
      const key = s.nameEn || s.name;
      const e = m.get(key) || { value: key, zh: s.name, en: s.nameEn, count: 0 };
      e.count++;
      m.set(key, e);
    }
  }
  return [...m.values()].sort((a, b) => b.count - a.count);
}

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const tabRaw = typeof sp.tab === "string" ? sp.tab : "growth";
  const tab = ["category", "region", "source"].includes(tabRaw) ? tabRaw : "growth";
  const cat = typeof sp.cat === "string" ? sp.cat : "";
  const region = typeof sp.region === "string" ? sp.region : "";
  const source = typeof sp.source === "string" ? sp.source : "";

  // 按维度过滤
  let pool = tools;
  if (tab === "category" && cat) {
    pool = tools.filter((t) => getToolCategories(t).includes(cat));
  } else if (tab === "region" && region) {
    pool = tools.filter((t) =>
      t.traffic?.regions?.some((r) => (r.countryEn || r.country) === region),
    );
  } else if (tab === "source" && source) {
    pool = tools.filter((t) =>
      t.traffic?.sources?.some((s) => (s.nameEn || s.name) === source),
    );
  }

  const regionOptions = topRegions();
  const sourceOptions = topSources();

  const tabs = [
    { key: "growth", zh: "AI 月榜", en: "Monthly" },
    { key: "category", zh: "AI 分类榜", en: "By category" },
    { key: "region", zh: "AI 地区榜", en: "By region" },
    { key: "source", zh: "AI 来源榜", en: "By source" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* 标题 */}
      <div className="mb-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            <BilingualText zh="AI 月度增长榜" en="AI Monthly Growth Ranking" />
          </h1>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 ring-1 ring-violet-200">
            <BilingualText zh="2026年7月 · 数据每月更新" en="Jul 2026 · Updated monthly" />
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          <BilingualText
            zh="统计上月流量增长最快的 AI 网站，按环比增长量从高到低排列。点击列头可切换排序。"
            en="AI websites ranked by month-over-month traffic growth. Click a column header to re-sort."
          />
        </p>
      </div>

      {/* 维度 tab */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <Link
              key={t.key}
              href={`/ranking?tab=${t.key}`}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition",
                active
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
              )}
            >
              <BilingualText zh={t.zh} en={t.en} />
            </Link>
          );
        })}
      </div>

      {/* 维度筛选下拉 */}
      {tab !== "growth" && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tab === "category" && (
            <>
              <span className="text-sm text-slate-500">
                <BilingualText zh="分类：" en="Category:" />
              </span>
              <DimensionSelect
                tab={tab}
                param="cat"
                value={cat}
                options={categories.map((c) => ({
                  value: c.id,
                  zh: `${c.emoji} ${c.name}`,
                  en: c.nameEn,
                }))}
                allZh="全部分类"
                allEn="All categories"
              />
            </>
          )}
          {tab === "region" && (
            <>
              <span className="text-sm text-slate-500">
                <BilingualText zh="地区：" en="Region:" />
              </span>
              <DimensionSelect
                tab={tab}
                param="region"
                value={region}
                options={regionOptions}
                allZh="全部地区"
                allEn="All regions"
              />
            </>
          )}
          {tab === "source" && (
            <>
              <span className="text-sm text-slate-500">
                <BilingualText zh="流量来源：" en="Traffic source:" />
              </span>
              <DimensionSelect
                tab={tab}
                param="source"
                value={source}
                options={sourceOptions}
                allZh="全部来源"
                allEn="All sources"
              />
            </>
          )}
        </div>
      )}

      {/* 表格 */}
      <div className="mt-6">
        <TrafficRankingTable items={pool} />
      </div>
    </div>
  );
}


import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/data/categories";
import { tools, getFeaturedTools, topTools } from "@/lib/tools";
import { tutorials } from "@/lib/tutorials";
import { glossary } from "@/lib/glossary";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import RankingList from "@/components/RankingList";
import SectionHeading from "@/components/SectionHeading";

export default function HomePage() {
  const featured = getFeaturedTools();
  const hot = topTools("popularity", 8);
  const stats = [
    { label: "收录工具", value: tools.length },
    { label: "工具分类", value: categories.length },
    { label: "AI 教程", value: tutorials.length },
    { label: "术语词条", value: glossary.length },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/70 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            收录全网主流 AI 软件，提供 AI 教程、术语解析与排行榜，帮你快速找到合适的工具。
          </p>
          <SearchBar size="lg" className="mx-auto mt-8 max-w-xl" />

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
                <div className="mt-0.5 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分类 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="按分类浏览"
          subtitle="从你最需要的场景开始，快速定位合适工具"
          href="/tools"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* 精选 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="精选推荐"
          subtitle="口碑与热度兼具的明星工具"
          href="/tools"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>

      {/* 榜单 + 教程 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="热门排行榜"
              subtitle="按热度排名的 TOP 8"
              href="/ranking"
            />
            <RankingList items={hot} metric="popularity" />
          </div>

          <div>
            <SectionHeading
              title="最新教程"
              subtitle="从零开始，快速上手 AI 工具"
              href="/tutorials"
            />
            <div className="space-y-3">
              {tutorials.slice(0, 5).map((t) => (
                <Link
                  key={t.id}
                  href={`/tutorials/${t.id}`}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xl">
                    {t.emoji}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-medium text-slate-900">
                      {t.title}
                    </div>
                    <div className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                      {t.summary}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

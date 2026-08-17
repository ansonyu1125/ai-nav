import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/data/categories";
import {
  tools,
  getFeaturedTools,
  getMobileTools,
  getExtensionTools,
  countByCategory,
} from "@/lib/tools";
import { scenarios } from "@/data/scenarios";
import { tutorials } from "@/lib/tutorials";
import { glossary } from "@/lib/glossary";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import GrowthRankingList from "@/components/GrowthRankingList";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { BilingualText } from "@/components/Bilingual";

export default function HomePage() {
  const featured = getFeaturedTools();
  const mobile = getMobileTools(8);
  const extensions = getExtensionTools(8);
  const trending = tools.filter((t) => t.trending).slice(0, 8);
  const growing = tools
    .filter((t) => t.traffic?.growth != null)
    .sort((a, b) => (b.traffic?.growth ?? 0) - (a.traffic?.growth ?? 0))
    .slice(0, 8);
  const stats = [
    { label: "收录工具", labelEn: "Tools", value: tools.length, emoji: "🧰" },
    { label: "工具分类", labelEn: "Categories", value: categories.length, emoji: "🗂️" },
    { label: "AI 教程", labelEn: "Tutorials", value: tutorials.length, emoji: "📚" },
    { label: "术语词条", labelEn: "Glossary", value: glossary.length, emoji: "📖" },
  ];

  return (
    <div>
      {/* 网站级结构化数据：利于 Google 站内搜索与富结果 */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          potentialAction: {
            "@type": "SearchAction",
            target: `${site.url}/tools?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/70 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-indigo-600 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            <BilingualText
              zh={`已收录 ${tools.length} 款 AI 工具，持续更新`}
              en={`${tools.length} AI tools and counting`}
            />
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            <BilingualText zh={site.tagline} en={site.taglineEn} />
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            <BilingualText
              zh="收录全网主流 AI 软件，提供 AI 教程、术语解析与排行榜，帮你快速找到合适的工具。"
              en="Discover the best AI tools worldwide, with tutorials, a glossary and rankings to help you find the right one fast."
            />
          </p>
          <SearchBar size="lg" className="mx-auto mt-8 max-w-xl" />

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
                  <span className="text-2xl">{s.emoji}</span>
                </div>
                <div className="mt-0.5 text-sm text-slate-500">
                  <BilingualText zh={s.label} en={s.labelEn} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 正在爆火 */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            title="正在爆火"
            titleEn="Hot right now"
            subtitle="编辑甄选，近期最值得关注的 AI 工具"
            subtitleEn="Editor-curated AI tools everyone is talking about"
            href="/ranking"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* AI 手机应用 */}
      {mobile.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            title="AI 手机应用"
            titleEn="AI mobile apps"
            subtitle="随时随地，装在手机里的 AI 神器"
            subtitleEn="The best AI apps in your pocket"
            href="/tools"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mobile.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* AI 浏览器插件 */}
      {extensions.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            title="AI 浏览器插件"
            titleEn="AI browser extensions"
            subtitle="装进浏览器，划词、总结、翻译一步到位"
            subtitleEn="AI extensions that supercharge your browser"
            href="/tools"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {extensions.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* 场景导航 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="我想……"
          titleEn="I want to…"
          subtitle="从需求出发，快速找到对应工具"
          subtitleEn="Start from your goal and find the right tool"
          href="/scenarios"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {scenarios.map((s) => {
            const count = countByCategory(s.category);
            return (
              <Link
                key={s.id}
                href={`/scenarios/${s.id}`}
                className="group flex flex-col items-start gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm"
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-medium text-slate-900 group-hover:text-indigo-600">
                  <BilingualText zh={s.name} en={s.nameEn} />
                </span>
                <span className="text-xs text-slate-400">
                  <BilingualText zh={`${count} 款工具`} en={`${count} tools`} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 榜单 + 教程 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="AI 月度增长榜"
              titleEn="Fastest growing"
              subtitle="上月流量增长最快的 TOP 8"
              subtitleEn="Top 8 by month-over-month growth"
              href="/ranking"
            />
            <GrowthRankingList items={growing} />
          </div>

          <div>
            <SectionHeading
              title="最新教程"
              titleEn="Latest tutorials"
              subtitle="从零开始，快速上手 AI 工具"
              subtitleEn="Get started with AI tools from scratch"
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
                      <BilingualText zh={t.title} en={t.titleEn} />
                    </div>
                    <div className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                      <BilingualText zh={t.summary} en={t.summaryEn} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 分类 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="按分类浏览"
          titleEn="Browse by category"
          subtitle="从你最需要的场景开始，快速定位合适工具"
          subtitleEn="Start from the use case you need and find the right tool fast"
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
          titleEn="Featured picks"
          subtitle="口碑与热度兼具的明星工具"
          subtitleEn="Top tools by reputation and popularity"
          href="/tools"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>
    </div>
  );
}

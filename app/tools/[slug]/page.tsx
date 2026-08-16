import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getTool, getRelatedTools } from "@/lib/tools";
import { categoryMap } from "@/data/categories";
import { PRICING_LABEL } from "@/lib/types";
import { formatScore } from "@/lib/utils";
import PricingBadge from "@/components/PricingBadge";
import RegionBadge from "@/components/RegionBadge";
import ToolCard from "@/components/ToolCard";
import ToolLogo from "@/components/ToolLogo";
import { BilingualText, ZhOnlyText } from "@/components/Bilingual";
import TagList from "@/components/TagList";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const category = categoryMap[tool.category];
  const related = getRelatedTools(tool);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* 面包屑 */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          <BilingualText zh="首页" en="Home" />
        </Link>
        <span className="mx-2">/</span>
        <Link href="/tools" className="hover:text-indigo-600">
          <BilingualText zh="工具库" en="Tools" />
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{tool.name}</span>
      </nav>

      {/* 头部 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <ToolLogo tool={tool} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {tool.name}
              </h1>
              <RegionBadge region={tool.region} />
              <PricingBadge pricing={tool.pricing} />
            </div>
            {tool.nameZh && tool.nameZh !== tool.name && (
              <ZhOnlyText zh={tool.nameZh} className="mt-1 text-slate-500" />
            )}

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
              <BilingualText zh={tool.description} en={tool.descriptionEn} />
            </p>

            <TagList
              zh={tool.tags}
              en={tool.tagsEn}
              className="mt-4 flex flex-wrap gap-2"
              tagClassName="rounded-md bg-slate-100 px-2.5 py-1 text-sm text-slate-600"
            />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                <BilingualText zh="访问官网" en="Visit website" />
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <span className="text-sm text-slate-500">{tool.officialUrl}</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-amber-50 px-5 py-4">
            <span className="text-2xl text-amber-500">★</span>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {formatScore(tool.score)}
              </div>
              <div className="text-xs text-slate-500">
                <BilingualText zh="综合评分" en="Rating" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 详情信息 */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">
            <BilingualText zh="分类" en="Category" />
          </div>
          <div className="mt-1 font-medium text-slate-900">
            {category ? (
              <>
                {category.emoji}{" "}
                <BilingualText zh={category.name} en={category.nameEn} />
              </>
            ) : (
              "—"
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">
            <BilingualText zh="费用" en="Pricing" />
          </div>
          <div className="mt-1 font-medium text-slate-900">
            <BilingualText
              zh={PRICING_LABEL[tool.pricing].zh}
              en={PRICING_LABEL[tool.pricing].en}
            />
            {tool.pricingNote && (
              <BilingualText
                zh={` · ${tool.pricingNote}`}
                en={
                  tool.pricingNoteEn
                    ? ` · ${tool.pricingNoteEn}`
                    : ` · ${tool.pricingNote}`
                }
              />
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">
            <BilingualText zh="热度" en="Popularity" />
          </div>
          <div className="mt-1 font-medium text-slate-900">{tool.popularity}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">
            <BilingualText zh="发布时间" en="Released" />
          </div>
          <div className="mt-1 font-medium text-slate-900">
            {tool.releaseYear ? (
              <BilingualText
                zh={`${tool.releaseYear} 年`}
                en={`${tool.releaseYear}`}
              />
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>

      {/* 相关工具 */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
            <BilingualText zh="同类工具推荐" en="Similar tools" />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

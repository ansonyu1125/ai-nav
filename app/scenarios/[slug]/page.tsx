import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { scenarios, scenarioMap } from "@/data/scenarios";
import { getScenario, getScenarioTools } from "@/lib/scenarios";
import { categoryMap } from "@/data/categories";
import { site } from "@/lib/site";
import CompareTable from "@/components/CompareTable";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";
import { BilingualText } from "@/components/Bilingual";

export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = scenarioMap[slug];
  if (!s) return {};
  const year = new Date().getFullYear();
  return {
    title: `${year} 最佳 ${s.name} AI 工具推荐`,
    description: s.intro,
  };
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getScenario(slug);
  if (!s) notFound();

  const year = new Date().getFullYear();
  const tools = getScenarioTools(s, 8);
  const others = scenarios.filter((x) => x.id !== s.id);
  const category = categoryMap[s.category];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${year} 最佳 ${s.name} AI 工具`,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${site.url}/tools/${t.id}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "场景", item: `${site.url}/scenarios` },
      { "@type": "ListItem", position: 3, name: s.name, item: `${site.url}/scenarios/${s.id}` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* 面包屑 */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          <BilingualText zh="首页" en="Home" />
        </Link>
        <span className="mx-2">/</span>
        <Link href="/scenarios" className="hover:text-indigo-600">
          <BilingualText zh="场景" en="Use cases" />
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">
          <BilingualText zh={s.name} en={s.nameEn} />
        </span>
      </nav>

      {/* 头部 */}
      <header className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{s.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              <BilingualText
                zh={`${year} 最佳 ${s.name} AI 工具`}
                en={`Best ${s.nameEn} AI tools in ${year}`}
              />
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              <BilingualText zh={s.intro} en={s.introEn} />
            </p>
          </div>
        </div>
        {category && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
            {category.emoji}{" "}
            <BilingualText zh={category.name} en={category.nameEn} />
          </div>
        )}
      </header>

      {/* 对比表 */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="工具对比一览" en="At-a-glance comparison" />
        </h2>
        <CompareTable tools={tools} />
      </section>

      {/* 工具列表 */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="推荐工具" en="Recommended tools" />
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      {s.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
            <BilingualText zh="常见问题" en="FAQ" />
          </h2>
          <div className="space-y-4">
            {s.faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-900">
                  <BilingualText zh={f.q} en={f.qEn} />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  <BilingualText zh={f.a} en={f.aEn} />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 其他场景 */}
      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
            <BilingualText zh="其他场景" en="More use cases" />
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((x) => (
              <Link
                key={x.id}
                href={`/scenarios/${x.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                <span>{x.emoji}</span>
                <BilingualText zh={x.name} en={x.nameEn} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />
    </div>
  );
}

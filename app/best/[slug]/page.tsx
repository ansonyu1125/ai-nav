import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBestPage, getAllBestPages } from "@/lib/best-pages";
import { site } from "@/lib/site";
import CompareTable from "@/components/CompareTable";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";
import { BilingualText } from "@/components/Bilingual";

export function generateStaticParams() {
  return getAllBestPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getBestPage(slug);
  if (!data) return {};
  const { page } = data;
  return {
    title: page.titleEn,
    description: page.descriptionEn,
    alternates: { canonical: `/best/${page.slug}` },
    openGraph: {
      title: page.titleEn,
      description: page.descriptionEn,
      url: `${site.url}/best/${page.slug}`,
      type: "article",
    },
  };
}

export default async function BestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getBestPage(slug);
  if (!data) notFound();
  const { page, scenario, tools } = data;
  const others = getAllBestPages().filter((p) => p.slug !== page.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.titleEn,
    description: page.descriptionEn,
    url: `${site.url}/best/${page.slug}`,
    inLanguage: "en",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.titleEn,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${site.url}/tools/${t.id}`,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (scenario?.faqs ?? []).map((f) => ({
      "@type": "Question",
      name: f.qEn,
      acceptedAnswer: { "@type": "Answer", text: f.aEn },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/best` },
      { "@type": "ListItem", position: 3, name: page.titleEn, item: `${site.url}/best/${page.slug}` },
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
        <Link href="/best" className="hover:text-indigo-600">
          <BilingualText zh="指南" en="Guides" />
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">
          <BilingualText zh={page.title} en={page.titleEn} />
        </span>
      </nav>

      {/* 头部 */}
      <header className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        {scenario && (
          <Link
            href={`/scenarios/${scenario.id}`}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline"
          >
            <span aria-hidden>{scenario.emoji}</span>{" "}
            <BilingualText zh="查看场景页" en="View use case page" />
          </Link>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          <BilingualText zh={page.title} en={page.titleEn} />
        </h1>
      </header>

      {/* 长文引言 */}
      <section className="mt-8 max-w-3xl space-y-4">
        {page.intro.map((p, i) => (
          <p key={i} className="leading-relaxed text-slate-700">
            <BilingualText zh={p} en={page.introEn[i]} />
          </p>
        ))}
      </section>

      {/* 对比表 */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="工具对比一览" en="At-a-glance comparison" />
        </h2>
        <CompareTable tools={tools} />
      </section>

      {/* 工具卡片 */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="推荐工具" en="The top picks" />
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>

      {/* 选购指南 */}
      <section className="mt-12 max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="如何挑选" en="How to choose" />
        </h2>
        {page.sections.map((s) => (
          <div key={s.headingEn}>
            <h3 className="text-lg font-semibold text-slate-900">
              <BilingualText zh={s.heading} en={s.headingEn} />
            </h3>
            <p className="mt-2 leading-relaxed text-slate-700">
              <BilingualText zh={s.body} en={s.bodyEn} />
            </p>
          </div>
        ))}
      </section>

      {/* FAQ */}
      {scenario && scenario.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
            <BilingualText zh="常见问题" en="Frequently asked questions" />
          </h2>
          <div className="space-y-4">
            {scenario.faqs.map((f) => (
              <div
                key={f.qEn}
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

      {/* 其他指南 */}
      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
            <BilingualText zh="更多指南" en="More guides" />
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/best/${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                <BilingualText zh={p.title} en={p.titleEn} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />
    </div>
  );
}

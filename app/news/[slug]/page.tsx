import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/news";
import Markdown from "@/components/Markdown";
import LanguageToggle from "@/components/LanguageToggle";
import { BilingualText, BilingualNode } from "@/components/Bilingual";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const others = (await getArticles())
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600">
            <BilingualText zh="首页" en="Home" />
          </Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-indigo-600">
            <BilingualText zh="AI 资讯" en="AI News" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">
            <BilingualText zh={article.title} en={article.titleEn} />
          </span>
        </nav>
        <LanguageToggle />
      </div>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
            {article.source}
          </span>
          <span>{article.publishedAt.slice(0, 10)}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          <BilingualText zh={article.title} en={article.titleEn} />
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          <BilingualText zh={article.summary} en={article.summaryEn} />
        </p>
      </header>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <BilingualNode
          zh={<Markdown content={article.content} />}
          en={
            article.contentEn ? (
              <Markdown content={article.contentEn} />
            ) : undefined
          }
        />
      </article>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
        >
          <BilingualText zh="阅读原文" en="Read original" />
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
        <span className="text-xs text-slate-400">
          <BilingualText zh="来源：" en="Source: " />
          {article.source}
        </span>
      </div>

      {article.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            <BilingualText zh="更多资讯" en="More news" />
          </h2>
          <div className="space-y-3">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={`/news/${a.slug}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium text-slate-900">
                    <BilingualText zh={a.title} en={a.titleEn} />
                  </div>
                  <div className="line-clamp-1 text-sm text-slate-500">
                    <BilingualText zh={a.summary} en={a.summaryEn} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

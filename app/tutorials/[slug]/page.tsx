import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorials, getTutorial } from "@/lib/tutorials";
import Markdown from "@/components/Markdown";
import { BilingualText, BilingualNode } from "@/components/Bilingual";

export function generateStaticParams() {
  return tutorials.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) return {};
  return {
    title: tutorial.title,
    description: tutorial.summary,
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();

  const others = tutorials.filter((t) => t.id !== tutorial.id).slice(0, 3);

  const renderTags = (tags: string[]) => (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500"
        >
          {tag}
        </span>
      ))}
    </>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          <BilingualText zh="首页" en="Home" />
        </Link>
        <span className="mx-2">/</span>
        <Link href="/tutorials" className="hover:text-indigo-600">
          <BilingualText zh="AI 教程" en="AI Tutorials" />
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">
          <BilingualText zh={tutorial.title} en={tutorial.titleEn} />
        </span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
            <BilingualText zh={tutorial.category} en={tutorial.categoryEn} />
          </span>
          <span className="text-sm text-slate-400">{tutorial.date}</span>
          <span className="text-sm text-slate-400">
            ·{" "}
            <BilingualText
              zh={`${tutorial.readMinutes} 分钟`}
              en={`${tutorial.readMinutes} min`}
            />
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {tutorial.emoji}{" "}
          <BilingualText zh={tutorial.title} en={tutorial.titleEn} />
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          <BilingualText zh={tutorial.summary} en={tutorial.summaryEn} />
        </p>
      </header>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <BilingualNode
          zh={<Markdown content={tutorial.content} />}
          en={
            tutorial.contentEn ? (
              <Markdown content={tutorial.contentEn} />
            ) : undefined
          }
        />
      </article>

      <div className="mt-8 flex flex-wrap gap-2">
        <BilingualNode
          zh={renderTags(tutorial.tags)}
          en={
            tutorial.tagsEn && tutorial.tagsEn.length
              ? renderTags(tutorial.tagsEn)
              : undefined
          }
        />
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            <BilingualText zh="继续阅读" en="Continue reading" />
          </h2>
          <div className="space-y-3">
            {others.map((t) => (
              <Link
                key={t.id}
                href={`/tutorials/${t.id}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xl">
                  {t.emoji}
                </span>
                <div className="min-w-0">
                  <div className="truncate font-medium text-slate-900">
                    <BilingualText zh={t.title} en={t.titleEn} />
                  </div>
                  <div className="line-clamp-1 text-sm text-slate-500">
                    <BilingualText zh={t.summary} en={t.summaryEn} />
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

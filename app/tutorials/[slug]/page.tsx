import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorials, getTutorial } from "@/lib/tutorials";
import Markdown from "@/components/Markdown";

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          首页
        </Link>
        <span className="mx-2">/</span>
        <Link href="/tutorials" className="hover:text-indigo-600">
          AI 教程
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{tutorial.title}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
            {tutorial.category}
          </span>
          <span className="text-sm text-slate-400">{tutorial.date}</span>
          <span className="text-sm text-slate-400">· {tutorial.readMinutes} 分钟</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {tutorial.emoji} {tutorial.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">{tutorial.summary}</p>
      </header>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <Markdown content={tutorial.content} />
      </article>

      <div className="mt-8 flex flex-wrap gap-2">
        {tutorial.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
            {tag}
          </span>
        ))}
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-slate-900">继续阅读</h2>
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
                  <div className="truncate font-medium text-slate-900">{t.title}</div>
                  <div className="line-clamp-1 text-sm text-slate-500">{t.summary}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

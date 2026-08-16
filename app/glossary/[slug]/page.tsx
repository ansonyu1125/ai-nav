import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { glossary, getTerm } from "@/lib/glossary";

export function generateStaticParams() {
  return glossary.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) return {};
  return {
    title: term.term,
    description: `${term.term}（${term.english}）：${term.definition.slice(0, 80)}`,
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) notFound();

  const related = (term.related ?? [])
    .map((id) => getTerm(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          首页
        </Link>
        <span className="mx-2">/</span>
        <Link href="/glossary" className="hover:text-indigo-600">
          术语词典
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{term.term}</span>
      </nav>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
          {term.category}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          {term.term}
        </h1>
        <p className="mt-1 font-medium text-slate-400">{term.english}</p>
        <div className="prose mt-6">
          <p>{term.definition}</p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">相关术语</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/glossary/${r.id}`}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                {r.term}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

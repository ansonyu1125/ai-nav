import type { Metadata } from "next";
import Link from "next/link";
import { getAllBestPages } from "@/lib/best-pages";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Best AI Tools Guides 2026",
  description:
    "In-depth guides to the best AI tools of 2026 — video generators, chat assistants and more, with pricing and comparisons.",
};

export default function BestIndexPage() {
  const pages = getAllBestPages();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best AI Tools Guides 2026",
    itemListElement: pages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.titleEn,
      url: `${site.url}/best/${p.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Best AI tools guides
        </h1>
        <p className="mt-2 text-slate-600">
          In-depth comparisons to help you pick the right AI tool, with pricing,
          free tiers and honest trade-offs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/best/${p.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
          >
            <span className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              {p.titleEn}
            </span>
            <span className="mt-1 text-sm text-slate-500">{p.title}</span>
            <span className="mt-3 line-clamp-2 text-sm text-slate-600">
              {p.descriptionEn}
            </span>
          </Link>
        ))}
      </div>

      <JsonLd data={itemListJsonLd} />
    </div>
  );
}

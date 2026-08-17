import type { Metadata } from "next";
import Link from "next/link";
import { scenarios } from "@/data/scenarios";
import { countByCategory } from "@/lib/tools";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { BilingualText } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "AI 工具场景导航",
  description: "按使用场景快速找到合适的 AI 工具：做视频、写代码、做 PPT、写文案、翻译等。",
  alternates: { canonical: "/scenarios" },
};

export default function ScenariosPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI 工具场景导航",
    itemListElement: scenarios.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.intent,
      url: `${site.url}/scenarios/${s.id}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="我想……" en="I want to…" />
        </h1>
        <p className="mt-2 text-slate-600">
          <BilingualText
            zh="从需求出发，快速定位适合的 AI 工具。"
            en="Start from your goal and find the right AI tool fast."
          />
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {scenarios.map((s) => {
          const count = countByCategory(s.category);
          return (
            <Link
              key={s.id}
              href={`/scenarios/${s.id}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              <span className="text-3xl">{s.emoji}</span>
              <span className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                <BilingualText zh={s.intent} en={s.intentEn} />
              </span>
              <span className="mt-1 text-sm text-slate-500">
                <BilingualText zh={`${count} 款工具`} en={`${count} tools`} />
              </span>
            </Link>
          );
        })}
      </div>

      <JsonLd data={itemListJsonLd} />
    </div>
  );
}

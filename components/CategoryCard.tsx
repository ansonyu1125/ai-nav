"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";
import { countByCategory } from "@/lib/tools";
import { useLanguage } from "./LanguageProvider";

export default function CategoryCard({ category }: { category: Category }) {
  const count = countByCategory(category.id);
  const { lang } = useLanguage();
  const name =
    lang === "en" && category.nameEn ? category.nameEn : category.name;
  const desc =
    lang === "en"
      ? category.descriptionEn || `${count} tools`
      : category.description || `${count} 款工具`;

  return (
    <Link
      href={`/tools?category=${category.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
        {category.emoji}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-slate-900 group-hover:text-indigo-600">
          {name}
        </div>
        <div className="truncate text-xs text-slate-400">{desc}</div>
      </div>
      <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
        {count}
      </span>
    </Link>
  );
}

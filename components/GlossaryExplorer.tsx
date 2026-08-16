"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GlossaryTerm } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GlossaryExplorerProps {
  terms: GlossaryTerm[];
  categories: string[];
}

export default function GlossaryExplorer({
  terms,
  categories,
}: GlossaryExplorerProps) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return terms.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (!query) return true;
      return [t.term, t.english, t.definition, t.category]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [terms, q, category]);

  const grouped = useMemo(() => {
    const groups: Array<{ category: string; items: GlossaryTerm[] }> = [];
    for (const cat of categories) {
      const items = filtered.filter((t) => t.category === cat);
      if (items.length > 0) groups.push({ category: cat, items });
    }
    return groups;
  }, [filtered, categories]);

  return (
    <div>
      {/* 搜索框 */}
      <div className="rounded-full border border-slate-200 bg-white p-1.5 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
        <div className="flex items-center gap-2">
          <span className="pl-3 text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索术语，如 RAG、Prompt、Transformer…"
            className="h-10 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition",
            category === "all"
              ? "bg-indigo-600 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
          )}
        >
          全部
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition",
              category === c
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-500">
        共 <span className="font-semibold text-slate-900">{filtered.length}</span> 个词条
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <div className="text-4xl">📚</div>
          <p className="mt-3 font-medium text-slate-700">没有找到相关术语</p>
          <p className="mt-1 text-sm text-slate-500">换个关键词试试</p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {grouped.map((group) => (
            <section key={group.category}>
              <h2 className="mb-3 text-lg font-bold text-slate-900">
                {group.category}
                <span className="ml-2 text-sm font-normal text-slate-400">
                  {group.items.length}
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((term) => (
                  <Link
                    key={term.id}
                    href={`/glossary/${term.id}`}
                    className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600">
                      {term.term}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">{term.english}</div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {term.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLangText } from "./Bilingual";

interface SearchBarProps { placeholder?: string; size?: "lg" | "md"; className?: string; }

export default function SearchBar({ placeholder, size = "md", className }: SearchBarProps) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const defaultPh = useLangText("描述你的任务或输入工具名称", "Describe a task or enter a tool name");
  const submitLabel = useLangText("搜索工具", "Search tools");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/tools?q=${encodeURIComponent(query)}` : "/tools");
  }

  return (
    <form onSubmit={onSubmit} className={className} role="search">
      <div className={`grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-stretch bg-[#f4f4ef] p-1.5 shadow-[0_18px_45px_rgba(0,0,0,.2)] ${size === "lg" ? "min-h-16" : "min-h-12"}`}>
        <label className="flex min-w-0 items-center gap-3 px-3 sm:px-4">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-none stroke-[#496159]" strokeWidth="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>
          <span className="sr-only">{submitLabel}</span>
          <input value={q} onChange={(event) => setQ(event.target.value)} placeholder={placeholder || defaultPh} className="min-w-0 flex-1 bg-transparent text-sm text-[#0b1b17] caret-[#285c4c] placeholder:text-[#63736c] focus:outline-none sm:text-base" />
        </label>
        <button type="submit" className="min-h-11 bg-[#d9f99d] px-4 text-sm font-semibold text-[#07110f] transition hover:bg-[#c8ef78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc] sm:px-6">{submitLabel}</button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  size?: "lg" | "md";
  className?: string;
}

export default function SearchBar({
  placeholder = "搜索 AI 工具，如 ChatGPT、Midjourney…",
  size = "md",
  className,
}: SearchBarProps) {
  const [q, setQ] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/tools?q=${encodeURIComponent(query)}` : "/tools");
  };

  const inputClass =
    size === "lg" ? "h-14 px-5 text-base" : "h-11 px-4 text-sm";

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
        <span className="pl-3 text-slate-400" aria-hidden>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none ${inputClass}`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          搜索
        </button>
      </div>
    </form>
  );
}

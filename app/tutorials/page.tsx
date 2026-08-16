import Link from "next/link";
import { tutorials } from "@/lib/tutorials";

export const metadata = {
  title: "AI 教程",
};

export default function TutorialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">AI 教程</h1>
        <p className="mt-2 text-slate-600">
          从零开始，学会使用 ChatGPT、Midjourney、Cursor 等主流 AI 工具。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((t) => (
          <Link
            key={t.id}
            href={`/tutorials/${t.id}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                {t.emoji}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                {t.category}
              </span>
            </div>
            <h2 className="mt-4 font-semibold leading-snug text-slate-900 group-hover:text-indigo-600">
              {t.title}
            </h2>
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
              {t.summary}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
              <span>{t.readMinutes} 分钟阅读</span>
              <span>·</span>
              <span>{t.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

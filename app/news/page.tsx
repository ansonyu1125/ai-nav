import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/news";

export const metadata: Metadata = {
  title: "AI 资讯",
  description: "每日自动汇总全球 AI 前沿动态，AI 翻译整理成中文资讯。",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          AI 资讯
        </h1>
        <p className="mt-2 text-slate-600">
          每日自动抓取全球 AI 前沿动态，AI 翻译整理成中文资讯。
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-500">
                  {a.source}
                </span>
                <span>{a.publishedAt.slice(0, 10)}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-indigo-600">
                {a.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
                {a.summary}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <div className="text-4xl">📰</div>
          <p className="mt-3 font-medium text-slate-700">暂无资讯</p>
          <p className="mt-1 text-sm text-slate-500">
            部署到 Vercel 并配置定时任务后，这里会自动更新。
          </p>
        </div>
      )}
    </div>
  );
}

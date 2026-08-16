import Link from "next/link";
import { site, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                🧭
              </span>
              <span className="font-bold text-slate-900">{site.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              {site.tagline}。收录全网主流 AI 软件，提供教程、术语解析与排行榜，帮你快速找到合适的工具。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">快速导航</h3>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 transition hover:text-indigo-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">关于本站</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>软件信息与费用可能变动，请以官网为准。</li>
              <li>本站链接均指向各软件官方站点。</li>
              <li>排名与评分为本站整理，仅供参考。</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {site.name} · 仅供学习交流使用
        </div>
      </div>
    </footer>
  );
}

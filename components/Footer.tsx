"use client";

import Link from "next/link";
import { site, nav } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLanguage();
  const pick = (zh: string, en?: string) => localize(lang, zh, en);

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                🧭
              </span>
              <span className="font-bold text-slate-900">
                {pick(site.name, site.nameEn)}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              {pick(
                `${site.tagline}。收录全网主流 AI 软件，提供教程、术语解析与排行榜，帮你快速找到合适的工具。`,
                `${site.taglineEn}. A curated directory of AI tools with tutorials, a glossary and rankings to help you find the right one.`,
              )}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {pick("快速导航", "Quick links")}
            </h3>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 transition hover:text-indigo-600"
                  >
                    {pick(item.label, item.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {pick("关于本站", "About")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>{pick("软件信息与费用可能变动，请以官网为准。", "Info and pricing may change; refer to the official site.")}</li>
              <li>{pick("本站链接均指向各软件官方站点。", "All links point to official sites.")}</li>
              <li>{pick("排名与评分为本站整理，仅供参考。", "Rankings and scores are curated for reference only.")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {pick(site.name, site.nameEn)} ·{" "}
          {pick("仅供学习交流使用", "For learning & exchange only")}
        </div>
      </div>
    </footer>
  );
}

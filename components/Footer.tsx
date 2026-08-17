"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const groups = [
  { zh: "选择产品", en: "Choose a product", links: [["/choose", "帮我选择", "Help me choose"], ["/compare", "工具比较", "Compare tools"], ["/pricing", "价格数据库", "Pricing database"], ["/deals", "优惠与试用", "Deals & trials"]] },
  { zh: "研究与学习", en: "Research & learn", links: [["/best", "最佳工具指南", "Best-tool guides"], ["/tutorials", "实用教程", "Practical tutorials"], ["/scenarios", "按任务浏览", "Browse by task"], ["/glossary", "AI 术语", "AI glossary"]] },
  { zh: "产品情报", en: "Product intelligence", links: [["/updates", "产品变化", "Product changes"], ["/ranking", "排行榜", "Rankings"], ["/web", "网页版", "Web apps"], ["/apps", "手机应用", "Mobile apps"]] },
] as const;

export default function Footer() {
  const { lang } = useLanguage(); const pick = (zh: string, en?: string) => localize(lang, zh, en);
  return <footer className="border-t border-[#29473e] bg-[#07110f] text-[#9fb3ac]"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8"><div className="grid gap-10 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
    <div><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center border border-[#d9f99d] font-mono text-sm font-bold text-[#d9f99d]">A/</span><span className="text-lg font-semibold text-white">{pick(site.name, site.nameEn)}</span></div><p className="mt-5 max-w-sm text-sm leading-7">{pick("从真实任务出发，用可核验的数据帮助你选择合适的 AI 工具。", "A decision platform for AI tools, built around real tasks and verifiable product data.")}</p><p className="mt-5 max-w-sm text-xs leading-6 text-[#769087]">{pick("价格与功能可能变化；官方来源、核验日期和缺失数据都会明确标记。", "Pricing and features change. Official sources, verification dates and missing data are always labeled.")}</p></div>
    {groups.map((group) => <nav key={group.en} aria-label={group.en}><h2 className="font-mono text-xs uppercase text-[#7dd3fc]">{pick(group.zh, group.en)}</h2><ul className="mt-4 space-y-3">{group.links.map(([href, zh, en]) => <li key={href}><Link href={href} className="text-sm hover:text-[#d9f99d]">{pick(zh, en)}</Link></li>)}</ul></nav>)}
  </div><div className="mt-12 flex flex-col gap-3 border-t border-[#29473e] pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} {pick(site.name, site.nameEn)}</span><span className="font-mono uppercase text-[#6f8980]">Independent AI product intelligence</span></div></div></footer>;
}

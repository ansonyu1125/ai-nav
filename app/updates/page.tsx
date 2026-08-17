import type { Metadata } from "next";
import Link from "next/link";
import { productUpdates } from "@/data/product-updates";
import { getTool } from "@/lib/tools";
import { BilingualText } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "AI Product Changes",
  description: "Verified AI tool pricing changes, free-tier changes, major features, closures, and terms updates.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <header className="max-w-3xl"><h1 className="text-4xl font-semibold sm:text-6xl"><BilingualText zh="影响购买决策的产品变化" en="AI product changes that affect buying decisions" /></h1><p className="mt-5 text-lg leading-8 text-[#596761]"><BilingualText zh="只记录价格、免费额度、重大功能、服务关闭和条款变化，不追逐普通 AI 新闻。" en="A focused record of pricing, free-tier, major feature, closure, and terms changes—not a general AI news feed." /></p><nav aria-label="Related research" className="mt-7 flex flex-wrap gap-3"><Link href="/pricing" className="border border-[#285c4c] px-4 py-2 text-sm font-semibold text-[#285c4c]"><BilingualText zh="价格数据库" en="Pricing database" /></Link><Link href="/compare" className="border border-[#9eaaa4] px-4 py-2 text-sm font-semibold text-[#285c4c]"><BilingualText zh="比较产品" en="Compare products" /></Link><Link href="/deals" className="border border-[#9eaaa4] px-4 py-2 text-sm font-semibold text-[#285c4c]"><BilingualText zh="优惠与试用" en="Deals & trials" /></Link></nav></header>
      <div className="mt-10 border-y border-[#9eaaa4]">
        {productUpdates.length > 0 ? productUpdates.map((update) => {
          const tool = getTool(update.toolId);
          return <article key={`${update.toolId}-${update.date}`} className="grid gap-4 border-b border-[#c2cbc5] py-6 sm:grid-cols-[8rem_minmax(0,1fr)_auto]"><time className="font-mono text-sm text-[#68766f]">{update.date}</time><div><div className="text-xs font-semibold uppercase text-[#285c4c]">{update.type}</div><h2 className="mt-1 text-xl font-semibold"><BilingualText zh={update.title} en={update.titleEn} /></h2><p className="mt-2 leading-7 text-[#596761]"><BilingualText zh={update.summary} en={update.summaryEn} /></p></div>{tool && <Link href={`/tools/${tool.id}`} className="font-semibold text-[#285c4c]">{tool.name}</Link>}</article>;
        }) : <div className="py-12 text-[#68766f]"><BilingualText zh="暂无通过来源核验的购买决策变化。" en="No source-verified buying-decision changes have been recorded yet." /></div>}
      </div>
    </div>
  );
}

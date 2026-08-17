import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";
import { BilingualText } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "AI Deals, Free Trials and Discounts",
  description: "Verified AI tool free trials, lifetime deals, student discounts, promo codes, and expiry status.",
  alternates: { canonical: "/deals" },
};

const sections = [
  ["free-trials", "免费试用", "Free Trials"],
  ["deals", "AI 优惠", "AI Deals"],
  ["lifetime", "终身优惠", "Lifetime Deals"],
  ["student", "学生折扣", "Student Discounts"],
  ["promo", "优惠码", "Promo Codes"],
] as const;

export default function DealsPage() {
  const trials = tools.filter((tool) => tool.pricing === "trial");
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold sm:text-6xl"><BilingualText zh="AI 优惠与免费试用" en="AI deals & free trials" /></h1>
        <p className="mt-5 text-lg leading-8 text-[#596761]"><BilingualText zh="只展示带核验状态的优惠。未确认有效期的促销不会标记为可用。" en="Only offers with a visible verification status are shown. Promotions without a confirmed expiry are never presented as active." /></p>
      </header>
      <nav className="mt-9 flex gap-5 overflow-x-auto border-b border-[#c2cbc5]">
        {sections.map(([id, zh, en]) => <a key={id} href={`#${id}`} className="shrink-0 border-b-2 border-transparent py-3 text-sm font-semibold text-[#596761] hover:border-[#285c4c] hover:text-[#285c4c]"><BilingualText zh={zh} en={en} /></a>)}
      </nav>
      <section id="free-trials" className="scroll-mt-28 py-10">
        <h2 className="text-3xl font-semibold"><BilingualText zh="免费试用" en="Free Trials" /></h2>
        <div className="mt-6 divide-y divide-[#c2cbc5] border-y border-[#9eaaa4]">
          {trials.length > 0 ? trials.map((tool) => (
            <div key={tool.id} className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div><h3 className="font-semibold">{tool.name}</h3><p className="mt-1 text-sm text-[#596761]">{tool.freeTrialRequirementsEn ?? "Trial requirements must be confirmed on the official product page."}</p></div>
              <Link href={`/tools/${tool.id}`} className="inline-flex min-h-10 items-center justify-center border border-[#315148] px-4 text-sm font-semibold text-[#285c4c] hover:bg-[#d9f99d]"><BilingualText zh="核验详情" en="Check details" /></Link>
            </div>
          )) : <div className="py-8 text-[#68766f]"><BilingualText zh="当前没有已核验的免费试用。" en="No verified free trials are currently recorded." /></div>}
        </div>
      </section>
      {sections.slice(1).map(([id, zh, en]) => (
        <section key={id} id={id} className="scroll-mt-28 border-t border-[#c2cbc5] py-10">
          <h2 className="text-2xl font-semibold"><BilingualText zh={zh} en={en} /></h2>
          <p className="mt-4 border border-[#c2cbc5] bg-[#e7ebe6] p-5 text-[#596761]"><BilingualText zh="暂无通过有效期核验的优惠。" en="No offer has passed expiry verification for this category yet." /></p>
        </section>
      ))}
    </div>
  );
}

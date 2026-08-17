import Link from "next/link";
import type { Tool } from "@/lib/types";
import { getInternalLinksForTool } from "@/lib/internal-links";
import { BilingualText } from "./Bilingual";

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;

export default function InternalLinkHub({ tool }: { tool: Tool }) {
  const links = getInternalLinksForTool(tool);
  return <section className="border-y border-[#9eaaa4] py-12"><div className="grid gap-8 lg:grid-cols-[.5fr_1.5fr]"><div><h2 className="text-2xl font-semibold"><BilingualText zh="继续研究这款产品" en="Continue your product research" /></h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#596761]"><BilingualText zh="从价格、比较、教程和同类榜单继续，不需要重新搜索。" en="Move into pricing, comparisons, tutorials and category shortlists without starting another search." /></p></div><nav aria-label="Related research paths" className="divide-y divide-[#c2cbc5] border-y border-[#c2cbc5]">{links.map((link) => <Link key={link.href} href={link.href} className="group grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center"><span className="font-semibold group-hover:text-[#285c4c]"><BilingualText zh={link.labelZh} en={link.labelEn} /></span><span className="text-sm leading-6 text-[#68766f]"><BilingualText zh={link.descriptionZh} en={link.descriptionEn} /></span><Arrow /></Link>)}</nav></div></section>;
}

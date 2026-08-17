import Link from "next/link";
import type { Tool } from "@/lib/types";
import type { ProductVariant } from "@/lib/product-variants";
import { categoryMap } from "@/data/categories";
import PricingDatabasePanel from "./PricingDatabasePanel";
import { BilingualText } from "./Bilingual";

export default function DecisionBrief({ tool, variant }: { tool: Tool; variant: ProductVariant }) {
  const category = categoryMap[tool.category];
  const strengthsEn = (tool.featuresEn?.length ? tool.featuresEn : tool.tagsEn ?? tool.tags).slice(0, 3);
  const strengthsZh = (tool.features?.length ? tool.features : tool.tags).slice(0, 3);
  const bestForEn = [category?.nameEn, ...(tool.tagsEn ?? tool.tags).slice(0, 2)].filter(Boolean) as string[];
  const bestForZh = [category?.name, ...tool.tags.slice(0, 2)].filter(Boolean) as string[];
  const notIdeal = [
    tool.pricing === "paid" ? { zh: "必须使用永久免费版本的用户", en: "Users who require a permanently free plan" } : null,
    !tool.platforms?.includes("api") ? { zh: "需要官方 API 深度集成的团队", en: "Teams that require a first-party API integration" } : null,
    !tool.platforms?.some((platform) => ["desktop", "macos", "windows", "linux"].includes(platform)) ? { zh: "需要原生桌面或离线工作流的用户", en: "Users who need a native desktop or offline workflow" } : null,
  ].filter((item): item is { zh: string; en: string } => Boolean(item)).slice(0, 2);
  const checks = [
    { zh: "核对当前免费额度、使用限制和续费价格。", en: "Confirm current free access, usage limits, and renewal pricing." },
    { zh: "商业使用前确认输出内容、素材和模型的授权条款。", en: "Confirm output, asset, and model licensing before commercial use." },
    !tool.availableCountries?.length && !tool.availableCountriesEn?.length ? { zh: "地区可用性尚未核验，请在注册或购买前确认。", en: "Regional availability is not yet verified; confirm it before signing up or paying." } : null,
  ].filter((item): item is { zh: string; en: string } => Boolean(item));

  return <section className="border-y border-[#9eaaa4] py-12">
    <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
      <div><h2 className="text-3xl font-semibold"><BilingualText zh="购买决策摘要" en="Decision brief" /></h2><p className="mt-4 max-w-md leading-7 text-[#596761]"><BilingualText zh="先判断适配度，再检查价格和授权。这里不使用无法核验的营销结论。" en="Check fit first, then pricing and licensing. Unverifiable marketing claims are not used here." /></p><div className="mt-6 flex flex-wrap gap-3"><Link href={`/compare?tools=${tool.id}`} className="inline-flex min-h-11 items-center border border-[#285c4c] px-4 font-semibold text-[#285c4c] hover:bg-white"><BilingualText zh="加入比较" en="Compare options" /></Link><Link href="/choose" className="inline-flex min-h-11 items-center bg-[#d9f99d] px-4 font-semibold text-[#07110f] hover:bg-[#c8ef78]"><BilingualText zh="重新匹配工具" en="Find my best fit" /></Link></div></div>
      <div className="grid gap-px bg-[#c2cbc5] sm:grid-cols-2">
        <div className="bg-white p-5"><h3 className="font-semibold"><BilingualText zh="最适合" en="Best for" /></h3><ul className="mt-4 space-y-2 text-sm leading-6 text-[#33443e]">{bestForEn.map((item, index) => <li key={item}>• <BilingualText zh={bestForZh[index] ?? item} en={item} /></li>)}</ul></div>
        <div className="bg-white p-5"><h3 className="font-semibold"><BilingualText zh="选择理由" en="Why choose it" /></h3>{strengthsEn.length ? <ul className="mt-4 space-y-2 text-sm leading-6 text-[#33443e]">{strengthsEn.map((item, index) => <li key={item}>• <BilingualText zh={strengthsZh[index] ?? item} en={item} /></li>)}</ul> : <p className="mt-4 text-sm text-[#68766f]"><BilingualText zh="具体优势尚未核验。" en="Specific strengths are not yet verified." /></p>}</div>
        <div className="bg-white p-5"><h3 className="font-semibold"><BilingualText zh="可能不适合" en="May not suit" /></h3>{notIdeal.length ? <ul className="mt-4 space-y-2 text-sm leading-6 text-[#33443e]">{notIdeal.map((item) => <li key={item.en}>• <BilingualText zh={item.zh} en={item.en} /></li>)}</ul> : <p className="mt-4 text-sm text-[#68766f]"><BilingualText zh="尚无足够信息给出明确排除条件。" en="There is not enough evidence for a specific exclusion yet." /></p>}</div>
        <div className="bg-white p-5"><h3 className="font-semibold"><BilingualText zh="购买前确认" en="Verify before buying" /></h3><ul className="mt-4 space-y-2 text-sm leading-6 text-[#33443e]">{checks.map((item) => <li key={item.en}>• <BilingualText zh={item.zh} en={item.en} /></li>)}</ul></div>
      </div>
    </div>

    <PricingDatabasePanel toolId={tool.id} variant={variant} />
  </section>;
}

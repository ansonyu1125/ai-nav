import type { Tool } from "@/lib/types";
import type { ProductVariant } from "@/lib/product-variants";
import { variantConfig } from "@/lib/variant-config";
import { BilingualText } from "./Bilingual";
import ProductTypeIcon from "./ProductTypeIcon";
import VariantCard from "./VariantCard";

export default function VariantIndexPage({ tools, variant }: { tools: Tool[]; variant: ProductVariant }) {
  const config = variantConfig[variant];
  return <div className="bg-[#f2f4ef]">
    <header className="border-b border-[#29473e] bg-[#07110f] px-5 py-14 text-white sm:px-8 lg:py-20"><div className="mx-auto max-w-6xl"><div className="flex items-start gap-5">
      <div className="grid h-14 w-14 shrink-0 place-items-center border" style={{ borderColor: config.accent, color: config.accent }}><ProductTypeIcon type={variant} className="h-7 w-7" /></div>
      <div><h1 className="text-4xl font-semibold sm:text-6xl"><BilingualText zh={config.pluralZh} en={config.pluralEn} /></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#b8c8c2]"><BilingualText zh={config.indexDescriptionZh} en={config.indexDescriptionEn} /></p></div>
    </div></div></header>
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8"><div className="mb-7 flex items-center justify-between border-b border-[#9eaaa4] pb-4"><h2 className="text-2xl font-semibold"><BilingualText zh="已核验产品" en="Verified products" /></h2><span className="font-mono text-sm text-[#596761]">{tools.length} records</span></div>
      {tools.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <VariantCard key={tool.id} tool={tool} variant={variant} />)}</div> : <div className="border-y border-[#c2cbc5] py-12 text-[#596761]"><BilingualText zh="暂无拥有专属官方入口的已核验产品。" en="No products with a dedicated verified destination are available yet." /></div>}
    </main>
  </div>;
}

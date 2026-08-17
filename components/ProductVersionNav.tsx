import Link from "next/link";
import type { Tool } from "@/lib/types";
import { hasVariantPage, type ProductVariant } from "@/lib/product-variants";
import { variantConfig } from "@/lib/variant-config";
import ProductTypeIcon from "./ProductTypeIcon";
import { BilingualText } from "./Bilingual";

const order: ProductVariant[] = ["web", "app", "plugin", "desktop", "api"];

export default function ProductVersionNav({ tool, current }: { tool: Tool; current: ProductVariant }) {
  const available = order.filter((variant) => hasVariantPage(tool, variant));
  return <nav aria-label="Product versions" className="flex flex-wrap gap-2">
    {available.map((variant) => {
      const item = variantConfig[variant];
      const active = variant === current;
      return <Link key={variant} href={`/${item.route}/${tool.id}`} aria-current={active ? "page" : undefined} className={`inline-flex min-h-10 items-center gap-2 border px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7dd3fc] ${active ? "border-[#d9f99d] bg-[#d9f99d] text-[#07110f]" : "border-[#315148] bg-[#0a1815] text-[#b8c8c2] hover:border-[#7dd3fc] hover:text-white"}`}>
        <ProductTypeIcon type={variant} className="h-4 w-4" /><BilingualText zh={item.nameZh} en={item.nameEn} />
      </Link>;
    })}
  </nav>;
}

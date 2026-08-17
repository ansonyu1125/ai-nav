import Link from "next/link";
import type { Tool } from "@/lib/types";
import type { ProductVariant } from "@/lib/product-variants";
import { variantConfig } from "@/lib/variant-config";
import ToolLogo from "./ToolLogo";
import ProductTypeIcon from "./ProductTypeIcon";

export default function VariantCard({ tool, variant }: { tool: Tool; variant: ProductVariant }) {
  const config = variantConfig[variant];
  return <Link href={`/${config.route}/${tool.id}`} className="group border border-[#c2cbc5] bg-[#f2f4ef] p-4 transition hover:border-[#285c4c] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]">
    <div className="flex items-start gap-3"><ToolLogo tool={tool} size="md" /><div className="min-w-0 flex-1">
      <div className="flex items-center gap-2"><h3 className="truncate font-semibold text-[#0b1b17]">{tool.name}</h3><ProductTypeIcon type={variant} className="h-4 w-4 shrink-0" /></div>
      <p className="mt-1 text-xs font-semibold uppercase text-[#68766f]">{config.nameEn}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#596761]">{tool.descriptionEn ?? tool.description}</p>
    </div></div>
  </Link>;
}

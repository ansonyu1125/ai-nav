import type { ProductVariant } from "@/lib/product-variants";

export default function ProductTypeIcon({ type, className = "h-5 w-5" }: { type: ProductVariant; className?: string }) {
  if (type === "app") return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="7" y="2.5" width="10" height="19" rx="2" /><path strokeLinecap="round" d="M10 5h4M11 18.5h2" /></svg>;
  if (type === "plugin") return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.5 3v4H5a2 2 0 0 0-2 2v3.5h4a2.5 2.5 0 1 1 0 5H3V21h7v-3.5a2.5 2.5 0 1 1 5 0V21h6v-7h-3.5a2.5 2.5 0 1 1 0-5H21V3h-7v3.5a2.5 2.5 0 1 1-5 0V3h-.5Z" /></svg>;
  if (type === "api") return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>;
  if (type === "desktop") return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="2.5" y="3.5" width="19" height="14" rx="1.5" /><path strokeLinecap="round" d="M8 21h8M12 17.5V21" /></svg>;
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="2.5" y="4" width="19" height="16" rx="1.5" /><path d="M2.5 8h19" /><path strokeLinecap="round" d="M6 6h.01M9 6h.01" /></svg>;
}

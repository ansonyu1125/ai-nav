import { PRICING_LABEL, type Pricing } from "@/lib/types";

const styles: Record<Pricing, string> = {
  free: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  freemium: "bg-blue-50 text-blue-700 ring-blue-600/20",
  paid: "bg-amber-50 text-amber-700 ring-amber-600/20",
  trial: "bg-purple-50 text-purple-700 ring-purple-600/20",
};

export default function PricingBadge({ pricing }: { pricing: Pricing }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[pricing]}`}
    >
      {PRICING_LABEL[pricing]}
    </span>
  );
}

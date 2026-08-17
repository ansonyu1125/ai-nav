"use client";

import { PRICING_LABEL, type Pricing } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const styles: Record<Pricing, string> = {
  free: "border-[#1d8f5a]/30 bg-[#e5f4e9] text-[#146640]",
  freemium: "border-[#208ca0]/30 bg-[#e4f2f2] text-[#176d79]",
  paid: "border-[#a66b1f]/30 bg-[#f5ead5] text-[#815016]",
  trial: "border-[#a66b1f]/30 bg-[#f5ead5] text-[#815016]",
};

export default function PricingBadge({ pricing }: { pricing: Pricing }) {
  const { lang } = useLanguage();
  return (
    <span
      className={`inline-flex h-5 items-center rounded-[3px] border px-1.5 font-mono text-[10px] font-semibold uppercase leading-none ${styles[pricing]}`}
    >
      {localize(lang, PRICING_LABEL[pricing].zh, PRICING_LABEL[pricing].en)}
    </span>
  );
}

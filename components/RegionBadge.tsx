"use client";

import { REGION_LABEL, type Region } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const styles: Record<Region, string> = {
  domestic: "border-[#36776c]/25 bg-[#e7f0eb] text-[#2a6258]",
  overseas: "border-[#208ca0]/30 bg-[#e4f2f2] text-[#176d79]",
};

export default function RegionBadge({ region }: { region: Region }) {
  const { lang } = useLanguage();
  return (
    <span
      className={`inline-flex h-5 items-center rounded-[3px] border px-1.5 font-mono text-[10px] font-semibold uppercase leading-none ${styles[region]}`}
    >
      {localize(lang, REGION_LABEL[region].zh, REGION_LABEL[region].en)}
    </span>
  );
}

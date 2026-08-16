"use client";

import { REGION_LABEL, type Region } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

// 中性「产地」徽章：面向海内外用户，只表产地、不预判访问是否需要梯子。
const styles: Record<Region, string> = {
  domestic: "bg-teal-50 text-teal-700 ring-teal-600/20",
  overseas: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
};

export default function RegionBadge({ region }: { region: Region }) {
  const { lang } = useLanguage();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[region]}`}
    >
      {localize(lang, REGION_LABEL[region].zh, REGION_LABEL[region].en)}
    </span>
  );
}

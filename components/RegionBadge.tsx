"use client";

import type { Region } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

// 徽章直接回答「国内能不能用」：国内工具直接可用，海外工具通常需科学上网。
const label: Record<Region, { zh: string; en: string }> = {
  domestic: { zh: "国内可用", en: "China-accessible" },
  overseas: { zh: "海外 · 需科学上网", en: "Overseas · VPN needed" },
};

const styles: Record<Region, string> = {
  domestic: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  overseas: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

const icon: Record<Region, string> = {
  domestic: "✓",
  overseas: "⚠",
};

export default function RegionBadge({ region }: { region: Region }) {
  const { lang } = useLanguage();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[region]}`}
    >
      <span aria-hidden>{icon[region]}</span>
      {localize(lang, label[region].zh, label[region].en)}
    </span>
  );
}

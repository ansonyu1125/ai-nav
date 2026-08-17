"use client";

import { useLanguage } from "./LanguageProvider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "简" },
  { value: "zhTW", label: "繁" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="inline-flex shrink-0 items-center border border-[#38534b] bg-[#0a1815] p-0.5 text-xs font-semibold" aria-label="Language">
      {OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => setLang(option.value)} aria-pressed={lang === option.value} className={`min-h-8 min-w-9 px-2 transition ${lang === option.value ? "bg-[#d9f99d] text-[#07110f]" : "text-[#94aaa2] hover:text-white"}`}>{option.label}</button>)}
    </div>
  );
}

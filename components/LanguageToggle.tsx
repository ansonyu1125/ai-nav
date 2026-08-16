"use client";

import { useLanguage } from "./LanguageProvider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "zh", label: "简体" },
  { value: "zhTW", label: "繁體" },
  { value: "en", label: "EN" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-white p-0.5 text-sm font-medium">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          className={`rounded-full px-3 py-1 transition ${
            lang === o.value
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

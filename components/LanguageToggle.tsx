"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-white p-0.5 text-sm font-medium">
      <button
        type="button"
        onClick={() => setLang("zh")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "zh"
            ? "bg-indigo-600 text-white"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "en"
            ? "bg-indigo-600 text-white"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        EN
      </button>
    </div>
  );
}

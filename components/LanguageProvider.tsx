"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "zh",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    // 手动选过 → 用上次的选择；否则按浏览器语言判断（简中/繁中/英文）
    const saved = localStorage.getItem("lang");
    if (saved === "zh" || saved === "zhTW" || saved === "en") {
      setLang(saved);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.language) {
      const l = navigator.language.toLowerCase();
      if (/^zh-(tw|hk|mo|hant)/.test(l)) {
        setLang("zhTW");
      } else if (!l.startsWith("zh")) {
        setLang("en");
      }
    }
  }, []);

  function changeLang(l: Lang) {
    setLang(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      // 忽略隐私模式下 localStorage 不可用的情况
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

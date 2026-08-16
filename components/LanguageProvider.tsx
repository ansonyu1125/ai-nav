"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "zh" | "en";

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "zh",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    // 已手动选过 → 用上次的选择；否则按浏览器语言自动判断
    const saved = localStorage.getItem("lang");
    if (saved === "zh" || saved === "en") {
      setLang(saved);
    } else if (
      typeof navigator !== "undefined" &&
      navigator.language &&
      !navigator.language.toLowerCase().startsWith("zh")
    ) {
      setLang("en");
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

"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

const LANGUAGE_EVENT = "ainav-language-change";

function getLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("lang");
  return saved === "zh" || saved === "zhTW" || saved === "en" ? saved : "en";
}

function subscribe(callback: () => void) {
  window.addEventListener(LANGUAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LANGUAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

const LanguageContext = createContext<{ lang: Lang; setLang: (language: Lang) => void }>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLanguage, (): Lang => "en");

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : lang === "zhTW" ? "zh-Hant" : "zh-CN";
  }, [lang]);

  function changeLang(language: Lang) {
    try {
      window.localStorage.setItem("lang", language);
    } finally {
      window.dispatchEvent(new Event(LANGUAGE_EVENT));
    }
  }

  return <LanguageContext.Provider value={{ lang, setLang: changeLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

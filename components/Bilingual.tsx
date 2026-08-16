"use client";

import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import Markdown from "./Markdown";

// 简单文本（标题、摘要、按钮等），按当前语言选简中/繁中/英文
export function BilingualText({
  zh,
  en,
  className,
}: {
  zh: string;
  en?: string;
  className?: string;
}) {
  const { lang } = useLanguage();
  return <span className={className}>{localize(lang, zh, en)}</span>;
}

// 整段 Markdown 正文，按语言选内容并即时做繁简转换
export function BilingualMarkdown({ zh, en }: { zh: string; en?: string }) {
  const { lang } = useLanguage();
  return <Markdown content={localize(lang, zh, en)} />;
}

// 仅在中文（简/繁）下显示的文字，英文下隐藏（如中文名副标题）
export function ZhOnlyText({
  zh,
  className,
}: {
  zh: string;
  className?: string;
}) {
  const { lang } = useLanguage();
  if (lang === "en") return null;
  return <p className={className}>{localize(lang, zh)}</p>;
}

// 在客户端组件里按当前语言取字符串（英文缺失回退中文）
export function useLangText(zh: string, en?: string): string {
  const { lang } = useLanguage();
  return localize(lang, zh, en);
}

"use client";

import type { ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";

// 用于简单文本（标题、摘要、按钮文字等），按当前语言选中文或英文
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
  const text = lang === "en" && en ? en : zh;
  return <span className={className}>{text}</span>;
}

// 用于整段已渲染内容（比如 Markdown 正文），按语言选择渲染结果
export function BilingualNode({
  zh,
  en,
}: {
  zh: ReactNode;
  en?: ReactNode;
}) {
  const { lang } = useLanguage();
  return <>{lang === "en" && en ? en : zh}</>;
}

// 在客户端组件里按当前语言取字符串（英文缺失时回退中文）
export function useLangText(zh: string, en?: string): string {
  const { lang } = useLanguage();
  return lang === "en" && en ? en : zh;
}

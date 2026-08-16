"use client";

import { useLanguage } from "./LanguageProvider";
import { localizeArray } from "@/lib/i18n";

export default function TagList({
  zh,
  en,
  className,
  tagClassName,
}: {
  zh: string[];
  en?: string[];
  className?: string;
  tagClassName?: string;
}) {
  const { lang } = useLanguage();
  const tags = localizeArray(lang, zh, en);
  return (
    <div className={className}>
      {tags.map((tag) => (
        <span key={tag} className={tagClassName}>
          {tag}
        </span>
      ))}
    </div>
  );
}

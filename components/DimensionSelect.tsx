"use client";

import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export interface DimensionOption {
  value: string;
  zh: string;
  en?: string;
}

interface Props {
  tab: string;
  param: string;
  value: string;
  options: DimensionOption[];
  allZh: string;
  allEn?: string;
}

export default function DimensionSelect({
  tab,
  param,
  value,
  options,
  allZh,
  allEn,
}: Props) {
  const router = useRouter();
  const { lang } = useLanguage();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const q = new URLSearchParams({ tab });
    if (v) q.set(param, v);
    router.push(`/ranking?${q.toString()}`);
  };

  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
    >
      <option value="">{localize(lang, allZh, allEn)}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {localize(lang, o.zh, o.en)}
        </option>
      ))}
    </select>
  );
}

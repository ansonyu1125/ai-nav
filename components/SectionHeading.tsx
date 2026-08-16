"use client";

import Link from "next/link";
import { useLangText } from "./Bilingual";

interface SectionHeadingProps {
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  href?: string;
  linkText?: string;
  linkTextEn?: string;
}

export default function SectionHeading({
  title,
  titleEn,
  subtitle,
  subtitleEn,
  href,
  linkText = "查看全部",
  linkTextEn = "View all",
}: SectionHeadingProps) {
  const heading = useLangText(title, titleEn);
  const sub = useLangText(subtitle ?? "", subtitleEn);
  const link = useLangText(linkText, linkTextEn);

  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {heading}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          {link} →
        </Link>
      )}
    </div>
  );
}

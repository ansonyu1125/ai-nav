"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { site, nav, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const renderItem = (item: NavItem, mobile = false) => {
    const label = localize(lang, item.label, item.labelEn);

    if (item.children) {
      if (mobile) {
        return (
          <div key={item.href}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                isActive(item.href)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {label}
            </Link>
            <div className="ml-3 border-l border-slate-200 pl-3">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  {localize(lang, c.label, c.labelEn)}
                </Link>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div key={item.href} className="group relative">
          <Link
            href={item.href}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition",
              isActive(item.href)
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}
          >
            {label}
            <svg
              className="h-3.5 w-3.5 opacity-60 transition group-hover:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
            <div className="w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {localize(lang, c.label, c.labelEn)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={mobile ? () => setOpen(false) : undefined}
        className={cn(
          mobile ? "block rounded-lg px-3 py-2.5 text-sm font-medium" : "rounded-lg px-3 py-2 text-sm font-medium transition",
          isActive(item.href)
            ? "bg-indigo-50 text-indigo-600"
            : mobile
              ? "text-slate-600 hover:bg-slate-100"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white">
            🧭
          </span>
          <span className="text-lg font-bold text-slate-900">
            {localize(lang, site.name, site.nameEn)}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => renderItem(item))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="切换菜单"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
          {nav.map((item) => renderItem(item, true))}
        </div>
      )}
    </header>
  );
}

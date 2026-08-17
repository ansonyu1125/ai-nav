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
                "block px-3 py-2.5 text-sm font-medium",
                isActive(item.href)
                  ? "bg-[#d9f99d] text-[#07110f]"
                  : "text-[#9fb3ac] hover:bg-[#11231e] hover:text-white",
              )}
            >
              {label}
            </Link>
            <div className="ml-3 border-l border-[#315148] pl-3">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-[#8fa69e] hover:bg-[#11231e] hover:text-white"
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
              "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition",
              isActive(item.href)
                ? "bg-[#d9f99d] text-[#07110f]"
                : "text-[#9fb3ac] hover:bg-[#11231e] hover:text-white",
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
            <div className="w-52 border border-[#315148] bg-[#0a1815] p-1.5 shadow-[0_18px_45px_rgba(0,0,0,.32)]">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="block px-3 py-2 text-sm text-[#9fb3ac] transition hover:bg-[#d9f99d] hover:text-[#07110f]"
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
          mobile ? "block px-3 py-2.5 text-sm font-medium" : "px-3 py-2 text-sm font-medium transition",
          isActive(item.href)
            ? "bg-[#d9f99d] text-[#07110f]"
            : mobile
              ? "text-[#9fb3ac] hover:bg-[#11231e] hover:text-white"
              : "text-[#9fb3ac] hover:bg-[#11231e] hover:text-white",
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#29473e] bg-[#07110f] text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-[#d9f99d] font-mono text-sm font-bold text-[#d9f99d]" aria-hidden="true">A/</span>
          <span className="display-brand text-lg font-semibold tracking-normal text-white">
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
            className="inline-flex min-h-10 min-w-10 items-center justify-center p-2 text-[#a9beb7] hover:bg-[#11231e] hover:text-white md:hidden"
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
        <div className="border-t border-[#29473e] bg-[#07110f] px-5 py-3 md:hidden">
          {nav.map((item) => renderItem(item, true))}
        </div>
      )}
    </header>
  );
}

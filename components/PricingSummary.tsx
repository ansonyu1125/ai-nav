"use client";

import type { Tool } from "@/lib/types";
import { summarizePricing } from "@/lib/pricing-summary";
import { localize } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

// 详情页顶部的「费用速览」条：免费额度 + 付费起点，一眼看清要不要花钱。
export default function PricingSummary({ tool }: { tool: Tool }) {
  const { lang } = useLanguage();
  const s = summarizePricing(tool);

  const freeLabel = s.isFree
    ? localize(lang, "完全免费，无需付费", "Completely free")
    : s.hasFree
      ? localize(lang, "有免费额度 / 免费试用", "Free tier / trial available")
      : localize(lang, "无免费额度", "No free tier");

  const freeColor = s.isFree || s.hasFree ? "text-emerald-700" : "text-amber-700";

  return (
    <section className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
            🆓
          </span>
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {localize(lang, "免费额度", "Free tier")}
            </div>
            <div className={`mt-0.5 font-semibold ${freeColor}`}>{freeLabel}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
            💳
          </span>
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {localize(lang, "付费起点", "Paid from")}
            </div>
            <div className="mt-0.5 font-semibold text-slate-900">
              {s.startingPrice
                ? s.startingPrice
                : localize(lang, "定制 / 联系官网", "Custom pricing")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

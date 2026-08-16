"use client";

import type { Tool, PricingTier } from "@/lib/types";
import { PLATFORM_LABEL } from "@/lib/types";
import { cn } from "@/lib/utils";
import { localize, localizeArray, toTraditional } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

interface ToolDetailProps {
  tool: Tool;
  screenshot: string | null;
}

function localizeTiers(
  lang: "zh" | "zhTW" | "en",
  zh?: PricingTier[],
  en?: PricingTier[],
): PricingTier[] {
  const arr = lang === "en" && en && en.length ? en : zh ?? [];
  if (lang === "zhTW") {
    return arr.map((t) => ({
      name: toTraditional(t.name),
      price: toTraditional(t.price),
      note: t.note ? toTraditional(t.note) : undefined,
    }));
  }
  return arr;
}

export default function ToolDetail({ tool, screenshot }: ToolDetailProps) {
  const { lang } = useLanguage();

  const features = localizeArray(lang, tool.features ?? [], tool.featuresEn);
  const advantages = localizeArray(lang, tool.advantages ?? [], tool.advantagesEn);
  const steps = localizeArray(lang, tool.howToUse ?? [], tool.howToUseEn);
  const platforms = tool.platforms ?? [];
  const apiName = localize(lang, tool.apiName ?? "", tool.apiNameEn);
  const tiers = localizeTiers(lang, tool.pricingTiers, tool.pricingTiersEn);

  const Heading = ({ zh, en }: { zh: string; en: string }) => (
    <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
      {localize(lang, zh, en)}
    </h2>
  );

  return (
    <div>
      {/* 主要功能 + 核心优势 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {features.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <Heading zh="主要功能" en="Key features" />
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {advantages.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <Heading zh="核心优势" en="Why choose it" />
            <ul className="space-y-2.5">
              {advantages.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-slate-700">
                  <span className="mt-0.5 text-indigo-500">✦</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* 如何使用 */}
      {steps.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <Heading zh="如何使用" en="How to use" />
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-slate-700">{s}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 使用环境 + API 接口 */}
      {(platforms.length > 0 || apiName) && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <Heading zh="使用环境与接口" en="Platforms & API" />
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => {
                const label = PLATFORM_LABEL[p];
                if (!label) return null;
                return (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                  >
                    <span aria-hidden>{label.icon}</span>
                    {localize(lang, label.zh, label.en)}
                  </span>
                );
              })}
            </div>
          )}
          {apiName && (
            <div className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm">
              <span className="font-medium text-slate-500">
                {localize(lang, "API 接口", "API")}：
              </span>
              <span className="font-semibold text-indigo-700">{apiName}</span>
            </div>
          )}
        </section>
      )}

      {/* 费用详情 */}
      {tiers.length > 0 && (
        <section className="mt-6">
          <Heading zh="费用详情" en="Pricing" />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {tiers.map((tier, i) => (
              <div
                key={`${tier.name}-${i}`}
                className={cn(
                  "flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
                  i > 0 && "border-t border-slate-100",
                )}
              >
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900">{tier.name}</div>
                  {tier.note && (
                    <div className="mt-0.5 text-sm text-slate-500">{tier.note}</div>
                  )}
                </div>
                <div className="shrink-0 text-lg font-bold text-indigo-600">
                  {tier.price}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {localize(
              lang,
              "费用信息仅供参考，最终以官网为准。",
              "Pricing is for reference only; see the official site for current details.",
            )}
          </p>
        </section>
      )}

      {/* 官网收费标准截图 */}
      <section className="mt-6">
        <Heading zh="官网收费标准" en="Official pricing" />
        {screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshot}
            alt={localize(lang, "官网收费标准截图", "Official pricing screenshot")}
            className="w-full rounded-2xl border border-slate-200"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <div className="text-3xl">🧾</div>
            <p className="text-sm text-slate-500">
              {localize(
                lang,
                "官网收费标准截图待补充",
                "Official pricing screenshot coming soon",
              )}
            </p>
          </div>
        )}
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          {localize(lang, "查看官网收费标准", "View official pricing")}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </section>
    </div>
  );
}

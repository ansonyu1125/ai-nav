"use client";

import type { Tool, PricingTier } from "@/lib/types";
import { PLATFORM_LABEL } from "@/lib/types";
import { cn } from "@/lib/utils";
import { localize, localizeArray, toTraditional } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import PricingSummary from "./PricingSummary";
import { ArrowRightIcon } from "./SignalIcon";

interface ToolDetailProps {
  tool: Tool;
  screenshot: string | null;
}

function localizeTiers(
  lang: "zh" | "zhTW" | "en",
  zh?: PricingTier[],
  en?: PricingTier[],
): PricingTier[] {
  const useEn = lang === "en" && !!en && en.length > 0;
  const arr = useEn ? (en as PricingTier[]) : (zh ?? []);
  const conv = (s: string) => (lang === "zhTW" ? toTraditional(s) : s);
  return arr.map((t) => ({
    name: conv(t.name),
    price: conv(t.price),
    note: t.note ? conv(t.note) : undefined,
    features: ((useEn ? t.featuresEn ?? t.features : t.features) ?? []).map(conv),
  }));
}

function formatVisits(n?: number, unit?: string): string {
  if (n == null) return "—";
  if (unit) return `${n.toLocaleString()} ${unit}`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

function DetailHeading({ lang, zh, en }: { lang: "zh" | "zhTW" | "en"; zh: string; en: string }) {
  return (
    <h2 className="mb-4 text-xl font-bold text-slate-900">
      {localize(lang, zh, en)}
    </h2>
  );
}

export default function ToolDetail({ tool, screenshot }: ToolDetailProps) {
  const { lang } = useLanguage();

  const features = localizeArray(lang, tool.features ?? [], tool.featuresEn);
  const advantages = localizeArray(lang, tool.advantages ?? [], tool.advantagesEn);
  const steps = localizeArray(lang, tool.howToUse ?? [], tool.howToUseEn);
  const useCases = localizeArray(lang, tool.useCases ?? [], tool.useCasesEn);
  const platforms = tool.platforms ?? [];
  const platformLinks = tool.platformLinks ?? [];
  const apiName = localize(lang, tool.apiName ?? "", tool.apiNameEn);
  const tiers = localizeTiers(lang, tool.pricingTiers, tool.pricingTiersEn);
  const company = tool.company;
  const traffic = tool.traffic;
  const faqs = (
    lang === "en" && tool.faqsEn && tool.faqsEn.length ? tool.faqsEn : tool.faqs ?? []
  ).map((f) => ({
    q: lang === "zhTW" ? toTraditional(f.q) : f.q,
    a: lang === "zhTW" ? toTraditional(f.a) : f.a,
  }));

  return (
    <div>
      {/* 费用速览 */}
      <PricingSummary tool={tool} />

      {/* 主要功能 + 核心优势 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {features.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <DetailHeading lang={lang} zh="主要功能" en="Key features" />
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
            <DetailHeading lang={lang} zh="核心优势" en="Why choose it" />
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

      {/* 使用案例 */}
      {useCases.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <DetailHeading lang={lang} zh="使用案例" en="Use cases" />
          <ul className="space-y-2.5">
            {useCases.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-slate-700">
                <span className="mt-0.5 text-indigo-500">▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 如何使用 */}
      {steps.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <DetailHeading lang={lang} zh="如何使用" en="How to use" />
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

      {/* 常见问题 */}
      {faqs.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <DetailHeading lang={lang} zh="常见问题" en="FAQ" />
          <div className="space-y-2">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-100 bg-slate-50/60 open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-medium text-slate-800">
                  {f.q}
                  <span className="text-slate-400 transition group-open:rotate-45">＋</span>
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 使用环境 + API 接口 */}
      {(platforms.length > 0 || apiName) && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <DetailHeading lang={lang} zh="使用环境与接口" en="Platforms & API" />
          {platforms.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {platforms.map((p) => {
                const label = PLATFORM_LABEL[p];
                if (!label) return null;
                const link = platformLinks.find((l) => l.platform === p);
                if (link) {
                  const storeName =
                    lang === "en" && link.nameEn ? link.nameEn : link.name ?? "";
                  return (
                    <a
                      key={p}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <span className="flex min-w-0 items-center gap-2 text-sm text-slate-700">
                        <span aria-hidden>{label.icon}</span>
                        <span className="font-medium">
                          {localize(lang, label.zh, label.en)}
                        </span>
                        {storeName && (
                          <span className="truncate text-slate-400">· {storeName}</span>
                        )}
                      </span>
                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-indigo-500 transition group-hover:translate-x-0.5" />
                    </a>
                  );
                }
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
          <DetailHeading lang={lang} zh="费用详情" en="Pricing" />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {tiers.map((tier, i) => (
              <div
                key={`${tier.name}-${i}`}
                className={cn("px-5 py-4", i > 0 && "border-t border-slate-100")}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold text-slate-900">{tier.name}</div>
                  <div className="shrink-0 text-lg font-bold text-indigo-600">
                    {tier.price}
                  </div>
                </div>
                {tier.note && (
                  <div className="mt-0.5 text-sm text-slate-500">{tier.note}</div>
                )}
                {tier.features && tier.features.length > 0 && (
                  <ul className="mt-2.5 space-y-1.5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="mt-0.5 text-indigo-500">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
        <DetailHeading lang={lang} zh="官网收费标准" en="Official pricing" />
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

      {/* 数据分析 */}
      <section className="mt-6">
        <DetailHeading lang={lang} zh="数据分析" en="Traffic & analytics" />
        {traffic &&
        (traffic.monthlyVisits != null ||
          traffic.sources?.length ||
          traffic.regions?.length ||
          traffic.keywords?.length) ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
              {traffic.monthlyVisits != null && (
                <div>
                  <div className="text-sm text-slate-500">
                    {localize(lang, "月访问量（估算）", "Monthly visits (est.)")}
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {formatVisits(traffic.monthlyVisits, traffic.visitsUnit)}
                  </div>
                  {traffic.trend != null && (
                    <div
                      className={cn(
                        "mt-1 text-sm font-medium",
                        traffic.trend >= 0 ? "text-emerald-600" : "text-rose-600",
                      )}
                    >
                      {traffic.trend >= 0 ? "▲" : "▼"} {Math.abs(traffic.trend)}%
                    </div>
                  )}
                </div>
              )}
              {traffic.savedCount != null && (
                <div>
                  <div className="text-sm text-slate-500">
                    {localize(lang, "收藏数", "Saved")}
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {traffic.savedCount.toLocaleString()}
                  </div>
                </div>
              )}
              {traffic.rank != null && (
                <div>
                  <div className="text-sm text-slate-500">
                    {localize(lang, "目录排名", "Directory rank")}
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    #{traffic.rank}
                  </div>
                </div>
              )}
            </div>

            {traffic.sources && traffic.sources.length > 0 && (
              <div className="mt-6">
                <div className="mb-2 text-sm font-medium text-slate-700">
                  {localize(lang, "流量来源", "Traffic sources")}
                </div>
                <div className="space-y-2">
                  {traffic.sources.map((s) => (
                    <div key={s.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-slate-600">
                          {localize(lang, s.name, s.nameEn)}
                        </span>
                        <span className="font-medium text-slate-900">{s.percent}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{ width: `${Math.min(100, s.percent)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {traffic.regions && traffic.regions.length > 0 && (
              <div className="mt-6">
                <div className="mb-2 text-sm font-medium text-slate-700">
                  {localize(lang, "地理位置分布", "Top regions")}
                </div>
                <div className="space-y-2">
                  {traffic.regions.map((r) => (
                    <div key={r.country}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-slate-600">
                          {localize(lang, r.country, r.countryEn)}
                        </span>
                        <span className="font-medium text-slate-900">{r.percent}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-400"
                          style={{ width: `${Math.min(100, r.percent)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {traffic.keywords && traffic.keywords.length > 0 && (
              <div className="mt-6">
                <div className="mb-2 text-sm font-medium text-slate-700">
                  {localize(lang, "热门关键词", "Popular keywords")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {traffic.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {traffic.updatedAt && (
              <div className="mt-5 text-xs text-slate-400">
                {localize(
                  lang,
                  `数据更新时间：${traffic.updatedAt}（估算值，仅供参考）`,
                  `Data updated ${traffic.updatedAt} (estimates, for reference only)`,
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <div className="text-3xl">📊</div>
            <p className="max-w-md text-sm text-slate-500">
              {localize(
                lang,
                "流量数据分析待补充（待接入 Apify 等真实统计源）",
                "Traffic analytics coming soon",
              )}
            </p>
          </div>
        )}
      </section>

      {/* 公司信息 */}
      {company && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <DetailHeading lang={lang} zh="公司信息" en="Company" />
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500">
                {localize(lang, "公司名称", "Company")}
              </dt>
              <dd className="mt-0.5 font-medium text-slate-900">
                {localize(lang, company.name, company.nameEn)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">
                {localize(lang, "地理位置", "Location")}
              </dt>
              <dd className="mt-0.5 font-medium text-slate-900">
                {localize(lang, company.location, company.locationEn)}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {(company.officialUrl || company.loginUrl || company.signupUrl) && (
              <>
                {company.officialUrl && (
                  <a
                    href={company.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                  >
                    {localize(lang, "公司官网", "Website")}
                  </a>
                )}
                {company.loginUrl && (
                  <a
                    href={company.loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    {localize(lang, "登录", "Log in")}
                  </a>
                )}
                {company.signupUrl && (
                  <a
                    href={company.signupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    {localize(lang, "注册", "Sign up")}
                  </a>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
}


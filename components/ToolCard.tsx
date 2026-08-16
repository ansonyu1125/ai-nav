"use client";

import Link from "next/link";
import type { Tool } from "@/lib/types";
import { formatScore } from "@/lib/utils";
import { summarizePricing } from "@/lib/pricing-summary";
import { useLanguage } from "./LanguageProvider";
import { localize, localizeArray } from "@/lib/i18n";
import PricingBadge from "./PricingBadge";
import RegionBadge from "./RegionBadge";
import ToolLogo from "./ToolLogo";

export default function ToolCard({ tool }: { tool: Tool }) {
  const { lang } = useLanguage();
  const desc = localize(lang, tool.description, tool.descriptionEn);
  const tags = localizeArray(lang, tool.tags, tool.tagsEn);
  const pricing = summarizePricing(tool);

  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <ToolLogo tool={tool} size="md" />
        <div className="flex items-center gap-1.5">
          <RegionBadge region={tool.region} />
          <PricingBadge pricing={tool.pricing} />
        </div>
      </div>

      <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-indigo-600">
        {tool.name}
      </h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
        {desc}
      </p>

      {/* 价格速览：免费 / 付费起点 */}
      <div className="mt-3 flex flex-wrap items-center gap-x-1.5 text-xs font-medium">
        {pricing.isFree ? (
          <span className="text-emerald-600">
            {localize(lang, "完全免费", "Free")}
          </span>
        ) : (
          <>
            {pricing.hasFree && (
              <span className="text-emerald-600">
                {localize(lang, "免费可用", "Free tier")}
              </span>
            )}
            <span className="text-slate-700">
              {pricing.startingPrice ?? localize(lang, "定制 / 联系官网", "Custom")}
            </span>
          </>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-500">
          <span aria-hidden>★</span>
          {formatScore(tool.score)}
        </span>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import type { Tool } from "@/lib/types";
import { formatScore, formatPercent, cn } from "@/lib/utils";
import { summarizePricing } from "@/lib/pricing-summary";
import { useLanguage } from "./LanguageProvider";
import { localize, localizeArray } from "@/lib/i18n";
import PricingBadge from "./PricingBadge";
import RegionBadge from "./RegionBadge";
import ToolLogo from "./ToolLogo";
import { getToolFitLabels } from "@/lib/tool-fit";

export default function ToolCard({ tool }: { tool: Tool }) {
  const { lang } = useLanguage();
  const desc = localize(lang, tool.description, tool.descriptionEn);
  const tags = localizeArray(lang, tool.tags, tool.tagsEn);
  const pricing = summarizePricing(tool);
  const fitLabels = getToolFitLabels(tool);

  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group flex min-w-0 flex-col border border-[#b9c5be] bg-[#f4f5f0] p-5 transition hover:border-[#285c4c] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285c4c]"
    >
      <div className="flex items-start justify-between">
        <ToolLogo tool={tool} size="md" />
        <div className="flex items-center gap-1.5">
          <RegionBadge region={tool.region} />
          <PricingBadge pricing={tool.pricing} />
        </div>
      </div>

      <h3 className="mt-4 flex items-center gap-1.5 font-semibold text-[#0b1b17] group-hover:text-[#285c4c]">
        <span className="truncate">{tool.name}</span>
        {tool.verified && (
          <span
            title={localize(lang, "官方认证", "Verified")}
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center bg-[#285c4c] text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
          </span>
        )}
      </h3>
      {tool.model && (
        <div className="mt-0.5 text-xs font-medium text-[#356b5a]">
          {localize(lang, tool.model, tool.modelEn)}
        </div>
      )}
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-[#5f6e68]">
        {desc}
      </p>

      {/* 价格速览：免费 / 付费起点 */}
      <div className="mt-3 flex flex-wrap items-center gap-x-1.5 text-xs font-medium">
        {pricing.isFree ? (
          <span className="text-[#287459]">
            {localize(lang, "完全免费", "Free")}
          </span>
        ) : (
          <>
            {pricing.hasFree && (
              <span className="text-[#287459]">
                {localize(lang, "免费可用", "Free tier")}
              </span>
            )}
            <span className="text-[#263832]">
              {pricing.startingPrice ?? localize(lang, "定制 / 联系官网", "Custom")}
            </span>
          </>
        )}
        {tool.lastChecked && (
          <span className="ml-auto text-[#718078]">
            {localize(lang, `更新 ${tool.lastChecked}`, `Updated ${tool.lastChecked}`)}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {fitLabels.map((label) => (
            <span
              key={label.en}
              className="border border-[#9fb0a7] bg-[#edf1ec] px-2 py-0.5 text-[11px] font-semibold text-[#285c4c]"
            >
              {localize(lang, label.zh, label.en)}
            </span>
          ))}
          {tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="bg-[#e1e7e1] px-2 py-0.5 text-xs text-[#52635c]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {tool.traffic?.trend != null && (
            <span
              title={localize(lang, "上月环比增长", "Month-over-month growth")}
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold",
                tool.traffic.trend >= 0 ? "text-[#287459]" : "text-[#b44a43]",
              )}
            >
              {tool.traffic.trend >= 0 ? "▲" : "▼"}
              {formatPercent(tool.traffic.trend)}
            </span>
          )}
          <span className="flex items-center gap-1 font-mono text-sm font-semibold text-[#8a6615]">
            <span aria-hidden>★</span>
            {formatScore(tool.score)}
          </span>
        </div>
      </div>
    </Link>
  );
}

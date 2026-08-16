"use client";

import Link from "next/link";
import type { Tool } from "@/lib/types";
import { PLATFORM_LABEL } from "@/lib/types";
import { summarizePricing } from "@/lib/pricing-summary";
import { formatScore } from "@/lib/utils";
import { localize } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import ToolLogo from "./ToolLogo";

// 结构化对比表：免费额度 / 付费起点 / 平台 / 评分 —— 语义化 <table>，利于搜索引擎与 AI 引擎提取。
export default function CompareTable({ tools }: { tools: Tool[] }) {
  const { lang } = useLanguage();

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-medium">
              {localize(lang, "工具", "Tool")}
            </th>
            <th className="px-4 py-3 font-medium">
              {localize(lang, "免费额度", "Free tier")}
            </th>
            <th className="px-4 py-3 font-medium">
              {localize(lang, "付费起点", "Paid from")}
            </th>
            <th className="px-4 py-3 font-medium">
              {localize(lang, "平台", "Platforms")}
            </th>
            <th className="px-4 py-3 font-medium">
              {localize(lang, "评分", "Rating")}
            </th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => {
            const p = summarizePricing(tool);
            const platforms = (tool.platforms ?? []).slice(0, 3);
            return (
              <tr
                key={tool.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/tools/${tool.id}`}
                    className="flex items-center gap-2.5 font-medium text-slate-900 hover:text-indigo-600"
                  >
                    <ToolLogo tool={tool} size="sm" />
                    <span>{tool.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {p.isFree ? (
                    <span className="font-medium text-emerald-600">
                      {localize(lang, "完全免费", "Free")}
                    </span>
                  ) : p.hasFree ? (
                    <span className="font-medium text-emerald-600">
                      {localize(lang, "免费额度", "Free tier")}
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      {localize(lang, "无", "None")}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">
                  {p.startingPrice ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {platforms.map((pk) => {
                      const l = PLATFORM_LABEL[pk];
                      if (!l) return null;
                      return (
                        <span
                          key={pk}
                          title={localize(lang, l.zh, l.en)}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs"
                        >
                          {l.icon}
                        </span>
                      );
                    })}
                    {platforms.length === 0 && (
                      <span className="text-slate-400">—</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <span aria-hidden>★</span>
                    {formatScore(tool.score)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

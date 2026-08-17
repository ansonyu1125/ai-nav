"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BilingualText } from "./Bilingual";

export interface ComparisonTool {
  id: string;
  name: string;
  pricing: string;
  pricingNote: string;
  score: number;
  popularity: number;
  platforms: string[];
  tags: string[];
  features: string[];
  limitations: string[];
}

function difficulty(tool: ComparisonTool) {
  const text = [...tool.tags, ...tool.features].join(" ");
  if (/api|developer|workflow|professional/i.test(text)) return "Intermediate";
  return "Beginner-friendly";
}

function syncComparisonUrl(ids: string[]) {
  const url = new URL(window.location.href);
  if (ids.length) url.searchParams.set("tools", ids.join(",")); else url.searchParams.delete("tools");
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function bestFor(tool: ComparisonTool) {
  return tool.tags.slice(0, 3).join(", ") || "General use";
}

export default function ComparisonBuilder({ tools, initialIds = [] }: { tools: ComparisonTool[]; initialIds?: string[] }) {
  const defaults = ["chatgpt", "claude", "gemini"].filter((id) => tools.some((tool) => tool.id === id));
  const initial = [...new Set([...initialIds.filter((id) => tools.some((tool) => tool.id === id)), ...defaults])].slice(0, 3);
  const [selected, setSelected] = useState<string[]>(initial);
  useEffect(() => { syncComparisonUrl(selected); }, [selected]);
  const compared = useMemo(() => selected.map((id) => tools.find((tool) => tool.id === id)).filter((tool): tool is ComparisonTool => Boolean(tool)), [selected, tools]);

  function updateSlot(index: number, id: string) {
    const next = [...selected];
    next[index] = id;
    const unique = [...new Set(next)].filter(Boolean).slice(0, 4);
    setSelected(unique);
    syncComparisonUrl(unique);
  }

  const rows = [
    ["价格", "Pricing", (tool: ComparisonTool) => tool.pricingNote || tool.pricing],
    ["免费额度", "Free access", (tool: ComparisonTool) => tool.pricing === "free" ? "Free" : tool.pricing === "freemium" || tool.pricing === "trial" ? "Available" : "Not recorded"],
    ["使用难度", "Ease of use", difficulty],
    ["输出能力", "Output capability", (tool: ComparisonTool) => tool.features.slice(0, 2).join("; ") || "Not documented"],
    ["商业授权", "Commercial licensing", () => "Verify current plan terms"],
    ["支持平台", "Supported platforms", (tool: ComparisonTool) => tool.platforms.join(", ") || "Web"],
    ["最适合", "Best for", bestFor],
    ["主要限制", "Main limitations", (tool: ComparisonTool) => tool.limitations.slice(0, 2).join("; ") || "Not documented"],
    ["综合评分", "Overall score", (tool: ComparisonTool) => `${tool.score.toFixed(1)} / 10`],
  ] as const;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <label key={index} className="block">
            <span className="mb-2 block font-mono text-xs uppercase text-[#68766f]">Tool {index + 1}</span>
            <select value={selected[index] ?? ""} onChange={(event) => updateSlot(index, event.target.value)} className="min-h-12 w-full border border-[#9eaaa4] bg-white px-3 font-semibold text-[#0b1b17] focus:border-[#285c4c] focus:outline-none">
              <option value="">{index < 2 ? "Select a tool" : "Optional"}</option>
              {tools.map((tool) => <option key={tool.id} value={tool.id}>{tool.name}</option>)}
            </select>
          </label>
        ))}
      </div>

      {compared.length >= 2 ? (
        <div className="mt-8 overflow-x-auto border border-[#9eaaa4]">
          <table className="min-w-[760px] w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-[#07110f] text-white">
              <tr>
                <th className="w-44 p-4"><BilingualText zh="比较项目" en="Criteria" /></th>
                {compared.map((tool) => <th key={tool.id} className="p-4 text-base"><Link href={`/tools/${tool.id}`} className="hover:text-[#d9f99d]">{tool.name}</Link></th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([zh, en, value]) => (
                <tr key={en} className="border-t border-[#c2cbc5] align-top">
                  <th className="bg-[#e7ebe6] p-4 font-semibold"><BilingualText zh={zh} en={en} /></th>
                  {compared.map((tool) => <td key={tool.id} className="max-w-xs p-4 leading-6 text-[#33443e]">{value(tool)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 border-y border-[#c2cbc5] py-10 text-[#68766f]"><BilingualText zh="至少选择两款工具。" en="Select at least two tools to compare." /></div>
      )}
    </>
  );
}

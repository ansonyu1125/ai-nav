"use client";

import { useMemo, useState } from "react";
import type { ModelComparisonRecord } from "@/data/models";
import { BilingualText } from "./Bilingual";

export default function ModelComparisonBuilder({ models }: { models: ModelComparisonRecord[] }) {
  const [selected, setSelected] = useState<string[]>(models.slice(0, 3).map((model) => model.id));
  const compared = useMemo(() => selected.map((id) => models.find((model) => model.id === id)).filter((model): model is ModelComparisonRecord => Boolean(model)), [models, selected]);

  function updateSlot(index: number, id: string) {
    setSelected((current) => {
      const next = [...current];
      if (!id) { next.splice(index, 1); return next; }
      if (next.some((value, currentIndex) => value === id && currentIndex !== index)) return current;
      next[index] = id;
      return next.slice(0, 4);
    });
  }

  const rows = [
    ["提供商", "Provider", (model: ModelComparisonRecord) => model.provider],
    ["模型家族", "Model family", (model: ModelComparisonRecord) => model.family],
    ["使用入口", "Access", (model: ModelComparisonRecord) => model.access],
    ["输入模态", "Input modalities", (model: ModelComparisonRecord) => model.inputs.join(", ")],
    ["输出类型", "Output types", (model: ModelComparisonRecord) => model.outputs.join(", ")],
    ["推理能力", "Reasoning", (model: ModelComparisonRecord) => model.reasoning],
    ["工具调用", "Tool use", (model: ModelComparisonRecord) => model.toolUse],
    ["开放权重", "Open weights", (model: ModelComparisonRecord) => model.openWeights],
    ["部署方式", "Deployment", (model: ModelComparisonRecord) => model.deployment],
    ["上下文与价格", "Context & pricing", () => "Check current official documentation"],
    ["最适合", "Best for", (model: ModelComparisonRecord) => model.bestFor],
    ["主要限制", "Main limitations", (model: ModelComparisonRecord) => model.limitations],
  ] as const;

  return <>
    <div className="mb-6 border-y border-[#9eaaa4] bg-[#e7ebe6] px-4 py-3 text-sm leading-6 text-[#33443e]"><BilingualText zh="模型变化很快。上下文窗口、API 价格和地区可用性请通过表格中的官方资料再次确认。" en="Models change quickly. Reconfirm context limits, API pricing, and regional availability in the official documentation linked below." /></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map((index) => <label key={index} className="block"><span className="mb-2 block font-mono text-xs uppercase text-[#68766f]">Model {index + 1}</span><select value={selected[index] ?? ""} onChange={(event) => updateSlot(index, event.target.value)} className="min-h-12 w-full border border-[#9eaaa4] bg-white px-3 font-semibold text-[#0b1b17] focus:border-[#285c4c] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]"><option value="">{index < 2 ? "Select a model" : "Optional"}</option>{models.map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}</select></label>)}</div>
    {compared.length >= 2 ? <div className="mt-8 overflow-x-auto border border-[#9eaaa4]"><table className="w-full min-w-[820px] border-collapse bg-white text-left text-sm"><thead className="bg-[#07110f] text-white"><tr><th className="w-44 p-4"><BilingualText zh="比较项目" en="Criteria" /></th>{compared.map((model) => <th key={model.id} className="p-4 text-base"><a href={model.officialUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-[#7dd3fc] underline-offset-4 hover:text-[#d9f99d]">{model.name}</a></th>)}</tr></thead><tbody>{rows.map(([zh, en, value]) => <tr key={en} className="border-t border-[#c2cbc5] align-top"><th className="bg-[#e7ebe6] p-4 font-semibold"><BilingualText zh={zh} en={en} /></th>{compared.map((model) => <td key={model.id} className="max-w-xs p-4 leading-6 text-[#33443e]">{value(model)}</td>)}</tr>)}</tbody></table></div> : <div className="mt-8 border-y border-[#c2cbc5] py-10 text-[#68766f]"><BilingualText zh="至少选择两个模型。" en="Select at least two models to compare." /></div>}
  </>;
}

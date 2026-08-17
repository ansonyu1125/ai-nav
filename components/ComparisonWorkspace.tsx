"use client";

import { useState } from "react";
import type { ModelComparisonRecord } from "@/data/models";
import ComparisonBuilder, { type ComparisonTool } from "./ComparisonBuilder";
import ModelComparisonBuilder from "./ModelComparisonBuilder";
import { BilingualText } from "./Bilingual";

export default function ComparisonWorkspace({ tools, models, initialToolIds = [] }: { tools: ComparisonTool[]; models: ModelComparisonRecord[]; initialToolIds?: string[] }) {
  const [mode, setMode] = useState<"tools" | "models">("tools");
  return <section aria-label="Comparison type">
    <div className="mb-8 inline-grid grid-cols-2 border border-[#315148] bg-[#07110f] p-1" role="group" aria-label="Comparison type">
      <button type="button" aria-pressed={mode === "tools"} onClick={() => setMode("tools")} className={`min-h-11 px-5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#7dd3fc] ${mode === "tools" ? "bg-[#d9f99d] text-[#07110f]" : "text-[#c8d5d0] hover:bg-[#17332c]"}`}><BilingualText zh="工具比较" en="Compare tools" /></button>
      <button type="button" aria-pressed={mode === "models"} onClick={() => setMode("models")} className={`min-h-11 px-5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#7dd3fc] ${mode === "models" ? "bg-[#d9f99d] text-[#07110f]" : "text-[#c8d5d0] hover:bg-[#17332c]"}`}><BilingualText zh="模型比较" en="Compare models" /></button>
    </div>
    {mode === "tools" ? <ComparisonBuilder tools={tools} initialIds={initialToolIds} /> : <ModelComparisonBuilder models={models} />}
  </section>;
}

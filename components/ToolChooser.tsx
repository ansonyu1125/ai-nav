"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BilingualText } from "./Bilingual";

export interface ChooserTool {
  id: string;
  name: string;
  category: string;
  categories: string[];
  pricing: "free" | "freemium" | "paid" | "trial";
  score: number;
  popularity: number;
  region: "domestic" | "overseas";
  tags: string[];
  description: string;
}

const tasks = [
  ["video", "视频", "Video"],
  ["image", "图片", "Images"],
  ["writing", "写作与营销", "Writing & marketing"],
  ["code", "编程", "Coding"],
  ["office", "办公", "Office"],
  ["search", "搜索与研究", "Search & research"],
] as const;

export default function ToolChooser({ tools }: { tools: ChooserTool[] }) {
  const [task, setTask] = useState("video");
  const [use, setUse] = useState<"personal" | "team">("personal");
  const [freeRequired, setFreeRequired] = useState(true);
  const [budget, setBudget] = useState<"0" | "20" | "plus">("0");
  const [commercial, setCommercial] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    return tools
      .map((tool) => {
        let fit = tool.categories.includes(task) || tool.category === task ? 60 : 0;
        if (freeRequired && (tool.pricing === "free" || tool.pricing === "freemium")) fit += 18;
        if (!freeRequired && tool.pricing !== "free") fit += 5;
        if (budget === "0" && tool.pricing === "free") fit += 12;
        if (budget === "20" && tool.pricing !== "paid") fit += 6;
        if (use === "team" && tool.tags.some((tag) => /team|collab|enterprise|workspace/i.test(tag))) fit += 8;
        if (commercial && tool.tags.some((tag) => /commercial|marketing|business|brand/i.test(tag))) fit += 8;
        fit += tool.score * 1.2 + tool.popularity / 20;
        if (tool.region === "overseas") fit += 15;
        return { tool, fit };
      })
      .filter((item) => item.fit >= 60)
      .sort((a, b) => b.fit - a.fit)
      .slice(0, 3);
  }, [tools, task, use, freeRequired, budget, commercial]);

  return (
    <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
      <form onSubmit={(event) => { event.preventDefault(); setShowResults(true); }} className="border border-[#315148] bg-[#0a1815] p-5 text-white sm:p-7">
        <fieldset>
          <legend className="font-semibold"><BilingualText zh="你想完成什么？" en="What do you want to accomplish?" /></legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {tasks.map(([id, zh, en]) => <button key={id} type="button" onClick={() => setTask(id)} className={`min-h-11 border px-3 text-left text-sm ${task === id ? "border-[#d9f99d] bg-[#d9f99d] font-semibold text-[#07110f]" : "border-[#315148] text-[#b8c8c2] hover:border-[#7dd3fc]"}`}><BilingualText zh={zh} en={en} /></button>)}
          </div>
        </fieldset>
        <fieldset className="mt-7">
          <legend className="font-semibold"><BilingualText zh="使用方式" en="Who will use it?" /></legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {([["personal", "个人", "Personal"], ["team", "团队", "Team"]] as const).map(([id, zh, en]) => <button key={id} type="button" onClick={() => setUse(id)} className={`min-h-11 border px-3 text-sm ${use === id ? "border-[#d9f99d] bg-[#d9f99d] font-semibold text-[#07110f]" : "border-[#315148] text-[#b8c8c2]"}`}><BilingualText zh={zh} en={en} /></button>)}
          </div>
        </fieldset>
        <label className="mt-7 flex min-h-11 items-center justify-between border-y border-[#315148] py-3">
          <span><BilingualText zh="必须有免费版本" en="A free version is required" /></span>
          <input type="checkbox" checked={freeRequired} onChange={(event) => setFreeRequired(event.target.checked)} className="h-5 w-5 accent-[#d9f99d]" />
        </label>
        <fieldset className="mt-7">
          <legend className="font-semibold"><BilingualText zh="每月预算" en="Monthly budget" /></legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {([["0", "$0"], ["20", "≤ $20"], ["plus", "$20+"]] as const).map(([id, label]) => <button key={id} type="button" onClick={() => setBudget(id)} className={`min-h-10 border px-2 text-sm ${budget === id ? "border-[#7dd3fc] text-[#7dd3fc]" : "border-[#315148] text-[#b8c8c2]"}`}>{label}</button>)}
          </div>
        </fieldset>
        <label className="mt-7 flex min-h-11 items-center justify-between border-y border-[#315148] py-3">
          <span><BilingualText zh="需要商业使用" en="Commercial use required" /></span>
          <input type="checkbox" checked={commercial} onChange={(event) => setCommercial(event.target.checked)} className="h-5 w-5 accent-[#d9f99d]" />
        </label>
        <button className="mt-7 min-h-12 w-full bg-[#d9f99d] px-5 font-semibold text-[#07110f] hover:bg-white">
          <BilingualText zh="推荐 3 款工具" en="Recommend 3 tools" />
        </button>
      </form>

      <section aria-live="polite">
        <h2 className="text-3xl font-semibold text-[#0b1b17]"><BilingualText zh="你的推荐结果" en="Your shortlist" /></h2>
        {!showResults ? (
          <div className="mt-6 border-y border-[#c2cbc5] py-12 text-[#68766f]"><BilingualText zh="完成左侧选择后生成推荐。" en="Complete the questions to generate a shortlist." /></div>
        ) : (
          <div className="mt-6 divide-y divide-[#c2cbc5] border-y border-[#9eaaa4]">
            {results.map(({ tool }, index) => (
              <article key={tool.id} className="grid gap-4 py-6 sm:grid-cols-[2rem_minmax(0,1fr)_auto]">
                <span className="font-mono text-xs text-[#68766f]">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#596761]">{tool.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#285c4c]">
                    {tool.pricing === "free" || tool.pricing === "freemium"
                      ? <BilingualText zh="符合你的任务，并提供免费的开始方式。" en="Matches your task and includes a free way to start." />
                      : <BilingualText zh="符合你的任务，并在能力和采用度方面表现较强。" en="Matches your task and ranks strongly for capability and adoption." />}
                  </p>
                </div>
                <Link href={`/tools/${tool.id}`} className="inline-flex min-h-10 items-center justify-center border border-[#315148] px-4 text-sm font-semibold text-[#285c4c] hover:bg-[#d9f99d]">
                  <BilingualText zh="查看详情" en="View details" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

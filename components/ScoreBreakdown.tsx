import type { Tool } from "@/lib/types";
import { BilingualText } from "./Bilingual";

export default function ScoreBreakdown({ tool }: { tool: Tool }) {
  const score = tool.scoreBreakdown;
  const metrics = score ? [
    ["易用性", "Ease of use", score.easeOfUse],
    ["输出质量", "Output quality", score.outputQuality],
    ["性价比", "Value for money", score.valueForMoney],
    ["功能完整度", "Features", score.features],
    ["支持与可靠性信号", "Support & reliability signals", score.support],
  ] as const : [];
  const recordBased = score?.methodologyVersion.includes("record-based");

  return <section className="border-y border-[#9eaaa4] py-10">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div><h2 className="text-2xl font-semibold"><BilingualText zh="评分拆解" en="Score breakdown" /></h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#596761]"><BilingualText zh={recordBased ? "五维评分基于当前产品记录、价格模式、平台覆盖、核验状态和编辑评分计算，不代表实验室基准测试。" : "编辑评测按统一 10 分制记录，综合分由下面的五个维度共同构成。"} en={recordBased ? "The five dimensions use the current product record, pricing model, platform coverage, verification status, and editorial rating. They are not laboratory benchmarks." : "Editorial reviews use a consistent 10-point rubric; the overall score is backed by the five dimensions below."} /></p></div>
      {score && <div className="shrink-0 border border-[#285c4c] bg-[#d9f99d] px-5 py-3 text-[#07110f]"><div className="font-mono text-3xl font-semibold tabular-nums">{score.overall.toFixed(1)}</div><div className="text-xs font-semibold uppercase"><BilingualText zh="结构化综合分" en="Structured overall" /></div></div>}
    </div>

    {score ? <>
      <div className="mt-6 grid gap-px bg-[#c2cbc5] sm:grid-cols-2 lg:grid-cols-5">{metrics.map(([zh, en, value]) => <div key={en} className="bg-[#e7ebe6] p-4"><div className="font-mono text-2xl font-semibold tabular-nums">{value.toFixed(1)}</div><div className="mt-1 text-xs font-semibold uppercase text-[#596761]"><BilingualText zh={zh} en={en} /></div></div>)}</div>
      <div className="mt-4 flex flex-col gap-2 text-xs leading-5 text-[#68766f] sm:flex-row sm:items-center sm:justify-between"><span>METHOD {score.methodologyVersion} · {score.reviewedAt}</span><span><BilingualText zh="支持分衡量官方渠道、平台覆盖与资料可靠性，不代表客服响应速度。" en="Support measures official channels, platform coverage, and record reliability—not response time." /></span></div>
    </> : <div className="mt-6 border border-[#c2cbc5] bg-[#e7ebe6] p-5 text-[#596761]"><BilingualText zh="该工具尚未完成多维评分，当前综合分不作为完整购买建议。" en="This tool has not completed the multi-dimensional score; its current overall rating is not a complete buying recommendation." /></div>}
  </section>;
}

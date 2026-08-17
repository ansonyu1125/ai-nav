import Link from "next/link";
import { getTool } from "@/lib/tools";
import { videoDecisionPicks } from "@/data/video-vertical";
import { BilingualText } from "./Bilingual";
import ToolLogo from "./ToolLogo";
import { ArrowRightIcon } from "./SignalIcon";

export default function VideoDecisionDesk() {
  const picks = videoDecisionPicks
    .map((pick) => ({ pick, tool: getTool(pick.toolId) }))
    .filter((item): item is { pick: (typeof videoDecisionPicks)[number]; tool: NonNullable<ReturnType<typeof getTool>> } => Boolean(item.tool));

  return (
    <section className="mt-12 border-y border-[#9eaaa4] py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#0b1b17]">
            <BilingualText zh="先按任务选择" en="Choose by the job first" />
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#596761]">
            <BilingualText
              zh="“最佳”取决于你要交付什么。下面的选择基于工作流适配，不是简单按总分排序。"
              en="The best tool depends on what you need to ship. These picks prioritize workflow fit, not a single overall score."
            />
          </p>
        </div>
        <Link href="/scenarios/video" className="inline-flex items-center gap-2 font-semibold text-[#285c4c] hover:text-[#0b1b17]">
          <BilingualText zh="查看全部视频工具" en="Browse all video tools" />
          <ArrowRightIcon />
        </Link>
      </div>

      <div className="mt-7 divide-y divide-[#c2cbc5] border-y border-[#9eaaa4]">
        {picks.map(({ pick, tool }) => (
          <div key={tool.id} className="grid gap-4 py-5 sm:grid-cols-[minmax(12rem,.8fr)_minmax(0,1.2fr)_auto] sm:items-center">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase text-[#287459]">
                <BilingualText zh={pick.labelZh} en={pick.label} />
              </div>
              <div className="mt-1 font-semibold text-[#0b1b17]">
                <BilingualText zh={pick.jobZh} en={pick.job} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ToolLogo tool={tool} size="sm" />
              <div>
                <div className="font-semibold">{tool.name}</div>
                <p className="mt-1 text-sm leading-6 text-[#596761]">
                  <BilingualText zh={pick.reasonZh} en={pick.reason} />
                </p>
              </div>
            </div>
            <Link href={`/tools/${tool.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#315148] px-3 text-sm font-semibold text-[#285c4c] hover:bg-[#d9f99d]">
              <BilingualText zh="查看详情" en="View details" />
              <ArrowRightIcon />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

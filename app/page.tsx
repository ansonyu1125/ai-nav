import Link from "next/link";
import { site } from "@/lib/site";
import { tools, getFeaturedTools, getToolsByCategory, countByCategory } from "@/lib/tools";
import { scenarios } from "@/data/scenarios";
import { tutorials } from "@/lib/tutorials";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import ToolLogo from "@/components/ToolLogo";
import JsonLd from "@/components/JsonLd";
import { BilingualText } from "@/components/Bilingual";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/SignalIcon";

const primaryScenarios = ["video", "writing", "code", "image", "office", "search"];
const popularToolIds = ["chatgpt", "claude", "gemini", "deepseek", "midjourney"];

export default function HomePage() {
  const featured = getFeaturedTools().slice(0, 6);
  const popularTools = popularToolIds
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));
  const taskRoutes = scenarios.filter((scenario) => primaryScenarios.includes(scenario.id));
  const popularByCategory = new Map(
    taskRoutes.map((scenario) => [
      scenario.category,
      getToolsByCategory(scenario.category)
        .sort((a, b) => b.popularity - a.popularity || b.score - a.score)
        .slice(0, 3),
    ]),
  );

  return (
    <div className="overflow-x-clip bg-[#f2f4ef]">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.nameEn, url: site.url, potentialAction: { "@type": "SearchAction", target: `${site.url}/tools?q={search_term_string}`, "query-input": "required name=search_term_string" } }} />

      <section className="signal-field relative overflow-hidden border-b border-[#244139] bg-[#07110f] text-[#f4f4ef]">
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
          <div className="signal-route signal-route-a" />
          <div className="signal-route signal-route-b" />
          <div className="signal-node signal-node-a" />
          <div className="signal-node signal-node-b" />
          <div className="signal-node signal-node-c" />
        </div>
        <div className="relative mx-auto grid min-h-[660px] max-w-7xl gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)] lg:items-center lg:gap-16 lg:pb-20 lg:pt-20">
          <div className="max-w-3xl">
            <h1 className="max-w-[12ch] text-balance text-5xl font-semibold leading-[.98] tracking-normal sm:text-6xl lg:text-[5.25rem]"><BilingualText zh="找到真正适合你工作的 AI 工具。" en="Find the AI tool that fits the work." /></h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[#b8c8c2] sm:text-xl"><BilingualText zh="从真实任务出发，比较价格、能力和使用限制。我们整理信号，你负责做决定。" en="Start with a real task. Compare pricing, capability, and limitations. We organize the signals so you can decide with confidence." /></p>
            <SearchBar size="lg" className="mt-10 max-w-2xl" />
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#8fa69e]">
              <span><BilingualText zh="热门任务" en="Popular tasks" /></span>
              {taskRoutes.slice(0, 4).map((scenario) => <Link key={scenario.id} href={`/scenarios/${scenario.id}`} className="border-b border-[#41645a] pb-0.5 text-[#d9e5df] transition hover:border-[#d9f99d] hover:text-[#d9f99d]"><BilingualText zh={scenario.name} en={scenario.nameEn} /></Link>)}
            </div>
          </div>

          <aside className="signal-console self-end border border-[#315148] bg-[#0a1815]/95 p-5 shadow-[0_24px_60px_rgba(0,0,0,.28)] lg:self-center" aria-label="Live market signals">
            <div className="flex items-center justify-between border-b border-[#29473e] pb-4"><div className="text-sm font-medium text-[#c9d6d1]"><BilingualText zh="热门 AI 工具" en="Popular AI tools" /></div><span className="h-2.5 w-2.5 bg-[#d9f99d]" /></div>
            <div className="divide-y divide-[#1d3730]">
              {popularTools.map((tool, index) => <Link key={tool.id} href={`/tools/${tool.id}`} className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 py-4"><span className="font-mono text-xs text-[#5f7b72]">0{index + 1}</span><span className="min-w-0"><span className="block truncate font-medium text-[#eef4f1] group-hover:text-[#d9f99d]">{tool.name}</span><span className="mt-0.5 block truncate text-xs text-[#839b93]">{tool.modelEn ?? tool.model ?? tool.tagsEn?.[0] ?? tool.tags[0]}</span></span><span className="font-mono text-sm font-semibold tabular-nums text-[#d9f99d]">{tool.score.toFixed(1)}<span className="text-[10px] text-[#839b93]">/10</span></span></Link>)}
            </div>
            <Link href="/ranking" className="mt-3 flex min-h-11 items-center justify-between border-t border-[#29473e] pt-4 text-sm font-semibold text-[#7dd3fc] hover:text-white"><BilingualText zh="打开完整信号榜" en="Open the full signal board" /><ArrowRightIcon /></Link>
          </aside>
        </div>
      </section>

      <section className="border-b border-[#cbd3cd] bg-[#e7ebe6]"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#cbd3cd] px-5 sm:px-8 lg:grid-cols-4">{[[tools.length, "Tools indexed", "收录工具"], ["USD", "Pricing normalized", "价格统一"], ["3", "Languages", "支持语言"], ["Dated", "Source records", "资料有时间标记"]].map(([value, en, zh]) => <div key={en} className="px-4 py-6 first:pl-0 lg:px-7"><div className="font-mono text-xl font-semibold tabular-nums text-[#0b1b17]">{value}</div><div className="mt-1 text-xs uppercase text-[#5f6e68]"><BilingualText zh={String(zh)} en={String(en)} /></div></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
        <div><h2 className="max-w-[12ch] text-4xl font-semibold leading-tight tracking-normal text-[#0b1b17] sm:text-5xl"><BilingualText zh="从任务开始，而不是从品牌开始。" en="Start with the job, not the brand." /></h2><p className="mt-5 max-w-md text-base leading-7 text-[#56635e]"><BilingualText zh="告诉我们你要完成什么，再查看经过整理的候选工具。" en="Tell us what you need to accomplish, then inspect a focused shortlist with the facts that matter." /></p><Link href="/scenarios" className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-[#0b1b17] font-semibold text-[#0b1b17] hover:text-[#356b5a]"><BilingualText zh="浏览全部使用场景" en="Browse every use case" /> <ArrowRightIcon /></Link></div>
        <div className="border-t border-[#9eaaa4]">
          {taskRoutes.map((scenario, index) => {
            const categoryTools = popularByCategory.get(scenario.category) ?? [];
            return (
              <div key={scenario.id} className="group grid min-h-24 grid-cols-[2rem_minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-[#c2cbc5] py-4 transition hover:bg-[#e7ebe6] sm:grid-cols-[2.5rem_minmax(12rem,1fr)_auto_6rem_auto] sm:gap-4 sm:px-4">
                <span className="font-mono text-xs text-[#78857f]">0{index + 1}</span>
                <Link href={`/scenarios/${scenario.id}`} className="min-w-0 py-2">
                  <span className="block text-lg font-semibold text-[#0b1b17] group-hover:text-[#285c4c]"><BilingualText zh={scenario.intent} en={scenario.intentEn} /></span>
                  <span className="mt-1 hidden text-sm text-[#68766f] sm:block"><BilingualText zh={scenario.name} en={scenario.nameEn} /></span>
                </Link>
                <div className="flex shrink-0 -space-x-px" aria-label={`Popular tools for ${scenario.nameEn}`}>
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      title={tool.name}
                      aria-label={`Open ${tool.name} details`}
                      className="relative block transition hover:z-10 hover:-translate-y-1 focus-visible:z-10"
                    >
                      <ToolLogo tool={tool} size="sm" />
                    </Link>
                  ))}
                </div>
                <span className="hidden font-mono text-xs uppercase text-[#68766f] sm:block">{countByCategory(scenario.category)} tools</span>
                <Link href={`/scenarios/${scenario.id}`} aria-label={`Browse ${scenario.nameEn} tools`} className="grid h-10 w-10 place-items-center text-[#285c4c] hover:bg-[#d9f99d]">
                  <ArrowUpRightIcon className="h-5 w-5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div></section>

      <section className="bg-[#dfe5df] py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="flex flex-col gap-5 border-b border-[#9eaaa4] pb-7 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-4xl font-semibold tracking-normal text-[#0b1b17] sm:text-5xl"><BilingualText zh="经过核验的选择" en="Verified picks" /></h2><p className="mt-3 max-w-2xl text-[#596761]"><BilingualText zh="基于适用场景、价格和产品成熟度筛选，而不是谁付费更多。" en="Selected for fit, pricing clarity, and product maturity, never for who pays more." /></p></div><Link href="/tools" className="inline-flex min-h-11 items-center gap-3 font-semibold text-[#214f40] hover:text-[#0b1b17]"><BilingualText zh="探索全部工具" en="Explore all tools" /> <ArrowRightIcon /></Link></div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{featured.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><h2 className="text-4xl font-semibold tracking-normal text-[#0b1b17] sm:text-5xl"><BilingualText zh="先了解，再决定。" en="Understand before you choose." /></h2><p className="mt-5 max-w-md leading-7 text-[#596761]"><BilingualText zh="指南负责解释选择逻辑，工具页负责提供最新事实。" en="Guides explain the decision. Tool pages keep the underlying facts current." /></p></div><div className="divide-y divide-[#c2cbc5] border-y border-[#9eaaa4]">{tutorials.slice(0, 4).map((tutorial) => <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`} className="group grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><h3 className="text-xl font-semibold text-[#0b1b17] group-hover:text-[#285c4c]"><BilingualText zh={tutorial.title} en={tutorial.titleEn} /></h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#65736d]"><BilingualText zh={tutorial.summary} en={tutorial.summaryEn} /></p></div><span className="inline-flex items-center gap-2 text-[#285c4c]"><BilingualText zh="阅读" en="Read" /><ArrowRightIcon /></span></Link>)}</div></div></section>

      <section className="bg-[#07110f] px-5 py-16 text-[#eef4f1] sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="max-w-2xl text-3xl font-semibold tracking-normal sm:text-4xl"><BilingualText zh="不确定从哪里开始？直接告诉我们你的任务。" en="Not sure where to start? Search the job you need done." /></h2><p className="mt-3 text-[#9db1aa]"><BilingualText zh="尝试“无水印视频”“房地产文案”或“免费会议记录”。" en="Try “video without watermark,” “real estate copy,” or “free meeting notes.”" /></p></div><Link href="/tools" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#d9f99d] px-6 font-semibold text-[#07110f] transition hover:bg-white"><BilingualText zh="打开工具搜索" en="Open tool search" /></Link></div></section>
    </div>
  );
}


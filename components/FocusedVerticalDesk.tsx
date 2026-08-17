import Link from "next/link";
import { getTool } from "@/lib/tools";
import { BilingualText } from "./Bilingual";
import ToolLogo from "./ToolLogo";
import { ArrowRightIcon } from "./SignalIcon";

const verticals = {
  "ai-writing-tools": {
    titleZh: "按写作任务选择",
    titleEn: "Choose by writing workflow",
    picks: [
      ["jasper", "营销团队", "Marketing teams", "品牌内容与营销工作流", "Brand content and campaign workflows"],
      ["copyai", "销售与增长", "Sales & growth", "批量营销和销售文案", "Repeatable sales and marketing copy"],
      ["grammarly", "日常写作", "Everyday writing", "跨网页润色、语法和语气检查", "Writing, grammar, and tone across the web"],
      ["quillbot", "学生与改写", "Students & rewriting", "改写、总结和引用辅助", "Paraphrasing, summaries, and citation support"],
      ["notion-ai", "知识工作", "Knowledge work", "在文档和团队知识库中写作", "Writing inside documents and team knowledge"],
    ],
  },
  "ai-website-builders": {
    titleZh: "按建站方式选择",
    titleEn: "Choose by building workflow",
    picks: [
      ["framer", "新手建站", "Beginner websites", "营销网站、作品集和直接发布", "Marketing sites, portfolios, and direct publishing"],
      ["lovable", "产品原型", "Product prototypes", "从提示词生成可运行的产品界面", "Prompt-to-product interfaces with working flows"],
      ["v0", "前端开发", "Frontend development", "生成可继续修改的 React 界面", "React interfaces intended for continued development"],
      ["bolt", "全栈实验", "Full-stack experiments", "在浏览器中生成和运行应用", "Generate and run applications in the browser"],
      ["replit", "托管开发", "Hosted development", "编码、协作、部署集中在一个环境", "Coding, collaboration, and deployment in one environment"],
    ],
  },
} as const;

export default function FocusedVerticalDesk({ slug }: { slug: keyof typeof verticals }) {
  const data = verticals[slug];
  return (
    <section className="mt-12 border-y border-[#9eaaa4] py-10">
      <h2 className="text-3xl font-semibold"><BilingualText zh={data.titleZh} en={data.titleEn} /></h2>
      <div className="mt-6 divide-y divide-[#c2cbc5] border-y border-[#9eaaa4]">
        {data.picks.map(([id, labelZh, labelEn, reasonZh, reasonEn]) => {
          const tool = getTool(id);
          if (!tool) return null;
          return (
            <div key={id} className="grid gap-4 py-5 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center">
              <div className="font-semibold text-[#285c4c]"><BilingualText zh={labelZh} en={labelEn} /></div>
              <div className="flex items-center gap-3"><ToolLogo tool={tool} size="sm" /><div><div className="font-semibold">{tool.name}</div><p className="mt-1 text-sm text-[#596761]"><BilingualText zh={reasonZh} en={reasonEn} /></p></div></div>
              <Link href={`/tools/${id}`} className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#315148] px-3 text-sm font-semibold text-[#285c4c] hover:bg-[#d9f99d]"><BilingualText zh="查看详情" en="View details" /><ArrowRightIcon /></Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

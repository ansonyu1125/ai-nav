import type { Metadata } from "next";
import ToolChooser, { type ChooserTool } from "@/components/ToolChooser";
import { tools } from "@/lib/tools";
import { getToolCategories } from "@/lib/types";
import { BilingualText } from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Help Me Choose an AI Tool",
  description: "Answer five questions and get three AI tool recommendations with clear reasons.",
  alternates: { canonical: "/choose" },
};

export default function ChoosePage() {
  const chooserTools: ChooserTool[] = tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    category: tool.category,
    categories: getToolCategories(tool),
    pricing: tool.pricing,
    score: tool.score,
    popularity: tool.popularity,
    region: tool.region,
    tags: [...tool.tags, ...(tool.tagsEn ?? [])],
    description: tool.descriptionEn ?? tool.description,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-semibold text-[#0b1b17] sm:text-6xl"><BilingualText zh="帮我选择 AI 工具" en="Help me choose an AI tool" /></h1>
        <p className="mt-5 text-lg leading-8 text-[#596761]"><BilingualText zh="回答五个简单问题，获得 3 款适合任务、预算和使用方式的工具。" en="Answer five short questions to get three tools matched to your task, budget, and way of working." /></p>
      </header>
      <ToolChooser tools={chooserTools} />
    </div>
  );
}

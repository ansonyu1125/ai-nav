import type { Metadata } from "next";
import ComparisonWorkspace from "@/components/ComparisonWorkspace";
import type { ComparisonTool } from "@/components/ComparisonBuilder";
import { BilingualText } from "@/components/Bilingual";
import { comparisonModels } from "@/data/models";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Compare AI Tools and Models",
  description: "Compare 2–4 AI tools or foundation models by pricing, access, capabilities, deployment, best fit, and limitations.",
  alternates: { canonical: "/compare" },
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const initialToolIds = typeof params.tools === "string" ? params.tools.split(",").map((id) => id.trim()).filter(Boolean).slice(0, 4) : [];
  const comparisonTools: ComparisonTool[] = [...tools].sort((a, b) => b.popularity - a.popularity).map((tool) => ({
    id: tool.id, name: tool.name, pricing: tool.pricing, pricingNote: tool.pricingNoteEn ?? tool.pricingNote ?? "", score: tool.score, popularity: tool.popularity, platforms: tool.platforms ?? ["web"], tags: tool.tagsEn ?? tool.tags, features: tool.featuresEn ?? tool.features ?? [], limitations: [],
  }));
  return <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
    <header className="mb-10 max-w-3xl">
      <h1 className="text-4xl font-semibold sm:text-6xl"><BilingualText zh="比较 AI 工具与模型" en="Compare AI tools and models" /></h1>
      <p className="mt-5 text-lg leading-8 text-[#596761]"><BilingualText zh="在工具和底层模型之间切换，选择 2–4 项并对比真正影响决策的信息。" en="Switch between products and underlying models, then compare 2–4 options using decision-relevant evidence." /></p>
    </header>
    <ComparisonWorkspace tools={comparisonTools} models={comparisonModels} initialToolIds={initialToolIds} />
  </div>;
}

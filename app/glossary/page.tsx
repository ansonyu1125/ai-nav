import { glossary, getGlossaryCategories } from "@/lib/glossary";
import GlossaryExplorer from "@/components/GlossaryExplorer";
import { BilingualText } from "@/components/Bilingual";

export const metadata = {
  title: "术语词典",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const categories = getGlossaryCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="AI 术语词典" en="AI Glossary" />
        </h1>
        <p className="mt-2 text-slate-600">
          <BilingualText
            zh={`搞懂 ${glossary.length} 个常见 AI 术语，从 LLM、Prompt 到 RAG、Agent。`}
            en={`Understand ${glossary.length} common AI terms, from LLM and Prompt to RAG and Agent.`}
          />
        </p>
      </div>
      <GlossaryExplorer terms={glossary} categories={categories} />
    </div>
  );
}

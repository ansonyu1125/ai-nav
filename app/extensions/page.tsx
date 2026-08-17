import { categories } from "@/data/categories";
import { getExtensionToolList } from "@/lib/tools";
import { getToolCategories } from "@/lib/types";
import ToolsExplorer from "@/components/ToolsExplorer";
import { BilingualText } from "@/components/Bilingual";

export const metadata = {
  title: "AI 浏览器插件",
  description:
    "收录最实用的 AI 浏览器插件，涵盖写作、翻译、总结、搜索、SEO、会议转写等场景，装进浏览器一步到位。",
};

export default function ExtensionsPage() {
  const tools = getExtensionToolList();
  const usedCategories = categories.filter((c) =>
    tools.some((t) => getToolCategories(t).includes(c.id)),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="AI 浏览器插件" en="AI Browser Extensions" />
        </h1>
        <p className="mt-2 text-slate-600">
          <BilingualText
            zh={`收录 ${tools.length} 款 AI 浏览器插件，涵盖写作、翻译、总结、搜索、SEO、会议转写等场景，装进浏览器一步到位。`}
            en={`Browse ${tools.length} AI browser extensions for writing, translation, summarization, search, SEO, meeting transcription and more.`}
          />
        </p>
      </div>

      <ToolsExplorer
        tools={tools}
        categories={usedCategories}
        initial={{ q: "", category: "all", region: "all", pricing: "all", sort: "popularity" }}
      />
    </div>
  );
}

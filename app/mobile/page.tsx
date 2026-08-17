import { categories } from "@/data/categories";
import { getMobileToolList } from "@/lib/tools";
import { getToolCategories } from "@/lib/types";
import ToolsExplorer from "@/components/ToolsExplorer";
import { BilingualText } from "@/components/Bilingual";

export const metadata = {
  title: "AI 手机应用",
  description:
    "收录最优质的 AI 手机应用，涵盖 AI 修图、视频剪辑、语音、学习、健康、翻译等场景，随时随地用 AI。",
};

export default function MobilePage() {
  const tools = getMobileToolList();
  const usedCategories = categories.filter((c) =>
    tools.some((t) => getToolCategories(t).includes(c.id)),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          <BilingualText zh="AI 手机应用" en="AI Mobile Apps" />
        </h1>
        <p className="mt-2 text-slate-600">
          <BilingualText
            zh={`收录 ${tools.length} 款 AI 手机应用，涵盖修图、视频、语音、学习、健康、翻译等场景，随时随地用 AI。`}
            en={`Browse ${tools.length} AI mobile apps across photo, video, voice, learning, health, translation and more.`}
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorials, getTutorial } from "@/lib/tutorials";
import { getTool } from "@/lib/tools";
import { getPreferredVariant, variantRoutes } from "@/lib/product-variants";
import { BilingualText, BilingualMarkdown } from "@/components/Bilingual";
import TagList from "@/components/TagList";
import ToolLogo from "@/components/ToolLogo";
import TutorialIcon from "@/components/TutorialIcon";
import { getTutorialRelation, tutorialTrackLabels } from "@/data/tutorial-relations";

export function generateStaticParams() { return tutorials.map((t) => ({ slug: t.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const tutorial = getTutorial(slug); if (!tutorial) return {};
  return { title: tutorial.titleEn ?? tutorial.title, description: tutorial.summaryEn ?? tutorial.summary, alternates: { canonical: `/tutorials/${slug}` }, openGraph: { type: "article", title: tutorial.titleEn ?? tutorial.title, description: tutorial.summaryEn ?? tutorial.summary } };
}

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
const toolHref = (id: string) => { const tool = getTool(id); if (!tool) return null; const variant = getPreferredVariant(tool); return variant ? `/${variantRoutes[variant]}/${id}` : `/tools/${id}`; };

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tutorial = getTutorial(slug); if (!tutorial) notFound();
  const relation = getTutorialRelation(tutorial.id); const track = tutorialTrackLabels[relation.track];
  const relatedTools = relation.toolIds.map((id) => getTool(id)).filter((tool) => Boolean(tool));
  const nextTutorials = relation.nextTutorialIds.map((id) => tutorials.find((item) => item.id === id)).filter((item) => Boolean(item)).slice(0, 3);
  const articleJsonLd = { "@context": "https://schema.org", "@type": "Article", headline: tutorial.titleEn ?? tutorial.title, description: tutorial.summaryEn ?? tutorial.summary, datePublished: tutorial.date, dateModified: tutorial.date, mainEntityOfPage: `/tutorials/${tutorial.id}` };
  return <main className="min-h-screen bg-[#f2f4ef] text-[#0b1b17]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    <header className="border-b border-[#27443b] bg-[#07110f] text-[#eef4ef]"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#93a79f]"><Link href="/" className="hover:text-white"><BilingualText zh="首页" en="Home" /></Link><span>/</span><Link href="/tutorials" className="hover:text-white"><BilingualText zh="教程" en="Tutorials" /></Link><span>/</span><span className="text-[#d9f99d]"><BilingualText zh={track.zh} en={track.en} /></span></nav>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_240px] lg:items-end"><div><div className="flex items-center gap-3 text-sm text-[#a9bbb3]"><TutorialIcon track={relation.track} className="h-5 w-5 text-[#7dd3fc]" /><BilingualText zh={track.zh} en={track.en} /><span>·</span><BilingualText zh={relation.level === "beginner" ? "入门" : "进阶"} en={relation.level === "beginner" ? "Beginner" : "Intermediate"} /></div><h1 className="mt-5 max-w-4xl text-3xl leading-tight sm:text-5xl"><BilingualText zh={tutorial.title} en={tutorial.titleEn} /></h1><p className="mt-5 max-w-3xl text-base leading-7 text-[#b9c9c2] sm:text-lg"><BilingualText zh={tutorial.summary} en={tutorial.summaryEn} /></p></div><dl className="grid grid-cols-2 gap-4 border-t border-[#315148] pt-5 lg:grid-cols-1"><div><dt className="text-xs uppercase text-[#80958c]"><BilingualText zh="预计阅读" en="Read time" /></dt><dd className="mt-1 font-mono text-[#d9f99d]">{tutorial.readMinutes} MIN</dd></div><div><dt className="text-xs uppercase text-[#80958c]"><BilingualText zh="发布日期" en="Published" /></dt><dd className="mt-1 font-mono text-sm text-white">{tutorial.date}</dd></div></dl></div>
    </div></header>

    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,760px)_280px] lg:px-8 lg:py-14">
      <div><article className="tutorial-prose border-b border-[#aebbb4] pb-12"><BilingualMarkdown zh={tutorial.content} en={tutorial.contentEn} /></article><div className="mt-6 flex flex-wrap gap-2"><TagList zh={tutorial.tags} en={tutorial.tagsEn} tagClassName="border border-[#b9c4be] bg-transparent px-2.5 py-1 text-xs text-[#596761]" /></div></div>
      <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start"><section className="border-t border-[#87988f] pt-5"><h2 className="text-base font-semibold"><BilingualText zh="阅读后你可以" en="After this guide" /></h2><div className="mt-4 space-y-2"><Link href="/compare" className="flex min-h-11 items-center justify-between border border-[#285c4c] px-4 py-3 text-sm font-semibold text-[#174638] transition hover:bg-white"><BilingualText zh="比较相关工具" en="Compare related tools" /><Arrow /></Link>{relation.bestPage && <Link href={relation.bestPage} className="flex min-h-11 items-center justify-between border border-[#b9c4be] px-4 py-3 text-sm transition hover:bg-white"><BilingualText zh="查看最佳工具榜单" en="See the best-tool shortlist" /><Arrow /></Link>}<Link href="/choose" className="flex min-h-11 items-center justify-between border border-[#b9c4be] px-4 py-3 text-sm transition hover:bg-white"><BilingualText zh="获得个性化推荐" en="Get a personal recommendation" /><Arrow /></Link></div></section>
        {relatedTools.length > 0 && <section className="border-t border-[#87988f] pt-5"><h2 className="text-base font-semibold"><BilingualText zh="本指南相关工具" en="Tools in this guide" /></h2><div className="mt-4 divide-y divide-[#c2cbc5] border-y border-[#c2cbc5]">{relatedTools.map((tool) => tool && <Link key={tool.id} href={toolHref(tool.id) ?? `/tools/${tool.id}`} className="flex items-center gap-3 py-3 group"><ToolLogo tool={tool} size="sm" /><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold group-hover:text-[#285c4c]">{tool.name}</div><div className="mt-0.5 text-xs text-[#68766f]">{tool.pricing}</div></div><Arrow /></Link>)}</div><p className="mt-3 text-xs leading-5 text-[#68766f]"><BilingualText zh="价格和功能可能变化，请在产品详情页查看核验状态。" en="Pricing and features can change. Check each product page for verification status." /></p></section>}
      </aside>
    </div>
    {nextTutorials.length > 0 && <section className="border-t border-[#aebbb4] bg-[#e7ebe6]"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><h2 className="text-2xl"><BilingualText zh="沿着这条路径继续" en="Continue this learning path" /></h2><div className="mt-6 grid border-y border-[#9eada5] md:grid-cols-3">{nextTutorials.map((item, index) => item && <Link key={item.id} href={`/tutorials/${item.id}`} className={`group py-5 md:px-5 ${index > 0 ? "border-t border-[#9eada5] md:border-l md:border-t-0" : ""}`}><div className="text-xs text-[#68766f]">{item.readMinutes} MIN</div><h3 className="mt-4 font-semibold leading-snug group-hover:text-[#285c4c]"><BilingualText zh={item.title} en={item.titleEn} /></h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#68766f]"><BilingualText zh={item.summary} en={item.summaryEn} /></p></Link>)}</div></div></section>}
  </main>;
}

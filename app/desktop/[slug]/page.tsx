import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool } from "@/lib/tools";
import { getVariantTools, hasVariantPage } from "@/lib/product-variants";
import { site } from "@/lib/site";
import VariantDetailPage from "@/components/VariantDetailPage";

export function generateStaticParams() { return getVariantTools("desktop").map((tool) => ({ slug: tool.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const tool = getTool(slug); if (!tool || !hasVariantPage(tool, "desktop")) return {}; const title = `${tool.name} Desktop App`; const description = `Official ${tool.name} desktop download, system support, installation guidance, verified product data, and alternatives.`; return { title, description, alternates: { canonical: `/desktop/${slug}` }, openGraph: { title, description, url: `${site.url}/desktop/${slug}`, type: "website" } }; }
export default async function DesktopDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const tool = getTool(slug); if (!tool || !hasVariantPage(tool, "desktop")) notFound(); return <VariantDetailPage tool={tool} variant="desktop" siteUrl={site.url} />; }

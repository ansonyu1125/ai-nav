import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool } from "@/lib/tools";
import { getVariantTools, hasVariantPage } from "@/lib/product-variants";
import { site } from "@/lib/site";
import VariantDetailPage from "@/components/VariantDetailPage";

export function generateStaticParams() { return getVariantTools("web").map((tool) => ({ slug: tool.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const tool = getTool(slug); if (!tool || !hasVariantPage(tool, "web")) return {}; const title = `${tool.name} Web App`; const description = `Official ${tool.name} web app destination, browser usage, verified product data, and web alternatives.`; return { title, description, alternates: { canonical: `/web/${slug}` }, openGraph: { title, description, url: `${site.url}/web/${slug}`, type: "website" } }; }
export default async function WebDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const tool = getTool(slug); if (!tool || !hasVariantPage(tool, "web")) notFound(); return <VariantDetailPage tool={tool} variant="web" siteUrl={site.url} />; }

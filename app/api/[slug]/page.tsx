import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool } from "@/lib/tools";
import { getVariantTools, hasVariantPage } from "@/lib/product-variants";
import { site } from "@/lib/site";
import VariantDetailPage from "@/components/VariantDetailPage";

export function generateStaticParams() { return getVariantTools("api").map((tool) => ({ slug: tool.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const tool = getTool(slug); if (!tool || !hasVariantPage(tool, "api")) return {}; const title = `${tool.name} API`; const description = `Official ${tool.name} API documentation, integration guidance, developer data status, and API alternatives.`; return { title, description, alternates: { canonical: `/api/${slug}` }, openGraph: { title, description, url: `${site.url}/api/${slug}`, type: "website" } }; }
export default async function ApiDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const tool = getTool(slug); if (!tool || !hasVariantPage(tool, "api")) notFound(); return <VariantDetailPage tool={tool} variant="api" siteUrl={site.url} />; }

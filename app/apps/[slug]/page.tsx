import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool } from "@/lib/tools";
import { getAppTools, hasAppPage } from "@/lib/product-variants";
import { site } from "@/lib/site";
import VariantDetailPage from "@/components/VariantDetailPage";

export function generateStaticParams() {
  return getAppTools().map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !hasAppPage(tool)) return {};
  const title = `${tool.name} Mobile App`;
  const description = `Official ${tool.name} mobile app information, App Store and Google Play destinations, installation guidance, usage signals, and alternatives.`;
  return {
    title,
    description,
    alternates: { canonical: `/apps/${slug}` },
    openGraph: { title, description, url: `${site.url}/apps/${slug}`, type: "website" },
  };
}

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !hasAppPage(tool)) notFound();
  return <VariantDetailPage tool={tool} variant="app" siteUrl={site.url} />;
}

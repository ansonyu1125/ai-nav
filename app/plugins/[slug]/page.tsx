import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool } from "@/lib/tools";
import { getPluginTools, hasPluginPage } from "@/lib/product-variants";
import { site } from "@/lib/site";
import VariantDetailPage from "@/components/VariantDetailPage";

export function generateStaticParams() {
  return getPluginTools().map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !hasPluginPage(tool)) return {};
  const title = `${tool.name} Browser Plugin`;
  const description = `Official ${tool.name} browser plugin information, extension-store destination, setup guidance, active-user data status, and plugin alternatives.`;
  return {
    title,
    description,
    alternates: { canonical: `/plugins/${slug}` },
    openGraph: { title, description, url: `${site.url}/plugins/${slug}`, type: "website" },
  };
}

export default async function PluginDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !hasPluginPage(tool)) notFound();
  return <VariantDetailPage tool={tool} variant="plugin" siteUrl={site.url} />;
}

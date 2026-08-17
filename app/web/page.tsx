import type { Metadata } from "next";
import VariantIndexPage from "@/components/VariantIndexPage";
import { getVariantTools } from "@/lib/product-variants";

export const metadata: Metadata = { title: "AI Web Apps", description: "AI web apps with direct official browser destinations and format-specific product data.", alternates: { canonical: "/web" },
};
export default function WebAppsPage() { return <VariantIndexPage tools={getVariantTools("web")} variant="web" />; }

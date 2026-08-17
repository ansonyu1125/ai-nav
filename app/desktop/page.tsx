import type { Metadata } from "next";
import VariantIndexPage from "@/components/VariantIndexPage";
import { getVariantTools } from "@/lib/product-variants";

export const metadata: Metadata = { title: "AI Desktop Apps", description: "AI desktop clients with direct official download destinations, system support, and installation guidance.", alternates: { canonical: "/desktop" },
};
export default function DesktopAppsPage() { return <VariantIndexPage tools={getVariantTools("desktop")} variant="desktop" />; }

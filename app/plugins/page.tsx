import type { Metadata } from "next";
import VariantIndexPage from "@/components/VariantIndexPage";
import { getPluginTools } from "@/lib/product-variants";

export const metadata: Metadata = {
  title: "AI Browser Plugins",
  description: "Verified AI browser plugins with direct official extension-store destinations.",
  alternates: { canonical: "/plugins" },
};

export default function PluginsPage() {
  return <VariantIndexPage tools={getPluginTools()} variant="plugin" />;
}

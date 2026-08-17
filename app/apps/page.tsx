import type { Metadata } from "next";
import VariantIndexPage from "@/components/VariantIndexPage";
import { getAppTools } from "@/lib/product-variants";

export const metadata: Metadata = {
  title: "AI Mobile Apps",
  description: "Verified AI mobile apps with direct App Store and Google Play destinations.",
  alternates: { canonical: "/apps" },
};

export default function AppsPage() {
  return <VariantIndexPage tools={getAppTools()} variant="app" />;
}

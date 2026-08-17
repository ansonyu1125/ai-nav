import type { Metadata } from "next";
import VariantIndexPage from "@/components/VariantIndexPage";
import { getVariantTools } from "@/lib/product-variants";

export const metadata: Metadata = { title: "AI APIs", description: "AI APIs with dedicated official documentation destinations, integration guidance, and developer data.", alternates: { canonical: "/api" },
};
export default function ApiIndexPage() { return <VariantIndexPage tools={getVariantTools("api")} variant="api" />; }

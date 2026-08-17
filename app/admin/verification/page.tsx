import type { Metadata } from "next";
import VerificationDashboard from "@/components/VerificationDashboard";
export const metadata: Metadata = { title: "Verification Desk", robots: { index: false, follow: false, nocache: true } };
export default function VerificationPage() { return <VerificationDashboard />; }

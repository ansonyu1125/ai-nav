import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import NewsletterSignup from "@/components/NewsletterSignup";
import JsonLd from "@/components/JsonLd";

const signalDisplay = localFont({
  src: "./fonts/signal-display.woff2",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nameEn} · ${site.taglineEn}`,
    template: `%s · ${site.nameEn}`,
  },
  description: site.descriptionEn,
  openGraph: {
    title: `${site.nameEn} · ${site.taglineEn}`,
    description: site.descriptionEn,
    url: site.url,
    siteName: site.nameEn,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nameEn} · ${site.taglineEn}`,
    description: site.descriptionEn,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${signalDisplay.variable} flex min-h-full flex-col bg-[#f2f4ef] text-[#0b1b17]`}>
        <div
          aria-hidden="true"
          className="hidden"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: A verified signal desk for choosing AI tools, refusing the generic AI directory grid. OWN-WORLD: ink-green instrument fields, lime verification, cyan routes, warm evidence surfaces. STORY: state the job, inspect proof, choose a tool, visit its official site. FIRST VIEWPORT: task-first editorial search paired with a live signal console. FORM: mission-control routing desk; seed bd906788. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance -->",
          }}
        />
        <LanguageProvider>
          <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.nameEn, url: site.url, description: site.descriptionEn, inLanguage: "en", potentialAction: { "@type": "SearchAction", target: `${site.url}/tools?q={search_term_string}`, "query-input": "required name=search_term_string" } }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: site.nameEn, url: site.url, description: site.descriptionEn }} />
          <Navbar />
          <main className="flex-1">{children}</main>
          <NewsletterSignup />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

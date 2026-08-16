import { LanguageProvider } from "@/components/LanguageProvider";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

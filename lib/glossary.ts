import glossaryData from "@/data/glossary.json";
import type { GlossaryTerm } from "@/lib/types";

export const glossary = glossaryData as GlossaryTerm[];

export function getTerm(id: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.id === id);
}

export function getGlossaryCategories(): string[] {
  return Array.from(new Set(glossary.map((t) => t.category)));
}

export function getTermsByCategory(category: string): GlossaryTerm[] {
  return glossary.filter((t) => t.category === category);
}

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.trim().toLowerCase();
  if (!q) return glossary;
  return glossary.filter((t) =>
    [t.term, t.english, t.definition, t.category].join(" ").toLowerCase().includes(q),
  );
}

import fs from "node:fs";
import path from "node:path";
import tutorialsData from "@/data/tutorials.json";
import type { Tutorial } from "@/lib/types";

export type TutorialMeta = Omit<Tutorial, "content">;

export const tutorials = tutorialsData as TutorialMeta[];

export function getTutorial(id: string): Tutorial | undefined {
  const meta = tutorials.find((t) => t.id === id);
  if (!meta) return undefined;
  const file = path.join(process.cwd(), "data", "tutorials", `${id}.md`);
  const content = fs.readFileSync(file, "utf-8");
  return { ...meta, content };
}

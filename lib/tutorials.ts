import fs from "node:fs";
import path from "node:path";
import tutorialsData from "@/data/tutorials.json";
import type { Tutorial } from "@/lib/types";

export type TutorialMeta = Omit<Tutorial, "content">;

export const tutorials = ([...tutorialsData] as TutorialMeta[]).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getTutorial(id: string): Tutorial | undefined {
  const meta = tutorials.find((t) => t.id === id);
  if (!meta) return undefined;
  const dir = path.join(process.cwd(), "data", "tutorials");
  const content = fs.readFileSync(path.join(dir, `${id}.md`), "utf-8");
  let contentEn: string | undefined;
  const enFile = path.join(dir, `${id}.en.md`);
  if (fs.existsSync(enFile)) contentEn = fs.readFileSync(enFile, "utf-8");
  return { ...meta, content, contentEn };
}

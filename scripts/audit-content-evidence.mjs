import fs from "node:fs";
import { batchOneArticles } from "../data/batch-one-content.mjs";
import { contentEvidence } from "../data/content-evidence.mjs";
import { contentTestProtocols } from "../data/content-test-protocols.mjs";
import { auditEvidenceRecords } from "./lib/content-audit.mjs";

const BATCH_ONE_COUNTS = { writing: 7, presentations: 6, meetings: 6, research: 6, "image-editing": 5 };
const tools = JSON.parse(fs.readFileSync(new URL("../data/tools.json", import.meta.url), "utf8"));
const evidence = Object.values(contentEvidence);
const errors = auditEvidenceRecords({
  tools,
  protocols: contentTestProtocols,
  evidence,
  articles: batchOneArticles,
  expectedClusterCounts: BATCH_ONE_COUNTS,
  requirePublicationReady: process.argv.includes("--ready"),
  today: new Date().toISOString().slice(0, 10),
  researchNoteExists: (notesPath) => fs.existsSync(new URL(`../${notesPath}`, import.meta.url)),
});

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`Content evidence audit passed: ${batchOneArticles.length} Batch 1 articles and ${evidence.length} evidence records validated.`);
}

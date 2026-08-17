import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { batchOneArticles } from "../../data/batch-one-content.mjs";
import { contentEvidence } from "../../data/content-evidence.mjs";
import { contentTestProtocols } from "../../data/content-test-protocols.mjs";
import { auditEvidenceRecords } from "../lib/content-audit.mjs";

const tools = [{ id: "alpha" }, { id: "beta" }];
const protocols = [{ id: "writing-core", cluster: "writing", tasks: ["Rewrite source copy", "Draft long-form copy"] }];

test("accepts a complete hands-on record", () => {
  const errors = auditEvidenceRecords({
    tools,
    protocols,
    evidence: [{
      toolId: "alpha",
      level: "hands-on",
      audienceFit: "Independent marketers",
      limitations: ["No offline mode"],
      alternatives: ["beta"],
      sources: [
        { type: "pricing", url: "https://alpha.example/pricing", label: "Pricing", checkedAt: "2026-08-17" },
        { type: "licensing", url: "https://alpha.example/terms", label: "Terms", checkedAt: "2026-08-17" },
      ],
      handsOn: { protocolId: "writing-core", testedAt: "2026-08-17", accountTier: "Free", notesPath: "research/alpha.md" },
    }],
    articles: [], requirePublicationReady: false,
  });
  assert.deepEqual(errors, []);
});

test("rejects a hands-on label without a test run", () => {
  const errors = auditEvidenceRecords({
    tools,
    protocols,
    evidence: [{ toolId: "alpha", level: "hands-on", audienceFit: "Writers", limitations: ["Unknown export limits"], alternatives: ["beta"], sources: [] }],
    articles: [], requirePublicationReady: false,
  });
  assert.ok(errors.includes("alpha: hands-on evidence requires handsOn test metadata"));
});

test("rejects unknown tools, invalid dates, and non-HTTPS sources", () => {
  const errors = auditEvidenceRecords({
    tools,
    protocols,
    evidence: [{
      toolId: "missing",
      level: "official-sources",
      audienceFit: "Teams",
      limitations: ["No mobile app"],
      alternatives: ["alpha"],
      sources: [{ type: "pricing", url: "http://example.com", label: "Pricing", checkedAt: "17-08-2026" }],
    }],
    articles: [], requirePublicationReady: false,
  });
  assert.ok(errors.some((error) => error.includes("unknown tool missing")));
  assert.ok(errors.some((error) => error.includes("must use HTTPS")));
  assert.ok(errors.some((error) => error.includes("invalid checkedAt")));
});

test("rejects duplicate slugs and unknown article tools", () => {
  const articles = [
    { slug: "same", cluster: "writing", toolIds: ["alpha"], requiredEvidenceLevel: "official-sources" },
    { slug: "same", cluster: "writing", toolIds: ["missing"], requiredEvidenceLevel: "official-sources" },
  ];
  const errors = auditEvidenceRecords({
    tools,
    protocols,
    evidence: [],
    articles,
    expectedClusterCounts: null,
    requirePublicationReady: false,
  });
  assert.ok(errors.includes("article same: duplicate slug"));
  assert.ok(errors.includes("article same: unknown tool missing"));
});

test("rejects incorrect article cluster counts", () => {
  const articles = [
    { slug: "alpha-review", cluster: "writing", toolIds: ["alpha"], requiredEvidenceLevel: "official-sources" },
  ];
  const errors = auditEvidenceRecords({
    tools,
    protocols,
    evidence: [],
    articles,
    expectedClusterCounts: { writing: 2, presentations: 1 },
    requirePublicationReady: false,
  });
  assert.ok(errors.includes("cluster writing: expected 2, received 1"));
  assert.ok(errors.includes("cluster presentations: expected 1, received 0"));
});

test("accepts the 30-article Batch 1 manifest and approved cluster counts", () => {
  const canonicalTools = JSON.parse(fs.readFileSync(new URL("../../data/tools.json", import.meta.url), "utf8"));
  const errors = auditEvidenceRecords({
    tools: canonicalTools,
    protocols: contentTestProtocols,
    evidence: Object.values(contentEvidence),
    articles: batchOneArticles,
    expectedClusterCounts: { writing: 7, presentations: 6, meetings: 6, research: 6, "image-editing": 5 },
    requirePublicationReady: false,
  });
  assert.equal(batchOneArticles.length, 30);
  assert.deepEqual(errors, []);
});

test("rejects a hands-on article without hands-on evidence", () => {
  const articles = [{ slug: "alpha-review", cluster: "writing", toolIds: ["alpha"], requiredEvidenceLevel: "hands-on" }];
  const errors = auditEvidenceRecords({
    tools,
    protocols,
    evidence: [],
    articles,
    expectedClusterCounts: null,
    requirePublicationReady: true,
  });
  assert.ok(errors.includes("article alpha-review: alpha lacks hands-on evidence"));
});

test("rejects an official-sources article without evidence", () => {
  const articles = [{ slug: "alpha-profile", cluster: "writing", toolIds: ["alpha"], requiredEvidenceLevel: "official-sources" }];
  const errors = auditEvidenceRecords({
    tools,
    protocols,
    evidence: [],
    articles,
    expectedClusterCounts: null,
    requirePublicationReady: true,
  });
  assert.ok(errors.includes("article alpha-profile: alpha lacks official-sources evidence"));
});

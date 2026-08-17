import test from "node:test";
import assert from "node:assert/strict";
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

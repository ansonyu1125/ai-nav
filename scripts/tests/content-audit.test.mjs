import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { batchOneArticles } from "../../data/batch-one-content.mjs";
import { contentEvidence } from "../../data/content-evidence.mjs";
import { contentTestProtocols } from "../../data/content-test-protocols.mjs";
import { bestPages } from "../../data/best-pages.ts";
import { auditEvidenceRecords } from "../lib/content-audit.mjs";

const TODAY = "2026-08-17";
const tools = [
  { id: "alpha", officialUrl: "https://alpha.example" },
  { id: "beta", officialUrl: "https://beta.example" },
];
const protocols = [
  { id: "writing-core", cluster: "writing", tasks: ["Rewrite source copy"] },
  { id: "research-core", cluster: "research", tasks: ["Research a topic"] },
];
const requiredSourceTypes = ["pricing", "licensing", "platforms", "regions", "features", "updates"];

function completeSources(overrides = {}) {
  return requiredSourceTypes.map((type) => ({
    type,
    url: `https://alpha.example/${type}`,
    label: type,
    checkedAt: type === "pricing" ? "2026-07-17" : "2026-02-15",
    ...overrides,
  }));
}

function evidenceRecord(overrides = {}) {
  return {
    toolId: "alpha",
    level: "official-sources",
    audienceFit: "Independent marketers",
    limitations: ["No offline mode"],
    alternatives: ["beta"],
    sources: completeSources(),
    ...overrides,
  };
}

function article(overrides = {}) {
  return {
    slug: "alpha-review",
    title: "Alpha review",
    cluster: "writing",
    type: "review",
    primaryIntent: "Evaluate Alpha",
    toolIds: ["alpha"],
    requiredEvidenceLevel: "official-sources",
    ...overrides,
  };
}

function audit(overrides = {}) {
  return auditEvidenceRecords({
    tools,
    protocols,
    evidence: [],
    articles: [],
    expectedClusterCounts: null,
    requirePublicationReady: false,
    today: TODAY,
    ...overrides,
  });
}

test("accepts a complete category-specific hands-on record", () => {
  const errors = audit({
    evidence: [evidenceRecord({
      level: "hands-on",
      handsOn: [{
        protocolId: "writing-core",
        testedAt: "2026-05-17",
        accountTier: "Free",
        notesPath: "research/alpha/2026-05-17.md",
      }],
    })],
  });
  assert.deepEqual(errors, []);
});

test("rejects a hands-on label without test runs", () => {
  const errors = audit({ evidence: [evidenceRecord({ level: "hands-on", handsOn: [] })] });
  assert.ok(errors.includes("alpha: hands-on evidence requires at least one handsOn test run"));
});

test("rejects unknown tools, invalid dates, and non-HTTPS sources", () => {
  const errors = audit({
    evidence: [evidenceRecord({
      toolId: "missing",
      alternatives: ["alpha"],
      sources: [{ type: "pricing", url: "http://example.com", label: "Pricing", checkedAt: "17-08-2026" }],
    })],
  });
  assert.ok(errors.some((error) => error.includes("unknown tool missing")));
  assert.ok(errors.some((error) => error.includes("must use HTTPS")));
  assert.ok(errors.some((error) => error.includes("invalid checkedAt")));
});

test("rejects impossible calendar dates", () => {
  const errors = audit({
    evidence: [evidenceRecord({ sources: completeSources({ checkedAt: "2026-02-31" }) })],
  });
  assert.ok(errors.includes("alpha: invalid checkedAt 2026-02-31"));
});

test("requires every official claim type in publication-ready mode", () => {
  for (const missingType of requiredSourceTypes) {
    const errors = audit({
      evidence: [evidenceRecord({ sources: completeSources().filter(({ type }) => type !== missingType) })],
      articles: [article()],
      requirePublicationReady: true,
    });
    assert.ok(errors.includes(`alpha: official evidence is missing ${missingType} source`), missingType);
  }

  const sourceFreeErrors = audit({
    evidence: [evidenceRecord({ sources: [] })],
    articles: [article()],
    requirePublicationReady: true,
  });
  assert.ok(sourceFreeErrors.includes("alpha: official evidence is missing pricing source"));
});

test("rejects third-party evidence hosts unless explicitly allowed", () => {
  const thirdPartySource = { type: "pricing", url: "https://billing.example/pricing", label: "Pricing", checkedAt: "2026-07-17" };
  const rejected = audit({
    evidence: [evidenceRecord({ sources: [thirdPartySource, ...completeSources().slice(1)] })],
    articles: [article()],
    requirePublicationReady: true,
  });
  assert.ok(rejected.includes("alpha: source Pricing host billing.example is not an allowed first-party host"));

  const allowed = audit({
    evidence: [evidenceRecord({
      allowedSourceHosts: ["billing.example"],
      sources: [thirdPartySource, ...completeSources().slice(1)],
    })],
    articles: [article()],
    requirePublicationReady: true,
  });
  assert.deepEqual(allowed, []);
});

test("enforces source freshness at the pricing and official-source thresholds", () => {
  const boundaryErrors = audit({
    evidence: [evidenceRecord()],
    articles: [article()],
    requirePublicationReady: true,
  });
  assert.deepEqual(boundaryErrors, []);

  const stalePricing = audit({
    evidence: [evidenceRecord({ sources: completeSources().map((source) => source.type === "pricing" ? { ...source, checkedAt: "2026-07-16" } : source) })],
    articles: [article()],
    requirePublicationReady: true,
  });
  assert.ok(stalePricing.includes("alpha: pricing source pricing is stale (32 days old; maximum 31)"));

  const staleOfficial = audit({
    evidence: [evidenceRecord({ sources: completeSources().map((source) => source.type === "features" ? { ...source, checkedAt: "2026-02-14" } : source) })],
    articles: [article()],
    requirePublicationReady: true,
  });
  assert.ok(staleOfficial.includes("alpha: features source features is stale (184 days old; maximum 183)"));
});

test("validates every hands-on run field and freshness", () => {
  const invalidRuns = [
    { protocolId: "writing-core", testedAt: "2026-05-17", accountTier: "", notesPath: "research/alpha/empty-tier.md" },
    { protocolId: "writing-core", testedAt: "2026-05-17", accountTier: "Free", notesPath: "" },
    { protocolId: "writing-core", testedAt: "2026-05-17", accountTier: "Free", notesPath: "research/beta/wrong-tool.md" },
  ];
  const invalidErrors = audit({ evidence: [evidenceRecord({ level: "hands-on", handsOn: invalidRuns })] });
  assert.ok(invalidErrors.includes("alpha: hands-on run accountTier is required"));
  assert.ok(invalidErrors.includes("alpha: hands-on run notesPath is required"));
  assert.ok(invalidErrors.includes("alpha: hands-on run notesPath must be a safe path under research/alpha/"));

  const boundary = audit({
    evidence: [evidenceRecord({ level: "hands-on", handsOn: [{ protocolId: "writing-core", testedAt: "2026-05-17", accountTier: "Free", notesPath: "research/alpha/2026-05-17.md" }] })],
    articles: [article({ requiredEvidenceLevel: "hands-on" })],
    requirePublicationReady: true,
    researchNoteExists: () => true,
  });
  assert.deepEqual(boundary, []);

  const stale = audit({
    evidence: [evidenceRecord({ level: "hands-on", handsOn: [{ protocolId: "writing-core", testedAt: "2026-05-16", accountTier: "Free", notesPath: "research/alpha/2026-05-16.md" }] })],
    articles: [article({ requiredEvidenceLevel: "hands-on" })],
    requirePublicationReady: true,
    researchNoteExists: () => true,
  });
  assert.ok(stale.includes("alpha: hands-on run writing-core is stale (93 days old; maximum 92)"));
});

test("requires a matching-cluster run to unlock a hands-on article", () => {
  const errors = audit({
    evidence: [evidenceRecord({
      level: "hands-on",
      handsOn: [{ protocolId: "research-core", testedAt: "2026-05-17", accountTier: "Free", notesPath: "research/alpha/research.md" }],
    })],
    articles: [article({ requiredEvidenceLevel: "hands-on" })],
    requirePublicationReady: true,
    researchNoteExists: () => true,
  });
  assert.ok(errors.includes("article alpha-review: alpha lacks fresh writing hands-on evidence"));
});

test("publication-ready CLI note checks reject a missing research note", () => {
  const errors = audit({
    evidence: [evidenceRecord({
      level: "hands-on",
      handsOn: [{ protocolId: "writing-core", testedAt: "2026-05-17", accountTier: "Free", notesPath: "research/alpha/missing.md" }],
    })],
    articles: [article({ requiredEvidenceLevel: "hands-on" })],
    requirePublicationReady: true,
    researchNoteExists: () => false,
  });
  assert.ok(errors.includes("alpha: research note does not exist: research/alpha/missing.md"));
  assert.ok(errors.includes("article alpha-review: alpha lacks fresh writing hands-on evidence"));
});

test("rejects percent-encoded traversal in research note paths", () => {
  const errors = audit({
    evidence: [evidenceRecord({
      level: "hands-on",
      handsOn: [{ protocolId: "writing-core", testedAt: "2026-05-17", accountTier: "Free", notesPath: "research/alpha/%2e%2e/README.md" }],
    })],
    articles: [article({ requiredEvidenceLevel: "hands-on" })],
    requirePublicationReady: true,
    researchNoteExists: () => true,
  });
  assert.ok(errors.includes("alpha: hands-on run notesPath must be a safe path under research/alpha/"));
  assert.ok(errors.includes("article alpha-review: alpha lacks fresh writing hands-on evidence"));
});

test("rejects hands-on protocols without executable tasks", () => {
  const errors = audit({
    protocols: [{ id: "empty-writing", cluster: "writing", tasks: [] }],
    evidence: [evidenceRecord({
      level: "hands-on",
      handsOn: [{ protocolId: "empty-writing", testedAt: "2026-05-17", accountTier: "Free", notesPath: "research/alpha/empty.md" }],
    })],
    articles: [article({ requiredEvidenceLevel: "hands-on" })],
    requirePublicationReady: true,
    researchNoteExists: () => true,
  });
  assert.ok(errors.includes("alpha: protocol empty-writing must contain at least one task"));
  assert.ok(errors.includes("article alpha-review: alpha lacks fresh writing hands-on evidence"));
});

test("rejects duplicate slugs and unknown article tools", () => {
  const errors = audit({
    articles: [article({ slug: "same" }), article({ slug: "same", toolIds: ["missing"] })],
  });
  assert.ok(errors.includes("article same: duplicate slug"));
  assert.ok(errors.includes("article same: unknown tool missing"));
});

test("rejects invalid manifest schema values instead of weakening requirements", () => {
  const invalidArticles = [
    article({ slug: "" }),
    article({ slug: "empty-title", title: "" }),
    article({ slug: "empty-intent", primaryIntent: "" }),
    article({ slug: "empty-tools", toolIds: [] }),
    article({ slug: "bad-cluster", cluster: "unexpected" }),
    article({ slug: "bad-type", type: "profile" }),
    article({ slug: "bad-level", requiredEvidenceLevel: "watchlist" }),
  ];
  const errors = audit({ evidence: [evidenceRecord()], articles: invalidArticles, requirePublicationReady: true });
  assert.ok(errors.includes("article at index 0: slug is required"));
  assert.ok(errors.includes("article empty-title: title is required"));
  assert.ok(errors.includes("article empty-intent: primaryIntent is required"));
  assert.ok(errors.includes("article empty-tools: at least one toolId is required"));
  assert.ok(errors.includes("article bad-cluster: invalid cluster unexpected"));
  assert.ok(errors.includes("article bad-type: invalid type profile"));
  assert.ok(errors.includes("article bad-level: invalid requiredEvidenceLevel watchlist"));
  assert.ok(!errors.some((error) => error.includes("article bad-level: alpha lacks watchlist evidence")));
});

test("rejects incorrect article cluster counts", () => {
  const errors = audit({ articles: [article()], expectedClusterCounts: { writing: 2, presentations: 1 } });
  assert.ok(errors.includes("cluster writing: expected 2, received 1"));
  assert.ok(errors.includes("cluster presentations: expected 1, received 0"));
});

test("accepts the unchanged 30-article Batch 1 manifest and approved cluster counts", () => {
  const canonicalTools = JSON.parse(fs.readFileSync(new URL("../../data/tools.json", import.meta.url), "utf8"));
  const errors = auditEvidenceRecords({
    tools: canonicalTools,
    protocols: contentTestProtocols,
    evidence: Object.values(contentEvidence),
    articles: batchOneArticles,
    expectedClusterCounts: { writing: 7, presentations: 6, meetings: 6, research: 6, "image-editing": 5 },
    requirePublicationReady: false,
    today: TODAY,
  });
  assert.equal(batchOneArticles.length, 30);
  assert.deepEqual(errors, []);
});

test("publishes the Batch 1 writing-tools guide with the approved tool set", () => {
  const manifestArticle = batchOneArticles.find((article) => article.slug === "best-ai-writing-tools");
  const publishedPage = bestPages.find((page) => page.slug === manifestArticle?.slug);

  assert.ok(manifestArticle, "Batch 1 writing-tools article is missing");
  assert.ok(publishedPage, "Best AI writing tools page is missing");
  assert.deepEqual(publishedPage.toolIds, manifestArticle.toolIds);
});

test("links every writing-tools pick to a first-party source", () => {
  const publishedPage = bestPages.find((page) => page.slug === "best-ai-writing-tools");

  assert.ok(publishedPage);
  for (const toolId of publishedPage.toolIds ?? []) {
    const toolSources = publishedPage.sources?.filter(
      (source) => source.toolId === toolId && source.kind === "official",
    ) ?? [];
    assert.ok(toolSources.length > 0, `${toolId} has no article source`);
    assert.ok(toolSources.every((source) => source.url.startsWith("https://")));
  }
});

test("uses evidence-safe comparison rows instead of stale catalog prices", () => {
  const publishedPage = bestPages.find((page) => page.slug === "best-ai-writing-tools");

  assert.ok(publishedPage);
  assert.deepEqual(publishedPage.comparisonRows?.map((row) => row.toolId), publishedPage.toolIds);
  assert.ok(publishedPage.comparisonRows?.every((row) => !/[$€£]\s?\d/.test(row.planAccessEn)));
});

test("labels sourced evaluation without implying first-hand testing", () => {
  const manifestArticle = batchOneArticles.find((article) => article.slug === "best-ai-writing-tools");
  const publishedPage = bestPages.find((page) => page.slug === "best-ai-writing-tools");

  assert.equal(manifestArticle?.requiredEvidenceLevel, "official-sources");
  assert.ok(publishedPage?.sources?.some((source) => source.kind === "independent-review"));
  assert.ok(publishedPage?.sources?.some((source) => source.kind === "research"));
  assert.ok(publishedPage?.comparisonRows?.every((row) => !row.evidenceEn.includes("hands-on")));
});

test("rejects an article in an unexpected cluster beyond the approved 30", () => {
  const canonicalTools = JSON.parse(fs.readFileSync(new URL("../../data/tools.json", import.meta.url), "utf8"));
  const articles = [...batchOneArticles, article({ slug: "unexpected-extra", cluster: "unexpected", toolIds: ["chatgpt"] })];
  const errors = auditEvidenceRecords({
    tools: canonicalTools,
    protocols: contentTestProtocols,
    evidence: Object.values(contentEvidence),
    articles,
    expectedClusterCounts: { writing: 7, presentations: 6, meetings: 6, research: 6, "image-editing": 5 },
    requirePublicationReady: false,
    today: TODAY,
  });
  assert.ok(errors.includes("article unexpected-extra: invalid cluster unexpected"));
  assert.ok(errors.includes("cluster unexpected: expected 0, received 1"));
});

test("rejects articles without their required publication evidence", () => {
  const handsOnErrors = audit({ articles: [article({ requiredEvidenceLevel: "hands-on" })], requirePublicationReady: true });
  assert.ok(handsOnErrors.includes("article alpha-review: alpha lacks fresh writing hands-on evidence"));

  const officialErrors = audit({ articles: [article()], requirePublicationReady: true });
  assert.ok(officialErrors.includes("article alpha-review: alpha lacks complete current official-sources evidence"));
});

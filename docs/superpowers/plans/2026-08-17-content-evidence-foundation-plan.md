# Content Evidence Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the verified content-evidence foundation required to research, test, audit, and publish the first 30 English decision pages without adding thin content.

**Architecture:** Keep editorial evidence separate from the existing large `tools.json` catalog. A typed registry defines product evidence levels and sources, a protocol registry defines repeatable category tests, and a Node audit validates both registries against the canonical tool catalog before any page can claim verification.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Node.js built-in test runner, JSON/TypeScript data modules, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-17-english-content-growth-design.md`

## Global Constraints

- English content is written natively first; Chinese translation is selective and follows proven value.
- Only Tier 1 products may be labeled `Hands-on tested`.
- Tier 2 products use `Official sources verified`; Tier 3 products receive no prominent ranking claim.
- Pricing, limits, licensing, platform availability, and regional claims require first-party sources and a verification date.
- Missing facts remain unknown and are never inferred from competitors or third-party summaries.
- Rankings remain independent from affiliate compensation.
- Do not generate Review, Pricing, or Comparison pages for every catalog entry.
- Do not add runtime dependencies for this phase.

---

## File Structure

- `lib/content-evidence.ts`: shared evidence types, status labels, and pure validation helpers.
- `data/content-evidence.mjs`: product evidence registry for the initial Tier 1 and Tier 2 cohort.
- `data/content-test-protocols.mjs`: repeatable hands-on test protocols by content cluster.
- `data/batch-one-content.mjs`: the 30-page Batch 1 editorial manifest and product relationships.
- `scripts/audit-content-evidence.mjs`: command-line quality gate over tools, evidence, protocols, and Batch 1 manifest.
- `scripts/lib/content-audit.mjs`: pure audit functions used by both CLI and tests.
- `scripts/tests/content-audit.test.mjs`: Node built-in unit tests for audit behavior.
- `package.json`: adds `content:audit` and `test:content` scripts.
- `docs/editorial/content-evidence-workflow.md`: researcher and editor operating procedure.

### Task 1: Define The Content Evidence Contract

**Files:**
- Create: `lib/content-evidence.ts`

**Interfaces:**
- Consumes: existing product IDs from `data/tools.json`.
- Produces: `EvidenceLevel`, `EvidenceSource`, `ContentEvidenceRecord`, `EVIDENCE_LABELS`, `isIsoDate`, and `isOfficialHttpsUrl` for Tasks 2-4.

- [ ] **Step 1: Create the shared evidence types and pure guards**

```ts
export type EvidenceLevel = "hands-on" | "official-sources" | "watchlist";
export type EvidenceClaimType =
  | "pricing"
  | "limits"
  | "licensing"
  | "platforms"
  | "regions"
  | "features"
  | "updates";

export interface EvidenceSource {
  type: EvidenceClaimType;
  url: string;
  label: string;
  checkedAt: string;
}

export interface HandsOnTestRun {
  protocolId: string;
  testedAt: string;
  accountTier: string;
  notesPath: string;
}

export interface ContentEvidenceRecord {
  toolId: string;
  level: EvidenceLevel;
  audienceFit: string;
  limitations: string[];
  alternatives: string[];
  latestUpdate?: { date: string; label: string; url: string };
  sources: EvidenceSource[];
  handsOn?: HandsOnTestRun;
}

export interface ProtocolTask {
  id: string;
  instruction: string;
  evidenceToRecord: string[];
}

export interface ContentTestProtocol {
  id: string;
  cluster: "writing" | "presentations" | "meetings" | "research" | "image-editing";
  version: 1;
  tasks: ProtocolTask[];
}

export type BatchOneCluster = ContentTestProtocol["cluster"];
export type DecisionContentType = "best" | "comparison" | "alternatives" | "pricing" | "review" | "tutorial";

export interface BatchOneArticle {
  slug: string;
  title: string;
  cluster: BatchOneCluster;
  type: DecisionContentType;
  primaryIntent: string;
  toolIds: string[];
  requiredEvidenceLevel: "hands-on" | "official-sources";
}

export const EVIDENCE_LABELS: Record<EvidenceLevel, string> = {
  "hands-on": "Hands-on tested",
  "official-sources": "Official sources verified",
  watchlist: "Update required",
};

export function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

export function isOfficialHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
```

- [ ] **Step 2: Run lint and TypeScript production compilation**

Run: `npm run lint -- lib/content-evidence.ts && npm run build`

Expected: both commands exit 0; the new module has no TypeScript errors.

- [ ] **Step 3: Commit the evidence contract**

```bash
git add lib/content-evidence.ts
git commit -m "feat: define content evidence contract"
```

### Task 2: Add Pure Audit Functions With Tests

**Files:**
- Create: `scripts/lib/content-audit.mjs`
- Create: `scripts/tests/content-audit.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: plain objects matching Task 1 types.
- Produces: `auditEvidenceRecords({ tools, evidence, protocols, articles, expectedClusterCounts, requirePublicationReady }) => string[]` for the CLI in Task 5.

- [ ] **Step 1: Write failing tests for evidence-level invariants**

```js
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
```

- [ ] **Step 2: Add the test command**

Add to `package.json` scripts:

```json
"test:content": "node --test scripts/tests/content-audit.test.mjs"
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm run test:content`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/lib/content-audit.mjs`.

- [ ] **Step 4: Implement the minimal pure audit**

```js
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value) {
  return ISO_DATE.test(value ?? "") && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function validHttps(value) {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

export function auditEvidenceRecords({ tools, evidence, protocols, articles, expectedClusterCounts = null, requirePublicationReady = false }) {
  const errors = [];
  const toolIds = new Set(tools.map((tool) => tool.id));
  const protocolIds = new Set(protocols.map((protocol) => protocol.id));

  for (const record of evidence) {
    if (!toolIds.has(record.toolId)) errors.push(`${record.toolId}: unknown tool ${record.toolId}`);
    if (!record.audienceFit?.trim()) errors.push(`${record.toolId}: audienceFit is required`);
    if (!record.limitations?.length) errors.push(`${record.toolId}: at least one limitation is required`);
    if (!record.alternatives?.length) errors.push(`${record.toolId}: at least one alternative is required`);
    for (const alternative of record.alternatives ?? []) {
      if (!toolIds.has(alternative)) errors.push(`${record.toolId}: unknown alternative ${alternative}`);
    }
    for (const source of record.sources ?? []) {
      if (!validHttps(source.url)) errors.push(`${record.toolId}: source ${source.label} must use HTTPS`);
      if (!validDate(source.checkedAt)) errors.push(`${record.toolId}: invalid checkedAt ${source.checkedAt}`);
    }
    if (record.level === "hands-on") {
      if (!record.handsOn) errors.push(`${record.toolId}: hands-on evidence requires handsOn test metadata`);
      else {
        if (!protocolIds.has(record.handsOn.protocolId)) errors.push(`${record.toolId}: unknown protocol ${record.handsOn.protocolId}`);
        if (!validDate(record.handsOn.testedAt)) errors.push(`${record.toolId}: invalid testedAt ${record.handsOn.testedAt}`);
      }
    }
  }

  return errors;
}
```

- [ ] **Step 5: Run tests and commit**

Run: `npm run test:content`

Expected: 3 tests pass, 0 fail.

```bash
git add package.json scripts/lib/content-audit.mjs scripts/tests/content-audit.test.mjs
git commit -m "test: add content evidence audit"
```

### Task 3: Define Repeatable Category Test Protocols

**Files:**
- Create: `data/content-test-protocols.mjs`
- Create: `research/README.md`

**Interfaces:**
- Consumes: `HandsOnTestRun.protocolId` from Task 1.
- Produces: protocol data matching `ContentTestProtocol[]`, used by the evidence registry and audit CLI.

- [ ] **Step 1: Add the protocol registry**

```js
export const contentTestProtocols = [
  {
    id: "writing-core-v1",
    cluster: "writing",
    version: 1,
    tasks: [
      { id: "rewrite", instruction: "Rewrite a 300-word source for a concise professional audience without changing facts.", evidenceToRecord: ["factual preservation", "tone control", "editing effort"] },
      { id: "long-form", instruction: "Create a structured 1,000-word draft from a five-point brief.", evidenceToRecord: ["structure", "repetition", "instruction adherence"] },
      { id: "grounding", instruction: "Summarize a supplied source and attach every factual claim to that source.", evidenceToRecord: ["unsupported claims", "citation clarity"] },
    ],
  },
  {
    id: "presentations-core-v1",
    cluster: "presentations",
    version: 1,
    tasks: [
      { id: "brief-to-deck", instruction: "Create a 10-slide sales presentation from a fixed brief.", evidenceToRecord: ["narrative", "layout variety", "editing effort"] },
      { id: "export", instruction: "Export the deck to every format available on the tested plan.", evidenceToRecord: ["formats", "watermarks", "formatting loss"] },
    ],
  },
  {
    id: "meetings-core-v1",
    cluster: "meetings",
    version: 1,
    tasks: [
      { id: "transcription", instruction: "Transcribe the shared 15-minute two-speaker recording.", evidenceToRecord: ["speaker accuracy", "proper nouns", "latency"] },
      { id: "actions", instruction: "Generate decisions and action items from the transcript.", evidenceToRecord: ["missed actions", "invented actions", "assignee accuracy"] },
    ],
  },
  {
    id: "research-core-v1",
    cluster: "research",
    version: 1,
    tasks: [
      { id: "cited-answer", instruction: "Answer a fixed market question using cited primary sources.", evidenceToRecord: ["citation validity", "source quality", "coverage"] },
      { id: "document-set", instruction: "Synthesize the shared five-document research pack.", evidenceToRecord: ["cross-document accuracy", "contradictions", "traceability"] },
    ],
  },
  {
    id: "image-editing-core-v1",
    cluster: "image-editing",
    version: 1,
    tasks: [
      { id: "background", instruction: "Remove and replace the background of the shared product image.", evidenceToRecord: ["edge quality", "manual corrections", "resolution"] },
      { id: "resize", instruction: "Create square, portrait, and landscape campaign variants.", evidenceToRecord: ["recomposition", "text safety", "export limits"] },
    ],
  },
]
```

- [ ] **Step 2: Document research-note storage**

Create `research/README.md` with this exact contract:

```md
# Editorial Research Notes

Store one Markdown file per tested product at `research/<tool-id>/<YYYY-MM-DD>.md`.

Each note records the protocol ID, tested plan, account region, test inputs, observed outputs, limitations, screenshots or artifact paths, and unresolved questions. Do not commit credentials, personal meeting recordings, private documents, or account identifiers. Use synthetic/shared fixtures only.
```

- [ ] **Step 3: Run lint and commit**

Run: `node -e "import('./data/content-test-protocols.mjs').then(({contentTestProtocols}) => console.log(contentTestProtocols.length))"`

Expected: prints `5` and exits 0.

```bash
git add data/content-test-protocols.mjs research/README.md
git commit -m "feat: define editorial test protocols"
```

### Task 4: Add The Batch 1 Product And Article Manifests

**Files:**
- Create: `data/content-evidence.mjs`
- Create: `data/batch-one-content.mjs`

**Interfaces:**
- Consumes: `ContentEvidenceRecord` from Task 1 and protocol IDs from Task 3.
- Produces: `contentEvidence` and `batchOneArticles` consumed by the audit CLI and later page-template plan.

- [ ] **Step 1: Create the evidence registry with the initial cohort**

Use an explicit record keyed by tool ID. Seed the registry with Grammarly and Gamma as official-source examples, then add records only as research is completed:

```js
export const contentEvidence = {
  grammarly: {
    toolId: "grammarly",
    level: "official-sources",
    audienceFit: "Professionals who need inline rewriting and proofreading across everyday apps.",
    limitations: ["Hands-on category protocol has not yet been completed."],
    alternatives: ["wordtune", "jasper", "chatgpt"],
    sources: [
      { type: "pricing", url: "https://www.grammarly.com/plans", label: "Grammarly plans", checkedAt: "2026-08-17" },
    ],
  },
  gamma: {
    toolId: "gamma",
    level: "official-sources",
    audienceFit: "Professionals who need a fast first draft of a web-native presentation.",
    limitations: ["Hands-on export and layout tests are still required."],
    alternatives: ["canva", "beautiful", "tome"],
    sources: [
      { type: "pricing", url: "https://gamma.app/pricing", label: "Gamma pricing", checkedAt: "2026-08-17" },
    ],
  },
}
```

Do not mark either record `hands-on` until its protocol note exists.

- [ ] **Step 2: Define the article manifest type and all 30 Batch 1 titles**

```js
export const batchOneArticles = [
  { slug: "best-ai-writing-tools", title: "Best AI Writing Tools for Work", cluster: "writing", type: "best", primaryIntent: "Choose an AI writing tool for professional work", toolIds: ["grammarly", "jasper", "copyai", "wordtune", "chatgpt"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-free-ai-writing-tools", title: "Best Free AI Writing Tools", cluster: "writing", type: "best", primaryIntent: "Choose a useful free AI writing plan", toolIds: ["grammarly", "wordtune", "quillbot", "chatgpt"], requiredEvidenceLevel: "official-sources" },
  { slug: "grammarly-vs-wordtune", title: "Grammarly vs Wordtune", cluster: "writing", type: "comparison", primaryIntent: "Compare editing workflow and value", toolIds: ["grammarly", "wordtune"], requiredEvidenceLevel: "hands-on" },
  { slug: "jasper-vs-copy-ai", title: "Jasper vs Copy.ai", cluster: "writing", type: "comparison", primaryIntent: "Compare marketing writing platforms", toolIds: ["jasper", "copyai"], requiredEvidenceLevel: "hands-on" },
  { slug: "grammarly-alternatives", title: "Best Grammarly Alternatives", cluster: "writing", type: "alternatives", primaryIntent: "Replace Grammarly by workflow and price", toolIds: ["grammarly", "wordtune", "quillbot", "prowritingaid"], requiredEvidenceLevel: "official-sources" },
  { slug: "ai-rewriting-workflow", title: "How to Rewrite Professional Content With AI", cluster: "writing", type: "tutorial", primaryIntent: "Rewrite content without changing facts", toolIds: ["grammarly", "wordtune", "chatgpt"], requiredEvidenceLevel: "hands-on" },
  { slug: "ai-marketing-copy-workflow", title: "How to Create Marketing Copy With AI", cluster: "writing", type: "tutorial", primaryIntent: "Create and verify marketing copy", toolIds: ["jasper", "copyai", "chatgpt"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-ai-presentation-makers", title: "Best AI Presentation Makers", cluster: "presentations", type: "best", primaryIntent: "Choose an AI presentation maker", toolIds: ["gamma", "canva", "beautiful", "tome"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-free-ai-presentation-makers", title: "Best Free AI Presentation Makers", cluster: "presentations", type: "best", primaryIntent: "Choose a free presentation tool", toolIds: ["gamma", "canva", "beautiful"], requiredEvidenceLevel: "official-sources" },
  { slug: "gamma-vs-canva", title: "Gamma vs Canva", cluster: "presentations", type: "comparison", primaryIntent: "Compare speed, editing, and exports", toolIds: ["gamma", "canva"], requiredEvidenceLevel: "hands-on" },
  { slug: "gamma-alternatives", title: "Best Gamma Alternatives", cluster: "presentations", type: "alternatives", primaryIntent: "Replace Gamma by workflow", toolIds: ["gamma", "canva", "beautiful", "tome"], requiredEvidenceLevel: "official-sources" },
  { slug: "ai-presentations-for-teachers", title: "Best AI Presentation Tools for Teachers", cluster: "presentations", type: "best", primaryIntent: "Create classroom presentations", toolIds: ["gamma", "canva", "beautiful"], requiredEvidenceLevel: "hands-on" },
  { slug: "ai-presentations-for-sales", title: "Best AI Presentation Tools for Sales Teams", cluster: "presentations", type: "best", primaryIntent: "Create sales presentations", toolIds: ["gamma", "canva", "beautiful"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-ai-meeting-assistants", title: "Best AI Meeting Assistants", cluster: "meetings", type: "best", primaryIntent: "Choose a meeting assistant", toolIds: ["otter", "fireflies", "fathom"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-free-ai-meeting-notes", title: "Best Free AI Meeting Note Takers", cluster: "meetings", type: "best", primaryIntent: "Choose a free meeting note tool", toolIds: ["otter", "fireflies", "fathom"], requiredEvidenceLevel: "official-sources" },
  { slug: "otter-vs-fireflies", title: "Otter.ai vs Fireflies.ai", cluster: "meetings", type: "comparison", primaryIntent: "Compare transcription and automation", toolIds: ["otter", "fireflies"], requiredEvidenceLevel: "hands-on" },
  { slug: "fathom-vs-otter", title: "Fathom vs Otter.ai", cluster: "meetings", type: "comparison", primaryIntent: "Compare free meeting workflows", toolIds: ["fathom", "otter"], requiredEvidenceLevel: "hands-on" },
  { slug: "ai-meeting-notes-for-zoom", title: "Best AI Meeting Notes for Zoom", cluster: "meetings", type: "best", primaryIntent: "Capture Zoom meeting notes", toolIds: ["otter", "fireflies", "fathom"], requiredEvidenceLevel: "hands-on" },
  { slug: "ai-meeting-notes-for-teams", title: "Best AI Meeting Notes for Microsoft Teams", cluster: "meetings", type: "best", primaryIntent: "Capture Teams meeting notes", toolIds: ["otter", "fireflies", "fathom"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-ai-research-tools", title: "Best AI Research Tools", cluster: "research", type: "best", primaryIntent: "Choose an AI research workflow", toolIds: ["perplexity", "notebooklm", "elicit", "consensus"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-free-ai-research-tools", title: "Best Free AI Research Tools", cluster: "research", type: "best", primaryIntent: "Choose a free research tool", toolIds: ["perplexity", "notebooklm", "elicit"], requiredEvidenceLevel: "official-sources" },
  { slug: "perplexity-vs-notebooklm", title: "Perplexity vs NotebookLM", cluster: "research", type: "comparison", primaryIntent: "Compare web and document research", toolIds: ["perplexity", "notebooklm"], requiredEvidenceLevel: "hands-on" },
  { slug: "elicit-vs-consensus", title: "Elicit vs Consensus", cluster: "research", type: "comparison", primaryIntent: "Compare academic research tools", toolIds: ["elicit", "consensus"], requiredEvidenceLevel: "hands-on" },
  { slug: "perplexity-alternatives", title: "Best Perplexity Alternatives", cluster: "research", type: "alternatives", primaryIntent: "Replace Perplexity by source type", toolIds: ["perplexity", "notebooklm", "you", "chatgpt"], requiredEvidenceLevel: "official-sources" },
  { slug: "research-with-ai-citations", title: "How to Research With AI Without Losing the Sources", cluster: "research", type: "tutorial", primaryIntent: "Build a traceable cited research workflow", toolIds: ["perplexity", "notebooklm", "elicit"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-ai-image-editors", title: "Best AI Image Editors", cluster: "image-editing", type: "best", primaryIntent: "Choose an AI image editor", toolIds: ["canva", "firefly", "photoroom", "remove-bg"], requiredEvidenceLevel: "hands-on" },
  { slug: "best-free-ai-image-editors", title: "Best Free AI Image Editors", cluster: "image-editing", type: "best", primaryIntent: "Choose a free image editor", toolIds: ["canva", "firefly", "photoroom", "remove-bg"], requiredEvidenceLevel: "official-sources" },
  { slug: "photoroom-vs-canva", title: "Photoroom vs Canva", cluster: "image-editing", type: "comparison", primaryIntent: "Compare product and general design workflows", toolIds: ["photoroom", "canva"], requiredEvidenceLevel: "hands-on" },
  { slug: "adobe-firefly-vs-canva", title: "Adobe Firefly vs Canva", cluster: "image-editing", type: "comparison", primaryIntent: "Compare generative editing workflows", toolIds: ["firefly", "canva"], requiredEvidenceLevel: "hands-on" },
  { slug: "remove-image-background-with-ai", title: "How to Remove and Replace an Image Background With AI", cluster: "image-editing", type: "tutorial", primaryIntent: "Create clean product image variants", toolIds: ["remove-bg", "photoroom", "canva"], requiredEvidenceLevel: "hands-on" },
]
```

- [ ] **Step 3: Run lint and commit**

Run: `node -e "Promise.all([import('./data/content-evidence.mjs'),import('./data/batch-one-content.mjs')]).then(([e,a]) => console.log(Object.keys(e.contentEvidence).length, a.batchOneArticles.length))"`

Expected: prints `2 30` and exits 0.

```bash
git add data/content-evidence.mjs data/batch-one-content.mjs
git commit -m "feat: add Batch 1 editorial manifests"
```

### Task 5: Build The Content Quality Gate CLI

**Files:**
- Create: `scripts/audit-content-evidence.mjs`
- Modify: `scripts/lib/content-audit.mjs`
- Modify: `scripts/tests/content-audit.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: canonical tools, evidence registry, protocols, and Batch 1 manifest.
- Produces: `npm run content:audit` for structural validity and `npm run content:audit:ready` as a non-zero publication gate when claims are unsupported.

- [ ] **Step 1: Add failing tests for article manifest invariants**

Append tests that require unique slugs, known tools, 30 total Batch 1 articles, the approved per-cluster counts, and hands-on coverage for hands-on-required articles.

```js
test("rejects duplicate slugs and unknown article tools", () => {
  const articles = [
    { slug: "same", cluster: "writing", toolIds: ["alpha"], requiredEvidenceLevel: "official-sources" },
    { slug: "same", cluster: "writing", toolIds: ["missing"], requiredEvidenceLevel: "official-sources" },
  ];
  const errors = auditEvidenceRecords({ tools, protocols, evidence: [], articles, expectedClusterCounts: null, requirePublicationReady: false });
  assert.ok(errors.includes("article same: duplicate slug"));
  assert.ok(errors.includes("article same: unknown tool missing"));
});

test("rejects a hands-on article without hands-on evidence", () => {
  const articles = [{ slug: "alpha-review", cluster: "writing", toolIds: ["alpha"], requiredEvidenceLevel: "hands-on" }];
  const errors = auditEvidenceRecords({ tools, protocols, evidence: [], articles, expectedClusterCounts: null, requirePublicationReady: true });
  assert.ok(errors.includes("article alpha-review: alpha lacks hands-on evidence"));
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:content`

Expected: FAIL because article validation is not implemented.

- [ ] **Step 3: Extend the pure audit**

Track article slugs, validate every referenced product, and when `expectedClusterCounts` is present compare it with:

```js
const BATCH_ONE_COUNTS = { writing: 7, presentations: 6, meetings: 6, research: 6, "image-editing": 5 };
```

The exact error forms used by tests are:

```js
errors.push(`article ${article.slug}: duplicate slug`);
errors.push(`article ${article.slug}: unknown tool ${toolId}`);
errors.push(`article ${article.slug}: ${toolId} lacks hands-on evidence`);
errors.push(`cluster ${cluster}: expected ${expected}, received ${actual}`);
```

Only enforce `requiredEvidenceLevel` when `requirePublicationReady` is true. Structural audits validate the manifest without pretending research is complete; publication-ready audits block unsupported claims.

- [ ] **Step 4: Create the CLI entry point**

The CLI imports the four registries and calls `auditEvidenceRecords`. Pass `requirePublicationReady: process.argv.includes("--ready")`. Print every error to stderr and exit 1 when any error exists. On structural success print:

```text
Content evidence audit passed: 30 Batch 1 articles and 2 evidence records validated.
```

On `--ready`, the same command succeeds only when all article evidence requirements are met.

Read `data/tools.json` with `fs.readFileSync` and `JSON.parse`. Import `contentEvidence`, `contentTestProtocols`, and `batchOneArticles` from their `.mjs` modules, then pass `Object.values(contentEvidence)` to `auditEvidenceRecords`. Do not transpile TypeScript or add a loader dependency.

- [ ] **Step 5: Add the audit command**

Add to `package.json`:

```json
"content:audit": "node scripts/audit-content-evidence.mjs",
"content:audit:ready": "node scripts/audit-content-evidence.mjs --ready"
```

- [ ] **Step 6: Run the tests and audit**

Run: `npm run test:content && npm run content:audit`

Expected: unit tests pass and the structural audit validates 30 articles. Unknown product IDs are corrected against `data/tools.json`; missing hands-on records do not fail structural mode.

Run: `npm run content:audit:ready`

Expected: exits 1 and names every article blocked by missing hands-on or official-source evidence. Do not downgrade an article's evidence requirement to make this command pass; the follow-on editorial-production plan resolves these blockers.

- [ ] **Step 7: Commit the quality gate**

```bash
git add package.json scripts/audit-content-evidence.mjs scripts/lib/content-audit.mjs scripts/tests/content-audit.test.mjs
git commit -m "feat: enforce editorial evidence quality gate"
```

### Task 6: Document The Editorial Operating Procedure

**Files:**
- Create: `docs/editorial/content-evidence-workflow.md`

**Interfaces:**
- Consumes: evidence levels, protocols, manifests, and audit commands from Tasks 1-5.
- Produces: the human workflow used to move products from watchlist to verified or tested.

- [ ] **Step 1: Write the workflow document**

The document must define this state transition:

```text
watchlist -> official-sources -> hands-on
```

It must include:

- The required fields for each evidence level
- The first-party source rule
- How to create `research/<tool-id>/<date>.md`
- How to run the correct protocol without changing its inputs
- How to record unknowns and contradictions
- The rule that stale evidence changes the public label to `Update required`
- Monthly pricing, quarterly Tier 1, and six-month evergreen review cadence
- The commands `npm run test:content`, `npm run content:audit`, `npm run lint`, and `npm run build`
- A release checklist that blocks unsupported hands-on claims

- [ ] **Step 2: Verify exact command and path references**

Run:

```powershell
rg -n "test:content|content:audit|research/<tool-id>|Hands-on tested|Official sources verified|Update required" docs/editorial/content-evidence-workflow.md
```

Expected: every required command, path, and label appears.

- [ ] **Step 3: Commit the operating procedure**

```bash
git add docs/editorial/content-evidence-workflow.md
git commit -m "docs: add editorial evidence workflow"
```

### Task 7: Final Foundation Verification

**Files:**
- Verify only; no planned modifications.

**Interfaces:**
- Consumes: all deliverables from Tasks 1-6.
- Produces: a verified foundation ready for the separate SEO page-template implementation plan.

- [ ] **Step 1: Run focused tests and audits**

Run: `npm run test:content && npm run content:audit`

Expected: all tests pass and the audit reports exactly 30 Batch 1 articles.

Run: `npm run content:audit:ready`

Expected: exits 1 with an explicit blocked-article list until the follow-on editorial-production plan supplies the required research. An unexpected exit 0 is valid only if every required record and hands-on note truly exists.

- [ ] **Step 2: Run repository quality checks**

Run: `npm run lint && npm run seo:audit && npm run pricing:audit && npm run build`

Expected: all commands exit 0 and Next.js completes the production build.

- [ ] **Step 3: Inspect the final diff**

Run: `git diff --check HEAD~6..HEAD && git status --short`

Expected: no whitespace errors. Existing unrelated user changes may remain, but no unplanned content-foundation files are modified.

- [ ] **Step 4: Record completion**

Do not create an empty commit. Report the test counts, audit record count, Batch 1 article count, and every article intentionally blocked pending hands-on research.

## Follow-On Plans

After this plan passes, create two separate implementation plans:

1. `english-decision-pages`: shared content schema, routes, templates, structured data, internal links, and responsive browser verification.
2. `batch-one-editorial-production`: research assignments, hands-on test execution, drafting, fact review, and staged publication for the 30 approved titles.

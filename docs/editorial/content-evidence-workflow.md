# Content Evidence Workflow

Use this procedure for every product considered for an English decision page. Evidence moves through one direction only:

```text
watchlist -> official-sources -> hands-on
```

Do not skip a state or infer a later state from a competitor, review, directory, cached page, or other third-party summary.

## Evidence states

Every record identifies `toolId`, `level`, `audienceFit`, at least one concrete `limitations` entry, at least one `alternatives` entry, and its `sources` array. Keep dates in `YYYY-MM-DD` format. Every source must include a claim `type`, human-readable `label`, HTTPS `url`, and `checkedAt` date.

### Watchlist

Use `level: "watchlist"` when evidence is missing, incomplete, or stale. Record the known audience fit, limitations, alternatives, and any leads in `sources`, but do not present the product as verified. Its public label is `Update required`.

### Official sources

Use `level: "official-sources"` only after checking the product's first-party website and the relevant official pricing, help, terms, platform, regional, feature, and changelog pages. Record each checked claim as a source with its URL, label, type, and date. Record the audience fit, material limitations, alternatives, and latest update when available. The public label is `Official sources verified`.

### Hands-on

Use `level: "hands-on"` only after completing the registered category protocol. Add `handsOn.protocolId`, the protocol's `testedAt` date, the tested `accountTier`, and the exact note path. Keep the official sources that support pricing and product facts. Record observed outputs, speed, workflow friction, limitations, free allowance, export behavior, and paid restrictions in the note. The public label is `Hands-on tested`.

## First-party source rule

For claims about pricing, limits, licensing, platforms, regions, features, or updates, cite the product owner or provider's own page. Third-party sources can identify a lead or unresolved question, but they cannot verify a claim or move a record out of `watchlist`. If an official source is unavailable or contradictory, retain the affected fact as unknown or disputed and do not phrase it as settled.

## Research note procedure

Before a hands-on run, create `research/<tool-id>/<date>.md`, using the test date in `YYYY-MM-DD` format. The note must contain:

- tool ID, protocol ID and protocol version;
- tested plan/account tier and account region;
- the unchanged protocol task inputs and shared synthetic fixtures;
- observed output for every task and every `evidenceToRecord` item;
- limitations, free allowance, export behavior, paid restrictions, and workflow friction;
- screenshots or artifact paths where they support an observation; and
- unresolved questions, unknowns, and contradictions.

Do not commit credentials, personal meeting recordings, private documents, or account identifiers. Use only synthetic or shared fixtures.

Run the exact protocol registered for the product's content cluster. Copy its task instructions and inputs without changing wording, order, fixtures, account tier, or success criteria. If an input cannot be run, record the reason and result as unknown; do not substitute an easier input and call the protocol complete. A protocol run is not evidence until its note path is recorded in `handsOn.notesPath`.

## Unknowns and contradictions

Write unknowns explicitly in the evidence record's limitations or in the research note's unresolved-questions section. For contradictory official pages, record both URLs, the claim and dates, the conflicting values, and the resolution owner or next check. Do not choose the more favorable value, silently merge values, or convert an unresolved contradiction into a feature, limit, or pricing claim.

## Freshness and review cadence

Stale evidence changes the public label to `Update required` until the affected sources or test are reviewed. Apply these review intervals:

- pricing and plan limits: review monthly;
- Tier 1 hands-on records: rerun the full protocol quarterly;
- evergreen facts and evergreen pages: review every six months.

Also review immediately when the provider publishes a material pricing, plan, feature, platform, terms, or changelog change. Update the checked/tested date and note after review; do not retain an authoritative label solely because the old evidence remains in the repository.

## Validation commands

Before requesting publication, run each command from the repository root and resolve every failure:

```bash
npm run test:content
npm run content:audit
npm run lint
npm run build
```

Use `npm run content:audit:ready` when checking publication readiness. The manifest's `requiredEvidenceLevel` controls the minimum state: an article requiring hands-on evidence must have a hands-on record for every referenced tool; an official-sources article may use official or hands-on evidence.

## Release checklist

- [ ] Each product has the correct state in the evidence registry and all required fields.
- [ ] Every factual claim has a current first-party source, or is marked unknown/contradictory.
- [ ] Every hands-on record has a registered protocol, unchanged inputs, valid test metadata, and a `research/<tool-id>/<date>.md` note.
- [ ] The article manifest's required evidence level is met for every referenced product.
- [ ] Stale records are labeled `Update required` and are excluded from authoritative claims.
- [ ] `npm run test:content`, `npm run content:audit`, `npm run lint`, and `npm run build` pass.
- [ ] Release is blocked if any article claims `Hands-on tested` without a completed protocol note and matching hands-on evidence record.

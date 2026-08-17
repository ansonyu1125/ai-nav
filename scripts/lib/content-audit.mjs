const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;
const SUPPORTED_CLUSTERS = new Set(["writing", "presentations", "meetings", "research", "image-editing"]);
const SUPPORTED_ARTICLE_TYPES = new Set(["best", "comparison", "alternatives", "pricing", "review", "tutorial"]);
const SUPPORTED_EVIDENCE_LEVELS = new Set(["hands-on", "official-sources"]);
const REQUIRED_OFFICIAL_SOURCE_TYPES = ["pricing", "licensing", "platforms", "regions", "features", "updates"];

function parseIsoDate(value) {
  const match = ISO_DATE.exec(value ?? "");
  if (!match) return null;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date;
}

function parseHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function ageInDays(date, today) {
  return (today.getTime() - date.getTime()) / DAY_MS;
}

function safeResearchNotePath(toolId, value) {
  if (typeof value !== "string" || !value.trim()) return false;
  if (value.includes("%") || value.includes("\\") || value.startsWith("/") || value.includes(":") || !value.startsWith(`research/${toolId}/`)) return false;
  const relativeParts = value.slice(`research/${toolId}/`.length).split("/");
  return relativeParts.every((part) => part && part !== "." && part !== "..");
}

export function auditEvidenceRecords({
  tools,
  evidence,
  protocols,
  articles,
  expectedClusterCounts = null,
  requirePublicationReady = false,
  today,
  researchNoteExists = null,
}) {
  const errors = [];
  const toolIds = new Set(tools.map((tool) => tool.id));
  const toolsById = new Map(tools.map((tool) => [tool.id, tool]));
  const protocolsById = new Map(protocols.map((protocol) => [protocol.id, protocol]));
  const evidenceByToolId = new Map(evidence.map((record) => [record.toolId, record]));
  const currentDate = parseIsoDate(today);
  const officialEvidenceReady = new Map();
  const validRunsByTool = new Map();

  if (requirePublicationReady && !currentDate) errors.push(`audit: invalid today ${today}`);

  for (const record of evidence) {
    const tool = toolsById.get(record.toolId);
    if (!tool) errors.push(`${record.toolId}: unknown tool ${record.toolId}`);
    if (!record.audienceFit?.trim()) errors.push(`${record.toolId}: audienceFit is required`);
    if (!record.limitations?.length) errors.push(`${record.toolId}: at least one limitation is required`);
    if (!record.alternatives?.length) errors.push(`${record.toolId}: at least one alternative is required`);
    for (const alternative of record.alternatives ?? []) {
      if (!toolIds.has(alternative)) errors.push(`${record.toolId}: unknown alternative ${alternative}`);
    }

    const requiresOfficialValidation = requirePublicationReady && (record.level === "official-sources" || record.level === "hands-on");
    const officialUrl = parseHttpsUrl(tool?.officialUrl);
    const allowedHosts = new Set([officialUrl?.hostname, ...(record.allowedSourceHosts ?? [])].filter(Boolean).map((host) => host.toLowerCase()));
    const currentFirstPartyTypes = new Set();

    for (const source of record.sources ?? []) {
      const sourceUrl = parseHttpsUrl(source.url);
      const checkedAt = parseIsoDate(source.checkedAt);
      if (!sourceUrl) errors.push(`${record.toolId}: source ${source.label} must use HTTPS`);
      if (!checkedAt) errors.push(`${record.toolId}: invalid checkedAt ${source.checkedAt}`);

      let isCurrent = false;
      if (requiresOfficialValidation && checkedAt && currentDate) {
        const maximumAge = source.type === "pricing" ? 31 : 183;
        const age = ageInDays(checkedAt, currentDate);
        isCurrent = age >= 0 && age <= maximumAge;
        if (age < 0) errors.push(`${record.toolId}: ${source.type} source ${source.label} is dated in the future`);
        else if (age > maximumAge) errors.push(`${record.toolId}: ${source.type} source ${source.label} is stale (${age} days old; maximum ${maximumAge})`);
      }

      let isFirstParty = false;
      if (requiresOfficialValidation && sourceUrl) {
        isFirstParty = allowedHosts.has(sourceUrl.hostname.toLowerCase());
        if (!isFirstParty) errors.push(`${record.toolId}: source ${source.label} host ${sourceUrl.hostname} is not an allowed first-party host`);
      }
      if (isCurrent && isFirstParty) currentFirstPartyTypes.add(source.type);
    }

    if (requiresOfficialValidation) {
      for (const type of REQUIRED_OFFICIAL_SOURCE_TYPES) {
        if (!currentFirstPartyTypes.has(type)) errors.push(`${record.toolId}: official evidence is missing ${type} source`);
      }
      officialEvidenceReady.set(record.toolId, REQUIRED_OFFICIAL_SOURCE_TYPES.every((type) => currentFirstPartyTypes.has(type)));
    }

    const runs = record.handsOn;
    if (record.level === "hands-on" && (!Array.isArray(runs) || runs.length === 0)) {
      errors.push(`${record.toolId}: hands-on evidence requires at least one handsOn test run`);
    }
    if (runs !== undefined && !Array.isArray(runs)) {
      errors.push(`${record.toolId}: handsOn must be an array`);
      continue;
    }

    const validRuns = [];
    for (const run of runs ?? []) {
      const protocol = protocolsById.get(run.protocolId);
      const protocolHasTasks = Array.isArray(protocol?.tasks) && protocol.tasks.length > 0;
      const testedAt = parseIsoDate(run.testedAt);
      const notesPathIsSafe = safeResearchNotePath(record.toolId, run.notesPath);
      if (!protocol) errors.push(`${record.toolId}: unknown protocol ${run.protocolId}`);
      else if (!protocolHasTasks) errors.push(`${record.toolId}: protocol ${run.protocolId} must contain at least one task`);
      if (!testedAt) errors.push(`${record.toolId}: invalid testedAt ${run.testedAt}`);
      if (!run.accountTier?.trim()) errors.push(`${record.toolId}: hands-on run accountTier is required`);
      if (!run.notesPath?.trim()) errors.push(`${record.toolId}: hands-on run notesPath is required`);
      else if (!notesPathIsSafe) errors.push(`${record.toolId}: hands-on run notesPath must be a safe path under research/${record.toolId}/`);

      let isFresh = !requirePublicationReady;
      if (requirePublicationReady && testedAt && currentDate) {
        const age = ageInDays(testedAt, currentDate);
        isFresh = age >= 0 && age <= 92;
        if (age < 0) errors.push(`${record.toolId}: hands-on run ${run.protocolId} is dated in the future`);
        else if (age > 92) errors.push(`${record.toolId}: hands-on run ${run.protocolId} is stale (${age} days old; maximum 92)`);
      }

      let noteExists = true;
      if (requirePublicationReady && researchNoteExists && notesPathIsSafe) {
        noteExists = researchNoteExists(run.notesPath);
        if (!noteExists) errors.push(`${record.toolId}: research note does not exist: ${run.notesPath}`);
      }

      if (protocolHasTasks && testedAt && run.accountTier?.trim() && notesPathIsSafe && isFresh && noteExists) {
        validRuns.push({ ...run, cluster: protocol.cluster });
      }
    }
    validRunsByTool.set(record.toolId, validRuns);
  }

  const articleSlugs = new Set();
  const clusterCounts = new Map();

  for (const [index, article] of articles.entries()) {
    const articleLabel = article.slug?.trim() ? `article ${article.slug}` : `article at index ${index}`;
    if (!article.slug?.trim()) errors.push(`${articleLabel}: slug is required`);
    else if (articleSlugs.has(article.slug)) errors.push(`article ${article.slug}: duplicate slug`);
    else articleSlugs.add(article.slug);
    if (!article.title?.trim()) errors.push(`${articleLabel}: title is required`);
    if (!article.primaryIntent?.trim()) errors.push(`${articleLabel}: primaryIntent is required`);
    if (!Array.isArray(article.toolIds) || article.toolIds.length === 0) errors.push(`${articleLabel}: at least one toolId is required`);
    if (!SUPPORTED_CLUSTERS.has(article.cluster)) errors.push(`${articleLabel}: invalid cluster ${article.cluster}`);
    if (!SUPPORTED_ARTICLE_TYPES.has(article.type)) errors.push(`${articleLabel}: invalid type ${article.type}`);
    const evidenceLevelIsValid = SUPPORTED_EVIDENCE_LEVELS.has(article.requiredEvidenceLevel);
    if (!evidenceLevelIsValid) errors.push(`${articleLabel}: invalid requiredEvidenceLevel ${article.requiredEvidenceLevel}`);

    clusterCounts.set(article.cluster, (clusterCounts.get(article.cluster) ?? 0) + 1);
    for (const toolId of article.toolIds ?? []) {
      if (!toolIds.has(toolId)) {
        errors.push(`${articleLabel}: unknown tool ${toolId}`);
        continue;
      }
      if (!requirePublicationReady || !evidenceLevelIsValid) continue;

      const evidenceRecord = evidenceByToolId.get(toolId);
      if (article.requiredEvidenceLevel === "official-sources") {
        const sufficientLevel = evidenceRecord?.level === "official-sources" || evidenceRecord?.level === "hands-on";
        if (!sufficientLevel || !officialEvidenceReady.get(toolId)) {
          errors.push(`${articleLabel}: ${toolId} lacks complete current official-sources evidence`);
        }
      } else if (article.requiredEvidenceLevel === "hands-on") {
        const matchingRun = evidenceRecord?.level === "hands-on"
          && validRunsByTool.get(toolId)?.some((run) => run.cluster === article.cluster);
        if (!matchingRun) errors.push(`${articleLabel}: ${toolId} lacks fresh ${article.cluster} hands-on evidence`);
      }
    }
  }

  for (const [cluster, expected] of Object.entries(expectedClusterCounts ?? {})) {
    const actual = clusterCounts.get(cluster) ?? 0;
    if (actual !== expected) errors.push(`cluster ${cluster}: expected ${expected}, received ${actual}`);
  }
  for (const [cluster, actual] of clusterCounts) {
    if (expectedClusterCounts && !Object.hasOwn(expectedClusterCounts, cluster)) {
      errors.push(`cluster ${cluster}: expected 0, received ${actual}`);
    }
  }

  return errors;
}

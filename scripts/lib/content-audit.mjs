const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value) {
  return ISO_DATE.test(value ?? "") && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function validHttps(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
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

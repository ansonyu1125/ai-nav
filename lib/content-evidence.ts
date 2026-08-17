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
  allowedSourceHosts?: string[];
  handsOn?: HandsOnTestRun[];
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
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function isOfficialHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

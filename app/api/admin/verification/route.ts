import { NextResponse } from "next/server";
import { getRedis } from "@/lib/news";
import { pricingRecords } from "@/lib/pricing-database";
import { getTool } from "@/lib/tools";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";
const statuses = new Set(["verified", "needs_update", "rejected"]);
const localStorePath = path.join(process.cwd(), "data", "admin-verification.local.json");
type LocalStore = { overrides: Record<string, unknown>; audits: Array<Record<string, unknown>>; feedbackReviews: Array<Record<string, unknown>> };
function readLocalStore(): LocalStore { try { return JSON.parse(fs.readFileSync(localStorePath, "utf8")) as LocalStore; } catch { return { overrides: {}, audits: [], feedbackReviews: [] }; } }
function writeLocalStore(store: LocalStore) { fs.writeFileSync(localStorePath, `${JSON.stringify(store, null, 2)}\n`); }

function authorized(request: Request) {
  const expected = process.env.ADMIN_VERIFICATION_TOKEN;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  return Boolean(expected && supplied && supplied.length === expected.length && crypto.subtle);
}

async function validToken(request: Request) {
  if (!authorized(request)) return false;
  const expected = new TextEncoder().encode(process.env.ADMIN_VERIFICATION_TOKEN!);
  const supplied = new TextEncoder().encode(request.headers.get("authorization")!.replace(/^Bearer\s+/i, ""));
  if (expected.length !== supplied.length) return false;
  const a = await crypto.subtle.digest("SHA-256", expected); const b = await crypto.subtle.digest("SHA-256", supplied);
  return Buffer.from(a).equals(Buffer.from(b));
}

export async function GET(request: Request) {
  if (!(await validToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const redis = getRedis();
  const queue = pricingRecords.filter((record) => record.status !== "verified").sort((a, b) => {
    const rank = { source_pending: 0, legacy_unverified: 1, verified: 2 };
    return rank[a.status] - rank[b.status] || b.plans.length - a.plans.length;
  }).slice(0, 150).map((record) => ({ ...record, toolName: getTool(record.toolId)?.name ?? record.toolId }));
  let feedback: Array<Record<string, unknown>> = []; let audits: Array<Record<string, unknown>> = []; let overrides: Record<string, unknown> = {}; let storageMode = "redis";
  if (redis) {
    feedback = ((await redis.lrange("ainav:feedback:pending", 0, 99)) as Array<Record<string, unknown>>).map((item) => ({ id: item.id, toolId: item.toolId, issueType: item.issueType, message: item.message, status: item.status, createdAt: item.createdAt }));
    audits = (await redis.lrange("ainav:verification:audit", 0, 99)) as Array<Record<string, unknown>>;
    overrides = (await redis.hgetall("ainav:verification:overrides")) ?? {};
  } else if (process.env.NODE_ENV === "development") {
    const local = readLocalStore(); audits = local.audits; overrides = local.overrides; storageMode = "local";
  } else { storageMode = "unconfigured"; }
  return NextResponse.json({ configured: Boolean(redis) || storageMode === "local", storageMode, queue, feedback, audits, overrides }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await validToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const redis = getRedis(); const useLocal = !redis && process.env.NODE_ENV === "development"; if (!redis && !useLocal) return NextResponse.json({ error: "Verification storage is not configured." }, { status: 503 });
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const action = String(body.action ?? ""); const now = new Date().toISOString();
  if (action === "save-verification") {
    const toolId = String(body.toolId ?? ""); const status = String(body.status ?? ""); const sourceUrl = String(body.sourceUrl ?? "").slice(0, 1000); const note = String(body.note ?? "").trim().slice(0, 2000);
    if (!getTool(toolId) || !statuses.has(status) || !/^https:\/\//.test(sourceUrl) || note.length < 5) return NextResponse.json({ error: "Tool, status, HTTPS source, and review note are required." }, { status: 400 });
    const record = { toolId, status, sourceUrl, note, reviewedAt: now };
    const audit = { id: crypto.randomUUID(), action, ...record };
    if (redis) { await redis.hset("ainav:verification:overrides", { [toolId]: record }); await redis.lpush("ainav:verification:audit", audit); } else { const local = readLocalStore(); local.overrides[toolId] = record; local.audits.unshift(audit); writeLocalStore(local); }
    return NextResponse.json({ ok: true, record });
  }
  if (action === "review-feedback") {
    const reportId = String(body.reportId ?? ""); const decision = String(body.decision ?? ""); const note = String(body.note ?? "").trim().slice(0, 1000);
    if (!reportId || !["accepted", "rejected"].includes(decision)) return NextResponse.json({ error: "Report and decision are required." }, { status: 400 });
    const record = { reportId, decision, note, reviewedAt: now }; const audit = { id: crypto.randomUUID(), action, ...record }; if (redis) { await redis.lpush("ainav:feedback:reviewed", record); await redis.lpush("ainav:verification:audit", audit); } else { const local = readLocalStore(); local.feedbackReviews.unshift(record); local.audits.unshift(audit); writeLocalStore(local); }
    return NextResponse.json({ ok: true, record });
  }
  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}

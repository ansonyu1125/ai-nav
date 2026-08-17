import { NextResponse } from "next/server";
import { getRedis } from "@/lib/news";
import { getTool } from "@/lib/tools";

const issueTypes = new Set(["pricing", "broken-link", "update"]);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const toolId = typeof data.toolId === "string" ? data.toolId.trim() : "";
  const issueType = typeof data.issueType === "string" ? data.issueType : "";
  const message = typeof data.message === "string" ? data.message.trim().slice(0, 2000) : "";
  const email = typeof data.email === "string" ? data.email.trim().slice(0, 254) : "";

  if (!getTool(toolId) || !issueTypes.has(issueType) || message.length < 8) {
    return NextResponse.json({ error: "Please provide a valid report with enough detail." }, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Feedback storage is not configured yet." }, { status: 503 });
  }

  const report = {
    id: crypto.randomUUID(),
    toolId,
    issueType,
    message,
    email: email || null,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await redis.lpush("ainav:feedback:pending", report);
  return NextResponse.json({ ok: true });
}

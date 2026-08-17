import { NextResponse } from "next/server";
import { getRedis } from "@/lib/news";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = typeof (body as Record<string, unknown>).email === "string"
    ? String((body as Record<string, unknown>).email).trim().toLowerCase()
    : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "Subscription storage is not configured." }, { status: 503 });
  await redis.sadd("ainav:newsletter:subscribers", email);
  await redis.lpush("ainav:newsletter:events", { email, createdAt: new Date().toISOString(), source: "website" });
  return NextResponse.json({ ok: true });
}

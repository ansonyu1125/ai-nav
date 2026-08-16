import type { NextRequest } from "next/server";
import { fetchFeedItems, generateArticles } from "@/lib/news-generate";
import { getArticles, saveArticles, getRedis } from "@/lib/news";

export const runtime = "nodejs";
export const maxDuration = 60;

// 由 Vercel Cron 定时调用（见 vercel.json）。也可手动访问 /api/cron 测试。
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "缺少 DEEPSEEK_API_KEY 环境变量" },
      { status: 500 },
    );
  }

  const redis = getRedis();

  const existing = await getArticles();
  const seen = new Set(existing.map((a) => a.sourceUrl));

  const items = await fetchFeedItems();
  const fresh = items.filter((i) => i.link && !seen.has(i.link)).slice(0, 5);

  const generated = fresh.length > 0 ? await generateArticles(fresh, apiKey) : [];
  const merged = [...generated, ...existing].slice(0, 200);

  let saveError: string | null = null;
  if (redis) {
    try {
      await saveArticles(merged);
    } catch (e) {
      saveError = e instanceof Error ? e.message : String(e);
    }
  }

  // 存完立刻读回，验证「写→读」是否闭环
  let readBackCount = -1;
  let rawGet = "";
  let rawGetError: string | null = null;
  if (redis) {
    readBackCount = (await getArticles()).length;
    try {
      const raw = await redis.get<string>("news:articles");
      rawGet = typeof raw === "string" ? raw.slice(0, 120) : String(raw);
    } catch (e) {
      rawGetError = e instanceof Error ? e.message : String(e);
    }
  }

  return Response.json({
    ok: true,
    added: generated.length,
    total: merged.length,
    skipped: items.length - fresh.length,
    diag: {
      version: "diag-2",
      redisConnected: redis !== null,
      saveError,
      readBackCount,
      rawGet,
      rawGetError,
    },
  });
}

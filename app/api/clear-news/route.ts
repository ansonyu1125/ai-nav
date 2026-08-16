import { clearArticles } from "@/lib/news";

export const runtime = "nodejs";
export const maxDuration = 15;

// 清空资讯缓存（调试用，用完可删）
export async function GET() {
  await clearArticles();
  return Response.json({ ok: true, cleared: true });
}

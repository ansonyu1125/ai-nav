import { getArticles } from "@/lib/news";

export const runtime = "nodejs";
export const maxDuration = 15;

// 临时诊断接口：查看 Redis 里实际存了什么，排查 slug 与字段问题
export async function GET() {
  const articles = await getArticles();
  return Response.json({
    count: articles.length,
    articles: articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      source: a.source ?? null,
      summary: (a.summary ?? "").slice(0, 80),
      contentLen: (a.content ?? "").length,
      publishedAt: a.publishedAt ?? null,
      tags: a.tags ?? [],
    })),
  });
}

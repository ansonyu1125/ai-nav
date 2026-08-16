import { Redis } from "@upstash/redis";
import localNews from "@/data/news.json";

export interface Article {
  slug: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  tags: string[];
}

const KV_KEY = "news:articles";

// 惰性创建 Redis 客户端：仅在配置了环境变量时才连接（生产 Vercel 用 Upstash Redis）
export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function parse(raw: string): Article[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as Article[]) : [];
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const raw = await redis.get<string>(KV_KEY);
      if (raw) return parse(raw);
    } catch (e) {
      console.error("[news] 读取 Redis 失败，回退本地数据", e);
    }
  }
  // 本地开发回退到 data/news.json（由 scripts/fetch-news.mjs 生成）
  return localNews as unknown as Article[];
}

export async function saveArticles(articles: Article[]): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(KV_KEY, JSON.stringify(articles));
  }
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug);
}

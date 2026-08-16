import Parser from "rss-parser";
import sources from "@/data/news-sources.json";
import type { Article } from "./news";

interface Source {
  name: string;
  url: string;
}

const newsSources = sources as Source[];

export interface RawItem {
  title: string;
  link: string;
  summary: string;
  pubDate: string;
  source: string;
}

const parser = new Parser({ timeout: 15000 });

// 抓取所有源的最近条目（单个源失败不影响整体）
export async function fetchFeedItems(): Promise<RawItem[]> {
  const results = await Promise.all(
    newsSources.map(async (src): Promise<RawItem[]> => {
      try {
        const feed = await parser.parseURL(src.url);
        return (feed.items || []).slice(0, 6).map((item) => ({
          title: (item.title || "").trim(),
          link: (item.link || "").trim(),
          summary: (item.contentSnippet || item.summary || "").trim().slice(0, 600),
          pubDate: item.isoDate || item.pubDate || "",
          source: src.name,
        }));
      } catch (e) {
        console.error(`[news] 抓取失败 ${src.name}:`, e);
        return [];
      }
    }),
  );
  return results.flat();
}

async function callDeepSeek(user: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: user }],
      temperature: 0.6,
    }),
  });
  if (!res.ok) {
    throw new Error(`DeepSeek ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

function slugify(s: string): string {
  // 只保留英文/数字，避免中文进入 URL 导致详情页路由对不上（404）
  const ascii = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return ascii || "news";
}

function shortHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).slice(0, 6);
}

function extractJson(s: string): string {
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  const obj = s.match(/(\{[\s\S]*\})/);
  return (fence ? fence[1] : obj ? obj[1] : s).trim();
}

async function buildArticle(item: RawItem, apiKey: string): Promise<Article> {
  const prompt = `你是一名专业的 AI 资讯编辑，负责把海外英文 AI 新闻改写成中文短讯，发布到 AI 导航网站。

请把下面这条英文资讯改写成一篇中文短讯，只输出一个 JSON 对象（不要输出任何其他文字、不要用 Markdown 代码块包裹），字段如下：
{
  "title": "简洁有力的中文标题",
  "summary": "2-3 句中文摘要",
  "content": "中文正文（Markdown 格式，3-5 段，用自己的话概括新闻要点，保留关键数据、产品名、日期与数字，不要逐字直译）",
  "tags": ["2到4个中文标签"]
}

要求：内容准确，不要臆造原文没有的信息；语言自然流畅、面向中文读者。

原始标题：${item.title}
来源：${item.source}
原始内容：${item.summary}`;

  const text = await callDeepSeek(prompt, apiKey);

  let parsed: Partial<Article>;
  try {
    parsed = JSON.parse(extractJson(text));
  } catch {
    parsed = {};
  }

  const date = new Date().toISOString().slice(0, 10);
  const title = (parsed.title || item.title || "未命名").trim();
  const slug = `${date}-${slugify(title)}-${shortHash(item.link)}`;

  return {
    slug,
    title,
    summary: parsed.summary || item.summary || "",
    content: parsed.content || text,
    source: item.source,
    sourceUrl: item.link,
    publishedAt: new Date().toISOString(),
    tags: Array.isArray(parsed.tags)
      ? (parsed.tags as string[]).slice(0, 4)
      : [],
  };
}

export async function generateArticles(
  items: RawItem[],
  apiKey: string,
): Promise<Article[]> {
  const out = await Promise.all(
    items.map(async (item) => {
      try {
        return await buildArticle(item, apiKey);
      } catch (e) {
        console.error(`[news] 生成失败 ${item.title}:`, e);
        return null;
      }
    }),
  );
  return out.filter((a): a is Article => a !== null);
}

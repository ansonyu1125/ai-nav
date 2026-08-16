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
  content: string;
  pubDate: string;
  source: string;
}

const parser = new Parser({ timeout: 15000 });

// 从多个候选里挑出最长的一段（通常是全文，而不是截断的摘要）
function pickLongest(...vals: (string | undefined)[]): string {
  return vals
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .sort((a, b) => b.length - a.length)[0] || "";
}

// 去掉 HTML 标签、解码常见实体、压缩空白，得到干净纯文本
function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

// 抓取所有源的最近条目（单个源失败不影响整体）
export async function fetchFeedItems(): Promise<RawItem[]> {
  const results = await Promise.all(
    newsSources.map(async (src): Promise<RawItem[]> => {
      try {
        const feed = await parser.parseURL(src.url);
        return (feed.items || []).slice(0, 6).map((item) => {
          const anyItem = item as unknown as Record<string, unknown>;
          // 优先取全文：content:encoded（RSS）/ content（Atom）/ summary，再退回 snippet
          const fullHtml = pickLongest(
            item.content,
            anyItem["content:encoded"] as string | undefined,
            anyItem["content"] as string | undefined,
            item.summary,
            item.contentSnippet,
          );
          return {
            title: (item.title || "").trim(),
            link: (item.link || "").trim(),
            summary: stripHtml(item.contentSnippet || item.summary || "").slice(0, 300),
            content: stripHtml(fullHtml).slice(0, 4000),
            pubDate: item.isoDate || item.pubDate || "",
            source: src.name,
          };
        });
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
  const prompt = `你是一名资深 AI 科技编辑，负责把海外英文 AI 新闻改写成一篇信息量充足的资讯文章，同时提供中文和英文两个版本，发布到 AI 导航网站。

请把下面这条英文资讯改写，只输出一个 JSON 对象（不要输出任何其他文字，不要用 Markdown 代码块包裹整个 JSON），字段如下：
{
  "title": "简洁有力的中文标题",
  "summary": "2-3 句中文摘要，点出核心信息",
  "content": "中文正文（Markdown 格式，用 ## 分小节）",
  "titleEn": "Concise English title",
  "summaryEn": "2-3 sentence English summary",
  "contentEn": "English body (Markdown, use ## for sections)",
  "tags": ["2到4个中文标签"]
}

正文 content（中文）和 contentEn（英文）都必须满足以下要求（否则视为不合格）：
1. 中文 600~1000 字，英文 300~500 词；各分 4~6 个小节，每节用 ## 标题开头。
2. 必须大量摘录原文里的具体事实，让文章有信息量：关键数字、百分比、金额、价格、参数、版本号、发布日期、人名、公司名、产品名、引用的原话，都要保留并写进正文，禁止删掉或一笔带过。
3. 严禁空话、套话，例如「本文介绍了」「具有重要意义」「值得关注」这类没有信息量的句子。
4. 结构建议：开头直接说发生了什么（含具体数据）→ 列出原文的关键数据/细节（可用列表）→ 背景或影响 → 一句话总结。
5. 中文面向中文读者、英文面向英文读者，各自自然流畅；是改写概括，不是逐字直译，但数字和专有名词要准确无误。
6. 中英文两个版本是同一篇的两种语言，信息要一致，不要各写各的。

只写原文确实出现的信息，不要臆造原文没有的数字或结论。

原始标题：${item.title}
来源：${item.source}
原文内容：${item.content || item.summary}`;

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
    titleEn: (parsed.titleEn || item.title || "").trim(),
    summaryEn: parsed.summaryEn || item.summary || "",
    contentEn: parsed.contentEn || item.content,
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

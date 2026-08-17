// 本地测试脚本：抓取 RSS + DeepSeek 生成中文资讯，写入 data/news.json。
// 注意：海外源在本地网络可能无法访问；生产环境请用 Vercel Cron（/api/cron）。
// 用法：npm run fetch:news
import fs from "node:fs";
import path from "node:path";
import Parser from "rss-parser";

const NEWS_PATH = path.join(process.cwd(), "data", "news.json");
const SOURCES_PATH = path.join(process.cwd(), "data", "news-sources.json");
const sources = JSON.parse(fs.readFileSync(SOURCES_PATH, "utf-8"));
const parser = new Parser({ timeout: 15000 });

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv();

const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  console.error("缺少 DEEPSEEK_API_KEY（请在 .env.local 中配置）");
  process.exit(1);
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9一-龥]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}
function shortHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).slice(0, 6);
}
function extractJson(s) {
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  const obj = s.match(/(\{[\s\S]*\})/);
  return (fence ? fence[1] : obj ? obj[1] : s).trim();
}

async function callDeepSeek(user) {
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: user }], temperature: 0.6 }),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

async function buildArticle(item) {
  const prompt = `你是一名专业的 AI 资讯编辑。请把下面这条英文资讯改写成一篇中文短讯，只输出一个 JSON 对象（不要输出其他文字、不要用 Markdown 代码块包裹），字段：{"title":"中文标题","summary":"2-3句摘要","content":"中文正文(Markdown,3-5段,概括要点,不要逐字直译)","tags":["2到4个标签"]}。要求准确、不臆造。\n\n原始标题：${item.title}\n来源：${item.source}\n原始内容：${item.summary}`;
  const text = await callDeepSeek(prompt);
  let parsed = {};
  try {
    parsed = JSON.parse(extractJson(text));
  } catch {}
  const title = (parsed.title || item.title || "未命名").trim();
  const date = new Date().toISOString().slice(0, 10);
  return {
    slug: `${date}-${slugify(title)}-${shortHash(item.link)}`,
    title,
    summary: parsed.summary || item.summary || "",
    content: parsed.content || text,
    source: item.source,
    sourceUrl: item.link,
    publishedAt: new Date().toISOString(),
    tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 4) : [],
  };
}

const existing = JSON.parse(fs.readFileSync(NEWS_PATH, "utf-8") || "[]");
const seen = new Set(existing.map((a) => a.sourceUrl));

const items = [];
for (const src of sources) {
  try {
    const feed = await parser.parseURL(src.url);
    for (const item of (feed.items || []).slice(0, 6)) {
      items.push({
        title: (item.title || "").trim(),
        link: (item.link || "").trim(),
        summary: (item.contentSnippet || item.summary || "").trim().slice(0, 600),
        pubDate: item.isoDate || item.pubDate || "",
        source: src.name,
      });
    }
    console.log(`✓ ${src.name}`);
  } catch {
    console.log(`✗ ${src.name} 抓取失败`);
  }
}

const fresh = items.filter((i) => i.link && !seen.has(i.link)).slice(0, 5);
console.log(`\n抓取 ${items.length} 条，其中 ${fresh.length} 条新资讯待生成`);

const generated = [];
for (const item of fresh) {
  try {
    generated.push(await buildArticle(item));
    console.log(`✓ 生成：${item.title.slice(0, 40)}`);
  } catch {
    console.log(`✗ 生成失败：${item.title.slice(0, 40)}`);
  }
}

const merged = [...generated, ...existing].slice(0, 200);
fs.writeFileSync(NEWS_PATH, JSON.stringify(merged, null, 2) + "\n", "utf-8");
console.log(`\n完成：新增 ${generated.length} 篇，当前共 ${merged.length} 篇，已写入 data/news.json`);

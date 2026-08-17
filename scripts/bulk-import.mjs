// 批量导入 AI 工具：读取 scripts/import-list.txt（一行一条「名称 | 网址」），
// 用 DeepSeek 自动补全双语简介/标签/价格/分类/模型等字段，写入 data/tools.json。
//
// 用法：
//   1. 把要导入的工具按「名称 | 网址」格式粘贴到 scripts/import-list.txt（参考 import-list.example.txt）
//   2. node scripts/bulk-import.mjs              # 干跑：只生成预览，不写入，产出 scripts/import-review.json
//   3. node scripts/bulk-import.mjs --write      # 确认无误后，正式写入 data/tools.json
//   可选：--limit N  每次最多处理 N 条（默认 20，避免限流）
//
// 网址以输入为准（不信任模型生成的网址，防死链）；其余字段由 DeepSeek 生成并做合法性校验。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ---- 极简 .env 加载（同 generate-descriptions.mjs）----
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf-8");
  for (const line of content.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadEnvFile(path.join(ROOT, ".env.local"));
loadEnvFile(path.join(ROOT, ".env"));

const API_KEY = process.env.DEEPSEEK_API_KEY;
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const API_URL = "https://api.deepseek.com/chat/completions";
const TOOLS_PATH = path.join(ROOT, "data", "tools.json");
const LIST_PATH = path.join(__dirname, "import-list.txt");
const REVIEW_PATH = path.join(__dirname, "import-review.json");

const WRITE = process.argv.includes("--write");
const LIMIT_INDEX = process.argv.indexOf("--limit");
const LIMIT = LIMIT_INDEX !== -1 ? parseInt(process.argv[LIMIT_INDEX + 1], 10) : 20;

// 分类词表（需与 data/categories.ts 保持一致）
const CATEGORIES = [
  "chat", "image", "image-edit", "video", "avatar", "music", "voice", "code",
  "office", "writing", "search", "translate", "design", "companion", "agent",
  "research", "video-edit", "automation", "pdf", "education", "3d", "marketing", "data",
];
const PRICING = ["free", "freemium", "paid", "trial"];
const REGION = ["domestic", "overseas"];
const PLATFORMS = ["web", "macos", "windows", "linux", "ios", "android", "api", "extension", "desktop", "wechat"];

if (!API_KEY) {
  console.error("错误：未找到 DEEPSEEK_API_KEY。请在项目根目录 .env.local 中配置：\nDEEPSEEK_API_KEY=sk-你的密钥");
  process.exit(1);
}

// 解析输入文件：每行「名称 | 网址」或「名称,网址」；# 开头为注释
function parseList() {
  if (!fs.existsSync(LIST_PATH)) {
    console.error(`错误：未找到 ${LIST_PATH}。请先复制 import-list.example.txt 并粘贴工具列表。`);
    process.exit(1);
  }
  const lines = fs.readFileSync(LIST_PATH, "utf-8").split("\n");
  const items = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const parts = line.split(/[|,，\t]/).map((s) => s.trim()).filter(Boolean);
    if (parts.length < 2) {
      console.warn(`跳过（格式不对，需「名称 分隔符 网址」）：${line}`);
      continue;
    }
    const name = parts[0];
    const url = parts[1];
    if (!/^https?:\/\//i.test(url)) {
      console.warn(`跳过（网址无效）：${line}`);
      continue;
    }
    items.push({ name, url });
  }
  return items;
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    return (u.hostname + u.pathname).replace(/\/+$/, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function clamp(n, min, max) {
  const v = Number(n);
  if (Number.isNaN(v)) return Math.round((min + max) / 2);
  return Math.min(max, Math.max(min, v));
}

async function generateTool(name, url) {
  const prompt = `你是 AI 工具导航网站的编辑。请为下面这款 AI 工具生成结构化数据，只输出一个 JSON 对象（不要 markdown 代码块、不要任何解释）。

工具名称：${name}
官网：${url}

JSON 必须包含以下字段（值需真实、准确、保守，不要编造）：
{
  "id": "英文小写短横线 slug",
  "nameZh": "中文名（无常见中文名则用英文名）",
  "category": "主分类 id",
  "categories": ["所属分类 id 数组，跨领域才加多个"],
  "region": "domestic 或 overseas（国内产品=domestic）",
  "description": "中文简介 30-60 字，突出核心功能",
  "descriptionEn": "English description, 1 sentence",
  "pricing": "free / freemium / paid / trial 之一",
  "pricingNote": "收费说明，如「免费额度 + 订阅」",
  "tags": ["中文标签 2-4 个"],
  "tagsEn": ["English tags 2-4 个"],
  "emoji": "一个最能代表它的 emoji",
  "releaseYear": 发布年份数字,
  "model": "核心模型名（如 GPT-5、Claude、自研；不确定填「自研」）",
  "modelEn": "English model name（不确定填 Proprietary）",
  "platforms": ["web"、"ios"、"android"、"api" 等，从可选值里选"],
  "score": 评分 0-10 一位小数（根据知名度与口碑，7.0-9.5 之间）,
  "popularity": 热度 0-100 整数（顶流 85+，知名 65-84，一般 45-64，小众 30-44）
}

可选值：
- category/categories 只能是：${CATEGORIES.join("、")}
- pricing 只能是：${PRICING.join(" / ")}
- region 只能是：${REGION.join(" / ")}
- platforms 只能是：${PLATFORMS.join(" / ")}

只输出 JSON 对象本身。`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: "你是专业的 AI 工具数据编辑，只输出合法 JSON。" },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 900,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 200)}`);

  const data = await res.json();
  let text = data.choices?.[0]?.message?.content?.trim() ?? "";
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  return JSON.parse(text);
}

function coerce(obj, name, url) {
  const category = CATEGORIES.includes(obj.category) ? obj.category : "chat";
  const categories = Array.isArray(obj.categories) && obj.categories.length
    ? obj.categories.filter((x) => CATEGORIES.includes(x))
    : [category];
  const platforms = Array.isArray(obj.platforms)
    ? obj.platforms.filter((x) => PLATFORMS.includes(x))
    : ["web"];

  return {
    id: slugify(obj.id || name) || "tool",
    name,
    nameZh: obj.nameZh || name,
    category,
    categories: categories.length > 1 ? categories : undefined,
    region: REGION.includes(obj.region) ? obj.region : "overseas",
    description: String(obj.description || name).slice(0, 120),
    descriptionEn: String(obj.descriptionEn || "").slice(0, 200),
    officialUrl: url,
    pricing: PRICING.includes(obj.pricing) ? obj.pricing : "freemium",
    pricingNote: String(obj.pricingNote || "").slice(0, 80),
    tags: (Array.isArray(obj.tags) ? obj.tags : []).slice(0, 4).map(String),
    tagsEn: (Array.isArray(obj.tagsEn) ? obj.tagsEn : []).slice(0, 4).map(String),
    score: Math.round(clamp(obj.score, 0, 10) * 10) / 10,
    popularity: Math.round(clamp(obj.popularity, 0, 100)),
    emoji: String(obj.emoji || "🤖").slice(0, 4),
    releaseYear: Number(obj.releaseYear) || undefined,
    model: String(obj.model || "自研"),
    modelEn: String(obj.modelEn || "Proprietary"),
    platforms,
  };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const items = parseList();
  if (items.length === 0) {
    console.log("import-list.txt 中没有可导入的条目。");
    return;
  }
  const batch = items.slice(0, LIMIT);
  console.log(`共 ${items.length} 条，本次处理前 ${batch.length} 条。\n`);

  const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, "utf-8"));
  const existingIds = new Set(tools.map((t) => t.id));
  const existingUrls = new Set(tools.map((t) => normalizeUrl(t.officialUrl)));

  const results = [];
  let skipped = 0;
  for (let i = 0; i < batch.length; i++) {
    const { name, url } = batch[i];
    process.stdout.write(`[${i + 1}/${batch.length}] ${name} ... `);
    if (existingUrls.has(normalizeUrl(url))) {
      console.log("⏭ 已存在（同网址），跳过");
      skipped++;
      continue;
    }
    try {
      const raw = await generateTool(name, url);
      const tool = coerce(raw, name, url);
      if (existingIds.has(tool.id)) tool.id = `${tool.id}-${Date.now() % 10000}`;
      existingIds.add(tool.id);
      existingUrls.add(normalizeUrl(url));
      results.push(tool);
      console.log(`✓ → ${tool.category}（评分 ${tool.score}）`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
    if (i < batch.length - 1) await sleep(300);
  }

  fs.writeFileSync(REVIEW_PATH, JSON.stringify(results, null, 2) + "\n", "utf-8");
  console.log(`\n生成 ${results.length} 条，跳过 ${skipped} 条。预览已写入 scripts/import-review.json`);

  if (WRITE && results.length > 0) {
    const merged = tools.concat(results);
    fs.writeFileSync(TOOLS_PATH, JSON.stringify(merged, null, 2) + "\n", "utf-8");
    console.log(`已写入 data/tools.json，现共 ${merged.length} 款工具。`);
  } else {
    console.log("（干跑模式）确认无误后，加 --write 正式写入。");
  }
}

main();

// 为 data/tools.json 中每个 AI 软件生成详情页补充内容（中英双语）。
// 幂等：已存在 features 字段的工具会被跳过，失败后可重跑补全。
// 运行：npm run enrich
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "data", "tools.json");

function loadEnv() {
  try {
    const txt = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && m[2] && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* ignore */
  }
}
loadEnv();

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) {
  console.error("缺少 DEEPSEEK_API_KEY（请在 .env.local 中配置）");
  process.exit(1);
}

const PLATFORM_KEYS = [
  "web",
  "macos",
  "windows",
  "linux",
  "ios",
  "android",
  "api",
  "extension",
  "desktop",
  "wechat",
];

const SYSTEM = `你是一名严谨的 AI 产品信息整理助手。根据给定的 AI 软件信息，生成该软件详情页所需的补充内容，全部用简体中文和英文双语输出。

要求：
1. features / featuresEn：主要功能，各 4~6 条，每条简短（10~25 字）。
2. howToUse / howToUseEn：如何使用，各 3~5 个步骤，按先后顺序，简洁可执行。
3. advantages / advantagesEn：核心优势，各 3~5 条，突出差异化卖点。
4. platforms：使用环境，只能从以下词汇中选取，且只选该软件真实支持的平台：${PLATFORM_KEYS.join(
  "、",
)}。
   （web=网页版、macos、windows、linux、ios、android、api=提供API接口、extension=浏览器插件、desktop=桌面客户端、wechat=微信小程序）
   拿不准的平台不要选。
5. apiName / apiNameEn：该软件提供的官方 API 接口名称（如 "GPT-4o API"、"Claude API"、"Gemini API"、"Stable Diffusion API"）。
   若该软件没有公开 API 或属于纯客户端/纯网页应用，则 apiName 与 apiNameEn 均输出空字符串 ""。
6. pricingTiers / pricingTiersEn：费用详细列表，2~5 档，每档为 { name, price, note }。
   price 写明具体价格（如 "免费"、"$20/月"、"¥68/月"、"一次性 $199"）。
   若价格无法确认，用 "约" 或 "起" 表述；note 写该档的核心权益。pricingTiers 为中文，pricingTiersEn 为英文，两数组逐项对应、数量一致。

务必基于真实、公开的信息作答，不要编造明显错误的平台或价格；拿不准就保守省略或注明"以官网为准"。

只输出一个 JSON 对象，不要输出任何解释文字。结构严格为：
{
  "features": ["..."],
  "featuresEn": ["..."],
  "howToUse": ["..."],
  "howToUseEn": ["..."],
  "advantages": ["..."],
  "advantagesEn": ["..."],
  "platforms": ["web"],
  "apiName": "...",
  "apiNameEn": "...",
  "pricingTiers": [{ "name": "...", "price": "...", "note": "..." }],
  "pricingTiersEn": [{ "name": "...", "price": "...", "note": "..." }]
}`;

async function enrich(tool) {
  const user = JSON.stringify({
    name: tool.name,
    nameZh: tool.nameZh,
    category: tool.category,
    description: tool.description,
    officialUrl: tool.officialUrl,
    pricing: tool.pricing,
    pricingNote: tool.pricingNote,
    region: tool.region,
    releaseYear: tool.releaseYear,
  });

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: user },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
      max_tokens: 2600,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";
  const json = content
    .replace(/^```json\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
  return JSON.parse(json);
}

function apply(tool, r) {
  tool.features = r.features ?? [];
  tool.featuresEn = r.featuresEn ?? [];
  tool.howToUse = r.howToUse ?? [];
  tool.howToUseEn = r.howToUseEn ?? [];
  tool.advantages = r.advantages ?? [];
  tool.advantagesEn = r.advantagesEn ?? [];
  tool.platforms = (r.platforms ?? []).filter((p) => PLATFORM_KEYS.includes(p));
  tool.apiName = r.apiName ?? "";
  tool.apiNameEn = r.apiNameEn ?? "";
  tool.pricingTiers = r.pricingTiers ?? [];
  tool.pricingTiersEn = r.pricingTiersEn ?? [];
}

async function run() {
  const tools = JSON.parse(readFileSync(dataPath, "utf8"));
  const todo = tools.filter((t) => !t.features || t.features.length === 0);
  console.log(`共 ${tools.length} 个工具，待生成 ${todo.length} 个`);

  const CONCURRENCY = 5;
  let done = 0;
  let failed = 0;
  const queue = [...todo];

  const persist = () =>
    writeFileSync(dataPath, JSON.stringify(tools, null, 2) + "\n");

  async function worker() {
    while (queue.length) {
      const tool = queue.shift();
      try {
        const r = await enrich(tool);
        apply(tool, r);
        done++;
        console.log(`✓ [${done}/${todo.length}] ${tool.name}`);
      } catch (e) {
        failed++;
        console.error(`✗ ${tool.name}: ${e.message}`);
      }
      persist();
    }
  }

  const workers = Array.from(
    { length: Math.min(CONCURRENCY, todo.length) },
    worker,
  );
  await Promise.all(workers);

  persist();
  console.log(`完成：成功 ${done}，失败 ${failed}。已写回 data/tools.json`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

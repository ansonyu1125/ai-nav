// 新增海内外 AI 工具：根据基础字段用 DeepSeek 生成描述 + 双语扩展内容，追加到 data/tools.json。
// 幂等：已存在的 id 会被跳过。运行：npm run add:tools
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

// 基础字段（我人工校验过的真实信息），其余字段由 DeepSeek 生成
const NEW_TOOLS = [
  // 对话助手
  { id: "meta-ai", name: "Meta AI", nameZh: "Meta AI", category: "chat", region: "overseas", officialUrl: "https://www.meta.ai", pricing: "freemium", pricingNote: "免费使用", tags: ["对话", "多模态", "Llama"], emoji: "🤖", releaseYear: 2023, score: 9.0, popularity: 88 },
  { id: "cohere", name: "Cohere", nameZh: "Cohere", category: "chat", region: "overseas", officialUrl: "https://cohere.com", pricing: "freemium", pricingNote: "免费额度 + API 按量付费", tags: ["对话", "API", "企业"], emoji: "🔮", releaseYear: 2019, score: 8.5, popularity: 70 },
  { id: "baichuan", name: "百川智能", nameZh: "百川智能", category: "chat", region: "domestic", officialUrl: "https://www.baichuan-ai.com", pricing: "freemium", pricingNote: "免费版 + API 按量付费", tags: ["对话", "大模型", "API"], emoji: "🧠", releaseYear: 2023, score: 8.0, popularity: 62 },
  { id: "hunyuan", name: "腾讯混元", nameZh: "腾讯混元", category: "chat", region: "domestic", officialUrl: "https://hunyuan.tencent.com", pricing: "freemium", pricingNote: "免费版 + API 付费", tags: ["对话", "多模态", "腾讯"], emoji: "🧩", releaseYear: 2023, score: 8.4, popularity: 78 },
  { id: "sensenova", name: "商汤日日新", nameZh: "商汤日日新", category: "chat", region: "domestic", officialUrl: "https://platform.sensenova.cn", pricing: "freemium", pricingNote: "免费版 + 企业定制", tags: ["对话", "多模态", "商汤"], emoji: "🌟", releaseYear: 2023, score: 7.8, popularity: 55 },
  { id: "ai360", name: "360 智脑", nameZh: "360 智脑", category: "chat", region: "domestic", officialUrl: "https://ai.360.cn", pricing: "freemium", pricingNote: "免费使用", tags: ["对话", "搜索", "360"], emoji: "🔵", releaseYear: 2023, score: 7.5, popularity: 60 },

  // 图像生成 / 图片编辑
  { id: "civitai", name: "Civitai", nameZh: "Civitai", category: "image", region: "overseas", officialUrl: "https://civitai.com", pricing: "freemium", pricingNote: "免费使用 + 会员订阅", tags: ["模型社区", "图像", "Stable Diffusion"], emoji: "🎨", releaseYear: 2022, score: 8.8, popularity: 82 },
  { id: "magnific", name: "Magnific AI", nameZh: "Magnific AI", category: "image-edit", region: "overseas", officialUrl: "https://magnific.ai", pricing: "paid", pricingNote: "订阅付费", tags: ["图像放大", "增强", "修图"], emoji: "🔍", releaseYear: 2023, score: 8.2, popularity: 58 },
  { id: "topaz-photo", name: "Topaz Photo AI", nameZh: "Topaz Photo AI", category: "image-edit", region: "overseas", officialUrl: "https://www.topazlabs.com", pricing: "paid", pricingNote: "一次性买断 / 订阅", tags: ["图像增强", "降噪", "修图"], emoji: "📷", releaseYear: 2022, score: 8.4, popularity: 66 },
  { id: "lets-enhance", name: "Let's Enhance", nameZh: "Let's Enhance", category: "image-edit", region: "overseas", officialUrl: "https://letsenhance.io", pricing: "freemium", pricingNote: "免费额度 + 订阅", tags: ["图像放大", "增强"], emoji: "🖼️", releaseYear: 2019, score: 7.6, popularity: 48 },

  // 视频生成
  { id: "pixverse", name: "PixVerse", nameZh: "PixVerse", category: "video", region: "domestic", officialUrl: "https://pixverse.ai", pricing: "freemium", pricingNote: "免费额度 + 订阅", tags: ["文生视频", "图生视频"], emoji: "🎬", releaseYear: 2023, score: 8.3, popularity: 74 },
  { id: "genmo", name: "Genmo", nameZh: "Genmo", category: "video", region: "overseas", officialUrl: "https://www.genmo.ai", pricing: "freemium", pricingNote: "免费额度 + 订阅", tags: ["文生视频", "图像"], emoji: "🎥", releaseYear: 2023, score: 7.7, popularity: 50 },
  { id: "filmora", name: "万兴喵影", nameZh: "Filmora", category: "video", region: "domestic", officialUrl: "https://filmora.wondershare.com", pricing: "freemium", pricingNote: "免费版 + 订阅/买断", tags: ["视频剪辑", "AI", "万兴"], emoji: "🎞️", releaseYear: 2019, score: 8.2, popularity: 80 },

  // 数字人
  { id: "did", name: "D-ID", nameZh: "D-ID", category: "avatar", region: "overseas", officialUrl: "https://www.d-id.com", pricing: "freemium", pricingNote: "免费额度 + 订阅", tags: ["数字人", "口播", "视频"], emoji: "🧑‍💼", releaseYear: 2017, score: 8.0, popularity: 60 },

  // 音乐生成
  { id: "boomy", name: "Boomy", nameZh: "Boomy", category: "music", region: "overseas", officialUrl: "https://boomy.com", pricing: "freemium", pricingNote: "免费版 + 订阅", tags: ["AI 音乐", "作曲"], emoji: "🎵", releaseYear: 2018, score: 7.4, popularity: 45 },
  { id: "tianyin", name: "网易天音", nameZh: "网易天音", category: "music", region: "domestic", officialUrl: "https://tianyin.163.com", pricing: "freemium", pricingNote: "免费版 + 会员", tags: ["AI 音乐", "编曲", "网易"], emoji: "🎼", releaseYear: 2021, score: 7.5, popularity: 42 },

  // 语音合成
  { id: "murf", name: "Murf AI", nameZh: "Murf AI", category: "voice", region: "overseas", officialUrl: "https://murf.ai", pricing: "freemium", pricingNote: "免费额度 + 订阅", tags: ["语音合成", "配音"], emoji: "🎙️", releaseYear: 2020, score: 8.1, popularity: 62 },
  { id: "playht", name: "PlayHT", nameZh: "PlayHT", category: "voice", region: "overseas", officialUrl: "https://play.ht", pricing: "freemium", pricingNote: "免费额度 + 订阅", tags: ["语音合成", "声音克隆"], emoji: "🗣️", releaseYear: 2020, score: 8.0, popularity: 58 },
  { id: "speechify", name: "Speechify", nameZh: "Speechify", category: "voice", region: "overseas", officialUrl: "https://speechify.com", pricing: "freemium", pricingNote: "免费版 + 订阅", tags: ["文字转语音", "朗读"], emoji: "📖", releaseYear: 2017, score: 8.3, popularity: 70 },
  { id: "moyin", name: "魔音工坊", nameZh: "魔音工坊", category: "voice", region: "domestic", officialUrl: "https://www.moyin.com", pricing: "freemium", pricingNote: "免费版 + 付费", tags: ["配音", "语音合成", "出门问问"], emoji: "🎧", releaseYear: 2019, score: 7.6, popularity: 46 },

  // 编程开发
  { id: "codeium", name: "Codeium", nameZh: "Codeium", category: "code", region: "overseas", officialUrl: "https://codeium.com", pricing: "freemium", pricingNote: "免费版 + 团队/企业版", tags: ["代码补全", "AI 编程"], emoji: "💻", releaseYear: 2021, score: 8.5, popularity: 74 },
  { id: "tabnine", name: "Tabnine", nameZh: "Tabnine", category: "code", region: "overseas", officialUrl: "https://www.tabnine.com", pricing: "freemium", pricingNote: "免费版 + Pro 订阅", tags: ["代码补全", "IDE 插件"], emoji: "⌨️", releaseYear: 2019, score: 8.0, popularity: 62 },
  { id: "cody", name: "Sourcegraph Cody", nameZh: "Cody", category: "code", region: "overseas", officialUrl: "https://sourcegraph.com/cody", pricing: "freemium", pricingNote: "免费版 + Pro 订阅", tags: ["代码助手", "AI 编程"], emoji: "🔍", releaseYear: 2023, score: 8.2, popularity: 55 },

  // 办公效率
  { id: "otter", name: "Otter.ai", nameZh: "Otter.ai", category: "office", region: "overseas", officialUrl: "https://otter.ai", pricing: "freemium", pricingNote: "免费版 + Pro 订阅", tags: ["会议转写", "纪要", "实时"], emoji: "📝", releaseYear: 2016, score: 8.3, popularity: 70 },
  { id: "fireflies", name: "Fireflies.ai", nameZh: "Fireflies.ai", category: "office", region: "overseas", officialUrl: "https://fireflies.ai", pricing: "freemium", pricingNote: "免费版 + Pro 订阅", tags: ["会议纪要", "转写"], emoji: "🐝", releaseYear: 2019, score: 8.0, popularity: 60 },
  { id: "descript", name: "Descript", nameZh: "Descript", category: "office", region: "overseas", officialUrl: "https://www.descript.com", pricing: "freemium", pricingNote: "免费版 + 订阅", tags: ["音视频剪辑", "转写"], emoji: "✂️", releaseYear: 2017, score: 8.5, popularity: 72 },
  { id: "iflyrec", name: "讯飞听见", nameZh: "讯飞听见", category: "office", region: "domestic", officialUrl: "https://www.iflyrec.com", pricing: "freemium", pricingNote: "免费额度 + 付费", tags: ["录音转文字", "会议", "讯飞"], emoji: "🎙️", releaseYear: 2016, score: 8.0, popularity: 55 },

  // 写作助手
  { id: "wordtune", name: "Wordtune", nameZh: "Wordtune", category: "writing", region: "overseas", officialUrl: "https://www.wordtune.com", pricing: "freemium", pricingNote: "免费版 + Premium 订阅", tags: ["改写", "润色"], emoji: "✍️", releaseYear: 2019, score: 8.2, popularity: 66 },
  { id: "rytr", name: "Rytr", nameZh: "Rytr", category: "writing", region: "overseas", officialUrl: "https://rytr.me", pricing: "freemium", pricingNote: "免费版 + 订阅", tags: ["AI 写作", "文案"], emoji: "📝", releaseYear: 2021, score: 7.5, popularity: 50 },

  // AI 搜索
  { id: "you", name: "You.com", nameZh: "You.com", category: "search", region: "overseas", officialUrl: "https://you.com", pricing: "freemium", pricingNote: "免费版 + Pro 订阅", tags: ["AI 搜索", "问答"], emoji: "🔍", releaseYear: 2021, score: 7.8, popularity: 55 },
  { id: "phind", name: "Phind", nameZh: "Phind", category: "search", region: "overseas", officialUrl: "https://www.phind.com", pricing: "freemium", pricingNote: "免费版 + Pro 订阅", tags: ["开发者搜索", "问答"], emoji: "👨‍💻", releaseYear: 2022, score: 8.0, popularity: 58 },

  // 翻译工具
  { id: "caiyun", name: "彩云小译", nameZh: "彩云小译", category: "translate", region: "domestic", officialUrl: "https://caiyunapp.com", pricing: "freemium", pricingNote: "免费版 + 会员", tags: ["翻译", "双语对照"], emoji: "🌐", releaseYear: 2018, score: 7.6, popularity: 48 },
  { id: "reverso", name: "Reverso", nameZh: "Reverso", category: "translate", region: "overseas", officialUrl: "https://www.reverso.net", pricing: "freemium", pricingNote: "免费版 + Premium 订阅", tags: ["翻译", "例句", "词典"], emoji: "🌐", releaseYear: 1998, score: 8.0, popularity: 62 },

  // 设计创意
  { id: "framer", name: "Framer", nameZh: "Framer", category: "design", region: "overseas", officialUrl: "https://www.framer.com", pricing: "freemium", pricingNote: "免费版 + 订阅", tags: ["网站设计", "AI 建站"], emoji: "🖌️", releaseYear: 2015, score: 8.6, popularity: 78 },
  { id: "spline", name: "Spline", nameZh: "Spline", category: "design", region: "overseas", officialUrl: "https://spline.design", pricing: "freemium", pricingNote: "免费版 + 订阅", tags: ["3D 设计", "AI"], emoji: "🧊", releaseYear: 2020, score: 8.1, popularity: 60 },

  // 角色陪伴
  { id: "xingye", name: "星野", nameZh: "星野", category: "companion", region: "domestic", officialUrl: "https://www.xingye.app", pricing: "freemium", pricingNote: "免费使用 + 内购", tags: ["角色陪伴", "互动", "MiniMax"], emoji: "💫", releaseYear: 2023, score: 7.8, popularity: 55 },
];

const PLATFORM_KEYS = ["web", "macos", "windows", "linux", "ios", "android", "api", "extension", "desktop", "wechat"];

const SYSTEM = `你是一名严谨的 AI 产品信息整理助手。根据给定的 AI 软件基础信息，生成该软件的介绍文案与详情页扩展内容，全部用简体中文和英文双语输出。

要求：
1. description：中文简介，50~80 字，概括定位与核心能力。
2. descriptionEn：英文简介，与中文对应。
3. tagsEn：英文标签数组，与给定的中文 tags 逐项对应。
4. pricingNoteEn：英文费用说明，与给定 pricingNote 对应。
5. features / featuresEn：主要功能，各 4~6 条，每条简短（10~25 字）。
6. howToUse / howToUseEn：如何使用，各 3~5 个步骤，按先后顺序，简洁可执行。
7. advantages / advantagesEn：核心优势，各 3~5 条。
8. platforms：使用环境，只能从以下词汇中选取，且只选真实支持的平台：${PLATFORM_KEYS.join("、")}。
   （web=网页版、macos、windows、linux、ios、android、api=提供API接口、extension=浏览器插件、desktop=桌面客户端、wechat=微信小程序）拿不准不要选。
9. apiName / apiNameEn：该软件提供的官方 API 接口名称；若没有公开 API 则输出空字符串 ""。
10. pricingTiers / pricingTiersEn：费用详细列表，2~5 档，每档 { name, price, note }；price 写具体价格，拿不准用"约/起"并注明以官网为准。pricingTiers 中文、pricingTiersEn 英文，逐项对应、数量一致。

务必基于真实、公开信息作答，不要编造平台或价格；拿不准就保守省略或注明"以官网为准"。

只输出一个 JSON 对象，结构严格为：
{
  "description": "...",
  "descriptionEn": "...",
  "tagsEn": ["..."],
  "pricingNoteEn": "...",
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

async function gen(base) {
  const user = JSON.stringify({
    name: base.name,
    nameZh: base.nameZh,
    officialUrl: base.officialUrl,
    pricing: base.pricing,
    pricingNote: base.pricingNote,
    tags: base.tags,
    region: base.region,
    releaseYear: base.releaseYear,
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
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";
  const json = content.replace(/^```json\s*/i, "").replace(/\s*```\s*$/, "").trim();
  const r = JSON.parse(json);

  // 规范化
  r.tagsEn = Array.isArray(r.tagsEn) ? r.tagsEn : [];
  r.features = r.features ?? [];
  r.featuresEn = r.featuresEn ?? [];
  r.howToUse = r.howToUse ?? [];
  r.howToUseEn = r.howToUseEn ?? [];
  r.advantages = r.advantages ?? [];
  r.advantagesEn = r.advantagesEn ?? [];
  r.platforms = (r.platforms ?? []).filter((p) => PLATFORM_KEYS.includes(p));
  r.apiName = r.apiName ?? "";
  r.apiNameEn = r.apiNameEn ?? "";
  r.pricingTiers = r.pricingTiers ?? [];
  r.pricingTiersEn = r.pricingTiersEn ?? [];
  return r;
}

async function run() {
  const tools = JSON.parse(readFileSync(dataPath, "utf8"));
  const existing = new Set(tools.map((t) => t.id));
  const todo = NEW_TOOLS.filter((t) => !existing.has(t.id));
  console.log(`待新增 ${todo.length} 个（已存在 ${NEW_TOOLS.length - todo.length} 个被跳过）`);

  let added = 0;
  let failed = 0;
  const persist = () => writeFileSync(dataPath, JSON.stringify(tools, null, 2) + "\n");

  for (const base of todo) {
    try {
      const r = await gen(base);
      tools.push({ ...base, ...r });
      added++;
      console.log(`✓ [${added}/${todo.length}] ${base.name}`);
    } catch (e) {
      failed++;
      console.error(`✗ ${base.name}: ${e.message}`);
    }
    persist();
  }

  persist();
  console.log(`完成：新增 ${added}，失败 ${failed}。当前共 ${tools.length} 个工具。`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

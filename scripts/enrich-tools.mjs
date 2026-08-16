// 一次性数据富化脚本：为 tools.json 补充多分类（categories）与核心模型（model / modelEn）。
// 用法：node scripts/enrich-tools.mjs
// 说明：model 以「模型家族」为主（GPT/Claude/Gemini…），版本号可按需后续修正。
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "data", "tools.json");

// id → 覆盖字段
const overrides = {
  // ── 对话助手 ─────────────────────────────
  chatgpt: { model: "GPT-5.6 / GPT-5.5", modelEn: "GPT-5.6 / GPT-5.5" },
  claude: { model: "Claude Opus 5", modelEn: "Claude Opus 5" },
  deepseek: { model: "DeepSeek V4 / V3.2", modelEn: "DeepSeek V4 / V3.2" },
  gemini: { model: "Gemini 3.7", modelEn: "Gemini 3.7" },
  doubao: { model: "Seed 2.1", modelEn: "Seed 2.1" },
  kimi: { model: "Kimi K3", modelEn: "Kimi K3" },
  "meta-ai": { model: "Llama 系列", modelEn: "Llama series" },
  grok: { model: "Grok 系列", modelEn: "Grok series" },
  tongyi: { model: "Qwen3.8", modelEn: "Qwen3.8" },
  chatglm: { model: "GLM-5.3", modelEn: "GLM-5.3" },
  wenxin: { model: "文心 ERNIE", modelEn: "ERNIE" },
  yuanbao: { model: "混元 Hunyuan", modelEn: "Hunyuan" },
  hunyuan: { model: "混元 Hunyuan", modelEn: "Hunyuan" },
  mistral: { model: "Mistral 系列", modelEn: "Mistral series" },
  stepfun: { model: "Step 系列", modelEn: "Step series" },
  poe: { model: "多模型聚合", modelEn: "Multi-model" },
  cohere: { model: "Command 系列", modelEn: "Command series" },
  baichuan: { model: "百川系列", modelEn: "Baichuan" },
  ai360: { model: "360 智脑", modelEn: "360 Brain" },
  sensenova: { model: "日日新 SenseNova", modelEn: "SenseNova" },

  // ── 图像生成 ─────────────────────────────
  midjourney: { model: "V8.1", modelEn: "V8.1" },
  "stable-diffusion": { model: "Stable Diffusion 系列", modelEn: "SD series" },
  dalle: { model: "DALL·E 3", modelEn: "DALL·E 3" },
  jimeng: {
    categories: ["image", "video", "image-edit"],
    model: "Seedream 5.0 / Seedance 2.5",
    modelEn: "Seedream 5.0 / Seedance 2.5",
  },
  flux: { model: "FLUX（Black Forest）", modelEn: "FLUX" },
  civitai: { model: "模型库平台（SD/LoRA）", modelEn: "Model hub (SD/LoRA)" },
  firefly: { model: "Firefly 系列", modelEn: "Firefly" },
  leonardo: { model: "多模型（SDXL/FLUX）", modelEn: "Multi-model" },
  ideogram: { model: "自研模型", modelEn: "Proprietary" },
  wanxiang: { model: "通义万相", modelEn: "Tongyi Wanxiang" },
  seaart: { model: "多模型", modelEn: "Multi-model" },
  yige: { model: "文心一格", modelEn: "ERNIE ViLG" },
  playground: { model: "自研模型", modelEn: "Proprietary" },

  // ── 图片编辑 ─────────────────────────────
  "nano-banana": {
    categories: ["image-edit", "image"],
    model: "Gemini（图像）",
    modelEn: "Gemini image",
  },
  "remove-bg": { model: "自研 AI", modelEn: "Proprietary" },
  photoroom: { model: "自研 AI", modelEn: "Proprietary" },
  "topaz-photo": { model: "Topaz 自研", modelEn: "Proprietary" },
  magnific: { model: "自研模型", modelEn: "Proprietary" },
  "lets-enhance": { model: "自研模型", modelEn: "Proprietary" },

  // ── 视频生成 ─────────────────────────────
  sora: { model: "Sora 2", modelEn: "Sora 2" },
  runway: {
    categories: ["video", "image", "image-edit"],
    model: "Gen-4.5 / Gen-4",
    modelEn: "Gen-4.5 / Gen-4",
  },
  veo: { model: "Veo 3.1", modelEn: "Veo 3.1" },
  kling: {
    categories: ["video", "image"],
    model: "Kling 3.0",
    modelEn: "Kling 3.0",
  },
  pika: { model: "Pika 自研", modelEn: "Pika" },
  vidu: { model: "Vidu（生数科技）", modelEn: "Vidu" },
  filmora: { model: "自研 + AI 集成", modelEn: "Proprietary + AI" },
  hailuo: { model: "Hailuo 3.0 (H3)", modelEn: "Hailuo 3.0 (H3)" },
  krea: {
    categories: ["video", "image"],
    model: "多模型（FLUX/SD）",
    modelEn: "Multi-model (FLUX/SD)",
  },
  "zhipu-qingying": { model: "CogVideoX", modelEn: "CogVideoX" },
  luma: {
    categories: ["video", "image"],
    model: "Ray3.2",
    modelEn: "Ray3.2",
  },
  bcut: { model: "剪映 AI", modelEn: "Jianying AI" },
  pixverse: { model: "PixVerse 自研", modelEn: "PixVerse" },
  genmo: { model: "自研模型", modelEn: "Proprietary" },

  // ── 数字人 ─────────────────────────────
  heygen: { categories: ["avatar", "video"], model: "自研 + 集成", modelEn: "Proprietary" },
  synthesia: { model: "自研模型", modelEn: "Proprietary" },
  did: { model: "自研模型", modelEn: "Proprietary" },

  // ── 音乐生成 ─────────────────────────────
  suno: { model: "Suno 自研", modelEn: "Suno" },
  udio: { model: "Udio 自研", modelEn: "Udio" },
  boomy: { model: "自研模型", modelEn: "Proprietary" },
  tianyin: { model: "网易天音", modelEn: "NetEase" },

  // ── 语音合成 ─────────────────────────────
  elevenlabs: { model: "Eleven 自研", modelEn: "Proprietary" },
  "fish-audio": { model: "Fish 自研", modelEn: "Fish" },
  speechify: { model: "多引擎", modelEn: "Multi-engine" },
  murf: { model: "自研模型", modelEn: "Proprietary" },
  playht: { model: "自研模型", modelEn: "Proprietary" },
  moyin: { model: "魔音自研", modelEn: "Proprietary" },

  // ── 编程开发 ─────────────────────────────
  copilot: { model: "GPT 系列", modelEn: "GPT series" },
  cursor: { model: "多模型（GPT/Claude）", modelEn: "Multi-model (GPT/Claude)" },
  "claude-code": { model: "Claude 系列", modelEn: "Claude" },
  windsurf: { model: "多模型", modelEn: "Multi-model" },
  v0: { model: "Vercel 自研（LLM）", modelEn: "Proprietary (LLM)" },
  bolt: { model: "多模型（GPT/Claude）", modelEn: "Multi-model" },
  lovable: { model: "自研（LLM）", modelEn: "Proprietary (LLM)" },
  marscode: { model: "豆包 / 多模型", modelEn: "Doubao / Multi" },
  cline: { model: "多模型（API）", modelEn: "Multi-model (API)" },
  lingma: { model: "通义 Qwen", modelEn: "Qwen" },
  replit: { model: "多模型", modelEn: "Multi-model" },
  codegeex: { model: "CodeGeeX 自研", modelEn: "CodeGeeX" },
  codeium: { model: "自研模型", modelEn: "Proprietary" },
  aider: { model: "多模型（本地/API）", modelEn: "Multi-model" },
  tabnine: { model: "自研模型", modelEn: "Proprietary" },
  cody: { model: "多模型", modelEn: "Multi-model" },

  // ── 办公效率 ─────────────────────────────
  "notion-ai": {
    categories: ["office", "writing"],
    model: "GPT / Claude 集成",
    modelEn: "GPT / Claude",
  },
  notebooklm: { model: "Gemini", modelEn: "Gemini" },
  "wps-ai": { model: "混元 / 多模型", modelEn: "Hunyuan / Multi" },
  gamma: { model: "GPT 集成", modelEn: "GPT" },
  xinghuo: { categories: ["office", "chat"], model: "星火大模型", modelEn: "Spark" },
  feishu: { model: "豆包 / 多模型", modelEn: "Doubao / Multi" },
  aippt: { model: "多模型", modelEn: "Multi-model" },
  dingtalk: { model: "通义 / 多模型", modelEn: "Qwen / Multi" },
  wanzhi: {
    categories: ["office", "writing"],
    model: "讯飞 / 多模型",
    modelEn: "Spark / Multi",
  },
  "xunfei-zhiwen": {
    categories: ["office", "writing"],
    model: "星火大模型",
    modelEn: "Spark",
  },
  descript: {
    categories: ["office", "video", "voice"],
    model: "多模型（转录/编辑）",
    modelEn: "Multi-model",
  },
  otter: { model: "自研（转录）", modelEn: "Proprietary" },
  fireflies: { model: "自研（转录）", modelEn: "Proprietary" },
  iflyrec: {
    categories: ["office", "voice"],
    model: "讯飞语音识别",
    modelEn: "iFlytek ASR",
  },

  // ── 写作助手 ─────────────────────────────
  grammarly: { model: "自研模型", modelEn: "Proprietary" },
  xiezuocat: { model: "秘塔自研", modelEn: "Proprietary" },
  jasper: { model: "多模型（GPT 等）", modelEn: "Multi-model" },
  copyai: { model: "多模型", modelEn: "Multi-model" },
  paperpal: { model: "自研模型", modelEn: "Proprietary" },
  wordtune: { model: "自研模型", modelEn: "Proprietary" },
  rytr: { model: "多模型", modelEn: "Multi-model" },

  // ── AI 搜索 ─────────────────────────────
  perplexity: {
    categories: ["search", "chat"],
    model: "多模型（GPT/Claude/Sonar）",
    modelEn: "Multi-model",
  },
  metaso: { model: "秘塔自研", modelEn: "Proprietary" },
  "copilot-microsoft": {
    categories: ["search", "chat", "office"],
    model: "GPT / DALL·E",
    modelEn: "GPT / DALL·E",
  },
  quark: { model: "夸克自研", modelEn: "Proprietary" },
  devv: { model: "多模型", modelEn: "Multi-model" },
  tiangong: { model: "天工自研", modelEn: "Proprietary" },
  phind: { model: "多模型", modelEn: "Multi-model" },
  you: { model: "多模型", modelEn: "Multi-model" },

  // ── 翻译工具 ─────────────────────────────
  deepl: { model: "DeepL 自研", modelEn: "Proprietary" },
  immersive: { model: "多引擎（DeepL/Google）", modelEn: "Multi-engine" },
  "google-translate": { model: "Google 翻译", modelEn: "Google" },
  youdao: { model: "有道自研", modelEn: "Youdao" },
  "baidu-translate": { model: "百度自研", modelEn: "Baidu" },
  reverso: { model: "自研模型", modelEn: "Proprietary" },
  caiyun: { model: "彩云自研", modelEn: "Caiyun" },

  // ── 设计创意 ─────────────────────────────
  canva: {
    categories: ["design", "image", "image-edit"],
    model: "Magic Studio",
    modelEn: "Magic Studio",
  },
  figma: { model: "自研 + AI", modelEn: "Proprietary + AI" },
  framer: { model: "自研（AI 生成）", modelEn: "Proprietary" },
  gaoding: {
    categories: ["design", "image-edit"],
    model: "多模型",
    modelEn: "Multi-model",
  },
  "ms-designer": {
    categories: ["design", "image"],
    model: "DALL·E / GPT",
    modelEn: "DALL·E / GPT",
  },
  figjam: { model: "多模型", modelEn: "Multi-model" },
  recraft: { categories: ["design", "image"], model: "自研模型", modelEn: "Proprietary" },
  spline: { model: "自研（AI 3D）", modelEn: "Proprietary" },

  // ── 角色陪伴 ─────────────────────────────
  "character-ai": {
    categories: ["companion", "chat"],
    model: "自研模型",
    modelEn: "Proprietary",
  },
  talkie: { model: "自研模型", modelEn: "Proprietary" },
  replika: { model: "自研模型", modelEn: "Proprietary" },
  xingye: { model: "自研模型", modelEn: "Proprietary" },
};

const tools = JSON.parse(readFileSync(dataPath, "utf8"));

let changed = 0;
for (const t of tools) {
  const o = overrides[t.id];
  if (!o) continue;
  if (o.categories) t.categories = o.categories;
  if (o.model) t.model = o.model;
  if (o.modelEn) t.modelEn = o.modelEn;
  changed++;
}

writeFileSync(dataPath, JSON.stringify(tools, null, 2) + "\n", "utf8");
console.log(`enriched ${changed} tools → data/tools.json`);

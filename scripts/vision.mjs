// 视觉识别：调用豆包（火山引擎 Ark）视觉模型，把图片内容转成文字描述/分析。
// 用途：当主会话模型不支持图片输入时，用本脚本代替「看图」。
//
// 用法：
//   node scripts/vision.mjs <图片路径> ["问题"]
//   node scripts/vision.mjs --list-models          # 列出可用模型，找到 vision 模型
//
// 依赖 .env.local：DOUBAO_API_KEY（必填）、DOUBAO_MODEL（可选，缺省自动选 vision 模型）
import fs from "node:fs";
import path from "node:path";

// ---- 极简 .env 加载（无需 dotenv）----
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const API_KEY = process.env.DOUBAO_API_KEY;
const MODEL = process.env.DOUBAO_MODEL || "";
const BASE = "https://ark.cn-beijing.volces.com/api/v3";

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
};

function mimeOf(file) {
  return MIME[path.extname(file).toLowerCase()] || "image/png";
}

async function listModels() {
  const res = await fetch(`${BASE}/models`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`列出模型失败：HTTP ${res.status}\n${JSON.stringify(json)}`);
    process.exit(1);
  }
  const models = json.data || [];
  console.log(`共 ${models.length} 个模型：`);
  for (const m of models) {
    const isVision = /vision|vl|1-6|seed/i.test(m.id || "");
    console.log(`${isVision ? "👁️ " : "   "}${m.id}`);
  }
}

async function analyze(file, question) {
  if (!fs.existsSync(file)) {
    console.error(`图片不存在：${file}`);
    process.exit(1);
  }
  const b64 = fs.readFileSync(file).toString("base64");
  const mime = mimeOf(file);
  const prompt =
    question ||
    "请详细描述这张图片：包括其中的文字、界面元素、布局结构和关键信息。";

  // 加超时，避免大图请求无限挂起
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 90000);
  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    signal: ctrl.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } },
          ],
        },
      ],
    }),
  });
  clearTimeout(timer);
  const json = await res.json();
  if (!res.ok) {
    console.error(`识别失败：HTTP ${res.status}\n${JSON.stringify(json)}`);
    console.error("\n提示：若提示模型不存在，先运行 node scripts/vision.mjs --list-models 查看可用模型，再写入 .env.local 的 DOUBAO_MODEL。");
    process.exit(1);
  }
  const text = json.choices?.[0]?.message?.content ?? "(无返回内容)";
  console.log(Array.isArray(text) ? text.map((p) => p.text ?? "").join("") : text);
}

const args = process.argv.slice(2);

if (!API_KEY) {
  console.error("错误：未找到 DOUBAO_API_KEY。请在项目根目录 .env.local 中配置：\nDOUBAO_API_KEY=你的豆包key");
  process.exit(1);
}

if (args.includes("--list-models")) {
  await listModels();
} else {
  const file = args[0];
  if (!file) {
    console.error("用法：node scripts/vision.mjs <图片路径> [问题]");
    console.error("      node scripts/vision.mjs --list-models");
    process.exit(1);
  }
  const question = args.slice(1).join(" ");
  if (!MODEL) {
    console.error("提示：尚未配置 DOUBAO_MODEL。请先运行 --list-models 找到 vision 模型并写入 .env.local。");
    process.exit(1);
  }
  await analyze(file, question);
}

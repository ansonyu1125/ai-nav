// 用 DeepSeek 生成/润色 data/tools.json 中的软件简介。
// 用法：
//   npm run gen:descriptions          # 只为简介为空的工具生成
//   npm run gen:descriptions -- --force  # 重新生成全部工具的简介
import fs from "node:fs";
import path from "node:path";

// ---- 极简 .env 加载（兼容直接 node 运行，无需 dotenv）----
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

const API_KEY = process.env.DEEPSEEK_API_KEY;
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const API_URL = "https://api.deepseek.com/chat/completions";
const TOOLS_PATH = path.join(process.cwd(), "data", "tools.json");
const force = process.argv.includes("--force");

if (!API_KEY) {
  console.error(
    "错误：未找到 DEEPSEEK_API_KEY。请在项目根目录的 .env.local 中配置：\nDEEPSEEK_API_KEY=sk-你的密钥",
  );
  process.exit(1);
}

async function generateDescription(tool) {
  const nameZh = tool.nameZh && tool.nameZh !== tool.name ? `（${tool.nameZh}）` : "";
  const prompt = `你是 AI 工具导航网站的编辑。请为下面这款 AI 工具写一段简洁、准确、吸引人的中文简介（50-80 字），突出其核心功能与特点。只输出简介正文，不要任何前缀、后缀或引号。

工具名称：${tool.name}${nameZh}
分类：${tool.category}
现有标签：${tool.tags.join("、")}`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: "你是专业的 AI 工具内容编辑。" },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  if (!res.ok) {
    throw new Error(`API 请求失败 ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function main() {
  const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, "utf-8"));
  let updated = 0;

  for (const tool of tools) {
    const needsGen = force || !tool.description || tool.description.trim() === "";
    if (!needsGen) continue;

    process.stdout.write(`生成中：${tool.name} ... `);
    try {
      const desc = await generateDescription(tool);
      if (desc) {
        tool.description = desc;
        updated++;
        console.log(`✓（${desc.length} 字）`);
      } else {
        console.log("空结果，跳过");
      }
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
  }

  fs.writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n", "utf-8");
  console.log(`\n完成：共更新 ${updated} 款工具，已写回 data/tools.json`);
}

main();

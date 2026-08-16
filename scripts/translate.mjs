// 全站内容翻译脚本：用 DeepSeek 补齐英文字段（工具 / 术语 / 教程）
// 用法：node scripts/translate.mjs
// 需要 .env.local 里有 DEEPSEEK_API_KEY；脚本幂等，重复运行会跳过已翻译的条目。
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function loadEnv() {
  const envFile = path.join(root, ".env.local");
  if (!fs.existsSync(envFile)) return;
  for (const line of fs.readFileSync(envFile, "utf-8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnv();

const KEY = process.env.DEEPSEEK_API_KEY;
if (!KEY) {
  console.error("✗ 缺少 DEEPSEEK_API_KEY：请在 .env.local 里配置后重试。");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callDeepSeek(messages) {
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DeepSeek API ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function parseJson(raw) {
  let text = raw.trim();
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) text = text.slice(start, end + 1);
  return JSON.parse(text);
}

async function askJson(prompt) {
  const raw = await callDeepSeek([
    {
      role: "system",
      content:
        "You are a professional translator. Translate the given Chinese content into natural, fluent English. Always respond with valid JSON only, no markdown fences, no extra commentary.",
    },
    { role: "user", content: prompt },
  ]);
  return parseJson(raw);
}

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(root, rel), "utf-8"));
}

function writeJson(rel, data) {
  fs.writeFileSync(path.join(root, rel), JSON.stringify(data, null, 2) + "\n");
}

// 术语分类（固定映射，保证一致）
const GLOSSARY_CATEGORY_EN = {
  基础概念: "Fundamentals",
  技术架构: "Architecture",
  模型训练: "Model Training",
  提示词: "Prompting",
  应用场景: "Applications",
  伦理安全: "Safety & Ethics",
};

async function translateTools() {
  const file = "data/tools.json";
  const tools = readJson(file);
  for (const t of tools) {
    const needDesc = !t.descriptionEn;
    const needTags = !t.tagsEn || !t.tagsEn.length;
    const needNote = t.pricingNote && !t.pricingNoteEn;
    if (!needDesc && !needTags && !needNote) continue;

    const parts = [`- description: ${t.description}`];
    parts.push(`- tags: [${t.tags.join(", ")}]`);
    if (needNote) parts.push(`- pricingNote: ${t.pricingNote}`);

    try {
      const r = await askJson(
        `Translate these Chinese fields of an AI tool into natural English:\n${parts.join("\n")}\nReturn JSON: {"descriptionEn": string, "tagsEn": string[], "pricingNoteEn"?: string}`,
      );
      if (needDesc && r.descriptionEn) t.descriptionEn = r.descriptionEn;
      if (needTags && Array.isArray(r.tagsEn) && r.tagsEn.length)
        t.tagsEn = r.tagsEn;
      if (needNote && r.pricingNoteEn) t.pricingNoteEn = r.pricingNoteEn;
      console.log(`✓ tool ${t.id}`);
    } catch (e) {
      console.error(`✗ tool ${t.id}: ${e.message}`);
    }
    await sleep(150);
  }
  writeJson(file, tools);
}

async function translateGlossary() {
  const file = "data/glossary.json";
  const terms = readJson(file);
  for (const g of terms) {
    // 分类英文用固定映射，无需 API
    g.categoryEn = GLOSSARY_CATEGORY_EN[g.category] ?? g.categoryEn ?? g.category;
    if (g.definitionEn) continue;
    try {
      const r = await askJson(
        `Translate this AI glossary definition into natural English:\n${g.definition}\nReturn JSON: {"definitionEn": string}`,
      );
      if (r.definitionEn) g.definitionEn = r.definitionEn;
      console.log(`✓ term ${g.id}`);
    } catch (e) {
      console.error(`✗ term ${g.id}: ${e.message}`);
    }
    await sleep(150);
  }
  writeJson(file, terms);
}

async function translateTutorials() {
  const file = "data/tutorials.json";
  const tutorials = readJson(file);
  const dir = path.join(root, "data", "tutorials");
  for (const t of tutorials) {
    const contentFile = path.join(dir, `${t.id}.md`);
    const enFile = path.join(dir, `${t.id}.en.md`);
    if (!fs.existsSync(contentFile)) continue;

    const needMeta =
      !t.titleEn || !t.summaryEn || !t.categoryEn || !t.tagsEn?.length;
    const needContent = !fs.existsSync(enFile);
    if (!needMeta && !needContent) continue;

    const content = fs.readFileSync(contentFile, "utf-8");
    try {
      const r = await askJson(
        [
          "Translate this Chinese AI tutorial into English. Preserve Markdown formatting (##/### headings, - lists, **bold**, `code`, links).",
          `- title: ${t.title}`,
          `- summary: ${t.summary}`,
          `- category: ${t.category}`,
          `- tags: [${t.tags.join(", ")}]`,
          "",
          "--- Markdown content ---",
          content,
          "",
          'Return JSON: {"titleEn": string, "summaryEn": string, "categoryEn": string, "tagsEn": string[], "contentEn": string}',
        ].join("\n"),
      );
      if (needMeta && r.titleEn) t.titleEn = r.titleEn;
      if (needMeta && r.summaryEn) t.summaryEn = r.summaryEn;
      if (needMeta && r.categoryEn) t.categoryEn = r.categoryEn;
      if (needMeta && Array.isArray(r.tagsEn) && r.tagsEn.length)
        t.tagsEn = r.tagsEn;
      if (needContent && r.contentEn)
        fs.writeFileSync(enFile, r.contentEn.trim() + "\n");
      console.log(`✓ tutorial ${t.id}`);
    } catch (e) {
      console.error(`✗ tutorial ${t.id}: ${e.message}`);
    }
    await sleep(300);
  }
  writeJson(file, tutorials);
}

async function main() {
  console.log("开始翻译…");
  await translateTools();
  await translateGlossary();
  await translateTutorials();
  console.log("完成。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

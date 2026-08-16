// 迁移归类：把散落在旧分类里的工具归到更精确的新分类，并清理重复条目。
// 用法：node scripts/migrate-categories.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "data", "tools.json");

// 重复条目：保留数据更全/带徽章的那个，删除另一个。
const REMOVE_IDS = ["mem-ai", "julius-ai", "duolingo-max", "topaz-photo"];

// 归类迁移：toolId -> 新分类（主分类）。
const MIGRATIONS = {
  // 会议助手（原 office）
  otter: "meeting",
  fireflies: "meeting",
  fathom: "meeting",
  "read-ai": "meeting",
  tldv: "meeting",
  granola: "meeting",
  iflyrec: "meeting",
  // 演示文稿（原 office）
  gamma: "slides",
  aippt: "slides",
  // 视频剪辑（原 office）
  descript: "video-edit",
  // 研究学术（原 office）
  notebooklm: "research",
  // 对话助手（原 office）
  xinghuo: "chat",
};

const tools = JSON.parse(readFileSync(dataPath, "utf8"));

// 1. 删除重复条目
const before = tools.length;
const removed = [];
const keep = tools.filter((t) => {
  if (REMOVE_IDS.includes(t.id)) {
    removed.push(t.id);
    return false;
  }
  return true;
});

// 2. 归类迁移
let migrated = 0;
for (const t of keep) {
  const newCat = MIGRATIONS[t.id];
  if (!newCat) continue;
  const oldCat = t.category;
  if (oldCat === newCat) continue;

  t.category = newCat;
  // 同步修正 categories 数组（若存在）
  if (Array.isArray(t.categories) && t.categories.length) {
    const fixed = t.categories.map((c) => (c === oldCat ? newCat : c));
    t.categories = Array.from(new Set(fixed.includes(newCat) ? fixed : [...fixed, newCat]));
  }
  migrated++;
  console.log(`migrate: ${t.id.padEnd(14)} ${oldCat} -> ${newCat}`);
}

writeFileSync(dataPath, JSON.stringify(keep, null, 2) + "\n", "utf8");

console.log(`\nremoved (dup): ${removed.join(", ")}`);
console.log(`migrated: ${migrated} tools`);
console.log(`total: ${before} -> ${keep.length} tools`);

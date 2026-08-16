// 下载各 AI 工具的官方 logo（favicon/apple-touch-icon）到 public/logos/，
// 并把 logo 路径写回 data/tools.json。
// 用法：npm run fetch:logos
import fs from "node:fs";
import path from "node:path";

const TOOLS_PATH = path.join(process.cwd(), "data", "tools.json");
const OUT_DIR = path.join(process.cwd(), "public", "logos");
const UA = "Mozilla/5.0 (compatible; AINavLogoBot/1.0)";

fs.mkdirSync(OUT_DIR, { recursive: true });

const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, "utf-8"));

function hostVariants(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const parts = host.split(".");
    const variants = [host];
    if (parts.length > 2) variants.push(parts.slice(-2).join("."));
    return variants;
  } catch {
    return [];
  }
}

function extOf(contentType) {
  if (contentType.includes("svg")) return "svg";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("jpg") || contentType.includes("jpeg")) return "jpg";
  if (contentType.includes("icon")) return "ico";
  return "png";
}

async function download(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) return null; // 太小，多半是占位或错误页
  return { buf, ext: extOf(res.headers.get("content-type") || "") };
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let ok = 0;
let fail = 0;

for (const tool of tools) {
  let saved = false;

  for (const host of hostVariants(tool.officialUrl)) {
    if (saved) break;
    // 优先 apple-touch-icon（高清），其次 favicon 聚合服务
    const candidates = [
      `https://unavatar.io/${host}?fallback=false`,
    ];
    for (const url of candidates) {
      try {
        const got = await download(url);
        if (got) {
          const file = `${tool.id}.${got.ext}`;
          fs.writeFileSync(path.join(OUT_DIR, file), got.buf);
          tool.logo = `/logos/${file}`;
          process.stdout.write(`✓ ${tool.name.padEnd(18)} ${file}\n`);
          ok++;
          saved = true;
          break;
        }
      } catch {
        // 继续尝试下一个候选
      }
    }
    await delay(120);
  }

  if (!saved) {
    delete tool.logo;
    process.stdout.write(`✗ ${tool.name.padEnd(18)} 未获取到 logo，保留 emoji\n`);
    fail++;
  }
}

fs.writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n", "utf-8");
console.log(`\n完成：成功 ${ok}，失败 ${fail}（失败项自动回退 emoji）`);

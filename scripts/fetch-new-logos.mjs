// 仅对「还没有 logo」的工具抓取 favicon/logo。
// 幂等 + 稳健：已有 logo 或被跳过；每个工具成功后立即写回；fetch 带超时。
import fs from "node:fs";
import path from "node:path";

const TOOLS_PATH = path.join(process.cwd(), "data", "tools.json");
const OUT_DIR = path.join(process.cwd(), "public", "logos");
const UA = "Mozilla/5.0 (compatible; AINavLogoBot/1.0)";

fs.mkdirSync(OUT_DIR, { recursive: true });

const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, "utf-8"));
const EXTENSIONS = ["png", "jpg", "jpeg", "svg", "ico", "webp"];

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
  if (contentType.includes("webp")) return "webp";
  return "png";
}

async function download(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ctrl.signal });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 200) return null;
    return { buf, ext: extOf(res.headers.get("content-type") || "") };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const persist = () =>
  fs.writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n", "utf-8");

const todo = tools.filter((t) => !t.logo);
console.log(`待抓取 logo：${todo.length} 个`);

let ok = 0;
let fail = 0;

for (const tool of todo) {
  let saved = false;

  // 先尝试复用磁盘上已有的孤儿文件（如之前下载成功但未写入 JSON）
  for (const ext of EXTENSIONS) {
    const f = `${tool.id}.${ext}`;
    if (fs.existsSync(path.join(OUT_DIR, f))) {
      tool.logo = `/logos/${f}`;
      process.stdout.write(`♻ ${tool.name.padEnd(18)} 复用 ${f}\n`);
      ok++;
      saved = true;
      break;
    }
  }

  if (!saved) {
    for (const host of hostVariants(tool.officialUrl)) {
      if (saved) break;
      for (const url of [
        `https://unavatar.io/${host}?fallback=false`,
        `https://www.google.com/s2/favicons?domain=${host}&sz=128`,
      ]) {
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
          /* 继续 */
        }
      }
      await delay(300);
    }
  }

  if (!saved) {
    process.stdout.write(`✗ ${tool.name.padEnd(18)} 未获取到 logo，保留 emoji\n`);
    fail++;
  }

  persist();
}

console.log(`\n完成：成功 ${ok}，失败 ${fail}（失败项回退 emoji）`);

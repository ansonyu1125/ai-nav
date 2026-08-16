// 为「还没有 logo」的工具补全 logo。
// 策略：1) LobeHub 彩色图标（npmmirror CDN，国内可达） 2) 官网 HTML 解析 favicon 3) 常见路径兜底。
// 幂等：已有 logo 跳过；每个工具成功后立即写回。
import fs from "node:fs";
import path from "node:path";

const TOOLS_PATH = path.join(process.cwd(), "data", "tools.json");
const OUT_DIR = path.join(process.cwd(), "public", "logos");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

fs.mkdirSync(OUT_DIR, { recursive: true });
const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, "utf-8"));

// 已确认的 LobeHub 彩色图标 slug（id -> slug）
const LOBE_MAP = {
  vidu: "vidu",
  codegeex: "codegeex",
  stepfun: "stepfun",
  baichuan: "baichuan",
  sensenova: "sensenova-brand",
  ai360: "ai360",
};

const LOBE_BASE =
  "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/";

function extOf(ct, url) {
  if (ct.includes("svg")) return "svg";
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("icon")) return "ico";
  const p = url.split("?")[0].toLowerCase();
  if (p.endsWith(".svg")) return "svg";
  if (p.endsWith(".png")) return "png";
  if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return "jpg";
  if (p.endsWith(".webp")) return "webp";
  return "ico";
}

async function fetchBuf(url, timeoutMs = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "image/*,*/*" },
      signal: ctrl.signal,
      redirect: "follow",
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 150) return null;
    return { buf, ext: extOf(res.headers.get("content-type") || "", url) };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function fetchText(url, timeoutMs = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ctrl.signal, redirect: "follow" });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

// 从首页 HTML 里提取 favicon 候选地址（绝对 URL，去重，按 apple-touch-icon 优先靠后）
function iconCandidates(html, baseUrl) {
  const out = [];
  const seen = new Set();
  const linkRe = /<link[^>]+rel=["']([^"']*icon[^"']*)["'][^>]*>/gi;
  const hrefRe = /href=["']([^"']+)["']/i;
  const relRe = /rel=["']([^"']+)["']/i;
  for (const m of html.matchAll(linkRe)) {
    const tag = m[0];
    const href = hrefRe.exec(tag)?.[1];
    const rel = relRe.exec(tag)?.[1] || "";
    if (!href) continue;
    let abs;
    try {
      abs = new URL(href, baseUrl).toString();
    } catch {
      continue;
    }
    if (seen.has(abs)) continue;
    seen.add(abs);
    // apple-touch-icon 通常是 180x180 大图，适合 logo；优先级：普通 icon > apple-touch-icon
    if (rel.includes("apple-touch")) out.push({ abs, touch: true });
    else out.unshift({ abs, touch: false });
  }
  return out.map((x) => x.abs);
}

async function resolveAndSave(tool) {
  const host = (() => {
    try {
      return new URL(tool.officialUrl).hostname;
    } catch {
      return "";
    }
  })();

  // 1) LobeHub 彩色图标
  if (LOBE_MAP[tool.id]) {
    const got = await fetchBuf(LOBE_BASE + LOBE_MAP[tool.id] + ".svg");
    if (got) return save(tool, got);
  }

  // 2) 官网首页 HTML 解析 favicon
  if (host) {
    const html = await fetchText(tool.officialUrl);
    if (html) {
      const candidates = iconCandidates(html, tool.officialUrl);
      // 兜底常见路径
      for (const p of ["/favicon.ico", "/favicon.png", "/favicon-32x32.png", "/apple-touch-icon.png"]) {
        candidates.push("https://" + host + p);
      }
      for (const url of candidates) {
        const got = await fetchBuf(url);
        if (got) return save(tool, got);
      }
    }
  }

  // 3) 纯路径兜底（HTML 拉取失败时）
  if (host) {
    for (const p of ["/favicon.ico", "/favicon.png", "/apple-touch-icon.png"]) {
      const got = await fetchBuf("https://" + host + p);
      if (got) return save(tool, got);
    }
  }

  return false;
}

function save(tool, { buf, ext }) {
  const file = `${tool.id}.${ext}`;
  fs.writeFileSync(path.join(OUT_DIR, file), buf);
  tool.logo = `/logos/${file}`;
  return true;
}

const persist = () =>
  fs.writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n", "utf-8");

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const todo = tools.filter((t) => !t.logo);
console.log(`待补 logo：${todo.length} 个`);

let ok = 0;
let fail = 0;

for (const tool of todo) {
  try {
    const saved = await resolveAndSave(tool);
    if (saved) {
      ok++;
      process.stdout.write(`✓ ${tool.id.padEnd(16)} ${tool.logo}\n`);
    } else {
      fail++;
      process.stdout.write(`✗ ${tool.id.padEnd(16)} 未获取到，保留 emoji\n`);
    }
  } catch (e) {
    fail++;
    process.stdout.write(`✗ ${tool.id.padEnd(16)} 异常 ${e.message}\n`);
  }
  persist();
  await delay(400);
}

console.log(`\n完成：成功 ${ok}，失败 ${fail}。当前有 logo：${tools.filter((t) => t.logo).length}/${tools.length}`);

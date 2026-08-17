// 一次性脚本：为重点产品的各平台补充独立官网/商店链接（App Store、Google Play、Chrome 商店）
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsPath = path.join(__dirname, "..", "data", "tools.json");

const APP_STORE = "App Store";
const GOOGLE_PLAY = "Google Play";
const CHROME = "Chrome 网上应用店";
const CHROME_EN = "Chrome Web Store";

const links = {
  chatgpt: [
    { platform: "ios", url: "https://apps.apple.com/us/app/chatgpt/id6448311069", name: APP_STORE, nameEn: APP_STORE },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.openai.chatgpt", name: GOOGLE_PLAY, nameEn: GOOGLE_PLAY },
  ],
  gemini: [
    { platform: "ios", url: "https://apps.apple.com/us/app/google-gemini/id6477489726", name: APP_STORE, nameEn: APP_STORE },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.google.android.apps.bard", name: GOOGLE_PLAY, nameEn: GOOGLE_PLAY },
  ],
  deepseek: [
    { platform: "ios", url: "https://apps.apple.com/us/app/deepseek/id6737597349", name: APP_STORE, nameEn: APP_STORE },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.deepseek.chat", name: GOOGLE_PLAY, nameEn: GOOGLE_PLAY },
  ],
  perplexity: [
    { platform: "ios", url: "https://apps.apple.com/us/app/perplexity-ask-anything/id1668000334", name: APP_STORE, nameEn: APP_STORE },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=ai.perplexity.app.android", name: GOOGLE_PLAY, nameEn: GOOGLE_PLAY },
  ],
  "copilot-microsoft": [
    { platform: "ios", url: "https://apps.apple.com/us/app/microsoft-copilot/id6472538445", name: APP_STORE, nameEn: APP_STORE },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.microsoft.copilot", name: GOOGLE_PLAY, nameEn: GOOGLE_PLAY },
  ],
  "google-translate": [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb", name: CHROME, nameEn: CHROME_EN },
  ],
  deepl: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/deepl-translate-beta-versi/cofdbpoegempjloogbagkncekinflcnj", name: CHROME, nameEn: CHROME_EN },
  ],
  grammarly: [
    { platform: "extension", url: "https://chromewebstore.google.com/detail/grammarly-grammar-checker/kbfnbcaeplbcioakkpcpgfkobkghlhen", name: CHROME, nameEn: CHROME_EN },
  ],
  "notion-ai": [
    { platform: "ios", url: "https://apps.apple.com/us/app/notion/id1232780281", name: APP_STORE, nameEn: APP_STORE },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=notion.id", name: GOOGLE_PLAY, nameEn: GOOGLE_PLAY },
  ],
  canva: [
    { platform: "ios", url: "https://apps.apple.com/us/app/canva-design-photo-video/id897446215", name: APP_STORE, nameEn: APP_STORE },
    { platform: "android", url: "https://play.google.com/store/apps/details?id=com.canva.editor", name: GOOGLE_PLAY, nameEn: GOOGLE_PLAY },
  ],
  grok: [
    { platform: "ios", url: "https://apps.apple.com/us/app/grok/id6741262930", name: APP_STORE, nameEn: APP_STORE },
  ],
};

const tools = JSON.parse(fs.readFileSync(toolsPath, "utf-8"));
let count = 0;
for (const tool of tools) {
  const arr = links[tool.id];
  if (arr) {
    tool.platformLinks = arr;
    count++;
  }
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2) + "\n");
console.log(`✅ 已为 ${count} 款产品补充平台独立链接`);

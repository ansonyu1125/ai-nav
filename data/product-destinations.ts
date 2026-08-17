import type { PlatformLink } from "@/lib/types";

// Verified official product-form destinations. API and desktop pages are only
// generated when a dedicated documentation or download destination exists.
export const productDestinationOverrides: Partial<Record<string, PlatformLink[]>> = {
  chatgpt: [
    { platform: "api", url: "https://platform.openai.com/docs/overview", name: "OpenAI API 文档", nameEn: "OpenAI API docs" },
    { platform: "desktop", url: "https://openai.com/chatgpt/desktop/", name: "桌面版下载", nameEn: "Desktop download" },
  ],
  claude: [
    { platform: "api", url: "https://docs.anthropic.com/en/api/overview", name: "Anthropic API 文档", nameEn: "Anthropic API docs" },
    { platform: "desktop", url: "https://claude.ai/download", name: "桌面版下载", nameEn: "Desktop download" },
  ],
  gemini: [{ platform: "api", url: "https://ai.google.dev/gemini-api/docs", name: "Gemini API 文档", nameEn: "Gemini API docs" }],
  deepseek: [{ platform: "api", url: "https://api-docs.deepseek.com/", name: "DeepSeek API 文档", nameEn: "DeepSeek API docs" }],
  perplexity: [
    { platform: "api", url: "https://docs.perplexity.ai/", name: "Perplexity API 文档", nameEn: "Perplexity API docs" },
    { platform: "desktop", url: "https://www.perplexity.ai/hub/faq/how-to-download-the-perplexity-desktop-app", name: "桌面版下载说明", nameEn: "Desktop download guide" },
  ],
  elevenlabs: [{ platform: "api", url: "https://elevenlabs.io/docs/api-reference", name: "ElevenLabs API 文档", nameEn: "ElevenLabs API docs" }],
  runway: [{ platform: "api", url: "https://docs.dev.runwayml.com/", name: "Runway API 文档", nameEn: "Runway API docs" }],
  mistral: [{ platform: "api", url: "https://docs.mistral.ai/api/", name: "Mistral API 文档", nameEn: "Mistral API docs" }],
  replicate: [{ platform: "api", url: "https://replicate.com/docs/reference/http", name: "Replicate API 文档", nameEn: "Replicate API docs" }],
  "stable-diffusion": [{ platform: "api", url: "https://platform.stability.ai/docs/api-reference", name: "Stability API 文档", nameEn: "Stability API docs" }],
  cursor: [{ platform: "desktop", url: "https://www.cursor.com/downloads", name: "桌面客户端下载", nameEn: "Desktop download" }],
  windsurf: [{ platform: "desktop", url: "https://windsurf.com/download/editor", name: "桌面客户端下载", nameEn: "Desktop download" }],
  "notion-ai": [{ platform: "desktop", url: "https://www.notion.com/desktop", name: "桌面客户端下载", nameEn: "Desktop download" }],
  canva: [{ platform: "desktop", url: "https://www.canva.com/download/", name: "桌面客户端下载", nameEn: "Desktop download" }],
  grammarly: [{ platform: "desktop", url: "https://www.grammarly.com/desktop", name: "桌面客户端下载", nameEn: "Desktop download" }],
};

export interface EvidenceSource {
  pricingUrl?: string;
  pricingLabel?: string;
  termsUrl?: string;
}

// Official first-party destinations. A source URL does not imply that its
// contents were re-verified on the current date; timestamps remain separate.
export const evidenceSources: Partial<Record<string, EvidenceSource>> = {
  chatgpt: { pricingUrl: "https://chatgpt.com/pricing/", pricingLabel: "ChatGPT pricing" },
  claude: { pricingUrl: "https://claude.com/pricing", pricingLabel: "Claude pricing" },
  gemini: { pricingUrl: "https://one.google.com/about/google-ai-plans/", pricingLabel: "Google AI plans" },
  deepseek: { pricingUrl: "https://api-docs.deepseek.com/quick_start/pricing", pricingLabel: "DeepSeek API pricing" },
  copilot: { pricingUrl: "https://github.com/features/copilot/plans", pricingLabel: "GitHub Copilot plans" },
  midjourney: { pricingUrl: "https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans", pricingLabel: "Midjourney plans" },
  cursor: { pricingUrl: "https://cursor.com/pricing", pricingLabel: "Cursor pricing" },
  "claude-code": { pricingUrl: "https://claude.com/pricing", pricingLabel: "Claude pricing" },
  perplexity: { pricingUrl: "https://www.perplexity.ai/pro", pricingLabel: "Perplexity Pro" },
  suno: { pricingUrl: "https://suno.com/pricing", pricingLabel: "Suno pricing" },
  canva: { pricingUrl: "https://www.canva.com/pricing/", pricingLabel: "Canva pricing" },
  "stable-diffusion": { pricingUrl: "https://platform.stability.ai/pricing", pricingLabel: "Stability AI pricing" },
  "notion-ai": { pricingUrl: "https://www.notion.com/pricing", pricingLabel: "Notion pricing" },
  runway: { pricingUrl: "https://runway.com/pricing", pricingLabel: "Runway pricing" },
  elevenlabs: { pricingUrl: "https://elevenlabs.io/pricing", pricingLabel: "ElevenLabs pricing" },
  grammarly: { pricingUrl: "https://www.grammarly.com/plans", pricingLabel: "Grammarly plans" },
  windsurf: { pricingUrl: "https://windsurf.com/pricing", pricingLabel: "Windsurf pricing" },
  figma: { pricingUrl: "https://www.figma.com/pricing/", pricingLabel: "Figma pricing" },
  heygen: { pricingUrl: "https://www.heygen.com/pricing", pricingLabel: "HeyGen pricing" },
  gamma: { pricingUrl: "https://gamma.app/pricing", pricingLabel: "Gamma pricing" },
  "character-ai": { pricingUrl: "https://character.ai/subscription/plus", pricingLabel: "Character.AI subscription" },
  openrouter: { pricingUrl: "https://openrouter.ai/models", pricingLabel: "OpenRouter model pricing" },
  v0: { pricingUrl: "https://v0.dev/pricing", pricingLabel: "v0 pricing" },
  firefly: { pricingUrl: "https://www.adobe.com/products/firefly/plans.html", pricingLabel: "Adobe Firefly plans" },
  lovable: { pricingUrl: "https://lovable.dev/pricing", pricingLabel: "Lovable pricing" },
  bolt: { pricingUrl: "https://bolt.new/pricing", pricingLabel: "Bolt pricing" },
};


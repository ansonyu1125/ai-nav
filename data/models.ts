export interface ModelComparisonRecord {
  id: string;
  name: string;
  provider: string;
  family: string;
  access: string;
  inputs: string[];
  outputs: string[];
  reasoning: string;
  toolUse: string;
  openWeights: string;
  deployment: string;
  bestFor: string;
  limitations: string;
  officialUrl: string;
}

export const comparisonModels: ModelComparisonRecord[] = [
  { id: "gpt", name: "GPT-5.6 / GPT-5.5", provider: "OpenAI", family: "GPT", access: "ChatGPT and API", inputs: ["Text", "Images"], outputs: ["Text", "Code"], reasoning: "Available", toolUse: "Available through supported products and APIs", openWeights: "No", deployment: "Cloud API", bestFor: "General work, coding, agents, and multimodal tasks", limitations: "Exact limits and model availability vary by plan and API endpoint.", officialUrl: "https://platform.openai.com/docs/models" },
  { id: "claude", name: "Claude Opus 5", provider: "Anthropic", family: "Claude", access: "Claude and API", inputs: ["Text", "Images"], outputs: ["Text", "Code"], reasoning: "Available", toolUse: "Available through supported products and APIs", openWeights: "No", deployment: "Cloud API", bestFor: "Long-form analysis, coding, document work, and agents", limitations: "Usage limits and advanced capabilities depend on the selected plan.", officialUrl: "https://docs.anthropic.com/en/docs/about-claude/models/overview" },
  { id: "gemini", name: "Gemini 3.7", provider: "Google", family: "Gemini", access: "Gemini and API", inputs: ["Text", "Images", "Audio", "Video"], outputs: ["Text", "Code"], reasoning: "Available", toolUse: "Available through supported products and APIs", openWeights: "No", deployment: "Cloud API", bestFor: "Multimodal analysis and Google ecosystem workflows", limitations: "Regional access, quotas, and product features can differ from API access.", officialUrl: "https://ai.google.dev/gemini-api/docs/models" },
  { id: "deepseek", name: "DeepSeek V4 / V3.2", provider: "DeepSeek", family: "DeepSeek", access: "DeepSeek and API", inputs: ["Text"], outputs: ["Text", "Code"], reasoning: "Available in supported variants", toolUse: "API support varies by model variant", openWeights: "Selected models", deployment: "Hosted API or self-hosted for supported weights", bestFor: "Reasoning, coding, and cost-sensitive API workloads", limitations: "Capabilities and deployment terms differ between hosted and open-weight variants.", officialUrl: "https://api-docs.deepseek.com/quick_start/pricing" },
  { id: "qwen", name: "Qwen3.8", provider: "Alibaba Cloud", family: "Qwen", access: "Qwen products, API, and selected weights", inputs: ["Text", "Images"], outputs: ["Text", "Code"], reasoning: "Available in supported variants", toolUse: "Available in supported variants", openWeights: "Selected models", deployment: "Cloud API or self-hosted for supported weights", bestFor: "Multilingual work, coding, and flexible deployment", limitations: "Model sizes and capabilities vary widely across the family.", officialUrl: "https://qwenlm.github.io/" },
  { id: "grok", name: "Grok series", provider: "xAI", family: "Grok", access: "Grok and API", inputs: ["Text", "Images"], outputs: ["Text", "Code"], reasoning: "Available in supported variants", toolUse: "Available through supported products and APIs", openWeights: "No for current flagship models", deployment: "Cloud API", bestFor: "Current-information workflows, reasoning, and coding", limitations: "Product access and API capabilities can differ by region and plan.", officialUrl: "https://docs.x.ai/docs/models" },
];

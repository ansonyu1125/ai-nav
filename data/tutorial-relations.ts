export type TutorialTrack = "getting-started" | "how-to-use" | "pricing" | "workflows" | "troubleshooting" | "commercial-use" | "alternatives";

export interface TutorialRelation {
  track: TutorialTrack;
  level: "beginner" | "intermediate";
  toolIds: string[];
  nextTutorialIds: string[];
  compareToolIds?: string[];
  bestPage?: string;
}

export const tutorialTrackLabels: Record<TutorialTrack, { zh: string; en: string; descriptionZh: string; descriptionEn: string }> = {
  "getting-started": { zh: "新手入门", en: "Getting started", descriptionZh: "认识工具、完成注册并做出第一个结果", descriptionEn: "Understand the tool, get set up and make your first result" },
  "how-to-use": { zh: "使用方法", en: "How to use", descriptionZh: "掌握核心功能和可靠的操作步骤", descriptionEn: "Learn the core controls and repeatable steps" },
  pricing: { zh: "价格解析", en: "Pricing explained", descriptionZh: "看懂免费额度、付费方案和隐藏限制", descriptionEn: "Understand free limits, paid plans and hidden constraints" },
  workflows: { zh: "最佳工作流", en: "Best workflows", descriptionZh: "把多个工具组合成可复用的完整流程", descriptionEn: "Combine tools into a repeatable end-to-end workflow" },
  troubleshooting: { zh: "问题排查", en: "Troubleshooting", descriptionZh: "处理常见错误、质量问题和访问障碍", descriptionEn: "Resolve common errors, quality issues and access blockers" },
  "commercial-use": { zh: "商业使用", en: "Commercial use", descriptionZh: "核对授权、版权与商业发布风险", descriptionEn: "Check licensing, copyright and publishing risks" },
  alternatives: { zh: "替代方案", en: "Alternatives", descriptionZh: "按价格、能力和平台寻找更合适的选择", descriptionEn: "Find a better fit by price, capability and platform" },
};

export const tutorialRelations: Record<string, TutorialRelation> = {
  "chatgpt-guide": { track: "getting-started", level: "beginner", toolIds: ["chatgpt", "claude", "gemini"], compareToolIds: ["chatgpt", "claude", "gemini"], nextTutorialIds: ["prompt-skills", "ai-search"] },
  "prompt-skills": { track: "how-to-use", level: "beginner", toolIds: ["chatgpt", "claude", "gemini"], nextTutorialIds: ["chatgpt-guide", "ai-office"] },
  "ai-painting": { track: "getting-started", level: "beginner", toolIds: ["midjourney", "dalle", "stable-diffusion"], compareToolIds: ["midjourney", "dalle", "stable-diffusion"], bestPage: "/best/ai-image-generators", nextTutorialIds: ["prompt-skills", "ai-video"] },
  "ai-coding": { track: "workflows", level: "beginner", toolIds: ["cursor", "copilot", "claude-code"], compareToolIds: ["cursor", "copilot", "claude-code"], bestPage: "/best/ai-coding-tools", nextTutorialIds: ["prompt-skills", "ai-agent-guide"] },
  "ai-video": { track: "getting-started", level: "beginner", toolIds: ["sora", "kling", "runway"], compareToolIds: ["sora", "kling", "runway"], bestPage: "/best/ai-video-generators", nextTutorialIds: ["ai-painting", "prompt-skills"] },
  "ai-search": { track: "how-to-use", level: "beginner", toolIds: ["perplexity", "metaso", "you-com"], compareToolIds: ["perplexity", "metaso"], nextTutorialIds: ["prompt-skills", "chatgpt-guide"] },
  "ai-music": { track: "getting-started", level: "beginner", toolIds: ["suno", "udio"], compareToolIds: ["suno", "udio"], nextTutorialIds: ["prompt-skills", "ai-video"] },
  "ai-office": { track: "workflows", level: "beginner", toolIds: ["notion-ai", "gamma", "wps-ai"], compareToolIds: ["notion-ai", "gamma", "wps-ai"], bestPage: "/best/ai-office-tools", nextTutorialIds: ["prompt-skills", "ai-search"] },
  "ai-agent-guide": { track: "workflows", level: "intermediate", toolIds: ["coze", "dify", "zapier"], compareToolIds: ["coze", "dify"], nextTutorialIds: ["prompt-skills", "ai-coding"] },
  "deepseek-guide": { track: "getting-started", level: "beginner", toolIds: ["deepseek", "chatgpt", "claude"], compareToolIds: ["deepseek", "chatgpt", "claude"], nextTutorialIds: ["prompt-skills", "ai-search"] },
  "chatgpt-alternatives": { track: "alternatives", level: "beginner", toolIds: ["chatgpt", "claude", "gemini", "perplexity", "deepseek"], compareToolIds: ["chatgpt", "claude", "gemini", "perplexity"], bestPage: "/best/ai-chat-assistants", nextTutorialIds: ["chatgpt-guide", "deepseek-guide", "ai-search"] },
  "midjourney-alternatives": { track: "alternatives", level: "beginner", toolIds: ["midjourney", "dalle", "stable-diffusion", "firefly", "leonardo"], compareToolIds: ["midjourney", "dalle", "stable-diffusion"], bestPage: "/best/ai-image-generators", nextTutorialIds: ["ai-painting", "prompt-skills", "ai-video"] },
  "cursor-alternatives": { track: "alternatives", level: "intermediate", toolIds: ["cursor", "copilot", "claude-code", "windsurf", "codeium"], compareToolIds: ["cursor", "copilot", "claude-code", "windsurf"], bestPage: "/best/ai-coding-tools", nextTutorialIds: ["ai-coding", "ai-agent-guide", "prompt-skills"] },
  "ai-side-hustle": { track: "commercial-use", level: "intermediate", toolIds: ["chatgpt", "canva", "capcut"], nextTutorialIds: ["ai-video", "ai-office", "ai-painting"] },
};

export function getTutorialRelation(id: string): TutorialRelation {
  return tutorialRelations[id] ?? { track: "how-to-use", level: "beginner", toolIds: [], nextTutorialIds: [] };
}

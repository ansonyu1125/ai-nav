// 用 ChatGPT 填一套「新详情页结构」的示例数据，作为其他工具补内容的模板。
// 仅演示 useCases / faqs / company / pricingTiers.features 的写法；traffic 留空（等 Apify 真实数据）。
// 用法：node scripts/seed-example.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "data", "tools.json");

const tools = JSON.parse(readFileSync(dataPath, "utf8"));
const c = tools.find((t) => t.id === "chatgpt");
if (!c) throw new Error("chatgpt not found");

// 每档价格的功能权限（按现有 tiers 顺序）
const tierFeaturesZh = [
  ["基础对话与问答", "网页端 + 移动端访问", "有限的消息额度", "基础 GPT 模型"],
  ["GPT-5 系列模型", "更高消息额度", "联网搜索", "图像生成与识别（DALL·E）", "文件上传与高级数据分析", "优先访问新功能"],
  ["全部 Plus 功能", "更高用量上限", "优先性能与可用性", "深度研究与推理"],
  ["全部 Plus 功能", "团队协作工作区", "共享自定义 GPTs", "团队管理控制台"],
  ["全部 Team 功能", "企业级安全与合规", "SSO/SAML 单点登录", "专属支持与更长上下文"],
];
const tierFeaturesEn = [
  ["Basic chat & Q&A", "Web + mobile access", "Limited message quota", "Base GPT model"],
  ["GPT-5 series models", "Higher message limits", "Web browsing", "Image generation & vision (DALL·E)", "File upload & advanced data analysis", "Early access to new features"],
  ["All Plus features", "Higher usage limits", "Priority performance & availability", "Deep research & reasoning"],
  ["All Plus features", "Team workspace", "Shared custom GPTs", "Team admin console"],
  ["All Team features", "Enterprise security & compliance", "SSO/SAML", "Dedicated support & longer context"],
];

c.pricingTiers = c.pricingTiers.map((t, i) => ({
  ...t,
  features: tierFeaturesZh[i] ?? [],
}));
c.pricingTiersEn = c.pricingTiersEn.map((t, i) => ({
  ...t,
  featuresEn: tierFeaturesEn[i] ?? [],
}));

c.useCases = [
  "日常问答与知识查询：解答技术、学习、生活等各类问题",
  "写作辅助：起草邮件、文案、文章、报告与代码注释",
  "编程助手：解释代码、排查报错、生成代码片段",
  "头脑风暴与创意：产品命名、方案构思、灵感发散",
  "学习辅导：概念讲解、例题解析、知识梳理",
];
c.useCasesEn = [
  "Everyday Q&A and knowledge lookup across tech, study and life",
  "Writing help for emails, copy, articles, reports and code comments",
  "Coding assistant for explaining code, debugging and generating snippets",
  "Brainstorming and ideation for naming, planning and inspiration",
  "Study support with concept explanations, examples and summaries",
];

c.faqs = [
  { q: "ChatGPT 是免费的吗？", a: "有免费版；订阅 ChatGPT Plus/Pro 可解锁更高配额和更先进的模型。" },
  { q: "ChatGPT 和 GPT 模型有什么区别？", a: "ChatGPT 是面向用户的对话产品，GPT 是底层大模型，ChatGPT 调用 GPT 系列模型。" },
  { q: "我的对话会被用来训练模型吗？", a: "可在设置中关闭「为改进模型而训练」；企业版默认不训练。" },
  { q: "支持哪些语言？", a: "支持包括中文在内的数十种语言。" },
  { q: "有 API 吗？", a: "有，开发者可通过 OpenAI API 调用 GPT 模型。" },
];
c.faqsEn = [
  { q: "Is ChatGPT free?", a: "There is a free tier; ChatGPT Plus/Pro unlock higher quotas and more advanced models." },
  { q: "What's the difference between ChatGPT and GPT?", a: "ChatGPT is the user-facing chat product; GPT is the underlying model that ChatGPT calls." },
  { q: "Is my data used for training?", a: "You can turn off the 'improve the model' option in settings; Enterprise is off by default." },
  { q: "Which languages are supported?", a: "Dozens of languages, including Chinese." },
  { q: "Is there an API?", a: "Yes, developers can call GPT models via the OpenAI API." },
];

c.company = {
  name: "OpenAI",
  nameEn: "OpenAI",
  location: "美国 · 旧金山",
  locationEn: "San Francisco, USA",
  officialUrl: "https://openai.com",
  loginUrl: "https://chatgpt.com/auth/login",
  signupUrl: "https://chatgpt.com/auth/login",
};

writeFileSync(dataPath, JSON.stringify(tools, null, 2) + "\n", "utf8");
console.log("seeded chatgpt with useCases/faqs/company + per-tier pricing features");

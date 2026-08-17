export const site = {
  name: "AI 导航",
  nameEn: "AINav",
  tagline: "发现全网最好的 AI 工具",
  taglineEn: "Discover the best AI tools on the web",
  description:
    "全网 AI 工具导航：收录 ChatGPT、Claude、Midjourney、DeepSeek 等主流 AI 软件，提供 AI 教程、AI 术语解析、排行榜、分类与费用信息，帮你快速找到合适的 AI 工具。",
  descriptionEn:
    "A curated directory of AI tools — ChatGPT, Claude, Midjourney, DeepSeek and more — with tutorials, an AI glossary, rankings, categories and pricing to help you find the right tool.",
  url: "https://ai-nav-indol.vercel.app",
};

export type NavChild = { label: string; labelEn: string; href: string };
export type NavItem = {
  label: string;
  labelEn: string;
  href: string;
  children?: NavChild[];
};

export const nav: NavItem[] = [
  { label: "首页", labelEn: "Home", href: "/" },
  {
    label: "AI 产品",
    labelEn: "Products",
    href: "/tools",
    children: [
      { label: "全部产品", labelEn: "All tools", href: "/tools" },
      { label: "手机应用", labelEn: "Mobile apps", href: "/tools?platform=mobile" },
      { label: "浏览器插件", labelEn: "Browser extensions", href: "/tools?platform=extension" },
      { label: "桌面客户端", labelEn: "Desktop apps", href: "/tools?platform=desktop" },
      { label: "API 接口", labelEn: "API", href: "/tools?platform=api" },
      { label: "网页版", labelEn: "Web apps", href: "/tools?platform=web" },
    ],
  },
  { label: "排行榜", labelEn: "Ranking", href: "/ranking" },
  { label: "深度指南", labelEn: "Guides", href: "/best" },
  { label: "AI 资讯", labelEn: "News", href: "/news" },
  { label: "AI 教程", labelEn: "Tutorials", href: "/tutorials" },
  { label: "术语词典", labelEn: "Glossary", href: "/glossary" },
];

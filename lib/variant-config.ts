import type { ProductVariant } from "./product-variants";

export const variantConfig: Record<ProductVariant, {
  route: string;
  nameZh: string;
  nameEn: string;
  pluralZh: string;
  pluralEn: string;
  accent: string;
  accentText: string;
  panel: string;
  destinationZh: string;
  destinationEn: string;
  indexDescriptionZh: string;
  indexDescriptionEn: string;
}> = {
  web: { route: "web", nameZh: "网页应用", nameEn: "Web app", pluralZh: "AI 网页应用", pluralEn: "AI Web Apps", accent: "#f5ead5", accentText: "#725719", panel: "#f5ead5", destinationZh: "官方网页入口", destinationEn: "Official web destination", indexDescriptionZh: "仅收录拥有明确官方网页入口的产品；网页功能和官网访问数据与其他产品形态分开呈现。", indexDescriptionEn: "Products with a clear official web destination, with web features and traffic kept separate from other formats." },
  app: { route: "apps", nameZh: "移动 App", nameEn: "Mobile app", pluralZh: "AI 移动 App", pluralEn: "AI Mobile Apps", accent: "#d9f99d", accentText: "#146640", panel: "#e5f4e9", destinationZh: "官方安装入口", destinationEn: "Official install destinations", indexDescriptionZh: "仅收录拥有可核验官方 App Store 或 Google Play 入口的产品。", indexDescriptionEn: "Only products with a verifiable official App Store or Google Play destination." },
  plugin: { route: "plugins", nameZh: "浏览器插件", nameEn: "Browser plugin", pluralZh: "AI 浏览器插件", pluralEn: "AI Browser Plugins", accent: "#7dd3fc", accentText: "#176d79", panel: "#e4f2f2", destinationZh: "官方插件入口", destinationEn: "Official extension destination", indexDescriptionZh: "仅收录拥有可核验官方浏览器插件商店入口的产品。", indexDescriptionEn: "Only products with a verifiable official browser-extension store destination." },
  api: { route: "api", nameZh: "API 接口", nameEn: "API", pluralZh: "AI API 接口", pluralEn: "AI APIs", accent: "#f8c36a", accentText: "#7a4b00", panel: "#f6ead2", destinationZh: "官方 API 入口", destinationEn: "Official API destination", indexDescriptionZh: "仅收录拥有明确官方 API 文档入口的产品，不使用普通官网代替开发者文档。", indexDescriptionEn: "Only products with a dedicated official API documentation destination; general homepages are not substituted." },
  desktop: { route: "desktop", nameZh: "桌面客户端", nameEn: "Desktop app", pluralZh: "AI 桌面客户端", pluralEn: "AI Desktop Apps", accent: "#f5b7a7", accentText: "#7a3828", panel: "#f7e7e1", destinationZh: "官方下载入口", destinationEn: "Official download destination", indexDescriptionZh: "仅收录拥有明确官方桌面客户端下载页的产品，不使用网页版入口冒充下载地址。", indexDescriptionEn: "Only products with a dedicated official desktop download page; web app links are not substituted." },
};


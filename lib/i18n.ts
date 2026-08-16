import OpenCC from "opencc-js";

export type Lang = "zh" | "zhTW" | "en";

let cn2tw: ((text: string) => string) | null = null;

// 简体 → 繁体（台湾标准正体，即通用的「繁体中文」）
export function toTraditional(text: string): string {
  if (!cn2tw) cn2tw = OpenCC.Converter({ from: "cn", to: "tw" });
  return cn2tw(text);
}

// 按语言取字符串：英文缺失回退中文；繁体用 OpenCC 即时转换
export function localize(lang: Lang, zh: string, en?: string): string {
  if (lang === "en" && en) return en;
  if (lang === "zhTW") return toTraditional(zh);
  return zh;
}

// 数组版本（标签等）
export function localizeArray(lang: Lang, zh: string[], en?: string[]): string[] {
  const arr = lang === "en" && en && en.length ? en : zh;
  return lang === "zhTW" ? arr.map(toTraditional) : arr;
}

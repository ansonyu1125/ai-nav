import type { Lang } from "./i18n";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

// 访问量：中文用「亿/万」，英文用 B/M/K
export function formatVisits(n: number | undefined, lang: Lang): string {
  if (n == null) return "—";
  const abs = Math.abs(n);
  if (lang === "en") {
    if (abs >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
    if (abs >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return `${n.toLocaleString("en-US")}`;
  }
  if (abs >= 1e8) return `${(n / 1e8).toFixed(1)}亿`;
  if (abs >= 1e4) return `${(n / 1e4).toFixed(1)}万`;
  return `${n.toLocaleString("zh-CN")}`;
}

// 环比增长绝对值，带正负号
export function formatGrowth(n: number | undefined, lang: Lang): string {
  if (n == null) return "—";
  const sign = n > 0 ? "+" : n < 0 ? "-" : "";
  return sign + formatVisits(Math.abs(n), lang);
}

// 环比增长率百分比，带正负号
export function formatPercent(n: number | undefined): string {
  if (n == null) return "—";
  const sign = n > 0 ? "+" : "";
  const v = Number.isInteger(n) ? `${n}` : n.toFixed(1);
  return `${sign}${v}%`;
}

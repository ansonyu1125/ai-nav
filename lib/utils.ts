export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

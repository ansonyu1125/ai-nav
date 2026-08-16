import { existsSync } from "node:fs";
import { join } from "node:path";

// 收费标准截图约定放在 public/pricing/{id}.{png|jpg|jpeg|webp|svg}
// 用户后续把真实官网截图放进该目录后，详情页会自动显示。
const EXTENSIONS = ["png", "jpg", "jpeg", "webp", "svg"] as const;

export function getPricingScreenshot(id: string): string | null {
  const dir = join(process.cwd(), "public", "pricing");
  for (const ext of EXTENSIONS) {
    const file = `${id}.${ext}`;
    if (existsSync(join(dir, file))) {
      return `/pricing/${file}`;
    }
  }
  return null;
}

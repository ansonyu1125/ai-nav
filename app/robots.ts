import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// 生成 /robots.txt：允许抓取全部页面，屏蔽 /api 接口，并指向 sitemap
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

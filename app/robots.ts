import { config } from "@/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/", "/api/", "/_next/", "/.*\\.json$"],
      },
    ],
    sitemap: `${config.baseUrl}/sitemap.xml`,
    host: config.baseUrl,
  };
}

import type { MetadataRoute } from "next";

/**
 * Mirrors the base-URL resolution used in `app/sitemap.ts` so both files
 * stay in sync. Set NEXT_PUBLIC_SITE_URL in production to your real
 * canonical origin (e.g. https://www.smartloans.com).
 */
function getBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  return {
    rules: [
      {
        // All well-behaved crawlers — index the public site.
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",        // CMS / admin panel
          "/admin/",
          "/api/",         // API endpoints
          "/_next/",       // Next internals
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

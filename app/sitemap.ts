import type { MetadataRoute } from "next";
import { getBlogPosts, getServices } from "@/lib/data";

/**
 * Resolve the public base URL from env. Order of precedence:
 *   1. NEXT_PUBLIC_SITE_URL  – preferred, fully-qualified (https://example.com)
 *   2. NEXT_PUBLIC_BASE_URL  – common alternative name
 *   3. http://localhost:3000 – dev fallback so the file works locally
 *
 * Trailing slashes are stripped so URL joining stays predictable.
 */
function getBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

/**
 * Best-effort `lastModified` for a Mongoose doc. The TS interfaces in
 * `lib/data.ts` don't expose `updatedAt`/`createdAt`, but the schemas use
 * `{ timestamps: true }` so the values exist at runtime — we read them
 * defensively without forcing a wider type change.
 */
function pickLastModified(doc: Record<string, unknown>, fallback: Date = new Date()): Date {
  const candidate =
    doc.updatedAt ?? doc.createdAt ?? (doc as { date?: string }).date;
  if (!candidate) return fallback;
  const d = new Date(candidate as string | Date);
  return isNaN(d.getTime()) ? fallback : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,                 lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,         lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/service-details`,  lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/blog`,             lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/contact`,          lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/application-form`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic routes. We isolate each DB call so a transient MongoDB outage
  // can never break the entire sitemap — search engines still get the
  // static pages.
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts(true);
    blogRoutes = posts.map((p) => {
      const slug = p.slug ?? p._id;
      return {
        url: `${base}/blog/${slug}`,
        lastModified: pickLastModified(p as unknown as Record<string, unknown>),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });
  } catch (e) {
    console.error("[sitemap] Failed to load blog posts:", e);
  }

  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await getServices();
    serviceRoutes = services.map((s) => ({
      url: `${base}/service-details/${s._id}`,
      lastModified: pickLastModified(s as unknown as Record<string, unknown>),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("[sitemap] Failed to load services:", e);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}

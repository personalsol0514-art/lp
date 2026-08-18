import { blogPosts } from "../lib/blog-posts";
import { absoluteUrl, corePages } from "../lib/site";
import { ensureBlogSchema, getDb } from "./_blog-utils";

type Env = {
  BLOG_DB?: any;
};

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
};

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderSitemap(entries: SitemapEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(entry.url)}</loc>
    <lastmod>${xmlEscape(entry.lastModified)}</lastmod>
    <changefreq>${xmlEscape(entry.changeFrequency)}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

export const onRequestGet = async ({ env }: { env: Env }) => {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = corePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const fallbackPosts = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt).toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  if (env.BLOG_DB) {
    try {
      const db = getDb(env);
      await ensureBlogSchema(db);
      const result = await db
        .prepare(
          "SELECT slug, published_at, updated_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC",
        )
        .all();
      const dbPosts = (result.results || []).map((row: any) => ({
        url: absoluteUrl(`/blog/${row.slug}`),
        lastModified: new Date(row.updated_at || row.published_at).toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
      entries.push(...dbPosts);
    } catch (error) {
      console.error("sitemap db error", error);
      entries.push(...fallbackPosts);
    }
  } else {
    entries.push(...fallbackPosts);
  }

  return new Response(renderSitemap(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

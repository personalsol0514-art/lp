import { blogPosts } from "../lib/blog-posts";

export type BlogPostRecord = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
  status: "draft" | "published";
  published_at: string;
  created_at: string;
  updated_at: string;
};

type Env = {
  BLOG_DB?: any;
  BLOG_ADMIN_PASSWORD?: string;
};

export function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

export function getDb(env: Env) {
  if (!env.BLOG_DB) {
    throw new Error("BLOG_DB binding is not configured.");
  }
  return env.BLOG_DB;
}

export function requireAdmin(request: Request, env: Env) {
  const password = env.BLOG_ADMIN_PASSWORD;
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!password) {
    return false;
  }

  return token === password;
}

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function toDisplayDate(value: string) {
  const date = value.split("T")[0] || value;
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) {
    return value;
  }
  return `${year}.${month}.${day}`;
}

export function mapPost(row: BlogPostRecord) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    image: row.image,
    content: row.content,
    status: row.status,
    publishedAt: row.published_at,
    date: toDisplayDate(row.published_at),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function sectionsToContent(post: (typeof blogPosts)[number]) {
  return post.sections
    .map((section) => {
      const body = section.body.join("\n\n");
      return `## ${section.heading}\n\n${body}`;
    })
    .join("\n\n");
}

export async function ensureBlogSchema(db: any) {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS blog_posts (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'draft',
        published_at TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();

  const countResult = await db
    .prepare("SELECT COUNT(*) AS count FROM blog_posts")
    .first();

  if (Number(countResult?.count || 0) > 0) {
    return;
  }

  const now = new Date().toISOString();
  for (const post of blogPosts) {
    await db
      .prepare(
        `INSERT INTO blog_posts (
          slug, title, excerpt, category, image, content, status,
          published_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?, ?)`,
      )
      .bind(
        post.slug,
        post.title,
        post.excerpt,
        post.category,
        post.image,
        sectionsToContent(post),
        post.publishedAt,
        now,
        now,
      )
      .run();
  }
}

export async function getPostBySlug(db: any, slug: string, includeDrafts = false) {
  const sql = includeDrafts
    ? "SELECT * FROM blog_posts WHERE slug = ? LIMIT 1"
    : "SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1";
  return db.prepare(sql).bind(slug).first() as Promise<BlogPostRecord | null>;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

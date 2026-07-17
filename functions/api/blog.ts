import {
  ensureBlogSchema,
  getDb,
  json,
  mapPost,
  normalizeSlug,
  requireAdmin,
} from "../_blog-utils";

type Env = {
  BLOG_DB?: any;
  BLOG_ADMIN_PASSWORD?: string;
};

async function readPayload(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  const title = String(body.title || "").trim();
  const slug = normalizeSlug(String(body.slug || ""));
  const excerpt = String(body.excerpt || "").trim();
  const category = String(body.category || "お知らせ").trim();
  const image = String(body.image || "/gallery-studio-interior.png").trim();
  const content = String(body.content || "").trim();
  const status = body.status === "published" ? "published" : "draft";
  const publishedAt = String(body.publishedAt || new Date().toISOString().slice(0, 10)).trim();

  if (!title || !slug || !excerpt || !content) {
    throw new Error("タイトル、slug、抜粋、本文は必須です。");
  }

  return { title, slug, excerpt, category, image, content, status, publishedAt };
}

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  try {
    const db = getDb(env);
    await ensureBlogSchema(db);

    const url = new URL(request.url);
    const isAdmin = url.searchParams.get("admin") === "1";
    if (isAdmin && !requireAdmin(request, env)) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const sql = isAdmin
      ? "SELECT * FROM blog_posts ORDER BY published_at DESC, updated_at DESC"
      : "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC, updated_at DESC";

    const result = await db.prepare(sql).all();
    return json({ posts: (result.results || []).map(mapPost) });
  } catch (error) {
    console.error("blog list error", error);
    return json(
      { error: error instanceof Error ? error.message : "ブログ一覧の取得に失敗しました。" },
      { status: 500 },
    );
  }
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!requireAdmin(request, env)) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb(env);
    await ensureBlogSchema(db);
    const payload = await readPayload(request);
    const now = new Date().toISOString();

    await db
      .prepare(
        `INSERT INTO blog_posts (
          slug, title, excerpt, category, image, content, status,
          published_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        payload.slug,
        payload.title,
        payload.excerpt,
        payload.category,
        payload.image,
        payload.content,
        payload.status,
        payload.publishedAt,
        now,
        now,
      )
      .run();

    return json({ ok: true, slug: payload.slug }, { status: 201 });
  } catch (error) {
    console.error("blog create error", error);
    return json(
      { error: error instanceof Error ? error.message : "ブログ記事の作成に失敗しました。" },
      { status: 400 },
    );
  }
};

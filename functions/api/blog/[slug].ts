import {
  ensureBlogSchema,
  getDb,
  getPostBySlug,
  json,
  mapPost,
  normalizeSlug,
  requireAdmin,
} from "../../_blog-utils";

type Env = {
  BLOG_DB?: any;
  BLOG_ADMIN_PASSWORD?: string;
};

function getSlug(params: Record<string, string | string[]>) {
  const value = params.slug;
  return normalizeSlug(Array.isArray(value) ? value[0] || "" : value || "");
}

async function readPayload(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  return {
    title: String(body.title || "").trim(),
    excerpt: String(body.excerpt || "").trim(),
    category: String(body.category || "お知らせ").trim(),
    image: String(body.image || "/gallery-studio-interior.png").trim(),
    content: String(body.content || "").trim(),
    status: body.status === "published" ? "published" : "draft",
    publishedAt: String(body.publishedAt || new Date().toISOString().slice(0, 10)).trim(),
  };
}

export const onRequestGet = async ({
  request,
  env,
  params,
}: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
}) => {
  try {
    const db = getDb(env);
    await ensureBlogSchema(db);
    const url = new URL(request.url);
    const includeDrafts = url.searchParams.get("admin") === "1";
    if (includeDrafts && !requireAdmin(request, env)) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await getPostBySlug(db, getSlug(params), includeDrafts);
    if (!post) {
      return json({ error: "Not found" }, { status: 404 });
    }
    return json({ post: mapPost(post) });
  } catch (error) {
    console.error("blog detail error", error);
    return json(
      { error: error instanceof Error ? error.message : "ブログ記事の取得に失敗しました。" },
      { status: 500 },
    );
  }
};

export const onRequestPut = async ({
  request,
  env,
  params,
}: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
}) => {
  if (!requireAdmin(request, env)) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb(env);
    await ensureBlogSchema(db);
    const slug = getSlug(params);
    const payload = await readPayload(request);

    if (!slug || !payload.title || !payload.excerpt || !payload.content) {
      return json({ error: "タイトル、抜粋、本文は必須です。" }, { status: 400 });
    }

    const result = await db
      .prepare(
        `UPDATE blog_posts
        SET title = ?, excerpt = ?, category = ?, image = ?, content = ?,
            status = ?, published_at = ?, updated_at = ?
        WHERE slug = ?`,
      )
      .bind(
        payload.title,
        payload.excerpt,
        payload.category,
        payload.image,
        payload.content,
        payload.status,
        payload.publishedAt,
        new Date().toISOString(),
        slug,
      )
      .run();

    if (result.meta?.changes === 0) {
      return json({ error: "記事が見つかりません。" }, { status: 404 });
    }

    return json({ ok: true, slug });
  } catch (error) {
    console.error("blog update error", error);
    return json(
      { error: error instanceof Error ? error.message : "ブログ記事の更新に失敗しました。" },
      { status: 400 },
    );
  }
};

export const onRequestDelete = async ({
  env,
  params,
  request,
}: {
  env: Env;
  params: Record<string, string | string[]>;
  request: Request;
}) => {
  if (!requireAdmin(request, env)) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb(env);
    await ensureBlogSchema(db);
    await db.prepare("DELETE FROM blog_posts WHERE slug = ?").bind(getSlug(params)).run();
    return json({ ok: true });
  } catch (error) {
    console.error("blog delete error", error);
    return json(
      { error: error instanceof Error ? error.message : "ブログ記事の削除に失敗しました。" },
      { status: 400 },
    );
  }
};

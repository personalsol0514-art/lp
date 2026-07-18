import { json, requireAdmin } from "../_blog-utils";

type Env = {
  MEDIA_BUCKET?: any;
  BLOG_ADMIN_PASSWORD?: string;
};

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function sanitizeFileName(name: string) {
  const lastDot = name.lastIndexOf(".");
  const ext = lastDot >= 0 ? name.slice(lastDot + 1).toLowerCase() : "";
  const base = (lastDot >= 0 ? name.slice(0, lastDot) : name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 60);
  const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 8);
  return { base: base || "image", ext: safeExt };
}

export const onRequestGet = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  if (!requireAdmin(request, env)) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!env.MEDIA_BUCKET) {
    return json({ error: "MEDIA_BUCKET binding is not configured." }, { status: 500 });
  }

  try {
    const listed = await env.MEDIA_BUCKET.list({
      limit: 200,
      include: ["httpMetadata"],
    });
    const items = listed.objects
      .map((obj) => ({
        key: obj.key,
        url: `/media/${obj.key}`,
        size: obj.size,
        uploadedAt: obj.uploaded.toISOString(),
        contentType: obj.httpMetadata?.contentType || "",
      }))
      .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));

    return json({ items });
  } catch (error) {
    console.error("media list error", error);
    return json(
      { error: error instanceof Error ? error.message : "一覧の取得に失敗しました。" },
      { status: 500 },
    );
  }
};

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  if (!requireAdmin(request, env)) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!env.MEDIA_BUCKET) {
    return json({ error: "MEDIA_BUCKET binding is not configured." }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const isFileLike =
      file &&
      typeof file === "object" &&
      typeof (file as { arrayBuffer?: unknown }).arrayBuffer === "function" &&
      typeof (file as { size?: unknown }).size === "number";

    if (!isFileLike) {
      return json({ error: "画像ファイルを選択してください。" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return json(
        { error: "対応していない画像形式です（jpg / png / webp / gif / svg のみ）。" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return json({ error: "画像サイズは8MB以下にしてください。" }, { status: 400 });
    }

    const { base, ext } = sanitizeFileName(file.name || "image");
    const key = `${Date.now()}-${base}${ext ? `.${ext}` : ""}`;
    const buffer = await file.arrayBuffer();

    await env.MEDIA_BUCKET.put(key, buffer, {
      httpMetadata: { contentType: file.type },
    });

    return json(
      {
        key,
        url: `/media/${key}`,
        size: file.size,
        contentType: file.type,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("media upload error", error);
    return json(
      { error: error instanceof Error ? error.message : "アップロードに失敗しました。" },
      { status: 500 },
    );
  }
};

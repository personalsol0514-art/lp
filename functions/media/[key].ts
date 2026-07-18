type Env = {
  MEDIA_BUCKET?: any;
};

export const onRequestGet = async ({
  env,
  params,
}: {
  env: Env;
  params: Record<string, string | string[]>;
}) => {
  if (!env.MEDIA_BUCKET) {
    return new Response("Media storage is not configured.", { status: 500 });
  }

  const rawKey = params.key;
  const key = Array.isArray(rawKey) ? rawKey.join("/") : rawKey || "";

  if (!key) {
    return new Response("Not found", { status: 404 });
  }

  const object = await env.MEDIA_BUCKET.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
};

import {
  ensureBlogSchema,
  escapeHtml,
  getDb,
  getPostBySlug,
  mapPost,
  normalizeSlug,
} from "../_blog-utils";
import { blogPosts } from "../../lib/blog-posts";

type Env = {
  BLOG_DB?: any;
};

type RenderablePost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
  date: string;
};

function sectionsToContent(post: (typeof blogPosts)[number]) {
  return post.sections
    .map((section) => `## ${section.heading}\n\n${section.body.join("\n\n")}`)
    .join("\n\n");
}

function getStaticPost(slug: string): RenderablePost | null {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return null;
  }
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    image: post.image,
    content: sectionsToContent(post),
    date: post.date,
  };
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function paragraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2>${escapeHtml(block.replace(/^##\s+/, ""))}</h2>`;
      }
      const imageMatch = block.match(IMAGE_LINE);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        return `<img class="inline-image" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy">`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

export const onRequestGet = async ({
  env,
  params,
}: {
  env: Env;
  params: Record<string, string | string[]>;
}) => {
  try {
    const rawSlug = params.slug;
    const slug = normalizeSlug(Array.isArray(rawSlug) ? rawSlug[0] || "" : rawSlug || "");
    let post: RenderablePost | null = null;

    if (env.BLOG_DB) {
      const db = getDb(env);
      await ensureBlogSchema(db);
      const row = await getPostBySlug(db, slug);
      post = row ? mapPost(row) : null;
    } else {
      post = getStaticPost(slug);
    }

    if (!post) {
      return new Response("Not found", { status: 404 });
    }

    const url = `https://natural-fitness-gym.jp/blog/${post.slug}`;
    const image = post.image.startsWith("http")
      ? post.image
      : `https://natural-fitness-gym.jp${post.image}`;

    return new Response(
      `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(post.title)}｜NATURAL FITNESSブログ</title>
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <style>
    body{margin:0;background:#FFFDF8;color:#3A342F;font-family:"Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;}
    header{position:sticky;top:0;background:rgba(255,255,255,.94);border-bottom:1px solid #EADCCF;backdrop-filter:blur(12px);z-index:10}
    .bar{max-width:1040px;margin:auto;height:64px;padding:0 20px;display:flex;align-items:center;justify-content:space-between}
    .logo{font-weight:900;letter-spacing:.08em;color:#D36F31;text-decoration:none}.logo small{display:block;color:#8AA05F;font-size:10px;letter-spacing:.18em}
    .reserve{background:#E86F23;color:white;border-radius:999px;padding:12px 20px;text-decoration:none;font-weight:900}
    main{max-width:960px;margin:auto;padding:42px 20px 72px}.back{color:#7B9257;font-weight:900;text-decoration:none}
    .meta{margin-top:24px;color:#8AA05F;font-weight:900;font-size:13px}.cat{background:#EFF3E7;border-radius:999px;padding:5px 10px;margin-left:8px}
    h1{font-size:clamp(2rem,8vw,3.4rem);line-height:1.15;margin:18px 0 16px;font-weight:900}
    .lead{color:#6D6258;line-height:1.9;font-weight:600}.hero{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:28px;border:1px solid #EADCCF;margin:34px 0;box-shadow:0 18px 50px rgba(82,67,54,.1)}
    .content{background:white;border:1px solid #EADCCF;border-radius:28px;padding:clamp(24px,5vw,44px);box-shadow:0 14px 44px rgba(82,67,54,.07)}
    .content h2{font-size:1.65rem;line-height:1.35;margin:36px 0 16px}.content h2:first-child{margin-top:0}.content p{line-height:2;color:#6D6258;font-weight:600}
    .content img.inline-image{width:100%;height:auto;border-radius:20px;margin:28px 0;display:block;box-shadow:0 10px 30px rgba(82,67,54,.08)}
    .cta{display:flex;justify-content:center;margin-top:34px}.cta a{background:#E86F23;color:white;border-radius:999px;padding:16px 34px;text-decoration:none;font-weight:900}
  </style>
</head>
<body>
  <header><div class="bar"><a class="logo" href="/">NATURAL FITNESS<small>PRIVATE PERSONAL GYM</small></a><a class="reserve" href="/reserve">体験予約</a></div></header>
  <main>
    <a class="back" href="/blog">← ブログ一覧へ</a>
    <div class="meta">${escapeHtml(post.date)}<span class="cat">${escapeHtml(post.category)}</span></div>
    <h1>${escapeHtml(post.title)}</h1>
    <p class="lead">${escapeHtml(post.excerpt)}</p>
    <img class="hero" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}">
    <article class="content">${paragraphs(post.content)}</article>
    <div class="cta"><a href="/reserve">体験予約する</a></div>
  </main>
</body>
</html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  } catch (error) {
    console.error("blog page render error", error);
    return new Response("Blog database is not configured.", { status: 500 });
  }
};

import {
  ensureBlogSchema,
  escapeHtml,
  getDb,
  getPostBySlug,
  mapPost,
  normalizeSlug,
} from "../_blog-utils";
import { blogPosts } from "../../lib/blog-posts";
import {
  absoluteUrl,
  businessAddress,
  businessDescription,
  businessImage,
  businessLogo,
  businessName,
  siteName,
  siteUrl,
} from "../../lib/site";

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
  publishedAt: string;
  updatedAt?: string;
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
    publishedAt: post.publishedAt,
    updatedAt: post.publishedAt,
  };
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const HEADING_LINE = /^\s*(#{2,3})(?!#)[ \t\u3000]*(.+?)\s*$/;

function getContentBlocks(content: string) {
  const blocks: string[] = [];
  let currentLines: string[] = [];

  const flushCurrentBlock = () => {
    const block = currentLines.join("\n").trim();
    if (block) {
      blocks.push(block);
    }
    currentLines = [];
  };

  for (const line of content.replace(/\r\n?/g, "\n").split("\n")) {
    if (HEADING_LINE.test(line)) {
      flushCurrentBlock();
      blocks.push(line.trim());
      continue;
    }
    if (line.trim() === "") {
      flushCurrentBlock();
      continue;
    }
    currentLines.push(line);
  }

  flushCurrentBlock();
  return blocks;
}

function getTocItems(content: string) {
  return getContentBlocks(content)
    .map((block) => block.match(HEADING_LINE))
    .filter((match): match is RegExpMatchArray => Boolean(match && match[1] === "##"))
    .map((match, index) => ({
      id: `section-${index + 1}`,
      heading: match[2],
    }));
}

function renderToc(items: Array<{ id: string; heading: string }>) {
  if (items.length === 0) {
    return "";
  }

  return `<nav class="toc" aria-label="目次">
    <p>目次</p>
    <ol>${items
      .map(
        (item, index) =>
          `<li><a href="#${item.id}"><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(item.heading)}</a></li>`,
      )
      .join("")}</ol>
  </nav>`;
}

function renderJsonLd(post: RenderablePost) {
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const articleImage = absoluteUrl(post.image);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [articleImage],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        inLanguage: "ja",
        articleSection: post.category,
        author: {
          "@id": `${siteUrl}/#organization`,
        },
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        mainEntityOfPage: articleUrl,
      },
      {
        "@type": "ExerciseGym",
        "@id": `${siteUrl}/#localbusiness`,
        name: businessName,
        url: siteUrl,
        image: businessImage,
        description: businessDescription,
        address: {
          "@type": "PostalAddress",
          ...businessAddress,
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: businessName,
        url: siteUrl,
        logo: businessLogo,
        image: businessImage,
        description: businessDescription,
        address: {
          "@type": "PostalAddress",
          ...businessAddress,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "ブログ",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`;
}

function renderRelatedPosts(slug: string) {
  const relatedPosts = blogPosts.filter((item) => item.slug !== slug).slice(0, 2);

  if (relatedPosts.length === 0) {
    return "";
  }

  return `<section class="related">
    <div class="related-inner">
      <p class="section-label">Related Posts</p>
      <h2>関連記事</h2>
      <div class="related-grid">${relatedPosts
        .map(
          (item) => `<a class="related-card" href="/blog/${escapeHtml(item.slug)}">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.onerror=null;this.src='/gallery-studio-interior.png'">
            <span>${escapeHtml(item.date)} / ${escapeHtml(item.category)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.excerpt)}</p>
          </a>`,
        )
        .join("")}</div>
      <a class="blog-link" href="/blog">ブログ一覧を見る</a>
    </div>
  </section>`;
}

function paragraphs(content: string) {
  let headingIndex = 0;

  return getContentBlocks(content)
    .map((block) => {
      const headingMatch = block.match(HEADING_LINE);
      if (headingMatch?.[1] === "##") {
        headingIndex += 1;
        return `<h2 id="section-${headingIndex}">${escapeHtml(headingMatch[2])}</h2>`;
      }
      if (headingMatch?.[1] === "###") {
        return `<h3>${escapeHtml(headingMatch[2])}</h3>`;
      }
      const imageMatch = block.match(IMAGE_LINE);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        return `<img class="inline-image" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.remove()">`;
      }
      if (/^[-*]\s+/m.test(block)) {
        const items = block
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => /^[-*]\s+/.test(line))
          .map((line) => `<li>${escapeHtml(line.replace(/^[-*]\s+/, ""))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
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

    const url = absoluteUrl(`/blog/${post.slug}`);
    const image = absoluteUrl(post.image);

    return new Response(
      `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(post.title)}｜岡崎市のパーソナルジム ${siteName}ブログ</title>
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <meta property="og:site_name" content="${siteName}">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt)}">
  <meta name="twitter:image" content="${image}">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-MC1E4TKCFG"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-MC1E4TKCFG');</script>
  ${renderJsonLd(post)}
  <style>
    body{margin:0;background:white;color:#3d5547;font-family:"Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;}
    
    
    
    
    
    main{max-width:960px;margin:auto;padding:42px 20px 72px}.back{color:#779d82;font-weight:900;text-decoration:none}
    .article-head{max-width:760px;margin:auto}
    .meta{margin-top:24px;color:#779d82;font-weight:900;font-size:13px}.cat{background:#f0f3ed;border-radius:999px;padding:5px 10px;margin-left:8px}
    h1{font-size:clamp(2rem,8vw,3.4rem);line-height:1.15;margin:18px 0 16px;font-weight:900}
    .lead{color:#5f6862;line-height:1.9;font-weight:600}.hero{width:100%;max-width:860px;margin:34px auto;aspect-ratio:16/9;object-fit:cover;display:block}
    .toc{max-width:760px;margin:0 auto 40px;border-top:1px solid #e1e6de;border-bottom:1px solid #e1e6de;padding:24px 0}.toc p{margin:0;color:#3d5547;font-size:14px;font-weight:900}.toc ol{display:grid;gap:12px;margin:16px 0 0;padding:0;list-style:none}.toc a{display:grid;grid-template-columns:2.25rem 1fr;gap:8px;color:#4f5a53;text-decoration:none;font-weight:800;line-height:1.75}.toc a:hover{color:#5f826a}.toc span{color:#779d82;font-weight:900}
    .content{max-width:760px;margin:0 auto;padding:clamp(12px,4vw,24px) 0}
    .content h2{scroll-margin-top:96px;border-left:4px solid #5f826a;padding-left:16px;font-size:1.65rem;line-height:1.35;margin:48px 0 18px;font-weight:900}.content h2:first-child{margin-top:0}
    .content h3{font-size:1.22rem;line-height:1.55;margin:34px 0 12px;font-weight:900;color:#3d5547}
    .content p{font-size:1.02rem;line-height:2.05;color:#4f5a53;font-weight:600;margin:0 0 20px}
    .content ul{margin:0 0 24px;padding-left:1.3em;color:#4f5a53;font-weight:600;line-height:1.95}.content li+li{margin-top:8px}
    .content img.inline-image{width:100%;height:auto;border-radius:20px;margin:32px 0;display:block;box-shadow:0 10px 30px rgba(61,85,71,.08)}
    .author{max-width:760px;margin:56px auto 0;border-top:1px solid #e1e6de;padding-top:32px}.author small{color:#5f826a;font-size:12px;font-weight:900;letter-spacing:.2em;text-transform:uppercase}.author h2{font-size:1.25rem;margin:12px 0 10px}.author p,.author dd{color:#4f5a53;font-weight:600;line-height:1.9}.author dl{display:grid;gap:8px;margin:18px 0 0}.author div{display:grid;gap:4px}.author dt{color:#779d82;font-weight:900}
    .cta{display:flex;justify-content:center;margin-top:34px}.cta a{background:#5f826a;color:white;border-radius:999px;padding:16px 34px;text-decoration:none;font-weight:900}
    .related{background:#f6f8f3;padding:56px 20px 64px}.related-inner{max-width:1040px;margin:auto}.section-label{color:#5f826a;font-size:12px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;margin:0}.related h2{font-size:1.65rem;margin:12px 0 26px}.related-grid{display:grid;gap:18px}.related-card{background:white;border:1px solid #e1e6de;border-radius:20px;overflow:hidden;color:#3d5547;text-decoration:none;display:block;box-shadow:0 10px 30px rgba(61,85,71,.07)}.related-card img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}.related-card span{display:block;color:#779d82;font-size:12px;font-weight:900;margin:18px 18px 0}.related-card h3{font-size:1.1rem;line-height:1.45;margin:10px 18px 8px}.related-card p{color:#5f6862;font-size:14px;font-weight:600;line-height:1.8;margin:0 18px 20px}.blog-link{display:inline-flex;margin-top:24px;color:#5f826a;font-weight:900;text-decoration:none}
    footer{background:#3d5547;color:white;padding:42px 20px}.footer-inner{max-width:1040px;margin:auto;display:grid;gap:28px}.footer-logo{font-size:1.1rem;font-weight:900;letter-spacing:.08em;color:white;text-decoration:none}.footer-logo small{display:block;color:#c9d8cc;font-size:10px;letter-spacing:.18em;margin-top:4px}.footer-text{color:rgba(255,255,255,.78);font-size:14px;line-height:1.9;font-weight:600;max-width:38rem}.footer-nav{display:flex;flex-wrap:wrap;gap:14px 22px}.footer-nav a{color:white;text-decoration:none;font-size:13px;font-weight:900}.footer-nav a:hover{color:#c9d8cc}.copyright{color:rgba(255,255,255,.58);font-size:12px;margin:0}
    @media (min-width: 640px){.author div{grid-template-columns:5rem 1fr}.related-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    
  .nfh{position:sticky;top:0}.nfh{z-index:60;position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;gap:24px;height:56px;padding:0 18px;background:#fff;border-bottom:1px solid #e1e6de;font-family:"Noto Sans JP",sans-serif}.nfh-brand{display:inline-flex;flex-direction:column;line-height:1;color:#3d5547;text-decoration:none;white-space:nowrap}.nfh-sub{display:block;font-weight:500;color:#5f826a;font-size:10px;line-height:1.2;margin-bottom:3px;white-space:nowrap}.nfh-logo{font-family:Georgia,serif;font-size:17px;letter-spacing:.06em;line-height:1.15}.nfh-nav{display:none}.nfh-toggle{display:flex;flex-direction:column;align-items:center;gap:5px;border:0;background:transparent;color:#779d82;padding:5px;cursor:pointer}.nfh-toggle i{display:block;width:27px;height:1.5px;background:currentColor}.nfh-toggle small{font-size:7px;letter-spacing:3px;margin-top:2px}.nfh-panel{display:none}.nfh-panel.open{display:grid;position:absolute;top:56px;left:0;right:0;background:#fffffffa;padding:22px 25px 26px;gap:18px;box-shadow:0 20px 30px #405c4220}.nfh-panel a{font-size:14px;font-weight:500;color:#3d5547}.nfh-panel a.nfh-panel-cta{margin-top:6px;display:flex;justify-content:center;border-radius:999px;border:1px solid #5f826a;background:#8db399;color:#fff;font-weight:700;padding:14px}@media(min-width:1000px){ .nfh{height:72px;padding:0 4%} .nfh-logo{font-size:22px;letter-spacing:.08em} .nfh-nav{display:flex;align-items:center;gap:24px} .nfh-nav a{font-size:13px;font-weight:700;color:#3d5547;white-space:nowrap} .nfh-nav a:hover{color:#5f826a} .nfh-toggle,.nfh-panel,.nfh-panel.open{display:none}}/* Bilingual menu (EN -> JA on hover) */.nfx{display:inline-grid;text-align:center;text-decoration:none}.nfx>span{grid-area:1/1;transition:opacity .25s ease,transform .25s ease;white-space:nowrap}.nfx .en{font-family:Georgia,serif;letter-spacing:.16em;font-weight:400}.nfx .ja{opacity:0;transform:translateY(5px);font-weight:700;letter-spacing:.04em}.nfx:hover .en,.nfx:focus-visible .en{opacity:0;transform:translateY(-5px)}.nfx:hover .ja,.nfx:focus-visible .ja{opacity:1;transform:none}.nfx-panel{display:none}.nfx-panel.open{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:26px;position:fixed!important;inset:0!important;z-index:200;background:#5f826a!important;padding:80px 24px 40px!important;box-shadow:none!important}.nfx-panel .nfx{display:flex;flex-direction:column;align-items:center;gap:4px;color:#fff!important}.nfx-panel .nfx>span{grid-area:auto;opacity:1!important;transform:none!important}.nfx-panel .nfx .en{font-size:28px;letter-spacing:.14em}.nfx-panel .nfx .ja{font-size:11px;font-weight:500;opacity:.85!important}.nfx-panel .nfx-cta{margin-top:10px;display:flex;align-items:center;gap:10px;border-radius:999px;background:#fff;color:#3d5547!important;font-weight:700;font-size:15px;padding:15px 30px;text-decoration:none}.nfx-panel .nfx-cta small{background:#8db399;color:#fff;border-radius:99px;padding:4px 8px;font-size:11px}.nfx-close{display:none}.nfx-panel.open~.nfx-close,.nfx-close.show{display:flex;position:fixed;top:14px;right:16px;z-index:91;width:44px;height:44px;border:1px solid #ffffff80;border-radius:50%;background:transparent;color:#fff;font-size:22px;align-items:center;justify-content:center;cursor:pointer}.menu-toggle[aria-expanded=true],.nfh-toggle[aria-expanded=true]{position:fixed;top:12px;right:16px;z-index:201;color:#fff}.menu-toggle i,.nfh-toggle i{transition:transform .25s,opacity .25s}.menu-toggle[aria-expanded=true] i:nth-child(1),.nfh-toggle[aria-expanded=true] i:nth-child(1){transform:translateY(6.5px) rotate(45deg)}.menu-toggle[aria-expanded=true] i:nth-child(2),.nfh-toggle[aria-expanded=true] i:nth-child(2){opacity:0}.menu-toggle[aria-expanded=true] i:nth-child(3),.nfh-toggle[aria-expanded=true] i:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}.menu-toggle[aria-expanded=true] small,.nfh-toggle[aria-expanded=true] small{visibility:hidden}.nfh-nav{gap:30px!important}.nfh-nav .nfx{color:#3d5547;font-size:13px}.nfh-nav .nfx .en{font-size:13px}.nfh-nav .nfx .ja{font-size:12px}</style>
</head>
<body>
  <header class="nfh"><a class="nfh-brand" href="/" aria-label="NATURAL FITNESS トップへ"><span class="nfh-sub">岡崎市の完全個室パーソナルジム</span><span class="nfh-logo">NATURAL FITNESS</span></a><nav class="nfh-nav" aria-label="メインメニュー"><a class="nfx" href="/"><span class="en">TOP</span><span class="ja">トップ</span></a><a class="nfx" href="/#concept"><span class="en">ABOUT</span><span class="ja">私たちについて</span></a><a class="nfx" href="/price"><span class="en">PRICE</span><span class="ja">料金</span></a><a class="nfx" href="/blog"><span class="en">BLOG</span><span class="ja">ブログ</span></a><a class="nfx" href="/trainer"><span class="en">TRAINER</span><span class="ja">トレーナー</span></a><a class="nfx" href="/reserve"><span class="en">RESERVE</span><span class="ja">初回体験予約</span></a></nav><button type="button" class="nfh-toggle" aria-label="メニューを開く" aria-expanded="false" aria-controls="nfh-panel" onclick="var p=document.getElementById('nfh-panel');var o=p.classList.toggle('open');this.setAttribute('aria-expanded',o)"><i></i><i></i><i></i><small>MENU</small></button><nav id="nfh-panel" class="nfh-panel nfx-panel" aria-label="スマホメニュー"><a class="nfx" href="/"><span class="en">TOP</span><span class="ja">トップ</span></a><a class="nfx" href="/#concept"><span class="en">ABOUT</span><span class="ja">私たちについて</span></a><a class="nfx" href="/price"><span class="en">PRICE</span><span class="ja">料金</span></a><a class="nfx" href="/blog"><span class="en">BLOG</span><span class="ja">ブログ</span></a><a class="nfx" href="/trainer"><span class="en">TRAINER</span><span class="ja">トレーナー</span></a><a class="nfx" href="/reserve"><span class="en">RESERVE</span><span class="ja">初回体験予約</span></a><a class="nfx-cta" href="/reserve"><small>体験0円</small>初回体験を予約する →</a></nav></header><script>(function(){function f(){var s=document.querySelector(".nfh-sub"),t=document.querySelector(".nfh-logo");if(!s||!t)return;s.style.fontSize="10px";var r=document.createRange();r.selectNodeContents(t);var w=r.getBoundingClientRect().width;r.selectNodeContents(s);var sw=r.getBoundingClientRect().width;if(w&&sw)s.style.fontSize=(10*w/sw)+"px";}f();addEventListener("resize",f);document.fonts&&document.fonts.ready.then(f);})();</script>
  <main>
    <div class="article-head">
      <a class="back" href="/blog">← ブログ一覧へ</a>
      <div class="meta">${escapeHtml(post.date)}<span class="cat">${escapeHtml(post.category)}</span></div>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="lead">${escapeHtml(post.excerpt)}</p>
    </div>
    <img class="hero" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" onerror="this.onerror=null;this.src='/gallery-studio-interior.png'">
    ${renderToc(getTocItems(post.content))}
    <article class="content">${paragraphs(post.content)}</article>
    <section class="author">
      <small>Author</small>
      <h2>${escapeHtml(businessName)}</h2>
      <p>${escapeHtml(businessDescription)}</p>
      <dl>
        <div><dt>所在地</dt><dd>〒${escapeHtml(businessAddress.postalCode)} ${escapeHtml(businessAddress.addressRegion)}${escapeHtml(businessAddress.addressLocality)}${escapeHtml(businessAddress.streetAddress)}</dd></div>
        <div><dt>特徴</dt><dd>完全個室・マンツーマン指導・ダイエット/姿勢改善サポート</dd></div>
      </dl>
    </section>
    <div class="cta"><a href="/reserve" data-event-label="dynamic_blog_body_reserve">体験予約する</a></div>
  </main>
  ${renderRelatedPosts(post.slug)}
  <footer>
    <div class="footer-inner">
      <div>
        <a class="footer-logo" href="/">NATURAL FITNESS<small>PRIVATE PERSONAL GYM</small></a>
        <p class="footer-text">${escapeHtml(businessDescription)}</p>
      </div>
      <nav class="footer-nav" aria-label="フッターナビゲーション"><a href="/">トップ</a><a href="/blog">ブログ</a><a href="/price">料金</a><a href="/reserve" data-event-label="dynamic_blog_footer_reserve">体験予約</a><a href="/#access">アクセス</a></nav>
      <p class="copyright">© NATURAL FITNESS</p>
    </div>
  </footer>
  <script>
    document.addEventListener('click',function(event){
      var anchor=event.target.closest&&event.target.closest('a[href="/reserve"]');
      if(!anchor)return;
      var label=anchor.dataset.eventLabel||'dynamic_blog_reserve';
      var modified=event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.target==='_blank';
      var navigated=false;
      var next=function(){if(modified||navigated)return;navigated=true;window.location.assign(anchor.href)};
      if(!modified)event.preventDefault();
      gtag('event','reserve_click',{send_to:'G-MC1E4TKCFG',event_category:'reservation',event_label:label,cta_id:label,link_url:anchor.href,page_path:window.location.pathname,transport_type:'beacon',event_callback:next,event_timeout:500});
      if(!modified)setTimeout(next,500);
    });
  </script>
</body>
</html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  } catch (error) {
    console.error("blog page render error", error);
    return new Response("Blog database is not configured.", { status: 500 });
  }
};

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../../../lib/blog-posts";
import {
  absoluteUrl,
  businessAddress,
  businessDescription,
  businessImage,
  businessLogo,
  businessName,
  siteName,
  siteUrl,
} from "../../../lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = absoluteUrl(post.image);

  return {
    title: `${post.title}｜岡崎市のパーソナルジム ${siteName}ブログ`,
    description: post.excerpt,
    keywords: [
      post.category,
      "岡崎市 パーソナルジム",
      "岡崎 パーソナルトレーニング",
      "岡崎 ダイエット",
      "岡崎 姿勢改善",
      "完全個室 パーソナルジム",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      siteName,
      locale: "ja_JP",
      publishedTime: post.publishedAt,
      images: [
        {
          url: image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const articleImage = absoluteUrl(post.image);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [articleImage],
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
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

  const breadcrumbItems = [
    { href: "/", label: "ホーム" },
    { href: "/blog", label: "ブログ" },
    { href: `/blog/${post.slug}`, label: post.title },
  ];

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
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
  };

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);
  const tableOfContents = post.sections.map((section, index) => ({
    id: `section-${index + 1}`,
    heading: section.heading,
  }));

  return (
    <main className="bg-white text-[#3A342F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <header className="sticky top-0 z-50 border-b border-[#EADCCF] bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5 px-5">
          <a href="/" className="leading-none">
            <span className="block text-[0.98rem] font-black tracking-[0.08em] text-[#D36F31]">
              NATURAL FITNESS
            </span>
            <span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
              Private Personal Gym
            </span>
          </a>
          <nav
            aria-label="主要ナビゲーション"
            className="hidden items-center gap-6 text-sm font-black text-[#3A342F] lg:flex"
          >
            <a href="/" className="transition hover:text-[#E86F23]">
              トップ
            </a>
            <a href="/blog" className="text-[#E86F23]">
              ブログ
            </a>
            <a href="/price" className="transition hover:text-[#E86F23]">
              料金
            </a>
            <a href="/#access" className="transition hover:text-[#E86F23]">
              アクセス
            </a>
            <a href="/#faq" className="transition hover:text-[#E86F23]">
              FAQ
            </a>
          </nav>
          <a
            href="/reserve"
            data-event-label="blog_article_header_reserve"
            className="rounded-full bg-[#E86F23] px-5 py-2.5 text-sm font-black text-white"
          >
            体験予約
          </a>
        </div>
      </header>

      <article>
        <section className="px-5 py-10 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <a
              href="/blog"
              className="inline-flex text-sm font-black text-[#7B9257] transition hover:text-[#E86F23]"
            >
              ← ブログ一覧へ
            </a>
            <nav aria-label="パンくず" className="mt-5 text-xs font-bold text-[#8B8178]">
              <ol className="flex flex-wrap gap-x-2 gap-y-1">
                {breadcrumbItems.map((item, index) => (
                  <li key={item.href} className="flex items-center gap-2">
                    {index > 0 ? <span aria-hidden>/</span> : null}
                    {index === breadcrumbItems.length - 1 ? (
                      <span>{item.label}</span>
                    ) : (
                      <a href={item.href} className="transition hover:text-[#E86F23]">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-black text-[#8AA05F]">
              <time dateTime={post.publishedAt}>{post.date}</time>
              <span className="rounded-full bg-[#EFF3E7] px-3 py-1">
                {post.category}
              </span>
            </div>
            <h1 className="mt-5 text-[2rem] font-black leading-tight sm:text-[3rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-base font-medium leading-[1.9] text-[#6D6258]">
              {post.excerpt}
            </p>
          </div>
        </section>

        <div className="px-5 sm:px-8">
          <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden bg-[#F6EFE7]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </div>
        </div>

        <section className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <nav
              aria-label="目次"
              className="mb-10 border-y border-[#EADCCF] py-6"
            >
              <p className="text-sm font-black text-[#3A342F]">目次</p>
              <ol className="mt-4 grid gap-3">
                {tableOfContents.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group grid grid-cols-[2.25rem_1fr] items-start gap-2 text-sm font-bold leading-relaxed text-[#5F554D] transition hover:text-[#E86F23] sm:text-base"
                    >
                      <span className="font-black text-[#8AA05F] transition group-hover:text-[#E86F23]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-12 py-4 sm:py-6">
              {post.sections.map((section, index) => (
                <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-24">
                  <h2 className="border-l-4 border-[#E86F23] pl-4 text-[1.45rem] font-black leading-tight text-[#3A342F] sm:text-[1.8rem]">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[0.98rem] font-medium leading-[2.05] text-[#5F554D] sm:text-[1.05rem]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-14 border-t border-[#EADCCF] pt-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">
                Author
              </p>
              <h2 className="mt-3 text-xl font-black text-[#3A342F]">
                {businessName}
              </h2>
              <p className="mt-3 text-sm font-medium leading-[1.9] text-[#5F554D] sm:text-base">
                {businessDescription}
              </p>
              <dl className="mt-5 grid gap-2 text-sm font-bold text-[#6D6258]">
                <div className="grid gap-1 sm:grid-cols-[5rem_1fr]">
                  <dt className="text-[#8AA05F]">所在地</dt>
                  <dd>
                    〒{businessAddress.postalCode} {businessAddress.addressRegion}
                    {businessAddress.addressLocality}
                    {businessAddress.streetAddress}
                  </dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[5rem_1fr]">
                  <dt className="text-[#8AA05F]">特徴</dt>
                  <dd>完全個室・マンツーマン指導・ダイエット/姿勢改善サポート</dd>
                </div>
              </dl>
            </section>

            <aside className="mt-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">
                Related
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {post.relatedLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-[#EADCCF] bg-white px-4 py-2 text-sm font-black text-[#3A342F] transition hover:border-[#E86F23] hover:text-[#E86F23]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="/reserve"
                data-event-label="blog_article_body_reserve"
                className="mt-7 inline-flex min-h-13 items-center justify-center rounded-full bg-[#E86F23] px-7 text-sm font-black text-white shadow-[0_12px_26px_rgba(232,111,35,0.22)]"
              >
                体験予約する
              </a>
            </aside>
          </div>
        </section>
      </article>

      <section className="bg-[#FFF7EF] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">
            Related Posts
          </p>
          <h2 className="text-[1.6rem] font-black text-[#3A342F]">
            関連記事
          </h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {relatedPosts.map((item) => (
              <a
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#EADCCF] bg-white shadow-[0_12px_34px_rgba(82,67,54,0.07)] transition hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] bg-[#F6EFE7]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-black text-[#8AA05F]">
                    {item.date} / {item.category}
                  </p>
                  <h3 className="mt-3 text-lg font-black leading-snug">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
          <a
            href="/blog"
            className="mt-7 inline-flex text-sm font-black text-[#E86F23] transition hover:text-[#C85F1F]"
          >
            ブログ一覧を見る
          </a>
        </div>
      </section>

      <footer className="bg-[#3A342F] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-7">
          <div>
            <a href="/" className="leading-none">
              <span className="block text-[1.05rem] font-black tracking-[0.08em]">
                NATURAL FITNESS
              </span>
              <span className="mt-1 block text-[0.5rem] font-black uppercase tracking-[0.22em] text-[#B8C7A4]">
                Private Personal Gym
              </span>
            </a>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-[1.9] text-white/75">
              {businessDescription}
            </p>
          </div>
          <nav
            aria-label="フッターナビゲーション"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-black"
          >
            <a href="/" className="transition hover:text-[#F2B48A]">
              トップ
            </a>
            <a href="/blog" className="transition hover:text-[#F2B48A]">
              ブログ
            </a>
            <a href="/price" className="transition hover:text-[#F2B48A]">
              料金
            </a>
            <a
              href="/reserve"
              data-event-label="blog_article_footer_reserve"
              className="transition hover:text-[#F2B48A]"
            >
              体験予約
            </a>
            <a href="/#access" className="transition hover:text-[#F2B48A]">
              アクセス
            </a>
          </nav>
          <p className="text-xs font-medium text-white/55">© NATURAL FITNESS</p>
        </div>
      </footer>
    </main>
  );
}

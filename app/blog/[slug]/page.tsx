import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../../../lib/blog-posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const baseUrl = "https://natural-fitness-gym.jp";

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

  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title}｜NATURAL FITNESSブログ`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      siteName: "NATURAL FITNESS",
      locale: "ja_JP",
      publishedTime: post.publishedAt,
      images: [
        {
          url: `${baseUrl}${post.image}`,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "NATURAL FITNESS",
    },
    publisher: {
      "@type": "Organization",
      name: "NATURAL FITNESS",
    },
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
  };

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="bg-[#FFFDF8] text-[#3A342F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="sticky top-0 z-50 border-b border-[#EADCCF] bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="leading-none">
            <span className="block text-[0.98rem] font-black tracking-[0.08em] text-[#D36F31]">
              NATURAL FITNESS
            </span>
            <span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
              Private Personal Gym
            </span>
          </a>
          <a
            href="/reserve"
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
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] border border-[#EADCCF] bg-[#F6EFE7] shadow-[0_18px_50px_rgba(82,67,54,0.1)]">
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
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
            <div className="rounded-[1.6rem] border border-[#EADCCF] bg-white px-6 py-8 shadow-[0_14px_44px_rgba(82,67,54,0.07)] sm:px-10">
              {post.sections.map((section) => (
                <section key={section.heading} className="mb-10 last:mb-0">
                  <h2 className="text-[1.45rem] font-black leading-tight text-[#3A342F] sm:text-[1.8rem]">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm font-medium leading-[2] text-[#6D6258] sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="grid gap-4 lg:sticky lg:top-24">
              <div className="rounded-[1.4rem] border border-[#EADCCF] bg-[#FFF7EF] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">
                  Related
                </p>
                <div className="mt-4 grid gap-3">
                  {post.relatedLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#3A342F] transition hover:text-[#E86F23]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href="/reserve"
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#E86F23] px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(232,111,35,0.22)]"
              >
                体験予約する
              </a>
            </aside>
          </div>
        </section>
      </article>

      <section className="bg-[#FFF7EF] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
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
        </div>
      </section>
    </main>
  );
}

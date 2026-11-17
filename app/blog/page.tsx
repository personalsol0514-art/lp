import type { Metadata } from "next";
import BlogIndexClient from "../../components/BlogIndexClient";
import { blogPosts } from "../../lib/blog-posts";
import { absoluteUrl, siteName } from "../../lib/site";
import { Header } from "../../components/Header";

const title = "ブログ｜岡崎市のパーソナルジム NATURAL FITNESS";
const description =
  "岡崎市本町通の完全個室パーソナルジムNATURAL FITNESSのブログ。ダイエット、姿勢改善、脚やせ、運動初心者向けの情報を発信します。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://natural-fitness-gym.jp/blog",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://natural-fitness-gym.jp/blog",
    siteName,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BlogPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NATURAL FITNESS ブログ記事一覧",
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  };

  return (
    <main className="bg-[#ffffff] text-[#3d5547]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header position="sticky" />

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5f826a]">
            Blog
          </p>
          <h1 className="mt-3 text-[2rem] font-black leading-tight sm:text-[3.4rem]">
            NATURAL FITNESS ブログ
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#5f6862] sm:text-base">
            ダイエット・姿勢改善・脚やせ・運動初心者向けに、無理なく身体を変えるためのヒントをお届けします。
          </p>

          <BlogIndexClient initialPosts={blogPosts} />
        </div>
      </section>
    </main>
  );
}

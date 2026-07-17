import type { Metadata } from "next";
import BlogIndexClient from "../../components/BlogIndexClient";
import { blogPosts } from "../../lib/blog-posts";

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
    siteName: "NATURAL FITNESS",
    locale: "ja_JP",
  },
};

export default function BlogPage() {
  return (
    <main className="bg-[#FFFDF8] text-[#3A342F]">
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

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">
            Blog
          </p>
          <h1 className="mt-3 text-[2rem] font-black leading-tight sm:text-[3.4rem]">
            NATURAL FITNESS ブログ
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#6D6258] sm:text-base">
            ダイエット・姿勢改善・脚やせ・運動初心者向けに、無理なく身体を変えるためのヒントをお届けします。
          </p>

          <BlogIndexClient initialPosts={blogPosts} />
        </div>
      </section>
    </main>
  );
}

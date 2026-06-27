"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { BlogPost } from "../lib/blog-posts";

type PreviewPost = Pick<
  BlogPost,
  "slug" | "date" | "category" | "title" | "excerpt" | "image"
>;

export default function BlogNewsPreviewClient({
  initialPosts,
}: {
  initialPosts: PreviewPost[];
}) {
  const [posts, setPosts] = useState<PreviewPost[]>(initialPosts);

  useEffect(() => {
    let ignore = false;

    fetch("/api/blog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("ブログAPIの取得に失敗しました。");
        }
        return response.json() as Promise<{ posts?: PreviewPost[] }>;
      })
      .then((data) => {
        if (!ignore && data.posts?.length) {
          setPosts(data.posts.slice(0, 3));
        }
      })
      .catch((error) => {
        console.warn(error);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="mt-7 grid gap-4 lg:grid-cols-3">
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group grid grid-cols-[6.5rem_1fr] gap-4 rounded-2xl border border-[#EADCCF] bg-[#FFFDF8] p-3 shadow-[0_10px_30px_rgba(82,67,54,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(82,67,54,0.1)] sm:grid-cols-[8rem_1fr] lg:block"
        >
          <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F5EFE7] lg:aspect-[16/10]">
            <Image
              src={post.image || "/gallery-studio-interior.png"}
              alt={post.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 8rem, 33vw"
            />
          </div>
          <div className="min-w-0 lg:p-2">
            <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-black text-[#8AA05F]">
              <span>{post.date}</span>
              <span className="rounded-full bg-[#EFF3E7] px-2.5 py-1">
                {post.category}
              </span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-sm font-black leading-snug text-[#3A342F] sm:text-base">
              {post.title}
            </h3>
            <p className="mt-2 hidden text-sm font-medium leading-relaxed text-[#6D6258] lg:line-clamp-2 lg:block">
              {post.excerpt}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

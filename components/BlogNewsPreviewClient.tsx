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
          className="group grid grid-cols-[6.5rem_1fr] gap-4 rounded-2xl border border-[#e1e6de] bg-[#ffffff] p-3 shadow-[0_10px_30px_rgba(61,85,71,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(61,85,71,0.1)] sm:grid-cols-[8rem_1fr] lg:block"
        >
          <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f0f3ed] lg:aspect-[16/10]">
            <Image
              src={post.image || "/gallery-studio-interior.png"}
              alt={post.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 8rem, 33vw"
            />
          </div>
          <div className="min-w-0 lg:p-2">
            <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-black text-[#779d82]">
              <span>{post.date}</span>
              <span className="rounded-full bg-[#f0f3ed] px-2.5 py-1">
                {post.category}
              </span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-sm font-black leading-snug text-[#3d5547] sm:text-base">
              {post.title}
            </h3>
            <p className="mt-2 hidden text-sm font-medium leading-relaxed text-[#5f6862] lg:line-clamp-2 lg:block">
              {post.excerpt}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

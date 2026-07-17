"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { BlogPost } from "../lib/blog-posts";

type ApiPost = Pick<
  BlogPost,
  "slug" | "date" | "publishedAt" | "category" | "title" | "excerpt" | "image"
> & {
  content?: string;
  status?: "draft" | "published";
};

type BlogIndexClientProps = {
  initialPosts: ApiPost[];
};

export default function BlogIndexClient({ initialPosts }: BlogIndexClientProps) {
  const [posts, setPosts] = useState<ApiPost[]>(initialPosts);

  useEffect(() => {
    let ignore = false;

    fetch("/api/blog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("ブログAPIの取得に失敗しました。");
        }
        return response.json() as Promise<{ posts?: ApiPost[] }>;
      })
      .then((data) => {
        if (!ignore && data.posts?.length) {
          setPosts(data.posts);
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
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group overflow-hidden rounded-2xl border border-[#EADCCF] bg-white shadow-[0_14px_44px_rgba(82,67,54,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_54px_rgba(82,67,54,0.12)]"
        >
          <div className="relative aspect-[4/3] bg-[#F5EFE7]">
            <Image
              src={post.image || "/gallery-studio-interior.png"}
              alt={post.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs font-black text-[#8AA05F]">
              <span>{post.date}</span>
              <span className="rounded-full bg-[#EFF3E7] px-3 py-1">
                {post.category}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-black leading-snug">{post.title}</h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[#6D6258]">
              {post.excerpt}
            </p>
            <span className="mt-5 inline-flex text-sm font-black text-[#E86F23]">
              続きを読む 〉
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

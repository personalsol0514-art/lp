"use client";

import { useEffect, useMemo, useState } from "react";

type AdminPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
  status: "draft" | "published";
  publishedAt: string;
  date?: string;
};

const emptyPost: AdminPost = {
  slug: "",
  title: "",
  excerpt: "",
  category: "お知らせ",
  image: "/gallery-studio-interior.png",
  content: "",
  status: "draft",
  publishedAt: new Date().toISOString().slice(0, 10),
};

function makeSlug(value: string) {
  const ascii = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return ascii || `post-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
}

export default function AdminBlogPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<AdminPost>(emptyPost);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${password}`,
      "Content-Type": "application/json",
    }),
    [password],
  );

  async function loadPosts() {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/blog?admin=1", {
        headers: { Authorization: `Bearer ${password}` },
      });
      const data = (await response.json()) as { posts?: AdminPost[]; error?: string };
      if (!response.ok) {
        throw new Error(data.error || "ブログ一覧の取得に失敗しました。");
      }
      setPosts(data.posts || []);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "ログインできませんでした。");
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const saved = window.localStorage.getItem("natural_blog_admin_password");
    if (saved) {
      setPassword(saved);
    }
  }, []);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem("natural_blog_admin_password", password);
    void loadPosts();
  }

  function startNew() {
    setEditingSlug(null);
    setForm({ ...emptyPost, publishedAt: new Date().toISOString().slice(0, 10) });
    setMessage("");
  }

  function startEdit(post: AdminPost) {
    setEditingSlug(post.slug);
    setForm({
      ...post,
      publishedAt: post.publishedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    });
    setMessage("");
  }

  async function savePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    const slug = editingSlug || makeSlug(form.slug || form.title);
    const payload = { ...form, slug };
    const path = editingSlug ? `/api/blog/${editingSlug}` : "/api/blog";
    const method = editingSlug ? "PUT" : "POST";

    try {
      const response = await fetch(path, {
        method,
        headers: authHeaders,
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; slug?: string };
      if (!response.ok) {
        throw new Error(data.error || "保存に失敗しました。");
      }
      setMessage(editingSlug ? "記事を更新しました。" : "記事を作成しました。");
      setEditingSlug(data.slug || slug);
      setForm((current) => ({ ...current, slug: data.slug || slug }));
      await loadPosts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  }

  async function deletePost(slug: string) {
    if (!window.confirm("この記事を削除しますか？")) {
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "削除に失敗しました。");
      }
      setMessage("記事を削除しました。");
      startNew();
      await loadPosts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "削除に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFDF8] px-5 py-8 text-[#3A342F]">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EADCCF] pb-6">
          <a href="/" className="leading-none">
            <span className="block text-[1.05rem] font-black tracking-[0.08em] text-[#D36F31]">
              NATURAL FITNESS
            </span>
            <span className="mt-1 block text-[0.5rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
              Blog Admin
            </span>
          </a>
          <a
            href="/blog"
            className="rounded-full border border-[#B8C7A4] px-5 py-2 text-sm font-black text-[#7B9257]"
          >
            ブログを見る
          </a>
        </header>

        <section className="py-8">
          <h1 className="text-3xl font-black sm:text-5xl">ブログ管理</h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-[#6D6258]">
            投稿・編集・削除・公開/下書き切り替えができます。本文内で見出しにしたい行は
            「## 見出し」の形で入力してください。
          </p>
        </section>

        {!isLoggedIn ? (
          <form
            onSubmit={handleLogin}
            className="max-w-xl rounded-[1.6rem] border border-[#EADCCF] bg-white p-6 shadow-[0_14px_44px_rgba(82,67,54,0.08)]"
          >
            <label className="block text-sm font-black text-[#6D6258]">
              管理パスワード
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 text-base outline-none focus:border-[#E86F23]"
                required
              />
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 rounded-full bg-[#E86F23] px-7 py-3 text-sm font-black text-white disabled:opacity-50"
            >
              ログイン
            </button>
            {message ? (
              <p className="mt-4 text-sm font-bold text-[#D36F31]">{message}</p>
            ) : null}
          </form>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
            <aside className="rounded-[1.6rem] border border-[#EADCCF] bg-white p-4 shadow-[0_14px_44px_rgba(82,67,54,0.08)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-black">記事一覧</h2>
                <button
                  type="button"
                  onClick={startNew}
                  className="rounded-full bg-[#EFF3E7] px-3 py-1.5 text-xs font-black text-[#7B9257]"
                >
                  新規
                </button>
              </div>
              <div className="mt-4 grid gap-2">
                {posts.map((post) => (
                  <button
                    key={post.slug}
                    type="button"
                    onClick={() => startEdit(post)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      editingSlug === post.slug
                        ? "border-[#E86F23] bg-[#FFF7EF]"
                        : "border-[#EADCCF] bg-white"
                    }`}
                  >
                    <span className="block text-xs font-black text-[#8AA05F]">
                      {post.status === "published" ? "公開中" : "下書き"} / {post.date}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm font-black">
                      {post.title}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <form
              onSubmit={savePost}
              className="rounded-[1.6rem] border border-[#EADCCF] bg-white p-5 shadow-[0_14px_44px_rgba(82,67,54,0.08)] sm:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-black text-[#6D6258] sm:col-span-2">
                  タイトル
                  <input
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 outline-none focus:border-[#E86F23]"
                    required
                  />
                </label>
                <label className="block text-sm font-black text-[#6D6258]">
                  slug
                  <input
                    value={form.slug}
                    disabled={Boolean(editingSlug)}
                    onChange={(event) => setForm({ ...form, slug: makeSlug(event.target.value) })}
                    placeholder="health-body"
                    className="mt-2 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 outline-none focus:border-[#E86F23] disabled:bg-[#F6EFE7]"
                  />
                </label>
                <label className="block text-sm font-black text-[#6D6258]">
                  カテゴリ
                  <input
                    value={form.category}
                    onChange={(event) => setForm({ ...form, category: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 outline-none focus:border-[#E86F23]"
                  />
                </label>
                <label className="block text-sm font-black text-[#6D6258]">
                  公開日
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(event) => setForm({ ...form, publishedAt: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 outline-none focus:border-[#E86F23]"
                  />
                </label>
                <label className="block text-sm font-black text-[#6D6258]">
                  公開状態
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value as AdminPost["status"] })
                    }
                    className="mt-2 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 outline-none focus:border-[#E86F23]"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </label>
                <label className="block text-sm font-black text-[#6D6258] sm:col-span-2">
                  画像URL
                  <input
                    value={form.image}
                    onChange={(event) => setForm({ ...form, image: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 outline-none focus:border-[#E86F23]"
                    placeholder="/gallery-studio-interior.png"
                  />
                </label>
                <label className="block text-sm font-black text-[#6D6258] sm:col-span-2">
                  抜粋
                  <textarea
                    value={form.excerpt}
                    onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
                    className="mt-2 min-h-24 w-full rounded-2xl border border-[#EADCCF] px-4 py-3 outline-none focus:border-[#E86F23]"
                    required
                  />
                </label>
                <label className="block text-sm font-black text-[#6D6258] sm:col-span-2">
                  本文
                  <textarea
                    value={form.content}
                    onChange={(event) => setForm({ ...form, content: event.target.value })}
                    className="mt-2 min-h-[22rem] w-full rounded-2xl border border-[#EADCCF] px-4 py-3 font-mono text-sm outline-none focus:border-[#E86F23]"
                    placeholder={"## 見出し\n\n本文を入力してください。"}
                    required
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full bg-[#E86F23] px-7 py-3 text-sm font-black text-white disabled:opacity-50"
                >
                  {editingSlug ? "更新する" : "投稿する"}
                </button>
                {editingSlug ? (
                  <>
                    <a
                      href={`/blog/${editingSlug}`}
                      target="_blank"
                      className="rounded-full border border-[#B8C7A4] px-6 py-3 text-sm font-black text-[#7B9257]"
                    >
                      表示確認
                    </a>
                    <button
                      type="button"
                      onClick={() => void deletePost(editingSlug)}
                      className="rounded-full border border-red-200 px-6 py-3 text-sm font-black text-red-600"
                    >
                      削除
                    </button>
                  </>
                ) : null}
              </div>
              {message ? (
                <p className="mt-4 rounded-2xl bg-[#FFF7EF] px-4 py-3 text-sm font-bold text-[#D36F31]">
                  {message}
                </p>
              ) : null}
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

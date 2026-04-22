export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#E07A3A]">
          NATURAL FITNESS
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">ホームページ準備中</h1>
        <p className="mt-3 text-sm text-slate-600">
          ただいま新しいホームページを準備しています。
          <br />
          体験予約は予約ページからご利用いただけます。
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/lp"
            className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-[#E8D4C4] bg-white px-5 py-2.5 text-sm font-semibold text-[#B86E3C] transition hover:bg-[#fff7f1]"
          >
            LPを見る
          </a>
          <a
            href="/reserve"
            className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-[#E07A3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#cf6d34]"
          >
            体験予約へ
          </a>
        </div>
      </section>
    </main>
  );
}

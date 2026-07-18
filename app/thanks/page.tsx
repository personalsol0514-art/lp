import Link from "next/link";
import { Header } from "../../components/Header";

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffdfb] via-[#fff8f4] to-[#fff3eb] px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
      <Header />
      <div className="mx-auto max-w-2xl">
        <section className="rounded-3xl border border-[#E8D4C4] bg-white p-6 text-center shadow-[0_12px_32px_-12px_rgba(224,122,58,0.35)] sm:p-10">
          <p className="text-label font-semibold uppercase tracking-[0.14em] text-[#E07A3A]">
            Thanks
          </p>
          <h1 className="mt-2 text-heading font-bold text-slate-900 sm:text-heading-lg">
            ご予約ありがとうございます
          </h1>
          <p className="mt-4 text-body leading-relaxed text-slate-600">
            予約内容を受け付けました。
            <br />
            内容を確認のうえ、担当者よりご連絡いたします。
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/lp"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#E07A3A] px-6 py-2.5 text-body font-semibold text-white shadow-md shadow-[#E07A3A]/35 transition hover:bg-[#cf6d34]"
            >
              LPへ戻る
            </Link>
            <Link
              href="/reserve"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-[#E8D4C4] bg-white px-6 py-2.5 text-body font-semibold text-[#B86E3C] transition hover:bg-[#fff7f1]"
            >
              予約画面へ戻る
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

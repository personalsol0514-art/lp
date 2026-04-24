import Link from "next/link";
import { Header } from "../../components/Header";
import { ReserveForm } from "../../components/ReserveForm";

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffdfb] via-[#fff8f4] to-[#fff3eb] px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
      <Header />
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/lp"
            className="text-body-sm font-semibold text-[#B86E3C] underline decoration-[#B86E3C]/40 underline-offset-4"
          >
            LPに戻る
          </Link>
        </div>

        <section className="rounded-3xl border border-[#E8D4C4] bg-white p-6 shadow-[0_12px_32px_-12px_rgba(224,122,58,0.35)] sm:p-8">
          <p className="text-label font-semibold uppercase tracking-[0.14em] text-[#E07A3A]">
            Reserve
          </p>
          <h1 className="mt-2 text-heading font-bold text-slate-900 sm:text-heading-lg">
            体験予約フォーム
          </h1>
          <p className="mt-3 text-body text-slate-600">
            60分枠（11:00〜20:00）からご希望の時間を選んでご予約ください。
          </p>

          <div className="mt-7">
            <ReserveForm />
          </div>
        </section>
      </div>
    </main>
  );
}

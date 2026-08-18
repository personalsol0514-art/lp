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
            href="/"
            className="text-body-sm font-semibold text-[#B86E3C] underline decoration-[#B86E3C]/40 underline-offset-4"
          >
            トップページに戻る
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
            空き枠を選び、お名前と連絡先を入力すると予約が完了します。
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-[#F1D8C5] bg-[#FFF8F2] p-3 text-center text-xs font-bold text-[#6D6258] sm:text-sm">
            <div>
              <span className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-full bg-[#E86F23] text-[11px] text-white">1</span>
              空き枠を選択
            </div>
            <div>
              <span className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-full bg-[#E86F23] text-[11px] text-white">2</span>
              連絡先を入力
            </div>
            <div>
              <span className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-full bg-[#7B9257] text-[11px] text-white">3</span>
              予約完了
            </div>
          </div>

          <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold text-[#7A7068]">
            <li><span className="mr-1 text-[#7B9257]">✓</span>入力約1分</li>
            <li><span className="mr-1 text-[#7B9257]">✓</span>体験約60分</li>
            <li><span className="mr-1 text-[#7B9257]">✓</span>無理な勧誘なし</li>
          </ul>

          <div className="mt-7">
            <ReserveForm />
          </div>
        </section>
      </div>
    </main>
  );
}

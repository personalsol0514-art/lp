import Image from "next/image";
import { Header } from "./Header";
import { ReserveLink } from "./ReserveLink";
import { SectionWave } from "./SectionWave";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92svh] w-full overflow-hidden bg-[#1d1b2e]"
    >
      <Header />

      {/* 背景画像 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-16 z-0">
        <Image
          src="/hero-gym.jpg"
          alt="岡崎市本町通の完全個室パーソナルジムでのトレーニング風景"
          fill
          priority
          className="hero-slide-pan-mobile object-cover object-[56%_34%] sm:object-[28%_34%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 top-16 z-10 mx-auto flex w-full max-w-6xl items-end px-4 pb-16 sm:px-8 sm:pb-20">
        <div className="w-full max-w-[min(88vw,32rem)] md:max-w-[30rem]">
          <p className="text-[0.8rem] font-semibold tracking-[0.1em] text-white/90 sm:text-body">
            岡崎市本町通・東岡崎エリア｜完全個室パーソナルジム
          </p>

          <h1 className="sr-only">
            岡崎市本町通の完全個室パーソナルジム NATURAL FITNESS
          </h1>

          <p className="mt-3 font-sans text-[clamp(2rem,6.2vw,4.2rem)] font-black leading-[1.1] tracking-[0.01em] text-white drop-shadow-[0_8px_24px_rgba(32,23,58,0.35)] sm:mt-4">
            無理なく、
            <br />
            自分のペースで。
          </p>

          <p className="mt-4 text-body leading-relaxed text-white/90 sm:mt-5 sm:text-heading-sm">
            ダイエット・姿勢改善・運動習慣づくりを、
            <br />
            続けやすいペースでマンツーマンサポート。
          </p>

          <div className="mt-6 sm:mt-7">
            <ReserveLink
              href="/reserve"
              eventLabel="hero_reserve"
              className="flex min-h-[52px] w-full max-w-[420px] items-center justify-center rounded-full bg-[#E07A3A] px-6 py-3 text-body font-bold text-white shadow-lg shadow-[#E07A3A]/35 transition hover:bg-[#cf6d34]"
            >
              初回体験を予約する
            </ReserveLink>
            <p className="mt-2.5 text-[0.75rem] text-white/85">
              初回0円（先着5名）・約60分・無理な勧誘はしません
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {["完全個室", "駐車券サービス", "初心者歓迎"].map((label) => (
              <span
                key={label}
                className="rounded-full bg-white/15 px-3 py-1.5 text-[0.75rem] font-semibold text-white backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 次セクションへ。画像より手前・ヘッダーより奥に描画 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] translate-y-full">
        <SectionWave fillClassName="text-[#fafaf8]" />
      </div>
    </section>
  );
}

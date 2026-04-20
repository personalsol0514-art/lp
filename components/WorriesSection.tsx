import { WorriesAnimatedBubbles } from "./WorriesAnimatedBubbles";
import { WorriesIllustration } from "./WorriesIllustration";

export function WorriesSection() {
  return (
    <section
      id="worries"
      className="relative scroll-mt-28 overflow-x-clip overflow-y-visible bg-gradient-to-b from-[#fafaf8] via-[#f7f6f2] to-[#f3f1ec] pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 md:pb-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 見出し：参考画像風・少し傾け＋「お悩み」緑＋黄色マーカー */}
        <header className="relative mx-auto max-w-4xl text-center">
          <div className="flex flex-col items-center">
            <div className="-rotate-[6.5deg] transform">
              <h2 className="relative inline-block text-center font-sans text-[1.98rem] font-bold leading-[1.25] tracking-tight text-stone-900 sm:text-[2.4rem] md:text-[2.7rem] lg:text-[3.12rem]">
                <span className="relative z-10 whitespace-nowrap">
                  こんな
                  <span className="text-lime-500">お悩み</span>
                  ありませんか？
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-[-3%] right-[-3%] z-0 h-[0.42em] rounded-full bg-yellow-300/90"
                />
              </h2>
            </div>
            <p className="font-maru -mb-4 mt-8 text-center text-[1.5rem] font-bold leading-tight text-stone-700 sm:-mb-5 sm:text-[1.8rem] lg:-mb-6 lg:mt-10">
              これ、私のことかも…
            </p>
          </div>
        </header>

        {/*
          高さ: 固定 min-h ではなく、幅に対する padding-bottom でアスペクトに近い高さを出す
          （absolute 子は親の高さに寄与しないための定番パターン）。max(rem,%) で最小幅も確保。
        */}
        <div className="relative mx-auto mt-0 h-0 w-full max-w-4xl overflow-visible pb-[max(23.1rem,62.37%)] sm:pb-[max(24.255rem,57.75%)] lg:pb-[max(24.255rem,53.13%)]">
          <div className="absolute inset-0 overflow-visible">
            <div className="pointer-events-none absolute inset-0" aria-hidden />
            <div className="absolute left-1/2 top-[51%] z-10 w-full max-w-[min(390px,92vw)] -translate-x-1/2 -translate-y-1/2 sm:top-[52%] sm:max-w-[min(420px,96vw)] lg:top-[51%]">
              <WorriesIllustration />
            </div>
            <WorriesAnimatedBubbles />
          </div>
        </div>
      </div>

      {/* 下中央の小さな三角突起（グラデーション下端色で次セクションへつなぐ） */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-[100%]"
        aria-hidden
      >
        <div className="h-0 w-0 border-x-[36px] border-t-[44px] border-x-transparent border-t-[#f3f1ec] sm:border-x-[44px] sm:border-t-[52px]" />
      </div>
    </section>
  );
}

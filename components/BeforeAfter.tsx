import type { ReactNode } from "react";
import Image from "next/image";

function BeforeAfterRow({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeNote,
  afterNote,
  index,
  showAccent,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeNote: ReactNode;
  afterNote: ReactNode;
  index: number;
  showAccent?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-5 flex justify-center sm:mb-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-stone-200 bg-[#faf7f3] text-sm font-semibold tabular-nums text-stone-400">
          {index + 1}
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,36%)_minmax(0,1fr)] items-end gap-2 sm:grid-cols-[minmax(0,34%)_minmax(0,1fr)] sm:gap-3">
        <div className="flex min-w-0 flex-col items-center">
          {showAccent ? (
            <p className="font-yomogi mb-3 w-full text-center text-[0.78rem] leading-relaxed text-[#ef4444] sm:mb-3.5 sm:text-[0.82rem]">
              続けるほど、
              <br className="sm:hidden" />
              からだが変わっていく！
            </p>
          ) : null}
          <div className="mb-2 flex justify-center sm:mb-2.5">
            <span className="rounded-full bg-[#b08d6a] px-3.5 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-white shadow-sm sm:px-4 sm:text-[0.6875rem]">
              Before
            </span>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[128px] overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-stone-100 sm:max-h-[min(34vh,300px)] sm:max-w-[158px]">
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 28vw, 158px"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-center">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[272px] overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-stone-100 sm:max-h-[min(74vh,640px)] sm:max-w-[380px]">
            <Image
              src={afterSrc}
              alt={afterAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 60vw, 380px"
            />
          </div>
          <div className="mt-3 flex justify-center sm:mt-3.5">
            <span className="rounded-full bg-[#d9a399] px-5 py-2 text-[0.8125rem] font-bold uppercase tracking-[0.15em] text-white shadow-md sm:px-7 sm:py-2.5 sm:text-[0.9375rem] sm:tracking-[0.16em]">
              After
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 text-left text-[0.8125rem] leading-relaxed text-stone-600 sm:grid-cols-2 sm:gap-6">
        <div>{beforeNote}</div>
        <div>{afterNote}</div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section
      id="changes"
      className="scroll-mt-28 bg-[#efe8df] px-4 pt-14 pb-24 sm:pt-16 sm:pb-28"
    >
      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-xl text-center">
          <p className="text-[0.7rem] font-medium tracking-[0.1em] text-stone-500 sm:text-[0.75rem]">
            Before / After
          </p>
          <h2 className="mt-2 text-[1.125rem] font-bold leading-snug tracking-tight text-stone-800 sm:mt-2.5 sm:text-[1.35rem] sm:leading-tight">
            数字よりも、
            <br />
            「鏡を見たときの安心感」。
          </h2>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-2 md:gap-6 lg:gap-8">
          <div className="min-w-0 rounded-[1.75rem] bg-white p-6 shadow-[0_8px_40px_rgba(62,56,50,0.07)] sm:p-7 lg:p-6">
            <BeforeAfterRow
              index={0}
              showAccent
              beforeSrc="/before-after-before.png"
              afterSrc="/before-after-after.png"
              beforeAlt="ビフォー：トレーニング・生活習慣を始める前のイメージ"
              afterAlt="アフター：習慣を続けたあとのイメージ"
              beforeNote={
                <>
                  <p className="font-semibold text-stone-700">くせになる前</p>
                  <p className="mt-2">
                    ・肩こり・腰の重さが当たり前
                    <br />
                    ・夜なかなか寝つけない
                    <br />
                    ・鏡に写る自分の姿勢が気になる
                  </p>
                </>
              }
              afterNote={
                <>
                  <p className="font-semibold text-stone-700">習慣が育ったら</p>
                  <p className="mt-2">
                    ・肩がふっと軽くなり、呼吸が深くなった
                    <br />
                    ・仕事終わりでも、休日を楽しむ余裕ができた
                    <br />
                    ・写真に写る自分を、少し好きになれた
                  </p>
                </>
              }
            />
          </div>

          <div className="min-w-0 rounded-[1.75rem] bg-white p-6 shadow-[0_8px_40px_rgba(62,56,50,0.07)] sm:p-7 lg:p-6">
            <BeforeAfterRow
              index={1}
              beforeSrc="/before-after-pair2-before.png"
              afterSrc="/before-after-pair2-after.png"
              beforeAlt="ビフォー：別シーンでのイメージ"
              afterAlt="アフター：フォーム・姿勢のイメージ"
              beforeNote={
                <p className="text-stone-500">
                  ※別シチュエーションでのビフォー例です。
                </p>
              }
              afterNote={
                <p className="text-stone-500">
                  ※トレーニングを重ねたあとのフォーム例のイメージです。
                </p>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

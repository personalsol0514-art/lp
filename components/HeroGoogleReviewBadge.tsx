import Image from "next/image";

/** Google口コミ評価バッジ（月桂樹は提供 PNG /laurel-wreath.png） */
export function HeroGoogleReviewBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-[5.39rem] w-[5.39rem] shrink-0 sm:h-52 sm:w-52 ${className}`}
      aria-label="Google口コミ 評価4.8 星5"
    >
      <Image
        src="/laurel-wreath.png"
        alt=""
        fill
        className="object-contain mix-blend-screen drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
        sizes="(max-width: 640px) 87px, 208px"
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-3 pt-px text-center sm:px-9 sm:pt-1">
        <p className="font-sans text-[0.32rem] font-bold leading-tight tracking-wide text-[#f3e6c4] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] sm:text-[0.72rem]">
          Google口コミ
        </p>
        <p className="mt-0.5 font-sans text-[0.858rem] font-black tabular-nums leading-none tracking-tight text-[#f8efd2] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-[2.05rem]">
          4.8
        </p>
        <p
          className="mt-0.5 font-sans text-[0.44rem] leading-none tracking-[-0.02em] text-[#b8860b] drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] sm:text-[1rem]"
          aria-hidden
        >
          ★★★★★
        </p>
      </div>
    </div>
  );
}

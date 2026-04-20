/** 参照: 吹き出し風の破線円＋POINT／番号 */
export function ReasonPointBadge({
  index,
  className,
}: {
  index: number;
  /** 横並びのときは `mx-0` など */
  className?: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`relative h-[5.75rem] w-[5.75rem] shrink-0 text-[#1a1816] ${className ?? "mx-auto sm:mx-0"}`}
      role="img"
      aria-label={`POINT ${num}`}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeDasharray="118 38 120 38 164"
          transform="rotate(4 100 100)"
        />
        <path
          d="M 148 126 L 176 156"
          stroke="currentColor"
          strokeWidth="3.25"
          strokeLinecap="round"
        />
        <path
          d="M 176 156 L 164 150"
          stroke="currentColor"
          strokeWidth="3.25"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5 leading-none">
        <span className="font-sans text-[0.5625rem] font-bold tracking-[0.22em]">
          POINT
        </span>
        <span className="font-point text-[2rem] font-bold tracking-[-0.02em] sm:text-[2.125rem]">
          {num}
        </span>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

type SectionWaveProps = {
  /** Tailwind class that sets `color` (e.g. `text-white`, `text-[#fafaf8]`). */
  fillClassName: string;
  /** Flip the wave vertically */
  flip?: boolean;
  className?: string;
};

/** Decorative wave divider; path fill uses `currentColor`. */
export function SectionWave({
  fillClassName,
  flip,
  className,
}: SectionWaveProps) {
  return (
    <div
      className={`pointer-events-none w-full select-none leading-[0] ${className ?? ""}`}
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className={`block h-[4.25rem] w-full sm:h-28 md:h-32 lg:h-36 ${flip ? "scale-y-[-1]" : ""} ${fillClassName}`}
      >
        <path
          fill="currentColor"
          d="M0 58Q360 4 720 58T1440 58V96H0V58z"
        />
      </svg>
    </div>
  );
}

type SectionWithTopWaveProps = {
  fillClassName: string;
  flip?: boolean;
  children: ReactNode;
};

/** Places a wave above the first child so it overlaps the previous section. */
export function SectionWithTopWave({
  fillClassName,
  flip,
  children,
}: SectionWithTopWaveProps) {
  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[2] -translate-y-full">
        <SectionWave fillClassName={fillClassName} flip={flip} />
      </div>
      {children}
    </div>
  );
}

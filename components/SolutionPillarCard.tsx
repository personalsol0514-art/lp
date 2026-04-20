import Image from "next/image";
import type { ReactNode } from "react";
import type { SolutionIconComponent } from "./solution-pillar-icons";

export type SolutionAccent = "emerald" | "orange" | "sky";

type SolutionPillarCardProps = {
  badge: string;
  headline: string;
  description: string;
  accent: SolutionAccent;
  /** Entry Pocket 風のミニマル列では省略可 */
  icon?: SolutionIconComponent;
  illustration?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageObjectClass?: string;
  imageBlobClass: string;
};

const accentStyles: Record<
  SolutionAccent,
  { solid: string; ringSoft: string }
> = {
  emerald: {
    solid: "bg-[#4A8F6A]",
    ringSoft: "ring-emerald-700/12",
  },
  orange: {
    solid: "bg-[#E07A3A]",
    ringSoft: "ring-orange-600/12",
  },
  sky: {
    solid: "bg-[#4A9BC4]",
    ringSoft: "ring-sky-600/12",
  },
};

export function SolutionPillarCard({
  badge,
  headline,
  description,
  accent,
  icon: Icon,
  illustration,
  imageSrc,
  imageAlt = "",
  imageObjectClass = "object-cover object-[center_35%]",
  imageBlobClass,
}: SolutionPillarCardProps) {
  const a = accentStyles[accent];

  const imageEl = imageSrc ? (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      className={imageObjectClass}
      sizes="(max-width: 640px) 90vw, 370px"
    />
  ) : (
    illustration
  );

  return (
    <article className="flex h-full flex-col items-start text-left">
      {Icon ? (
        <div
          className={`mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm max-sm:mx-auto sm:mb-4 ${a.solid}`}
          aria-hidden
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      ) : null}

      <div className="relative order-2 mx-auto w-full max-w-[370px] sm:order-1 sm:mx-0">
        <div
          className="pointer-events-none absolute left-1/2 top-3 bottom-0 w-[min(92%,370px)] -translate-x-1/2 sm:left-0 sm:translate-x-0"
          aria-hidden
        >
          <svg
            viewBox="0 0 260 190"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#ffffff"
              fillOpacity="0.94"
              d="M130 8c42 0 80 26 96 64 18 44 4 96-36 118-28 16-62 18-94 10-48-12-84-56-80-108 4-56 52-92 114-84z"
            />
          </svg>
        </div>
        <div className="relative z-10 flex h-[214px] items-end justify-center sm:justify-center">
          {imageSrc ? (
            <div
              className={`relative h-[214px] w-full max-w-[340px] overflow-hidden shadow-[0_8px_28px_rgba(51,47,46,0.08)] ring-1 ring-stone-900/[0.06] ${imageBlobClass} ${a.ringSoft}`}
            >
              {imageEl}
            </div>
          ) : (
            <div className="flex h-full w-full items-end justify-center pb-px">
              {illustration}
            </div>
          )}
        </div>
      </div>

      <div className="order-1 flex w-full flex-col items-start px-1 text-left max-sm:mb-5 sm:order-2 sm:mb-0 sm:mt-6 sm:px-0 lg:mt-7">
        <div
          className={`inline-flex rounded-full px-3.5 py-1.5 text-[0.8125rem] font-semibold tracking-wide text-white shadow-sm sm:text-sm ${a.solid}`}
        >
          {badge}
        </div>
        <h3 className="font-sans mt-3 text-[2.125rem] font-bold leading-[1.12] tracking-tight text-[#1a1816] max-sm:mt-3.5 sm:mt-3.5 sm:text-[2.5rem] sm:leading-[1.1] md:text-[2.75rem] lg:text-[2.875rem]">
          {headline}
        </h3>
      </div>

      <p className="font-sans order-3 flex-1 max-w-[22rem] whitespace-pre-line px-1 text-[0.9375rem] font-normal leading-[1.75] text-[#3d3936] max-sm:mt-6 sm:order-2 sm:mt-4 sm:max-w-none sm:px-0 sm:text-[1rem] sm:leading-[1.7]">
        {description}
      </p>
    </article>
  );
}

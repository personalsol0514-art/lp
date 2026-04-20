"use client";

import { useId } from "react";
import type { Accent } from "./worries-data";

const accentClass: Record<Accent, string> = {
  rose: "text-rose-500",
  orange: "text-orange-500",
  sky: "text-sky-500",
  emerald: "text-emerald-600",
  lime: "text-lime-700",
};

type WorryBubbleProps = {
  kind: "single" | "double";
  accent: Accent;
  /** single */
  text?: string;
  highlight?: string;
  /** double */
  top?: string;
  bottom?: string;
  className?: string;
};

const MAIN_BLOB_PATH =
  "M 16 36 C 11 21 24 9 42 10 C 54 4 74 6 88 16 C 104 11 114 25 110 39 C 116 47 108 57 94 58 C 92 64 72 62 54 58 C 38 62 20 53 17 41 C 13 41 13 38 16 36 Z";

/**
 * 思考吹き出し：SVG の有機パス＋ノイズで手描き風の輪郭
 */
export function WorryBubble({
  kind,
  accent,
  text,
  highlight,
  top,
  bottom,
  className = "",
}: WorryBubbleProps) {
  const accentCls = accentClass[accent];
  const roughId = `thought-rough-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={`group relative z-[1] inline-flex min-w-[min(9.25rem,78vw)] max-w-[min(14.5rem,82vw)] flex-col items-center justify-center px-[1.997rem] py-[1.597rem] text-center transition duration-300 ease-out hover:-translate-y-1 sm:min-w-[16.8rem] sm:max-w-[22.4rem] sm:px-[3.194rem] sm:py-[1.997rem] lg:min-w-[15.2rem] lg:max-w-[22.4rem] lg:px-[2.796rem] lg:py-[1.997rem] ${className}`}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_10px_28px_-6px_rgba(55,65,50,0.2)] transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_36px_-8px_rgba(55,65,50,0.24)]"
        viewBox="0 0 120 72"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter
            id={roughId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.085"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          d={MAIN_BLOB_PATH}
          className="fill-white"
          stroke="#6b5344"
          strokeWidth={1.15}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="nonScalingStroke"
          filter={`url(#${roughId})`}
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center justify-center px-[0.2rem] py-[0.4rem] sm:px-[0.4rem] sm:py-[0.599rem]">
        {kind === "single" && text && highlight && (
          <p className="text-[1.064rem] font-bold leading-none tracking-tight text-stone-800 sm:text-[1.68rem]">
            {(() => {
              const idx = text.indexOf(highlight);
              if (idx === -1) {
                return text;
              }
              return (
                <>
                  {text.slice(0, idx)}
                  <span className={accentCls}>{highlight}</span>
                  {text.slice(idx + highlight.length)}
                </>
              );
            })()}
          </p>
        )}

        {kind === "double" && top && bottom && (
          <>
            <p className="text-[0.896rem] font-medium leading-none text-stone-600 sm:text-[1.36rem]">
              {top}
            </p>
            <p
              className={`mt-0.5 text-[1.12rem] font-bold leading-none tracking-tight sm:mt-1 sm:text-[1.76rem] ${accentCls}`}
            >
              {bottom}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

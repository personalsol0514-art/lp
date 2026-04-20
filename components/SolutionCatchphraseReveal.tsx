"use client";

import { useEffect, useRef, useState } from "react";

const STAGGER_MS = 120;
const DURATION_MS = 900;

/** Entry Pocket 風：段階的な中央見出し（そのお悩み → ブランドが → 解決します！） */
export function SolutionCatchphraseReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden =
    "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100";
  const shown =
    "translate-y-0 opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100";

  const tx = (delayMs: number) => ({
    transitionProperty: "opacity, transform",
    transitionDuration: `${DURATION_MS}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: revealed ? `${delayMs}ms` : "0ms",
  });

  return (
    <div ref={wrapRef} className="mx-auto max-w-4xl px-2 sm:px-4">
      <div className="flex flex-col items-center text-center">
        <p
          className={`font-sans text-[1.5rem] font-bold leading-[1.12] tracking-tight text-[#1a1816] sm:text-[2rem] md:text-[2.4rem] ${revealed ? shown : hidden}`}
          style={tx(0)}
        >
          そのお悩み、
        </p>
        <p
          className={`font-sans mt-2 leading-[1.05] tracking-tight text-[#1a1816] sm:mt-2.5 ${revealed ? shown : hidden}`}
          style={tx(STAGGER_MS)}
        >
          <span className="text-[2.1rem] font-extrabold text-[#E07A3A] sm:text-[2.9rem] md:text-[3.6rem] lg:text-[3.9rem]">
            Natural Fitness
          </span>
          <span className="ml-1 text-[1.25rem] font-bold sm:text-[1.55rem] md:text-[1.7rem] lg:text-[1.8rem]">
            が
          </span>
        </p>
        <p
          className={`font-sans mt-3 text-[2rem] font-bold leading-[1.12] tracking-tight text-[#1a1816] sm:mt-4 sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem] ${revealed ? shown : hidden}`}
          style={tx(STAGGER_MS * 2)}
        >
          解決します！
        </p>
      </div>
      <div
        className={`mx-auto mt-8 h-px max-w-[12rem] bg-gradient-to-r from-transparent via-[#E07A3A]/55 to-transparent motion-reduce:opacity-100 sm:mt-10 sm:max-w-[16rem] ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionProperty: "opacity",
          transitionDuration: `${DURATION_MS}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: revealed ? `${STAGGER_MS * 3}ms` : "0ms",
        }}
        aria-hidden
      />
    </div>
  );
}

 "use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { SectionWave } from "./SectionWave";

export function Hero() {
  const heroSlides = [
    "/hero-gym.jpg",
    "/solution-posture.png",
    "/solution-movement.png",
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-[#1d1b2e]"
    >
      <Header />

      {/* 背景画像 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-16 z-0">
        {heroSlides.map((slideSrc, index) => (
          <Image
            key={`${slideSrc}-${activeSlide === index ? activeSlide : "idle"}`}
            src={slideSrc}
            alt="パーソナルジムのトレーニング風景"
            fill
            priority={index === 0}
            className={`hero-slide-pan-mobile object-cover object-[56%_34%] transition-opacity duration-1000 sm:object-[28%_34%] ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 top-16 z-[1] w-[20%] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.36)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 top-16 z-10 mx-auto flex w-full max-w-6xl items-end px-4 pb-16 sm:px-8 sm:pb-20">
        <div className="w-full">
          <div className="mt-4 ml-auto max-w-[min(88vw,37rem)] text-right md:mt-5 md:max-w-[34rem]">
            <h1 className="font-sans text-[clamp(2rem,6.2vw,4.6rem)] font-black leading-[1.08] tracking-[0.01em] text-white drop-shadow-[0_8px_24px_rgba(32,23,58,0.35)]">
              岡崎で
              <br />
              無理なく変われるパーソナルジム
            </h1>
          </div>

          <div className="mt-4 ml-auto w-fit bg-[#E8D4C4]/95 px-6 py-2 md:mt-5 md:px-10 md:py-3">
            <p className="text-xl font-bold tracking-[0.08em] text-slate-800 md:text-[2rem]">
              スキマ時間でできる健康習慣
            </p>
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


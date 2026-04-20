"use client";

import Image from "next/image";

const slides: Array<{ src: string; alt: string }> = [
  {
    src: "/gallery-exterior.png",
    alt: "Natural Fitness・整体ナチュラルの店舗外観。看板とガラス張りの入口。",
  },
  {
    src: "/gallery-studio-interior.png",
    alt: "パワーラックやベンチを備えた明るいパーソナルトレーニングスタジオの内観。",
  },
  {
    src: "/gallery-lobby.png",
    alt: "ダークトーンのソファとグリーンウォールのあるラウンジ・受付スペース。",
  },
  {
    src: "/hero-gym.jpg",
    alt: "明るく開放感のあるトレーニングスペースのイメージ",
  },
  {
    src: "/solution-posture.png",
    alt: "マットと器具を使ったくつろげるトレーニングエリアのイメージ",
  },
  {
    src: "/solution-movement.png",
    alt: "動きやすいフロア空間のイメージ",
  },
  {
    src: "/solution-daily.png",
    alt: "リラックスして身体と向き合えるプライベートな雰囲気のイメージ",
  },
  {
    src: "/worries-character.png",
    alt: "やわらかなトーンのスタジオイメージ",
  },
];

function MarqueeTrack({ animationClass }: { animationClass: string }) {
  return (
    <div
      className={`flex w-max gap-0 py-1 motion-reduce:animate-none ${animationClass}`}
    >
      <div className="flex shrink-0 gap-4 pr-4">
        {slides.map((item) => (
          <figure
            key={item.src}
            className="relative h-52 w-[min(72vw,17.5rem)] shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-[0_6px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60 sm:h-60 sm:w-80"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 72vw, 320px"
            />
          </figure>
        ))}
      </div>
      <div className="flex shrink-0 gap-4 pr-4" aria-hidden>
        {slides.map((item) => (
          <figure
            key={`dup-${item.src}`}
            className="relative h-52 w-[min(72vw,17.5rem)] shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-[0_6px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60 sm:h-60 sm:w-80"
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 72vw, 320px"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function StudioGalleryMarquee() {
  const pauseHover =
    "group-hover/marquee:[animation-play-state:paused]";

  return (
    <div className="group/marquee relative w-screen max-w-[100vw] -translate-x-1/2 left-1/2">
      <p className="sr-only">写真が横に自動で流れるギャラリーです。</p>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />
      <div className="overflow-hidden">
        <MarqueeTrack
          animationClass={`animate-marquee ${pauseHover}`}
        />
      </div>
    </div>
  );
}

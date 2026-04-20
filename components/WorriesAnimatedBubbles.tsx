"use client";

import { useEffect, useRef, useState } from "react";
import type { WorryItem } from "./worries-data";
import { WORRY_ITEMS } from "./worries-data";
import { WorryBubble } from "./WorryBubble";

function WorryBubbleFromItem({ item }: { item: WorryItem }) {
  const extra = item.bubbleClass ?? "";
  if (item.kind === "single") {
    return (
      <WorryBubble
        kind="single"
        text={item.text}
        highlight={item.highlight}
        accent={item.accent}
        className={extra}
      />
    );
  }
  return (
    <WorryBubble
      kind="double"
      top={item.top}
      bottom={item.bottom}
      accent={item.accent}
      className={extra}
    />
  );
}

const STAGGER_MS = 130;
const DURATION_MS = 1000;

export function WorriesAnimatedBubbles() {
  const listRef = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
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
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={listRef}
      className="absolute inset-0"
      aria-label="よくあるお悩み"
    >
      {WORRY_ITEMS.map((item, index) => {
        const delay = revealed ? index * STAGGER_MS : 0;
        return (
          <li
            key={item.id}
            className={`absolute ${item.desktopPosition}`}
          >
            <div
              className={
                revealed
                  ? "translate-y-0 opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
                  : "translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: `${DURATION_MS}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: `${delay}ms`,
              }}
            >
              <WorryBubbleFromItem item={item} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

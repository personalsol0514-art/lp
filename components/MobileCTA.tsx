"use client";

import { useEffect, useState } from "react";
import { ReserveLink } from "./ReserveLink";

export function MobileCTA() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const heroEl = document.getElementById("top");
    if (!heroEl) {
      setHidden(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-50 transition-opacity duration-200 sm:hidden ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-[#F0D3BD]/70 bg-[#fffdfb]/88 p-2 shadow-lg shadow-[#EFD7C3]/65 backdrop-blur-md">
        <ReserveLink
          href="/reserve"
          eventLabel="mobile_cta_reserve"
          className="flex-1 rounded-xl bg-[#E07A3A] px-4 py-3 text-center text-body font-semibold text-white shadow-sm shadow-[#F3C9A9]/60 transition hover:bg-[#C9682F]"
        >
          体験予約
        </ReserveLink>
        <ReserveLink
          href="/reserve"
          eventLabel="mobile_cta_consult"
          className="rounded-xl border border-[#F0D3BD]/90 bg-[#fffdfb] px-4 py-3 text-center text-body font-semibold text-[#B86E3C] transition hover:bg-[#FFF4EB]"
        >
          LINE相談
        </ReserveLink>
      </div>
    </div>
  );
}

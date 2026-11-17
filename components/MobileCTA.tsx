"use client";

import { ReserveLink } from "./ReserveLink";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[min(24rem,calc(100vw-3rem))]">
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-[#dfe6dd]/70 bg-[#f4f7f2]/92 p-2 shadow-lg shadow-[#dfe6dd]/65 backdrop-blur-md">
        <ReserveLink
          href="/reserve"
          eventLabel="mobile_cta_reserve"
          className="flex-1 rounded-xl px-4 py-3 text-center text-body font-bold border border-[#5f826a] bg-[#8db399] text-white shadow-[0_3px_8px_rgba(36,59,51,0.15)] transition hover:bg-[#779d82]"
        >
          初回体験を予約する
        </ReserveLink>
        <a
          href="/price"
          className="rounded-xl border border-[#dfe6dd]/90 bg-[#f4f7f2] px-4 py-3 text-center text-body font-semibold text-[#3d5547] transition hover:bg-[#f4f7f2]"
        >
          料金を見る
        </a>
      </div>
    </div>
  );
}

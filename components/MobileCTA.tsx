export function MobileCTA() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-[#F0D3BD]/70 bg-[#fffdfb]/88 p-2 shadow-lg shadow-[#EFD7C3]/65 backdrop-blur-md">
        <a
          href="/reserve"
          className="flex-1 rounded-xl bg-[#E07A3A] px-4 py-3 text-center text-body font-semibold text-white shadow-sm shadow-[#F3C9A9]/60 transition hover:bg-[#C9682F]"
        >
          体験予約
        </a>
        <a
          href="/reserve"
          className="rounded-xl border border-[#F0D3BD]/90 bg-[#fffdfb] px-4 py-3 text-center text-body font-semibold text-[#B86E3C] transition hover:bg-[#FFF4EB]"
        >
          LINE相談
        </a>
      </div>
    </div>
  );
}


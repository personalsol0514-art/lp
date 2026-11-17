import { ReserveLink } from "./ReserveLink";

const navItems = [
  { label: "特徴", href: "#features" },
  { label: "変化イメージ", href: "#changes" },
  { label: "トレーナー", href: "#trainer" },
  { label: "体験の流れ", href: "#flow" },
  { label: "料金", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="w-full border-b border-emerald-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
          <a
            href="#top"
            className="text-label font-semibold uppercase tracking-[0.25em] text-[#b08d46]"
          >
            NATURAL FITNESS
          </a>

          <div className="flex items-center gap-2">
            <ReserveLink
              href="/reserve"
              eventLabel="header_desktop_reserve"
              className="hidden whitespace-nowrap rounded-full bg-[#5f826a] px-4 py-2 text-body-sm font-semibold text-white shadow-sm shadow-[#dfe6dd]/70 transition hover:bg-[#4f735b] sm:inline-flex"
            >
              初回体験を予約する
            </ReserveLink>

            <details className="relative">
              <summary className="list-none">
                <span className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#dfe6dd] bg-white px-3 py-2 text-body-sm font-semibold text-[#b08d46] transition hover:bg-[#f4f7f2]">
                  <span className="mr-2 inline-flex flex-col gap-1">
                    <span className="h-[2px] w-4 rounded-full bg-[#b08d46]/80" />
                    <span className="h-[2px] w-4 rounded-full bg-[#b08d46]/80" />
                    <span className="h-[2px] w-4 rounded-full bg-[#b08d46]/80" />
                  </span>
                  メニュー
                </span>
              </summary>
              <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-emerald-100 bg-white/95 p-2 shadow-lg shadow-emerald-100/60 backdrop-blur-md">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-xl px-3 py-2 text-body font-semibold text-slate-800 transition hover:bg-emerald-50"
                    >
                      {item.label}
                    </a>
                  ))}
                  <ReserveLink
                    href="/reserve"
                    eventLabel="header_menu_reserve"
                    className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3 py-2.5 text-body font-semibold text-white shadow-sm shadow-emerald-200/60"
                  >
                    初回体験を予約する
                  </ReserveLink>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}

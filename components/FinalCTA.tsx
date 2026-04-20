const SHOP_ADDRESS_SINGLE_LINE =
  "〒444-0051 愛知県岡崎市本町通２丁目３ 鳥居ビル 1F";

const GOOGLE_MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  SHOP_ADDRESS_SINGLE_LINE,
)}&output=embed&hl=ja&z=18`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SHOP_ADDRESS_SINGLE_LINE,
)}`;

export function FinalCTA() {
  const rows: Array<{ term: string; desc: string }> = [
    {
      term: "店名",
      desc: "NATURAL FITNESS（ナチュラルフィットネス）\n整体ナチュラル（整体 Natural）",
    },
    {
      term: "住所",
      desc: "〒444-0051\n愛知県岡崎市本町通２丁目３\n鳥居ビル 1F",
    },
    {
      term: "駐車場",
      desc: "タカラパーキング（サービス券をお渡しします）",
    },
    {
      term: "営業時間",
      desc: "11時〜20時",
    },
    {
      term: "定休日",
      desc: "不定休",
    },
  ];

  return (
    <section
      id="cta"
      aria-labelledby="shop-heading"
      className="scroll-mt-28 bg-gradient-to-b from-white via-[#fffaf6] to-[#fff3eb] px-4 pb-28 pt-10 sm:pb-32 sm:pt-12"
    >
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[#E07A3A]/20 bg-[#fff8f4] px-6 py-10 shadow-[0_12px_40px_-8px_rgba(224,122,60,0.18)] sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#E07A3A] to-transparent opacity-80"
          aria-hidden
        />
        <header className="text-center">
          <p className="text-label font-semibold uppercase tracking-[0.12em] text-[#E07A3A]">
            Shop
          </p>
          <h2
            id="shop-heading"
            className="mt-2 text-heading-lg font-bold text-slate-900 sm:text-display-sm"
          >
            店舗情報
          </h2>
        </header>

        <dl className="mt-8 space-y-5 border-t border-[#E07A3A]/15 pt-8 text-left">
          {rows.map(({ term, desc }) => (
            <div key={term}>
              <dt className="text-body-sm font-semibold text-[#E07A3A]">
                {term}
              </dt>
              <dd className="mt-1.5 whitespace-pre-line text-body leading-relaxed text-slate-700">
                {desc}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <p className="text-body-sm font-semibold text-[#E07A3A]">地図</p>
          <div className="mt-3 overflow-hidden rounded-2xl border border-[#E07A3A]/25 bg-white shadow-sm ring-1 ring-[#E07A3A]/10">
            <div className="relative aspect-[4/3] w-full min-h-[220px] sm:aspect-video sm:min-h-[280px]">
              <iframe
                title="NATURAL FITNESS（愛知県岡崎市 本町通・鳥居ビル）の地図"
                src={GOOGLE_MAPS_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-2 text-center">
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm font-medium text-[#E07A3A] underline decoration-[#E07A3A]/40 underline-offset-2 transition hover:decoration-[#E07A3A]"
            >
              Googleマップで大きく表示
            </a>
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-[#E07A3A]/15 pt-8 sm:flex-row sm:justify-center">
          <a
            href="/reserve"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#E07A3A] px-6 py-2.5 text-body font-semibold text-white shadow-md shadow-[#E07A3A]/35 transition hover:bg-[#cf6d34]"
          >
            体験予約
          </a>
          <a
            href="/reserve"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full border-2 border-[#E07A3A]/50 bg-white px-6 py-2.5 text-body font-semibold text-[#c45a28] transition hover:border-[#E07A3A] hover:bg-[#fff5ef]"
          >
            LINEで相談
          </a>
        </div>
      </div>
    </section>
  );
}

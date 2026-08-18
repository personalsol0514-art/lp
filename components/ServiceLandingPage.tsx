import Image from "next/image";
import { MobileCTA } from "./MobileCTA";
import { ReserveLink } from "./ReserveLink";

export type ServicePageConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  concerns: Array<{ title: string; text: string }>;
  approachTitle: string;
  approachLead: string;
  approaches: Array<{ number: string; title: string; text: string }>;
  suitableFor: string[];
  sessionTitle: string;
  sessionText: string;
  faqs: Array<{ question: string; answer: string }>;
};

const navigation = [
  ["トップ", "/"],
  ["ダイエット", "/diet"],
  ["姿勢改善", "/posture"],
  ["運動初心者", "/beginner"],
  ["料金", "/price"],
  ["トレーナー", "/trainer"],
];

const related = [
  {
    slug: "diet",
    label: "ダイエット",
    text: "食事と運動を、続けられる生活習慣へ。",
  },
  {
    slug: "posture",
    label: "姿勢改善",
    text: "姿勢と身体の使い方を確認して整えます。",
  },
  {
    slug: "beginner",
    label: "運動初心者",
    text: "今の体力に合わせて無理なく始めます。",
  },
];

export function ServiceLandingPage({ config }: { config: ServicePageConfig }) {
  const pageUrl = `https://natural-fitness-gym.jp/${config.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "トップ",
          item: "https://natural-fitness-gym.jp/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: config.eyebrow,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${config.eyebrow}のパーソナルトレーニング`,
      description: config.lead,
      url: pageUrl,
      areaServed: {
        "@type": "City",
        name: "岡崎市",
      },
      provider: {
        "@id": "https://natural-fitness-gym.jp/#business",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#3A342F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="sticky top-0 z-50 border-b border-[#EADCCF] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="leading-none" aria-label="NATURAL FITNESS トップページ">
            <span className="block text-[0.98rem] font-black tracking-[0.08em] text-[#D36F31]">
              NATURAL FITNESS
            </span>
            <span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
              Okazaki Personal Gym
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-black lg:flex" aria-label="主要メニュー">
            {navigation.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={href === `/${config.slug}` ? "text-[#E86F23]" : "transition hover:text-[#E86F23]"}
              >
                {label}
              </a>
            ))}
          </nav>
          <ReserveLink
            href="/reserve"
            eventLabel={`${config.slug}_header_reserve`}
            className="rounded-full bg-[#E86F23] px-4 py-2.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(232,111,35,0.22)] sm:px-6"
          >
            体験予約
          </ReserveLink>
        </div>
      </header>

      <section className="overflow-hidden bg-[#F5F0E8]">
        <div className="mx-auto grid max-w-7xl lg:min-h-[610px] lg:grid-cols-2">
          <div className="order-2 flex items-center px-5 py-12 sm:px-10 sm:py-16 lg:order-1 lg:px-16">
            <div className="max-w-xl">
              <nav className="mb-7 flex items-center gap-2 text-xs font-bold text-[#88796C]" aria-label="パンくずリスト">
                <a href="/" className="hover:text-[#E86F23]">トップ</a>
                <span aria-hidden>›</span>
                <span>{config.eyebrow}</span>
              </nav>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7B9257]">{config.eyebrow}</p>
              <h1 className="mt-3 text-[2.15rem] font-black leading-[1.28] tracking-normal sm:text-[3rem] lg:text-[2.7rem] 2xl:text-[3.4rem]">
                {config.title}
              </h1>
              <p className="mt-6 text-base font-medium leading-[2] text-[#62584F] sm:text-lg">
                {config.lead}
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-xs font-black text-[#655A50] sm:text-sm">
                {["完全個室", "マンツーマン", "岡崎市本町通", "駐車サービスあり"].map((item) => (
                  <span key={item} className="rounded-full border border-[#E5D5C6] bg-white px-3 py-2">
                    <span className="mr-1 text-[#7B9257]">✓</span>{item}
                  </span>
                ))}
              </div>
              <ReserveLink
                href="/reserve"
                eventLabel={`${config.slug}_hero_reserve`}
                className="mt-8 inline-flex min-h-14 w-full max-w-sm items-center justify-center rounded-full bg-[#E86F23] px-7 text-base font-black text-white shadow-[0_16px_32px_rgba(232,111,35,0.24)] transition hover:bg-[#CF5F1C]"
              >
                初回体験の空き枠を見る <span className="ml-4">›</span>
              </ReserveLink>
              <p className="mt-3 text-xs font-bold text-[#81766D]">カウンセリング込み約60分・無理な勧誘はありません</p>
            </div>
          </div>
          <div className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-full">
            <Image src={config.image} alt={config.imageAlt} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A342F]/28 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">Your concerns</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">こんなお悩みはありませんか？</h2>
          </header>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {config.concerns.map((concern) => (
              <article key={concern.title} className="rounded-[1.75rem] border border-[#EADCCF] bg-white p-7 shadow-[0_14px_35px_rgba(82,67,54,0.07)]">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF3E7] font-black text-[#7B9257]">✓</span>
                <h3 className="mt-5 text-xl font-black">{concern.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[#6D6258]">{concern.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F2F5EC] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <header className="lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7B9257]">Our approach</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{config.approachTitle}</h2>
              <p className="mt-5 text-sm font-medium leading-[1.9] text-[#6D6258] sm:text-base">{config.approachLead}</p>
            </header>
            <div className="grid gap-5">
              {config.approaches.map((approach) => (
                <article key={approach.number} className="rounded-[1.75rem] bg-white p-7 shadow-[0_14px_34px_rgba(82,67,54,0.07)] sm:p-9">
                  <div className="flex gap-5">
                    <span className="font-black text-[#E86F23]">{approach.number}</span>
                    <div>
                      <h3 className="text-xl font-black sm:text-2xl">{approach.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-[1.9] text-[#6D6258] sm:text-base">{approach.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-[#3A342F] p-8 text-white sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F6B184]">Recommended</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">このような方に向いています</h2>
            <ul className="mt-7 grid gap-4">
              {config.suitableFor.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold leading-relaxed sm:text-base">
                  <span className="text-[#F6B184]">●</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[2rem] border border-[#EADCCF] bg-[#FFF8F1] p-8 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">Personal session</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">{config.sessionTitle}</h2>
            <p className="mt-5 text-sm font-medium leading-[1.95] text-[#6D6258] sm:text-base">{config.sessionText}</p>
            <div className="mt-7 grid grid-cols-3 gap-2 text-center text-xs font-black text-[#6D6258]">
              {["カウンセリング", "姿勢・動作確認", "体験運動"].map((item, index) => (
                <div key={item} className="rounded-2xl bg-white px-2 py-4 shadow-sm">
                  <span className="block text-[#E86F23]">0{index + 1}</span>
                  <span className="mt-1 block">{item}</span>
                </div>
              ))}
            </div>
            <a href="/price" className="mt-7 inline-flex font-black text-[#E86F23]">料金・コースを見る ›</a>
          </article>
        </div>
      </section>

      <section className="bg-[#F6F1EA] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <header className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7B9257]">FAQ</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">よくあるご質問</h2>
          </header>
          <div className="mt-10 grid gap-4">
            {config.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-[#EADCCF] bg-white px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black">
                  <span><span className="mr-3 text-[#E86F23]">Q</span>{faq.question}</span>
                  <span className="text-[#E86F23] transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-4 border-t border-[#F0E5DA] pt-4 text-sm font-medium leading-[1.9] text-[#6D6258]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <header className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E86F23]">Related support</p>
            <h2 className="mt-3 text-3xl font-black">目的別サポート</h2>
          </header>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {related.filter((item) => item.slug !== config.slug).map((item) => (
              <a key={item.slug} href={`/${item.slug}`} className="rounded-[1.5rem] border border-[#EADCCF] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#7B9257]">NATURAL FITNESS</span>
                <h3 className="mt-2 text-xl font-black">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6D6258]">{item.text}</p>
                <span className="mt-4 inline-block font-black text-[#E86F23]">詳しく見る ›</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E86F23] px-5 py-14 text-white sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">まずは今の身体を一緒に確認します</h2>
            <p className="mt-3 text-sm font-bold text-white/85">岡崎市本町通・完全個室。初めての方もお気軽にご相談ください。</p>
          </div>
          <ReserveLink
            href="/reserve"
            eventLabel={`${config.slug}_final_reserve`}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-8 font-black text-[#E86F23] sm:w-auto"
          >
            体験予約する <span className="ml-4">›</span>
          </ReserveLink>
        </div>
      </section>

      <footer className="bg-[#3A342F] px-5 pb-28 pt-12 text-white sm:px-8 sm:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row">
          <div>
            <p className="text-xl font-black tracking-[0.08em] text-[#F6B184]">NATURAL FITNESS</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">〒444-0051 愛知県岡崎市本町通2丁目3 鳥居ビル1F<br />営業時間 11:00〜20:00 / 不定休</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-7 gap-y-3 text-sm font-bold text-white/75">
            {navigation.map(([label, href]) => <a key={href} href={href} className="hover:text-[#F6B184]">{label}</a>)}
          </nav>
        </div>
      </footer>
      <MobileCTA />
    </main>
  );
}

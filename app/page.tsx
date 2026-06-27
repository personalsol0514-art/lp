import type { Metadata } from "next";
import Image from "next/image";
import BlogNewsPreviewClient from "../components/BlogNewsPreviewClient";
import { ReserveLink } from "../components/ReserveLink";
import { WorriesSection } from "../components/WorriesSection";
import { blogPosts } from "../lib/blog-posts";

export const metadata: Metadata = {
  title: "岡崎市のパーソナルジムならNATURAL FITNESS｜完全個室で無理なくサポート",
  description:
    "岡崎市本町通の完全個室パーソナルジムNATURAL FITNESS。ダイエット・姿勢改善・脚やせを、トレーニングと習慣化サポートで無理なく続けられる形に整えます。",
  keywords: [
    "岡崎 パーソナルジム",
    "岡崎市 パーソナルジム",
    "岡崎 パーソナルトレーニング",
    "岡崎 ダイエット ジム",
    "岡崎 姿勢改善",
    "岡崎 脚やせ",
  ],
  alternates: {
    canonical: "https://natural-fitness-gym.jp/",
  },
  openGraph: {
    title: "岡崎市のパーソナルジムならNATURAL FITNESS",
    description:
      "完全個室で人目を気にせず通える岡崎市本町通のパーソナルジム。ダイエット・姿勢改善・脚やせを無理なくサポートします。",
    type: "website",
    url: "https://natural-fitness-gym.jp/",
    siteName: "NATURAL FITNESS",
    locale: "ja_JP",
  },
};

const address = "〒444-0051 愛知県岡崎市本町通2丁目3 鳥居ビル1F";
const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  address,
)}&output=embed&hl=ja&z=17`;

const navItems = [
  ["お知らせ", "#news"],
  ["特徴", "#features"],
  ["悩み別", "#goals"],
  ["体験の流れ", "#trial-flow"],
  ["料金", "/price"],
  ["お客様の声", "#voice"],
  ["トレーナー", "#trainer"],
  ["アクセス", "#access"],
  ["FAQ", "#faq"],
];

const localPoints = [
  ["完全個室で人目を気にせず通える", "周りを気にせず相談できる空間"],
  ["個別プログラムで無理なく続けられる", "体調・目的に合わせて調整"],
  ["初心者でも安心のマンツーマン指導", "今の体力に合わせて進行"],
  ["お子様連れもOK", "通いやすさを大切に"],
];

const worries = [
  {
    title: "続かない",
    text: "一人では続かず、何度もリバウンドしてしまう…",
    src: "/worries-character.png",
  },
  {
    title: "脚だけ変わらない",
    text: "食事や運動をしても、下半身だけ変化しにくい…",
    src: "/solution-daily.png",
  },
  {
    title: "姿勢が気になる",
    text: "猫背や反り腰など、姿勢の歪みが気になる…",
    src: "/solution-posture.png",
  },
  {
    title: "運動が苦手",
    text: "何から始めたらいいかわからない…",
    src: "/solution-movement.png",
  },
];

const goalPages = [
  {
    label: "Diet",
    title: "ダイエット",
    text: "体重だけでなく、姿勢や生活習慣まで整えてリバウンドしにくい体へ。",
    href: "/diet",
    src: "/card-diet-scale.png",
  },
  {
    label: "Posture",
    title: "姿勢改善",
    text: "猫背・反り腰・巻き肩など、見た目と不調につながるクセを整えます。",
    href: "/posture",
    src: "/card-posture-walk.png",
  },
  {
    label: "Legs",
    title: "脚やせ・下半身",
    text: "むくみや使い方のクセに向き合い、脚のラインを自然に整えます。",
    href: "/legs",
    src: "/solution-daily.png",
  },
  {
    label: "Beginner",
    title: "運動初心者",
    text: "運動が苦手な方でも、無理のない強度から一緒に始められます。",
    href: "/beginner",
    src: "/gallery-studio-interior.png",
  },
];

const trialSteps = [
  ["01", "ご予約", "希望日時を選んで送信", "/trial-reservation-phone.png"],
  ["02", "カウンセリング", "悩みや目標を確認", "/trial-counseling.png"],
  ["03", "姿勢チェック", "体のクセを見える化", "/trial-posture-check.png"],
  ["04", "体験トレーニング", "無理のない強度で体験", "/solution-movement.png"],
  ["05", "プラン提案", "通い方を一緒に整理", "/trial-plan-proposal.png"],
];

const comparisonRows = [
  ["月額の金額", "月4回 14,400円〜", "41,800円〜", "55,000円〜"],
  ["入会金", "無料", "41,800円", "55,000円"],
  ["トレーナー", "専属", "バラバラ", "バラバラ"],
];

const plans = [
  {
    name: "根本改善コース",
    target: "しっかり変えたい方に",
    purpose: "ダイエット・姿勢改善・脚やせに",
    duration: "1回50分",
    count: "月4回",
    price: "24,000",
    color: "orange",
    src: "/solution-movement.png",
    description:
      "体型をしっかり変えたい方、姿勢や身体の使い方から整えたい方におすすめのコースです。",
    points: ["整体×トレーニングのWアプローチ", "姿勢改善・脚やせに特化", "食事サポート・LINEサポート付き"],
  },
  {
    name: "メンテナンスコース",
    target: "整えながら維持したい方に",
    purpose: "カラダのメンテナンス・運動習慣づくりに",
    duration: "1回30分",
    count: "月4回",
    price: "14,400",
    color: "green",
    src: "/solution-daily.png",
    description:
      "忙しい方や、無理なく運動習慣を続けたい方におすすめのコースです。",
    points: ["ボディメイク・姿勢ケア", "無理なく続けられるプログラム", "定期カウンセリング付き"],
  },
];

const voices = [
  {
    badge: "-8.6kg",
    title: "ウエスト-7cmで洋服が似合う体に！",
    profile: "30代 / 会社員",
    text: "自己流ダイエットでは変わらなかったのが、トレーナーさんのサポートで楽しく続けられました。",
    before: "/before-after-before.png",
    after: "/before-after-after.png",
  },
  {
    badge: "-5.2kg",
    title: "脚のラインが変わってスキニーが履けるように！",
    profile: "20代 / 主婦",
    text: "むくみが取れてスッキリし、周りからも「痩せたね」と言われることが増えました。",
    before: "/before-after-pair2-before.png",
    after: "/before-after-pair2-after.png",
  },
];

const trainerPoints = [
  "トレーニング指導歴 6年",
  "栄養コンシェルジュ取得",
  "姿勢改善・ボディメイクが得意",
  "話しやすく丁寧なサポート",
];

const faqItems = [
  ["運動が苦手でも大丈夫ですか？", "はい、大丈夫です。NATURAL FITNESSでは、体力や運動経験に合わせて無理のないメニューをご提案します。ジムが初めての方も安心してお越しください。"],
  ["体験トレーニングはどのくらい時間がかかりますか？", "カウンセリング込みで約60分です。お悩みや目標をお伺いしたうえで、姿勢チェックと体験トレーニングを行います。"],
  ["食事指導は厳しいですか？", "極端な食事制限ではなく、生活に合わせて続けやすい食事の考え方をお伝えします。無理な制限ではなく、習慣として続けられる方法を大切にしています。"],
  ["子ども連れでも通えますか？", "はい、お子様連れでもご利用いただけます。完全個室のため、周りを気にせず通いやすい環境です。"],
  ["持ち物はありますか？", "動きやすい服装・タオル・飲み物をお持ちください。室内シューズが必要な場合は、事前にご案内します。"],
  ["駐車場はありますか？", "近隣のタカラパーキングをご利用いただけます。駐車場サービス券をご用意しています。"],
];

function LeafDecor({ className = "" }: { className?: string }) {
  return (
    <div
      className={`nf-float-soft pointer-events-none absolute grid grid-cols-2 gap-1 opacity-50 ${className}`}
      aria-hidden
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="block h-7 w-4 rounded-[100%_0_100%_0] bg-[#8aa05f]/45"
        />
      ))}
    </div>
  );
}

function CurveDivider({
  className = "",
  fill = "#FFFDF8",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <div className={`nf-wave-drift pointer-events-none absolute inset-x-0 h-16 overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0 72C178 18 330 10 520 48C743 92 912 132 1142 74C1260 44 1350 34 1440 48V120H0V72Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#E5792E]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-[1.48rem] font-black leading-tight tracking-normal text-[#3A342F] sm:text-[2.25rem]">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-sm leading-relaxed text-[#6D6258] sm:text-base">
          {text}
        </p>
      ) : null}
    </header>
  );
}

function NewsSection() {
  return (
    <section id="news" className="bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#E5792E]">
              News
            </p>
            <h2 className="mt-2 text-[1.55rem] font-black leading-tight text-[#3A342F] sm:text-[2.2rem]">
              お知らせ
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden rounded-full border border-[#B8C7A4] px-5 py-2 text-sm font-black text-[#7B9257] sm:inline-flex"
          >
            ブログ一覧へ ›
          </a>
        </div>

        <BlogNewsPreviewClient initialPosts={blogPosts.slice(0, 3)} />

        <a
          href="/blog"
          className="mt-6 flex min-h-12 items-center justify-center rounded-full border border-[#B8C7A4] text-sm font-black text-[#7B9257] sm:hidden"
        >
          ブログ一覧へ
        </a>
      </div>
    </section>
  );
}

export default function TestPage() {
  return (
    <main className="bg-[#FFFDF8] text-[#3A342F]">
      <header className="nf-fade-up fixed inset-x-0 top-0 z-50 border-b border-[#EADCCF] bg-white/92 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-8">
          <a href="#top" className="leading-none">
            <span className="block text-[0.98rem] font-black tracking-[0.08em] text-[#D36F31] sm:text-[1.1rem]">
              NATURAL FITNESS
            </span>
            <span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.22em] text-[#8AA05F] sm:text-[0.5rem]">
              Private Personal Gym
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-black text-[#3A342F] lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-[#E86F23]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ReserveLink
              href="/reserve"
              eventLabel="home_header_reserve"
              className="hidden rounded-full bg-[#E86F23] px-5 py-2.5 text-sm font-black text-white shadow-[0_8px_18px_rgba(232,111,35,0.25)] transition hover:bg-[#cf5f1c] sm:inline-flex"
            >
              体験予約
            </ReserveLink>
            <details className="group relative lg:hidden">
              <summary className="list-none">
                <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#EADCCF] bg-white text-sm font-black text-[#E86F23] shadow-sm sm:h-11 sm:w-auto sm:px-4">
                  <span className="grid gap-1">
                    <span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" />
                    <span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" />
                    <span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" />
                  </span>
                  <span className="ml-2 hidden sm:inline">Menu</span>
                </span>
              </summary>
              <div className="fixed inset-x-4 top-16 z-[80] overflow-hidden rounded-[1.35rem] border border-[#EADCCF] bg-white p-2 shadow-[0_18px_46px_rgba(82,67,54,0.16)] sm:absolute sm:inset-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-64">
                {navItems.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block rounded-xl px-4 py-3 text-sm font-black text-[#3A342F] transition hover:bg-[#FFF4EA] hover:text-[#E86F23]"
                  >
                    {label}
                  </a>
                ))}
                <ReserveLink
                  href="/reserve"
                  eventLabel="home_menu_reserve"
                  className="mt-2 flex items-center justify-center rounded-xl bg-[#E86F23] px-4 py-3 text-sm font-black text-white"
                >
                  体験予約
                </ReserveLink>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-[#FFFDF8] pt-14 sm:pt-[4.5rem]">
        <div className="mx-auto grid max-w-[1440px] bg-[#FFFDF8] lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[58%_42%]">
          <div className="relative h-[47svh] min-h-[310px] max-h-[390px] overflow-hidden rounded-b-[2rem] bg-[#F3E8DE] sm:min-h-[520px] sm:max-h-none sm:rounded-none lg:min-h-[650px]">
            <Image
              src="/solution-movement.png"
              alt="NATURAL FITNESSのパーソナルトレーニング風景"
              fill
              priority
              className="nf-hero-zoom object-cover object-[50%_48%] lg:object-[48%_center]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-r from-transparent to-[#FFFDF8] lg:block" />
            <div className="pointer-events-none absolute bottom-1 left-1/2 z-10 h-44 w-[240%] -translate-x-1/2 overflow-hidden sm:-bottom-7 sm:h-60 sm:w-[200%] lg:-bottom-2 lg:h-64 lg:w-[175%]">
              <div className="nf-diagonal-marquee-track w-max">
                {Array.from({ length: 2 }).map((_, index) => (
                  <svg
                    key={index}
                    viewBox="0 0 2200 340"
                    className="inline-block h-44 w-[110rem] overflow-visible sm:h-60 sm:w-[150rem] lg:h-64 lg:w-[172rem]"
                    aria-hidden
                  >
                    <defs>
                      <path
                        id={`hero-wave-text-path-${index}`}
                        d="M-70 218 C 230 82 480 68 780 164 S 1260 318 1580 156 S 1940 76 2270 190"
                      />
                    </defs>
                    <text className="en fill-[#E86F23] text-[4rem] font-black tracking-normal drop-shadow-[0_5px_16px_rgba(255,255,255,0.48)] sm:text-[6.4rem] lg:text-[7.2rem]">
                      <textPath href={`#hero-wave-text-path-${index}`} startOffset="0%">
                        Discover a Stronger You with NATURAL FITNESS - Discover a Stronger You -
                      </textPath>
                    </text>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-0 flex items-center rounded-t-[2rem] bg-[#FFFDF8] px-5 pb-10 pt-9 shadow-[0_-14px_30px_rgba(82,67,54,0.06)] sm:mt-0 sm:px-12 sm:py-14 sm:shadow-none lg:px-16 lg:py-16">
            <LeafDecor className="-right-7 top-6 rotate-12 [--nf-rotate:12deg] sm:right-5 sm:top-10" />
            <div className="nf-fade-up relative z-10 w-full max-w-xl">
              <p className="mb-3 inline-flex rounded-full bg-[#F6EFE7] px-3 py-1 text-[0.68rem] font-black tracking-[0.16em] text-[#8AA05F] sm:hidden">
                OKAZAKI PERSONAL GYM
              </p>
              <h1 className="font-sans text-[2.05rem] font-black leading-[1.2] tracking-normal text-[#332F2B] sm:text-[4.1rem] lg:text-[4.25rem]">
                楽しく変われる
                <br />
                <span className="text-[#E86F23]">オトナの</span>
                <br />
                パーソナルジム
              </h1>
              <p className="mt-4 text-[0.9rem] font-black leading-relaxed text-[#514941] sm:mt-6 sm:text-xl">
                岡崎市本町通の完全個室ジム
                <br />
                ダイエット・姿勢改善・脚やせを
                <br className="hidden sm:block" />
                無理なくサポート
              </p>
              <ReserveLink
                href="/reserve"
                eventLabel="home_hero_reserve"
                className="nf-cta-breathe mt-6 inline-flex min-h-13 w-full max-w-[430px] items-center justify-center rounded-full bg-[#E86F23] px-8 py-4 text-base font-black text-white shadow-[0_16px_34px_rgba(232,111,35,0.26)] transition hover:bg-[#cf5f1c] sm:mt-8 sm:min-h-16 sm:py-0"
              >
                体験予約する
                <span className="ml-5 grid h-7 w-7 place-items-center rounded-full bg-white text-[#E86F23]">
                  ›
                </span>
              </ReserveLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-center">
          <div className="nf-reveal relative aspect-[4/3] overflow-hidden rounded-[1.7rem] rounded-tr-[4rem] bg-[#F5EFE7] shadow-[0_18px_50px_rgba(82,67,54,0.12)]">
            <Image
              src="/gallery-studio-interior.png"
              alt="NATURAL FITNESSのスタジオ内観"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="nf-reveal">
            <h2 className="text-[1.55rem] font-black leading-tight sm:text-[2.25rem]">
              <span className="text-[#E86F23]">岡崎市本町通</span>で通いやすい
              <br />
              完全個室パーソナルジム
            </h2>
            <p className="mt-4 text-sm font-medium leading-[1.9] text-[#6D6258] sm:mt-5 sm:text-base sm:leading-[2]">
              NATURAL FITNESSは、岡崎市本町通にある完全個室のパーソナルジムです。
              トレーニング・姿勢改善・生活習慣のサポートを組み合わせたアプローチで、
              ダイエット・姿勢改善・脚やせなど、一人ひとりのお悩みに寄り添いながら理想のカラダづくりをサポートします。
            </p>
            <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#EADCCF] bg-[#FFFDF8] sm:mt-8 sm:grid-cols-4">
              {localPoints.map(([title, text]) => (
                <div key={title} className="border-[#EADCCF] p-4 text-center even:border-l [&:nth-child(n+3)]:border-t sm:border-r sm:p-5 sm:[&:nth-child(n+3)]:border-t-0 last:sm:border-r-0">
                  <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#EFF3E7] text-[#7B9257] sm:h-11 sm:w-11">
                    ✓
                  </div>
                  <p className="mt-3 text-xs font-black leading-snug text-[#4A423A] sm:text-sm">{title}</p>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-[#8B8178]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div id="features" className="scroll-mt-24" />
      <WorriesSection variant="light" />

      <section id="goals" className="relative overflow-hidden bg-[#FFF7EF] px-5 py-14 sm:px-8 sm:py-24">
        <CurveDivider className="left-0 top-0 rotate-180" fill="#FFFFFF" />
        <div className="nf-blob-drift pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-[40%_60%_58%_42%/48%_42%_58%_52%] bg-[#E86F23]/10" />
        <div className="nf-blob-drift pointer-events-none absolute -left-28 bottom-10 h-80 w-80 rounded-[55%_45%_40%_60%/45%_58%_42%_55%] bg-[#8AA05F]/13" />
        <SectionTitle
          eyebrow="Purpose"
          title="目的別に選べるサポート"
        />
        <div className="relative z-10 mx-auto mt-8 grid max-w-6xl gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {goalPages.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="nf-card-motion nf-reveal group relative overflow-hidden rounded-[2rem] border border-[#EADCCF] bg-white shadow-[0_16px_42px_rgba(82,67,54,0.09)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-bl-[3rem] bg-[#F5EFE7] sm:aspect-[4/3] sm:rounded-bl-[3.5rem]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#8AA05F]">
                  {item.label}
                </span>
                <h3 className="mt-2 text-xl font-black text-[#3A342F]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#6D6258] sm:mt-3">
                  {item.text}
                </p>
                <span className="mt-5 inline-flex text-sm font-black text-[#E86F23]">
                  詳しく見る <span className="ml-2 transition group-hover:translate-x-1">›</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F6EFE7] px-5 py-16 sm:px-8 sm:py-24">
        <CurveDivider className="left-0 top-0 rotate-180" fill="#FFF7EF" />
        <CurveDivider className="bottom-0" fill="#FFFFFF" />
        <LeafDecor className="-left-2 bottom-8 -rotate-12 [--nf-rotate:-12deg]" />
        <LeafDecor className="-right-2 top-8 rotate-12 [--nf-rotate:12deg]" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div className="nf-reveal text-center lg:text-left">
          <p className="text-lg font-black text-[#4A423A]">
            そのお悩み、NATURAL FITNESSがサポートします！
          </p>
          <h2 className="mt-4 text-[1.65rem] font-black leading-tight tracking-[0.04em] text-[#3A342F] sm:text-[3rem] sm:tracking-[0.06em]">
            姿勢を整える視点 × パーソナルトレーニング × 習慣化サポート
          </h2>
          <p className="mt-5 max-w-3xl text-sm font-medium leading-[2] text-[#6D6258] sm:text-base">
            身体の土台を整え、正しい動きと続けやすい習慣を身につけることで、
            無理なく続けられ、リバウンドしにくいカラダづくりを目指します。
            「頑張る」よりも「続けられる」。運動が苦手な方でも安心して始められます。
          </p>
          </div>
          <div className="nf-float-soft relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[34%_66%_44%_56%/54%_36%_64%_46%] shadow-[0_18px_50px_rgba(82,67,54,0.16)]">
            <Image
              src="/solution-posture.png"
              alt="姿勢を整えるサポート"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 36vw"
            />
          </div>
        </div>
      </section>

      <section id="trial-flow" className="relative overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute right-0 top-10 h-72 w-40 rounded-l-full bg-[#F6EFE7]" aria-hidden />
        <SectionTitle
          eyebrow="Trial"
          title="初回体験の流れ"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-5">
          {trialSteps.map(([num, title, text, src]) => (
            <article
              key={num}
              className="nf-card-motion nf-reveal overflow-hidden rounded-[1.75rem] border border-[#EADCCF] bg-[#FFFDF8] shadow-[0_12px_30px_rgba(82,67,54,0.06)] odd:translate-y-0 lg:even:translate-y-8"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-br-[3rem] bg-[#F5EFE7] sm:aspect-[5/4]">
                <Image src={src} alt="" fill className="object-cover" sizes="220px" />
                <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[#E86F23] text-sm font-black text-white">
                  {num}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-[#3A342F]">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#6D6258]">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-[#F6EFE7] px-6 py-5 text-center">
          <p className="text-sm font-black leading-relaxed text-[#5F554C]">
            体験はカウンセリング込みで約60分。強い勧誘ではなく、今の体に合う進め方を一緒に確認します。
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FFF7EF] px-5 py-16 sm:px-8 sm:py-24">
        <CurveDivider className="left-0 top-0 rotate-180" fill="#FFFFFF" />
        <SectionTitle
          eyebrow="Difference"
          title="NATURAL FITNESSが選ばれる理由"
          text="岡崎市でパーソナルジムを探している方に、Natural Fitnessが選ばれている理由があります。"
        />
        <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-[#EADCCF] bg-white/90 p-3 shadow-[0_22px_62px_rgba(82,67,54,0.12)] sm:p-5">
          <div className="overflow-x-auto pb-2 pt-5">
            <div className="mx-auto min-w-[760px] max-w-4xl">
              <div className="grid grid-cols-[0.82fr_1.18fr_0.92fr_0.92fr] items-end gap-0 text-center text-xs font-black sm:text-sm">
                <div className="rounded-tl-2xl bg-[#7B9257] px-3 py-5 text-white">
                  比較項目
                </div>
                <div className="relative -mt-5 overflow-hidden rounded-t-[1.4rem] bg-gradient-to-b from-[#F6B184] via-[#E86F23] to-[#D96622] px-4 py-6 text-white shadow-[0_18px_34px_rgba(232,111,35,0.28)]">
                  <span className="relative z-10 block text-[1.05rem] leading-tight drop-shadow-sm">
                    NATURAL
                    <br />
                    FITNESS
                  </span>
                  <span className="relative z-10 mt-2 block text-[0.65rem] uppercase tracking-[0.18em] text-white/82">
                    Recommend
                  </span>
                  <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/18" />
                  <span className="absolute -bottom-10 left-4 h-20 w-20 rounded-full bg-white/12" />
                </div>
                <div className="bg-[#E7E3DE] px-3 py-5 text-[#5F554C]">
                  R社
                </div>
                <div className="rounded-tr-2xl bg-[#D6D1CB] px-3 py-5 text-[#5F554C]">
                  B社
                </div>
              </div>
              <div className="overflow-hidden rounded-b-[1.4rem] border border-t-0 border-[#EADCCF] bg-white">
                {comparisonRows.map(([label, natural, general, large], index) => (
                  <div
                    key={label}
                    className="grid grid-cols-[0.82fr_1.18fr_0.92fr_0.92fr] text-xs font-bold leading-relaxed text-[#6D6258] sm:text-sm"
                  >
                    <div
                      className={`flex min-h-[5.15rem] items-center justify-center border-t border-white/20 bg-[#7B9257] px-3 text-center font-black text-white ${
                        index === comparisonRows.length - 1 ? "rounded-bl-[1.2rem]" : ""
                      }`}
                    >
                      {label}
                    </div>
                    <div
                      className={`relative flex min-h-[5.15rem] items-center justify-center border-x border-[#E6C9B4] border-t border-[#F2D7C3] bg-gradient-to-r from-[#FFF3D7] via-[#FFE0A3] to-[#F6B184] px-4 text-center font-black text-[#9E4F1E] shadow-[inset_10px_0_18px_rgba(255,255,255,0.28)] ${
                        label === "月額の金額" ? "text-lg sm:text-2xl" : "text-sm sm:text-base"
                      }`}
                    >
                      <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E86F23] text-xs text-white">
                        ✓
                      </span>
                      <span>{natural}</span>
                    </div>
                    <div className="flex min-h-[5.15rem] items-center justify-center border-t border-[#EADCCF] bg-[#FAF8F5] px-3 text-center">
                      {general}
                    </div>
                    <div
                      className={`flex min-h-[5.15rem] items-center justify-center border-l border-t border-[#EADCCF] bg-[#F3F0EC] px-3 text-center ${
                        index === comparisonRows.length - 1 ? "rounded-br-[1.2rem]" : ""
                      }`}
                    >
                      {large}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-4 rounded-[1.4rem] bg-[#FFF7EF] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="text-sm font-black leading-relaxed text-[#5F554C]">
              価格だけでなく、完全個室・マンツーマン・目的別サポートまで含めて、続けやすい通い方をご提案します。
            </p>
            <a
              href="/price"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#E86F23] px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(232,111,35,0.22)] transition hover:bg-[#cf5f1c]"
            >
              料金を見る
              <span className="ml-2">›</span>
            </a>
          </div>
        </div>
      </section>

      <section id="price" className="bg-white px-5 py-14 sm:px-8 sm:py-20">
        <SectionTitle title="目的に合わせて選べる2つのコース" />
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
          {plans.map((plan) => {
            const isOrange = plan.color === "orange";
            return (
              <article
                key={plan.name}
                className={`grid overflow-hidden rounded-2xl border shadow-[0_14px_44px_rgba(82,67,54,0.09)] sm:grid-cols-[0.86fr_1fr] ${
                  isOrange ? "border-[#EADCCF]" : "border-[#D6DEC7]"
                }`}
              >
                <div className="relative min-h-[260px]">
                  <Image
                    src={plan.src}
                    alt={plan.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 32vw"
                  />
                </div>
                <div className="bg-[#FFFDF8] p-7">
                  <span
                    className={`inline-flex rounded-full px-4 py-1.5 text-xs font-black ${
                      isOrange ? "bg-[#E86F23] text-white" : "bg-[#7B9257] text-white"
                    }`}
                  >
                    {plan.target}
                  </span>
                  <h3
                    className={`mt-5 text-2xl font-black ${
                      isOrange ? "text-[#E86F23]" : "text-[#6E884E]"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm font-black text-[#6D6258]">{plan.purpose}</p>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-[#6D6258]">
                    {plan.description}
                  </p>
                  <div className="mt-5 flex gap-2 text-sm font-black text-[#6D6258]">
                    <span className="rounded-md border border-[#EADCCF] bg-white px-3 py-1">
                      {plan.duration}
                    </span>
                    <span className="rounded-md border border-[#EADCCF] bg-white px-3 py-1">
                      {plan.count}
                    </span>
                  </div>
                  <p
                    className={`mt-5 text-[2.15rem] font-black tabular-nums ${
                      isOrange ? "text-[#E86F23]" : "text-[#6E884E]"
                    }`}
                  >
                    {plan.price}
                    <span className="ml-1 text-base">円（税込）</span>
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-[#EADCCF] pt-5 text-sm font-medium text-[#6D6258]">
                    {plan.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className={isOrange ? "text-[#E86F23]" : "text-[#7B9257]"}>
                          ◎
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/price"
                    className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-sm font-black text-white transition sm:w-auto ${
                      isOrange
                        ? "bg-[#E86F23] hover:bg-[#cf5f1c]"
                        : "bg-[#7B9257] hover:bg-[#687d49]"
                    }`}
                  >
                    詳しくはこちら
                    <span className="ml-2">›</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-7 max-w-6xl overflow-hidden rounded-2xl border border-[#F1D8C5] bg-[#FFF7EF] shadow-[0_14px_38px_rgba(82,67,54,0.08)]">
          <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
            <div>
              <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#E86F23] shadow-sm">
                Option
              </span>
              <h3 className="mt-4 text-xl font-black text-[#3A342F] sm:text-2xl">
                ダイエットサポート
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#6D6258]">
                食事や生活習慣を整えたい方に。毎日の取り組みを無理なく続けられるようサポートします。
              </p>
            </div>
            <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-sm">
              <p className="text-xs font-black text-[#8AA05F]">月額オプション</p>
              <p className="mt-1 text-[2rem] font-black tabular-nums text-[#E86F23]">
                10,000
                <span className="ml-1 text-base">円（税込）</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="voice" className="bg-[#FFFDF8] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
          <h2 className="text-[1.65rem] font-black text-[#3A342F] sm:text-[2.1rem]">
            お客様の声・結果
          </h2>
          <a
            href="#voice"
            className="hidden rounded-full border border-[#B8C7A4] px-5 py-2 text-sm font-black text-[#7B9257] sm:inline-flex"
          >
            もっと見る ›
          </a>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-2">
          {voices.map((voice) => (
            <article
              key={voice.title}
              className="grid gap-5 rounded-2xl border border-[#EADCCF] bg-white p-5 shadow-[0_12px_38px_rgba(82,67,54,0.08)] sm:grid-cols-[0.9fr_1fr]"
            >
              <div className="grid grid-cols-2 gap-3">
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#F5EFE7]">
                    <Image src={voice.before} alt="Before" fill className="object-cover" sizes="180px" />
                  </div>
                  <figcaption className="mt-2 text-center text-xs font-black text-[#8B8178]">
                    Before
                  </figcaption>
                </figure>
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#F5EFE7]">
                    <Image src={voice.after} alt="After" fill className="object-cover" sizes="180px" />
                  </div>
                  <figcaption className="mt-2 text-center text-xs font-black text-[#E86F23]">
                    After
                  </figcaption>
                </figure>
              </div>
              <div>
                <span className="inline-flex rounded-full bg-[#E86F23] px-4 py-1 text-sm font-black text-white">
                  {voice.badge}
                </span>
                <h3 className="mt-4 text-xl font-black leading-snug text-[#3A342F]">
                  {voice.title}
                </h3>
                <p className="mt-3 text-xs font-black text-[#8B8178]">{voice.profile}</p>
                <p className="mt-4 text-sm font-medium leading-relaxed text-[#6D6258]">
                  {voice.text}
                </p>
                <p className="mt-4 text-[0.68rem] text-[#AAA19A]">
                  ※効果には個人差があります
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="trainer" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-[#EADCCF] bg-[#FFFDF8] shadow-[0_14px_44px_rgba(82,67,54,0.09)] lg:grid-cols-[0.9fr_1.35fr]">
          <div className="relative min-h-[320px]">
            <Image
              src="/trainer.png"
              alt="トレーナー 渡邉亮太"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="grid gap-7 p-7 sm:p-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#E5792E]">
                Trainer
              </p>
              <h2 className="mt-3 text-[1.85rem] font-black leading-tight text-[#3A342F] sm:text-[2.4rem]">
                トレーナー紹介
              </h2>
              <p className="mt-5 text-lg font-black text-[#3A342F]">渡邉 亮太</p>
              <p className="mt-4 text-sm font-medium leading-[2] text-[#6D6258]">
                一人ひとりの体力やお悩みに寄り添い、無理なく続けられるトレーニングを大切にしています。
              </p>
              <p className="mt-4 text-sm font-medium leading-[2] text-[#6D6258]">
                「変わりたいけど、自分にできるか不安」
                そんな方でも安心して始められるよう、丁寧にサポートします。
              </p>
              <a
                href="/trainer"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#E86F23] px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(232,111,35,0.22)] transition hover:bg-[#cf5f1c]"
              >
                トレーナー詳細を見る
                <span className="ml-2">›</span>
              </a>
            </div>
            <ul className="space-y-3 rounded-2xl border border-[#EADCCF] bg-white p-5 text-sm font-black text-[#6D6258]">
              {trainerPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EFF3E7] text-[#7B9257]">
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <NewsSection />

      <section id="access" className="bg-white px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[1.65rem] font-black text-[#3A342F] sm:text-[2.1rem]">
            アクセス・店舗情報
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1fr]">
            <div className="grid gap-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F5EFE7]">
                  <Image src="/gallery-exterior.png" alt="店舗外観" fill className="object-cover" sizes="280px" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F5EFE7]">
                  <Image src="/gallery-studio-interior.png" alt="スタジオ内観" fill className="object-cover" sizes="280px" />
                </div>
              </div>
              <div className="rounded-2xl border border-[#EADCCF] bg-[#FFFDF8] p-6">
                <p className="text-sm font-black text-[#E86F23]">NATURAL FITNESS</p>
                <p className="mt-2 text-lg font-black text-[#3A342F]">愛知県岡崎市本町通2丁目3 鳥居ビル1F</p>
                <dl className="mt-5 grid gap-3 text-sm font-medium text-[#6D6258]">
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 font-black text-[#7B9257]">最寄り</dt>
                    <dd>東岡崎駅より徒歩圏内</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 font-black text-[#7B9257]">営業時間</dt>
                    <dd>11:00〜20:00</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 font-black text-[#7B9257]">定休日</dt>
                    <dd>不定休</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 font-black text-[#7B9257]">駐車場</dt>
                    <dd>タカラパーキング / 駐車場サービス券あり</dd>
                  </div>
                </dl>
                <ReserveLink
                  href="/reserve"
                  eventLabel="home_access_reserve"
                  className="mt-6 inline-flex rounded-lg bg-[#7B9257] px-7 py-3 text-sm font-black text-white transition hover:bg-[#677b49]"
                >
                  アクセス詳細を見る ›
                </ReserveLink>
              </div>
            </div>
            <div className="min-h-[360px] overflow-hidden rounded-2xl border border-[#EADCCF] bg-[#F5EFE7]">
              <iframe
                title="NATURAL FITNESSの地図"
                src={mapsSrc}
                className="h-full min-h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#FFFDF8] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
          <h2 className="text-[1.65rem] font-black text-[#3A342F] sm:text-[2.1rem]">
            よくあるご質問
          </h2>
          <a
            href="#faq"
            className="hidden rounded-full border border-[#B8C7A4] px-5 py-2 text-sm font-black text-[#7B9257] sm:inline-flex"
          >
            すべてのFAQを見る ›
          </a>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-2">
          {faqItems.map(([question, answer]) => (
            <details key={question} className="group rounded-xl border border-[#EADCCF] bg-white px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-[#3A342F]">
                <span>
                  <span className="mr-3 text-[#E86F23]">Q</span>
                  {question}
                </span>
                <span className="text-[#7B9257] group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 pl-7 text-sm font-medium leading-relaxed text-[#6D6258]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#E86F23] px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-[1.7rem] font-black leading-tight sm:text-[2.4rem]">
              まずは体験から始めてみませんか？
            </h2>
            <p className="mt-4 max-w-3xl text-sm font-bold leading-relaxed text-white/88 sm:text-base">
              ダイエット・姿勢改善・脚やせ。
              あなたの目的に合わせて、無理なく続けられる方法をご提案します。
              岡崎市でパーソナルジムをお探しの方は、NATURAL FITNESSへお気軽にご相談ください。
            </p>
          </div>
          <ReserveLink
            href="/reserve"
            eventLabel="home_final_reserve"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-8 text-base font-black text-[#E86F23] transition hover:bg-[#FFF4EA] sm:w-auto"
          >
            体験予約する
            <span className="ml-4">›</span>
          </ReserveLink>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#3A342F] px-5 pb-10 pt-14 text-white sm:px-8 sm:pt-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#E86F23]/20" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr_0.8fr]">
          <div>
            <p className="text-xl font-black tracking-[0.08em] text-[#F6B184]">
              NATURAL FITNESS
            </p>
            <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.24em] text-[#B8C7A4]">
              Private Personal Gym
            </p>
            <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-white/72">
              岡崎市本町通の完全個室パーソナルジム。ダイエット・姿勢改善・脚やせを、無理なく続けられる形でサポートします。
            </p>
          </div>
          <div>
            <p className="text-sm font-black text-[#F6B184]">店舗情報</p>
            <dl className="mt-4 grid gap-3 text-sm text-white/76">
              <div>
                <dt className="font-black text-white">住所</dt>
                <dd className="mt-1">愛知県岡崎市本町通2丁目3 鳥居ビル1F</dd>
              </div>
              <div>
                <dt className="font-black text-white">営業時間</dt>
                <dd className="mt-1">11:00〜20:00 / 不定休</dd>
              </div>
              <div>
                <dt className="font-black text-white">駐車場</dt>
                <dd className="mt-1">タカラパーキング サービス券あり</dd>
              </div>
            </dl>
          </div>
          <div>
            <p className="text-sm font-black text-[#F6B184]">メニュー</p>
            <nav className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-white/76 lg:grid-cols-1">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} className="transition hover:text-[#F6B184]">
                  {label}
                </a>
              ))}
            </nav>
            <ReserveLink
              href="/reserve"
              eventLabel="home_footer_reserve"
              className="mt-6 inline-flex rounded-full bg-[#E86F23] px-6 py-3 text-sm font-black text-white transition hover:bg-[#cf5f1c]"
            >
              体験予約する
            </ReserveLink>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/12 pt-6 text-xs text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© NATURAL FITNESS</p>
          <p>Okazaki Personal Gym</p>
        </div>
      </footer>
    </main>
  );
}

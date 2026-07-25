import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, Heart, MessageCircle, PersonStanding } from "lucide-react";

const title = "トレーナー紹介｜岡崎市のパーソナルジム NATURAL FITNESS";
const description =
  "NATURAL FITNESSトレーナー渡邉亮太の紹介ページ。一人ひとりの体力や悩みに寄り添い、無理なく続けられる身体づくりをサポートします。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://natural-fitness-gym.jp/trainer" },
  openGraph: {
    title,
    description,
    url: "https://natural-fitness-gym.jp/trainer",
    images: [
      {
        url: "https://natural-fitness-gym.jp/trainer.png",
        width: 768,
        height: 1024,
        alt: "NATURAL FITNESS トレーナー 渡邉亮太",
      },
    ],
  },
};

const navItems = [
  ["トップ", "/"],
  ["特徴", "/#features"],
  ["悩み別", "/#goals"],
  ["体験の流れ", "/#trial-flow"],
  ["料金", "/price"],
  ["お客様の声", "/#voice"],
  ["トレーナー", "/trainer"],
  ["アクセス", "/#access"],
  ["FAQ", "/#faq"],
];

const approach = [
  {
    number: "01",
    icon: MessageCircle,
    title: "まずは、じっくり話を聞く",
    text: "目標だけでなく、運動経験や生活リズム、不安に感じていることまで伺います。話しやすい空気づくりを大切にしています。",
  },
  {
    number: "02",
    icon: PersonStanding,
    title: "今の身体に合わせる",
    text: "姿勢や身体の使い方を確認し、その日の体調にも合わせて内容を調整。いきなり無理な運動を行うことはありません。",
  },
  {
    number: "03",
    icon: Heart,
    title: "続けられる方法を一緒に探す",
    text: "短期間だけ頑張るのではなく、日常に無理なくなじむ方法を考えます。小さな変化も一緒に確認しながら進めます。",
  },
];

const supportPoints = [
  "運動が初めての方にも、動きをわかりやすく説明",
  "姿勢や身体の使い方を細かく確認",
  "体力やその日のコンディションに合わせて調整",
  "食事や生活習慣も、続けやすさを大切にサポート",
];

export default function TrainerPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "渡邉 亮太",
    jobTitle: "パーソナルトレーナー",
    worksFor: {
      "@type": "HealthClub",
      name: "NATURAL FITNESS",
      url: "https://natural-fitness-gym.jp",
    },
    image: "https://natural-fitness-gym.jp/trainer.png",
    url: "https://natural-fitness-gym.jp/trainer",
  };

  return (
    <main className="overflow-hidden bg-[#FFFDF8] text-[#3A342F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <header className="sticky top-0 z-50 border-b border-[#EADCCF] bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="leading-none">
            <span className="block text-[0.98rem] font-black tracking-[0.08em] text-[#D36F31]">
              NATURAL FITNESS
            </span>
            <span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
              Private Personal Gym
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-black lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`transition hover:text-[#E86F23] ${
                  href === "/trainer" ? "text-[#E86F23]" : ""
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/reserve"
              className="hidden rounded-full bg-[#E86F23] px-5 py-2.5 text-sm font-black text-white shadow-[0_8px_18px_rgba(232,111,35,0.25)] transition hover:bg-[#cf5f1c] sm:inline-flex"
            >
              体験予約
            </a>
            <details className="group relative lg:hidden">
              <summary className="list-none">
                <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#EADCCF] bg-white shadow-sm sm:h-11 sm:w-auto sm:px-4">
                  <span className="grid gap-1">
                    <span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" />
                    <span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" />
                    <span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" />
                  </span>
                  <span className="ml-2 hidden text-sm font-black text-[#E86F23] sm:inline">
                    Menu
                  </span>
                </span>
              </summary>
              <div className="fixed inset-x-4 top-16 z-[80] overflow-hidden rounded-[1.35rem] border border-[#EADCCF] bg-white p-2 shadow-[0_18px_46px_rgba(82,67,54,0.16)] sm:absolute sm:inset-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-64">
                {navItems.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className={`block rounded-xl px-4 py-3 text-sm font-black transition hover:bg-[#FFF4EA] hover:text-[#E86F23] ${
                      href === "/trainer"
                        ? "bg-[#FFF4EA] text-[#E86F23]"
                        : "text-[#3A342F]"
                    }`}
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="/reserve"
                  className="mt-2 flex items-center justify-center rounded-xl bg-[#E86F23] px-4 py-3 text-sm font-black text-white"
                >
                  体験予約
                </a>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section className="relative isolate flex min-h-[17rem] items-center justify-center overflow-hidden bg-[#3A342F] sm:min-h-[26rem]">
        <Image
          src="/solution-movement.png"
          alt="トレーナーがフォームを確認しながら行うパーソナルトレーニング"
          fill
          priority
          className="object-cover object-center opacity-80 brightness-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,111,35,0.12),transparent_45%)]" />
        <div className="relative z-10 px-5 text-center text-white">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.34em] text-white/80">
            Natural Fitness
          </p>
          <h1 className="mt-4 text-[4rem] font-black uppercase leading-none tracking-normal drop-shadow-[0_8px_22px_rgba(0,0,0,0.22)] sm:text-[7rem]">
            Trainer
          </h1>
          <p className="mt-3 text-xl font-black tracking-[0.18em] sm:text-2xl">
            トレーナー
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8AA05F]">
              Message
            </p>
            <h2 className="mt-4 text-[2rem] font-black leading-[1.45] sm:text-[2.65rem]">
              <span className="block whitespace-nowrap">
                「自分にできるかな」
              </span>
              <span className="block">その不安ごと、</span>
              <span className="block">お聞かせください。</span>
            </h2>
            <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F5EEE5] shadow-[0_20px_54px_rgba(82,67,54,0.12)] sm:mt-10">
              <Image
                src="/trainer.png"
                alt="NATURAL FITNESS トレーナー 渡邉亮太"
                fill
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3A342F]/65 to-transparent px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">
                  Personal Trainer
                </p>
                <p className="mt-1 text-2xl font-black">渡邉 亮太</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 text-[0.98rem] font-medium leading-[2.1] text-[#665D55] sm:text-base">
            <p>
              運動を始めたいと思っても、何から取り組めばいいのかわからなかったり、続けられるか不安に感じたりすることがあると思います。
            </p>
            <p>
              NATURAL FITNESSでは、最初から難しいことやきついことを求めません。まずは今のお悩みや目標を伺い、姿勢や身体の使い方を確認しながら、その方に合う方法を一緒に探していきます。
            </p>
            <p>
              小さな変化を積み重ね、「来てよかった」「これなら続けられそう」と感じてもらえる時間をつくること。それが、トレーナーとして大切にしていることです。
            </p>
            <div className="pt-2 text-right">
              <p className="text-sm font-bold text-[#8A8077]">NATURAL FITNESS</p>
              <p className="mt-1 text-xl font-black text-[#3A342F]">渡邉 亮太</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3D8C4] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#E86F23]">
              Coaching Approach
            </p>
            <h2 className="mt-4 text-[2rem] font-black text-[#3A342F] sm:text-[3rem]">
              指導で大切にしている3つのこと
            </h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {approach.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.number}
                  className="relative overflow-hidden rounded-[1.75rem] border border-white/45 bg-[#FFFDF8] p-7 shadow-[0_16px_44px_rgba(112,48,12,0.16)] sm:p-8"
                >
                  <span className="absolute right-5 top-3 text-[4.5rem] font-black leading-none text-[#E86F23]/10">
                    {item.number}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#E86F23]">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-white"
                      strokeWidth={2.4}
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-[#3A342F]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-[1.9] text-[#6D6258]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#EADCCF] bg-white shadow-[0_20px_60px_rgba(82,67,54,0.09)] lg:grid-cols-2">
          <div className="relative min-h-[23rem] overflow-hidden">
            <Image
              src="/solution-movement.png"
              alt="フォームを確認しながら行うパーソナルトレーニング"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A342F]/25 to-transparent" />
          </div>
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#E86F23]">
              Personal Support
            </p>
            <h2 className="mt-4 text-[1.8rem] font-black leading-[1.45] sm:text-[2.5rem]">
              一人ひとりに合わせて、
              <br />
              丁寧にサポートします
            </h2>
            <ul className="mt-8 space-y-4">
              {supportPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-4 rounded-2xl bg-[#FFF7EF] px-4 py-4 text-sm font-bold leading-relaxed text-[#514942]"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#8AA05F] text-white">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F5EEE5] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8AA05F]">
              For Beginners
            </p>
            <h2 className="mt-4 text-[2rem] font-black leading-[1.45] sm:text-[3rem]">
              運動が苦手でも、
              <br />
              まったく問題ありません。
            </h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-[2] text-[#665D55]">
              体験では、カウンセリングと姿勢チェックを行い、今の身体に合うトレーニングを少しずつ試します。うまくできるかよりも、安心して身体を動かせることを大切にしています。
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-[#EADCCF] bg-white p-7 shadow-[0_16px_44px_rgba(82,67,54,0.07)] sm:p-9">
            <p className="text-sm font-black text-[#E86F23]">こんな方もお気軽に</p>
            <ul className="mt-5 space-y-4 text-sm font-bold text-[#514942]">
              {[
                "ジムに通った経験がない",
                "何をしても長続きしなかった",
                "人目を気にせず運動したい",
                "自分に合う方法を知りたい",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#E86F23]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#E86F23] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">
              First Trial
            </p>
            <h2 className="mt-4 text-[1.9rem] font-black leading-tight sm:text-[2.8rem]">
              まずは、今のお悩みをお聞かせください
            </h2>
            <p className="mt-4 max-w-3xl text-sm font-bold leading-relaxed text-white/85 sm:text-base">
              無理な勧誘はありません。身体の状態を確認し、あなたに合う進め方を一緒に考えます。
            </p>
          </div>
          <a
            href="/reserve"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-black text-[#E86F23] shadow-[0_14px_32px_rgba(106,49,16,0.18)] transition hover:-translate-y-0.5"
          >
            初回体験を予約する
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>
        </div>
      </section>

      <footer className="bg-[#3A342F] px-5 py-10 text-white sm:px-8 sm:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <a href="/" className="inline-block leading-none">
              <span className="block text-[1.05rem] font-black tracking-[0.1em] text-[#F6B184]">
                NATURAL FITNESS
              </span>
              <span className="mt-1 block text-[0.5rem] font-black uppercase tracking-[0.24em] text-white/60">
                Private Personal Gym
              </span>
            </a>
            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/70">
              愛知県岡崎市本町通2丁目3 鳥居ビル1F。完全個室で、姿勢改善・ボディメイク・脚やせ・運動習慣づくりをサポートします。
            </p>
          </div>
          <nav className="grid gap-3 text-sm font-black text-white/80 sm:grid-cols-2 lg:min-w-[22rem]">
            <a href="/">トップ</a>
            <a href="/price">料金</a>
            <a href="/#goals">お悩み別</a>
            <a href="/#voice">お客様の声</a>
            <a href="/#access">アクセス</a>
            <a href="/reserve">体験予約</a>
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-5 text-xs font-bold text-white/45">
          © NATURAL FITNESS
        </div>
      </footer>

      <a
        href="/reserve"
        className="fixed inset-x-4 bottom-4 z-40 flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#E86F23] px-6 text-sm font-black text-white shadow-[0_16px_36px_rgba(94,45,14,0.3)] sm:hidden"
      >
        初回体験を予約する
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </a>
    </main>
  );
}

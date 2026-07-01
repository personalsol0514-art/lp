import type { Metadata } from "next";
import Image from "next/image";

const title = "岡崎市のパーソナルジム料金｜NATURAL FITNESS";
const description =
  "岡崎市本町通の完全個室パーソナルジムNATURAL FITNESSの料金ページ。根本改善コース、メンテナンスコース、ダイエットサポートをご案内します。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://natural-fitness-gym.jp/price" },
};

type Plan = {
  name: string;
  label: string;
  time: string;
  price: string;
  extra?: { count: string; price: string };
  lead: string;
  image: string;
  imageAlt: string;
  points: string[];
};

const plans: Plan[] = [
  {
    name: "根本改善コース",
    label: "Body Make",
    time: "1回50分 / 月4回",
    price: "24,000",
    extra: { count: "月8回", price: "44,000" },
    lead: "ダイエット・姿勢改善・脚やせなど、身体をしっかり変えたい方におすすめ。",
    image: "/solution-movement.png",
    imageAlt: "根本改善コースのパーソナルトレーニング",
    points: ["姿勢・動きのクセをチェック", "目的別トレーニング", "生活習慣までサポート"],
  },
  {
    name: "メンテナンスコース",
    label: "Maintenance",
    time: "1回30分 / 月4回",
    price: "14,400",
    lead: "忙しい方や、無理なく運動習慣を続けたい方におすすめ。",
    image: "/solution-daily.png",
    imageAlt: "メンテナンスコースのトレーニング",
    points: ["身体のメンテナンス", "運動習慣づくり", "短時間で続けやすい"],
  },
];

const options = [
  {
    name: "ダイエットサポート",
    price: "10,000",
    unit: "円 / 月",
    text: "食事や生活習慣も整えたい方向けのオプションです。無理な制限ではなく、続けやすい考え方を大切にします。",
  },
  {
    name: "整体",
    price: "月2回 10,000円 / 月4回 19,800円",
    unit: "",
    text: "身体の張りや姿勢のクセが気になる方向けに、トレーニングと組み合わせて整えやすい身体づくりをサポートします。",
  },
];

const navItems = [
  ["トップ", "/"],
  ["特徴", "/#features"],
  ["悩み別", "/#goals"],
  ["体験の流れ", "/#trial-flow"],
  ["料金", "/price"],
  ["お客様の声", "/#voice"],
  ["トレーナー", "/#trainer"],
  ["アクセス", "/#access"],
  ["FAQ", "/#faq"],
];

const faq = [
  {
    question: "どちらのコースを選べばいいですか？",
    answer:
      "体型や姿勢をしっかり変えたい方は根本改善コース、運動習慣や身体のメンテナンス目的の方はメンテナンスコースがおすすめです。",
  },
  {
    question: "ダイエットサポートは追加できますか？",
    answer:
      "はい。食事や生活習慣も整えたい方向けに、月10,000円のダイエットサポートをご用意しています。",
  },
  {
    question: "整体だけの利用はできますか？",
    answer:
      "整体の利用可否や内容は身体の状態によってご案内します。まずは体験時にお悩みをご相談ください。",
  },
  {
    question: "月4回以外の通い方は相談できますか？",
    answer:
      "目的や生活リズムに合わせてご相談いただけます。まずは体験で今の身体の状態と通いやすい頻度を確認します。",
  },
  {
    question: "支払い方法は何がありますか？",
    answer:
      "ご利用可能なお支払い方法は体験時にご案内します。必要な場合は事前にお問い合わせください。",
  },
  {
    question: "ペア料金はありますか？",
    answer:
      "はい。ペア料金は50分メニューのみ対応しており、月4回36,000円（税込）です。ご家族やご友人と一緒に通いたい方におすすめです。",
  },
];

export default function PricePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-[#FFFDF8] text-[#3A342F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          <nav className="hidden items-center gap-7 text-sm font-black text-[#3A342F] lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`transition hover:text-[#E86F23] ${
                  href === "/price" ? "text-[#E86F23]" : ""
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
                    className={`block rounded-xl px-4 py-3 text-sm font-black transition hover:bg-[#FFF4EA] hover:text-[#E86F23] ${
                      href === "/price" ? "bg-[#FFF4EA] text-[#E86F23]" : "text-[#3A342F]"
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

      <section className="relative isolate flex min-h-[20rem] items-center justify-center overflow-hidden bg-[#3A342F] sm:min-h-[30rem]">
        <Image
          src="/trial-plan-proposal.png"
          alt="NATURAL FITNESSの料金相談イメージ"
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
            Price
          </h1>
          <p className="mt-3 text-xl font-black tracking-[0.18em] sm:text-2xl">
            料金
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#E86F23]">
            Personal Training Menu
          </p>
          <h2 className="mt-3 text-[1.9rem] font-black leading-tight tracking-normal sm:text-[3rem]">
            目的に合わせて選べる
            <br className="sm:hidden" />
            2つのコース
          </h2>

          <article className="mt-10 overflow-hidden rounded-[1.8rem] border border-[#EADCCF] bg-white text-left shadow-[0_18px_54px_rgba(82,67,54,0.09)]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[15rem] overflow-hidden bg-[#F6EFE7]">
                <Image
                  src="/trial-counseling.png"
                  alt="初回体験のカウンセリング"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute left-4 top-4 rounded-full bg-[#E86F23] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                  Trial
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
                  First Trial
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#3A342F] sm:text-3xl">
                  初回体験
                </h3>
                <p className="mt-2 text-sm font-black text-[#6D6258]">
                  カウンセリング込み 約60分
                </p>
                <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <div>
                    <p className="text-xs font-black text-[#8B8178]">
                      通常価格
                    </p>
                    <p className="text-2xl font-black leading-none text-[#8B8178] line-through decoration-[#E86F23] decoration-2">
                      2,980円
                    </p>
                  </div>
                  <div>
                    <p className="inline-flex rounded-full bg-[#E86F23] px-3 py-1 text-xs font-black text-white">
                      今だけ
                    </p>
                    <div className="mt-1 flex items-end gap-2">
                      <span className="text-[3.5rem] font-black leading-none tracking-normal text-[#E86F23]">
                        0
                      </span>
                      <span className="pb-2 text-sm font-black text-[#3A342F]">
                        円（税込）
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm font-medium leading-relaxed text-[#6D6258]">
                  まずは現在の身体の状態やお悩みを確認し、姿勢チェックと体験トレーニングを行います。強い勧誘ではなく、今の身体に合う進め方を一緒に確認します。
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {["カウンセリング", "姿勢チェック", "体験トレーニング", "プラン提案"].map(
                    (item) => (
                      <li
                        key={item}
                        className="rounded-2xl bg-[#FFF7EF] px-4 py-3 text-sm font-black text-[#4A423A]"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </article>

          <div className="mt-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#EADCCF]" />
            <div className="rounded-full bg-[#3A342F] px-5 py-2 text-center text-xs font-black uppercase tracking-[0.2em] text-white">
              Monthly Plan
            </div>
            <div className="h-px flex-1 bg-[#EADCCF]" />
          </div>
          <h3 className="mt-5 text-center text-[1.55rem] font-black leading-tight text-[#3A342F] sm:text-[2.2rem]">
            月額コース
          </h3>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className="overflow-hidden rounded-[1.8rem] border border-[#EADCCF] bg-white text-left shadow-[0_18px_54px_rgba(82,67,54,0.09)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#F6EFE7]">
                  <Image
                    src={plan.image}
                    alt={plan.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A342F]/38 to-transparent" />
                </div>
                <div className="bg-[#F6EFE7] px-6 py-5">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
                    {plan.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-[#3A342F]">
                    {plan.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm font-black text-[#6D6258]">
                    {plan.time}
                  </p>
                  <div className="mt-5 flex items-end gap-2">
                    {plan.extra ? (
                      <span className="pb-1 text-sm font-black text-[#8B8178]">
                        月4回
                      </span>
                    ) : null}
                    <span className="text-[3.5rem] font-black leading-none tracking-normal text-[#E86F23]">
                      {plan.price}
                    </span>
                    <span className="pb-2 text-sm font-black text-[#3A342F]">
                      円（税込）
                    </span>
                  </div>
                  {plan.extra ? (
                    <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#FFF7EF] px-4 py-3">
                      <span className="text-sm font-black text-[#3A342F]">
                        {plan.extra.count}
                      </span>
                      <span className="flex items-end gap-1">
                        <span className="text-2xl font-black leading-none text-[#E86F23]">
                          {plan.extra.price}
                        </span>
                        <span className="text-xs font-black text-[#3A342F]">
                          円（税込）
                        </span>
                      </span>
                    </div>
                  ) : null}
                  <p className="mt-5 text-sm font-medium leading-relaxed text-[#6D6258]">
                    {plan.lead}
                  </p>
                  <ul className="mt-6 grid gap-2">
                    {plan.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-2xl bg-[#FFF7EF] px-4 py-3 text-sm font-black text-[#4A423A]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <article className="mt-6 overflow-hidden rounded-[1.8rem] border border-[#EADCCF] bg-white text-left shadow-[0_18px_54px_rgba(82,67,54,0.09)]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative min-h-[14rem] overflow-hidden bg-[#F6EFE7]">
                <Image
                  src="/trial-counseling.png"
                  alt="ペア料金のパーソナルトレーニング相談"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A342F]/42 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-[#8AA05F] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                  Pair Plan
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#8AA05F]">
                  Pair Training
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#3A342F] sm:text-3xl">
                  ペア料金
                </h3>
                <p className="mt-2 text-sm font-black text-[#6D6258]">
                  1回50分 / 月4回
                </p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-[3.5rem] font-black leading-none tracking-normal text-[#E86F23]">
                    36,000
                  </span>
                  <span className="pb-2 text-sm font-black text-[#3A342F]">
                    円（税込）
                  </span>
                </div>
                <p className="mt-2 inline-flex rounded-full bg-[#FFF7EF] px-4 py-2 text-sm font-black text-[#E86F23]">
                  1人あたり 18,000円（税込）
                </p>
                <p className="mt-5 text-sm font-medium leading-relaxed text-[#6D6258]">
                  ご家族やご友人と一緒に通いたい方向けのペアプランです。50分メニューのみ対応しています。
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {["50分メニューのみ", "月4回", "2名で通える", "通常月額の1.5倍"].map(
                    (item) => (
                      <li
                        key={item}
                        className="rounded-2xl bg-[#FFF7EF] px-4 py-3 text-sm font-black text-[#4A423A]"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </article>

          <section className="mt-10 rounded-[1.8rem] border border-[#EADCCF] bg-white p-6 text-center shadow-[0_18px_54px_rgba(82,67,54,0.08)] sm:p-8">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#E86F23]">
              Included Service
            </p>
            <h3 className="mt-3 text-[1.55rem] font-black leading-tight text-[#3A342F] sm:text-[2.2rem]">
              料金に含まれるもの
            </h3>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "パーソナルトレーニング",
                "トレーニング合間の食事の相談",
                "カウンセリング",
                "完全マンツーマン",
                "完全個室",
                "水",
                "プロテイン",
                "おしぼり",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#EADCCF] bg-[#FFF7EF] px-5 py-5 text-base font-black text-[#E86F23]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 rounded-[1.8rem] border border-[#EADCCF] bg-[#FFF7EF] p-6 text-left text-[#3A342F] shadow-[0_18px_54px_rgba(82,67,54,0.08)] sm:p-8">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#E86F23]">
              Option
            </p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {options.map((option) => (
                <article
                  key={option.name}
                  className="rounded-[1.4rem] border border-[#EADCCF] bg-white p-5 shadow-[0_10px_28px_rgba(82,67,54,0.05)]"
                >
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <h3 className="text-xl font-black">{option.name}</h3>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-[#6D6258]">
                        {option.text}
                      </p>
                    </div>
                    {option.name === "整体" ? (
                      <div className="grid min-w-[12rem] gap-2">
                        <p className="rounded-2xl bg-[#FFF7EF] px-4 py-3 text-right text-sm font-black text-[#E86F23]">
                          月2回 10,000円
                        </p>
                        <p className="rounded-2xl bg-[#FFF7EF] px-4 py-3 text-right text-sm font-black text-[#E86F23]">
                          月4回 19,800円
                        </p>
                      </div>
                    ) : (
                      <p className="text-[2rem] font-black leading-none text-[#E86F23]">
                        {option.price}
                        {option.unit ? (
                          <span className="ml-1 text-sm text-[#3A342F]">
                            {option.unit}
                          </span>
                        ) : null}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF7EF] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[1.65rem] font-black sm:text-[2.3rem]">
            よくある質問
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-[#EADCCF] bg-white px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-[#3A342F]">
                  <span>{item.question}</span>
                  <span className="text-[#E86F23] group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[#6D6258]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E86F23] px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-[1.7rem] font-black leading-tight sm:text-[2.4rem]">
              料金で迷う方も、まずは体験でご相談ください
            </h2>
            <p className="mt-4 max-w-3xl text-sm font-bold leading-relaxed text-white/88 sm:text-base">
              今の身体の状態と目的を確認し、あなたに合うコースをご提案します。
            </p>
          </div>
          <a
            href="/reserve"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-[#E86F23]"
          >
            体験予約する
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
            <a href="/bodymake">ボディメイク</a>
            <a href="/posture">姿勢改善</a>
            <a href="/legs">脚やせ</a>
            <a href="/beginner">運動初心者</a>
            <a href="/access">アクセス</a>
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-5 text-xs font-bold text-white/45">
          © NATURAL FITNESS
        </div>
      </footer>
    </main>
  );
}

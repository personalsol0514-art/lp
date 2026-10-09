import Image from "next/image";
import { PopularBadge } from "./PopularBadge";

const plans = [
  {
    number: "01", id: "trial", name: "トライアルコース", english: "START",
    catch: "まずは週1回から、運動を生活の一部に", count: "月4回", price: "24,000", unitPrice: "6,000",
    color: "#FF9700", tint: "#FFF4D8",
    images: ["/solution-daily.png", "/trial-posture-check.png", "/gallery-studio-interior.png"],
    points: ["運動初心者", "習慣づくり", "無理なく継続"],
  },
  {
    number: "02", id: "standard", name: "根本改善コース", english: "CHANGE",
    catch: "週2回で、姿勢や身体をしっかり変える", count: "月8回", price: "44,000", unitPrice: "5,500",
    color: "#F65291", tint: "#FFF0F6",
    images: ["/solution-movement.png", "/trial-counseling.png", "/hero-gym.jpg"],
    points: ["一番人気", "姿勢・体型改善", "生活習慣サポート"],
  },
  {
    number: "03", id: "intensive", name: "集中改善コース", english: "FOCUS",
    catch: "週3回で、目標に向けて集中的に取り組む", count: "月12回", price: "60,000", unitPrice: "5,000",
    color: "#20B564", tint: "#ECF8F0",
    images: ["/solution-posture.png", "/trainer.png", "/gallery-lobby.png"],
    points: ["短期集中", "個別プログラム", "週3回サポート"],
  },
];

const faq = [
  ["予約時にプランを決める必要がありますか？", "いいえ。体験後に身体の状態と生活リズムを確認してから決められます。"],
  ["運動経験がなくても大丈夫ですか？", "はい。月4回のトライアルコースから無理なく始められます。"],
  ["表示料金以外の費用はありますか？", "入会金は0円です。食事管理・整体を希望する場合のみ、掲載しているオプション料金が加算されます。"],
  ["体験にはどのくらい時間がかかりますか？", "カウンセリング・姿勢チェック・体験トレーニング・プラン説明を含めて約60分です。"],
  ["支払い方法は何がありますか？", "ご利用可能なお支払い方法は体験時にご案内します。必要な場合は事前にお問い合わせください。"],
];

const voices = [
  {
    badge: "-8.6kg", title: "ウエスト-7cmで洋服が似合う体に！", profile: "40代／会社員",
    text: "自己流では変わらなかったのが、サポートを受けながら楽しく続けられました。",
    before: "/before-after-before.png", after: "/before-after-after.png",
  },
  {
    badge: "-5.2kg", title: "脚のラインが変わってスキニーが履けるように！", profile: "50代／主婦",
    text: "むくみが取れてスッキリし、周りからも痩せたと言われることが増えました。",
    before: "/before-after-pair2-before.png", after: "/before-after-pair2-after.png",
  },
];

const options = [
  {
    name: "食事管理",
    price: "7,000円／月",
    note: "期間限定｜通常月額10,000円",
    text: "食事や生活習慣も整えたい方向け。期間限定で月額7,000円に変更しています。",
    color: "#F65291",
  },
  {
    name: "整体",
    price: "月2回 10,000円",
    subPrice: "月4回 19,800円",
    text: "身体の張りや姿勢のクセが気になる方向け。トレーニングと組み合わせて身体づくりをサポートします。",
    color: "#20B564",
  },
];

const headerNavItems = [
  ["お知らせ", "/#news"],
  ["特徴", "/#features"],
  ["悩み別", "/#goals"],
  ["体験の流れ", "/#trial-flow"],
  ["料金", "/price"],
  ["お客様の声", "/#voice"],
  ["トレーナー", "/#trainer"],
  ["アクセス", "/#access"],
  ["FAQ", "/#faq"],
];

function ReserveLink({ children, label, plan, className = "" }: { children: React.ReactNode; label: string; plan?: string; className?: string }) {
  return <a href={plan ? `/reserve?plan=${plan}` : "/reserve"} data-event-label={label} className={className}>{children}</a>;
}

function Wave({ color = "#F5F3EC", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 150"
      preserveAspectRatio="none"
      className={`block h-16 w-full sm:h-24 ${flip ? "rotate-180" : ""}`}
    >
      <path fill={color} d="M0 76C181 126 342 132 522 86C725 34 859 19 1041 50C1200 77 1311 92 1440 49V150H0Z" />
    </svg>
  );
}

export function PricePageContent({ isTest = false }: { isTest?: boolean }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F3EC] pb-20 text-[#302E2C] sm:pb-28">
      {isTest && <div className="bg-[#302E2C] px-4 py-2 text-center text-[0.68rem] font-bold text-white/80">確認用テストページ・検索結果には表示されません</div>}

      <header className="fixed inset-x-0 top-0 z-[60] border-b border-[#EADCCF] bg-white/92 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-8">
          <a href="/" className="leading-none">
            <span className="block text-[0.98rem] font-black tracking-[0.08em] text-[#D36F31] sm:text-[1.1rem]">NATURAL FITNESS</span>
            <span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.22em] text-[#8AA05F] sm:text-[0.5rem]">Private Personal Gym</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-black text-[#3A342F] lg:flex">
            {headerNavItems.map(([label, href]) => <a key={label} href={href} className="transition hover:text-[#E86F23]">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <ReserveLink label="price_header_reserve" className="hidden rounded-full bg-[#E86F23] px-5 py-2.5 text-sm font-black text-white shadow-[0_8px_18px_rgba(232,111,35,0.25)] transition hover:bg-[#CF5F1C] sm:inline-flex">体験予約</ReserveLink>
            <details className="group relative lg:hidden">
              <summary className="list-none"><span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#EADCCF] bg-white text-sm font-black text-[#E86F23] shadow-sm sm:h-11 sm:w-auto sm:px-4"><span className="grid gap-1"><span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" /><span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" /><span className="block h-[2px] w-4 rounded-full bg-[#E86F23]" /></span><span className="ml-2 hidden sm:inline">Menu</span></span></summary>
              <div className="fixed inset-x-4 top-16 z-[80] overflow-hidden rounded-[1.35rem] border border-[#EADCCF] bg-white p-2 shadow-[0_18px_46px_rgba(82,67,54,0.16)] sm:absolute sm:inset-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-64">
                {headerNavItems.map(([label, href]) => <a key={label} href={href} className="block rounded-xl px-4 py-3 text-sm font-black text-[#3A342F] transition hover:bg-[#FFF4EA] hover:text-[#E86F23]">{label}</a>)}
                <ReserveLink label="price_header_menu_reserve" className="mt-2 flex items-center justify-center rounded-xl bg-[#E86F23] px-4 py-3 text-sm font-black text-white">体験予約</ReserveLink>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section className="relative isolate h-[50svh] min-h-[22rem] max-h-[34rem] overflow-hidden bg-[#FF9700] pt-14 sm:pt-[4.5rem]">
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#FFB63E]/65 sm:h-[30rem] sm:w-[30rem]" />
        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-[58%_42%_64%_36%/45%_62%_38%_55%] bg-[#F78600]/60 sm:h-[36rem] sm:w-[36rem]" />
        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center text-white">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/85">Natural Fitness</p>
            <h1 className="mt-4 text-[3rem] font-black tracking-[0.12em] drop-shadow-lg sm:text-[5rem]">PRICE</h1>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[-1px] z-10"><Wave /></div>
      </section>

      <section id="plans" className="relative z-20 isolate px-4 pb-20 pt-12 sm:px-8 sm:pt-16">
        <div className="pointer-events-none absolute -left-24 top-28 z-0 h-52 w-52 rounded-full bg-white/55 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -right-28 top-[38rem] z-0 h-72 w-72 rounded-full bg-[#FFF0F6]/80 sm:h-96 sm:w-96" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <article className="mx-auto max-w-5xl overflow-hidden rounded-[2.8rem] bg-white shadow-[0_16px_45px_rgba(83,72,57,0.065)] sm:rounded-[4rem]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[15rem] overflow-hidden lg:min-h-[28rem]">
                <Image src="/solution-movement.png" alt="NATURAL FITNESSで行う実際の体験トレーニング" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-[#FF9700] px-4 py-2 text-xs font-black tracking-[0.16em] text-white">FIRST TRIAL</span>
              </div>
              <div className="p-6 sm:p-10 lg:flex lg:flex-col lg:justify-center">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FF9700]">Trial Session</p>
                <h2 className="mt-2 text-[2rem] font-black sm:text-[3rem]">初回体験</h2>
                <p className="mt-2 text-sm font-black text-[#77706A]">カウンセリング込み 約60分</p>
                <div className="mt-5 flex flex-wrap items-end gap-3">
                  <div><p className="text-xs font-black text-[#77706A]">体験トレーニング料金</p><p className="mt-1 text-[3rem] font-black leading-none text-[#FF9700] sm:text-[4rem]">2,980<span className="text-base text-[#302E2C]">円</span></p></div>
                  <span className="rounded-full bg-[#FF9700] px-4 py-2 text-sm font-black text-white">当日ご契約で0円</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2 text-center text-xs font-black sm:text-sm">
                  {["カウンセリング", "姿勢チェック", "体験トレーニング", "プラン提案"].map((item) => <span key={item} className="rounded-2xl bg-[#FFF4D8] px-3 py-3">{item}</span>)}
                </div>
              </div>
            </div>
          </article>
          <div className="mx-auto mb-16 mt-4 grid max-w-5xl gap-3 sm:mb-20 sm:mt-5 sm:grid-cols-2">
            <ReserveLink label="price_test_top_trial" className="flex min-h-14 items-center justify-center rounded-full bg-[#302E2C] px-6 text-sm font-black text-white shadow-lg">2,980円で体験予約 →</ReserveLink>
            <a href="#monthly-plans" className="flex min-h-14 items-center justify-center rounded-full border-2 border-[#302E2C] bg-white px-6 text-sm font-black text-[#302E2C]">コースを比較する ↓</a>
          </div>
          <div id="monthly-plans" className="scroll-mt-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#76706A]">Monthly Plan</p>
            <h2 className="mt-3 text-[2rem] font-black sm:text-[3.2rem]">プライス</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-relaxed text-[#77706A] sm:text-base">すべて1回50分。目的と生活リズムに合わせて、月4回・8回・12回から選べます。</p>
          </div>
          <div className="mt-7 grid gap-2 sm:grid-cols-3">
            {[
              ["#trial", "月4回", "初心者・週1回から"],
              ["#standard", "月8回", "一番人気・しっかり改善"],
              ["#intensive", "月12回", "短期集中で取り組む"],
            ].map(([href, count, text], index) => (
              <a key={href} href={href} className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-4 text-left shadow-sm ${index === 1 ? "border-[#F65291]" : "border-[#E5E0D8]"}`}>
                <span><span className="block text-lg font-black">{count}</span><span className="mt-1 block text-xs font-bold text-[#77706A]">{text}</span></span>
                <span className={`grid h-8 w-8 place-items-center rounded-full text-white ${index === 0 ? "bg-[#FF9700]" : index === 1 ? "bg-[#F65291]" : "bg-[#20B564]"}`}>↓</span>
              </a>
            ))}
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-5">
            {plans.map((plan) => (
              <article id={plan.id} key={plan.id} className="relative scroll-mt-6 overflow-hidden rounded-[2.8rem] bg-white shadow-[0_16px_45px_rgba(83,72,57,0.055)] sm:rounded-[4rem]">
                {plan.id === "standard" && <PopularBadge className="right-3 top-3 sm:right-5 sm:top-5" />}
                <div className="px-6 pb-4 pt-7 text-center sm:px-10 sm:pt-9 lg:px-5 lg:pt-7">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3A342F]">PLAN {plan.number}</p>
                  <p className="mt-2 text-[0.72rem] font-black uppercase tracking-[0.28em]" style={{ color: plan.color }}>{plan.english}</p>
                  <h3 className="mt-2 text-[2rem] font-black sm:text-[2.5rem] lg:text-[1.75rem]" style={{ color: plan.color }}>{plan.name}</h3>
                  <p className="mx-auto mt-3 inline-flex rounded-full border-2 px-5 py-2 text-sm font-black lg:min-h-[3.5rem] lg:items-center lg:px-4 lg:text-xs" style={{ color: plan.color, borderColor: plan.color }}>{plan.catch}</p>
                </div>
                <div className="grid h-[12rem] grid-cols-[1.4fr_0.8fr] gap-2 overflow-hidden px-0 sm:h-[19rem] sm:gap-3 lg:h-[14rem]">
                  <div className="relative overflow-hidden rounded-r-[2.8rem] sm:rounded-r-[4rem]"><Image src={plan.images[0]} alt="" fill className="object-cover" sizes="70vw" /></div>
                  <div className="grid gap-2 sm:gap-3">
                    {plan.images.slice(1).map((src) => <div key={src} className="relative overflow-hidden rounded-l-[2rem] sm:rounded-l-[3rem]"><Image src={src} alt="" fill className="object-cover" sizes="30vw" /></div>)}
                  </div>
                </div>
                <div className="px-6 pb-7 pt-5 sm:px-12 sm:pb-9 sm:pt-7 lg:px-5 lg:pb-7 lg:pt-5">
                  <div className="overflow-hidden rounded-[1.6rem] border border-[#E5E0D8] bg-[#FAF9F6]">
                    <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-4 sm:px-6">
                      <div className="flex flex-wrap items-center gap-2 text-sm font-black">月額料金<span className="rounded-full px-3 py-1 text-xs text-white" style={{ backgroundColor: plan.color }}>{plan.count}</span></div>
                      <p className="text-right text-2xl font-black sm:text-3xl" style={{ color: plan.color }}>{plan.price}{plan.price !== "価格調整中" && <span className="ml-1 text-sm text-[#302E2C]">円</span>}</p>
                    </div>
                    <div className="grid grid-cols-3 border-t border-[#E5E0D8]">
                      <div className="px-2 py-3 text-center"><span className="block text-[0.6rem] font-bold text-[#77706A] sm:text-xs">1回あたり</span><span className="mt-1 block text-sm font-black sm:text-base" style={{ color: plan.color }}>{plan.unitPrice}{plan.unitPrice !== "—" && "円"}</span></div>
                      <div className="border-x border-[#E5E0D8] px-2 py-3 text-center"><span className="block text-[0.6rem] font-bold text-[#77706A] sm:text-xs">セッション時間</span><span className="mt-1 block text-sm font-black sm:text-base" style={{ color: plan.color }}>50分</span></div>
                      <div className="px-2 py-3 text-center"><span className="block text-[0.6rem] font-bold text-[#77706A] sm:text-xs">入会金</span><span className="mt-1 block text-sm font-black sm:text-base" style={{ color: plan.color }}>0円</span></div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">{plan.points.map((point) => <span key={point} className="rounded-full px-3 py-1.5 text-xs font-black" style={{ backgroundColor: plan.tint, color: plan.color }}>{point}</span>)}</div>
                  <p className="mt-4 text-xs font-bold leading-relaxed text-[#8A837C]">※税込価格。予約時点でプランを確定する必要はありません。</p>
                  <ReserveLink plan={plan.id} label={`price_test_${plan.id}_reserve`} className="mt-5 flex min-h-14 items-center justify-between rounded-full bg-[#F3F1EA] px-6 text-sm font-black transition hover:-translate-y-0.5">
                    <span>{plan.name}を体験で相談</span><span className="grid h-9 w-9 place-items-center rounded-full text-lg text-white" style={{ backgroundColor: plan.color }}>→</span>
                  </ReserveLink>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-10 rounded-[2.8rem] bg-white px-6 py-9 shadow-[0_16px_45px_rgba(83,72,57,0.055)] sm:mt-14 sm:rounded-[4rem] sm:px-12 sm:py-12">
            <p className="text-center text-xs font-black uppercase tracking-[0.24em] text-[#20B564]">Option</p>
            <h2 className="mt-3 text-center text-[2rem] font-black sm:text-[3rem]">オプション料金</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {options.map((option) => (
                <article key={option.name} className="rounded-[2rem] border border-[#E5E0D8] bg-[#FAF9F6] p-5 sm:p-7">
                  <h3 className="text-xl font-black">{option.name}</h3>
                  <p className="mt-4 text-2xl font-black" style={{ color: option.color }}>{option.price}</p>
                  {option.subPrice && <p className="mt-2 text-xl font-black" style={{ color: option.color }}>{option.subPrice}</p>}
                  {option.note && <p className="mt-2 text-xs font-bold text-[#8A837C]">{option.note}</p>}
                  <p className="mt-4 text-sm font-bold leading-relaxed text-[#77706A]">{option.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pb-20 sm:px-8">
        <div className="pointer-events-none absolute -left-32 top-12 h-72 w-72 rounded-full bg-[#FFF4D8]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FF9700]">Results</p>
            <h2 className="mt-3 text-[2rem] font-black sm:text-[3rem]">実際のお客様の変化</h2>
            <p className="mt-3 text-sm font-bold text-[#77706A]">トップページで公開中のお客様実績です。</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {voices.map((voice) => (
              <article key={voice.title} className="grid gap-5 rounded-[2rem] bg-white p-5 shadow-[0_16px_45px_rgba(83,72,57,0.065)] sm:grid-cols-[0.9fr_1.1fr] sm:p-6">
                <div className="grid grid-cols-2 gap-2">
                  {[[voice.before, "Before"], [voice.after, "After"]].map(([src, label]) => (
                    <figure key={label}><div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F5F3EC]"><Image src={src} alt={label} fill className="object-cover" sizes="180px" /></div><figcaption className={`mt-2 text-center text-[0.65rem] font-black ${label === "After" ? "text-[#FF9700]" : "text-[#8A837C]"}`}>{label}</figcaption></figure>
                  ))}
                </div>
                <div className="self-center"><span className="inline-flex rounded-full bg-[#FF9700] px-4 py-1 text-sm font-black text-white">{voice.badge}</span><h3 className="mt-3 text-lg font-black leading-snug">{voice.title}</h3><p className="mt-2 text-xs font-black text-[#8A837C]">{voice.profile}</p><p className="mt-3 text-sm font-bold leading-relaxed text-[#77706A]">{voice.text}</p><p className="mt-3 text-[0.65rem] text-[#AAA19A]">※効果には個人差があります</p></div>
              </article>
            ))}
          </div>
          <ReserveLink label="price_test_results_reserve" className="mx-auto mt-7 flex min-h-14 max-w-md items-center justify-center rounded-full bg-[#302E2C] px-6 text-center text-sm font-black text-white">自分に合うプランを体験で相談 →</ReserveLink>
        </div>
      </section>

      <div className="-mb-1"><Wave color="#FFF0F6" /></div>
      <section className="relative overflow-hidden bg-[#FFF0F6] px-4 pb-20 pt-5 sm:px-8 sm:pt-10">
        <div className="pointer-events-none absolute -left-36 top-8 h-80 w-80 rounded-[48%_52%_38%_62%/63%_44%_56%_37%] bg-white/60 sm:h-[30rem] sm:w-[30rem]" />
        <div className="pointer-events-none absolute -right-32 bottom-[-5rem] h-72 w-72 rounded-full bg-[#FFF4D8]/80 sm:h-[26rem] sm:w-[26rem]" />
        <div className="relative mx-auto max-w-5xl rounded-[2.8rem] bg-white px-6 py-10 shadow-[0_20px_50px_rgba(78,70,58,0.065)] sm:rounded-[4rem] sm:px-12 sm:py-14">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FF9700]">FAQ</p><h2 className="mt-3 text-[2rem] font-black sm:text-[3rem]">よくある質問</h2>
          <div className="mt-7 divide-y divide-[#E5E0D8] border-y border-[#E5E0D8]">
            {faq.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black"><span>{question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F5F3EC] text-[#FF9700]">＋</span></summary><p className="mt-4 pr-10 text-sm font-bold leading-relaxed text-[#77706A]">{answer}</p></details>)}
          </div>
        </div>
      </section>
      <div className="-mt-1 bg-[#FFF0F6]"><Wave flip /></div>

      <section className="relative overflow-hidden px-4 pb-16 pt-4 sm:px-8 sm:pb-20 sm:pt-8">
        <div className="pointer-events-none absolute -left-48 top-2 h-80 w-80 rounded-[57%_43%_62%_38%/43%_58%_42%_57%] bg-white/75 sm:h-[32rem] sm:w-[32rem]" />
        <div className="pointer-events-none absolute -right-36 top-20 h-72 w-72 rounded-[42%_58%_45%_55%/61%_40%_60%_39%] bg-[#ECF8F0] sm:h-[26rem] sm:w-[26rem]" />
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.8rem] bg-[#F65291] shadow-[0_20px_50px_rgba(78,70,58,0.12)] sm:rounded-[4rem]">
          <div className="grid gap-8 px-7 py-12 text-white sm:px-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><p className="text-xs font-black uppercase tracking-[0.22em] text-white/75">Trial Session</p><h2 className="mt-3 text-[2rem] font-black sm:text-[3rem]">まずは2,980円の体験から</h2><p className="mt-4 font-bold leading-relaxed text-white/85">その場で入会を決める必要はありません。生活に合う回数を一緒に考えます。</p></div>
            <ReserveLink label="price_test_final_reserve" className="flex min-h-16 items-center justify-center rounded-full bg-white px-8 font-black text-[#F65291] shadow-lg">空き状況を見て体験予約 →</ReserveLink>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-28 pt-8 text-center sm:pb-12">
        <a href="/" className="font-black tracking-[0.1em] text-[#D36F31]">NATURAL FITNESS</a>
        <nav className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3 text-left text-sm font-black sm:grid-cols-3"><a href="/">→ トップページ</a><a href="/#features">→ 特徴</a><a href="/price">→ 現在の料金ページ</a><a href="/#trainer">→ トレーナー</a><a href="/#access">→ アクセス</a><a href="/reserve">→ 体験予約</a></nav>
        <p className="mt-10 text-xs font-bold text-[#908982]">© NATURAL FITNESS</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 px-0 sm:bottom-5 sm:px-6">
        <div className="mx-auto max-w-xl overflow-hidden border border-white/70 bg-white shadow-[0_-8px_30px_rgba(60,50,40,0.18)] sm:rounded-full">
          <ReserveLink label="price_test_mobile_trial" className="flex min-h-16 items-center justify-center gap-2 bg-[#F65291] px-6 text-base font-black text-white transition hover:bg-[#E83F80] sm:min-h-[4.5rem] sm:text-lg">2,980円で体験予約 →</ReserveLink>
        </div>
      </div>
    </main>
  );
}

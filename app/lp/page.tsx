import type { Metadata } from "next";
import { Hero } from "../../components/Hero";
import { WorriesSection } from "../../components/WorriesSection";
import { Solution } from "../../components/Solution";
import { Reasons } from "../../components/Reasons";
import { BeforeAfter } from "../../components/BeforeAfter";
import { Studio } from "../../components/Studio";
import { Trainer } from "../../components/Trainer";
import { Pricing } from "../../components/Pricing";
import { FAQ } from "../../components/FAQ";
import { FinalCTA } from "../../components/FinalCTA";
import { MobileCTA } from "../../components/MobileCTA";
import { SectionWithTopWave } from "../../components/SectionWave";

const lpTitle =
  "岡崎のパーソナルジムならTHE natural fitness｜女性向けダイエット・姿勢改善";
const lpDescription =
  "岡崎市でパーソナルジムをお探しならTHE natural fitnessへ。女性のダイエット・姿勢改善・脚やせに特化し、無理なく続けられるトレーニングをご提供。早朝対応・初心者歓迎。まずは体験から。";

export const metadata: Metadata = {
  title: lpTitle,
  description: lpDescription,
  openGraph: {
    title: lpTitle,
    description: lpDescription,
    type: "website",
  },
};

export default function LpPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "THE natural fitness",
    address: "岡崎市",
    areaServed: "岡崎市",
    url: "https://natural-fitness-gym.jp/lp",
  };

  return (
    <main className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero />
      <section className="bg-[#fafaf8] px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-heading font-bold text-slate-900 sm:text-heading-lg">
            岡崎でパーソナルジムをお探しの方へ
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-body leading-relaxed text-slate-700">
            「岡崎 パーソナルジム」で検索して比較している方に向けて、THE natural
            fitnessは女性が無理なく続けられるサポートを提供しています。
            初心者の方でも安心して始められるよう、岡崎 パーソナルジムとして体調や生活リズムに合わせたプログラムをご提案します。
            ダイエットや姿勢改善を目指す方にも、岡崎 パーソナルジムとして一人ひとりに合わせて伴走します。
          </p>
        </div>
      </section>
      <WorriesSection />
      <SectionWithTopWave fillClassName="text-[#F3EBE3]">
        <h2 className="sr-only">女性のためのダイエット特化プログラム</h2>
        <Solution />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-[#fafaf8]">
        <h2 className="sr-only">初心者でも続けられる理由</h2>
        <Reasons />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-[#efe8df]">
        <h2 className="sr-only">姿勢改善・脚やせにも対応</h2>
        <BeforeAfter />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-white">
        <Studio />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-[#efe8df]">
        <Trainer />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-white">
        <Pricing />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-slate-50">
        <FAQ />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-white">
        <FinalCTA />
      </SectionWithTopWave>
      <MobileCTA />
    </main>
  );
}

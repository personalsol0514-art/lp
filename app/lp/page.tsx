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
      <SectionWithTopWave fillClassName="text-[#efe8df]">
        <Trainer />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-white">
        <Studio />
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

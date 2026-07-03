import type { Metadata } from "next";
import { Hero } from "../../components/Hero";
import { WorriesSection } from "../../components/WorriesSection";
import { Solution } from "../../components/Solution";
import { Reasons } from "../../components/Reasons";
import { BeforeAfter } from "../../components/BeforeAfter";
import { Studio } from "../../components/Studio";
import { Trainer } from "../../components/Trainer";
import { Pricing } from "../../components/Pricing";
import { TrialFlow } from "../../components/TrialFlow";
import { FAQ, faqs } from "../../components/FAQ";
import { FinalCTA } from "../../components/FinalCTA";
import { MobileCTA } from "../../components/MobileCTA";
import { SectionWithTopWave } from "../../components/SectionWave";

const lpTitle =
  "岡崎のパーソナルジム体験なら NATURAL FITNESS｜初回0円・完全個室（岡崎市本町通）";
const lpDescription =
  "岡崎市本町通の完全個室パーソナルジム。ダイエット・姿勢改善・運動習慣づくりを無理なく続くペースでサポート。初回体験0円（先着5名）、駐車券サービスあり、営業20時まで。無理な勧誘はしません。";

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
    name: "NATURAL FITNESS",
    address: {
      "@type": "PostalAddress",
      streetAddress: "本町通2丁目3 鳥居ビル1F",
      addressLocality: "岡崎市",
      addressRegion: "愛知県",
      postalCode: "444-0051",
      addressCountry: "JP",
    },
    telephone: "090-1819-5050",
    openingHours: "Mo-Su 11:00-20:00",
    priceRange: "¥0-¥60,000",
    areaServed: "岡崎市",
    url: "https://natural-fitness-gym.jp/lp",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <WorriesSection />
      <SectionWithTopWave fillClassName="text-[#F3EBE3]">
        <h2 className="sr-only">岡崎市で選ばれるダイエット特化プログラム</h2>
        <Solution />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-[#fafaf8]">
        <h2 className="sr-only">岡崎市で初心者に選ばれる理由</h2>
        <Reasons />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-[#efe8df]">
        <h2 className="sr-only">姿勢改善・運動習慣づくりにも対応</h2>
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
      <SectionWithTopWave fillClassName="text-white">
        <TrialFlow />
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

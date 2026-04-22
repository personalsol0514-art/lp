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

export default function LpPage() {
  return (
    <main className="bg-slate-50">
      <Hero />
      <WorriesSection />
      <SectionWithTopWave fillClassName="text-[#F3EBE3]">
        <Solution />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-[#fafaf8]">
        <Reasons />
      </SectionWithTopWave>
      <SectionWithTopWave fillClassName="text-[#efe8df]">
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

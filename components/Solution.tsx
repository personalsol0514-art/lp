import { SolutionCatchphraseReveal } from "./SolutionCatchphraseReveal";
import { SolutionPillarCard, type SolutionAccent } from "./SolutionPillarCard";
import { SolutionSectionDecor } from "./SolutionSectionDecor";
const pillars: Array<{
  key: string;
  badge: string;
  headline: string;
  desc: string;
  imageSrc: string;
  imageAlt: string;
  accent: SolutionAccent;
  imageObjectClass?: string;
  imageBlobClass: string;
}> = [
  {
    key: "posture",
    badge: "変わらない原因はここ",
    headline: "姿勢",
    desc: "痩せにくい、疲れやすい、肩こりが取れない…\nその原因は“姿勢の崩れ”かもしれません。\n\nまずは土台を整えることで、\n“変わる体”をつくります。",
    imageSrc: "/solution-posture.png",
    imageAlt:
      "トレーナーがフォームを確認しながら、女性がジムでトレーニングする様子。姿勢を整えた動きをサポートしている。",
    accent: "emerald",
    imageBlobClass: "rounded-[28%_72%_48%_52%/58%_32%_68%_42%]",
  },
  {
    key: "movement",
    badge: "きつい運動じゃない",
    headline: "動き",
    desc: "激しいトレーニングは必要ありません。\n\n女性の体に合ったやさしい動きで、\n日常のクセを整えていくことで、\n自然と引き締まっていきます。",
    imageSrc: "/solution-movement.png",
    imageAlt:
      "トレーナーが膝の位置を確認しながら、女性がダンベルを持って片脚をベンチに乗せたスクワット系の動きを行っている様子。",
    accent: "orange",
    imageObjectClass: "object-cover object-[center_42%]",
    imageBlobClass: "rounded-[22%_78%_61%_39%/41%_24%_76%_33%]",
  },
  {
    key: "daily",
    badge: "だから続く",
    headline: "日常",
    desc: "特別な時間を作らなくても大丈夫。\n\n1日3〜5分の習慣を取り入れるだけで、\n忙しい毎日でも無理なく続けられます。",
    imageSrc: "/solution-daily.png",
    imageAlt:
      "マットの上でヒップブリッジを行い、太ももにレジスタンスバンドを巻いた女性と、フォームを見守るトレーナー。",
    accent: "sky",
    imageObjectClass: "object-cover object-[center_40%]",
    imageBlobClass: "rounded-[35%_65%_30%_70%/52%_38%_62%_45%]",
  },
];

/**
 * Entry Pocket（https://baito.mynavi.jp/entrypocket/）を参照した
 * クリームトーン・段階見出し・3カラムの解決ブロック
 */
export function Solution() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EBE3] via-[#FAF3EC] to-[#FDF6F0] px-4 pt-14 pb-24 sm:pt-20 sm:pb-32">
      <SolutionSectionDecor />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SolutionCatchphraseReveal />
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-6xl px-0 sm:mt-8 sm:px-3 lg:mt-10">
        <div className="mx-auto grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 sm:gap-x-8 sm:gap-y-10 md:gap-x-10 lg:gap-x-12">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.key}
              className={
                index === 1
                  ? "sm:translate-y-[1.8rem] lg:translate-y-[2.4rem]"
                  : ""
              }
            >
              <SolutionPillarCard
                badge={pillar.badge}
                headline={pillar.headline}
                description={pillar.desc}
                accent={pillar.accent}
                imageSrc={pillar.imageSrc}
                imageAlt={pillar.imageAlt}
                imageObjectClass={pillar.imageObjectClass}
                imageBlobClass={pillar.imageBlobClass}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

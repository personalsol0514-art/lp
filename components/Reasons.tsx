import Image from "next/image";
import { ReasonPointBadge } from "./ReasonPointBadge";

const reasons: Array<{
  accentLabel: string;
  title: string;
  desc: string;
  /** 画像を置くときはパスを指定（未指定ならプレースホルダー） */
  imageSrc?: string;
  imageAlt?: string;
}> = [
  {
    accentLabel: "無理のない習慣から",
    title: "がんばらなくても続く設計",
    desc: "「続かない」を前提に考えています。きつい・厳しい・時間が取れない、そんな理由で挫折してきた方でも大丈夫。生活リズムや体力に合わせて、無理なく続けられる強度と習慣を一緒に作ります。「気づいたら続いてた」が、いちばんの近道です。",
    imageSrc: "/solution-daily.png",
    imageAlt:
      "マットの上でトレーニングを行う女性と、フォームを見守るトレーナー。無理のない習慣づくりをイメージできる写真。",
  },
  {
    accentLabel: "女性の身体に合わせて",
    title: "女性の身体に合わせたアプローチ",
    desc: "ただ痩せるだけでは、キレイにはなれません。ホルモンバランスや体調の波、冷え・むくみ・姿勢の崩れまで考えたサポート。だからこそ、無理な食事制限なし・リバウンドしにくい・見た目から変わる。「女性だからこそ変わる方法」で整えていきます。",
    imageSrc: "/solution-posture.png",
    imageAlt:
      "トレーナーが姿勢やフォームを確認しながら、女性がジムでトレーニングする様子。",
  },
  {
    accentLabel: "実感できる変化へ",
    title: "見た目と心まで変わるサポート",
    desc: "体重の数字だけを追いません。姿勢が整う・脚がスッキリする・朝の体が軽くなる、そんな“実感できる変化”を大切にしています。外見だけでなく、「自分に自信が持てる毎日」までサポートします。",
    imageSrc: "/solution-movement.png",
    imageAlt:
      "トレーナーのサポートを受けながら動きのトレーニングをする女性。体の変化がイメージできる写真。",
  },
];

function ReasonImageSlot({
  imageSrc,
  imageAlt,
}: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  const sizeClass =
    "relative mx-auto aspect-square w-[min(13.25rem,84vw)] max-w-[270px] shrink-0 sm:w-[14.5rem] md:w-[15.25rem]";

  if (imageSrc) {
    return (
      <div
        className={`${sizeClass} relative overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_14px_40px_rgba(42,40,38,0.14),0_4px_14px_rgba(224,122,60,0.12)] ring-2 ring-[#E07A3A]/35`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt ?? ""}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 240px, 280px"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} flex flex-col items-center justify-center gap-1 rounded-full border-[3px] border-dashed border-[#E07A3A]/55 bg-[#FFFDFB]/95 px-4 shadow-[0_10px_32px_rgba(42,40,38,0.08)]`}
    >
      <span className="text-center text-[0.7rem] font-semibold tracking-wide text-[#E07A3A]/85">
        画像エリア
      </span>
      <span className="text-center text-[0.65rem] leading-snug text-stone-400">
        円形トリミングで
        <br />
        表示されます
      </span>
    </div>
  );
}

export function Reasons() {
  return (
    <section
      id="features"
      className="relative scroll-mt-28 overflow-hidden bg-gradient-to-b from-[#fafaf8] via-[#f7f6f2] to-[#f3f1ec] px-4 pt-16 pb-24 sm:pt-20 sm:pb-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="font-kurenaido-force inline-block -rotate-[6.5deg] border-b-2 border-[#E07A3A] pb-1 text-[2rem] leading-[1.08] tracking-tight text-[#E07A3A] sm:pb-1.5 sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem]">
            初心者でも続けられる理由
          </h2>
          <p className="font-sans mt-1 inline-block -rotate-[6.5deg] text-[1.35rem] font-bold leading-tight tracking-tight text-[#2c2825] sm:mt-1.5 sm:text-[1.65rem] md:text-[1.85rem]">
            続けられるから、変わっていく。
          </p>
        </header>

        <div className="mx-auto mt-12 w-[70%] min-w-0 grid grid-cols-1 gap-12 sm:mt-14 sm:grid-cols-3 sm:gap-8 md:gap-10 lg:gap-12">
          {reasons.map((reason, index) => (
            <article
              key={reason.title}
              className="flex flex-col items-center text-center sm:items-stretch sm:text-left"
            >
              <ReasonImageSlot
                imageSrc={reason.imageSrc}
                imageAlt={reason.imageAlt ?? reason.title}
              />
              <div className="mt-5 flex w-full max-w-md flex-col items-center gap-4 sm:mt-6 sm:max-w-none sm:flex-row sm:items-start sm:justify-start sm:gap-4">
                <ReasonPointBadge index={index} className="mx-0 shrink-0" />
                <div className="min-w-0 w-full text-center sm:flex-1 sm:w-auto sm:text-left">
                  <p className="font-sans inline-block rounded-xl border border-[#E07A3A]/20 bg-white/90 px-3.5 py-2 text-[0.8125rem] font-semibold tracking-wide text-[#E07A3A] shadow-[0_4px_14px_rgba(42,40,38,0.06),0_1px_3px_rgba(224,122,60,0.08)] sm:px-4 sm:py-2.5">
                    {reason.accentLabel}
                  </p>
                  <h3 className="font-sans mt-2.5 inline-block max-w-full border-b-2 border-[#E07A3A] pb-1 text-[1.0625rem] font-bold leading-[1.45] tracking-tight text-[#E07A3A] sm:mt-3 sm:max-w-none sm:pb-1.5 sm:text-[1.32rem] sm:leading-[1.38] md:text-[1.45rem] md:leading-[1.34]">
                    {reason.title}
                  </h3>
                </div>
              </div>
              <p className="font-sans mt-3 max-w-md text-[0.875rem] leading-[1.75] text-[#4a4540] sm:mx-0 sm:max-w-none sm:text-[0.9375rem] sm:leading-[1.7]">
                <span className="block whitespace-pre-line text-left">
                  {reason.desc}
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

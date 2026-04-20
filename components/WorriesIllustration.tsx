import Image from "next/image";

/** 中央の人物イラスト（`public/worries-character.png`） */
export function WorriesIllustration() {
  return (
    <div className="relative mx-auto h-[min(72vw,300px)] w-[min(87vw,270px)] sm:h-[420px] sm:w-[345px] md:h-[450px] md:w-[375px] lg:h-[480px] lg:w-[390px]">
      <Image
        src="/worries-character.png"
        alt="お腹まわりを気にし、少し困った表情の女性のイラスト"
        fill
        className="object-contain object-bottom"
        sizes="(max-width: 640px) 87vw, 390px"
      />
    </div>
  );
}

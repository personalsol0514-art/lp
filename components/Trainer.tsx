import Image from "next/image";
import { InstagramEmbeds } from "./InstagramEmbeds";

export function Trainer() {
  return (
    <section id="trainer" className="scroll-mt-28 bg-[#efe8df] px-4 pt-14 pb-24 sm:pb-28">
      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          <h2 className="font-kurenaido-force inline-block text-[2rem] leading-[1.08] tracking-tight text-[#E07A3A] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem]">
            トレーナー紹介
          </h2>
        </header>
        <figure className="mx-auto mt-8 text-center sm:mt-10">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl bg-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/80 sm:max-w-sm">
            <Image
              src="/trainer.png"
              alt="渡邉 亮太。グリーンウォールの前で微笑むポートレート。"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 320px"
            />
          </div>
          <figcaption className="mt-4 inline-block font-kurenaido text-[2rem] font-normal leading-[1.08] tracking-tight text-black sm:mt-5 sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem]">
            渡邉 亮太
          </figcaption>
        </figure>

        <ul className="mx-auto mt-5 flex max-w-sm flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-body-sm font-semibold text-[#B86E3C] sm:mt-6">
          <li className="rounded-full bg-[#fff3ea] px-3 py-1">指導歴6年</li>
          <li className="rounded-full bg-[#fff3ea] px-3 py-1">栄養コンシェルジュ</li>
          <li className="rounded-full bg-[#fff3ea] px-3 py-1">姿勢改善・ボディメイク</li>
        </ul>

        <p className="mt-6 text-heading font-bold text-slate-900 sm:mt-8">
          「続けられること」を
          <br />
          いちばん大切にしています。
        </p>
        <p className="mt-4 text-body text-slate-700">
          これまで忙しくて自分のことを後回しにしてきた方が、「自分のための時間」を取り戻せるように。
          その日の体調や気分に合わせて、無理のないメニューを一緒に考えます。
        </p>

        <blockquote className="mt-6 rounded-2xl border-l-4 border-[#E07A3A] bg-[#fff8f4] px-5 py-4 text-left text-body-sm leading-relaxed text-slate-700">
          「体験に来たからといって、入会を迫ることはありません。まずは今の体の状態を一緒に確認しましょう。」
        </blockquote>

        <div className="mt-10">
          <InstagramEmbeds />
        </div>
      </div>
    </section>
  );
}


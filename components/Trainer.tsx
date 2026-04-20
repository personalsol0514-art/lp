import Image from "next/image";

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
        <p className="mt-6 text-heading font-bold text-slate-900 sm:mt-8">
          「続けられること」を
          <br />
          いちばん大切にしています。
        </p>
        <p className="mt-4 text-body text-slate-700">
          これまで忙しくて自分のことを後回しにしてきた女性が、「自分のための時間」を取り戻せるように。
          その日の体調や気分に合わせて、無理のないメニューを一緒に考えます。
        </p>
        <p className="mt-3 text-body-sm text-slate-500">
          ※プロフィール文や実績は、後から具体的な内容に差し替えていただけます。
        </p>
      </div>
    </section>
  );
}


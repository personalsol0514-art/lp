import Image from "next/image";
import { ReserveLink } from "./ReserveLink";

const steps = [
  {
    num: "01",
    title: "WEBで予約",
    desc: "空き時間から選ぶだけ。24時間受付。",
    imageSrc: "/trial-reservation-phone.png",
  },
  {
    num: "02",
    title: "カウンセリング",
    desc: "お悩み・目標・体の状態を確認。",
    imageSrc: "/trial-counseling.png",
  },
  {
    num: "03",
    title: "体験トレーニング",
    desc: "今の体力に合わせた内容で。きつくしません。",
    imageSrc: "/trial-posture-check.png",
  },
  {
    num: "04",
    title: "プランのご説明",
    desc: "合いそうなら続け方をご提案。勧誘はしません。",
    imageSrc: "/trial-plan-proposal.png",
  },
];

export function TrialFlow() {
  return (
    <section
      id="flow"
      className="scroll-mt-28 bg-white px-4 pt-14 pb-24 sm:pb-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-label font-semibold uppercase text-[#E07A3A]">
            Trial Flow
          </h2>
          <p className="mt-2 text-heading font-bold text-slate-900">
            初回体験の流れ
          </p>
          <p className="mt-2 text-body-sm text-slate-600">
            所要約60分。その場で入会を決める必要はありません。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-200">
                <Image
                  src={step.imageSrc}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-bold tabular-nums text-[#E07A3A] shadow-sm">
                  {step.num}
                </span>
              </div>
              <div className="p-4">
                <p className="text-body font-bold text-slate-900">
                  {step.title}
                </p>
                <p className="mt-1.5 text-body-sm leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-body-sm text-slate-600">
          動きやすい服装・室内シューズ・タオル・飲み物をお持ちください（レンタルはありません）
        </p>

        <div className="mt-8 flex justify-center">
          <ReserveLink
            href="/reserve"
            eventLabel="trial_flow_reserve"
            className="flex min-h-[52px] w-full max-w-[420px] items-center justify-center rounded-full bg-[#E07A3A] px-6 text-body font-bold text-white shadow-md shadow-[#E07A3A]/35 transition hover:bg-[#cf6d34]"
          >
            初回体験を予約する
          </ReserveLink>
        </div>
      </div>
    </section>
  );
}

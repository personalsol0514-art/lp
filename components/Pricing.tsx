/** 根本改善コース（50分）・月額（税込） */
const PLANS_50_MIN = [
  { sessions: 4, totalYen: 24_000 },
  { sessions: 8, totalYen: 44_000 },
  { sessions: 12, totalYen: 60_000 },
] as const;

/** メンテナンスコース（30分）・月額（税込）— 店舗の正式価格が決まり次第、ここを書き換えてください */
const PLANS_30_MIN = [
  { sessions: 4, totalYen: 14_400 },
  { sessions: 8, totalYen: 26_400 },
  { sessions: 12, totalYen: 36_000 },
] as const;

function MonthlyPlanGrid({
  plans,
  durationKey,
}: {
  plans: readonly { sessions: number; totalYen: number }[];
  durationKey: string;
}) {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-3">
      {plans.map(({ sessions, totalYen }) => {
        const perSession = totalYen / sessions;
        return (
          <li
            key={`${durationKey}-${sessions}`}
            className="rounded-2xl border border-slate-200/80 bg-slate-50 px-5 py-5 text-center shadow-sm ring-1 ring-slate-100 sm:px-4 sm:py-6"
          >
            <p className="text-body-sm font-medium text-slate-600">
              月{sessions}回
            </p>
            <p className="mt-2 font-sans text-xl font-bold tabular-nums tracking-tight text-slate-900 sm:text-2xl">
              {totalYen.toLocaleString("ja-JP")}
              <span className="text-body font-bold">円</span>
            </p>
            <p className="mt-3 border-t border-slate-200/70 pt-3 text-body-sm text-slate-600">
              1回あたり{" "}
              <span className="font-semibold tabular-nums text-slate-800">
                {perSession.toLocaleString("ja-JP")}円（税込）
              </span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-28 bg-white px-4 pt-14 pb-24 sm:pb-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-label font-semibold uppercase text-[#E07A3A]">
          料金
        </h2>
        <p className="mt-2 text-heading font-bold text-slate-900">
          続けやすさを大切にした、
          <br />
          シンプルな月額プラン。
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-[#E07A3A]/25 bg-[#fff8f4] p-6 shadow-sm sm:p-7">
            <p className="text-body-sm font-semibold uppercase tracking-wide text-[#E07A3A]">
              初回体験
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
              <p className="text-body text-slate-600">
                通常{" "}
                <span className="font-semibold tabular-nums text-slate-800">
                  2,980円
                </span>
                <span className="text-body-sm font-normal text-slate-500">
                  （税込）
                </span>
              </p>
              <p className="inline-flex flex-wrap items-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 text-body font-bold text-[#c45a28] shadow-sm ring-1 ring-[#E07A3A]/30 sm:py-2">
                <span className="rounded-full bg-[#E07A3A] px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-white">
                  先着5名様限定
                </span>
                <span className="tabular-nums">0円</span>
              </p>
            </div>
          </div>

          <p className="flex flex-wrap items-center gap-2 text-body font-semibold text-slate-900">
            <span className="inline-flex rounded-full bg-slate-900 px-4 py-1.5 text-body-sm font-bold text-white">
              入会金無料
            </span>
          </p>

          <div className="space-y-10">
            <div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="text-body font-semibold text-slate-900">
                  根本改善コース
                </p>
                <p className="text-body-sm font-normal text-slate-500">
                  月額（税込）・1回50分
                </p>
              </div>
              <MonthlyPlanGrid plans={PLANS_50_MIN} durationKey="50" />
            </div>

            <div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="text-body font-semibold text-slate-900">
                  メンテナンスコース
                </p>
                <p className="text-body-sm font-normal text-slate-500">
                  月額（税込）・1回30分
                </p>
              </div>
              <MonthlyPlanGrid plans={PLANS_30_MIN} durationKey="30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

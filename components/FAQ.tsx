const faqs = [
  {
    q: "運動初心者・運動が苦手でも大丈夫ですか？",
    a: "問題ありません。当ジムは、いきなりきついメニューではなく、姿勢や動きの土台から丁寧にサポートします。「痛い・怖い」を感じないことを優先し、無理のない強度で進めていきます。",
  },
  {
    q: "パーソナルジムと一般のフィットネスジムは何が違いますか？",
    a: "パーソナルジムは、トレーナーがお一人おひとり専属でつき、目標や体調に合わせたメニューをその場で調整できます。マシンの使い方がわからない・続かないという不安を減らし、フォームや姿勢も細かく確認しやすいのが特徴です。",
  },
  {
    q: "週に何回くらい通えばよいですか？",
    a: "目標やライフスタイルによって最適な回数は変わります。週1回から始めて、体調やスケジュールに合わせて月4回・8回・12回などのプランもご用意しています。まずは無理のないペースから一緒に考えましょう。",
  },
  {
    q: "筋トレをすると体が大きくなりませんか？",
    a: "女性のホルモンバランスでは、男性のような大きな筋肉はつきにくいです。当ジムでは、引き締め・姿勢改善・日常の動きやすさを意識したトレーニングが中心です。「かっこよく大きく」ではなく、自然なラインを目指す方に向いた内容です。",
  },
  {
    q: "服装や持ち物に決まりはありますか？",
    a: "動きやすいスポーツウェアやTシャツ・レギンスなどで大丈夫です。室内シューズやタオル、お水はご自身でお持ちいただく場合が多いです。詳細は初回体験前にご案内します。",
  },
  {
    q: "ダイエットだけを目標にしても通えますか？",
    a: "はい。体重の数字だけでなく、姿勢や食生活・睡眠など、生活全体のクセもヒアリングしながら進めます。無理な食事制限一辺倒ではなく、「続けられるからこそ結果がついてくる」考え方でサポートしています。",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-28 bg-slate-50 px-4 pt-14 pb-24 sm:pb-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-label font-semibold uppercase text-[#E07A3A]">
          FAQ
        </h2>
        <p className="mt-2 text-heading font-bold text-slate-900">
          パーソナルジムでよくある質問集
        </p>
        <div className="mt-6 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl bg-white p-4 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-semibold text-slate-900">
                <span>{item.q}</span>
                <span className="text-body-sm text-[#E07A3A] group-open:hidden">
                  ＋
                </span>
                <span className="hidden text-body-sm text-[#E07A3A] group-open:inline">
                  −
                </span>
              </summary>
              <p className="mt-2 text-body-sm leading-relaxed text-slate-700">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

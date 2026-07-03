export const faqs = [
  {
    q: "運動初心者・運動が苦手でも大丈夫ですか？",
    a: "問題ありません。当ジムは、いきなりきついメニューではなく、姿勢や動きの土台から丁寧にサポートします。「痛い・怖い」を感じないことを優先し、無理のない強度で進めていきます。",
  },
  {
    q: "男性も通えますか？",
    a: "はい。女性専用ではありません。20〜50代の男女に通っていただいています。",
  },
  {
    q: "駐車場はありますか？",
    a: "タカラパーキングをご利用ください。駐車券のサービス券をお渡しします。",
  },
  {
    q: "持ち物はありますか？",
    a: "動きやすい服装・室内シューズ・タオル・飲み物をお持ちください。ウェアやシューズのレンタル（手ぶらプラン）はありません。",
  },
  {
    q: "無理な勧誘はありませんか？",
    a: "ありません。体験後にその場で入会を迫ることはありません。ご自宅でゆっくりご検討ください。",
  },
  {
    q: "体験当日は何をしますか？",
    a: "カウンセリング→姿勢チェック→体験トレーニング→プランのご説明で約60分です。",
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
    q: "ダイエットだけを目標にしても通えますか？",
    a: "はい。体重の数字だけでなく、姿勢や食生活・睡眠など、生活全体のクセもヒアリングしながら進めます。無理な食事制限一辺倒ではなく、「続けられるからこそ結果がついてくる」考え方でサポートしています。",
  },
  {
    q: "筋肉がつきすぎたりしませんか？",
    a: "一般的なホルモンバランスでは、大きな筋肉はつきにくいです。当ジムでは、引き締め・姿勢改善・日常の動きやすさを意識したトレーニングが中心です。「かっこよく大きく」ではなく、自然なラインを目指す方に向いた内容です。",
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
          体験前によくいただく質問
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

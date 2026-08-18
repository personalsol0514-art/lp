import type { Metadata } from "next";
import { ServiceLandingPage, type ServicePageConfig } from "../../components/ServiceLandingPage";

export const metadata: Metadata = {
  title: "岡崎市で初心者も通いやすいパーソナルジム｜NATURAL FITNESS",
  description: "ジムが初めて、運動が苦手な方へ。岡崎市本町通の完全個室で、今の体力や経験に合わせたマンツーマントレーニングを行います。",
  alternates: { canonical: "https://natural-fitness-gym.jp/beginner" },
  openGraph: {
    title: "岡崎市の運動初心者向けパーソナルジム｜NATURAL FITNESS",
    description: "完全個室で、マシンの使い方や運動の基本から丁寧に進めます。",
    url: "https://natural-fitness-gym.jp/beginner",
    type: "website",
  },
};

const config: ServicePageConfig = {
  slug: "beginner",
  eyebrow: "岡崎市の運動初心者サポート",
  title: "運動が苦手でも、自分のペースで始められる",
  lead: "周りの目が気にならない完全個室で、マシンの使い方や基本姿勢からマンツーマンでご案内。体力に合わせて、その日の調子を確認しながら進めます。",
  image: "/gallery-studio-interior.png",
  imageAlt: "岡崎市本町通にある初心者も通いやすい完全個室パーソナルジムの内観",
  concerns: [
    { title: "ジムに行ったことがない", text: "何を着るのか、マシンをどう使うのか、周りについていけるか不安。" },
    { title: "体力に自信がない", text: "長く運動しておらず、きついメニューや筋肉痛が心配になっている。" },
    { title: "一人では続かなかった", text: "動画や一般的なメニューを試したものの、自分に合っているかわからずやめてしまった。" },
  ],
  approachTitle: "できる強度から、少しずつ進めます",
  approachLead: "初日から追い込むことは目的にしません。安全に動ける範囲と正しいフォームを確認し、小さな達成感を積み重ねます。",
  approaches: [
    { number: "01", title: "不安と経験を伺う", text: "運動歴、苦手な動き、過去のケガ、生活リズムを確認。わからないことをそのままにせず、体験の流れからご説明します。" },
    { number: "02", title: "基本の動きを練習", text: "呼吸や姿勢、身体の支え方から確認します。回数や重さよりも、安心して動けるフォームを優先します。" },
    { number: "03", title: "続けやすい頻度を相談", text: "仕事や家事に合わせ、現実的に続けられる頻度をご提案。短時間のメンテナンスコースも選べます。" },
  ],
  suitableFor: ["パーソナルジムも一般のジムも初めての方", "運動に苦手意識があり、人目が気になる方", "マシンやトレーニングの基本から知りたい方", "短時間から運動習慣をつくりたい方"],
  sessionTitle: "体験は約60分。話す時間も大切にします",
  sessionText: "カウンセリング、姿勢・動作チェック、無理のない体験トレーニング、通い方のご相談まで行います。わからない用語を前提にせず、一つずつご説明します。",
  faqs: [
    { question: "本当に運動経験がなくても大丈夫ですか？", answer: "はい。運動経験がないことを前提に、姿勢や器具の使い方からご案内します。できない動きを無理に行うことはありません。" },
    { question: "他の利用者と一緒になりますか？", answer: "完全個室のため、トレーニング中に周りの目を気にせず取り組めます。マンツーマンでその日の状態に合わせます。" },
    { question: "30分コースでも効果はありますか？", answer: "運動習慣づくりや身体のメンテナンスを目的に、月4回・1回30分のコースをご用意しています。目的によって適したコースをご案内します。" },
    { question: "子ども連れでも通えますか？", answer: "はい、お子様連れでもご利用いただけます。ご予約時に年齢などをお知らせいただくと、当日のご案内がスムーズです。" },
  ],
};

export default function BeginnerPage() {
  return <ServiceLandingPage config={config} />;
}

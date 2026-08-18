import type { Metadata } from "next";
import { ServiceLandingPage, type ServicePageConfig } from "../../components/ServiceLandingPage";

export const metadata: Metadata = {
  title: "岡崎市で姿勢改善を目指すパーソナルジム｜NATURAL FITNESS",
  description: "猫背・反り腰・巻き肩などが気になる方へ。岡崎市本町通の完全個室パーソナルジムで、姿勢と身体の使い方を確認し、無理のない運動を提案します。",
  alternates: { canonical: "https://natural-fitness-gym.jp/posture" },
  openGraph: {
    title: "岡崎市の姿勢改善パーソナルトレーニング｜NATURAL FITNESS",
    description: "見た目だけでなく、立つ・歩く・動くときの身体の使い方から確認します。",
    url: "https://natural-fitness-gym.jp/posture",
    type: "website",
  },
};

const config: ServicePageConfig = {
  slug: "posture",
  eyebrow: "岡崎市の姿勢改善サポート",
  title: "姿勢と動きのクセを知り、整えやすい身体へ",
  lead: "猫背や反り腰などの見た目だけで判断せず、立つ・しゃがむ・歩くときの身体の使い方を確認。必要な部位を動かし、支える力を身につけます。",
  image: "/trial-posture-check.png",
  imageAlt: "岡崎市のパーソナルジムで行う姿勢チェック",
  concerns: [
    { title: "猫背・巻き肩が気になる", text: "写真に写った姿勢や、デスクワーク中の丸まりが気になっている。" },
    { title: "反り腰に見える", text: "立っているだけで腰まわりに負担を感じ、正しい立ち方がわからない。" },
    { title: "運動しても同じ所がつらい", text: "フォームが合っているかわからず、首・肩・腰など一部に負担が集まりやすい。" },
  ],
  approachTitle: "姿勢の形だけでなく、動きまで見ます",
  approachLead: "理想の姿勢を無理に作り続けるのではなく、関節の動きや筋力、普段の身体の使い方を確認し、負担が偏りにくい状態を目指します。",
  approaches: [
    { number: "01", title: "姿勢と悩みを確認", text: "立位の姿勢と日常で気になる場面を確認します。痛みや強い違和感がある場合は、無理に運動を進めません。" },
    { number: "02", title: "基本動作から原因を整理", text: "呼吸、肩や股関節の動き、しゃがむ動作などを見て、動きにくい部分と頑張りすぎている部分を整理します。" },
    { number: "03", title: "ほぐす・動かす・支える", text: "必要に応じて身体を整えた後、正しい位置を保ちやすくするトレーニングへ。日常で意識するポイントもお伝えします。" },
  ],
  suitableFor: ["猫背・巻き肩・反り腰などの見た目が気になる方", "デスクワークや立ち仕事で身体が固まりやすい方", "自己流トレーニングのフォームに不安がある方", "姿勢を整えながらボディメイクしたい方"],
  sessionTitle: "姿勢チェックから始めます",
  sessionText: "初回体験では、悩みを伺ったうえで立ち姿勢と基本動作を確認します。医療行為ではありません。痛みが強い場合や治療が必要と考えられる場合は、医療機関への相談をご案内します。",
  faqs: [
    { question: "猫背や反り腰は必ず改善しますか？", answer: "姿勢には骨格、筋力、生活習慣など複数の要因が関わるため、結果を保証するものではありません。現在の状態を確認し、無理なく取り組める運動をご提案します。" },
    { question: "整体とトレーニングは何が違いますか？", answer: "身体を動かしやすい状態に整えることと、その状態を支える力をつけることを組み合わせて考えます。内容は体験時の確認結果に合わせます。" },
    { question: "腰や肩に痛みがあっても受けられますか？", answer: "強い痛み、しびれ、急な症状がある場合は、先に医療機関へご相談ください。運動可能な状態か不安な場合は、ご予約前にお問い合わせください。" },
    { question: "着替えや持ち物は必要ですか？", answer: "動きやすい服装、タオル、飲み物をお持ちください。その他の持ち物はご予約時にご案内します。" },
  ],
};

export default function PosturePage() {
  return <ServiceLandingPage config={config} />;
}

import type { Metadata } from "next";
import { ServiceLandingPage, type ServicePageConfig } from "../../components/ServiceLandingPage";

export const metadata: Metadata = {
  title: "岡崎市でダイエットならNATURAL FITNESS｜完全個室パーソナルジム",
  description: "岡崎市本町通の完全個室パーソナルジム。極端な食事制限に頼らず、トレーニング・姿勢・生活習慣を一人ひとりに合わせて整えるダイエットサポートです。",
  alternates: { canonical: "https://natural-fitness-gym.jp/diet" },
  openGraph: {
    title: "岡崎市のパーソナルジムで続けるダイエット｜NATURAL FITNESS",
    description: "極端な食事制限ではなく、運動と生活習慣を続けられる形に整えます。",
    url: "https://natural-fitness-gym.jp/diet",
    type: "website",
  },
};

const config: ServicePageConfig = {
  slug: "diet",
  eyebrow: "岡崎市のダイエットサポート",
  title: "我慢だけに頼らない、続けられるダイエット",
  lead: "体重だけを追いかけず、姿勢・身体の使い方・食事と生活リズムまで確認。岡崎市本町通の完全個室で、無理なく続く方法を一緒に組み立てます。",
  image: "/before-after-after.png",
  imageAlt: "岡崎市のパーソナルジムでダイエットに取り組んだ身体の変化イメージ",
  concerns: [
    { title: "何度もリバウンドする", text: "短期間だけ頑張る方法ではなく、仕事や家庭と両立できる習慣へ整えたい。" },
    { title: "食事制限が続かない", text: "食べない方法ではなく、選び方や量を自分の生活に合わせて身につけたい。" },
    { title: "自己流では変化が出ない", text: "運動しても狙った場所に効かず、何から見直せばよいかわからない。" },
  ],
  approachTitle: "体重・姿勢・習慣を分けて確認します",
  approachLead: "体重の増減には運動だけでなく、食事、睡眠、日々の活動量も関わります。最初から全部を変えず、影響の大きい部分から取り組みます。",
  approaches: [
    { number: "01", title: "今の生活と目標を整理", text: "これまで試した方法、食事の時間、仕事や家事のリズムを伺い、無理なく続けられる目標と頻度を決めます。" },
    { number: "02", title: "姿勢と動きを確認", text: "スクワットなどの基本動作を通して、使いにくい部位や負担が集まりやすい動きを確認。必要な運動を選びます。" },
    { number: "03", title: "小さく続けて調整", text: "トレーニングと生活習慣の変化を振り返り、停滞したときも極端な制限に走らず内容を調整します。" },
  ],
  suitableFor: ["一人では運動や食事管理が続きにくい方", "体重だけでなく見た目や姿勢も整えたい方", "仕事や家事を続けながら無理なく取り組みたい方", "完全個室で周りを気にせず相談したい方"],
  sessionTitle: "初回は、できることから確認",
  sessionText: "カウンセリング後に姿勢と基本動作を確認し、現在の体力に合うトレーニングを体験します。その場で入会を急がせず、目的に合う通い方をご提案します。",
  faqs: [
    { question: "厳しい食事制限はありますか？", answer: "極端に食事量を減らす方法ではなく、普段の生活に合わせて食品の選び方や食べ方を整理します。ダイエットサポートは月額オプションとしてご用意しています。" },
    { question: "運動が苦手でも痩せられますか？", answer: "運動経験に合わせて強度を調整します。体重の変化は運動だけで決まらないため、日常の活動量や生活習慣も一緒に確認します。" },
    { question: "どれくらいで変化が出ますか？", answer: "体力、生活習慣、通う頻度によって異なります。初回体験で現在地を確認し、短期的な数値だけに偏らない目標を一緒に設定します。" },
    { question: "駐車場はありますか？", answer: "近隣のタカラパーキングをご利用いただけます。駐車場サービス券をご用意しています。" },
  ],
};

export default function DietPage() {
  return <ServiceLandingPage config={config} />;
}

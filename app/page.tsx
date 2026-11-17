import type { Metadata } from "next";
import Script from "next/script";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import "./_home/home.css";

export const metadata: Metadata = {
  title: "岡崎市のパーソナルジムならNATURAL FITNESS｜完全個室で無理なくサポート",
  description:
    "岡崎市本町通の完全個室パーソナルジムNATURAL FITNESS。ダイエット・姿勢改善・脚やせを、トレーニングと習慣化サポートで無理なく続けられる形に整えます。",
  keywords: [
    "岡崎 パーソナルジム",
    "岡崎市 パーソナルジム",
    "岡崎 パーソナルトレーニング",
    "岡崎 ダイエット ジム",
    "岡崎 姿勢改善",
    "岡崎 脚やせ",
  ],
  alternates: {
    canonical: "https://natural-fitness-gym.jp/",
  },
  openGraph: {
    title: "岡崎市のパーソナルジムならNATURAL FITNESS",
    description:
      "完全個室で人目を気にせず通える岡崎市本町通のパーソナルジム。ダイエット・姿勢改善・脚やせを無理なくサポートします。",
    type: "website",
    url: "https://natural-fitness-gym.jp/",
    siteName: "NATURAL FITNESS",
    locale: "ja_JP",
  },
};

const mapsLink = "https://www.google.com/maps/place/NATURAL+FITNESS/@34.9598052,137.1641051,17z/data=!3m1!4b1!4m6!3m5!1s0x6004bd198553e9f9:0xeafdf78857d5323!8m2!3d34.9598052!4d137.1641051!16s%2Fg%2F11y4bg9_jl";
const homeBody = readFileSync(join(process.cwd(), "app/_home/home-body.html"), "utf8");
const homeScript = readFileSync(join(process.cwd(), "app/_home/home-script.js"), "utf8");

export default function HomePage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "@id": "https://natural-fitness-gym.jp/#business",
    name: "NATURAL FITNESS",
    alternateName: "ナチュラルフィットネス",
    description:
      "岡崎市本町通の完全個室パーソナルジム。ダイエット、姿勢改善、脚やせ、運動初心者の身体づくりをマンツーマンでサポートします。",
    url: "https://natural-fitness-gym.jp/",
    telephone: "+81-90-1819-5050",
    image: [
      "https://natural-fitness-gym.jp/gallery-exterior.png",
      "https://natural-fitness-gym.jp/gallery-studio-interior.png",
      "https://natural-fitness-gym.jp/solution-movement.png",
    ],
    logo: "https://natural-fitness-gym.jp/laurel-wreath.png",
    priceRange: "¥¥",
    address: {
      "@type": "PostalAddress",
      streetAddress: "本町通2丁目3 鳥居ビル1F",
      addressLocality: "岡崎市",
      addressRegion: "愛知県",
      postalCode: "444-0051",
      addressCountry: "JP",
    },
    areaServed: {
      "@type": "City",
      name: "岡崎市",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "20:00",
      },
    ],
    hasMap: mapsLink,
    sameAs: ["https://www.instagram.com/naturalfitness1101/"],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "完全個室",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "駐車サービス券",
        value: true,
      },
    ],
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;600;700&family=Shippori+Mincho:wght@500;600&display=swap" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <div className="nf-home" dangerouslySetInnerHTML={{ __html: homeBody }} />
      <footer className="nf-home-footer">
        <div className="nf-hf-inner">
          <div>
            <p className="nf-hf-logo">NATURAL FITNESS</p>
            <p>岡崎市本町通の完全個室パーソナルジム</p>
            <p>〒444-0051 愛知県岡崎市本町通2丁目3 鳥居ビル1F</p>
            <p>営業時間 11:00〜20:00 ／ 不定休</p>
            <p>駐車場：タカラパーキング（駐車サービス券あり）</p>
            <p>TEL <a href="tel:09018195050">090-1819-5050</a></p>
          </div>
          <nav aria-label="フッターメニュー">
            <a href="/price">料金</a><a href="/trainer">トレーナー</a><a href="/diet">ダイエット</a><a href="/posture">姿勢改善</a><a href="/beginner">運動初心者</a><a href="/blog">ブログ</a><a href="/reserve">初回体験予約</a><a href={mapsLink} target="_blank" rel="noopener noreferrer">Googleマップ</a>
          </nav>
        </div>
        <p className="nf-hf-copy">© NATURAL FITNESS</p>
      </footer>
      <Script id="nf-home-script" strategy="afterInteractive">{homeScript}</Script>
    </>
  );
}

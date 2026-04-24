import type { ReactNode } from "react";
import Script from "next/script";
import {
  Klee_One,
  Noto_Sans_JP,
  Oswald,
  Yomogi,
  Zen_Kurenaido,
  Zen_Maru_Gothic,
} from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-zen-maru",
  display: "swap",
});

const zenKurenaido = Zen_Kurenaido({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen-kurenaido",
  display: "swap",
});

const yomogi = Yomogi({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yomogi",
  display: "swap",
});

const kleeOne = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-klee-one",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata = {
  title: "Natural Fitness",
  description: "ナチュラルに一生続くフィットネスのためのオンラインサービス",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${zenMaru.variable} ${zenKurenaido.variable} ${yomogi.variable} ${kleeOne.variable} ${oswald.variable}`}
    >
      <head>
        {gtmId ? (
          <Script id="gtm-script" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
      </head>
      <body className="min-h-screen bg-[#f9fafb] text-slate-900 antialiased font-sans">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {children}
      </body>
    </html>
  );
}


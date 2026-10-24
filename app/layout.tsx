import type { CSSProperties, ReactNode } from "react";
import Script from "next/script";
import { ReservationAnalytics } from "../components/ReservationAnalytics";
import "./globals.css";

// Load web fonts in the browser so builds do not depend on Google Fonts responses.
const fontVariables = {
  "--font-noto-sans-jp": '"Noto Sans JP"',
  "--font-zen-maru": '"Zen Maru Gothic"',
  "--font-zen-kurenaido": '"Zen Kurenaido"',
  "--font-yomogi": '"Yomogi"',
  "--font-klee-one": '"Klee One"',
  "--font-oswald": '"Oswald"',
} as CSSProperties;

export const metadata = {
  metadataBase: new URL("https://natural-fitness-gym.jp"),
  title: "Natural Fitness",
  description: "ナチュラルに一生続くフィットネスのためのオンラインサービス",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "NATURAL FITNESS",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-MC1E4TKCFG";
  const shouldLoadGaDirectly = !gtmId && gaMeasurementId;

  return (
    <html
      lang="ja"
      style={fontVariables}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&family=Noto+Sans+JP:wght@400;500;600;700&family=Oswald:wght@600;700&family=Yomogi&family=Zen+Kurenaido&family=Zen+Maru+Gothic:wght@500;700&display=swap"
        />
        {gtmId ? (
          <Script id="gtm-script" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {shouldLoadGaDirectly ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-script" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
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
        <ReservationAnalytics />
        {children}
      </body>
    </html>
  );
}

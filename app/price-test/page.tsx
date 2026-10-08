import type { Metadata } from "next";
import { PricePageContent } from "../../components/PricePageContent";

export const metadata: Metadata = {
  title: "料金ページ テスト｜NATURAL FITNESS",
  description: "NATURAL FITNESS料金ページの確認用テストページです。",
  robots: { index: false, follow: false },
};

export default function PriceTestPage() {
  return <PricePageContent isTest />;
}

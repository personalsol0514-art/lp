import type { Metadata } from "next";
import { PricePageContent } from "../price-test/page";

export const metadata: Metadata = {
  title: "岡崎市のパーソナルジム料金｜NATURAL FITNESS",
  description:
    "岡崎市本町通の完全個室パーソナルジムNATURAL FITNESSの料金ページ。初回体験、月4回・8回・12回コース、食事管理・整体オプションをご案内します。",
  alternates: { canonical: "https://natural-fitness-gym.jp/price" },
};

export default function PricePage() {
  return <PricePageContent />;
}

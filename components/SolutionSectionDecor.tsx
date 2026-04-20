/**
 * 解決セクション背景：ピーチのもくもく＋点線（モバイル／PC で同系の濃さ）
 */
export function SolutionSectionDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* 左上：モバイルでも面積を確保しつつ濃め */}
      <div className="absolute -left-[14%] -top-[8%] h-[min(100vw,400px)] w-[min(115vw,580px)] rounded-[52%_48%_46%_54%/48%_52%_51%_49%] bg-[#E8D4C4]/95 blur-[0.5px] sm:-left-[12%] sm:-top-[16%] sm:h-[min(52vw,440px)] sm:w-[min(72vw,580px)] sm:bg-[#E5D0BE]/92" />

      {/* 右下 */}
      <div className="absolute -bottom-[26%] -right-[12%] h-[min(95vw,360px)] w-[min(105vw,500px)] rounded-[46%_54%_52%_48%/54%_46%_49%_51%] bg-[#E5D2C2]/90 sm:-bottom-[22%] sm:-right-[8%] sm:h-[min(48vw,400px)] sm:w-[min(65vw,520px)] sm:bg-[#E0CAB8]/88" />

      {/* 中央〜やや左：キャッチコピー周辺にかかる塊（モバイルは中央寄せでPCと同系） */}
      <div className="absolute left-1/2 top-[18%] h-[min(88vw,340px)] w-[min(110vw,460px)] -translate-x-1/2 rounded-[50%] bg-[#F0E0D2]/88 sm:left-[26%] sm:top-[32%] sm:h-[min(40vw,300px)] sm:w-[min(55vw,420px)] sm:translate-x-0 sm:bg-[#EDD9CA]/85" />

      {/* モバイル：上部にうっすら2枚目（読みやすさを損なわない程度） */}
      <div className="absolute -right-[20%] top-[4%] h-[min(70vw,260px)] w-[min(85vw,320px)] rounded-[48%_52%_50%_50%/52%_48%_51%_49%] bg-[#EBD5C4]/55 sm:hidden" />

      {/* モバイルのみ：オレンジの楕円（中央・下部。上部のトーンと揃える） */}
      <div
        className="absolute left-1/2 top-[40%] z-0 h-[min(44vw,200px)] w-[min(128vw,500px)] -translate-x-1/2 rounded-[50%] bg-[#E07A3A]/16 blur-[0.5px] sm:hidden"
        aria-hidden
      />
      <div
        className="absolute -right-[12%] bottom-[1%] left-auto z-0 h-[min(52vw,240px)] w-[min(100vw,440px)] rounded-[38%_62%_52%_48%/44%_56%_42%_58%] bg-[#F0A06A]/22 blur-[0.5px] sm:hidden"
        aria-hidden
      />

      {/* 点線の波：モバイルはキャッチ付近、PCは従来位置 */}
      <svg
        className="absolute left-[2%] right-[2%] top-[100px] z-0 h-14 w-[96%] sm:left-[6%] sm:right-[6%] sm:top-[min(26vw,200px)] sm:h-16 sm:w-[88%] md:top-[220px] lg:left-[4%] lg:right-[4%] lg:w-[92%]"
        viewBox="0 0 1000 70"
        preserveAspectRatio="none"
      >
        <path
          d="M 40 45 C 160 8, 200 8, 320 42 S 480 78, 500 42 S 660 6, 680 40 S 820 72, 960 38"
          fill="none"
          stroke="#B8A090"
          strokeWidth="1.35"
          strokeDasharray="4 7"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}

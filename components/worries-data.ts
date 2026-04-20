/**
 * 「お悩み」セクションの文言・配置（編集はここだけでOK）
 */
export type Accent = "rose" | "orange" | "sky" | "emerald" | "lime";

export type WorryItem =
  | {
      id: string;
      desktopPosition: string;
      /** 吹き出しの追加クラス（左右の大きめカード用など） */
      bubbleClass?: string;
      kind: "single";
      /** 1行吹き出し */
      text: string;
      /** 色を付ける部分（text に含まれる文字列） */
      highlight: string;
      accent: Accent;
    }
  | {
      id: string;
      desktopPosition: string;
      bubbleClass?: string;
      kind: "double";
      /** 上段（やや小さめ・ニュートラル） */
      top: string;
      /** 下段（キーワード色） */
      bottom: string;
      accent: Accent;
    };

/**
 * 吹き出し位置：時計まわりの % 指定（モバイル〜PC共通。`sm:`/`lg:` で微調整）
 */
export const WORRY_ITEMS: WorryItem[] = [
  {
    id: "continue",
    kind: "single",
    text: "続かない…",
    highlight: "続かない",
    accent: "rose",
    desktopPosition:
      "left-[5%] top-[17%] z-20 -rotate-[5deg] sm:left-[5%] sm:top-[19%] lg:left-[5%] lg:top-[18%]",
  },
  {
    id: "legs",
    kind: "double",
    top: "脚だけ",
    bottom: "変わらない",
    accent: "orange",
    desktopPosition:
      "right-[5%] top-[7%] z-20 rotate-[4deg] sm:right-[5%] sm:top-[9%] lg:right-[5%] lg:top-[8%]",
  },
  {
    id: "gentle",
    kind: "double",
    top: "きついのは",
    bottom: "不安",
    accent: "sky",
    bubbleClass:
      "max-w-[min(14.5rem,82vw)] sm:max-w-[20.8rem] lg:max-w-[min(28rem,92vw)]",
    desktopPosition:
      "right-[5%] top-[36%] z-20 rotate-[5deg] sm:right-[11%] sm:top-[37%] lg:right-[13%] lg:top-[39%]",
  },
  {
    id: "posture",
    kind: "double",
    top: "姿勢が",
    bottom: "気になる",
    accent: "emerald",
    desktopPosition:
      "bottom-[3%] right-[25%] z-20 rotate-[5deg] sm:bottom-[4%] sm:right-[26%] lg:bottom-[5%] lg:right-[27%]",
  },
  {
    id: "start",
    kind: "double",
    top: "何をすれば",
    bottom: "いい？",
    accent: "lime",
    bubbleClass:
      "max-w-[min(14.5rem,82vw)] sm:max-w-[20.8rem] lg:max-w-[min(28rem,92vw)]",
    desktopPosition:
      "left-[5%] top-[51%] z-20 -rotate-[4deg] sm:left-[6%] sm:top-[52%] lg:left-[8%] lg:top-[54%]",
  },
];

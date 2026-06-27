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
    text: "ダイエットが続かない…",
    highlight: "続かない",
    accent: "rose",
    bubbleClass:
      "min-w-[8.3rem] max-w-[8.9rem] px-[1.25rem] py-[1.1rem] sm:max-w-[22.4rem] sm:px-[3.194rem] sm:py-[1.997rem]",
    desktopPosition:
      "left-[-6%] top-[17%] z-20 -rotate-[5deg] sm:left-[5%] sm:top-[19%] lg:left-[5%] lg:top-[18%]",
  },
  {
    id: "legs",
    kind: "double",
    top: "脚だけなかなか",
    bottom: "変わらない",
    accent: "orange",
    bubbleClass:
      "max-w-[8.8rem] px-[1.3rem] py-[1.15rem] sm:max-w-[22.4rem] sm:px-[3.194rem] sm:py-[1.997rem]",
    desktopPosition:
      "right-[-3%] top-[2%] z-20 rotate-[4deg] sm:right-[5%] sm:top-[9%] lg:right-[5%] lg:top-[8%]",
  },
  {
    id: "gentle",
    kind: "double",
    top: "きつい運動は",
    bottom: "不安",
    accent: "sky",
    bubbleClass:
      "max-w-[8.8rem] px-[1.3rem] py-[1.15rem] sm:max-w-[20.8rem] sm:px-[3.194rem] sm:py-[1.997rem] lg:max-w-[min(28rem,92vw)]",
    desktopPosition:
      "right-[-4%] top-[38%] z-20 rotate-[5deg] sm:right-[11%] sm:top-[37%] lg:right-[13%] lg:top-[39%]",
  },
  {
    id: "posture",
    kind: "double",
    top: "姿勢や体型の崩れが",
    bottom: "気になる",
    accent: "emerald",
    bubbleClass:
      "max-w-[10.4rem] px-[1.45rem] py-[1.15rem] sm:max-w-[22.4rem] sm:px-[3.194rem] sm:py-[1.997rem]",
    desktopPosition:
      "bottom-[-2%] right-[13%] z-20 rotate-[5deg] sm:bottom-[4%] sm:right-[26%] lg:bottom-[5%] lg:right-[27%]",
  },
  {
    id: "start",
    kind: "double",
    top: "自分に何が合っているか",
    bottom: "わからない",
    accent: "lime",
    bubbleClass:
      "min-w-[8.5rem] max-w-[9.2rem] px-[1.25rem] py-[1.05rem] sm:max-w-[20.8rem] sm:px-[3.194rem] sm:py-[1.997rem] lg:max-w-[min(28rem,92vw)]",
    desktopPosition:
      "left-[-7%] top-[56%] z-20 -rotate-[4deg] sm:left-[6%] sm:top-[52%] lg:left-[8%] lg:top-[54%]",
  },
];

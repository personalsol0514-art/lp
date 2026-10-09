export function PopularBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute z-20 h-[5.5rem] w-[5.5rem] drop-shadow-[0_8px_12px_rgba(126,78,13,0.28)] sm:h-24 sm:w-24 ${className}`}
      aria-label="一番人気"
    >
      <span className="absolute bottom-0 left-[1.15rem] h-8 w-5 rotate-[8deg] bg-[#B77A12] [clip-path:polygon(0_0,100%_0,88%_100%,50%_72%,12%_100%)] sm:left-5 sm:h-9 sm:w-6" />
      <span className="absolute bottom-0 right-[1.15rem] h-8 w-5 -rotate-[8deg] bg-[#D89B27] [clip-path:polygon(0_0,100%_0,88%_100%,50%_72%,12%_100%)] sm:right-5 sm:h-9 sm:w-6" />
      <span
        className="absolute inset-x-0 top-0 aspect-square bg-[conic-gradient(from_0deg,#F9D86A,#B87810,#FFE890,#C68A17,#F9D86A)] [clip-path:polygon(50%_0%,58%_8%,69%_3%,75%_14%,88%_12%,90%_25%,100%_31%,92%_42%,100%_50%,92%_58%,100%_69%,88%_75%,88%_88%,75%_86%,69%_97%,58%_92%,50%_100%,42%_92%,31%_97%,25%_86%,12%_88%,12%_75%,0%_69%,8%_58%,0%_50%,8%_42%,0%_31%,10%_25%,12%_12%,25%_14%,31%_3%,42%_8%)]"
      />
      <span className="absolute inset-[0.55rem] grid aspect-square place-items-center rounded-full border-2 border-[#FFF0A8] bg-[radial-gradient(circle_at_35%_28%,#FFF5B5_0%,#E9B83D_42%,#A96D0A_100%)] text-center text-[#5C3905] shadow-[inset_0_0_0_2px_rgba(139,83,5,0.32)] sm:inset-[0.62rem]">
        <span className="leading-none">
          <span className="block text-[0.48rem] font-black uppercase tracking-[0.12em] sm:text-[0.52rem]">No.1</span>
          <span className="mt-1 block text-sm font-black sm:text-base">一番人気</span>
        </span>
      </span>
    </div>
  );
}

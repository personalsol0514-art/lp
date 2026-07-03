import { StudioGalleryMarquee } from "./StudioGalleryMarquee";

export function Studio() {
  return (
    <section
      id="gallery"
      className="overflow-x-hidden bg-white pt-8 pb-24 sm:pt-10 sm:pb-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-4xl px-4 pb-6 text-center sm:pb-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-orange-500 sm:text-body-sm">
          Studio
        </p>
        <h2
          id="gallery-heading"
          className="mt-2 text-heading font-bold text-slate-900"
        >
          店内の様子
        </h2>
      </div>
      <StudioGalleryMarquee />
    </section>
  );
}

import { StudioGalleryMarquee } from "./StudioGalleryMarquee";

export function Studio() {
  return (
    <section
      id="gallery"
      className="overflow-x-hidden bg-white pt-8 pb-24 sm:pt-10 sm:pb-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-4xl px-4 pb-6 text-center sm:pb-8">
        <h2
          id="gallery-heading"
          className="font-sans text-3xl font-bold uppercase tracking-[0.14em] text-orange-500 sm:text-4xl"
        >
          Gallery
        </h2>
      </div>
      <StudioGalleryMarquee />
    </section>
  );
}

import Script from "next/script";

const INSTAGRAM_POST_URLS = [
  "https://www.instagram.com/p/DVxpv9WkRhi/",
];

function toEmbedPermalink(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}

export function InstagramEmbeds() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-8 sm:pb-10">
      <div className="grid grid-cols-1 gap-6">
        {INSTAGRAM_POST_URLS.map((url) => (
          <blockquote
            key={url}
            className="instagram-media !m-0 !w-full !min-w-0 rounded-2xl border border-[#E8D4C4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
            data-instgrm-permalink={toEmbedPermalink(url)}
            data-instgrm-version="14"
          />
        ))}
      </div>
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </div>
  );
}

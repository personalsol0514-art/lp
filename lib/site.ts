export const siteUrl = "https://natural-fitness-gym.jp";

export const siteName = "NATURAL FITNESS";

export const businessName = "NATURAL FITNESS";

export const businessDescription =
  "岡崎市本町通の完全個室パーソナルジム。ダイエット、姿勢改善、脚やせ、運動初心者の身体づくりをサポートします。";

export const businessAddress = {
  streetAddress: "本町通2丁目3 鳥居ビル1F",
  addressLocality: "岡崎市",
  addressRegion: "愛知県",
  postalCode: "444-0051",
  addressCountry: "JP",
};

export const businessImage = `${siteUrl}/hero-gym.jpg`;

export const businessLogo = `${siteUrl}/laurel-wreath.png`;

export const corePages = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/diet", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/posture", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/beginner", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/price", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/trainer", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/reserve", priority: 0.9, changeFrequency: "monthly" as const },
];

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

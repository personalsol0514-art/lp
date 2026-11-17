"use client";

import { useEffect, useRef, useState } from "react";

export const siteNav: [string, string, string][] = [
  ["TOP", "トップ", "/"],
  ["ABOUT", "私たちについて", "/#concept"],
  ["PRICE", "料金", "/price"],
  ["BLOG", "ブログ", "/blog"],
  ["TRAINER", "トレーナー", "/trainer"],
  ["RESERVE", "初回体験予約", "/reserve"],
];

/** Header shared by all subpages; matches the top page header design. */
export function Header({ position = "fixed" }: { position?: "fixed" | "sticky" }) {
  const [open, setOpen] = useState(false);
  const subRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fit = () => {
      const s = subRef.current;
      const t = logoRef.current;
      if (!s || !t) return;
      s.style.fontSize = "10px";
      const r = document.createRange();
      r.selectNodeContents(t);
      const w = r.getBoundingClientRect().width;
      r.selectNodeContents(s);
      const sw = r.getBoundingClientRect().width;
      if (w && sw) s.style.fontSize = `${(10 * w) / sw}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nfh nfh-${position}`}>
      <a className="nfh-brand" href="/" aria-label="NATURAL FITNESS トップへ">
        <span ref={subRef} className="nfh-sub">岡崎市の完全個室パーソナルジム</span>
        <span ref={logoRef} className="nfh-logo">NATURAL FITNESS</span>
      </a>
      <nav className="nfh-nav" aria-label="メインメニュー">
        {siteNav.map(([en, ja, href]) => (
          <a key={en} className="nfx" href={href}><span className="en">{en}</span><span className="ja">{ja}</span></a>
        ))}
      </nav>
      <button
        type="button"
        className="nfh-toggle"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="nfh-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <i /><i /><i />
        <small>MENU</small>
      </button>
      <nav id="nfh-panel" className={`nfh-panel nfx-panel${open ? " open" : ""}`} aria-label="スマホメニュー" onClick={() => setOpen(false)}>
        {siteNav.map(([en, ja, href]) => (
          <a key={en} className="nfx" href={href}><span className="en">{en}</span><span className="ja">{ja}</span></a>
        ))}
        <a className="nfx-cta" href="/reserve"><small>体験0円</small>初回体験を予約する →</a>
      </nav>
    </header>
  );
}

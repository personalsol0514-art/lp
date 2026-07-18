"use client";

declare global {
  interface Window {
    dataLayer?: Array<unknown>;
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-MC1E4TKCFG";

export function trackGtagEvent(
  eventName: string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;

  ensureGtag();
  window.gtag?.("event", eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
  });
}

export function trackGtagEventBeforeNavigation(
  eventName: string,
  params: Record<string, unknown> = {},
  timeoutMs = 800,
) {
  if (typeof window === "undefined") return Promise.resolve();

  ensureGtag();

  return new Promise<void>((resolve) => {
    let resolved = false;
    const done = () => {
      if (resolved) return;
      resolved = true;
      window.clearTimeout(timeoutId);
      resolve();
    };
    const timeoutId = window.setTimeout(done, timeoutMs);

    window.gtag?.("event", eventName, {
      send_to: GA_MEASUREMENT_ID,
      transport_type: "beacon",
      event_callback: done,
      event_timeout: timeoutMs,
      ...params,
    });
  });
}

function ensureGtag() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag() {
      window.dataLayer?.push(arguments);
    };
}

"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID, trackGtagEvent } from "./analytics";

const COMPLETED_RESERVATIONS_KEY = "nf_completed_reservation_events";

function getCompletedReservationIds() {
  try {
    const stored = window.localStorage.getItem(COMPLETED_RESERVATIONS_KEY);
    const parsed = stored ? (JSON.parse(stored) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

function rememberCompletedReservation(eventId: string) {
  try {
    const ids = getCompletedReservationIds();
    window.localStorage.setItem(
      COMPLETED_RESERVATIONS_KEY,
      JSON.stringify([eventId, ...ids.filter((id) => id !== eventId)].slice(0, 20)),
    );
  } catch {
    // Storage can be unavailable in private browsing; analytics should not block UX.
  }
}

function inferCtaId(anchor: HTMLAnchorElement) {
  const explicit = anchor.dataset.eventLabel;
  if (explicit) return explicit;

  const page = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
  const text = (anchor.textContent ?? "reserve")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_\u3040-\u30ff\u3400-\u9fff-]/g, "")
    .slice(0, 40);
  return `${page}_${text || "reserve"}`;
}

export function ReservationAnalytics() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reservationComplete = params.get("reservation_complete") === "1";
    const eventId = params.get("event_id");

    if (
      window.location.pathname === "/thanks" &&
      reservationComplete &&
      eventId &&
      !getCompletedReservationIds().includes(eventId)
    ) {
      rememberCompletedReservation(eventId);
      trackGtagEvent("generate_lead", {
        event_category: "reservation",
        event_label: "reservation_complete",
        reservation_event_id: eventId,
        event_id: eventId,
        currency: "JPY",
        value: 0,
      });

      params.delete("reservation_complete");
      params.delete("event_id");
      const cleanQuery = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}${window.location.hash}`,
      );
    }

    function handleReserveClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.dataset.reserveTracked === "true") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/reserve") return;

      const ctaId = inferCtaId(anchor);
      const shouldWaitForSend =
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        anchor.target !== "_blank";

      let navigationStarted = false;
      const continueNavigation = () => {
        if (!shouldWaitForSend || navigationStarted) return;
        navigationStarted = true;
        window.location.assign(url.href);
      };

      if (shouldWaitForSend) event.preventDefault();

      window.dataLayer = window.dataLayer ?? [];
      window.gtag =
        window.gtag ??
        function gtag() {
          window.dataLayer?.push(arguments);
        };
      window.gtag("event", "reserve_click", {
        send_to: GA_MEASUREMENT_ID,
        event_category: "reservation",
        event_label: ctaId,
        cta_id: ctaId,
        link_url: url.href,
        page_path: window.location.pathname,
        transport_type: "beacon",
        event_callback: continueNavigation,
        event_timeout: 500,
      });

      if (shouldWaitForSend) window.setTimeout(continueNavigation, 500);
    }

    document.addEventListener("click", handleReserveClick);
    return () => document.removeEventListener("click", handleReserveClick);
  }, []);

  return null;
}

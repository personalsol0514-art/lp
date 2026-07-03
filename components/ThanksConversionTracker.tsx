"use client";

import { useEffect } from "react";
import { trackGtagEvent } from "./analytics";

const RESERVATION_COMPLETE_PARAM = "reservation_complete";
const RESERVATION_EVENT_ID_PARAM = "event_id";

export function ThanksConversionTracker() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const reservationComplete = searchParams.get(RESERVATION_COMPLETE_PARAM);
    const eventId = searchParams.get(RESERVATION_EVENT_ID_PARAM);

    if (reservationComplete !== "1" || !eventId) return;

    const sentKey = `generate_lead_sent_${eventId}`;
    if (window.sessionStorage.getItem(sentKey) === "1") return;

    trackGtagEvent("generate_lead", {
      event_category: "reservation",
      event_label: "reservation_complete",
      reservation_event_id: eventId,
    });
    window.sessionStorage.setItem(sentKey, "1");
  }, []);

  return null;
}

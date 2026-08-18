"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { GA_MEASUREMENT_ID } from "./analytics";

type ReserveLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventLabel: string;
  children: ReactNode;
};

export function ReserveLink({
  eventLabel,
  onClick,
  children,
  ...props
}: ReserveLinkProps) {
  return (
    <a
      {...props}
      href={props.href ?? "/reserve"}
      data-reserve-tracked="true"
      data-event-label={eventLabel}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        const href = props.href ?? "/reserve";
        window.dataLayer = window.dataLayer ?? [];
        window.gtag =
          window.gtag ??
          function gtag() {
            window.dataLayer?.push(arguments);
          };

        const shouldWaitForSend =
          event.button === 0 &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey &&
          props.target !== "_blank";

        let navigationStarted = false;
        const continueNavigation = () => {
          if (!shouldWaitForSend || navigationStarted) return;
          navigationStarted = true;
          window.location.assign(href);
        };

        if (shouldWaitForSend) event.preventDefault();

        window.gtag("event", "reserve_click", {
          send_to: GA_MEASUREMENT_ID,
          event_category: "reservation",
          event_label: eventLabel,
          cta_id: eventLabel,
          link_url: href,
          page_path: window.location.pathname,
          transport_type: "beacon",
          event_callback: continueNavigation,
          event_timeout: 500,
        });

        if (shouldWaitForSend) window.setTimeout(continueNavigation, 500);
      }}
    >
      {children}
    </a>
  );
}

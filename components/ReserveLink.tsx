"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

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
      onClick={(event) => {
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({
          event: "reserve_click",
          reserve_click_label: eventLabel,
          reserve_click_href: props.href ?? "/reserve",
        });
        window.gtag?.("event", "reserve_click", {
          event_label: eventLabel,
          link_url: props.href ?? "/reserve",
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

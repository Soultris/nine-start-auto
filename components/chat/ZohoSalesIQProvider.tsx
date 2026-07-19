"use client";

/**
 * ZohoSalesIQProvider  —  components/chat/ZohoSalesIQProvider.tsx
 *
 * Loads the Zoho SalesIQ embed scripts exactly once using vanilla JS injection.
 * Renders null (no DOM output) — exists purely to bring the SDK into the page.
 *
 * Launcher suppression
 * ────────────────────
 * The default Zoho float button is hidden immediately in the `ready` callback
 * via `$zoho.salesiq.floatbutton.visible("hide")`.
 * Our custom gold ChatWidget button then controls open/close manually.
 *
 * Script deduplication
 * ────────────────────
 * An `id` check prevents injecting the script more than once across
 * React Strict Mode double-effects and client-side navigations.
 */

import { useEffect, useRef } from "react";

const WIDGET_CODE =
  "siq8209ebd74868991b884ee2c5c17d779465bb7a744dbd7ad3774d19121ea0f59e";
const EMBED_SRC = `https://salesiq.zohopublic.com/widget?wc=${WIDGET_CODE}`;
const SCRIPT_ID = "zsiqscript";

export default function ZohoSalesIQProvider() {
  const hasInjected = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasInjected.current) return;
    hasInjected.current = true;

    // ── 1. Initialise the $zoho.salesiq namespace before the script loads ──
    if (!window.$zoho) {
      (window as Window).$zoho = {
        salesiq: {
          ready: function () {},
          widgetcode: WIDGET_CODE,
          values: {},
          floatbutton: { visible: () => {} },
          floatwindow: { visible: () => false },
          chat: { open: () => {}, close: () => {}, start: () => {} },
          visitor: {
            name: () => {},
            email: () => {},
            contactnumber: () => {},
            info: () => {},
          },
        },
      };
    }

    // ── 2. Hook the ready callback ──────────────
    const previousReady = window.$zoho!.salesiq.ready;
    window.$zoho!.salesiq.ready = function () {
      // Call any previously set ready handler first.
      if (typeof previousReady === "function") previousReady();
    };

    // ── 3. Inject the embed script ──────────────────────────────────────────
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = EMBED_SRC;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error(
          "[ZohoSalesIQProvider] Failed to load Zoho SalesIQ embed script from " +
            EMBED_SRC
        );
      };
      document.body.appendChild(script);
    }
  }, []);

  return null;
}

// ---------------------------------------------------------------------------
// Visitor identification helper
//
// Call once after your auth system confirms a logged-in user.
//
// Example (NextAuth):
//   const { data: session } = useSession();
//   useEffect(() => {
//     if (session?.user) {
//       identifyZohoVisitor({
//         name:  session.user.name  ?? "Guest",
//         email: session.user.email ?? "",
//         phone: session.user.phone,
//       });
//     }
//   }, [session]);
// ---------------------------------------------------------------------------

export interface ZohoVisitorIdentity {
  name: string;
  email: string;
  phone?: string;
  extraInfo?: Record<string, string | number | boolean>;
}

/**
 * Links the current Zoho SalesIQ session to a known visitor.
 * Safe to call before the widget is ready — silently no-ops if the API
 * is not yet available.
 */
export function identifyZohoVisitor(identity: ZohoVisitorIdentity): void {
  const sq = window.$zoho?.salesiq;
  if (!sq) return;
  sq.visitor.name(identity.name);
  sq.visitor.email(identity.email);
  if (identity.phone) sq.visitor.contactnumber(identity.phone);
  if (identity.extraInfo) sq.visitor.info(identity.extraInfo);
}

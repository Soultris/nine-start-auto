"use client";

/**
 * FreshchatProvider  —  components/chat/FreshchatProvider.tsx
 *
 * Loads the Freshchat embed script exactly once using Next.js `<Script>`
 * with strategy="afterInteractive".  This component renders null (no DOM
 * output) and exists purely to bring the SDK into the page.
 *
 * Script deduplication
 * ────────────────────
 * Next.js deduplicates <Script> tags that share the same `id` across renders
 * and client-side navigations, so the script is never injected twice even if
 * this component re-mounts (e.g. React Strict Mode double-effects).
 *
 * Launcher suppression
 * ────────────────────
 * The default Freshchat launcher is hidden by TWO complementary mechanisms:
 *   1. An inline <Script strategy="beforeInteractive"> in app/layout.tsx sets
 *      `window.fcSettings.config.headerProperty.hideChatButton = true` before
 *      the embed script executes — this is the primary suppression.
 *   2. useFreshchat() calls `widget.hide()` immediately after detecting the
 *      SDK — this is the belt-and-suspenders fallback.
 *
 * User identification
 * ────────────────────
 * Call `identifyFreshchatUser()` (exported below) after the user logs in.
 * It is safe to call at any time — it no-ops if the widget is not yet ready.
 * Wire it into your auth system (NextAuth session, Clerk useUser, etc.)
 * inside FreshchatProvider or any other client component that has session data.
 *
 * Account-plan note
 * ────────────────────
 * `setExternalId` and `user.setProperties` are available on all Freshchat
 * plans.  Advanced features such as custom conversation properties or JWT-based
 * identity verification require a higher-tier plan.
 */

import { useEffect, useRef } from "react";
import type { FreshchatIdentity } from "@/types/freshchat";

// Freshchat embed URL provided by your Freshchat account.
// The account ID and widget ID are baked into the URL path — no env vars needed.
const EMBED_SRC = "//fw-cdn.com/16797708/7359393.js";

export default function FreshchatProvider() {
  const hasInjected = useRef(false);

  useEffect(() => {
    // Only run on the client
    if (typeof window === "undefined") return;

    // Prevent duplicate injection across React Strict Mode
    if (hasInjected.current) return;
    hasInjected.current = true;

    // Check if the script is already in the document
    const existingScript = document.getElementById("freshchat-embed");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "freshchat-embed";
      script.src = EMBED_SRC;
      script.async = true;
      script.defer = true;
      
      // CRITICAL: Next.js <Script> drops custom attributes like `chat="true"`.
      // We must use vanilla JS setAttribute so the Freshworks loader sees it.
      script.setAttribute("chat", "true");

      script.onerror = () => {
        console.error(
          "[FreshchatProvider] Failed to load the Freshchat embed script from " +
            EMBED_SRC
        );
      };

      document.body.appendChild(script);
    }
  }, []);

  return null;
}

// ---------------------------------------------------------------------------
// User identification helper
//
// Call this once after your auth system confirms a logged-in user.
//
// Example (NextAuth):
//   const { data: session } = useSession();
//   useEffect(() => {
//     if (session?.user) {
//       identifyFreshchatUser({
//         userId: session.user.id,
//         name:   session.user.name  ?? "Guest",
//         email:  session.user.email ?? "",
//         phone:  session.user.phone,
//       });
//     }
//   }, [session]);
// ---------------------------------------------------------------------------

/**
 * Links the current Freshchat session to a known user.
 * Safe to call before the widget is ready — silently skips if `fcWidget`
 * is not yet available.
 *
 * @param identity - The logged-in user's identity data.
 */
export function identifyFreshchatUser(identity: FreshchatIdentity): void {
  const widget = window.fcWidget;
  if (!widget || typeof widget.setExternalId !== "function") return;

  // Link the Freshchat session to your own user ID.
  widget.setExternalId(identity.userId);

  // Set profile properties visible in the Freshchat agent dashboard.
  widget.user?.setProperties({
    firstName: identity.name.split(" ")[0] ?? identity.name,
    lastName: identity.name.split(" ").slice(1).join(" ") || undefined,
    email: identity.email,
    phone: identity.phone,
  });
}

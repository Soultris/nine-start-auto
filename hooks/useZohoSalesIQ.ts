"use client";

/**
 * useZohoSalesIQ
 *
 * Provides a stable React interface to the Zoho SalesIQ JS API
 * (`window.$zoho.salesiq`) loaded by ZohoSalesIQProvider.
 *
 * The embed script initialises the widget asynchronously, so this hook
 * polls until the API's `chat.open` method is callable, then wires up
 * open/close event callbacks.
 *
 * Launcher suppression strategy
 * ──────────────────────────────
 * The default Zoho float button is already hidden by ZohoSalesIQProvider's
 * `ready` callback.  This hook calls `floatbutton.visible("hide")` again
 * immediately after detecting the SDK as a belt-and-suspenders fallback.
 *
 * When the user clicks the custom gold button:
 *   - We call `chat.open()` to show the chat panel.
 * When the panel closes:
 *   - We call `floatbutton.visible("hide")` so the default launcher stays gone.
 *
 * Usage:
 *   const { isReady, isWidgetOpen, toggle } = useZohoSalesIQ();
 */

import { useState, useEffect, useCallback, useRef } from "react";

/** How often (ms) to poll for the SDK to become callable. */
const POLL_INTERVAL_MS = 200;
/** Give up after this many attempts (75 × 200 ms = 15 s). */
const MAX_POLL_ATTEMPTS = 75;

export interface UseZohoSalesIQReturn {
  /** `true` once `window.$zoho.salesiq` is loaded and callable. */
  isReady: boolean;
  /** `true` when the Zoho SalesIQ chat panel is currently open. */
  isWidgetOpen: boolean;
  /** Open the chat panel. */
  open: () => void;
  /** Close the chat panel. */
  close: () => void;
  /**
   * Toggle the chat panel open or closed.
   * This is the primary action for the custom gold chat button.
   */
  toggle: () => void;
}

export function useZohoSalesIQ(): UseZohoSalesIQReturn {
  const [isReady, setIsReady] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const pollAttemptsRef = useRef(0);

  useEffect(() => {
    // Guard: hook is client-only.
    if (typeof window === "undefined") return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    function handleWidgetOpen() {
      setIsWidgetOpen(true);
    }

    function handleWidgetClose() {
      setIsWidgetOpen(false);
      // Keep the default launcher suppressed after the panel closes.
      window.$zoho?.salesiq.floatbutton.visible("hide");
    }

    function tryConnect() {
      pollAttemptsRef.current += 1;

      const sq = window.$zoho?.salesiq;

      // Check that the API is available.
      if (sq && sq.floatwindow && typeof sq.floatwindow.visible === "function") {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }

        setIsReady(true);

        // Belt-and-suspenders: hide the float button again in case the
        // ready callback in ZohoSalesIQProvider fired before our hook ran.
        if (sq.floatbutton && typeof sq.floatbutton.visible === "function") {
           sq.floatbutton.visible("hide");
        }

        // Wire up open/close event callbacks via the Zoho API.
        sq.chatopened = handleWidgetOpen;
        sq.chatclosed = handleWidgetClose;

        return;
      }

      // Give up after MAX_POLL_ATTEMPTS.
      if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
        console.warn(
          "[useZohoSalesIQ] Zoho SalesIQ widget did not become callable within " +
            `${(MAX_POLL_ATTEMPTS * POLL_INTERVAL_MS) / 1000}s. ` +
            "Check that the embed script in ZohoSalesIQProvider loaded correctly."
        );
      }
    }

    intervalId = setInterval(tryConnect, POLL_INTERVAL_MS);

    return () => {
      if (intervalId !== null) clearInterval(intervalId);

      // Clean up event callbacks on unmount.
      const sq = window.$zoho?.salesiq;
      if (sq) {
        sq.chatopened = undefined;
        sq.chatclosed = undefined;
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Stable action callbacks
  // Safe to call before the widget is ready — they are no-ops when the API
  // is not yet available.
  // ---------------------------------------------------------------------------

  const open = useCallback(() => {
    const sq = window.$zoho?.salesiq;
    if (!sq) return;
    if (typeof sq.chat?.open === "function") sq.chat.open();
    if (typeof sq.floatwindow?.visible === "function") sq.floatwindow.visible("show");
    if (typeof sq.floatbutton?.visible === "function") sq.floatbutton.visible("hide");
  }, []);

  const close = useCallback(() => {
    const sq = window.$zoho?.salesiq;
    if (!sq) return;
    if (typeof sq.chat?.close === "function") sq.chat.close();
    if (typeof sq.floatwindow?.visible === "function") sq.floatwindow.visible("hide");
    if (typeof sq.floatbutton?.visible === "function") sq.floatbutton.visible("hide");
  }, []);

  const toggle = useCallback(() => {
    setIsWidgetOpen((prev) => {
      const sq = window.$zoho?.salesiq;
      if (!sq) return prev;
      
      if (prev) {
        if (typeof sq.chat?.close === "function") sq.chat.close();
        if (typeof sq.floatwindow?.visible === "function") sq.floatwindow.visible("hide");
        if (typeof sq.floatbutton?.visible === "function") sq.floatbutton.visible("hide");
        return false;
      } else {
        if (typeof sq.chat?.open === "function") sq.chat.open();
        if (typeof sq.floatwindow?.visible === "function") sq.floatwindow.visible("show");
        // Force the float button to stay hidden after opening, 
        // as Zoho sometimes brings it back as a close/minimize icon
        if (typeof sq.floatbutton?.visible === "function") sq.floatbutton.visible("hide");
        return true;
      }
    });
  }, []);

  return { isReady, isWidgetOpen, open, close, toggle };
}

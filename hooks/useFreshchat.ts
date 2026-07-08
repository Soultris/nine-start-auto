"use client";

/**
 * useFreshchat
 *
 * Provides a stable React interface to the Freshchat Web Messenger SDK
 * (`window.fcWidget`) loaded by the new fw-cdn.com embed script.
 *
 * The embed script auto-initialises the widget — there is no `init()` call.
 * `window.fcWidget` becomes available asynchronously after the script
 * executes, so this hook polls until the `open()` method is present and then
 * wires up event listeners.
 *
 * Launcher suppression strategy
 * ──────────────────────────────
 * The default Freshchat launcher is hidden via two layers:
 *   1. `window.fcSettings.config.headerProperty.hideChatButton = true` is set
 *      in the root layout before the script loads (via an inline Script).
 *   2. `widget.hide()` is called immediately after the SDK is ready as a
 *      belt-and-suspenders fallback.
 *
 * When the user clicks our custom gold button:
 *   - We call `widget.show()` to make the widget frame visible again.
 *   - Then `widget.open()` to slide the panel open.
 * When the panel closes (either via our button or Freshchat's own X):
 *   - We call `widget.hide()` to suppress the launcher from reappearing.
 *
 * Usage:
 *   const { isReady, isWidgetOpen, toggle } = useFreshchat();
 */

import { useState, useEffect, useCallback, useRef } from "react";

/** How often (ms) to poll for the SDK to become callable. */
const POLL_INTERVAL_MS = 200;
/** Give up after this many attempts (75 × 200 ms = 15 s). */
const MAX_POLL_ATTEMPTS = 75;

export interface UseFreshchatReturn {
  /** `true` once `window.fcWidget` is loaded and callable. */
  isReady: boolean;
  /** `true` when the Freshchat messenger panel is currently open. */
  isWidgetOpen: boolean;
  /** Open the messenger (shows the widget frame if hidden, then opens panel). */
  open: () => void;
  /** Close the messenger and hide the launcher. */
  close: () => void;
  /**
   * Toggle the messenger open or closed.
   * This is the primary action for the custom chat button.
   */
  toggle: () => void;
}

export function useFreshchat(): UseFreshchatReturn {
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
      // Re-hide the launcher so it does not reappear after the panel collapses.
      window.fcWidget?.hide();
    }

    function tryConnect() {
      pollAttemptsRef.current += 1;

      const widget = window.fcWidget;

      // The new embed SDK auto-initialises — we check for the `open` method
      // rather than calling the optional `isInitialized()`.
      if (widget && typeof widget.open === "function") {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }

        // Sync initial panel state.
        setIsWidgetOpen(widget.isOpen?.() ?? false);
        setIsReady(true);

        // Suppress the default launcher immediately (belt-and-suspenders).
        widget.hide();

        widget.on("widget:opened", handleWidgetOpen);
        widget.on("widget:closed", handleWidgetClose);
        return;
      }

      // Give up after MAX_POLL_ATTEMPTS to avoid running forever.
      if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
        console.warn(
          "[useFreshchat] Freshchat widget did not become callable within " +
            `${(MAX_POLL_ATTEMPTS * POLL_INTERVAL_MS) / 1000}s. ` +
            "Check that the embed script in FreshchatProvider loaded correctly."
        );
      }
    }

    intervalId = setInterval(tryConnect, POLL_INTERVAL_MS);

    return () => {
      if (intervalId !== null) clearInterval(intervalId);

      // Clean up event subscriptions on unmount.
      const widget = window.fcWidget;
      if (widget && typeof widget.off === "function") {
        widget.off("widget:opened", handleWidgetOpen);
        widget.off("widget:closed", handleWidgetClose);
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Stable action callbacks
  // These are safe to call before the widget is ready — they are no-ops when
  // `window.fcWidget` is not yet available.
  // ---------------------------------------------------------------------------

  const open = useCallback(() => {
    const widget = window.fcWidget;
    if (!widget || typeof widget.open !== "function") return;
    // show() un-hides the widget frame before opening the panel.
    widget.show();
    widget.open();
  }, []);

  const close = useCallback(() => {
    const widget = window.fcWidget;
    if (!widget) return;
    widget.close();
    // Re-hide the launcher so it does not float over the page.
    widget.hide();
  }, []);

  const toggle = useCallback(() => {
    const widget = window.fcWidget;
    if (!widget || typeof widget.open !== "function") return;

    if (widget.isOpen?.()) {
      widget.close();
      widget.hide();
    } else {
      widget.show();
      widget.open();
    }
  }, []);

  return { isReady, isWidgetOpen, open, close, toggle };
}

/**
 * Type declarations for the Zoho SalesIQ Web SDK.
 *
 * `window.$zoho.salesiq` is injected asynchronously by the Zoho embed script.
 * The `ready` callback fires once the widget is fully initialised.
 *
 * Reference: https://www.zoho.com/salesiq/help/developer-section/js-api.html
 */

export {};

// ---------------------------------------------------------------------------
// Zoho SalesIQ JS API
// ---------------------------------------------------------------------------

export interface ZohoSalesIQAPI {
  /**
   * Called by the Zoho loader once the widget is ready.
   * You can pre-set this to a function before the script loads.
   */
  ready: () => void;

  /** The widget code baked into your embed snippet. */
  widgetcode?: string;

  /** Visitor identification & custom fields passed before load. */
  values?: Record<string, string | number | boolean>;

  // ── Float button ────────────────────────────────────────────────────────────

  floatbutton: {
    /** Show or hide the default floating launcher. "show" | "hide" */
    visible(state: "show" | "hide"): void;
  };

  // ── Float window (the chat panel) ──────────────────────────────────────────

  floatwindow: {
    /** Returns "true" when the chat panel is currently open, or sets the state. */
    visible(state?: "show" | "hide"): string | boolean | void;
  };

  // ── Chat controls ───────────────────────────────────────────────────────────

  chat: {
    /** Open the chat panel. */
    open(): void;
    /** Close the chat panel. */
    close(): void;
    /** Start a new conversation. */
    start(): void;
  };

  // ── Visitor identification ──────────────────────────────────────────────────

  visitor: {
    /** Set visitor name. */
    name(name: string): void;
    /** Set visitor email. */
    email(email: string): void;
    /** Set visitor phone. */
    contactnumber(phone: string): void;
    /** Set arbitrary custom fields. */
    info(data: Record<string, string | number | boolean>): void;
  };

  // ── Event callbacks ─────────────────────────────────────────────────────────

  /** Fired when the visitor opens the chat window. */
  chatopened?: () => void;
  /** Fired when the visitor closes the chat window. */
  chatclosed?: () => void;
}

// ---------------------------------------------------------------------------
// Global window augmentation
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    /**
     * The Zoho SalesIQ namespace.
     * Injected by the Zoho embed script; always guard against undefined.
     */
    $zoho?: {
      salesiq: ZohoSalesIQAPI;
    };
  }
}

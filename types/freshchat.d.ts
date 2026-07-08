/**
 * Type declarations for the Freshchat Web Messenger SDK.
 *
 * The new Freshchat embed (fw-cdn.com/…/….js) auto-initialises when loaded —
 * there is no manual `init()` call required.  `window.fcWidget` becomes
 * available asynchronously once the script has executed.
 *
 * All methods that may not exist in every SDK build are marked optional (`?`)
 * so call-sites can use optional chaining rather than `as any`.
 *
 * Reference: https://developers.freshchat.com/web-sdk/
 */

export {};

// ---------------------------------------------------------------------------
// React module augmentation — adds the non-standard `chat` attribute used by
// the Freshchat embed script so <Script chat="true" /> compiles without error.
// ---------------------------------------------------------------------------

declare module "react" {
  interface ScriptHTMLAttributes<T> {
    /**
     * Freshchat-specific attribute on the embed <script> tag.
     * Instructs the Freshworks loader to activate the chat channel.
     */
    chat?: string;
  }
}

// ---------------------------------------------------------------------------
// User identity types
// ---------------------------------------------------------------------------

/** Shape of user data passed to Freshchat for identification. */
export interface FreshchatIdentity {
  /** Your application's unique identifier for this user. */
  userId: string;
  /** Full display name of the user. */
  name: string;
  /** User's email address. */
  email: string;
  /** Optional E.164-formatted phone number, e.g. "+12025551234". */
  phone?: string;
}

// ---------------------------------------------------------------------------
// FcWidget instance interface
//
// All state-query methods (`isInitialized`, `isOpen`, `isLoaded`) are optional
// because their presence depends on the SDK build version.
// ---------------------------------------------------------------------------

export interface FcWidget {
  // ── State queries ──────────────────────────────────────────────────────────

  /** Returns `true` once the widget has fully initialised. May not exist in all builds. */
  isInitialized?(): boolean;
  /** Returns `true` when the messenger panel is currently visible. */
  isOpen?(): boolean;
  /** Returns `true` when the widget script is loaded. */
  isLoaded?(): boolean;

  // ── Visibility ─────────────────────────────────────────────────────────────

  /** Open the messenger panel. */
  open(): void;
  /** Close the messenger panel (launcher may remain visible). */
  close(): void;
  /** Show the entire widget (launcher + panel). */
  show(): void;
  /**
   * Hide the entire widget — both launcher and panel.
   * Call `show()` before `open()` when you want to bring it back.
   */
  hide(): void;
  /** Tear down the widget completely and remove it from the DOM. */
  destroy?(): void;

  // ── User identity ──────────────────────────────────────────────────────────

  /**
   * Link the current session to an external user ID.
   * Supported on plans that include user identity.
   */
  setExternalId?(userId: string): void;

  /** Bulk-set or update the current user's profile properties. */
  user?: {
    setProperties(
      props: Record<string, string | number | boolean | undefined>
    ): void;
    /** Clear the current user session (call on logout). */
    clear(): Promise<void>;
  };

  // ── Events ─────────────────────────────────────────────────────────────────

  /** Subscribe to a widget lifecycle event. */
  on(event: FreshchatEvent, callback: () => void): void;
  /** Unsubscribe from a widget lifecycle event. */
  off(event: FreshchatEvent, callback: () => void): void;
}

/** All known Freshchat widget event names. */
export type FreshchatEvent =
  | "widget:loaded"
  | "widget:opened"
  | "widget:closed"
  | "widget:destroyed"
  | "unreadCount:notify"
  | "user:created";

// ---------------------------------------------------------------------------
// Global window augmentation
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    /**
     * The Freshchat widget instance.
     * Injected asynchronously by the fw-cdn.com embed script.
     * Always guard against `undefined` before calling methods.
     */
    fcWidget?: FcWidget;

    /**
     * Pre-init settings read by the Freshchat loader during startup.
     * Set this before the embed script executes to apply configuration
     * (e.g. suppress the default launcher) without waiting for `fcWidget`
     * to become available.
     */
    fcSettings?: {
      config?: {
        headerProperty?: {
          /** Hides Freshchat's own floating launcher button when `true`. */
          hideChatButton?: boolean;
          backgroundColor?: string;
          foregroundColor?: string;
        };
      };
    };
  }
}

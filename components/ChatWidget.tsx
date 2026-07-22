"use client";

/**
 * ChatWidget
 *
 * The floating gold chat button fixed to the bottom-right of every page.
 * Clicking it opens or closes the Zoho SalesIQ chat panel via the
 * `useZohoSalesIQ` hook.
 *
 * The button appearance, animations, and mobile responsiveness are
 * intentionally unchanged from the previous implementation.
 */

import { useZohoSalesIQ } from "@/hooks/useZohoSalesIQ";

export default function ChatWidget() {
  const { isWidgetOpen, toggle } = useZohoSalesIQ();

  return (
    <>
      {/* ─── Floating Chat Button ─── */}
      <button
        id="chat-widget-toggle"
        onClick={toggle}
        aria-label={isWidgetOpen ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #c9a84c 0%, #e8d48b 100%)",
          boxShadow: "0 6px 24px rgba(201, 168, 76, 0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition:
            "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 8px 32px rgba(201, 168, 76, 0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 24px rgba(201, 168, 76, 0.45)";
        }}
      >
        {isWidgetOpen ? (
          /* X icon — shown while the messenger is open */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "transform 0.3s ease" }}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Chat bubble icon — shown while the messenger is closed */
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#1a1a1a"
            style={{ transition: "transform 0.3s ease" }}
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
          </svg>
        )}
      </button>

      {/* ─── Mobile responsiveness ─── */}
      <style jsx global>{`
        @media (max-width: 440px) {
          #chat-widget-toggle {
            bottom: 16px !important;
            right: 16px !important;
            width: 52px !important;
            height: 52px !important;
          }
        }
      `}</style>
    </>
  );
}

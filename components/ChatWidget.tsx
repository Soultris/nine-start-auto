"use client";

import { useState, useRef, useEffect } from "react";


type FormState = "idle" | "submitting" | "success" | "error";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/chat-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setFormState("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message"
      );
    }
  }

  function resetForm() {
    setFormState("idle");
    setErrorMessage("");
  }

  return (
    <>
      {/* ─── Floating Chat Button ─── */}
      <button
        ref={buttonRef}
        id="chat-widget-toggle"
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (formState === "success") resetForm();
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
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
          transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease",
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
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: "transform 0.3s ease",
            }}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#1a1a1a"
            style={{
              transition: "transform 0.3s ease",
            }}
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
          </svg>
        )}
      </button>

      {/* ─── Chat Panel ─── */}
      <div
        ref={panelRef}
        style={{
          position: "fixed",
          bottom: "96px",
          right: "24px",
          zIndex: 9998,
          width: "380px",
          maxHeight: "calc(100vh - 140px)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            padding: "24px 24px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            position: "relative",
          }}
        >
          {/* Subtle gold accent line at top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #c9a84c, #e8d48b, #c9a84c)",
            }}
          />

          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              Leave a message
            </h3>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              We&apos;ll get back to you shortly
            </p>
          </div>

          {/* Close chevron */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.1)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            overflowY: "auto",
            maxHeight: "calc(100vh - 280px)",
          }}
        >
          {formState === "success" ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 16px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c9a84c 0%, #e8d48b 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  animation: "chatSuccessPop 0.5s cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4
                style={{
                  margin: "0 0 8px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a1a1a",
                }}
              >
                Message Sent!
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: 1.5,
                }}
              >
                Thank you for reaching out. We&apos;ll get back to you as soon as
                possible.
              </p>
              <button
                onClick={resetForm}
                style={{
                  marginTop: "20px",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#1a1a1a",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#333";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a";
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: "14px" }}>
                <input
                  id="chat-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #e5e5e5",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    background: "#fafafa",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(201,168,76,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e5e5";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "14px" }}>
                <input
                  id="chat-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #e5e5e5",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    background: "#fafafa",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(201,168,76,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e5e5";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "14px" }}>
                <input
                  id="chat-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #e5e5e5",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    background: "#fafafa",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(201,168,76,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e5e5";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "16px" }}>
                <textarea
                  id="chat-message"
                  name="message"
                  required
                  placeholder="Type your message and click 'Submit'"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #e5e5e5",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    background: "#fafafa",
                    outline: "none",
                    resize: "vertical",
                    minHeight: "100px",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(201,168,76,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e5e5";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Error message */}
              {formState === "error" && (
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: "13px",
                    color: "#dc3545",
                    background: "rgba(220,53,69,0.08)",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }}
                >
                  {errorMessage}
                </p>
              )}

              {/* Submit */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  id="chat-submit"
                  type="submit"
                  disabled={formState === "submitting"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    borderRadius: "10px",
                    border: "none",
                    background:
                      formState === "submitting"
                        ? "#999"
                        : "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor:
                      formState === "submitting" ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    if (formState !== "submitting") {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "linear-gradient(135deg, #c9a84c 0%, #e8d48b 100%)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#1a1a1a";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 4px 16px rgba(201,168,76,0.35)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formState !== "submitting") {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "linear-gradient(135deg, #1a1a1a 0%, #333 100%)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.15)";
                    }
                  }}
                >
                  {formState === "submitting" ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          animation: "chatSpin 1s linear infinite",
                        }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ─── Keyframe Animations ─── */}
      <style jsx global>{`
        @keyframes chatSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes chatSuccessPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Mobile responsiveness */
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

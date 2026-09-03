"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

function getDhakaTime() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getDhakaHour() {
  return parseInt(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "numeric",
      hour12: false,
    })
  );
}

function getTimeIndicator(hour: number) {
  if (hour >= 8 && hour < 21) return { color: "#22c55e", label: "daytime" };
  if (hour >= 21 && hour < 23) return { color: "#f5a623", label: "evening" };
  return { color: "#666", label: "late night" };
}

const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/saadh393/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/saadh393/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/saadx393",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Medium",
    url: "https://medium.com/@saadh393",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [time, setTime] = useState("");
  const [hour, setHour] = useState(12);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(getDhakaTime());
    setHour(getDhakaHour());
    const interval = setInterval(() => {
      setTime(getDhakaTime());
      setHour(getDhakaHour());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormState("sent");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const indicator = getTimeIndicator(hour);

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className={`contact-reveal ${revealed ? "contact-revealed" : ""}`}
        style={{
          padding: "90px 0 60px",
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: "clamp(16px, 4vw, 48px)",
          paddingRight: "clamp(16px, 4vw, 48px)",
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            fontWeight: 500,
            color: "#999",
            letterSpacing: "0.04em",
            marginBottom: 48,
          }}
        >
          {"// let's work together"}
        </p>

        {/* 2-column layout */}
        <div className="contact-grid">
          {/* Left: human side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <p
                style={{
                  fontSize: "clamp(22px, 2.8vw, 28px)",
                  fontWeight: 600,
                  color: "#000",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.3,
                  margin: 0,
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                I&rsquo;m looking for frontend or full-stack roles where I can ship real things with real teams.
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "#666",
                  lineHeight: 1.6,
                  marginTop: 16,
                  letterSpacing: "-0.008em",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                Open to remote worldwide. Response time: usually within 24 hours.
              </p>
            </div>

            {/* Timezone signal */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                borderRadius: 9999,
                border: "1px solid rgba(0,0,0,0.06)",
                background: "rgba(0,0,0,0.02)",
                width: "fit-content",
              }}
            >
              <span
                className="contact-time-dot"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: indicator.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#555",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                Currently {time || "--:--"} in Dhaka, Bangladesh
              </span>
            </div>

            {/* Primary CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="mailto:nasimulhasan393@gmail.com" className="hero-btn-primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email me
                <span className="hero-btn-arrow" style={{ fontSize: 14 }}>&#8594;</span>
              </a>
              <a
                href="https://www.linkedin.com/in/saadh393/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-secondary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label={s.name}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                borderRadius: 9999,
                border: "1px solid rgba(34,197,94,0.25)",
                background: "rgba(34,197,94,0.04)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#22c55e",
                  letterSpacing: "0.02em",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                Open to remote worldwide
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {formState === "sent" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 300,
                  gap: 16,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#000", margin: 0 }}>
                  Message sent
                </p>
                <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
                  I&rsquo;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#0070f3",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label className="contact-label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="contact-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="contact-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="contact-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="contact-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="contact-input contact-textarea"
                    placeholder="What are you working on?"
                  />
                </div>

                {formState === "error" && (
                  <p style={{ fontSize: 13, color: "#ee0000", margin: 0 }}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="contact-submit"
                >
                  {formState === "sending" ? "Sending..." : "Send Message \u2192"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px clamp(16px, 4vw, 48px)",
        }}
      >
        <div className="contact-footer">
          <span
            style={{
              fontSize: 13,
              color: "#999",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            Md Nasimul Hasan &middot; 2026
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#bbb",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.01em",
            }}
          >
            Built with Next.js &middot; Designed with precision
          </span>
          <a
            href="/md-nasimul-hasan-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              color: "#666",
              textDecoration: "none",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              transition: "color 0.15s ease",
            }}
            className="contact-resume-link"
          >
            Resume &#8599;
          </a>
        </div>
      </footer>
    </>
  );
}

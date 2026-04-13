"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Data ─── */
const ROLES = [
  "Frontend Engineer",
  "React Specialist",
  "Next.js Developer",
  "JavaScript Engineer",
];

const STATS = [
  { value: "10,000+", label: "Students Served" },
  { value: "1 Cr+", label: "BDT Revenue Impact" },
  { value: "5", label: "Production Apps" },
  { value: "6", label: "Published Articles" },
];

const TICKER_ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
  "REST API", "Tailwind CSS", "Git", "Figma", "Prisma",
  "Redis", "Docker", "FFmpeg", "AWS S3", "Stripe",
];

const SOCIALS = [
  {
    href: "https://github.com/saadh393/",
    label: "GitHub",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/saadh393/",
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/saadx393",
    label: "X",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

/* ─── Component ─── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [entered, setEntered] = useState(false);

  // Staggered entry
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase("in");
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cursor glow
  const glowRef = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    el.style.opacity = "1";
    el.style.transform = `translate(${e.clientX - rect.left - 300}px, ${e.clientY - rect.top - 300}px)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    const el = glowRef.current;
    if (el) el.style.opacity = "0";
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="hero-section"
      style={{
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Cursor glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,112,243,0.045) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
          transition: "opacity 0.4s ease",
          willChange: "transform",
        }}
      />

      {/* Subtle grid */}
      <div className="hero-grid-bg" aria-hidden="true" />

      {/* Main content area */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "clamp(72px, 10vh, 120px) clamp(20px, 4vw, 48px) 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* ── Header Row: Status + Location ── */}
        <div
          className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(48px, 7vh, 80px)",
            transitionDelay: "0s",
          }}
        >
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px 5px 10px",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.18)",
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 500,
              color: "#15803d",
              letterSpacing: "0.01em",
            }}
          >
            <span className="hero-status-dot" />
            Available for Work
          </div>

          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#bbb",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Dhaka, BD / UTC+6
          </span>
        </div>

        {/* ── Two-column: Identity + Photo ── */}
        <div className="hero-main-grid">
          {/* Left column */}
          <div style={{ minWidth: 0 }}>
            {/* Handle */}
            <div
              className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
              style={{ transitionDelay: "0.06s", marginBottom: 16 }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#0070f3",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0.02em",
                }}
              >
                @saadh393
              </span>
            </div>

            {/* Name */}
            <h1
              className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
              style={{
                transitionDelay: "0.12s",
                fontSize: "clamp(52px, 8vw, 88px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#000",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                margin: "0 0 20px",
              }}
            >
              Saad
              <br />
              Hasan
            </h1>

            {/* Role cycling */}
            <div
              className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
              style={{
                transitionDelay: "0.18s",
                height: 28,
                overflow: "hidden",
                marginBottom: 28,
              }}
            >
              <span
                key={roleIdx}
                className={phase === "in" ? "hero-role-in" : "hero-role-out"}
                style={{
                  display: "block",
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  fontWeight: 400,
                  color: "#666",
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {ROLES[roleIdx]}
              </span>
            </div>

            {/* Opinionated bio */}
            <p
              className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
              style={{
                transitionDelay: "0.24s",
                fontSize: 16,
                lineHeight: 1.65,
                color: "#555",
                letterSpacing: "-0.008em",
                maxWidth: 480,
                margin: "0 0 36px",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              I build things that handle real traffic and real money.
              Currently shipping production React at{" "}
              <span style={{ color: "#000", fontWeight: 500 }}>
                Analyzen Innovation Lab
              </span>
              . Previously built the LMS that serves{" "}
              <span style={{ color: "#000", fontWeight: 500 }}>
                10,000+ students
              </span>{" "}
              and processes{" "}
              <span style={{ color: "#000", fontWeight: 500 }}>
                1 Cr+ BDT/year
              </span>
              .
            </p>

            {/* CTAs */}
            <div
              className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
              style={{
                transitionDelay: "0.30s",
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: 48,
              }}
            >
              <a href="#work" className="hero-btn-primary">
                View Work
                <svg
                  className="hero-btn-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.5 7h9M7 2.5L11.5 7 7 11.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#contact" className="hero-btn-secondary">
                Get in Touch
              </a>
              <a
                href="https://github.com/saadh393/saadh393/blob/main/Jr-Software-Engineer-Nasimul-Hasan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-secondary"
              >
                Resume
                <span style={{ fontSize: 11, opacity: 0.5, marginLeft: 2 }}>
                  ↗
                </span>
              </a>
            </div>

            {/* Social row */}
            <div
              className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
              style={{
                transitionDelay: "0.36s",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              {SOCIALS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right column: Photo */}
          <div
            className={`hero-reveal hero-photo-col ${entered ? "hero-revealed" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="hero-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://saadh393.github.io/images/saad-2.jpg"
                alt="Saad Hasan"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            </div>
            {/* Photo caption */}
            <div
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 2px",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "#aaa",
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0.04em",
                }}
              >
                Since 2011
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#aaa",
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0.04em",
                }}
              >
                Remote Worldwide
              </span>
            </div>
          </div>
        </div>

        {/* ── Stat Strip ── */}
        <div
          className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
          style={{
            transitionDelay: "0.42s",
            marginTop: "clamp(48px, 6vh, 72px)",
            paddingTop: 32,
            borderTop: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <div className="hero-stats-row">
            {STATS.map(({ value, label }) => (
              <div key={label} className="hero-stat">
                <div className="hero-stat-value">{value}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Tech Ticker ── */}
      <div
        className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
        style={{
          transitionDelay: "0.52s",
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "13px 0",
          marginTop: "auto",
          background: "rgba(250,250,250,0.6)",
        }}
      >
        <div className="hero-ticker-mask">
          <div className="hero-ticker-track" aria-hidden="true">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="hero-ticker-item">
                <span className="hero-ticker-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

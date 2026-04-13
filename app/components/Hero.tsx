"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Frontend Engineer",
  "React Specialist",
  "Next.js Developer",
  "JavaScript Engineer",
  "UI Architect",
];

const TICKER_ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
  "REST API", "Tailwind CSS", "Git", "Figma", "Prisma",
  "Redis", "Docker", "FFmpeg", "AWS S3", "Stripe",
];

function useCounter(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [countersOn, setCountersOn] = useState(false);
  const [entered, setEntered] = useState(false);

  const years = useCounter(10, 900, countersOn);
  const apps = useCounter(5, 700, countersOn);
  const articles = useCounter(6, 750, countersOn);

  // Entry animation trigger
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    const t2 = setTimeout(() => setCountersOn(true), 800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  // Typewriter role cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Cursor spotlight
  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spot.style.left = `${x}px`;
      spot.style.top = `${y}px`;
      spot.style.opacity = "1";
    };
    const onLeave = () => { spot.style.opacity = "0"; };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fade-up-hero {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-hero {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes img-scale {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes role-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes role-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes line-grow {
          from { width: 0; }
          to { width: 48px; }
        }
        @keyframes wm-reveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hero-line-1 { opacity: 0; animation: fade-up-hero 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s forwards; }
        .hero-line-2 { opacity: 0; animation: fade-up-hero 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s forwards; }
        .hero-sub    { opacity: 0; animation: fade-up-hero 0.6s cubic-bezier(0.16,1,0.3,1) 0.38s forwards; }
        .hero-actions{ opacity: 0; animation: fade-up-hero 0.6s cubic-bezier(0.16,1,0.3,1) 0.52s forwards; }
        .hero-stats  { opacity: 0; animation: fade-up-hero 0.6s cubic-bezier(0.16,1,0.3,1) 0.65s forwards; }
        .hero-badge  { opacity: 0; animation: slide-in-left 0.5s cubic-bezier(0.16,1,0.3,1) 0s forwards; }
        .hero-img    { opacity: 0; animation: img-scale 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; }
        .hero-wm     { opacity: 0; animation: wm-reveal 1.2s ease 0.3s forwards; }
        .hero-vline  { opacity: 0; animation: slide-in-left 0.5s ease 0.7s forwards; }

        .role-text-in  { animation: role-in 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
        .role-text-out { animation: role-out 0.3s ease forwards; }

        .status-dot { animation: dot-pulse 2.2s ease-in-out infinite; }
        .accent-line { animation: line-grow 0.5s cubic-bezier(0.16,1,0.3,1) 0.9s both; }

        .btn-p {
          display: inline-flex; align-items: center; gap: 7px;
          background: #000; color: #fff;
          border-radius: 9999px; padding: 11px 24px;
          font-size: 14px; font-weight: 500; border: none;
          cursor: pointer; text-decoration: none;
          transition: background 0.15s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .btn-p:hover { background: #111; transform: translateY(-2px); }
        .btn-s {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; color: #000;
          border-radius: 9999px; padding: 11px 24px;
          font-size: 14px; font-weight: 500;
          border: 1px solid rgba(0,0,0,0.14);
          cursor: pointer; text-decoration: none;
          transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .btn-s:hover { border-color: rgba(0,0,0,0.35); background: rgba(0,0,0,0.03); transform: translateY(-2px); }
        .btn-arrow { transition: transform 0.15s ease; }
        .btn-p:hover .btn-arrow, .btn-s:hover .btn-arrow { transform: translateX(4px); }

        .stat-val {
          font-size: 36px; font-weight: 700; line-height: 1;
          letter-spacing: -0.04em; color: #000;
          font-variant-numeric: tabular-nums;
        }
        .stat-lbl {
          font-size: 11px; font-weight: 500; color: #999;
          letter-spacing: 0.04em; text-transform: uppercase; margin-top: 4px;
        }

        .ticker-wrap {
          display: flex; gap: 0; overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
        }
        .ticker-track {
          display: flex; gap: 0; flex-shrink: 0;
          animation: marquee-scroll 28s linear infinite;
        }
        .ticker-item {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 0 20px; font-size: 12px; font-weight: 500;
          color: #888; letter-spacing: 0.04em; text-transform: uppercase;
          white-space: nowrap;
        }
        .ticker-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(0,112,243,0.5); flex-shrink: 0;
        }

        .spotlight {
          position: absolute; pointer-events: none; z-index: 0;
          width: 500px; height: 500px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0,112,243,0.06) 0%, transparent 65%);
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 100%);
        }

        .social-link {
          display: inline-flex; align-items: center;
          width: 34px; height: 34px; border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          background: transparent; cursor: pointer;
          text-decoration: none; color: #555;
          justify-content: center;
          transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s;
        }
        .social-link:hover { border-color: rgba(0,0,0,0.3); background: rgba(0,0,0,0.04); color: #000; transform: translateY(-2px); }

        @media (prefers-reduced-motion: reduce) {
          .hero-line-1,.hero-line-2,.hero-sub,.hero-actions,.hero-stats,
          .hero-badge,.hero-img,.hero-wm,.hero-vline { animation: none; opacity: 1; }
          .ticker-track { animation: none; }
          .status-dot { animation: none; }
          .accent-line { animation: none; width: 48px; }
        }

        @media (max-width: 900px) {
          .hero-main-layout { flex-direction: column !important; }
          .hero-img-col { width: 100% !important; }
          .hero-wm { display: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          background: "#fff",
          overflow: "hidden",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Grid background */}
        <div className="grid-bg" />

        {/* Cursor spotlight */}
        <div ref={spotRef} className="spotlight" />

        {/* Giant watermark */}
        <div
          className="hero-wm"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -52%)",
            fontSize: "clamp(80px, 18vw, 220px)",
            fontWeight: 800,
            letterSpacing: "-0.055em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,0,0,0.055)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 0,
            userSelect: "none",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          SAAD
        </div>

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "clamp(80px,10vh,120px) clamp(16px,4vw,48px) 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Top row: badge + index */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "clamp(40px,6vh,64px)",
            }}
          >
            <div className="hero-badge">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  background: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "9999px",
                  padding: "5px 13px 5px 8px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#333",
                  letterSpacing: "0.02em",
                }}
              >
                <span
                  className="status-dot"
                  style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#22c55e", display: "inline-block", flexShrink: 0,
                  }}
                />
                Open to Work · Remote Worldwide
              </span>
            </div>

            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "#bbb",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              Portfolio &#47;&#47; 2026
            </span>
          </div>

          {/* Main layout */}
          <div
            className="hero-main-layout"
            style={{
              display: "flex",
              gap: "clamp(32px, 5vw, 72px)",
              alignItems: "flex-start",
            }}
          >
            {/* Left: text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Name */}
              <div style={{ marginBottom: "16px" }}>
                <div
                  className="hero-line-1"
                  style={{
                    fontSize: "clamp(48px,7.5vw,84px)",
                    fontWeight: 700,
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    color: "#000",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  }}
                >
                  Saad
                </div>
                <div
                  className="hero-line-2"
                  style={{
                    fontSize: "clamp(48px,7.5vw,84px)",
                    fontWeight: 700,
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    color: "#000",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "16px",
                  }}
                >
                  <span>Hasan</span>
                  <span
                    style={{
                      fontSize: "clamp(14px,1.5vw,18px)",
                      fontWeight: 500,
                      color: "#0070f3",
                      letterSpacing: "-0.01em",
                      fontFamily: "var(--font-geist-mono), monospace",
                      paddingBottom: "4px",
                    }}
                  >
                    @saadh393
                  </span>
                </div>
              </div>

              {/* Accent line */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  className="accent-line"
                  style={{
                    height: "3px",
                    background: "linear-gradient(90deg, #0070f3, #3291ff)",
                    borderRadius: "9999px",
                    width: "0",
                  }}
                />
              </div>

              {/* Animated role */}
              <div
                style={{
                  height: "32px",
                  overflow: "hidden",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  key={roleIdx}
                  className={roleVisible ? "role-text-in" : "role-text-out"}
                  style={{
                    fontSize: "clamp(16px,1.8vw,20px)",
                    fontWeight: 400,
                    color: "#555",
                    letterSpacing: "-0.015em",
                    display: "block",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  {ROLES[roleIdx]}
                </span>
              </div>

              {/* Bio */}
              <p
                className="hero-sub"
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: "#666",
                  letterSpacing: "-0.008em",
                  maxWidth: "460px",
                  margin: "0 0 36px",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                10+ years of self-taught engineering. I build precise, scalable
                web experiences with{" "}
                <span style={{ color: "#000", fontWeight: 500 }}>React & Next.js</span>.
                Currently shipping at{" "}
                <span style={{ color: "#000", fontWeight: 500 }}>Analyzen Innovation Lab</span>,
                Bangladesh.
              </p>

              {/* CTAs */}
              <div
                className="hero-actions"
                style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px" }}
              >
                <a href="#projects" className="btn-p">
                  View Work
                  <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M7 2.5L11.5 7 7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#contact" className="btn-s">
                  Get in Touch
                </a>
                <a
                  href="https://github.com/saadh393/saadh393/blob/main/Jr-Software-Engineer-Nasimul-Hasan.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-s"
                >
                  Résumé ↗
                </a>
              </div>

              {/* Stats */}
              <div
                className="hero-stats"
                style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "flex-start" }}
              >
                {[
                  { val: years, suffix: "+", label: "Years Coding" },
                  { val: apps, suffix: "", label: "Production Apps" },
                  { val: articles, suffix: "", label: "Articles" },
                ].map(({ val, suffix, label }) => (
                  <div key={label}>
                    <div className="stat-val">{val}{suffix}</div>
                    <div className="stat-lbl">{label}</div>
                  </div>
                ))}

                {/* Social icons */}
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  {[
                    {
                      href: "https://github.com/saadh393/",
                      label: "GitHub",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.linkedin.com/in/saadh393/",
                      label: "LinkedIn",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      ),
                    },
                    {
                      href: "https://x.com/saadx393",
                      label: "X / Twitter",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      ),
                    },
                  ].map(({ href, label, icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={label}>
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: image */}
            <div
              className="hero-img hero-img-col"
              style={{
                flexShrink: 0,
                width: "clamp(180px, 22vw, 280px)",
                position: "relative",
              }}
            >
              {/* Decorative grid accent */}
              <div
                style={{
                  position: "absolute",
                  top: "-16px",
                  right: "-16px",
                  width: "80px",
                  height: "80px",
                  backgroundImage: "radial-gradient(circle, rgba(0,112,243,0.25) 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                  zIndex: 0,
                  borderRadius: "4px",
                }}
              />

              {/* Image */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                  aspectRatio: "4/5",
                  background: "#f0f0f0",
                }}
              >
                {/* Blue accent stripe */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "4px",
                    background: "linear-gradient(180deg, #0070f3 0%, #3291ff 100%)",
                    zIndex: 2,
                  }}
                />
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
                    filter: "contrast(1.02)",
                  }}
                />
                {/* Subtle overlay at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "60px",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.08))",
                  }}
                />
              </div>

              {/* Caption under image */}
              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Dhaka, BD
                </span>
                <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 500, letterSpacing: "0.04em", fontFamily: "var(--font-geist-mono)" }}>
                  UTC+6
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(0,0,0,0.07)",
            padding: "14px 0",
            background: "rgba(250,250,250,0.8)",
          }}
        >
          <div className="ticker-wrap">
            <div className="ticker-track" aria-hidden="true">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="ticker-item">
                  <span className="ticker-dot" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

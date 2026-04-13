"use client";

import { useEffect, useRef, useState } from "react";

const JOBS = [
  {
    company: "Analyzen Innovation Lab",
    role: "Jr. Software Engineer",
    period: "2024 — Present",
    current: true,
    logoPath: "/images/experience/analyzen.svg",
    logoFallback: "A",
    bullets: [
      "Shipped production frontend components serving real users inside an enterprise innovation lab — zero tolerance for regressions",
      "Collaborated directly with designers and PMs to translate high-fidelity specs into pixel-accurate, accessible interfaces",
      "Contributed to internal tooling that accelerated team delivery cadence",
    ],
  },
  {
    company: "Learn with Sumit",
    role: "Product Manager",
    period: "2023 — 2024",
    current: false,
    logoPath: "/images/experience/lws.svg",
    logoFallback: "L",
    bullets: [
      "Owned product roadmap for an LMS serving 10,000+ active students — every decision had revenue implications (1 Cr+ BDT/year)",
      "Coordinated cross-functional teams across engineering, content, and design to ship features on schedule",
      "Bridged the gap between business needs and technical constraints — often writing specs and implementation notes simultaneously",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        padding: "90px 0",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        paddingLeft: "clamp(20px, 4vw, 48px)",
        paddingRight: "clamp(20px, 4vw, 48px)",
      }}
    >
      {/* Section header */}
      <div
        className={`exp-reveal ${visible ? "exp-revealed" : ""}`}
        style={{ transitionDelay: "0s" }}
      >
        <span className="section-overline">Experience</span>
        <h2 className="section-heading">Delivery History</h2>
      </div>

      {/* Timeline */}
      <div className="exp-timeline" style={{ marginTop: 48 }}>
        {JOBS.map((job, i) => (
          <div
            key={job.company}
            className={`exp-reveal exp-entry ${visible ? "exp-revealed" : ""}`}
            style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
          >
            {/* Node */}
            <div className="exp-node" aria-hidden="true">
              <div
                className="exp-node-dot"
                style={{
                  background: job.current ? "#0070f3" : "rgba(0,0,0,0.15)",
                  boxShadow: job.current
                    ? "0 0 0 4px rgba(0,112,243,0.12)"
                    : "none",
                }}
              />
            </div>

            {/* Content */}
            <div className="exp-content">
              {/* Header row */}
              <div className="exp-header">
                <div className="exp-company-row">
                  <LogoMark
                    src={job.logoPath}
                    fallback={job.logoFallback}
                    alt={job.company}
                  />
                  <span className="exp-company">{job.company}</span>
                  {job.current && <span className="exp-current-badge">Current</span>}
                </div>

                <span className="exp-period">{job.period}</span>
              </div>

              <span className="exp-role">{job.role}</span>

              {/* Bullets */}
              <ul className="exp-bullets">
                {job.bullets.map((b, j) => (
                  <li key={j} className="exp-bullet">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Logo with fallback ─── */
function LogoMark({
  src,
  fallback,
  alt,
}: {
  src: string;
  fallback: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="exp-logo-fallback"
        aria-label={alt}
      >
        {fallback}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={18}
      height={18}
      style={{ display: "block", flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}

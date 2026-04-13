"use client";

import { useEffect, useRef, useState } from "react";

const STRENGTHS = [
  "API Design",
  "Debugging Depth",
  "Modular Architecture",
  "Research-Oriented",
  "Distributed Systems",
  "Performance Tuning",
  "Frontend Craft",
  "System Thinking",
];

export default function About() {
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
      style={{
        padding: "90px 0",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        paddingLeft: "clamp(20px, 4vw, 48px)",
        paddingRight: "clamp(20px, 4vw, 48px)",
      }}
    >
      {/* Bio */}
      <div
        className={`about-reveal ${visible ? "about-revealed" : ""}`}
        style={{ transitionDelay: "0s" }}
      >
        <p
          style={{
            fontSize: "clamp(17px, 1.8vw, 20px)",
            lineHeight: 1.65,
            color: "#444",
            letterSpacing: "-0.01em",
            maxWidth: 680,
            margin: 0,
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          I&rsquo;ve been writing code since 2011. Most of it was terrible. The
          gap between then and now is 10+ years of shipping things that broke,
          debugging things nobody else could fix, and learning by building things
          that actually had to work. I care about{" "}
          <span style={{ color: "#000", fontWeight: 500 }}>correctness</span>,{" "}
          <span style={{ color: "#000", fontWeight: 500 }}>performance</span>,
          and{" "}
          <span style={{ color: "#000", fontWeight: 500 }}>
            systems that don&rsquo;t wake people up at 3am
          </span>
          .
        </p>
      </div>

      {/* Strengths */}
      <div
        className={`about-reveal ${visible ? "about-revealed" : ""}`}
        style={{
          transitionDelay: "0.1s",
          marginTop: 48,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {STRENGTHS.map((s) => (
          <span key={s} className="about-pill">
            {s}
          </span>
        ))}
      </div>

      {/* Currently thinking about */}
      <div
        className={`about-reveal ${visible ? "about-revealed" : ""}`}
        style={{ transitionDelay: "0.2s", marginTop: 48 }}
      >
        <span
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            color: "#0070f3",
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            fontFamily: "var(--font-geist-mono), monospace",
            marginBottom: 12,
          }}
        >
          Currently thinking about
        </span>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: "#666",
            letterSpacing: "-0.008em",
            maxWidth: 560,
            margin: 0,
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          How edge computing changes the assumptions we make about where code
          runs. And what it means to build AI-native systems from scratch rather
          than bolting AI onto existing ones.
        </p>
      </div>
    </section>
  );
}

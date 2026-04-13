"use client";

import { useEffect, useRef, useState } from "react";

const STACK = [
  {
    category: "Frontend",
    note: "Primary domain -- 4 production apps",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    note: "APIs, services, and data layers",
    items: ["Node.js", "Express", "REST API", "MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    category: "Infrastructure",
    note: "Deployment and distributed systems",
    items: ["AWS S3", "Cloudflare Workers", "Docker", "Redis", "BullMQ", "MinIO", "FFmpeg"],
  },
  {
    category: "Tooling",
    note: "Daily workflow",
    items: ["Git", "Figma", "Stripe", "Pinecone", "Google Gemini", "Vercel"],
  },
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: "90px 0",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        paddingLeft: "clamp(20px, 4vw, 48px)",
        paddingRight: "clamp(20px, 4vw, 48px)",
      }}
    >
      {/* Section label */}
      <div
        className={`stack-reveal ${visible ? "stack-revealed" : ""}`}
        style={{ transitionDelay: "0s", marginBottom: 48 }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#999",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.01em",
          }}
        >
          {"// stack"}
        </span>
      </div>

      {/* 2-column grid */}
      <div className="stack-grid">
        {STACK.map((group, gi) => (
          <div
            key={group.category}
            className={`stack-reveal ${visible ? "stack-revealed" : ""}`}
            style={{ transitionDelay: `${0.08 * (gi + 1)}s` }}
          >
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#000",
                  letterSpacing: "-0.015em",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {group.category}
              </span>
            </div>
            <div style={{ marginBottom: 14 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#999",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0em",
                }}
              >
                {group.note}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {group.items.map((item) => (
                <span key={item} className="stack-token">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

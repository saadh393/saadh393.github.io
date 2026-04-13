"use client";

import { useEffect, useRef } from "react";

const articles = [
  {
    title: "HTTP Caching in Node.js with Undici",
    date: "Mar 24, 2024",
    readTime: "8 min",
    tag: "Node.js",
    description:
      "Most Node.js apps skip HTTP caching entirely. Here's how to do it properly with Undici v7.",
    link: "https://saadh393.hashnode.dev/",
  },
  {
    title: "Understanding JavaScript's Execution Context",
    date: "Mar 23, 2024",
    readTime: "6 min",
    tag: "JavaScript",
    description:
      "You can't debug what you don't understand. This is how the JS engine actually runs your code.",
    link: "https://saadh393.hashnode.dev/",
  },
  {
    title: "React useMemo Hook",
    date: "Sep 7, 2023",
    readTime: "5 min",
    tag: "React",
    description:
      "Memoization isn't magic. Here's when it actually helps and when it's just noise.",
    link: "https://saadh393.hashnode.dev/react-usememo-hook",
  },
  {
    title: "Building React Custom Hooks from Scratch",
    date: "Jul 2, 2023",
    readTime: "7 min",
    tag: "React",
    description:
      "Extracting reusable stateful logic into custom hooks — the pattern that changed how I write React.",
    link: "https://saadh393.hashnode.dev/building-react-custom-hooks-from-scratch",
  },
];

const tagColors: Record<string, string> = {
  "Node.js": "#16a34a",
  JavaScript: "#d97706",
  React: "#0070f3",
  Backend: "#888888",
};

export default function Writing() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      itemRefs.current.forEach((el) => {
        if (el) el.classList.add("writing-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("writing-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writing"
      ref={sectionRef}
      style={{
        padding: "90px 0",
        maxWidth: 1200,
        margin: "0 auto",
        paddingLeft: "clamp(16px, 4vw, 48px)",
        paddingRight: "clamp(16px, 4vw, 48px)",
      }}
    >
      {/* Section label */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "#999",
          letterSpacing: "0.04em",
          fontFamily: "var(--font-geist-mono), monospace",
          margin: "0 0 40px",
        }}
      >
        {"// published work"}
      </p>

      {/* Articles list */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
        className="writing-grid"
      >
        {articles.map((article, i) => {
          const color = tagColors[article.tag] || "#888";
          return (
            <a
              key={article.title}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="writing-reveal writing-card"
              style={{
                transitionDelay: `${i * 80}ms`,
                display: "block",
                textDecoration: "none",
                padding: 28,
                borderRadius: 12,
                border: "1px solid rgba(0, 0, 0, 0.08)",
                background: "#ffffff",
                transition: `border-color 0.15s ease, transform 0.15s ease, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
              }}
            >
              {/* Top row: tag + date/read time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "2px 9px",
                    fontSize: 11,
                    fontWeight: 500,
                    color: color,
                    border: `1px solid ${color}33`,
                    borderRadius: 9999,
                    letterSpacing: "0.02em",
                    fontFamily: "var(--font-geist-mono), monospace",
                    lineHeight: 1.4,
                  }}
                >
                  {article.tag}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#bbb",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {article.date} · {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#000",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  margin: "0 0 8px",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {article.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#555",
                  letterSpacing: "-0.008em",
                  margin: "0 0 16px",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {article.description}
              </p>

              {/* Read arrow */}
              <span
                className="writing-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#000",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                Read article
                <span className="writing-arrow" style={{ display: "inline-flex" }}>
                  →
                </span>
              </span>
            </a>
          );
        })}
      </div>

      {/* View all */}
      <div style={{ marginTop: 32 }}>
        <a
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            color: "#999",
            textDecoration: "none",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.01em",
            transition: "color 0.15s ease",
          }}
          className="writing-view-all"
        >
          View all writing
          <span className="writing-arrow-all" style={{ display: "inline-flex" }}>
            →
          </span>
        </a>
      </div>
    </section>
  );
}

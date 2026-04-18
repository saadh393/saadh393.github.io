"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { articles, tagColors } from "@/lib/articles";

const FEATURED_COUNT = 4;

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
      {/* Section header */}
      <div style={{ marginBottom: 48 }}>
        <span className="section-overline">Writing</span>
        <h2 className="section-heading">Published Work</h2>
      </div>

      {/* Articles list */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
        className="writing-grid"
      >
        {articles.slice(0, FEATURED_COUNT).map((article, i) => {
          const color = tagColors[article.tag] || "#888";
          const isInternal = article.link.startsWith("/");
          const cardStyle = {
            transitionDelay: `${i * 80}ms`,
            display: "block",
            textDecoration: "none",
            padding: 28,
            borderRadius: 12,
            border: "1px solid rgba(0, 0, 0, 0.08)",
            background: "#ffffff",
            transition: `border-color 0.15s ease, transform 0.15s ease, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
          };
          const cardProps = {
            ref: (el: HTMLAnchorElement | null) => { itemRefs.current[i] = el; },
            className: "writing-reveal writing-card",
            style: cardStyle,
          };
          return isInternal ? (
            <Link key={article.title} href={article.link} prefetch={true} {...cardProps}>
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
            </Link>
          ) : (
            <a
              key={article.title}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              {...cardProps}
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
        <Link
          href="/blog"
          prefetch={true}
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
        </Link>
      </div>
    </section>
  );
}

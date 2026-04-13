import { articles, tagColors } from "@/lib/articles";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Writing",
    description:
        "Articles on JavaScript, React, Node.js, and engineering depth — by Saad Hasan.",
};

export default function BlogPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#fff", paddingBottom: 120 }}>
            {/* Top bar */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    padding: "14px clamp(20px, 4vw, 48px)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <Link
                    href="/"
                    style={{
                        fontSize: 13,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "#999",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        transition: "color 0.15s",
                    }}
                >
                    ← Home
                </Link>
                <span style={{ color: "rgba(0,0,0,0.12)" }}>·</span>
                <span
                    style={{
                        fontSize: 13,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "#bbb",
                    }}
                >
                    Writing
                </span>
            </div>

            {/* Header */}
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "64px clamp(20px, 4vw, 48px) 48px",
                }}
            >
                <span
                    style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#0070f3",
                        fontFamily: "var(--font-geist-mono), monospace",
                        marginBottom: 12,
                    }}
                >
                    Writing
                </span>
                <h1
                    style={{
                        fontSize: "clamp(28px, 5vw, 42px)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        color: "#000",
                        margin: "0 0 16px",
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    }}
                >
                    Published Work
                </h1>
                <p
                    style={{
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: "#666",
                        margin: 0,
                        maxWidth: 520,
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        letterSpacing: "-0.008em",
                    }}
                >
                    {articles.length} articles on JavaScript, React, Node.js, and the
                    infrastructure decisions that matter at production scale.
                </p>
            </div>

            {/* Articles grid */}
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 clamp(20px, 4vw, 48px)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 16,
                }}
            >
                {articles.map((article) => {
                    const color = tagColors[article.tag] || "#888";
                    const isInternal = article.link.startsWith("/");
                    return (
                        <a
                            key={article.title}
                            href={article.link}
                            target={isInternal ? "_self" : "_blank"}
                            rel={isInternal ? undefined : "noopener noreferrer"}
                            style={{
                                display: "block",
                                textDecoration: "none",
                                padding: 28,
                                borderRadius: 12,
                                border: "1px solid rgba(0, 0, 0, 0.08)",
                                background: "#ffffff",
                                transition: "border-color 0.15s ease, transform 0.15s ease",
                            }}
                            className="writing-card"
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
                            <h2
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
                            </h2>

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
        </main>
    );
}

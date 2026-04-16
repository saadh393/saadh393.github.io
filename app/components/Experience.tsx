"use client";

import { useEffect, useRef, useState } from "react";

const JOBS = [
    {
        company: "Learn with Sumit",
        role: "Software Engineer & Product Lead",
        period: "2021 — Present",
        current: true,
        logoPath: "/learn-with-sumit.png",
        logoFallback: "L",
        bullets: [
            "End-to-end ownership of an LMS platform serving 10,000+ students and processing 1 Cr+ BDT/year in revenue — every feature decision had direct financial implications",
            "Built core frontend infrastructure: watch-time tracking, DRM-protected HLS streaming, passkey auth, quiz flows, CV generator — deployed on AWS with Cloudflare edge",
            "Scoped and shipped features across the full stack while coordinating content, design, and engineering timelines across multiple product roadmaps",
        ],
    },
    {
        company: "Analyzen",
        role: "Software Engineer",
        period: "2022 — 2024",
        current: false,
        logoPath: "/analyzen.png",
        logoFallback: "A",
        bullets: [
            "Built and shipped production React interfaces for enterprise clients — translating high-fidelity Figma specs into pixel-accurate, accessible components across devices",
            "Developed interactive dashboards with REST API integration and complex frontend state management for digital marketing and consulting engagements",
            "Promoted from Jr. Front End Developer (Aug 2021) to Software Engineer based on delivery consistency and technical ownership",
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
            { threshold: 0.1 },
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
                                    background: job.current
                                        ? "#0070f3"
                                        : "rgba(0,0,0,0.15)",
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
                                    <span className="exp-company">
                                        {job.company}
                                    </span>
                                    {job.current && (
                                        <span className="exp-current-badge">
                                            Current
                                        </span>
                                    )}
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
            <span className="exp-logo-fallback" aria-label={alt}>
                {fallback}
            </span>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            width={34}
            height={34}
            style={{ display: "block", flexShrink: 0 }}
            onError={() => setFailed(true)}
        />
    );
}

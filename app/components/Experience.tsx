"use client";

import { useEffect, useRef, useState } from "react";

const JOBS = [
    {
        company: "Learn with Sumit",
        role: "Full Stack Developer (Full-time, Jan 2025 - Present), Part-time / Contract (Apr 2021 - Jan 2025)",
        context: "Ed-tech company building learning and event platforms for the Bangladeshi developer community.",
        period: "April 2021 - Present",
        location: "Remote",
        href: "https://learnwithsumit.com/",
        current: true,
        logoPath: "/learn-with-sumit.png",
        logoFallback: "L",
        bullets: [
            "10,000+ learners and ~$165K/yr revenue on the Next.js, Node.js, MongoDB platform I build and operate",
            "~68 payment req/sec at peak on the DevConf registration and payment flow I built",
            "Shipped device-bound auth (ECDSA keys, signed requests, replay protection, session revocation), ending cookie sharing across devices",
            "Shipped HLS streaming with watch-time tracking, so course progress is measured from real playback",
            "Delivered payment gateways, multi-course enrollment, quizzes, and assignments end-to-end",
            "Run production on AWS with Docker, Nginx, Cloudflare, and Sentry, owning releases and incident triage",
        ],
    },
    {
        company: "Analyzen",
        role: "Jr. Software Engineer (Aug 2022 - Jan 2025), Jr. Frontend Developer (Aug 2021 - Jul 2022)",
        context: "Digital solutions agency building enterprise web, mobile, fintech, and social-media platforms for leading brands.",
        period: "August 2021 - January 2025",
        location: "Dhaka, Bangladesh",
        href: "https://www.analyzen.com/",
        current: false,
        logoPath: "/analyzen.png",
        logoFallback: "A",
        bullets: [
            "Shipped React and Next.js apps for Unilever, Evercare, AKASH, Bengal Meat, and Berger, frontend to deployment",
            "Modernized the MICROZEN microcredit-automation frontend; ran its deploys and cross-server backups",
            "Built LISTENYZEN backend integrations for Facebook SDK messaging and SMS workflows",
            "Delivered Unilever Frontline Academy, a nationwide platform for Unilever's frontline workforce",
            "Promoted in 12 months, expanding from frontend into backend and production infrastructure ownership",
        ],
    },
    {
        company: "Freelance / Contract",
        role: "Frontend & Platform Engineer",
        context: "Offer Finder, a campaign and merchant discovery platform for bKash, Bangladesh's largest mobile financial service.",
        period: "2025 - Present",
        location: "Remote",
        href: "https://offer-finder.com/",
        current: true,
        logoPath: "",
        logoFallback: "O",
        bullets: [
            "~2.2M active users in one month on the Next.js 16 server-rendered platform I built",
            "Lighthouse 100 / 99 / 100 / 100 for performance, accessibility, best practices, and SEO",
            "Cut 15 MB+ search and ~12 MB campaign payloads to paginated server-side queries",
            "Cut the 2-4 min release outage to zero with blue-green deploys on Docker, Nginx, and health checks",
            "Ran the full app and backend on a 2-vCPU origin via Cloudflare caching and clustered Node workers, database off the public internet",
            "Instrumented Sentry across browser, server, and edge runtimes for error and latency monitoring",
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
                                    <a
                                        className="exp-company"
                                        href={job.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {job.company}
                                    </a>
                                    {job.current && (
                                        <span className="exp-current-badge">
                                            Current
                                        </span>
                                    )}
                                </div>

                                <span className="exp-period">
                                    {job.period} &middot; {job.location}
                                </span>
                            </div>

                            <span className="exp-role">{job.role}</span>
                            <span className="exp-context">{job.context}</span>

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

    if (!src || failed) {
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

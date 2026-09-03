"use client";

import { useEffect, useRef, useState } from "react";

const JOBS = [
    {
        company: "Learn with Sumit",
        role: "Jr. Software Engineer",
        period: "April 2021 - Present",
        location: "Remote",
        href: "https://learnwithsumit.com/",
        current: true,
        logoPath: "/learn-with-sumit.png",
        logoFallback: "L",
        bullets: [
            "Own and evolve the core learning management platform built with Next.js, Node.js, and MongoDB, serving 10,000+ learners and supporting more than 2 crore BDT in annual revenue",
            "Designed and deployed a device-bound authentication system using non-exportable ECDSA keys, signed requests, replay protection, device-slot enforcement, token rotation, and session revocation",
            "Built the registration and payment workflow for DevConf, reliably processing ~68 payment requests per second during peak registration",
            "Delivered HLS video streaming and playback-based watch-time tracking, so course progress is measured from actual viewing activity",
            "Deploy and operate the production platform on AWS using Docker, Nginx, Cloudflare, and Sentry",
        ],
    },
    {
        company: "Analyzen",
        role: "Jr. Software Engineer (Aug 2022 - Jan 2025), Jr. Frontend Developer (Aug 2021 - Jul 2022)",
        period: "August 2021 - January 2025",
        location: "Dhaka, Bangladesh",
        href: "https://www.analyzen.com/",
        current: false,
        logoPath: "/analyzen.png",
        logoFallback: "A",
        bullets: [
            "Delivered production React and Next.js applications for enterprise clients including Unilever, Evercare, AKASH, Bengal Meat, and Berger",
            "Modernized the frontend of MICROZEN, an enterprise microcredit automation platform, improving interface consistency, usability, application structure, and runtime performance",
            "Supported MICROZEN's production infrastructure through application deployment, cross-server backups, and server-to-server communication",
            "Developed backend integrations for LISTENYZEN, an omnichannel social-media servicing platform, implementing Facebook SDK-based messaging and SMS communication workflows",
            "Promoted from Jr. Frontend Developer to Jr. Software Engineer based on delivery performance and expanded ownership across frontend, backend, and infrastructure",
        ],
    },
    {
        company: "Independent Contract",
        role: "Frontend & Platform Engineer",
        period: "2025 - Present",
        location: "Remote",
        href: "https://offer-finder.com/",
        current: true,
        logoPath: "",
        logoFallback: "O",
        bullets: [
            "Built the Next.js 16 server-rendered platform behind Offer Finder, bKash's campaign and merchant discovery product, which reached approximately 2.2 million active users in Bangladesh within one month",
            "Achieved verified Lighthouse scores of 100 performance, 99 accessibility, 100 best practices, and 100 SEO through server rendering, streaming, caching, and frontend optimization",
            "Eliminated oversized client payloads by moving filtering to the server, cutting merchant-search transfers from over 15 MB and replacing approximately 12 MB campaign responses with bounded queries, field selection, and pagination",
            "Designed a cost-efficient production architecture running critical application and backend workloads on a two-vCPU origin, using Cloudflare caching and clustered Node.js workers",
            "Implemented a zero-downtime blue-green deployment with Docker, Nginx, and health checks, eliminating the previous two-to-four-minute outage during releases",
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

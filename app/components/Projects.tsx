"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Data ─── */
const projects = [
    {
        id: "offer-finder",
        title: "Offer Finder — bKash",
        category: "Fintech · Scale",
        year: "2026",
        description:
            "bKash's campaign and merchant discovery product, built on Next.js 16 with server rendering, streaming, and caching. It reached approximately 2.2 million active users in Bangladesh within one month, scores 100/99/100/100 on Lighthouse, and runs on a two-vCPU origin behind Cloudflare with zero-downtime blue-green deploys.",
        stack: ["Next.js 16", "TypeScript", "Cloudflare", "Docker", "Nginx", "Sentry"],
        link: "https://offer-finder.com/",
        linkLabel: "Live →",
    },
    {
        id: "lws",
        title: "Learn with Sumit — LMS",
        category: "Enterprise · Scale",
        year: "2025",
        description:
            "10,000 learners couldn't afford broken video or a quiz that lost their progress. Own the platform end to end — HLS video streaming, playback-based watch-time tracking, device-bound ECDSA authentication, quiz and assignment flows, payment gateways — running on AWS with Docker, Nginx, Cloudflare, and Sentry. It supports more than $165K in annual revenue.",
        stack: ["Next.js", "Node.js", "MongoDB", "AWS", "Docker", "Cloudflare"],
        image: "/lws-thumbnail.png",
        link: "https://learnwithsumit.com/",
        linkLabel: "Live →",
        highlight: true,
    },
    {
        id: "projekt",
        title: "Projekt",
        category: "Desktop App · Open Source",
        year: "2026",
        description:
            "I kept losing time finding project folders and retyping the same terminal commands. So I built a desktop app for macOS and Windows that keeps every project in one list, opens it in VS Code or the terminal with one click and runs saved commands like npm run dev in a built-in terminal.",
        stack: ["Tauri 2", "Rust", "React 19", "TypeScript", "SQLite"],
        caseStudy: "/projekt",
        linkLabel: "Product page →",
    },
    {
        id: "distributed-hls",
        title: "Distributed Video Streaming",
        category: "Systems · Architecture",
        year: "2025",
        description:
            "What actually happens when a user uploads a video and 500 people try to watch it simultaneously? Built a proof-of-concept to find out — independent microservices for upload, FFmpeg transcoding, BullMQ job queues, HLS packaging, and MinIO storage. Docker Compose as the orchestration layer.",
        stack: ["Node.js", "FFmpeg", "BullMQ", "Redis", "Docker", "MinIO"],
        github: "https://github.com/saadh393/distributed-hls-streaming-platform",
        caseStudy: "/projects/distributed-hls-streaming-platform",
        linkLabel: "Case Study →",
    },
    {
        id: "prompt-technique-cost",
        title: "Prompt Technique Cost Study",
        category: "AI Engineering · LLM Cost",
        year: "2026",
        description:
            "Teams add examples or \"think step by step\" to prompts without checking the bill. Tested Zero-shot, Few-shot and Chain-of-Thought on 80 support tickets and product listings with Gemini 3.5 Flash Lite. Chain-of-Thought got every ticket right at 4x the cost of Few-shot, then came last on product tags while costing 6x more.",
        stack: ["Python", "OpenRouter", "Gemini", "Rich", "Matplotlib"],
        caseStudy: "/projects/prompt-technique-cost",
        linkLabel: "Case Study →",
    },
    {
        id: "clip-zero-shot",
        title: "Zero-Shot Image Classifier with CLIP",
        category: "AI Engineering · Computer Vision",
        year: "2026",
        description:
            "Thousands of screenshots, receipts and photographed notes were buried in my photo folders. Built a local app that uses OpenAI's CLIP to compare every image against plain-English labels and flag the junk for review, with no training data. It scanned 5,175 images on a laptop CPU at about 57 ms of model time per image.",
        stack: ["Python", "PyTorch", "CLIP", "Hugging Face", "Flask"],
        github: "https://github.com/saadh393/Zero-Shot-CLIP-Classifier",
        caseStudy: "/projects/clip-zero-shot-image-classification",
        linkLabel: "Case Study →",
    },
    {
        id: "semantic-search",
        title: "Semantic Search Engine",
        category: "AI Engineering",
        year: "2026",
        description:
            "Keyword search fails when users describe what they want instead of naming it. Built a semantic product search engine using Pinecone vector embeddings and Google Gemini — understands 'something warm for winter' as intent, not just tokens.",
        stack: ["Python", "FastAPI", "Pinecone", "Gemini", "Pandas", "Docker"],
        github: "https://github.com/saadh393/Semantic-Search",
        caseStudy: "/projects/semantic-search",
        linkLabel: "Case Study →",
    },
    {
        id: "sshm",
        title: "SSHM",
        category: "CLI Tool · Go",
        year: "2026",
        description:
            "I was tired of memorizing IP addresses and SSH flags for every server. Built a terminal SSH manager in Go with a fuzzy-searchable TUI (Bubble Tea + Cobra). Save a host once, connect forever.",
        stack: ["Go", "Cobra", "Bubble Tea", "Lip Gloss"],
        github: "https://github.com/saadh393/sshm",
        linkLabel: "GitHub →",
    },
    {
        id: "zero-downtime-deployment",
        title: "Zero Downtime Frontend Deploys with Blue-Green on a Single EC2",
        category: "DevOps · AWS",
        year: "2026",
        description:
            "A real blue green setup on one AWS EC2 instance with Docker and Nginx that removed the downtime caused by rebuilds and container restarts",
        stack: ["Next.js", "TypeScript", "AWS", "Docker", "Nginx"],
        caseStudy: "/projects/blue-green-deployment-zero-downtime",
        linkLabel: "Case Study →",
    },
    {
        id: "unilever",
        title: "Unilever Frontline Academy",
        category: "Enterprise · Bangladesh",
        year: "2024",
        description:
            "Enterprise LMS for Unilever Bangladesh's frontline workforce — hundreds of field employees, multiple device types, zero tolerance for downtime. Delivered production-ready React/Next.js frontend against high-fidelity Figma specs.",
        stack: ["React", "Next.js", "REST API"],
        image: "https://saadh393.github.io/images/projects/uniliver.png",
        linkLabel: "Enterprise",
    },
];

type Project = (typeof projects)[number];

/* ─── Hook: scroll reveal ─── */
function useReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

/* ─── Featured Card ─── */
function FeaturedCard({ project }: { project: Project }) {
    const { ref, visible } = useReveal(0.1);
    const href =
        "link" in project
            ? (project as { link: string }).link
            : "caseStudy" in project
              ? (project as { caseStudy: string }).caseStudy
              : "github" in project
                ? (project as { github: string }).github
                : undefined;
    const isExternal =
        href && (href.startsWith("http://") || href.startsWith("https://"));

    return (
        <div
            ref={ref}
            className={`proj-reveal ${visible ? "proj-revealed" : ""}`}
            style={{ transitionDelay: "0.1s" }}
        >
            <div className="proj-card proj-card-featured">
                <div className="proj-featured-layout">
                    {/* Image side */}
                    <div className="proj-featured-image-wrap">
                        {project.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={project.image}
                                alt={project.title}
                                className="proj-featured-image"
                            />
                        )}
                        <div
                            className="proj-featured-image-overlay"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Content side */}
                    <div className="proj-featured-content">
                        <div className="proj-card-meta">
                            <span className="proj-category">
                                {project.category}
                            </span>
                            <span className="proj-year">{project.year}</span>
                        </div>

                        <h3 className="proj-title proj-title-featured">
                            {project.title}
                        </h3>

                        <p className="proj-desc">{project.description}</p>

                        <div className="proj-stack">
                            {project.stack.map((tech) => (
                                <span key={tech} className="proj-stack-pill">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {href &&
                            (isExternal ? (
                                <a
                                    href={href}
                                    className="proj-cta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {project.linkLabel}
                                </a>
                            ) : (
                                <Link
                                    href={href}
                                    className="proj-cta"
                                    prefetch={true}
                                >
                                    {project.linkLabel}
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Standard Card ─── */
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
    const { ref, visible } = useReveal(0.12);
    const hasCaseStudy = "caseStudy" in project;
    const href =
        "caseStudy" in project
            ? (project as { caseStudy: string }).caseStudy
            : "github" in project
              ? (project as { github: string }).github
              : "link" in project
                ? (project as { link: string }).link
                : undefined;
    const isExternal =
        href && (href.startsWith("http://") || href.startsWith("https://"));

    return (
        <div
            ref={ref}
            className={`proj-reveal ${visible ? "proj-revealed" : ""}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className={`proj-card`}>
                <div className="proj-card-meta">
                    <span className="proj-category">{project.category}</span>
                    <span className="proj-year">{project.year}</span>
                </div>

                <h3 className="proj-title">{project.title}</h3>

                <p className="proj-desc">{project.description}</p>

                <div className="proj-stack">
                    {project.stack.map((tech) => (
                        <span key={tech} className="proj-stack-pill">
                            {tech}
                        </span>
                    ))}
                </div>

                {href && project.linkLabel !== "Enterprise" ? (
                    isExternal ? (
                        <a
                            href={href}
                            className="proj-cta"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {project.linkLabel}
                        </a>
                    ) : (
                        <Link href={href} className="proj-cta" prefetch={true}>
                            {project.linkLabel}
                        </Link>
                    )
                ) : (
                    <span className="proj-cta-muted">{project.linkLabel}</span>
                )}
            </div>
        </div>
    );
}

/* ─── Section ─── */
export default function Projects() {
    const { ref: headerRef, visible: headerVisible } = useReveal(0.2);

    const featured = projects.find((p) => p.highlight);
    const rest = projects.filter((p) => !p.highlight);

    return (
        <section
            id="work"
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
                ref={headerRef}
                className={`proj-reveal ${headerVisible ? "proj-revealed" : ""}`}
                style={{ marginBottom: 48 }}
            >
                <span className="section-overline">Work</span>
                <h2 className="section-heading">Selected Projects</h2>
            </div>

            {/* Featured project */}
            {featured && <FeaturedCard project={featured} />}

            {/* Grid of remaining */}
            <div className="proj-grid">
                {rest.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        delay={0.08 * i}
                    />
                ))}
            </div>
        </section>
    );
}

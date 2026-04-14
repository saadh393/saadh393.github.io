"use client";

interface HeroTechTickerProps {
    entered: boolean;
}

const TICKER_ITEMS = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "REST API",
    "Tailwind CSS",
    "Git",
    "Figma",
    "Prisma",
    "Redis",
    "Docker",
    "FFmpeg",
    "AWS S3",
    "Stripe",
];

export function HeroTechTicker({ entered }: HeroTechTickerProps) {
    return (
        <div
            className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{
                transitionDelay: "0.52s",
                position: "relative",
                zIndex: 1,
                padding: "18px 0",
                background: "rgba(250,250,250,0.6)",
                marginTop: 48,
                flexShrink: 0,
            }}
        >
            <div className="hero-ticker-mask">
                <div className="hero-ticker-track" aria-hidden="true">
                    {[
                        ...TICKER_ITEMS,
                        ...TICKER_ITEMS,
                        ...TICKER_ITEMS,
                        ...TICKER_ITEMS,
                    ].map((item, i) => (
                        <span key={i} className="hero-ticker-item">
                            <span className="hero-ticker-dot" />
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

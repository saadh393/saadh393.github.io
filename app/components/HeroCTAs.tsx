"use client";

interface HeroCTAsProps {
    entered: boolean;
}

export function HeroCTAs({ entered }: HeroCTAsProps) {
    return (
        <div
            className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{
                transitionDelay: "0.30s",
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 32,
            }}
        >
            <a href="#work" className="hero-btn-primary">
                View Work
                <svg
                    className="hero-btn-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path
                        d="M2.5 7h9M7 2.5L11.5 7 7 11.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>
            <a href="#contact" className="hero-btn-secondary">
                Get in Touch
            </a>
            <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-secondary"
            >
                Resume
                <span
                    style={{
                        fontSize: 11,
                        opacity: 0.5,
                        marginLeft: 2,
                    }}
                >
                    ↗
                </span>
            </a>
        </div>
    );
}

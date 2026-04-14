"use client";

interface HeroBadgeProps {
    entered: boolean;
}

export function HeroBadge({ entered }: HeroBadgeProps) {
    return (
        <div
            className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{ transitionDelay: "0.05s" }}
        >
            <div className="hero-available-badge">
                <span className="hero-status-dot" />
                Available for Work
            </div>
        </div>
    );
}

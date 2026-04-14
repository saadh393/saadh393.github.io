"use client";

interface HeroHandleProps {
    entered: boolean;
}

export function HeroHandle({ entered }: HeroHandleProps) {
    return (
        <div
            className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{ transitionDelay: "0.06s", marginTop: 20 }}
        >
            <span
                style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#0070f3",
                    fontFamily: "var(--font-geist-mono), monospace",
                    letterSpacing: "0.02em",
                }}
            >
                @saadh393
            </span>
        </div>
    );
}

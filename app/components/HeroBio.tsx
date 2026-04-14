"use client";

interface HeroBioProps {
    entered: boolean;
}

export function HeroBio({ entered }: HeroBioProps) {
    return (
        <p
            className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{
                transitionDelay: "0.24s",
                fontSize: 16,
                lineHeight: 1.65,
                color: "#666",
                letterSpacing: "-0.008em",
                maxWidth: 480,
                margin: "20px 0 0",
                fontFamily: "var(--font-geist-sans)",
                textAlign: "center",
            }}
        >
            I build things that handle real traffic and real money.
        </p>
    );
}

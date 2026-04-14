"use client";

interface HeroRoleCyclerProps {
    roleIdx: number;
    phase: "in" | "out";
    roles: string[];
    entered: boolean;
}

export function HeroRoleCycler({ roleIdx, phase, roles, entered }: HeroRoleCyclerProps) {
    return (
        <div
            className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{
                transitionDelay: "0.18s",
                height: 28,
                overflow: "hidden",
            }}
        >
            <span
                key={roleIdx}
                className={phase === "in" ? "hero-role-in" : "hero-role-out"}
                style={{
                    display: "block",
                    fontSize: "clamp(15px, 1.6vw, 18px)",
                    fontWeight: 400,
                    color: "#999",
                    letterSpacing: "-0.01em",
                    fontFamily: "var(--font-geist-sans)",
                    textAlign: "center",
                }}
            >
                {roles[roleIdx]}
            </span>
        </div>
    );
}

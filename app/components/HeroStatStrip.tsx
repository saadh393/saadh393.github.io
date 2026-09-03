"use client";

interface HeroStatStripProps {
    entered: boolean;
}

const STATS = [
    { value: "10,000+", label: "Students Served" },
    { value: "2 Cr+", label: "BDT Revenue" },
    { value: "2.2M", label: "Active Users" },
    { value: "100", label: "Lighthouse Score" },
];

export function HeroStatStrip({ entered }: HeroStatStripProps) {
    return (
        <div
            className={`hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{
                transitionDelay: "0.42s",
                marginTop: 48,
                paddingTop: 32,
                width: "100%",
            }}
        >
            <div className="hero-stats-row hero-stats-centered h-full">
                {STATS.map(({ value, label }, i) => (
                    <div
                        key={label}
                        className="hero-stat-centered"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0,
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <div className="hero-stat-value">{value}</div>
                            <div className="hero-stat-label">{label}</div>
                        </div>
                        {i < STATS.length - 1 && (
                            <div className="hero-stat-divider" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

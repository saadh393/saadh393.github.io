import { GUIDE_STATS } from "@/lib/guide";

export function GuideStats() {
    return (
        <dl className="guide-stats guide-reveal" style={{ animationDelay: "0.32s" }}>
            {GUIDE_STATS.map((stat) => (
                <div key={stat.label} className="guide-stat">
                    <dt className="guide-stat-label">{stat.label}</dt>
                    <dd className="guide-stat-value">{stat.value}</dd>
                </div>
            ))}
        </dl>
    );
}

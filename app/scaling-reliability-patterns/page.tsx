import type { Metadata } from "next";

import { GuideBook } from "../components/guide/GuideBook";
import { GuideIntro } from "../components/guide/GuideIntro";
import { GuideParts } from "../components/guide/GuideParts";

export const metadata: Metadata = {
    title: "Scaling & Reliability Patterns",
    description:
        "A free system design field guide: twenty-one patterns that show up in every serious production system — the problem each one solves, what it costs, and how to reason about it in a senior design interview.",
    alternates: { canonical: "/scaling-reliability-patterns" },
};

export default function ScalingReliabilityPatternsPage() {
    return (
        <main className="guide-hero">
            <div className="hero-grid-bg" aria-hidden="true" />
            <div className="guide-hero-glow" aria-hidden="true" />
            <div className="guide-hero-inner">
                <GuideIntro />
                <GuideBook />
                <GuideParts />
            </div>
        </main>
    );
}

import { GuideActions } from "./GuideActions";
import { GuideStats } from "./GuideStats";

export function GuideIntro() {
    return (
        <div className="guide-copy">
            <span className="guide-badge guide-reveal">
                <span className="guide-badge-dot" />
                Free field guide · Edition 1.0
            </span>
            <h1 className="guide-title guide-reveal" style={{ animationDelay: "0.08s" }}>
                Scaling &amp; <span className="guide-title-accent">Reliability</span>{" "}
                Patterns
            </h1>
            <p className="guide-lede guide-reveal" style={{ animationDelay: "0.16s" }}>
                Twenty-one patterns that show up in every serious production
                system — the problem each one solves, what it quietly costs
                you, and how to reason about it out loud in a senior design
                interview.
            </p>
            <GuideActions />
            <GuideStats />
        </div>
    );
}

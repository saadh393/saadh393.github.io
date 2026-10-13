import { GUIDE_PARTS } from "@/lib/guide";

import { GuideCoverArt } from "./GuideCoverArt";

export function GuideBook() {
    return (
        <div
            className="guide-book-stage guide-reveal"
            style={{ animationDelay: "0.2s" }}
            aria-hidden="true"
        >
            <div className="guide-book-glow" />
            <div className="guide-book-float">
                <div className="guide-book">
                    <div className="guide-book-back" />
                    <div className="guide-book-pages" />
                    <div className="guide-book-cover">
                        <p className="guide-cover-eyebrow">
                            System Design Field Guide
                        </p>
                        <p className="guide-cover-title">
                            Scaling &amp;
                            <br />
                            Reliability Patterns
                        </p>
                        <p className="guide-cover-sub">
                            Twenty-one patterns that show up in every serious
                            production system — and how to reason about them
                            out loud.
                        </p>
                        <span className="guide-cover-rule" />
                        <GuideCoverArt />
                        <div className="guide-cover-parts">
                            {GUIDE_PARTS.map((part) => (
                                <div key={part.numeral}>
                                    <span className="guide-cover-part-label">
                                        Part {part.numeral}
                                    </span>
                                    <span className="guide-cover-part-title">
                                        {part.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="guide-cover-footer">
                            <span>Edition 1.0 · October 2026</span>
                            <span>@saadh393</span>
                        </div>
                        <div className="guide-book-sheen" />
                    </div>
                </div>
            </div>
            <div className="guide-book-shadow" />
        </div>
    );
}

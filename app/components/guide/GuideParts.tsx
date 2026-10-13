import { GUIDE_PARTS } from "@/lib/guide";

export function GuideParts() {
    return (
        <section
            className="guide-parts guide-reveal"
            style={{ animationDelay: "0.4s" }}
            aria-labelledby="guide-parts-heading"
        >
            <h2 id="guide-parts-heading" className="guide-parts-heading">
                What&apos;s inside
            </h2>
            <ol className="guide-parts-grid">
                {GUIDE_PARTS.map((part) => (
                    <li key={part.numeral} className="guide-part">
                        <span className="guide-part-numeral">{part.numeral}</span>
                        <div>
                            <p className="guide-part-title">{part.title}</p>
                            <p className="guide-part-topics">{part.topics}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

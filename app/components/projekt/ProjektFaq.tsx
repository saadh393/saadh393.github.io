import { PROJEKT_FAQ } from "@/lib/projekt";
import { ProjektReveal } from "./ProjektReveal";

export function ProjektFaq() {
    return (
        <section className="projekt-section" id="faq" aria-labelledby="faq-heading">
            <ProjektReveal>
                <span className="section-overline">FAQ</span>
                <h2 id="faq-heading" className="section-heading">
                    Questions people ask
                </h2>
            </ProjektReveal>

            <ProjektReveal delay={0.1} className="projekt-faq">
                {PROJEKT_FAQ.map((item) => (
                    <details key={item.question} className="projekt-faq-item">
                        <summary>
                            <h3>{item.question}</h3>
                            <span className="projekt-faq-icon" aria-hidden="true" />
                        </summary>
                        <p>{item.answer}</p>
                    </details>
                ))}
            </ProjektReveal>
        </section>
    );
}

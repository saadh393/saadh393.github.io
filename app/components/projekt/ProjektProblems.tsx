import { PROJEKT_PROBLEMS } from "@/lib/projekt";
import { ProjektReveal } from "./ProjektReveal";

export function ProjektProblems() {
    return (
        <section className="projekt-section" id="why-projekt" aria-labelledby="why-projekt-heading">
            <ProjektReveal>
                <span className="section-overline">Why Projekt</span>
                <h2 id="why-projekt-heading" className="section-heading">
                    Stop hunting for folders and retyping commands
                </h2>
                <p className="projekt-section-lede">
                    If you work on more than a few codebases you know the routine. Find the
                    folder. Open the editor. Open a terminal. Type the same command you typed
                    yesterday. Projekt turns all of that into one click.
                </p>
            </ProjektReveal>

            <div className="projekt-problems">
                {PROJEKT_PROBLEMS.map((problem, index) => (
                    <ProjektReveal key={problem.title} className="projekt-problem">
                        <div className="projekt-problem-copy">
                            <span className="guide-part-numeral">0{index + 1}</span>
                            <h3 className="projekt-problem-title">{problem.title}</h3>
                            <p className="projekt-problem-body">{problem.body}</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={problem.image}
                            alt={problem.alt}
                            width={1400}
                            height={1048}
                            loading="lazy"
                            className="projekt-problem-shot"
                        />
                    </ProjektReveal>
                ))}
            </div>
        </section>
    );
}

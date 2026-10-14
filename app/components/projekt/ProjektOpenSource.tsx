import { PROJEKT_ISSUES_URL, PROJEKT_REPO_URL } from "@/lib/projekt";
import { ProjektReveal } from "./ProjektReveal";

export function ProjektOpenSource() {
    return (
        <section className="projekt-section" aria-labelledby="open-source-heading">
            <ProjektReveal className="projekt-open-source">
                <div>
                    <h2 id="open-source-heading" className="projekt-open-source-title">
                        Projekt is open source
                    </h2>
                    <p className="projekt-open-source-body">
                        Found a bug or have an idea? Open an issue or send a pull request. Linux
                        support and new launchers are good places to start.
                    </p>
                </div>
                <div className="projekt-actions">
                    <a
                        href={PROJEKT_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-btn-primary"
                    >
                        Star on GitHub
                    </a>
                    <a
                        href={PROJEKT_ISSUES_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-btn-secondary"
                    >
                        Open an issue
                    </a>
                </div>
            </ProjektReveal>
        </section>
    );
}

import { ProjektDownloads } from "./ProjektDownloads";

export function ProjektHero() {
    return (
        <section className="guide-hero projekt-hero">
            <div className="hero-grid-bg" aria-hidden="true" />
            <div className="guide-hero-glow" aria-hidden="true" />
            <div className="guide-hero-inner">
                <div className="guide-copy">
                    <span className="guide-badge guide-reveal">
                        <span className="guide-badge-dot" />
                        Free desktop app for macOS and Windows
                    </span>
                    <div className="projekt-brand guide-reveal" style={{ animationDelay: "0.04s" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/projekt/logo.webp" alt="" width={44} height={46} />
                        <span>Projekt</span>
                    </div>
                    <h1 className="guide-title guide-reveal" style={{ animationDelay: "0.08s" }}>
                        Every project you work on, <span className="guide-title-accent">one click</span>{" "}
                        away
                    </h1>
                    <p className="guide-lede guide-reveal" style={{ animationDelay: "0.16s" }}>
                        Projekt keeps your coding projects in one place. Open any of them in your
                        editor or terminal with one click and run the commands you use every day
                        without typing them again.
                    </p>
                    <ProjektDownloads />
                </div>

                <div className="projekt-shot-stage guide-reveal" style={{ animationDelay: "0.2s" }}>
                    <div className="projekt-shot-glow" aria-hidden="true" />
                    <div className="projekt-shot-float">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/projekt/projects-list.webp"
                            alt="Projekt app window listing projects grouped by category and section"
                            width={1400}
                            height={1048}
                            className="projekt-shot"
                            fetchPriority="high"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

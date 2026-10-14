import { ProjektReveal } from "./ProjektReveal";

export function ProjektTour() {
    return (
        <section className="projekt-section" id="tour" aria-labelledby="tour-heading">
            <ProjektReveal>
                <span className="section-overline">Tour</span>
                <h2 id="tour-heading" className="section-heading">
                    See Projekt in a little over a minute
                </h2>
                <p className="projekt-section-lede">
                    Create a category, add a project from a folder, save a command and run it
                    in the built-in terminal.
                </p>
            </ProjektReveal>

            <ProjektReveal delay={0.1}>
                <video
                    className="projekt-video"
                    controls
                    muted
                    playsInline
                    preload="none"
                    poster="/projekt/projekt-tour-poster.webp"
                    width={1280}
                    height={958}
                >
                    <source src="/projekt/projekt-tour.mp4" type="video/mp4" />
                    Your browser can&apos;t play this video.{" "}
                    <a href="/projekt/projekt-tour.mp4">Download the tour</a> instead.
                </video>
            </ProjektReveal>
        </section>
    );
}

import { PROJEKT_PLATFORMS, type ProjektPlatform } from "@/lib/projekt";
import { ProjektDownloadButton } from "./ProjektDownloadButton";
import { ProjektReveal } from "./ProjektReveal";

const platforms = Object.keys(PROJEKT_PLATFORMS) as ProjektPlatform[];

export function ProjektDownloadSection() {
    return (
        <section className="projekt-section" id="download" aria-labelledby="download-heading">
            <ProjektReveal>
                <span className="section-overline">Download</span>
                <h2 id="download-heading" className="section-heading">
                    Get Projekt for your computer
                </h2>
                <p className="projekt-section-lede">
                    The download always points to the newest release on GitHub. Your system asks
                    you to confirm the first launch because Projekt isn&apos;t signed by Apple or
                    Microsoft yet.
                </p>
            </ProjektReveal>

            <div className="proj-grid">
                {platforms.map((platform, index) => (
                    <ProjektReveal key={platform} delay={0.08 * index}>
                        <div className="proj-card projekt-platform">
                            <h3 className="proj-title">{PROJEKT_PLATFORMS[platform].label}</h3>
                            <p className="proj-desc">{PROJEKT_PLATFORMS[platform].note}</p>
                            <ProjektDownloadButton platform={platform} primary={index === 0} />
                            <p className="projekt-first-launch">
                                {PROJEKT_PLATFORMS[platform].firstLaunch}
                            </p>
                        </div>
                    </ProjektReveal>
                ))}
            </div>
        </section>
    );
}

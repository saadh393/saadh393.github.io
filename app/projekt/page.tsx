import type { Metadata } from "next";
import Link from "next/link";

import { ProjektDownloadSection } from "../components/projekt/ProjektDownloadSection";
import { ProjektFaq } from "../components/projekt/ProjektFaq";
import { ProjektHero } from "../components/projekt/ProjektHero";
import { ProjektOpenSource } from "../components/projekt/ProjektOpenSource";
import { ProjektProblems } from "../components/projekt/ProjektProblems";
import { ProjektTour } from "../components/projekt/ProjektTour";
import { absoluteUrl } from "@/lib/site";
import {
    PROJEKT_DESCRIPTION,
    PROJEKT_FAQ,
    PROJEKT_RELEASES_URL,
    PROJEKT_REPO_URL,
} from "@/lib/projekt";

const title = "Projekt: open any coding project in one click";
const ogImage = { url: absoluteUrl("/projekt/projects-list.webp"), width: 1400, height: 1048 };

export const metadata: Metadata = {
    title,
    description: PROJEKT_DESCRIPTION,
    keywords: [
        "project launcher for developers",
        "open project in VS Code",
        "developer workspace app",
        "run npm run dev with one click",
        "docker compose shortcut",
        "macOS developer tool",
        "Windows developer tool",
        "Tauri app",
    ],
    alternates: { canonical: "/projekt" },
    openGraph: {
        type: "website",
        url: absoluteUrl("/projekt"),
        title,
        description: PROJEKT_DESCRIPTION,
        images: [ogImage],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description: PROJEKT_DESCRIPTION,
        images: [ogImage.url],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            name: "Projekt",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "macOS, Windows 10, Windows 11",
            description: PROJEKT_DESCRIPTION,
            url: absoluteUrl("/projekt"),
            downloadUrl: PROJEKT_RELEASES_URL,
            codeRepository: PROJEKT_REPO_URL,
            screenshot: ogImage.url,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Md Nasimul Hasan", url: absoluteUrl("/") },
        },
        {
            "@type": "FAQPage",
            mainEntity: PROJEKT_FAQ.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
        },
    ],
};

export default function ProjektPage() {
    return (
        <main className="projekt-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <nav className="projekt-topbar" aria-label="Site">
                <Link href="/" className="projekt-back">
                    ← Md Nasimul Hasan
                </Link>
                <a
                    href={PROJEKT_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projekt-back"
                >
                    GitHub ↗
                </a>
            </nav>
            <ProjektHero />
            <ProjektProblems />
            <ProjektTour />
            <ProjektDownloadSection />
            <ProjektFaq />
            <ProjektOpenSource />
            <footer className="projekt-footer">
                Built by <Link href="/">Md Nasimul Hasan</Link> with Tauri, Rust and React
            </footer>
        </main>
    );
}

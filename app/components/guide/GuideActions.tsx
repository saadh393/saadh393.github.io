import { GUIDE_PDF_PATH, INSTAGRAM_URL } from "@/lib/guide";

export function GuideActions() {
    return (
        <div className="guide-actions guide-reveal" style={{ animationDelay: "0.24s" }}>
            <a href={GUIDE_PDF_PATH} download className="hero-btn-primary">
                <svg
                    className="guide-download-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M7 1.5v8M3.5 6L7 9.5 10.5 6M2 12.5h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Download the free PDF
            </a>
            <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-secondary"
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
                Follow @saadh393
            </a>
        </div>
    );
}

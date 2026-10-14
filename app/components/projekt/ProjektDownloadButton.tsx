"use client";

import { useRef, useState } from "react";

import { PROJEKT_PLATFORMS, PROJEKT_RELEASES_URL, type ProjektPlatform } from "@/lib/projekt";
import { loadLatestRelease } from "@/lib/projektRelease";

type Status =
    | { kind: "idle" }
    | { kind: "pending" }
    | { kind: "started"; url: string }
    | { kind: "failed" };

type ProjektDownloadButtonProps = {
    platform: ProjektPlatform;
    primary?: boolean;
};

const icons: Record<ProjektPlatform, string> = {
    mac: "M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.61 2.79-.41 6.91 1.15 9.17.77 1.1 1.68 2.34 2.87 2.3 1.15-.05 1.59-.75 2.98-.75 1.39 0 1.78.75 3 .72 1.24-.02 2.02-1.12 2.78-2.23.88-1.28 1.24-2.52 1.26-2.59-.03-.01-2.42-.93-2.44-3.68ZM14.08 5.85c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.67-1.09 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28Z",
    windows: "M3 5.1 10.4 4v7.2H3V5.1Zm0 13.8 7.4 1.1v-7.1H3v6Zm8.3 1.2L21 21.5V13h-9.7v7.1Zm0-16.2v7.3H21V2.5l-9.7 1.4Z",
};

export function ProjektDownloadButton({ platform, primary = false }: ProjektDownloadButtonProps) {
    const [status, setStatus] = useState<Status>({ kind: "idle" });
    const inFlight = useRef(false);
    const pending = status.kind === "pending";
    const label = `Download for ${PROJEKT_PLATFORMS[platform].label}`;

    const startDownload = async () => {
        if (inFlight.current) return;
        inFlight.current = true;
        setStatus({ kind: "pending" });

        try {
            const release = await loadLatestRelease();
            const url = release.downloads[platform];
            window.location.assign(url);
            setStatus({ kind: "started", url });
        } catch {
            setStatus({ kind: "failed" });
        } finally {
            inFlight.current = false;
        }
    };

    return (
        <div className="projekt-download">
            <button
                type="button"
                onClick={startDownload}
                disabled={pending}
                aria-busy={pending}
                className={`projekt-download-btn ${primary ? "hero-btn-primary" : "hero-btn-secondary"}`}
            >
                <span className="projekt-download-icon" aria-hidden="true">
                    {pending ? (
                        <span className="projekt-spinner" />
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d={icons[platform]} />
                        </svg>
                    )}
                </span>
                {label}
            </button>
            <p className="projekt-download-status" aria-live="polite">
                {status.kind === "pending" ? "Finding the latest version…" : null}
                {status.kind === "started" ? (
                    <>
                        Your download is starting. If nothing happens,{" "}
                        <a href={status.url}>use this link</a>.
                    </>
                ) : null}
                {status.kind === "failed" ? (
                    <>
                        GitHub didn&apos;t respond. Try again or{" "}
                        <a href={PROJEKT_RELEASES_URL}>open the releases page</a>.
                    </>
                ) : null}
            </p>
        </div>
    );
}

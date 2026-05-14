"use client";

import React, { useEffect, useState } from "react";

/* Usage in MDX:
   <ShareArticle />
   <ShareArticle title="Why AI coding agents cost so much" hook="Found this useful?" />

   url/title default to the page's own location + document.title when omitted.
*/

interface ShareArticleProps {
  title?: string;
  url?: string;
  hook?: string;
  via?: string;
}

type Network = "twitter" | "linkedin" | "reddit" | "hn" | "copy" | "native";

function networkUrl(net: Network, url: string, title: string, via?: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  switch (net) {
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${t}&url=${u}${
        via ? `&via=${encodeURIComponent(via)}` : ""
      }`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case "reddit":
      return `https://www.reddit.com/submit?url=${u}&title=${t}`;
    case "hn":
      return `https://news.ycombinator.com/submitlink?u=${u}&t=${t}`;
    default:
      return url;
  }
}

const ICONS: Record<Exclude<Network, "copy" | "native">, React.ReactNode> = {
  twitter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  reddit: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.07c0-1.21-.99-2.2-2.2-2.2-.59 0-1.13.24-1.52.62-1.5-1.06-3.55-1.74-5.82-1.82l.99-4.65 3.23.69c.04.82.72 1.48 1.55 1.48a1.56 1.56 0 1 0-1.49-2.04l-3.61-.77a.38.38 0 0 0-.45.29l-1.1 5.17c-2.31.07-4.4.75-5.93 1.82a2.18 2.18 0 0 0-1.52-.62A2.2 2.2 0 0 0 2 12.07c0 .88.52 1.64 1.26 1.99-.03.21-.04.42-.04.64 0 3.27 3.8 5.93 8.49 5.93s8.49-2.66 8.49-5.93c0-.21-.01-.42-.04-.62A2.2 2.2 0 0 0 22 12.07zM7 13.62c0-.86.7-1.55 1.55-1.55s1.55.69 1.55 1.55-.69 1.55-1.55 1.55S7 14.48 7 13.62zm8.71 4.1c-1.06 1.06-3.08 1.14-3.71 1.14-.62 0-2.65-.09-3.71-1.14a.4.4 0 0 1 0-.57.4.4 0 0 1 .57 0c.67.67 2.1.91 3.14.91 1.04 0 2.47-.24 3.14-.91a.4.4 0 0 1 .57 0 .4.4 0 0 1 0 .57zm-.27-2.55c-.86 0-1.55-.69-1.55-1.55s.69-1.55 1.55-1.55 1.55.69 1.55 1.55-.69 1.55-1.55 1.55z" />
    </svg>
  ),
  hn: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M0 0v24h24V0H0zm12.6 13.6V18h-1.2v-4.4L7.5 6.4H9l3 6 3-6h1.5l-3.9 7.2z" />
    </svg>
  ),
};

export function ShareArticle({
  title,
  url,
  hook = "Found this useful?",
  via,
}: ShareArticleProps) {
  const [pageUrl, setPageUrl] = useState(url || "");
  const [pageTitle, setPageTitle] = useState(title || "");
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (!url) setPageUrl(window.location.href);
    if (!title) setPageTitle(document.title);
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, [url, title]);

  const open = (net: Exclude<Network, "copy" | "native">) => {
    const shareUrl = networkUrl(net, pageUrl, pageTitle, via);
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // best-effort
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: pageTitle, url: pageUrl });
    } catch {
      // user cancelled or unsupported
    }
  };

  return (
    <aside
      aria-label="Share this article"
      style={{
        margin: "36px 0",
        padding: "20px 22px",
        border: "1px solid rgba(0,112,243,0.18)",
        borderRadius: 12,
        background:
          "linear-gradient(180deg, rgba(0,112,243,0.04) 0%, rgba(0,112,243,0.015) 100%)",
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <div style={{ flex: "1 1 240px", minWidth: 220 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14.5,
            fontWeight: 600,
            color: "#000",
            letterSpacing: "-0.01em",
          }}
        >
          {hook}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 13,
            color: "#555",
            lineHeight: 1.55,
          }}
        >
          Pass it to someone who's still wondering where their API bill went.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <ShareBtn label="X / Twitter" onClick={() => open("twitter")} icon={ICONS.twitter} />
        <ShareBtn label="LinkedIn" onClick={() => open("linkedin")} icon={ICONS.linkedin} />
        <ShareBtn label="Reddit" onClick={() => open("reddit")} icon={ICONS.reddit} />
        <ShareBtn label="Hacker News" onClick={() => open("hn")} icon={ICONS.hn} />
        <ShareBtn
          label={copied ? "Copied" : "Copy link"}
          onClick={copy}
          icon={
            copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )
          }
          active={copied}
        />
        {canNativeShare && (
          <ShareBtn
            label="Share"
            onClick={nativeShare}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            }
          />
        )}
      </div>
    </aside>
  );
}

function ShareBtn({
  label,
  onClick,
  icon,
  active,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 12px",
        background: active ? "#0070f3" : "#fff",
        color: active ? "#fff" : "#222",
        border: `1px solid ${active ? "#0070f3" : "rgba(0,0,0,0.12)"}`,
        borderRadius: 8,
        fontSize: 12.5,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
      onMouseEnter={(e) => {
        if (active) return;
        e.currentTarget.style.borderColor = "rgba(0,112,243,0.45)";
        e.currentTarget.style.color = "#0070f3";
      }}
      onMouseLeave={(e) => {
        if (active) return;
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
        e.currentTarget.style.color = "#222";
      }}
    >
      <span style={{ display: "inline-flex" }}>{icon}</span>
      {label}
    </button>
  );
}

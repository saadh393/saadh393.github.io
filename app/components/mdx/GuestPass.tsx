"use client";

import React from "react";

/* Usage in MDX:
   <GuestPass url="https://claude.ai/referral/MWMyo_1MJg" />
   <GuestPass url="..." note="Custom line under the heading." />
*/

interface GuestPassProps {
  url: string;
  heading?: string;
  note?: string;
  cta?: string;
}

const points = [
  "Full week of Claude Code with Sonnet and Opus",
  "Same access paying users get, no trial-tier limits",
  "Card required to start, cancel anytime before day 7",
];

export function GuestPass({
  url,
  heading = "Want to try the thing this whole post is about?",
  note = "Anthropic gives Max subscribers a few Guest Passes to hand out. This one unlocks a 7-day Claude Code trial. It only works if you've never had a paid Claude plan before.",
  cta = "Activate the Guest Pass",
}: GuestPassProps) {
  return (
    <aside
      style={{
        margin: "32px 0",
        padding: "22px 24px",
        border: "1px solid rgba(217,119,87,0.4)",
        borderRadius: 12,
        background: "linear-gradient(180deg, #fdf3ee 0%, #fbeae1 100%)",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div aria-hidden style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>
          🎟️
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: 15.5,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
            }}
          >
            {heading}
          </p>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13.5,
              color: "#6b4636",
              lineHeight: 1.6,
            }}
          >
            {note}
          </p>
        </div>
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: "16px 0 18px",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        {points.map((point) => (
          <li
            key={point}
            style={{
              display: "flex",
              gap: 9,
              alignItems: "baseline",
              fontSize: 13.5,
              color: "#5a3a2c",
              lineHeight: 1.5,
            }}
          >
            <span aria-hidden style={{ color: "#d97757", flexShrink: 0 }}>
              ✓
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "10px 18px",
          background: "#d97757",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          borderRadius: 8,
          textDecoration: "none",
          letterSpacing: "-0.01em",
        }}
      >
        {cta}
      </a>
    </aside>
  );
}

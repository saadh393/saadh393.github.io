"use client";

import React from "react";

/* Usage in MDX:
   <BuyMeCoffee username="saadh393" />
   <BuyMeCoffee username="saadh393" message="If this saved you a $50 API bill, the math is in your favor." />
   <BuyMeCoffee username="saadh393" variant="button" />
*/

interface BuyMeCoffeeProps {
  username: string;
  message?: string;
  variant?: "card" | "button";
}

export function BuyMeCoffee({
  username,
  message,
  variant = "card",
}: BuyMeCoffeeProps) {
  const url = `https://www.buymeacoffee.com/${encodeURIComponent(username)}`;

  if (variant === "button") {
    return (
      <p style={{ margin: "20px 0" }}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me a Coffee"
            style={{ height: 60, width: 217, display: "inline-block" }}
          />
        </a>
      </p>
    );
  }

  return (
    <aside
      style={{
        margin: "32px 0",
        padding: "20px 22px",
        border: "1px solid rgba(255,193,7,0.45)",
        borderRadius: 12,
        background: "linear-gradient(180deg, #fffbe6 0%, #fff8d4 100%)",
        display: "flex",
        gap: 18,
        alignItems: "center",
        flexWrap: "wrap",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <div
        aria-hidden
        style={{
          fontSize: 34,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ☕
      </div>

      <div style={{ flex: 1, minWidth: 220 }}>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          Found this useful?
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 13.5,
            color: "#5a4a10",
            lineHeight: 1.55,
          }}
        >
          {message ||
            "If this saved you a real number of dollars on your API bill, a small coffee keeps these posts coming."}
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ flexShrink: 0, display: "inline-block", lineHeight: 0 }}
        aria-label={`Buy ${username} a coffee`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me a Coffee"
          style={{ height: 48, width: 174, display: "block" }}
        />
      </a>
    </aside>
  );
}

"use client";

import React from "react";

/* Usage in MDX:
   Single inline-block card:
     <ReferenceLink
       url="https://docs.anthropic.com/.../prompt-caching"
       title="Prompt Caching"
       source="Anthropic Docs"
       note="Pricing + cache TTL behavior"
     />

   Grouped list at end of post:
     <ReferenceList>
       <ReferenceLink url="..." title="..." source="..." />
       <ReferenceLink url="..." title="..." source="..." />
     </ReferenceList>
*/

interface ReferenceLinkProps {
  url: string;
  title: string;
  source?: string;
  note?: string;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ReferenceLink({ url, title, source, note }: ReferenceLinkProps) {
  const host = source || hostnameOf(url);
  const favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    hostnameOf(url)
  )}&sz=64`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "14px 16px",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        background: "#fff",
        textDecoration: "none",
        color: "inherit",
        margin: "12px 0",
        transition: "border-color 0.15s, background 0.15s, transform 0.15s",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,112,243,0.35)";
        e.currentTarget.style.background = "rgba(0,112,243,0.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
        e.currentTarget.style.background = "#fff";
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={favicon}
        alt=""
        width={32}
        height={32}
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          flexShrink: 0,
          background: "#f5f5f5",
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
      />
      <span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0, flex: 1 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#000",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          {title}
        </span>
        {note && (
          <span style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{note}</span>
        )}
        <span
          style={{
            fontSize: 11,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#888",
            letterSpacing: "0.02em",
            marginTop: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {host} ↗
        </span>
      </span>
    </a>
  );
}

export function ReferenceList({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 10,
        margin: "24px 0",
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <div style={{ margin: 0 }}>{child}</div>
        ) : (
          child
        )
      )}
    </div>
  );
}

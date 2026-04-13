"use client";

import { useState } from "react";

interface ComparisonProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  language?: string;
}

export function Comparison({
  before = "",
  after = "",
  beforeLabel = "Before",
  afterLabel = "After",
  language = "javascript",
}: ComparisonProps) {
  const [view, setView] = useState<"split" | "before" | "after">("split");

  const Panel = ({
    code,
    label,
    accent,
  }: {
    code: string;
    label: string;
    accent: string;
  }) => (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      {/* Panel header */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fafafa",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accent,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#666",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
      <pre
        data-language={language}
        style={{
          margin: 0,
          padding: "16px 20px",
          background: "#fff",
          fontSize: 13,
          lineHeight: 1.7,
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#333",
          overflowX: "auto",
          whiteSpace: "pre",
          flex: 1,
        }}
      >
        <code>{code.trim()}</code>
      </pre>
    </div>
  );

  const isSplit = view === "split";

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "28px 0",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#aaa",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Comparison · {language}
        </span>
        {/* View toggle */}
        <div
          style={{
            display: "flex",
            gap: 2,
            background: "rgba(0,0,0,0.05)",
            borderRadius: 6,
            padding: 2,
          }}
        >
          {(["split", "before", "after"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "3px 10px",
                fontSize: 11,
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: view === v ? 600 : 400,
                color: view === v ? "#0070f3" : "#888",
                background: view === v ? "#fff" : "transparent",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
                textTransform: "capitalize",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div
        style={{
          display: "flex",
          flexDirection: isSplit ? "row" : "column",
          gap: 0,
        }}
      >
        {(view === "split" || view === "before") && (
          <Panel code={before} label={beforeLabel} accent="#d97706" />
        )}
        {view === "split" && (
          <div style={{ width: 1, background: "rgba(0,0,0,0.07)", flexShrink: 0 }} />
        )}
        {(view === "split" || view === "after") && (
          <Panel code={after} label={afterLabel} accent="#16a34a" />
        )}
      </div>
    </div>
  );
}

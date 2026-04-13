"use client";

import React, { useState } from "react";

// ─── Panel ─────────────────────────────────────────────────────────────────

interface PanelProps {
  label: string;
  accent: string;
  children: React.ReactNode;
}

function Panel({ label, accent, children }: PanelProps) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      {/* header */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fafafa",
          flexShrink: 0,
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
      {/* content */}
      <div
        style={{
          flex: 1,
          overflowX: "auto",
          background: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Comparison ────────────────────────────────────────────────────────────

interface ComparisonProps {
  /** Pass two fenced code blocks as children — first is "before", second is "after" */
  children?: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  /** Legacy: plain string code, works only when content has no { } braces */
  before?: string;
  after?: string;
  language?: string;
}

export function Comparison({
  children,
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  language = "javascript",
}: ComparisonProps) {
  const [view, setView] = useState<"split" | "before" | "after">("split");

  // ── resolve before/after content ────────────────────────────────────────
  // children mode: two code blocks as children → first = before, second = after
  // legacy mode: `before` / `after` string props
  let beforeContent: React.ReactNode;
  let afterContent: React.ReactNode;

  if (children) {
    const arr = React.Children.toArray(children);
    beforeContent = arr[0];
    afterContent = arr[1] ?? null;
  } else {
    const codeStyle: React.CSSProperties = {
      fontFamily: "var(--font-geist-mono), monospace",
      fontSize: 13,
      color: "#333",
      background: "none",
      padding: 0,
      borderRadius: 0,
      lineHeight: 1.7,
    };
    const preStyle: React.CSSProperties = {
      margin: 0,
      padding: "16px 20px",
      background: "#fff",
      overflowX: "auto",
      whiteSpace: "pre",
      minHeight: 80,
    };
    const safe = (s: unknown) => (typeof s === "string" ? s : String(s ?? "")).trim();
    beforeContent = (
      <pre style={preStyle}>
        <code style={codeStyle}>{safe(before)}</code>
      </pre>
    );
    afterContent = (
      <pre style={preStyle}>
        <code style={codeStyle}>{safe(after)}</code>
      </pre>
    );
  }

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
      {/* toolbar */}
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

      {/* panels */}
      <div
        style={{
          display: "flex",
          flexDirection: isSplit ? "row" : "column",
        }}
      >
        {(view === "split" || view === "before") && (
          <Panel label={beforeLabel} accent="#d97706">
            {beforeContent}
          </Panel>
        )}
        {isSplit && (
          <div style={{ width: 1, background: "rgba(0,0,0,0.07)", flexShrink: 0 }} />
        )}
        {(view === "split" || view === "after") && (
          <Panel label={afterLabel} accent="#16a34a">
            {afterContent}
          </Panel>
        )}
      </div>
    </div>
  );
}

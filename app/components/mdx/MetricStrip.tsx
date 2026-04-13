"use client";

import React from "react";

/* Usage in MDX:
   <MetricStrip>
     <Metric label="Peak viewers" value="500+" />
     <Metric label="Transcode time" value="~12s" />
   </MetricStrip>
*/

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#000",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 12,
          color: "#888",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function MetricStrip({ children }: { children: React.ReactNode }) {
  const metrics = React.Children.toArray(children);
  const count = Math.min(metrics.length, 4) || 1;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gap: 1,
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "28px 0",
        background: "rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

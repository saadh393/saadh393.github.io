"use client";

import React from "react";
import { paletteAt } from "./palette";

/* Usage in MDX:
   <MetricStrip>
     <Metric label="Peak viewers" value="500+" />
     <Metric label="Transcode time" value="~12s" />
   </MetricStrip>
*/

interface MetricProps {
  label: string;
  value: string;
  _index?: number; // injected by MetricStrip — not set by author
}

export function Metric({ label, value, _index = 0 }: MetricProps) {
  const { ink } = paletteAt(_index);

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
          color: ink,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
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
  // Inject _index into each Metric child so it can pick its palette color
  const items = React.Children.toArray(children);
  const count = Math.min(items.length, 4) || 1;

  const injected = items.slice(0, 4).map((child, i) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<MetricProps>, { _index: i })
      : child
  );

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
      {injected}
    </div>
  );
}

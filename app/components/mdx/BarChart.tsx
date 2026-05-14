"use client";

import React from "react";
import { paletteAt } from "./palette";

/* Usage in MDX (data is a JSON string for RSC boundary serialization):
   <BarChart
     title="Token cost breakdown per session"
     unit="$"
     data='[
       {"label":"Before","value":74},
       {"label":"After","value":11}
     ]'
   />

   Optional: orientation="horizontal" | "vertical" (default horizontal)
*/

interface Bar {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  title?: string;
  caption?: string;
  unit?: string;
  data: string;
  orientation?: "horizontal" | "vertical";
}

function parseData(data: string): Bar[] {
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (d) => d && typeof d.label === "string" && typeof d.value === "number"
    );
  } catch {
    return [];
  }
}

export function BarChart({
  title,
  caption,
  unit = "",
  data,
  orientation = "horizontal",
}: BarChartProps) {
  const bars = parseData(data);
  if (bars.length === 0) return null;

  const max = Math.max(...bars.map((b) => b.value), 1);

  return (
    <figure
      style={{
        margin: "28px 0",
        padding: "20px 22px",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        background: "#fff",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {title && (
        <figcaption
          style={{
            fontSize: 12,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#666",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {title}
        </figcaption>
      )}

      {orientation === "horizontal" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bars.map((b, i) => {
            const { ink, bg } = paletteAt(i);
            const color = b.color || ink;
            const pct = (b.value / max) * 100;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12.5,
                    color: "#444",
                  }}
                >
                  <span>{b.label}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: color,
                      fontWeight: 600,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {unit}
                    {b.value.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    height: 10,
                    background: bg,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: color,
                      borderRadius: 4,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <VerticalBars bars={bars} max={max} unit={unit} />
      )}

      {caption && (
        <p
          style={{
            fontSize: 12,
            color: "#888",
            marginTop: 14,
            lineHeight: 1.55,
            margin: "14px 0 0",
          }}
        >
          {caption}
        </p>
      )}
    </figure>
  );
}

function VerticalBars({
  bars,
  max,
  unit,
}: {
  bars: Bar[];
  max: number;
  unit: string;
}) {
  const H = 180;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${bars.length}, 1fr)`,
        gap: 16,
        alignItems: "end",
        height: H + 40,
      }}
    >
      {bars.map((b, i) => {
        const { ink, bg } = paletteAt(i);
        const color = b.color || ink;
        const h = (b.value / max) * H;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-geist-mono), monospace",
                color,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {unit}
              {b.value.toLocaleString()}
            </span>
            <div
              style={{
                width: "100%",
                height: h,
                background: color,
                borderRadius: "4px 4px 0 0",
                minHeight: 2,
                transition: "height 0.4s ease",
              }}
              title={`${b.label}: ${unit}${b.value}`}
            />
            <span
              style={{
                fontSize: 11,
                color: "#666",
                background: bg,
                padding: "2px 6px",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              {b.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

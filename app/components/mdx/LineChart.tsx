"use client";

import React, { useId } from "react";
import { paletteAt } from "./palette";

/* Usage in MDX (props are JSON strings):
   <LineChart
     title="Cost per turn over a long session"
     xLabel="Turn"
     yLabel="Cost ($)"
     series='[
       {"name":"No cache","points":[[1,0.10],[5,0.45],[10,1.10],[20,3.40],[30,7.20]]},
       {"name":"With cache","points":[[1,0.10],[5,0.18],[10,0.31],[20,0.62],[30,0.98]]}
     ]'
   />
*/

interface Series {
  name: string;
  points: [number, number][];
  color?: string;
}

interface LineChartProps {
  title?: string;
  caption?: string;
  xLabel?: string;
  yLabel?: string;
  series: string;
  height?: number;
}

function parseSeries(series: string): Series[] {
  try {
    const parsed = JSON.parse(series);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s) =>
        s &&
        typeof s.name === "string" &&
        Array.isArray(s.points) &&
        s.points.every(
          (p: unknown) =>
            Array.isArray(p) &&
            p.length === 2 &&
            typeof p[0] === "number" &&
            typeof p[1] === "number"
        )
    );
  } catch {
    return [];
  }
}

export function LineChart({
  title,
  caption,
  xLabel,
  yLabel,
  series,
  height = 220,
}: LineChartProps) {
  const data = parseSeries(series);
  const uid = useId().replace(/:/g, "");
  if (data.length === 0) return null;

  const allX = data.flatMap((s) => s.points.map((p) => p[0]));
  const allY = data.flatMap((s) => s.points.map((p) => p[1]));
  const xMin = Math.min(...allX);
  const xMax = Math.max(...allX);
  const yMin = Math.min(0, ...allY);
  const yMax = Math.max(...allY) * 1.08;

  const W = 560;
  const H = height;
  const padL = 44;
  const padR = 16;
  const padT = 14;
  const padB = 32;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const sx = (x: number) =>
    padL + ((x - xMin) / Math.max(xMax - xMin, 1)) * plotW;
  const sy = (y: number) =>
    padT + plotH - ((y - yMin) / Math.max(yMax - yMin, 1)) * plotH;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const v = yMin + ((yMax - yMin) * i) / yTicks;
    return { v, y: sy(v) };
  });

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
            marginBottom: 8,
          }}
        >
          {title}
        </figcaption>
      )}

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: "block", maxWidth: "100%" }}
          role="img"
          aria-label={title || "Line chart"}
        >
          {/* Gridlines */}
          {ticks.map((t, i) => (
            <g key={i}>
              <line
                x1={padL}
                x2={W - padR}
                y1={t.y}
                y2={t.y}
                stroke="rgba(0,0,0,0.06)"
                strokeWidth={1}
              />
              <text
                x={padL - 8}
                y={t.y + 3.5}
                textAnchor="end"
                fontSize={10}
                fill="#888"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {Number.isInteger(t.v) ? t.v : t.v.toFixed(1)}
              </text>
            </g>
          ))}

          {/* X axis baseline */}
          <line
            x1={padL}
            x2={W - padR}
            y1={padT + plotH}
            y2={padT + plotH}
            stroke="rgba(0,0,0,0.18)"
            strokeWidth={1}
          />

          {/* X ticks */}
          {[xMin, (xMin + xMax) / 2, xMax].map((v, i) => (
            <text
              key={i}
              x={sx(v)}
              y={H - 12}
              textAnchor="middle"
              fontSize={10}
              fill="#888"
              fontFamily="var(--font-geist-mono), monospace"
            >
              {Number.isInteger(v) ? v : v.toFixed(1)}
            </text>
          ))}

          {/* Axis labels */}
          {xLabel && (
            <text
              x={padL + plotW / 2}
              y={H - 2}
              textAnchor="middle"
              fontSize={11}
              fill="#666"
            >
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text
              x={12}
              y={padT + plotH / 2}
              textAnchor="middle"
              fontSize={11}
              fill="#666"
              transform={`rotate(-90 12 ${padT + plotH / 2})`}
            >
              {yLabel}
            </text>
          )}

          {/* Series lines + dots */}
          {data.map((s, i) => {
            const { ink } = paletteAt(i);
            const color = s.color || ink;
            const path = s.points
              .map(([x, y], j) => `${j === 0 ? "M" : "L"} ${sx(x)} ${sy(y)}`)
              .join(" ");
            return (
              <g key={i}>
                <path
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {s.points.map(([x, y], j) => (
                  <circle
                    key={j}
                    cx={sx(x)}
                    cy={sy(y)}
                    r={3}
                    fill="#fff"
                    stroke={color}
                    strokeWidth={1.5}
                  >
                    <title>{`${s.name}: (${x}, ${y})`}</title>
                  </circle>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginTop: 8,
          fontSize: 12,
          color: "#444",
        }}
      >
        {data.map((s, i) => {
          const { ink } = paletteAt(i);
          const color = s.color || ink;
          return (
            <span
              key={`${uid}-${i}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: color,
                  borderRadius: 2,
                  display: "inline-block",
                }}
              />
              {s.name}
            </span>
          );
        })}
      </div>

      {caption && (
        <p
          style={{
            fontSize: 12,
            color: "#888",
            marginTop: 10,
            lineHeight: 1.55,
            margin: "10px 0 0",
          }}
        >
          {caption}
        </p>
      )}
    </figure>
  );
}

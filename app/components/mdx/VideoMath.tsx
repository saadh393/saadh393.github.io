"use client";

import { useState } from "react";

interface VideoMathProps {
  segmentLength?: number;   // seconds per HLS segment (default: 4)
  renditionCount?: number;  // number of quality renditions (default: 4)
  title?: string;           // header label (default: "HLS File Count Calculator")
}

export function VideoMath({
  segmentLength = 4,
  renditionCount = 4,
  title = "HLS File Count Calculator",
}: VideoMathProps = {}) {
  const [duration, setDuration] = useState(2); // minutes
  const segLength = segmentLength;
  const renditions = renditionCount;

  const totalSec = duration * 60;
  const segsPerRendition = Math.ceil(totalSec / segLength);
  const totalSegments = segsPerRendition * renditions;
  const totalFiles = totalSegments + renditions + 1; // segments + rendition playlists + master

  const steps = [
    {
      expr: `${duration} min × 60 sec`,
      result: `${totalSec} sec total`,
      color: "#0070f3",
    },
    {
      expr: `${totalSec} sec ÷ ${segLength} sec per segment`,
      result: `${segsPerRendition} segments per rendition`,
      color: "#7c3aed",
    },
    {
      expr: `${segsPerRendition} segments × ${renditions} renditions`,
      result: `${totalSegments} .ts files`,
      color: "#16a34a",
    },
    {
      expr: `+ ${renditions} rendition playlists + 1 master`,
      result: `${totalFiles} files total`,
      color: "#d97706",
      final: true,
    },
  ];

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        margin: "32px 0",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#0070f3",
              fontWeight: 700,
              letterSpacing: "0.08em",
              border: "1px solid #0070f3",
              borderRadius: 4,
              padding: "2px 6px",
            }}
          >
            INTERACTIVE
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#000",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            {title}
          </span>
        </div>

        {/* Slider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#888",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Video duration
          </span>
          <input
            type="range"
            min={1}
            max={60}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: 100, accentColor: "#0070f3", cursor: "pointer" }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#0070f3",
              fontFamily: "var(--font-geist-mono), monospace",
              minWidth: 52,
              textAlign: "right",
            }}
          >
            {duration} min
          </span>
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 0",
              borderBottom: i < steps.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
            }}
          >
            {/* Step number */}
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: step.color + "18",
                border: `1.5px solid ${step.color}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: step.color,
                fontFamily: "var(--font-geist-mono), monospace",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>

            {/* Expression */}
            <span
              style={{
                flex: 1,
                fontSize: 14,
                color: "#555",
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "-0.01em",
              }}
            >
              {step.expr}
            </span>

            {/* Arrow */}
            <span style={{ color: "#ccc", fontSize: 14, flexShrink: 0 }}>=</span>

            {/* Result */}
            <span
              style={{
                fontSize: step.final ? 16 : 14,
                fontWeight: step.final ? 700 : 600,
                color: step.color,
                fontFamily: "var(--font-geist-mono), monospace",
                minWidth: 180,
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {step.result}
            </span>
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div
        style={{
          padding: "14px 24px",
          background: "#fafafa",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          gap: 24,
        }}
      >
        {[
          { label: "Total files", value: totalFiles, color: "#000" },
          { label: ".ts segments", value: totalSegments, color: "#555" },
          { label: "Playlists", value: renditions + 1, color: "#555" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: s.color,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                lineHeight: 1,
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#aaa",
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.02em",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

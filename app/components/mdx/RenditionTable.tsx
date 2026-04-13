"use client";

import { useState } from "react";

const renditions = [
  { name: "360p", res: "640×360", videoBitrate: 800, audioBitrate: 128, preset: "veryfast", codec: "H.264 + AAC" },
  { name: "480p", res: "854×480", videoBitrate: 1400, audioBitrate: 128, preset: "veryfast", codec: "H.264 + AAC" },
  { name: "720p", res: "1280×720", videoBitrate: 2800, audioBitrate: 128, preset: "veryfast", codec: "H.264 + AAC" },
  { name: "1080p", res: "1920×1080", videoBitrate: 5000, audioBitrate: 192, preset: "veryfast", codec: "H.264 + AAC" },
];

const maxBitrate = 5000;

const qualityColors: Record<string, string> = {
  "360p": "#d97706",
  "480p": "#16a34a",
  "720p": "#0070f3",
  "1080p": "#7c3aed",
};

export function RenditionTable() {
  const [hovered, setHovered] = useState<string | null>(null);

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
          padding: "12px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#fafafa",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#888",
            letterSpacing: "0.04em",
            fontWeight: 500,
          }}
        >
          FFmpeg Output Renditions — CRF 23 · libx264 · aac · veryfast
        </span>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 110px 1fr 90px 80px",
          padding: "10px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          gap: 12,
        }}
      >
        {["Rendition", "Resolution", "Video bitrate", "Audio", "Preset"].map((h) => (
          <span
            key={h}
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#aaa",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {renditions.map((r) => {
        const isHovered = hovered === r.name;
        const color = qualityColors[r.name];
        const barWidth = (r.videoBitrate / maxBitrate) * 100;

        return (
          <div
            key={r.name}
            onMouseEnter={() => setHovered(r.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 110px 1fr 90px 80px",
              padding: "14px 20px",
              gap: 12,
              alignItems: "center",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              background: isHovered ? color + "06" : "transparent",
              transition: "background 0.15s ease",
              cursor: "default",
            }}
          >
            {/* Rendition badge */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color,
                fontFamily: "var(--font-geist-mono), monospace",
                background: color + "14",
                padding: "3px 10px",
                borderRadius: 6,
                display: "inline-block",
              }}
            >
              {r.name}
            </span>

            {/* Resolution */}
            <span
              style={{
                fontSize: 12,
                color: "#555",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              {r.res}
            </span>

            {/* Bitrate bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: 9999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    background: color,
                    borderRadius: 9999,
                    transition: "width 0.3s ease",
                    opacity: isHovered ? 1 : 0.7,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: isHovered ? color : "#888",
                  fontFamily: "var(--font-geist-mono), monospace",
                  minWidth: 68,
                  textAlign: "right",
                  fontWeight: isHovered ? 600 : 400,
                  transition: "color 0.15s",
                }}
              >
                {r.videoBitrate.toLocaleString()} kbps
              </span>
            </div>

            {/* Audio */}
            <span
              style={{
                fontSize: 12,
                color: "#888",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              {r.audioBitrate} kbps
            </span>

            {/* Preset */}
            <span
              style={{
                fontSize: 11,
                color: "#aaa",
                fontFamily: "var(--font-geist-mono), monospace",
                background: "rgba(0,0,0,0.04)",
                padding: "2px 8px",
                borderRadius: 4,
                display: "inline-block",
              }}
            >
              {r.preset}
            </span>
          </div>
        );
      })}

      {/* Footer note */}
      <div
        style={{
          padding: "10px 20px",
          background: "#fafafa",
          borderTop: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#bbb",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          Total output bitrate range: 928 kbps (360p) → 5,192 kbps (1080p)
        </span>
      </div>
    </div>
  );
}

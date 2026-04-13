"use client";

import { useState } from "react";

interface PipelineStep {
  label: string;
  detail?: string;
}

export function Pipeline({ steps }: { steps: PipelineStep[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        margin: "24px 0",
        padding: "18px 20px",
        background: "#fafafa",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 10,
        overflowX: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          flexWrap: "nowrap",
          minWidth: "max-content",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 0, position: "relative" }}
          >
            {/* Step pill */}
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                background: hovered === i ? "#0070f3" : "#fff",
                border: `1.5px solid ${hovered === i ? "#0070f3" : "rgba(0,0,0,0.12)"}`,
                cursor: "default",
                transition: "all 0.15s ease",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: hovered === i ? "#fff" : "#333",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "-0.01em",
                  transition: "color 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </div>

              {/* Tooltip */}
              {step.detail && hovered === i && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#1a1a1a",
                    color: "#fff",
                    fontSize: 11,
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    padding: "6px 10px",
                    borderRadius: 6,
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    pointerEvents: "none",
                    lineHeight: 1.4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  {step.detail}
                  {/* Arrow */}
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 8,
                      height: 8,
                      background: "#1a1a1a",
                      rotate: "45deg",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Arrow */}
            {i < steps.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 6px",
                  color: "#bbb",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface PipelineStep {
  label: string;
  detail?: string;
}

interface PipelineProps {
  steps: PipelineStep[] | string;
  layout?: "horizontal" | "vertical";
}

export function Pipeline({ steps: stepsRaw, layout = "horizontal" }: PipelineProps) {
  const steps: PipelineStep[] =
    typeof stepsRaw === "string" ? JSON.parse(stepsRaw) : stepsRaw;

  if (layout === "vertical") {
    return <VerticalPipeline steps={steps} />;
  }

  return <HorizontalPipeline steps={steps} />;
}

/* ─── Horizontal (original, used in case studies) ─── */

function HorizontalPipeline({ steps }: { steps: PipelineStep[] }) {
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              position: "relative",
            }}
          >
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
                    fontFamily:
                      "var(--font-geist-sans), system-ui, sans-serif",
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

/* ─── Vertical (for multi-line explanations like two-phase breakdown) ─── */

function VerticalPipeline({ steps }: { steps: PipelineStep[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      style={{
        margin: "24px 0",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {steps.map((step, i) => {
        const isActive = active === i;
        const isLast = i === steps.length - 1;

        return (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0,
              borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.06)",
              background: isActive ? "#f0f7ff" : i % 2 === 0 ? "#fff" : "#fafafa",
              cursor: "default",
              transition: "background 0.15s",
            }}
          >
            {/* Left accent bar */}
            <div
              style={{
                width: 4,
                alignSelf: "stretch",
                flexShrink: 0,
                background: isActive ? "#0070f3" : "transparent",
                transition: "background 0.15s",
              }}
            />

            {/* Step number */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "18px 16px 18px 16px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isActive ? "#0070f3" : "#f0f0f0",
                  border: `1.5px solid ${isActive ? "#0070f3" : "rgba(0,0,0,0.1)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: isActive ? "#fff" : "#999",
                  fontFamily: "var(--font-geist-mono), monospace",
                  flexShrink: 0,
                  transition: "all 0.15s",
                }}
              >
                {i + 1}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: "18px 20px 18px 0" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: isActive ? "#0070f3" : "#111",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "-0.01em",
                  marginBottom: step.detail ? 6 : 0,
                  transition: "color 0.15s",
                  lineHeight: 1.4,
                }}
              >
                {step.label}
              </div>
              {step.detail && (
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: isActive ? "#334155" : "#666",
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    transition: "color 0.15s",
                  }}
                >
                  {step.detail}
                </div>
              )}
            </div>

            {/* Right arrow indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "18px 20px",
                color: isActive ? "#0070f3" : "#ddd",
                fontSize: 16,
                flexShrink: 0,
                transition: "color 0.15s, transform 0.15s",
                transform: isActive ? "translateX(3px)" : "translateX(0)",
              }}
            >
              →
            </div>
          </div>
        );
      })}
    </div>
  );
}

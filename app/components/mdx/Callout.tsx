"use client";

type CalloutType = "insight" | "warning" | "tradeoff" | "result";

const config: Record<CalloutType, { icon: string; label: string; border: string; bg: string; color: string }> = {
  insight: { icon: "◆", label: "Insight", border: "#0070f3", bg: "#f0f7ff", color: "#0070f3" },
  warning: { icon: "▲", label: "Watch out", border: "#d97706", bg: "#fffbeb", color: "#d97706" },
  tradeoff: { icon: "⇄", label: "Trade-off", border: "#7c3aed", bg: "#f5f3ff", color: "#7c3aed" },
  result: { icon: "✓", label: "Result", border: "#16a34a", bg: "#f0fdf4", color: "#16a34a" },
};

export function Callout({ type = "insight", children }: { type?: CalloutType; children: React.ReactNode }) {
  const c = config[type];
  return (
    <div
      style={{
        borderLeft: `3px solid ${c.border}`,
        background: c.bg,
        borderRadius: "0 8px 8px 0",
        padding: "14px 18px",
        margin: "24px 0",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <span style={{ color: c.color, fontSize: 13, fontWeight: 700, fontFamily: "var(--font-geist-mono), monospace", paddingTop: 2, flexShrink: 0 }}>
        {c.icon} {c.label}
      </span>
      <span style={{ fontSize: 14, lineHeight: 1.65, color: "#333" }}>{children}</span>
    </div>
  );
}

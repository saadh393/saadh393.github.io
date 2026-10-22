"use client";

import { useMemo, useState } from "react";
import { formatDollars, parseCases, tradeTotal } from "@/lib/promptTrade";
import { paletteAt, seriesAt } from "./palette";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";
const BLUE = paletteAt(0);
const RED = paletteAt(4);
const MISTAKE_STEPS = [0, 0.001, 0.005, 0.01, 0.05, 0.25, 1, 5];
const VOLUME_STEPS = [10_000, 100_000, 1_000_000, 10_000_000];

interface PromptTradeCalculatorProps {
  title?: string;
  cases?: string;
}

export function PromptTradeCalculator({ title = "What a wrong answer costs you", cases: raw = "[]" }: PromptTradeCalculatorProps) {
  const cases = useMemo(() => parseCases(raw), [raw]);
  const [caseIndex, setCaseIndex] = useState(0);
  const [mistakeStep, setMistakeStep] = useState(0);
  const [volumeStep, setVolumeStep] = useState(2);
  const current = cases[caseIndex];
  if (!current) return null;

  const mistakeCost = MISTAKE_STEPS[mistakeStep];
  const volume = VOLUME_STEPS[volumeStep];
  const rows = current.rows.map((r, i) => ({ ...r, ...tradeTotal(r, volume, mistakeCost), color: seriesAt(i).ink }));
  const maxTotal = Math.max(...rows.map((r) => r.total), 0.000001);
  const lowest = rows.reduce((best, r) => (r.total < best.total ? r : best), rows[0]);
  const label = { fontSize: 11, fontFamily: FONT_MONO, color: "#666", letterSpacing: "0.05em", textTransform: "uppercase" } as const;

  return (
    <div style={{ margin: "36px 0", fontFamily: FONT_SANS }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={label}>{title}</span>
        {cases.length > 1 && (
          <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {cases.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setCaseIndex(i)}
                aria-pressed={caseIndex === i}
                style={{
                  fontSize: 12,
                  fontFamily: FONT_MONO,
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: `1px solid ${caseIndex === i ? BLUE.ring : "rgba(0,0,0,0.1)"}`,
                  background: caseIndex === i ? BLUE.bg : "#fff",
                  color: caseIndex === i ? BLUE.ink : "#666",
                  cursor: "pointer",
                }}
              >
                {c.label}
              </button>
            ))}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 14, color: "#333" }}>
            One wrong answer costs you <strong style={{ fontFamily: FONT_MONO, color: RED.ink }}>{formatDollars(mistakeCost)}</strong>
          </span>
          <input
            type="range"
            min={0}
            max={MISTAKE_STEPS.length - 1}
            value={mistakeStep}
            onChange={(e) => setMistakeStep(Number(e.target.value))}
            style={{ accentColor: RED.ink }}
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 14, color: "#333" }}>
            Requests per month <strong style={{ fontFamily: FONT_MONO, color: "#111" }}>{volume.toLocaleString("en-US")}</strong>
          </span>
          <input
            type="range"
            min={0}
            max={VOLUME_STEPS.length - 1}
            value={volumeStep}
            onChange={(e) => setVolumeStep(Number(e.target.value))}
            style={{ accentColor: BLUE.ink }}
          />
        </label>
      </div>

      <div style={{ display: "grid", gap: 16, marginTop: 22 }}>
        {rows.map((r) => (
          <div key={r.name} style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: r.color }}>{r.name}</span>
              <span style={{ fontSize: 16, fontWeight: 600, fontFamily: FONT_MONO, color: "#111" }}>{formatDollars(r.total)}</span>
            </div>
            <div style={{ display: "flex", height: 10, borderRadius: 5, background: "rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <span style={{ width: `${(r.promptBill / maxTotal) * 100}%`, background: r.color }} />
              <span style={{ width: `${(r.mistakeBill / maxTotal) * 100}%`, background: RED.ink, opacity: 0.75 }} />
            </div>
            <span style={{ fontSize: 12, fontFamily: FONT_MONO, color: "#777" }}>
              {formatDollars(r.promptBill)} on prompts · {Math.round(r.wrong).toLocaleString("en-US")} wrong · {formatDollars(r.mistakeBill)} in mistakes
            </span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 18, fontSize: 14, color: "#444", lineHeight: 1.6 }}>
        Cheapest overall at these numbers: <strong style={{ color: lowest.color }}>{lowest.name}</strong>. Wrong answers are projected from the 40-item test.
      </p>
    </div>
  );
}

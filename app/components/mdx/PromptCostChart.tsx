"use client";

import { useMemo, useState } from "react";
import { formatDollars, parseCases } from "@/lib/promptTrade";
import { IsoBarGroup } from "./IsoBarGroup";
import { paletteAt, seriesAt } from "./palette";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";
const BLUE = paletteAt(0);

interface PromptCostChartProps {
  title?: string;
  cases?: string;
}

export function PromptCostChart({ title = "Accuracy and cost", cases: raw = "[]" }: PromptCostChartProps) {
  const cases = useMemo(() => parseCases(raw), [raw]);
  const [caseIndex, setCaseIndex] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const current = cases[caseIndex];
  if (!current) return null;

  const accuracy = current.rows.map((r, i) => ({
    label: r.name,
    value: r.accuracy,
    text: `${Math.round(r.accuracy)}%`,
    color: seriesAt(i).ink,
  }));
  const cost = current.rows.map((r, i) => ({
    label: r.name,
    value: r.costPerMillion,
    text: `$${Math.round(r.costPerMillion)}`,
    color: seriesAt(i).ink,
  }));
  const focusIndex = current.rows.findIndex((r) => r.name === active);
  const focus = current.rows[focusIndex];
  const label = { fontSize: 11, fontFamily: FONT_MONO, color: "#666", letterSpacing: "0.05em", textTransform: "uppercase" } as const;

  return (
    <figure style={{ margin: "36px 0", fontFamily: FONT_SANS }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 16 }}>
        <div>
          <div style={label}>Accuracy</div>
          <IsoBarGroup bars={accuracy} max={100} ariaLabel={`Accuracy for ${current.label}`} active={active} onActive={setActive} />
        </div>
        <div>
          <div style={label}>Cost per 1M {current.unit}</div>
          <IsoBarGroup
            bars={cost}
            max={Math.max(...current.rows.map((r) => r.costPerMillion))}
            ariaLabel={`Cost per million ${current.unit} for ${current.label}`}
            active={active}
            onActive={setActive}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
        {current.rows.map((r, i) => {
          const s = seriesAt(i);
          const on = active === r.name;
          return (
            <button
              key={r.name}
              type="button"
              onClick={() => setActive(on ? null : r.name)}
              aria-pressed={on}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontFamily: FONT_MONO,
                padding: "4px 10px",
                borderRadius: 999,
                border: `1px solid ${on ? s.ring : "rgba(0,0,0,0.08)"}`,
                background: on ? s.bg : "transparent",
                color: on ? s.ink : "#555",
                cursor: "pointer",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: s.ink }} />
              {r.name}
            </button>
          );
        })}
      </div>

      <figcaption style={{ marginTop: 12, minHeight: 44, fontSize: 13, color: "#555", lineHeight: 1.6 }}>
        {focus ? (
          <span>
            <strong style={{ color: seriesAt(focusIndex).ink }}>{focus.name}</strong> got {focus.accuracy}% right
            {current.items ? ` (${Math.round(current.items * (1 - focus.accuracy / 100))} of ${current.items} wrong)` : ""} and costs{" "}
            {formatDollars(focus.costPerMillion)} per million {current.unit}.
          </span>
        ) : (
          (current.note ?? "Hover or tap a bar to see its numbers.")
        )}
      </figcaption>
    </figure>
  );
}

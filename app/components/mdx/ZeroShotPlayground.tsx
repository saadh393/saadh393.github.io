"use client";

import { useMemo, useState } from "react";
import { zeroShotScore, type ZeroShotLabel } from "@/lib/zeroShot";
import { paletteAt } from "./palette";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";
const FIND = paletteAt(4);
const KEEP = paletteAt(2);

interface PlaygroundLabel extends ZeroShotLabel {
  on?: boolean;
}

interface ZeroShotPlaygroundProps {
  title?: string;
  image?: string;
  labels?: string;
  threshold?: number;
}

function safeParse<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

export function ZeroShotPlayground({
  title = "Zero-shot scoring",
  image = "",
  labels: labelsRaw = "[]",
  threshold = 0.6,
}: ZeroShotPlaygroundProps) {
  const labels = useMemo(() => {
    const parsed = safeParse<PlaygroundLabel[]>(labelsRaw, []);
    return Array.isArray(parsed) ? parsed : [];
  }, [labelsRaw]);
  const [enabled, setEnabled] = useState(() => labels.map((l) => l.on !== false));
  const [logitScale, setLogitScale] = useState(100);

  const active = labels.filter((_, i) => enabled[i]);
  const { probs, junkScore, best } = zeroShotScore(active, logitScale);
  const probOf = new Map(active.map((l, i) => [l, probs[i]]));
  const top = active[best];
  const flagged = top !== undefined && top.kind === "find" && junkScore >= threshold;

  const verdict = !top
    ? "Turn on at least one label."
    : flagged
      ? `Flagged. Junk score ${junkScore.toFixed(2)} is above ${threshold} and the top match is a "find" label.`
      : top.kind === "keep"
        ? `Left alone. The top match is "${top.text}", a "never touch" label.`
        : `Left alone. Junk score ${junkScore.toFixed(2)} is below ${threshold}.`;

  if (!labels.length) return null;

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        margin: "32px 0",
        background: "#fff",
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 11, fontFamily: FONT_MONO, color: "#666", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {title}
        </span>
        {image && <span style={{ fontSize: 12, fontFamily: FONT_MONO, color: "#999" }}>image: {image}</span>}
      </div>

      <div style={{ padding: "16px 20px", display: "grid", gap: 8 }}>
        {labels.map((l, i) => {
          const color = l.kind === "find" ? FIND : KEEP;
          const p = probOf.get(l) ?? 0;
          const on = enabled[i];
          return (
            <button
              key={l.text}
              type="button"
              onClick={() => setEnabled((prev) => prev.map((v, j) => (j === i ? !v : v)))}
              aria-pressed={on}
              className="zs-row"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 52px",
                gap: 10,
                alignItems: "center",
                padding: "8px 10px",
                border: `1px solid ${on ? color.ring : "rgba(0,0,0,0.08)"}`,
                borderRadius: 8,
                background: on ? color.bg : "#fff",
                cursor: "pointer",
                textAlign: "left",
                opacity: on ? 1 : 0.5,
              }}
            >
              <span style={{ display: "grid", gap: 6, minWidth: 0 }}>
                <span style={{ fontSize: 13, color: "#222", display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontFamily: FONT_MONO, color: color.ink, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {l.kind === "find" ? "find" : "keep"}
                  </span>
                  {l.text}
                  <span style={{ fontSize: 11, fontFamily: FONT_MONO, color: "#999" }}>cos {l.similarity.toFixed(3)}</span>
                </span>
                <span style={{ height: 6, borderRadius: 3, background: "rgba(0,0,0,0.05)", overflow: "hidden" }}>
                  <span
                    className="zs-bar"
                    style={{
                      display: "block",
                      height: "100%",
                      width: "100%",
                      background: color.ink,
                      transform: `scaleX(${on ? p : 0})`,
                      transformOrigin: "left",
                    }}
                  />
                </span>
              </span>
              <span style={{ fontSize: 13, fontFamily: FONT_MONO, color: on ? "#111" : "#bbb", textAlign: "right" }}>
                {on ? `${Math.round(p * 100)}%` : "off"}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ padding: "0 20px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <label htmlFor="zs-scale" style={{ fontSize: 12, fontFamily: FONT_MONO, color: "#666" }}>
          logit scale {logitScale}
        </label>
        <input
          id="zs-scale"
          type="range"
          min={1}
          max={100}
          value={logitScale}
          onChange={(e) => setLogitScale(Number(e.target.value))}
          style={{ flex: "1 1 160px", accentColor: "#0070f3" }}
        />
      </div>

      <div
        style={{
          padding: "14px 20px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: flagged ? FIND.bg : KEEP.bg,
          display: "flex",
          gap: 16,
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 600, fontFamily: FONT_MONO, color: flagged ? FIND.ink : KEEP.ink }}>
          {junkScore.toFixed(2)}
        </span>
        <span style={{ fontSize: 13, color: "#333", lineHeight: 1.6, flex: "1 1 240px" }}>{verdict}</span>
      </div>
    </div>
  );
}

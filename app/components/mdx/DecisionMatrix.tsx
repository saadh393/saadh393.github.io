"use client";

import React, { useMemo, useState } from "react";
import { paletteAt } from "./palette";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";

const GREEN = paletteAt(2);
const AMBER = paletteAt(3);
const RED = paletteAt(4);
const BLUE = paletteAt(0);
const GREY = { ink: "#888", bg: "rgba(0,0,0,0.04)", ring: "rgba(0,0,0,0.18)" };

type Rating = "good" | "ok" | "bad" | "na";

interface Option {
  id: string;
  name: string;
  summary?: string;
  chosen?: boolean;
  verdict?: string;
}

interface ScoreCell {
  rating: Rating;
  note?: string;
}

interface Criterion {
  label: string;
  hint?: string;
  scores: Record<string, ScoreCell>;
}

interface DecisionMatrixProps {
  title?: string;
  options: string | Option[];
  criteria: string | Criterion[];
}

const ratingPalette = (r: Rating) =>
  r === "good" ? GREEN : r === "ok" ? AMBER : r === "bad" ? RED : GREY;

const ratingLabel = (r: Rating) =>
  r === "good" ? "yes" : r === "ok" ? "partial" : r === "bad" ? "no" : "n/a";

const ratingStrength = (r: Rating) =>
  r === "good" ? 3 : r === "ok" ? 2 : r === "bad" ? 1 : 0;

export function DecisionMatrix({
  title = "Decision Matrix",
  options: optionsRaw,
  criteria: criteriaRaw,
}: DecisionMatrixProps) {
  const options: Option[] = useMemo(
    () => (typeof optionsRaw === "string" ? safeParse(optionsRaw, []) : optionsRaw ?? []),
    [optionsRaw],
  );
  const criteria: Criterion[] = useMemo(
    () => (typeof criteriaRaw === "string" ? safeParse(criteriaRaw, []) : criteriaRaw ?? []),
    [criteriaRaw],
  );

  const originallyChosen = useMemo(
    () => options.find((o) => o.chosen)?.id ?? options[0]?.id ?? "",
    [options],
  );
  const [candidate, setCandidate] = useState<string>(originallyChosen);
  const [hovered, setHovered] = useState<string | null>(null);

  if (!options.length || !criteria.length) {
    return (
      <div
        style={{
          padding: 16,
          border: "1px dashed rgba(0,0,0,0.18)",
          borderRadius: 10,
          margin: "28px 0",
          fontFamily: FONT_MONO,
          fontSize: 12,
          color: "#888",
        }}
      >
        DecisionMatrix: pass options and criteria as JSON strings.
      </div>
    );
  }

  const candidateOption = options.find((o) => o.id === candidate) ?? options[0];
  const isOriginal = candidateOption.id === originallyChosen;

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "28px 0",
        background: "#fff",
        fontFamily: FONT_SANS,
      }}
    >
      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: "#666",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, fontFamily: FONT_MONO, color: "#999" }}>
            {options.length} options · {criteria.length} criteria
          </span>
          {!isOriginal && (
            <button
              onClick={() => setCandidate(originallyChosen)}
              style={{
                padding: "4px 10px",
                fontSize: 11,
                fontFamily: FONT_MONO,
                fontWeight: 600,
                color: BLUE.ink,
                background: BLUE.bg,
                border: `1px solid ${BLUE.ring}`,
                borderRadius: 6,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              ↺ Reset to chosen
            </button>
          )}
        </div>
      </div>

      {/* ── Matrix grid ─────────────────────────────────────────── */}
      <div style={{ overflowX: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(180px, 1.1fr) repeat(${options.length}, minmax(160px, 1fr))`,
            minWidth: 480,
          }}
        >
          {/* Header row */}
          <HeaderCell label="Criterion" sub="" />
          {options.map((opt) => {
            const isCandidate = opt.id === candidate;
            const isOrig = opt.id === originallyChosen;
            return (
              <button
                key={opt.id}
                onClick={() => setCandidate(opt.id)}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  background: isCandidate ? GREEN.bg : "#fafafa",
                  borderBottom: `1px solid rgba(0,0,0,0.08)`,
                  borderLeft: "1px solid rgba(0,0,0,0.05)",
                  borderTop: "none",
                  borderRight: "none",
                  borderTopWidth: isCandidate ? 2 : 0,
                  borderTopColor: GREEN.ink,
                  borderTopStyle: "solid",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontFamily: FONT_SANS,
                  position: "relative",
                  transition: "background 0.15s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>
                    {opt.name}
                  </span>
                  {isOrig && (
                    <span
                      style={{
                        fontSize: 9,
                        fontFamily: FONT_MONO,
                        color: GREEN.ink,
                        background: GREEN.bg,
                        border: `1px solid ${GREEN.ring}`,
                        padding: "1px 6px",
                        borderRadius: 999,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      chosen
                    </span>
                  )}
                  {isCandidate && !isOrig && (
                    <span
                      style={{
                        fontSize: 9,
                        fontFamily: FONT_MONO,
                        color: BLUE.ink,
                        background: BLUE.bg,
                        border: `1px solid ${BLUE.ring}`,
                        padding: "1px 6px",
                        borderRadius: 999,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      trying
                    </span>
                  )}
                </div>
                {opt.summary && (
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: FONT_MONO,
                      color: "#666",
                      lineHeight: 1.45,
                    }}
                  >
                    {opt.summary}
                  </span>
                )}
              </button>
            );
          })}

          {/* Body rows */}
          {criteria.map((crit, rowIdx) => {
            const rowKey = `row-${rowIdx}`;
            return (
              <React.Fragment key={rowKey}>
                <CriterionCell label={crit.label} hint={crit.hint} />
                {options.map((opt) => {
                  const score = crit.scores[opt.id] ?? { rating: "na" as Rating };
                  const cellKey = `${rowKey}-${opt.id}`;
                  const isCandidate = opt.id === candidate;
                  return (
                    <ScoreCellView
                      key={cellKey}
                      score={score}
                      isCandidateColumn={isCandidate}
                      isHovered={hovered === cellKey}
                      onHover={(on) => setHovered(on ? cellKey : null)}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Verdict footer ──────────────────────────────────────── */}
      <div
        style={{
          padding: "14px 18px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: isOriginal ? GREEN.bg : BLUE.bg,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: FONT_MONO,
            color: isOriginal ? GREEN.ink : BLUE.ink,
            border: `1px solid ${isOriginal ? GREEN.ring : BLUE.ring}`,
            padding: "3px 8px",
            borderRadius: 999,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontWeight: 600,
            flexShrink: 0,
            whiteSpace: "nowrap",
            marginTop: 1,
          }}
        >
          {isOriginal ? "verdict" : "what if"}
        </span>
        <span
          style={{
            fontSize: 13,
            color: "#222",
            lineHeight: 1.6,
            fontFamily: FONT_SANS,
          }}
        >
          <strong style={{ color: "#000", fontWeight: 600 }}>{candidateOption.name}.</strong>{" "}
          {candidateOption.verdict ?? "No verdict provided."}
          {!isOriginal && (
            <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "#666" }}>
              Originally chose <strong style={{ color: "#000" }}>{options.find((o) => o.id === originallyChosen)?.name}</strong>.
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function HeaderCell({ label, sub }: { label: string; sub: string }) {
  return (
    <div
      style={{
        padding: "12px 14px",
        background: "#fafafa",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        fontFamily: FONT_MONO,
        fontSize: 11,
        color: "#666",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      <div>{label}</div>
      {sub && <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function CriterionCell({ label, hint }: { label: string; hint?: string }) {
  return (
    <div
      style={{
        padding: "14px 14px",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        background: "#fcfcfc",
        fontFamily: FONT_SANS,
      }}
    >
      <div style={{ fontSize: 13, color: "#000", fontWeight: 500 }}>{label}</div>
      {hint && (
        <div style={{ fontSize: 11, color: "#888", marginTop: 4, lineHeight: 1.5 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

function ScoreCellView({
  score,
  isCandidateColumn,
  isHovered,
  onHover,
}: {
  score: ScoreCell;
  isCandidateColumn: boolean;
  isHovered: boolean;
  onHover: (on: boolean) => void;
}) {
  const palette = ratingPalette(score.rating);
  const strength = ratingStrength(score.rating);
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        padding: "14px 14px",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        borderLeft: "1px solid rgba(0,0,0,0.04)",
        background: isCandidateColumn ? "rgba(22,163,74,0.025)" : "#fff",
        position: "relative",
        cursor: score.note ? "help" : "default",
        transition: "background 0.15s ease",
        minHeight: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: palette.ink,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: palette.ink,
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {ratingLabel(score.rating)}
        </span>
        <span style={{ display: "flex", gap: 2, marginLeft: "auto" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 4,
                height: 12,
                borderRadius: 1,
                background: i < strength ? palette.ink : "rgba(0,0,0,0.08)",
              }}
            />
          ))}
        </span>
      </div>
      {score.note && (
        <div
          style={{
            fontSize: 11,
            color: "#666",
            marginTop: 6,
            lineHeight: 1.5,
            fontFamily: FONT_SANS,
            opacity: isHovered ? 1 : 0.78,
            transition: "opacity 0.15s ease",
          }}
        >
          {score.note}
        </div>
      )}
    </div>
  );
}

function safeParse<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

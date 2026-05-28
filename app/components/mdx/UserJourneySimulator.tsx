"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { paletteAt, type PaletteEntry } from "./palette";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";

interface AdapterChoice {
  id: string;
  label: string;
  provider: string;
  hint?: string;
}

interface JourneyStep {
  id: string;
  title: string;
  description?: string;
  call: string;
  portLabel: string;
  adapters: AdapterChoice[];
  successLine: string;
}

interface UserJourneySimulatorProps {
  title?: string;
  scenario?: string;
  steps: string | JourneyStep[];
}

type Phase = "pick" | "running" | "done";

interface LogEntry {
  stepId: string;
  tone: "call" | "ok" | "info";
  text: string;
}

function safeParse<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

const FLOW_SEQUENCE = [0, 1, 2, 3, 2, 1, 0];
const STEP_DELAY = 360;

export function UserJourneySimulator({
  title = "User journey simulator",
  scenario = "Order #1042 — $42.00 — customer@example.com",
  steps: stepsRaw,
}: UserJourneySimulatorProps) {
  const steps: JourneyStep[] = useMemo(
    () =>
      typeof stepsRaw === "string"
        ? safeParse(stepsRaw, [] as JourneyStep[])
        : stepsRaw ?? [],
    [stepsRaw],
  );

  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("pick");
  const [highlight, setHighlight] = useState<number>(-1);
  const [choices, setChoices] = useState<Record<string, string>>(() =>
    Object.fromEntries(steps.map((s) => [s.id, s.adapters[0]?.id ?? ""])),
  );
  const [log, setLog] = useState<LogEntry[]>([]);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  if (!steps.length) {
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
        UserJourneySimulator: pass steps as a JSON string.
      </div>
    );
  }

  const isDone = stepIdx >= steps.length;
  const step = isDone ? steps[steps.length - 1] : steps[stepIdx];
  const stepColor: PaletteEntry = paletteAt(stepIdx % steps.length);
  const chosen = step.adapters.find((a) => a.id === choices[step.id]);

  const handleRun = () => {
    if (phase !== "pick") return;
    setPhase("running");
    setLog((l) => [
      ...l,
      {
        stepId: step.id,
        tone: "call",
        text: `app.${step.id}() → ${step.call}`,
      },
    ]);

    FLOW_SEQUENCE.forEach((node, i) => {
      const t = window.setTimeout(() => {
        setHighlight(node);
        if (i === FLOW_SEQUENCE.length - 1) {
          const finishTimer = window.setTimeout(() => {
            setHighlight(-1);
            setLog((l) => [
              ...l,
              {
                stepId: step.id,
                tone: "info",
                text: `   routed through ${chosen?.label ?? "adapter"} adapter`,
              },
              {
                stepId: step.id,
                tone: "ok",
                text: `   ${step.successLine.replace(
                  /\{adapter\}/g,
                  chosen?.label ?? "",
                )}`,
              },
            ]);
            setPhase("done");
          }, STEP_DELAY);
          timersRef.current.push(finishTimer);
        }
      }, i * STEP_DELAY);
      timersRef.current.push(t);
    });
  };

  const handleNext = () => {
    clearTimers();
    setHighlight(-1);
    setPhase("pick");
    setStepIdx((i) => i + 1);
  };

  const handleReset = () => {
    clearTimers();
    setHighlight(-1);
    setPhase("pick");
    setStepIdx(0);
    setLog([]);
  };

  const handleChoose = (adapterId: string) => {
    if (phase !== "pick") return;
    setChoices((c) => ({ ...c, [step.id]: adapterId }));
  };

  return (
    <div
      style={{
        margin: "32px 0",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        fontFamily: FONT_SANS,
      }}
    >
      <Toolbar title={title} />

      <ScenarioBar
        scenario={scenario}
        stepIdx={Math.min(stepIdx, steps.length - 1)}
        steps={steps}
        isDone={isDone}
      />

      {!isDone && (
        <>
          <StepHeader step={step} stepIdx={stepIdx} total={steps.length} color={stepColor} />
          <AdapterPicker
            step={step}
            chosenId={choices[step.id]}
            onChoose={handleChoose}
            color={stepColor}
            disabled={phase !== "pick"}
          />
          <FlowDiagram
            step={step}
            chosen={chosen}
            color={stepColor}
            highlight={highlight}
            phase={phase}
          />
          <ActionBar
            phase={phase}
            onRun={handleRun}
            onNext={handleNext}
            stepIdx={stepIdx}
            total={steps.length}
            color={stepColor}
          />
        </>
      )}

      {isDone && <DoneSummary steps={steps} choices={choices} onReset={handleReset} />}

      <LogPanel log={log} steps={steps} />
    </div>
  );
}

function Toolbar({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        background: "#fafafa",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <div
          key={c}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: c,
            opacity: 0.7,
          }}
        />
      ))}
      <span
        style={{
          fontSize: 11,
          fontFamily: FONT_MONO,
          color: "#666",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginLeft: 6,
        }}
      >
        {title}
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 11,
          fontFamily: FONT_MONO,
          color: "#999",
        }}
      >
        same business logic, different adapters
      </span>
    </div>
  );
}

function ScenarioBar({
  scenario,
  stepIdx,
  steps,
  isDone,
}: {
  scenario: string;
  stepIdx: number;
  steps: JourneyStep[];
  isDone: boolean;
}) {
  return (
    <div
      style={{
        padding: "14px 18px",
        background: "linear-gradient(180deg, #fcfcfd 0%, #f6f7f9 100%)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 16,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontFamily: FONT_MONO,
          color: "#666",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        scenario
      </span>
      <span
        style={{
          fontSize: 13.5,
          color: "#1a1a1a",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {scenario}
      </span>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
        {steps.map((s, i) => {
          const active = !isDone && i === stepIdx;
          const done = isDone || i < stepIdx;
          const color = paletteAt(i % steps.length);
          return (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: active ? 10 : 8,
                  height: active ? 10 : 8,
                  borderRadius: "50%",
                  background: done ? color.ink : active ? color.ink : "#d4d4d8",
                  border: active ? `2px solid ${color.ring}` : "none",
                  transition: "all 0.2s ease",
                }}
              />
              {i < steps.length - 1 && (
                <span
                  style={{
                    width: 18,
                    height: 1,
                    background: done ? color.ring : "#e4e4e7",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepHeader({
  step,
  stepIdx,
  total,
  color,
}: {
  step: JourneyStep;
  stepIdx: number;
  total: number;
  color: PaletteEntry;
}) {
  return (
    <div
      style={{
        padding: "18px 18px 4px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 10.5,
            fontFamily: FONT_MONO,
            color: color.ink,
            background: color.bg,
            border: `1px solid ${color.ring}`,
            padding: "3px 8px",
            borderRadius: 999,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          step {stepIdx + 1} of {total}
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#0a0a0a",
            letterSpacing: "-0.015em",
          }}
        >
          {step.title}
        </span>
      </div>
      {step.description && (
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 13,
            color: "#666",
            lineHeight: 1.6,
          }}
        >
          {step.description}
        </p>
      )}
    </div>
  );
}

function AdapterPicker({
  step,
  chosenId,
  onChoose,
  color,
  disabled,
}: {
  step: JourneyStep;
  chosenId: string;
  onChoose: (id: string) => void;
  color: PaletteEntry;
  disabled: boolean;
}) {
  return (
    <div style={{ padding: "12px 18px 6px" }}>
      <div
        style={{
          fontSize: 11,
          fontFamily: FONT_MONO,
          color: "#888",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        pick adapter for {step.portLabel}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {step.adapters.map((a) => {
          const isActive = a.id === chosenId;
          return (
            <button
              key={a.id}
              onClick={() => onChoose(a.id)}
              disabled={disabled}
              title={a.hint}
              style={{
                padding: "8px 14px",
                fontSize: 12.5,
                fontFamily: FONT_MONO,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? color.ink : "#555",
                background: isActive ? color.bg : "#fafafa",
                border: `1px solid ${isActive ? color.ring : "rgba(0,0,0,0.1)"}`,
                borderRadius: 7,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.65 : 1,
                letterSpacing: "-0.005em",
                transition: "background 0.15s, border-color 0.15s, color 0.15s",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                minWidth: 100,
              }}
            >
              <span>{a.label}</span>
              <span
                style={{
                  fontSize: 10,
                  color: isActive ? color.ink : "#999",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                }}
              >
                {a.provider}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FlowDiagram({
  step,
  chosen,
  color,
  highlight,
  phase,
}: {
  step: JourneyStep;
  chosen?: AdapterChoice;
  color: PaletteEntry;
  highlight: number;
  phase: Phase;
}) {
  const nodes = [
    {
      label: "Business Logic",
      detail: step.call,
      palette: paletteAt(2),
    },
    {
      label: `Port: ${step.portLabel}`,
      detail: "interface contract",
      palette: paletteAt(0),
    },
    {
      label: `${chosen?.label ?? "Adapter"}`,
      detail: "translates the call",
      palette: color,
    },
    {
      label: chosen?.provider ?? "External Provider",
      detail: "real service",
      palette: paletteAt(3),
    },
  ];

  return (
    <div
      style={{
        margin: "10px 14px 14px",
        padding: "20px 12px",
        background: "linear-gradient(180deg, #fafafa 0%, #f4f4f6 100%)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, auto)",
          alignItems: "stretch",
          justifyContent: "center",
          gap: 0,
          overflowX: "auto",
        }}
      >
        {nodes.map((n, i) => (
          <FlowFragment
            key={i}
            node={n}
            isActive={highlight === i}
            isPast={phase === "done" || (phase === "running" && highlight > i)}
            withArrow={i < nodes.length - 1}
            phase={phase}
          />
        ))}
      </div>
    </div>
  );
}

function FlowFragment({
  node,
  isActive,
  isPast,
  withArrow,
  phase,
}: {
  node: { label: string; detail: string; palette: PaletteEntry };
  isActive: boolean;
  isPast: boolean;
  withArrow: boolean;
  phase: Phase;
}) {
  const lit = isActive || isPast;
  return (
    <>
      <div
        style={{
          minWidth: 116,
          padding: "10px 12px",
          borderRadius: 8,
          background: isActive ? node.palette.bg : "#fff",
          border: `1px solid ${isActive ? node.palette.ring : "rgba(0,0,0,0.08)"}`,
          boxShadow: isActive
            ? `0 0 0 3px ${node.palette.bg}, 0 4px 14px ${node.palette.bg}`
            : "0 1px 2px rgba(0,0,0,0.03)",
          transition: "all 0.25s ease",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignSelf: "center",
        }}
      >
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: lit ? node.palette.ink : "#444",
            fontFamily: FONT_SANS,
            letterSpacing: "-0.005em",
          }}
        >
          {node.label}
        </span>
        <span
          style={{
            fontSize: 10,
            fontFamily: FONT_MONO,
            color: lit ? node.palette.ink : "#888",
            opacity: 0.85,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 180,
          }}
        >
          {node.detail}
        </span>
      </div>
      {withArrow && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 6px",
            position: "relative",
          }}
        >
          <svg width="36" height="14" viewBox="0 0 36 14" style={{ display: "block" }}>
            <line
              x1="0"
              y1="7"
              x2="30"
              y2="7"
              stroke={isPast ? "#16a34a" : "#cbd5e1"}
              strokeWidth="1.5"
              strokeDasharray={phase === "running" ? "4 3" : "0"}
              style={{
                transition: "stroke 0.25s ease",
              }}
            />
            <polygon
              points="30,3 36,7 30,11"
              fill={isPast ? "#16a34a" : "#cbd5e1"}
              style={{ transition: "fill 0.25s ease" }}
            />
          </svg>
        </div>
      )}
    </>
  );
}

function ActionBar({
  phase,
  onRun,
  onNext,
  stepIdx,
  total,
  color,
}: {
  phase: Phase;
  onRun: () => void;
  onNext: () => void;
  stepIdx: number;
  total: number;
  color: PaletteEntry;
}) {
  const isLast = stepIdx === total - 1;
  return (
    <div
      style={{
        padding: "10px 18px 18px",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      {phase === "pick" && (
        <button
          onClick={onRun}
          style={primaryButton(color)}
        >
          ▶ Run this step
        </button>
      )}
      {phase === "running" && (
        <button disabled style={{ ...primaryButton(color), cursor: "wait", opacity: 0.7 }}>
          routing call…
        </button>
      )}
      {phase === "done" && (
        <button onClick={onNext} style={primaryButton(color)}>
          {isLast ? "See summary →" : "Next step →"}
        </button>
      )}
      <span
        style={{
          fontSize: 11,
          fontFamily: FONT_MONO,
          color: "#aaa",
          letterSpacing: "0.02em",
        }}
      >
        {phase === "pick"
          ? "the call leaves business logic, passes through the port, hits the adapter, then the provider"
          : phase === "running"
            ? "watching the call travel through the layers"
            : "step complete"}
      </span>
    </div>
  );
}

function primaryButton(color: PaletteEntry): React.CSSProperties {
  return {
    padding: "9px 16px",
    fontSize: 13,
    fontFamily: FONT_MONO,
    fontWeight: 600,
    color: "#fff",
    background: color.ink,
    border: `1px solid ${color.ink}`,
    borderRadius: 7,
    cursor: "pointer",
    letterSpacing: "-0.005em",
  };
}

function DoneSummary({
  steps,
  choices,
  onReset,
}: {
  steps: JourneyStep[];
  choices: Record<string, string>;
  onReset: () => void;
}) {
  return (
    <div
      style={{
        padding: "20px 18px",
        background: "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)",
        borderBottom: "1px solid rgba(22,163,74,0.18)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#16a34a",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          ✓
        </span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#14532d" }}>
          Journey complete
        </span>
      </div>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 13.5,
          color: "#166534",
          lineHeight: 1.65,
        }}
      >
        Every step above ran the same business logic. The only thing that
        changed between runs was the registry line that decides which adapter
        is wired in.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {steps.map((s) => {
          const c = s.adapters.find((a) => a.id === choices[s.id]);
          return (
            <div
              key={s.id}
              style={{
                padding: "10px 12px",
                background: "#fff",
                border: "1px solid rgba(22,163,74,0.25)",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontSize: 10.5,
                  fontFamily: FONT_MONO,
                  color: "#16a34a",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {s.portLabel}
              </div>
              <div style={{ fontSize: 13, color: "#0a0a0a", fontWeight: 500 }}>
                {c?.label ?? "—"}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                {c?.provider}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onReset}
        style={{
          padding: "8px 14px",
          fontSize: 12,
          fontFamily: FONT_MONO,
          fontWeight: 600,
          color: "#14532d",
          background: "#fff",
          border: "1px solid rgba(22,163,74,0.35)",
          borderRadius: 7,
          cursor: "pointer",
        }}
      >
        ↺ Try a different combination
      </button>
    </div>
  );
}

function LogPanel({ log, steps }: { log: LogEntry[]; steps: JourneyStep[] }) {
  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#e5e7eb",
        fontFamily: FONT_MONO,
        fontSize: 12.5,
        lineHeight: 1.7,
        padding: "12px 18px",
        maxHeight: 200,
        overflowY: "auto",
      }}
    >
      <div style={{ color: "#6b7280", marginBottom: 4 }}>{`// runtime log`}</div>
      {log.length === 0 && (
        <div style={{ color: "#525252" }}>
          waiting for the first call…
        </div>
      )}
      {log.map((entry, i) => {
        const step = steps.find((s) => s.id === entry.stepId);
        const color =
          entry.tone === "ok"
            ? "#86efac"
            : entry.tone === "call"
              ? "#93c5fd"
              : "#d4d4d8";
        return (
          <div key={i} style={{ color, whiteSpace: "pre" }}>
            {entry.tone === "call" && (
              <span style={{ color: "#6b7280" }}>[{step?.portLabel}] </span>
            )}
            {entry.text}
          </div>
        );
      })}
    </div>
  );
}

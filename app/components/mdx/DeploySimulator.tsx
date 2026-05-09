"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { paletteAt } from "./palette";

interface DeploySimulatorProps {
  buildSeconds?: number;
  warmSeconds?: number;
  swapSeconds?: number;
  drainSeconds?: number;
  totalSeconds?: number;
  title?: string;
}

type SingleState = "live-v1" | "down" | "live-v2";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";

const GREEN = paletteAt(2);
const AMBER = paletteAt(3);
const RED = paletteAt(4);
const BLUE = paletteAt(0);
const CYAN = paletteAt(5);
const GREY = { ink: "#888", bg: "rgba(0,0,0,0.04)", ring: "rgba(0,0,0,0.18)" };

function fmt(t: number) {
  return `${t.toFixed(1).padStart(5, "0")}s`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function DeploySimulator({
  buildSeconds = 90,
  warmSeconds = 15,
  swapSeconds = 1,
  drainSeconds = 30,
  totalSeconds = 150,
  title = "Deploy Simulator — drag the slider, watch what users see",
}: DeploySimulatorProps) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!playing) return;
    lastTickRef.current = performance.now();
    const loop = (now: number) => {
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      setT((prev) => {
        const next = prev + delta * speed;
        if (next >= totalSeconds) {
          setPlaying(false);
          return totalSeconds;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, speed, totalSeconds]);

  const downStart = buildSeconds;
  const downEnd = buildSeconds + swapSeconds + warmSeconds;
  const flipAt = buildSeconds + warmSeconds;
  const drainEnd = flipAt + drainSeconds;

  const singleState: SingleState =
    t < downStart ? "live-v1" : t < downEnd ? "down" : "live-v2";
  const singleHealthy = singleState !== "down";

  const greenStarted = t >= buildSeconds;
  const greenHealthy = t >= buildSeconds + warmSeconds;
  const flipped = t >= flipAt;
  const blueAlive = t < drainEnd;
  const blueDraining = flipped && blueAlive;

  const singleDowntime = useMemo(() => {
    return Math.max(0, Math.min(t, downEnd) - downStart);
  }, [t, downStart, downEnd]);

  const transition = reduced ? "none" : "all 0.25s ease";

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
      {/* ── Toolbar ──────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setPlaying((p) => !p)}
            style={pillBtn(playing)}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              setT(0);
            }}
            style={pillBtn(false)}
            aria-label="Reset"
          >
            ↺ Reset
          </button>
          <div
            style={{
              display: "flex",
              gap: 2,
              background: "rgba(0,0,0,0.05)",
              borderRadius: 6,
              padding: 2,
            }}
          >
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                style={{
                  padding: "3px 9px",
                  fontSize: 11,
                  fontFamily: FONT_MONO,
                  fontWeight: speed === s ? 600 : 400,
                  color: speed === s ? BLUE.ink : "#888",
                  background: speed === s ? "#fff" : "transparent",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  boxShadow: speed === s ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrubber ─────────────────────────────────────────────── */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 8,
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: "#444" }}>
            t = <strong style={{ color: "#000" }}>{fmt(t)}</strong>
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#999" }}>
            phase: <span style={{ color: "#444" }}>{phaseLabel(t, buildSeconds, flipAt, drainEnd, totalSeconds)}</span>
          </span>
        </div>
        <PhaseTrack
          t={t}
          totalSeconds={totalSeconds}
          buildSeconds={buildSeconds}
          flipAt={flipAt}
          drainEnd={drainEnd}
          downStart={downStart}
          downEnd={downEnd}
        />
        <input
          type="range"
          min={0}
          max={totalSeconds}
          step={0.1}
          value={t}
          onChange={(e) => {
            setPlaying(false);
            setT(parseFloat(e.target.value));
          }}
          style={{
            width: "100%",
            margin: "10px 0 0",
            accentColor: BLUE.ink,
          }}
        />
      </div>

      {/* ── Single-container lane ────────────────────────────────── */}
      <Lane
        title="Single Container — old script"
        accentInk={singleHealthy ? GREEN.ink : RED.ink}
        healthy={singleHealthy}
        statusLabel={singleHealthy ? "200 OK" : "502 Bad Gateway"}
        downtimeSeconds={singleDowntime}
        transition={transition}
      >
        <Nginx pointingActive={true} />
        <Arrow active={singleHealthy} color={singleHealthy ? GREEN.ink : RED.ink} transition={transition} />
        <Container
          label="web"
          version={singleState === "live-v2" ? "v2" : "v1"}
          state={
            singleState === "down"
              ? t < downStart + swapSeconds
                ? "stopped"
                : "warming"
              : "live"
          }
          subline={
            t < buildSeconds
              ? "host: docker build…"
              : singleState === "down"
                ? t < downStart + swapSeconds
                  ? "docker stop"
                  : "warming up"
                : "serving"
          }
          transition={transition}
        />
      </Lane>

      {/* ── Blue-green lane ──────────────────────────────────────── */}
      <Lane
        title="Blue-Green — new strategy"
        accentInk={GREEN.ink}
        healthy={true}
        statusLabel="200 OK"
        downtimeSeconds={0}
        transition={transition}
        last
      >
        <Nginx pointingActive={true} />
        <Arrow
          active={!flipped}
          color={BLUE.ink}
          transition={transition}
          dimmedWhen={flipped}
          label="blue"
          offsetY={-30}
        />
        <Arrow
          active={flipped}
          color={GREEN.ink}
          transition={transition}
          dimmedWhen={!flipped}
          label="green"
          offsetY={30}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Container
            label="web-blue"
            version="v1"
            state={blueDraining ? "draining" : blueAlive ? "live" : "stopped"}
            subline={
              blueDraining
                ? `draining (${Math.max(0, Math.ceil(drainEnd - t))}s)`
                : blueAlive
                  ? "serving"
                  : "stopped"
            }
            transition={transition}
            tint={BLUE}
          />
          <Container
            label="web-green"
            version="v2"
            state={
              !greenStarted
                ? "idle"
                : !greenHealthy
                  ? "warming"
                  : "live"
            }
            subline={
              !greenStarted
                ? "not running"
                : !greenHealthy
                  ? `health probe (${Math.max(0, Math.ceil(buildSeconds + warmSeconds - t))}s)`
                  : flipped
                    ? "serving"
                    : "ready, awaiting flip"
            }
            transition={transition}
            tint={GREEN}
          />
        </div>
      </Lane>

      {/* ── Footnote ─────────────────────────────────────────────── */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          fontSize: 11,
          color: "#888",
          fontFamily: FONT_MONO,
          letterSpacing: "0.02em",
        }}
      >
        build {buildSeconds}s · warm {warmSeconds}s · drain {drainSeconds}s · single-container downtime ≈ {swapSeconds + warmSeconds}s · blue-green downtime = 0s
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function pillBtn(active: boolean): React.CSSProperties {
  return {
    padding: "5px 12px",
    fontSize: 11,
    fontFamily: FONT_MONO,
    fontWeight: 600,
    color: active ? "#fff" : "#444",
    background: active ? BLUE.ink : "#fff",
    border: `1px solid ${active ? BLUE.ink : "rgba(0,0,0,0.12)"}`,
    borderRadius: 6,
    cursor: "pointer",
    letterSpacing: "0.02em",
  };
}

function PhaseTrack({
  t,
  totalSeconds,
  buildSeconds,
  flipAt,
  drainEnd,
  downStart,
  downEnd,
}: {
  t: number;
  totalSeconds: number;
  buildSeconds: number;
  flipAt: number;
  drainEnd: number;
  downStart: number;
  downEnd: number;
}) {
  const pct = (n: number) => `${(n / totalSeconds) * 100}%`;
  return (
    <div
      style={{
        position: "relative",
        height: 22,
        borderRadius: 4,
        background: "rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Build window (amber) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: pct(buildSeconds),
          top: 0,
          bottom: 0,
          background: AMBER.bg,
          borderRight: `1px dashed ${AMBER.ring}`,
        }}
        title="docker build"
      />
      {/* Single-container down (red) */}
      <div
        style={{
          position: "absolute",
          left: pct(downStart),
          width: pct(downEnd - downStart),
          top: 0,
          bottom: 0,
          background: RED.bg,
          borderTop: `2px solid ${RED.ink}`,
        }}
        title="single-container 502 window"
      />
      {/* Flip moment (green tick) */}
      <div
        style={{
          position: "absolute",
          left: pct(flipAt),
          top: 0,
          bottom: 0,
          width: 2,
          background: GREEN.ink,
        }}
        title="nginx -s reload"
      />
      {/* Drain region (cyan) */}
      <div
        style={{
          position: "absolute",
          left: pct(flipAt),
          width: pct(drainEnd - flipAt),
          top: 0,
          bottom: 0,
          background: CYAN.bg,
          borderTop: `2px solid ${CYAN.ring}`,
        }}
        title="blue draining"
      />
      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: pct(t),
          top: -3,
          bottom: -3,
          width: 2,
          background: "#000",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
        }}
      />
    </div>
  );
}

function Lane({
  title,
  accentInk,
  healthy,
  statusLabel,
  downtimeSeconds,
  transition,
  last,
  children,
}: {
  title: string;
  accentInk: string;
  healthy: boolean;
  statusLabel: string;
  downtimeSeconds: number;
  transition: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "20px 20px 22px",
        borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontFamily: FONT_MONO,
            color: "#000",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 11,
              fontFamily: FONT_MONO,
              padding: "3px 9px",
              borderRadius: 999,
              background: healthy ? GREEN.bg : RED.bg,
              color: accentInk,
              border: `1px solid ${healthy ? GREEN.ring : RED.ring}`,
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition,
            }}
          >
            {statusLabel}
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: FONT_MONO,
              color: downtimeSeconds > 0 ? RED.ink : "#888",
            }}
          >
            downtime: <strong>{downtimeSeconds.toFixed(1)}s</strong>
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Nginx({ pointingActive }: { pointingActive: boolean }) {
  return (
    <div
      style={{
        width: 92,
        padding: "12px 10px",
        border: `1px solid ${pointingActive ? CYAN.ring : "rgba(0,0,0,0.12)"}`,
        borderRadius: 8,
        background: CYAN.bg,
        textAlign: "center",
        fontFamily: FONT_MONO,
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: 11, color: CYAN.ink, fontWeight: 600 }}>nginx</div>
      <div style={{ fontSize: 9, color: "#888", marginTop: 4, letterSpacing: "0.04em" }}>
        :443
      </div>
    </div>
  );
}

function Arrow({
  active,
  color,
  transition,
  dimmedWhen,
  label,
  offsetY = 0,
}: {
  active: boolean;
  color: string;
  transition: string;
  dimmedWhen?: boolean;
  label?: string;
  offsetY?: number;
}) {
  const opacity = dimmedWhen ? 0.18 : active ? 1 : 0.3;
  return (
    <div
      style={{
        position: "relative",
        width: 60,
        height: 24,
        flexShrink: 0,
        opacity,
        transition,
        transform: `translateY(${offsetY * 0.3}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 8,
          height: 2,
          background: color,
          transform: "translateY(-50%)",
          transition,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderLeft: `8px solid ${color}`,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          transition,
        }}
      />
      {label && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 9,
            fontFamily: FONT_MONO,
            color,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

type ContainerState = "live" | "warming" | "stopped" | "draining" | "idle";

function Container({
  label,
  version,
  state,
  subline,
  transition,
  tint,
}: {
  label: string;
  version: string;
  state: ContainerState;
  subline: string;
  transition: string;
  tint?: { ink: string; bg: string; ring: string };
}) {
  const palette =
    state === "live"
      ? tint ?? GREEN
      : state === "warming"
        ? AMBER
        : state === "draining"
          ? CYAN
          : state === "idle"
            ? GREY
            : RED;
  const isPulsing = state === "warming" || state === "draining";
  return (
    <div
      style={{
        minWidth: 180,
        padding: "12px 14px",
        border: `1px solid ${palette.ring}`,
        borderRadius: 8,
        background: palette.bg,
        fontFamily: FONT_MONO,
        position: "relative",
        flexShrink: 0,
        transition,
        boxShadow:
          state === "live"
            ? `0 0 0 3px ${palette.bg}`
            : state === "stopped"
              ? "none"
              : "none",
        opacity: state === "stopped" || state === "idle" ? 0.65 : 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 12, color: "#000", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 10, color: palette.ink, fontWeight: 600 }}>{version}</span>
      </div>
      <div
        style={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: palette.ink,
            display: "inline-block",
            animation: isPulsing ? "deploy-sim-pulse 1.2s ease-in-out infinite" : "none",
          }}
        />
        <span
          style={{
            fontSize: 10,
            color: palette.ink,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {state}
        </span>
      </div>
      <div style={{ fontSize: 10, color: "#888", marginTop: 6, letterSpacing: "0.02em" }}>
        {subline}
      </div>
      <style>{`
        @keyframes deploy-sim-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.45; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

function phaseLabel(
  t: number,
  buildSeconds: number,
  flipAt: number,
  drainEnd: number,
  totalSeconds: number,
) {
  if (t === 0) return "idle";
  if (t < buildSeconds) return "docker build";
  if (t < flipAt) return "green warming · health probe";
  if (t < drainEnd) return "flipped · blue draining";
  if (t < totalSeconds) return "green is live";
  return "complete";
}

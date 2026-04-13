"use client";

import { useRef, useEffect, useState, useCallback } from "react";

// ─── math ────────────────────────────────────────────────────────────────────

interface Pt { x: number; y: number }

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpPt(a: Pt, b: Pt, t: number): Pt {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

function quadratic(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  return lerpPt(lerpPt(p0, p1, t), lerpPt(p1, p2, t), t);
}

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const a = lerpPt(p0, p1, t);
  const b = lerpPt(p1, p2, t);
  const c = lerpPt(p2, p3, t);
  return lerpPt(lerpPt(a, b, t), lerpPt(b, c, t), t);
}

// De Casteljau intermediate points for visualisation
function deCasteljauLevels(pts: Pt[], t: number): Pt[][] {
  const levels: Pt[][] = [pts];
  let cur = pts;
  while (cur.length > 1) {
    cur = cur.slice(0, -1).map((p, i) => lerpPt(p, cur[i + 1], t));
    levels.push(cur);
  }
  return levels;
}

// ─── constants ───────────────────────────────────────────────────────────────

const POINT_R = 7;
const ACCENT = "#0070f3";
const VIOLET = "#7928ca";
const GREEN  = "#16a34a";
const AMBER  = "#d97706";
const CTRL_COL = "#ff4444";

const LEVEL_COLORS = [
  "rgba(0,112,243,0.6)",
  "rgba(121,40,202,0.7)",
  "rgba(22,163,74,0.8)",
];

// ─── component ───────────────────────────────────────────────────────────────

interface BezierPlaygroundProps {
  title?: string;
}

export function BezierPlayground({ title = "Drag the control points" }: BezierPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"quadratic" | "cubic">("cubic");
  const [tVal, setTVal] = useState(0.5);
  const [showCasteljau, setShowCasteljau] = useState(true);
  const [size, setSize] = useState({ w: 560, h: 340 });

  // control points — stored as fractions of canvas size so they scale
  const [pts, setPts] = useState<Pt[]>([
    { x: 0.12, y: 0.70 },
    { x: 0.30, y: 0.15 },
    { x: 0.70, y: 0.85 },
    { x: 0.88, y: 0.30 },
  ]);

  const dragging = useRef<number | null>(null);

  // ── resize observer ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      const w = Math.floor(e.contentRect.width);
      if (w > 0) setSize({ w, h: Math.round(w * 0.6) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── pixel ↔ fraction ──────────────────────────────────────────────────────
  const toPixel = useCallback(
    (p: Pt) => ({ x: p.x * size.w, y: p.y * size.h }),
    [size]
  );
  const toFrac = useCallback(
    (px: number, py: number) => ({
      x: Math.max(0.02, Math.min(0.98, px / size.w)),
      y: Math.max(0.02, Math.min(0.98, py / size.h)),
    }),
    [size]
  );

  // ── hit test ────────────────────────────────────────────────────────────────
  const hitIndex = useCallback(
    (ex: number, ey: number) => {
      const activePts = mode === "quadratic" ? pts.slice(0, 3) : pts;
      return activePts.findIndex((p) => {
        const px = toPixel(p);
        return Math.hypot(ex - px.x, ey - px.y) < POINT_R + 5;
      });
    },
    [pts, toPixel, mode]
  );

  // ── pointer handlers ────────────────────────────────────────────────────────
  const getCanvasXY = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const { x, y } = getCanvasXY(e);
    const idx = hitIndex(x, y);
    if (idx !== -1) {
      dragging.current = idx;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current === null) return;
    const { x, y } = getCanvasXY(e);
    const frac = toFrac(x, y);
    setPts((prev) => prev.map((p, i) => (i === dragging.current ? frac : p)));
  };

  const onPointerUp = () => { dragging.current = null; };

  // ── draw ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = size;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const activePts = mode === "quadratic" ? pts.slice(0, 3) : pts;
    const px = activePts.map(toPixel);
    const t = tVal;

    // ── draw curve ──────────────────────────────────────────────────────────
    ctx.beginPath();
    ctx.moveTo(px[0].x, px[0].y);
    const steps = 120;
    for (let i = 1; i <= steps; i++) {
      const ti = i / steps;
      const pt =
        mode === "quadratic"
          ? quadratic(px[0], px[1], px[2], ti)
          : cubic(px[0], px[1], px[2], px[3], ti);
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // ── de Casteljau construction ─────────────────────────────────────────
    if (showCasteljau) {
      const levels = deCasteljauLevels(px, t);
      levels.forEach((level, li) => {
        if (li === 0) return; // skip source points — drawn separately
        const col = LEVEL_COLORS[Math.min(li - 1, LEVEL_COLORS.length - 1)];

        // connecting lines
        if (level.length > 1) {
          ctx.beginPath();
          ctx.moveTo(level[0].x, level[0].y);
          level.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // dots
        level.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, li === levels.length - 1 ? 5 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = li === levels.length - 1 ? GREEN : col;
          ctx.fill();
        });
      });
    }

    // ── control handles ──────────────────────────────────────────────────
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px[0].x, px[0].y);
    ctx.lineTo(px[1].x, px[1].y);
    ctx.stroke();
    if (mode === "cubic") {
      ctx.beginPath();
      ctx.moveTo(px[3].x, px[3].y);
      ctx.lineTo(px[2].x, px[2].y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // ── point on curve at t (if no casteljau) ─────────────────────────────
    if (!showCasteljau) {
      const onCurve =
        mode === "quadratic"
          ? quadratic(px[0], px[1], px[2], t)
          : cubic(px[0], px[1], px[2], px[3], t);
      ctx.beginPath();
      ctx.arc(onCurve.x, onCurve.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = GREEN;
      ctx.fill();
    }

    // ── control point dots ───────────────────────────────────────────────
    const labels = mode === "quadratic"
      ? ["P0", "P1", "P2"]
      : ["P0", "P1", "P2", "P3"];

    px.slice(0, mode === "quadratic" ? 3 : 4).forEach((p, i) => {
      const isEndpoint = i === 0 || i === (mode === "quadratic" ? 2 : 3);
      ctx.beginPath();
      ctx.arc(p.x, p.y, POINT_R, 0, Math.PI * 2);
      ctx.fillStyle = isEndpoint ? "#000" : CTRL_COL;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // label
      const labelX = p.x + (p.x < w * 0.1 ? 14 : p.x > w * 0.9 ? -24 : 14);
      const labelY = p.y + (p.y < h * 0.1 ? 18 : -12);
      ctx.fillStyle = isEndpoint ? "#000" : CTRL_COL;
      ctx.font = `600 11px var(--font-geist-mono, monospace)`;
      ctx.fillText(labels[i], labelX, labelY);
    });
  }, [pts, mode, tVal, showCasteljau, size, toPixel]);

  // ── t-label ──────────────────────────────────────────────────────────────────
  const tLabel = tVal.toFixed(2);

  return (
    <div
      ref={containerRef}
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        margin: "32px 0",
        background: "#fff",
      }}
    >
      {/* toolbar */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "var(--font-geist-mono), monospace",
            color: ACCENT,
            fontWeight: 700,
            letterSpacing: "0.08em",
            border: `1px solid ${ACCENT}`,
            borderRadius: 4,
            padding: "2px 6px",
            flexShrink: 0,
          }}
        >
          INTERACTIVE
        </span>

        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#000",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            flex: 1,
            minWidth: 0,
          }}
        >
          {title}
        </span>

        {/* mode toggle */}
        {(["quadratic", "cubic"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${mode === m ? ACCENT : "rgba(0,0,0,0.12)"}`,
              background: mode === m ? "rgba(0,112,243,0.08)" : "transparent",
              color: mode === m ? ACCENT : "#666",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--font-geist-mono), monospace",
              cursor: "pointer",
            }}
          >
            {m}
          </button>
        ))}

        {/* casteljau toggle */}
        <button
          onClick={() => setShowCasteljau((v) => !v)}
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            border: `1px solid ${showCasteljau ? VIOLET : "rgba(0,0,0,0.12)"}`,
            background: showCasteljau ? "rgba(121,40,202,0.08)" : "transparent",
            color: showCasteljau ? VIOLET : "#666",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "var(--font-geist-mono), monospace",
            cursor: "pointer",
          }}
        >
          de Casteljau
        </button>
      </div>

      {/* canvas */}
      <div style={{ background: "#fafafa", cursor: "crosshair" }}>
        <canvas
          ref={canvasRef}
          style={{ display: "block", touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>

      {/* t slider */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "#fff",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#888",
            fontFamily: "var(--font-geist-mono), monospace",
            flexShrink: 0,
          }}
        >
          t =
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={tVal}
          onChange={(e) => setTVal(Number(e.target.value))}
          style={{ flex: 1, accentColor: VIOLET, cursor: "pointer" }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: VIOLET,
            fontFamily: "var(--font-geist-mono), monospace",
            minWidth: 36,
            textAlign: "right",
          }}
        >
          {tLabel}
        </span>

        <span
          style={{
            fontSize: 11,
            color: "#aaa",
            fontFamily: "var(--font-geist-mono), monospace",
            marginLeft: 8,
          }}
        >
          — drag points to reshape
        </span>
      </div>
    </div>
  );
}

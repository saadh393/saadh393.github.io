"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Pt { x: number; y: number }

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpPt(a: Pt, b: Pt, t: number): Pt {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}
function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const a = lerpPt(p0, p1, t);
  const b = lerpPt(p1, p2, t);
  const c = lerpPt(p2, p3, t);
  return lerpPt(lerpPt(a, b, t), lerpPt(b, c, t), t);
}

// Arc-length table
function buildArcTable(p0: Pt, p1: Pt, p2: Pt, p3: Pt, prec = 400) {
  const table: { len: number; t: number }[] = [{ len: 0, t: 0 }];
  let total = 0;
  let prev = p0;
  for (let i = 1; i <= prec; i++) {
    const t = i / prec;
    const cur = cubic(p0, p1, p2, p3, t);
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    total += Math.sqrt(dx * dx + dy * dy);
    table.push({ len: total, t });
    prev = cur;
  }
  return { table, total };
}

function tAtArc(table: { len: number; t: number }[], total: number, pct: number) {
  const target = pct * total;
  for (let i = 1; i < table.length; i++) {
    if (table[i].len >= target) {
      const prev = table[i - 1];
      const curr = table[i];
      const frac = (target - prev.len) / (curr.len - prev.len);
      return prev.t + frac * (curr.t - prev.t);
    }
  }
  return 1;
}

const ACCENT = "#0070f3";
const GREEN  = "#16a34a";
const AMBER  = "#d97706";

const STEP_OPTIONS = [6, 12, 25, 60, 120];

type Mode = "sampling" | "arclength";

export function BezierSampling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [steps, setSteps] = useState(12);
  const [mode, setMode] = useState<Mode>("sampling");
  const [animT, setAnimT] = useState(0);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const [size, setSize] = useState({ w: 560, h: 300 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width);
      if (w > 0) setSize({ w, h: Math.round(w * 0.54) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // fixed control points as fractions
  const fracPts = [
    { x: 0.08, y: 0.75 },
    { x: 0.25, y: 0.10 },
    { x: 0.72, y: 0.92 },
    { x: 0.92, y: 0.22 },
  ];

  const toPixel = useCallback(
    (p: Pt): Pt => ({ x: p.x * size.w, y: p.y * size.h }),
    [size]
  );

  const px = fracPts.map(toPixel);
  const [arcData] = useState(() => buildArcTable(
    { x: 0.08, y: 0.75 }, { x: 0.25, y: 0.10 },
    { x: 0.72, y: 0.92 }, { x: 0.92, y: 0.22 },
    400
  ));

  // animation loop
  useEffect(() => {
    const duration = 2800;
    const loop = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = (elapsed % duration) / duration;
      setAnimT(pct);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // draw
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

    if (mode === "sampling") {
      // Draw full smooth curve (faint reference)
      ctx.beginPath();
      ctx.moveTo(px[0].x, px[0].y);
      for (let i = 1; i <= 120; i++) {
        const p = cubic(px[0], px[1], px[2], px[3], i / 120);
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(0,112,243,0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sampled polyline
      const samplePts: Pt[] = [];
      for (let i = 0; i <= steps; i++) {
        samplePts.push(cubic(px[0], px[1], px[2], px[3], i / steps));
      }

      ctx.beginPath();
      ctx.moveTo(samplePts[0].x, samplePts[0].y);
      samplePts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sample point dots
      samplePts.forEach((p, i) => {
        if (i === 0 || i === steps) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = steps <= 15 ? AMBER : "rgba(0,112,243,0.4)";
        ctx.fill();
      });

      // Animated point moving along with uniform t
      const curveT = animT;
      const curvePoint = cubic(px[0], px[1], px[2], px[3], curveT);
      ctx.beginPath();
      ctx.arc(curvePoint.x, curvePoint.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = GREEN;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // label
      ctx.font = `500 11px var(--font-geist-mono, monospace)`;
      ctx.fillStyle = GREEN;
      ctx.fillText(`t = ${curveT.toFixed(2)}`, curvePoint.x + 10, curvePoint.y - 8);

    } else {
      // Arc-length mode — show both dots: uniform-t (amber) and arc-length (green)
      // Full curve
      ctx.beginPath();
      ctx.moveTo(px[0].x, px[0].y);
      for (let i = 1; i <= 120; i++) {
        const p = cubic(px[0], px[1], px[2], px[3], i / 120);
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // uniform-t point
      const uniformT = animT;
      const uniformPt = cubic(px[0], px[1], px[2], px[3], uniformT);

      // arc-length point
      const arcT = tAtArc(arcData.table, arcData.total, animT);
      const arcPt = cubic(px[0], px[1], px[2], px[3], arcT);

      // draw trail for arc-length
      ctx.beginPath();
      ctx.moveTo(px[0].x, px[0].y);
      for (let i = 1; i <= 60; i++) {
        const t2 = tAtArc(arcData.table, arcData.total, (animT * i) / 60);
        const p = cubic(px[0], px[1], px[2], px[3], t2);
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(22,163,74,0.35)";
      ctx.lineWidth = 5;
      ctx.stroke();

      // uniform dot
      ctx.beginPath();
      ctx.arc(uniformPt.x, uniformPt.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = AMBER;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // arc-length dot
      ctx.beginPath();
      ctx.arc(arcPt.x, arcPt.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = GREEN;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // labels
      ctx.font = `500 11px var(--font-geist-mono, monospace)`;
      ctx.fillStyle = AMBER;
      ctx.fillText("uniform t", uniformPt.x + 10, uniformPt.y - 8);
      ctx.fillStyle = GREEN;
      ctx.fillText("arc-length", arcPt.x + 10, arcPt.y + 18);
    }
  }, [px, steps, mode, animT, arcData, size]);

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
          gap: 10,
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

        {/* mode tabs */}
        {(["sampling", "arclength"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "4px 12px",
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
            {m === "sampling" ? "Sampling steps" : "Arc-length vs uniform t"}
          </button>
        ))}
      </div>

      {/* canvas */}
      <div style={{ background: "#fafafa" }}>
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </div>

      {/* footer controls */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {mode === "sampling" ? (
          <>
            <span style={{ fontSize: 12, color: "#888", fontFamily: "var(--font-geist-mono), monospace" }}>
              steps
            </span>
            {STEP_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setSteps(s)}
                style={{
                  padding: "3px 10px",
                  borderRadius: 5,
                  border: `1px solid ${steps === s ? ACCENT : "rgba(0,0,0,0.12)"}`,
                  background: steps === s ? "rgba(0,112,243,0.08)" : "transparent",
                  color: steps === s ? ACCENT : "#666",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "var(--font-geist-mono), monospace",
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
            <span style={{ fontSize: 11, color: "#aaa", fontFamily: "var(--font-geist-mono), monospace", marginLeft: 4 }}>
              — {steps <= 12 ? "see the segments" : steps <= 25 ? "getting smoother" : "smooth enough"}
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontFamily: "var(--font-geist-mono), monospace",
                color: "#555",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: AMBER,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              uniform t — jumpy on bends
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontFamily: "var(--font-geist-mono), monospace",
                color: "#555",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: GREEN,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              arc-length — constant speed
            </span>
          </>
        )}
      </div>
    </div>
  );
}

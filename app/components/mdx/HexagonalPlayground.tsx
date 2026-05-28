"use client";

import { useMemo, useState } from "react";
import { paletteAt } from "./palette";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";

interface Adapter {
  id: string;
  label: string;
  note?: string;
}

interface PortDef {
  id: string;
  label: string;
  method: string;
  adapters: Adapter[];
}

interface HexagonalPlaygroundProps {
  title?: string;
  ports: string | PortDef[];
}

function safeParse<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

export function HexagonalPlayground({
  title = "Hexagonal Playground",
  ports: portsRaw,
}: HexagonalPlaygroundProps) {
  const ports: PortDef[] = useMemo(
    () =>
      typeof portsRaw === "string"
        ? safeParse(portsRaw, [] as PortDef[])
        : portsRaw ?? [],
    [portsRaw],
  );

  const [active, setActive] = useState<Record<string, string>>(() =>
    Object.fromEntries(ports.map((p) => [p.id, p.adapters[0]?.id ?? ""])),
  );

  const [pulsing, setPulsing] = useState<string | null>(null);

  if (!ports.length) {
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
        HexagonalPlayground: pass ports as a JSON string.
      </div>
    );
  }

  const handleSwap = (portId: string, adapterId: string) => {
    setActive((prev) => ({ ...prev, [portId]: adapterId }));
    setPulsing(portId);
    window.setTimeout(() => setPulsing(null), 650);
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 1fr) minmax(260px, 1fr)",
        }}
      >
        <HexagonCanvas ports={ports} active={active} pulsing={pulsing} />
        <Controls ports={ports} active={active} onSwap={handleSwap} />
      </div>
      <RegistryFooter ports={ports} active={active} />
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
        click an adapter to wire it
      </span>
    </div>
  );
}

function HexagonCanvas({
  ports,
  active,
  pulsing,
}: {
  ports: PortDef[];
  active: Record<string, string>;
  pulsing: string | null;
}) {
  const w = 380;
  const h = 320;
  const cx = w / 2;
  const cy = h / 2;
  const r = 92;

  const hexPoints = Array.from({ length: 6 }).map((_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  });
  const hexPath = hexPoints.map(([x, y]) => `${x},${y}`).join(" ");

  const portPositions = ports.slice(0, 6).map((_, i) => {
    const a = hexPoints[i];
    const b = hexPoints[(i + 1) % 6];
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as const;
  });

  return (
    <div
      style={{
        position: "relative",
        padding: 16,
        background: "linear-gradient(180deg, #fdfdfd 0%, #f7f7f9 100%)",
        borderRight: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <polygon
          points={hexPath}
          fill="#eef5ff"
          stroke="#0070f3"
          strokeWidth="1.5"
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontFamily={FONT_SANS}
          fontSize="13"
          fontWeight="600"
          fill="#0a0a0a"
        >
          Business Logic
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fontFamily={FONT_MONO}
          fontSize="10"
          fill="#666"
        >
          imports from ports/ only
        </text>

        {ports.slice(0, 6).map((p, i) => {
          const [px, py] = portPositions[i];
          const color = paletteAt(i);
          const pulse = pulsing === p.id;
          const wired = p.adapters.find((a) => a.id === active[p.id]);

          const dx = px - cx;
          const dy = py - cy;
          const len = Math.hypot(dx, dy) || 1;
          const lx = px + (dx / len) * 58;
          const ly = py + (dy / len) * 58;

          return (
            <g key={p.id}>
              <line
                x1={px}
                y1={py}
                x2={lx}
                y2={ly}
                stroke={color.ring}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={px}
                cy={py}
                r={pulse ? 10 : 6}
                fill={color.ink}
                stroke="#fff"
                strokeWidth="2"
                style={{ transition: "r 0.3s ease" }}
              />
              <text
                x={lx}
                y={ly - 2}
                textAnchor="middle"
                fontFamily={FONT_MONO}
                fontSize="9.5"
                fill="#666"
                letterSpacing="0.05em"
              >
                {p.label.toUpperCase()}
              </text>
              <text
                x={lx}
                y={ly + 12}
                textAnchor="middle"
                fontFamily={FONT_MONO}
                fontSize="11"
                fontWeight="600"
                fill={color.ink}
              >
                {wired?.label ?? "—"}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Controls({
  ports,
  active,
  onSwap,
}: {
  ports: PortDef[];
  active: Record<string, string>;
  onSwap: (portId: string, adapterId: string) => void;
}) {
  return (
    <div
      style={{
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: "#fff",
      }}
    >
      {ports.map((p, i) => {
        const color = paletteAt(i);
        return (
          <div key={p.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: color.ink,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: FONT_MONO,
                  fontWeight: 600,
                  color: "#222",
                  letterSpacing: "0.02em",
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  fontFamily: FONT_MONO,
                  color: "#aaa",
                  marginLeft: 4,
                }}
              >
                {p.method}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.adapters.map((a) => {
                const isActive = a.id === active[p.id];
                return (
                  <button
                    key={a.id}
                    onClick={() => onSwap(p.id, a.id)}
                    title={a.note}
                    style={{
                      padding: "6px 11px",
                      fontSize: 12,
                      fontFamily: FONT_MONO,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? color.ink : "#666",
                      background: isActive ? color.bg : "#fafafa",
                      border: `1px solid ${isActive ? color.ring : "rgba(0,0,0,0.1)"}`,
                      borderRadius: 6,
                      cursor: "pointer",
                      letterSpacing: "-0.005em",
                      transition:
                        "background 0.15s, border-color 0.15s, color 0.15s",
                    }}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RegistryFooter({
  ports,
  active,
}: {
  ports: PortDef[];
  active: Record<string, string>;
}) {
  const pad = Math.max(...ports.map((p) => p.id.length));
  return (
    <div
      style={{
        padding: "14px 18px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        background: "#0a0a0a",
        color: "#e5e7eb",
        fontFamily: FONT_MONO,
        fontSize: 12.5,
        lineHeight: 1.7,
      }}
    >
      <div style={{ color: "#6b7280" }}>{"// registry.ts — runtime wiring"}</div>
      <div>
        <span style={{ color: "#c084fc" }}>export const</span>{" "}
        <span style={{ color: "#e5e7eb" }}>registry</span>{" "}
        <span style={{ color: "#9ca3af" }}>=</span> {"{"}
      </div>
      {ports.map((p) => {
        const wired = p.adapters.find((a) => a.id === active[p.id]);
        return (
          <div key={p.id}>
            {"  "}
            <span style={{ color: "#93c5fd" }}>{p.id.padEnd(pad)}</span>
            <span style={{ color: "#9ca3af" }}>: </span>
            <span style={{ color: "#86efac" }}>
              {wired ? `"${wired.label}"` : `"—"`}
            </span>
            <span style={{ color: "#9ca3af" }}>,</span>
          </div>
        );
      })}
      <div>{"};"}</div>
    </div>
  );
}

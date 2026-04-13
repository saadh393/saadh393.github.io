"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

/* ─── helpers ─── */

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function makeResponsive(svgString: string): string {
  return svgString
    .replace(/\s+width="[^"]*"/, "")
    .replace(/\s+height="[^"]*"/, "")
    .replace(/<svg /, '<svg style="width:100%;height:auto;display:block;" ');
}

/* ─── shared styles ─── */

const toolbarBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 5,
  border: "1px solid rgba(0,0,0,0.1)",
  background: "#fff",
  fontSize: 14,
  lineHeight: 1,
  color: "#555",
  cursor: "pointer",
  fontFamily: "var(--font-geist-mono), monospace",
  padding: 0,
  transition: "background 0.12s, border-color 0.12s, color 0.12s",
  userSelect: "none",
};

/* ─── component ─── */

export function Diagram({ children, title }: { children: ReactNode; title?: string }) {
  const id = useId().replace(/:/g, "");
  const svgRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stable ref so drag handlers close over it without stale state
  const dragStartRef = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);

  /* ── render mermaid ── */
  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          primaryColor: "#eef5ff",
          primaryBorderColor: "#0070f3",
          primaryTextColor: "#0a0a0a",
          lineColor: "#94a3b8",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "14px",
          nodeBorder: "1.5px",
          clusterBkg: "#f8fafc",
          edgeLabelBackground: "#fff",
          actorBkg: "#eef5ff",
          actorBorder: "#0070f3",
          actorTextColor: "#0a0a0a",
          actorLineColor: "#cbd5e1",
          signalColor: "#334155",
          signalTextColor: "#334155",
          labelBoxBkgColor: "#fff",
          labelBoxBorderColor: "rgba(0,0,0,0.08)",
          labelTextColor: "#334155",
          loopTextColor: "#334155",
          noteBorderColor: "rgba(0,0,0,0.08)",
          noteBkgColor: "#fffbeb",
          noteTextColor: "#92400e",
          activationBorderColor: "#0070f3",
          activationBkgColor: "#eef5ff",
          sequenceNumberColor: "#fff",
        },
      });

      const clean = extractText(children).trim();
      if (!clean || !svgRef.current || cancelled) return;

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, clean);
        if (svgRef.current && !cancelled) {
          svgRef.current.innerHTML = makeResponsive(svg);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    }

    render();
    return () => { cancelled = true; };
  }, [children, id]);

  /* ── drag-to-pan ── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only drag on left-click, and not if clicking a button inside
    if (e.button !== 0) return;
    e.preventDefault();

    dragStartRef.current = { mx: e.clientX, my: e.clientY, px: 0, py: 0 };
    // Capture current pan from state at drag-start time
    setPan((current) => {
      dragStartRef.current!.px = current.x;
      dragStartRef.current!.py = current.y;
      return current;
    });

    setIsDragging(true);

    function onMove(ev: MouseEvent) {
      if (!dragStartRef.current) return;
      const dx = ev.clientX - dragStartRef.current.mx;
      const dy = ev.clientY - dragStartRef.current.my;
      setPan({ x: dragStartRef.current.px + dx, y: dragStartRef.current.py + dy });
    }

    function onUp() {
      dragStartRef.current = null;
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  /* ── zoom helpers ── */
  const zoomOut = useCallback(() => setZoom((z) => Math.max(0.4, +(z - 0.15).toFixed(2))), []);
  const zoomIn  = useCallback(() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2))), []);
  const resetView = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  const zoomPct = Math.round(zoom * 100);
  const isDefaultView = zoom === 1 && pan.x === 0 && pan.y === 0;

  return (
    <div
      style={{
        margin: "32px 0",
        border: "1px solid rgba(0,0,0,0.09)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
      }}
    >
      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 14px",
          background: "#f5f5f5",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          gap: 12,
        }}
      >
        {/* Left: traffic lights + label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            {(["#ff5f57", "#febc2e", "#28c840"] as const).map((color) => (
              <div
                key={color}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: color,
                  border: "0.5px solid rgba(0,0,0,0.08)",
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#999",
              letterSpacing: "0.03em",
            }}
          >
            {title ?? "diagram"}
          </span>
        </div>

        {/* Right: zoom + reset */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button style={toolbarBtnStyle} onClick={zoomOut} title="Zoom out" aria-label="Zoom out">−</button>
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#999",
              minWidth: 36,
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {zoomPct}%
          </span>
          <button style={toolbarBtnStyle} onClick={zoomIn} title="Zoom in" aria-label="Zoom in">+</button>
          <button
            style={{
              ...toolbarBtnStyle,
              marginLeft: 6,
              fontSize: 10,
              width: "auto",
              padding: "0 8px",
              color: isDefaultView ? "#ccc" : "#555",
              borderColor: isDefaultView ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.1)",
            }}
            onClick={resetView}
            title="Reset view"
            aria-label="Reset view"
          >
            reset
          </button>
        </div>
      </div>

      {/* ── Diagram body ── */}
      <div
        ref={bodyRef}
        onMouseDown={handleMouseDown}
        style={{
          padding: "32px 28px",
          background: "linear-gradient(180deg, #fdfdfd 0%, #f9f9f9 100%)",
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {error ? (
          <pre
            style={{
              fontSize: 12,
              color: "#c0392b",
              background: "#fdf2f2",
              border: "1px solid #f5c6cb",
              borderRadius: 6,
              padding: 12,
              margin: 0,
              cursor: "auto",
            }}
          >
            {error}
          </pre>
        ) : (
          <div
            ref={svgRef}
            style={{
              width: "100%",
              minHeight: 40,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center top",
              transition: isDragging ? "none" : "transform 0.15s ease",
              willChange: "transform",
            }}
          />
        )}
      </div>
    </div>
  );
}

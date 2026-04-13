"use client";

import { useEffect, useId, useRef } from "react";

export function Diagram({ children }: { children: string }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          primaryColor: "#f0f7ff",
          primaryBorderColor: "#0070f3",
          primaryTextColor: "#000",
          lineColor: "#999",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "14px",
          nodeBorder: "1px",
          clusterBkg: "#fafafa",
          edgeLabelBackground: "#fff",
        },
      });

      const clean = children.trim();
      if (!clean || !ref.current || cancelled) return;

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, clean);
        if (ref.current && !cancelled) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        if (ref.current && !cancelled) {
          ref.current.innerHTML = `<pre style="font-size:12px;color:#d00;padding:12px">${String(e)}</pre>`;
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [children, id]);

  return (
    <div
      style={{
        margin: "32px 0",
        padding: "24px",
        background: "#fafafa",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 10,
        overflowX: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div ref={ref} style={{ maxWidth: "100%", minHeight: 40 }} />
    </div>
  );
}

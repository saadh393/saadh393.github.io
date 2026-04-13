"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

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
  // Remove fixed width/height attrs, ensure viewBox is preserved
  return svgString
    .replace(/\s+width="[^"]*"/, "")
    .replace(/\s+height="[^"]*"/, "")
    .replace(/<svg /, '<svg style="width:100%;height:auto;display:block;" ');
}

export function Diagram({ children }: { children: ReactNode }) {
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
          lineColor: "#888",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "14px",
          nodeBorder: "1px",
          clusterBkg: "#fafafa",
          edgeLabelBackground: "#fff",
          actorBkg: "#f0f7ff",
          actorBorder: "#0070f3",
          actorTextColor: "#000",
          actorLineColor: "#999",
          signalColor: "#333",
          signalTextColor: "#333",
          labelBoxBkgColor: "#fff",
          labelBoxBorderColor: "rgba(0,0,0,0.1)",
          labelTextColor: "#333",
          loopTextColor: "#333",
          noteBorderColor: "rgba(0,0,0,0.1)",
          noteBkgColor: "#fffbeb",
          noteTextColor: "#333",
          activationBorderColor: "#0070f3",
          activationBkgColor: "#f0f7ff",
          sequenceNumberColor: "#fff",
        },
      });

      const clean = extractText(children).trim();
      if (!clean || !ref.current || cancelled) return;

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, clean);
        if (ref.current && !cancelled) {
          ref.current.innerHTML = makeResponsive(svg);
        }
      } catch (e) {
        if (ref.current && !cancelled) {
          ref.current.innerHTML = `<pre style="font-size:12px;color:#d00;padding:12px">${String(e)}</pre>`;
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [children, id]);

  return (
    <div
      style={{
        margin: "32px 0",
        padding: "28px 24px",
        background: "#fafafa",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 10,
        overflowX: "auto",
      }}
    >
      <div ref={ref} style={{ width: "100%", minHeight: 40 }} />
    </div>
  );
}

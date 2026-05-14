"use client";

import React, { useState, useRef, useEffect } from "react";

/* Usage in MDX:
   <Tooltip term="KV cache">
     Cached attention key/value tensors so the model skips re-computing the prefix.
   </Tooltip>
*/

interface TooltipProps {
  term: string;
  children: React.ReactNode;
}

export function Tooltip({ term, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span
      ref={wrapRef}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          appearance: "none",
          background: "rgba(0,112,243,0.07)",
          border: "none",
          borderBottom: "1px dashed rgba(0,112,243,0.55)",
          color: "#0070f3",
          padding: "0 2px",
          font: "inherit",
          cursor: "help",
          borderRadius: 2,
        }}
      >
        {term}
      </button>
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            width: "min(280px, 80vw)",
            background: "#111",
            color: "#f5f5f5",
            fontSize: 12.5,
            lineHeight: 1.55,
            padding: "10px 12px",
            borderRadius: 6,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            letterSpacing: "-0.005em",
            textAlign: "left",
            pointerEvents: "none",
          }}
        >
          {children}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #111",
            }}
          />
        </span>
      )}
    </span>
  );
}

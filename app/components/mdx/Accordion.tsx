"use client";

import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  children: React.ReactNode;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Trigger */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          // Lenis caches scroll height — force recalc after DOM change
          requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          gap: 12,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: open ? "#0070f3" : "#111",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1.4,
            transition: "color 0.15s",
            flex: 1,
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: open ? "#0070f3" : "#bbb",
            fontSize: 16,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease, color 0.15s",
            display: "inline-block",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      {/* Content */}
      {open && (
        <div
          style={{
            padding: "0 20px 20px 20px",
            fontSize: 14,
            lineHeight: 1.7,
            color: "#444",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children }: AccordionProps) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "28px 0",
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

const preBaseStyle: React.CSSProperties = {
  borderRadius: 10,
  overflow: "auto",
  fontSize: 13,
  lineHeight: 1.75,
  border: "1px solid rgba(0,0,0,0.08)",
  margin: 0,
};

export function CodeBlock({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently no-op
    }
  }

  return (
    <div style={{ position: "relative", margin: "28px 0" }}>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "3px 10px",
          borderRadius: 5,
          border: `1px solid ${copied ? "rgba(22,163,74,0.25)" : "rgba(0,0,0,0.1)"}`,
          background: copied ? "rgba(22,163,74,0.06)" : "rgba(255,255,255,0.85)",
          color: copied ? "#16a34a" : "#888",
          fontSize: 11,
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.03em",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
          transition: "all 0.15s ease",
          userSelect: "none",
        }}
      >
        {copied ? (
          <>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            copied
          </>
        ) : (
          <>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 8V2a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            copy
          </>
        )}
      </button>

      <pre
        ref={ref}
        className={className}
        style={{ ...preBaseStyle, ...style }}
      >
        {children}
      </pre>
    </div>
  );
}

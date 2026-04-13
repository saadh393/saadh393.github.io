import React from "react";
import { paletteAt } from "./palette";

interface EventProps {
  date: string;
  label: string;
  note?: string;
  _index?: number; // injected by Timeline
}

export function Timeline({ children }: { children: React.ReactNode }) {
  // Inject _index so each Event knows its position and picks a palette color
  const items = React.Children.toArray(children);
  const injected = items.map((child, i) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<EventProps>, { _index: i })
      : child
  );

  return (
    <div
      style={{
        position: "relative",
        margin: "32px 0",
        paddingLeft: 28,
        borderLeft: "2px solid rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {injected}
    </div>
  );
}

export function Event({ date, label, note, _index = 0 }: EventProps) {
  const { ink } = paletteAt(_index);

  return (
    <div style={{ position: "relative", paddingBottom: 24 }}>
      {/* Dot */}
      <div
        style={{
          position: "absolute",
          left: -35,
          top: 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: ink,
          border: "2px solid #fff",
          outline: `2px solid ${ink}`,
        }}
      />
      <div
        style={{
          fontSize: 11,
          fontFamily: "var(--font-geist-mono), monospace",
          color: ink,
          letterSpacing: "0.04em",
          marginBottom: 3,
        }}
      >
        {date}
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "#000",
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      {note && (
        <div style={{ fontSize: 13, color: "#888", marginTop: 3 }}>{note}</div>
      )}
    </div>
  );
}

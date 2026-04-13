export function Timeline({ children }: { children: React.ReactNode }) {
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
      {children}
    </div>
  );
}

export function Event({ date, label, note }: { date: string; label: string; note?: string }) {
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
          background: "#0070f3",
          border: "2px solid #fff",
          outline: "2px solid #0070f3",
        }}
      />
      <div
        style={{
          fontSize: 11,
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#0070f3",
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

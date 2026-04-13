"use client";

import React, { createContext, useContext } from "react";

// ─── Context ────────────────────────────────────────────────────────────────

interface ListCtx {
  ordered: boolean;
  count: number;   // total item count — drives aesthetics
  depth: number;   // nesting depth
}

const ListContext = createContext<ListCtx>({
  ordered: false,
  count: 0,
  depth: 0,
});

// ─── Size scale based on item count ─────────────────────────────────────────

function sizeScale(count: number): "large" | "medium" | "compact" {
  if (count <= 3) return "large";
  if (count <= 7) return "medium";
  return "compact";
}

const SCALE = {
  large:   { fontSize: 16, gap: 12, markerSize: 8,  lineHeight: 1.75 },
  medium:  { fontSize: 15, gap: 8,  markerSize: 6,  lineHeight: 1.7  },
  compact: { fontSize: 14, gap: 5,  markerSize: 5,  lineHeight: 1.6  },
};

// ─── ProseList ───────────────────────────────────────────────────────────────

interface ProseListProps {
  children: React.ReactNode;
  ordered: boolean;
}

export function ProseList({ children, ordered }: ProseListProps) {
  const parent = useContext(ListContext);
  const depth = parent.depth + 1;

  // Count direct <li> children
  const count = React.Children.toArray(children).length;

  const ctx: ListCtx = { ordered, count, depth };
  const scale = sizeScale(count);
  const { gap } = SCALE[scale];

  return (
    <ListContext.Provider value={ctx}>
      {ordered ? (
        <ol
          style={{
            margin: depth === 1 ? "4px 0 18px" : "6px 0 0",
            paddingLeft: depth === 1 ? 0 : 20,
            display: "flex",
            flexDirection: "column",
            gap,
            listStyle: "none",
          }}
        >
          {children}
        </ol>
      ) : (
        <ul
          style={{
            margin: depth === 1 ? "4px 0 18px" : "6px 0 0",
            paddingLeft: depth === 1 ? 0 : 20,
            display: "flex",
            flexDirection: "column",
            gap,
            listStyle: "none",
          }}
        >
          {children}
        </ul>
      )}
    </ListContext.Provider>
  );
}

// ─── ProseListItem ───────────────────────────────────────────────────────────

interface ProseListItemProps {
  children: React.ReactNode;
  // injected by MDX renderer — index is not passed; we use a counter via CSS
  index?: number;
}

export function ProseListItem({ children, index = 0 }: ProseListItemProps) {
  const { ordered, count, depth } = useContext(ListContext);
  const scale = sizeScale(count);
  const { fontSize, markerSize, lineHeight } = SCALE[scale];

  // Ordered: numbered circle. Unordered: dot with depth-aware style.
  const marker = ordered
    ? <OrderedMarker index={index} scale={scale} depth={depth} />
    : <UnorderedMarker count={count} scale={scale} depth={depth} />;

  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize,
        lineHeight,
        color: "#444",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {marker}
      <span style={{ flex: 1, paddingTop: ordered && scale === "large" ? 2 : 1 }}>
        {children}
      </span>
    </li>
  );
}

// ─── Markers ─────────────────────────────────────────────────────────────────

function OrderedMarker({
  index,
  scale,
  depth,
}: {
  index: number;
  scale: "large" | "medium" | "compact";
  depth: number;
}) {
  // Large (≤3 items): filled blue circle with white number
  // Medium (4–7 items): outlined circle with blue number
  // Compact (8+): plain mono number
  // Depth 2+: always compact plain

  if (depth > 1 || scale === "compact") {
    return (
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 13,
          color: "#0070f3",
          fontWeight: 600,
          minWidth: 20,
          paddingTop: 1,
          flexShrink: 0,
          lineHeight: 1,
          marginTop: 3,
        }}
      >
        {index + 1}.
      </span>
    );
  }

  if (scale === "large") {
    return (
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#0070f3",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "var(--font-geist-mono), monospace",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {index + 1}
      </span>
    );
  }

  // medium
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "1.5px solid #0070f3",
        color: "#0070f3",
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "var(--font-geist-mono), monospace",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      {index + 1}
    </span>
  );
}

function UnorderedMarker({
  count,
  scale,
  depth,
}: {
  count: number;
  scale: "large" | "medium" | "compact";
  depth: number;
}) {
  // Depth 2+: hollow square
  if (depth > 1) {
    return (
      <span
        style={{
          width: 5,
          height: 5,
          border: "1.5px solid #bbb",
          borderRadius: 1,
          flexShrink: 0,
          marginTop: 7,
        }}
      />
    );
  }

  // Large (≤3): filled blue diamond
  if (scale === "large") {
    return (
      <span
        style={{
          width: 8,
          height: 8,
          background: "#0070f3",
          borderRadius: 1,
          transform: "rotate(45deg)",
          flexShrink: 0,
          marginTop: 7,
        }}
      />
    );
  }

  // Medium (4–7): solid filled circle, medium gray-blue
  if (scale === "medium") {
    return (
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#0070f3",
          opacity: 0.55,
          flexShrink: 0,
          marginTop: 8,
        }}
      />
    );
  }

  // Compact (8+): small dash
  return (
    <span
      style={{
        width: 10,
        height: 1.5,
        background: "#ccc",
        flexShrink: 0,
        marginTop: 10,
        borderRadius: 9999,
      }}
    />
  );
}

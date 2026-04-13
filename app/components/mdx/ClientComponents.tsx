"use client";

import dynamic from "next/dynamic";

const placeholder = (height: number) =>
  function Placeholder() {
    return (
      <div
        style={{
          height,
          background: "#fafafa",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.07)",
          margin: "32px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#bbb",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          Loading…
        </span>
      </div>
    );
  };

export const DiagramDynamic = dynamic(
  () => import("./Diagram").then((m) => ({ default: m.Diagram })),
  { ssr: false, loading: placeholder(120) }
);

export const FlowMapDynamic = dynamic(
  () => import("./FlowMap").then((m) => ({ default: m.FlowMap })),
  { ssr: false, loading: placeholder(260) }
);

export const StepThroughDynamic = dynamic(
  () => import("./StepThrough").then((m) => ({ default: m.StepThrough })),
  { ssr: false, loading: placeholder(380) }
);

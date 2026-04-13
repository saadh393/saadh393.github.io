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

// ── Existing components ───────────────────────────────────────────────────────

export const FileTreeDynamic = dynamic(
  () => import("./FileTree").then((m) => ({ default: m.FileTree })),
  { ssr: false, loading: placeholder(80) }
);

export const VideoMathDynamic = dynamic(
  () => import("./VideoMath").then((m) => ({ default: m.VideoMath })),
  { ssr: false, loading: placeholder(220) }
);

export const RenditionTableDynamic = dynamic(
  () => import("./RenditionTable").then((m) => ({ default: m.RenditionTable })),
  { ssr: false, loading: placeholder(200) }
);

export const PipelineDynamic = dynamic(
  () => import("./Pipeline").then((m) => ({ default: m.Pipeline })),
  { ssr: false, loading: placeholder(60) }
);

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

// ── New components ────────────────────────────────────────────────────────────

export const TabsDynamic = dynamic(
  () => import("./Tabs").then((m) => ({ default: m.Tabs })),
  { ssr: false, loading: placeholder(80) }
);

export const TabDynamic = dynamic(
  () => import("./Tabs").then((m) => ({ default: m.Tab })),
  { ssr: false, loading: placeholder(0) }
);

export const ComparisonDynamic = dynamic(
  () => import("./Comparison").then((m) => ({ default: m.Comparison })),
  { ssr: false, loading: placeholder(200) }
);

export const AccordionDynamic = dynamic(
  () => import("./Accordion").then((m) => ({ default: m.Accordion })),
  { ssr: false, loading: placeholder(60) }
);

export const AccordionItemDynamic = dynamic(
  () => import("./Accordion").then((m) => ({ default: m.AccordionItem })),
  { ssr: false, loading: placeholder(0) }
);

export const QuizDynamic = dynamic(
  () => import("./Quiz").then((m) => ({ default: m.Quiz })),
  { ssr: false, loading: placeholder(180) }
);

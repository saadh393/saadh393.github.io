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

// Comparison SSRs so multiline string props cross the RSC→client boundary
// via normal React hydration instead of the async ssr:false dynamic handoff.
export { Comparison as ComparisonDynamic } from "./Comparison";

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

export const BezierPlaygroundDynamic = dynamic(
  () => import("./BezierPlayground").then((m) => ({ default: m.BezierPlayground })),
  { ssr: false, loading: placeholder(380) }
);

export const BezierSamplingDynamic = dynamic(
  () => import("./BezierSampling").then((m) => ({ default: m.BezierSampling })),
  { ssr: false, loading: placeholder(340) }
);

export const DeploySimulatorDynamic = dynamic(
  () => import("./DeploySimulator").then((m) => ({ default: m.DeploySimulator })),
  { ssr: false, loading: placeholder(420) }
);

export const DecisionMatrixDynamic = dynamic(
  () => import("./DecisionMatrix").then((m) => ({ default: m.DecisionMatrix })),
  { ssr: false, loading: placeholder(280) }
);

export const HexagonalPlaygroundDynamic = dynamic(
  () => import("./HexagonalPlayground").then((m) => ({ default: m.HexagonalPlayground })),
  { ssr: false, loading: placeholder(420) }
);

export const UserJourneySimulatorDynamic = dynamic(
  () => import("./UserJourneySimulator").then((m) => ({ default: m.UserJourneySimulator })),
  { ssr: false, loading: placeholder(520) }
);

export const CodeEditorDynamic = dynamic(
  () => import("./CodeEditor").then((m) => ({ default: m.CodeEditor })),
  { ssr: false, loading: placeholder(380) }
);

// ── Inline / overlay UI ───────────────────────────────────────────────────────

// Tooltip is used inline inside paragraphs, so it must render as a <span>.
// Skip the dynamic-with-div placeholder (it would nest <div> inside <p>).
export { Tooltip as TooltipDynamic } from "./Tooltip";

export const ReferenceLinkDynamic = dynamic(
  () => import("./ReferenceLink").then((m) => ({ default: m.ReferenceLink })),
  { ssr: false, loading: placeholder(60) }
);

export const ReferenceListDynamic = dynamic(
  () => import("./ReferenceLink").then((m) => ({ default: m.ReferenceList })),
  { ssr: false, loading: placeholder(60) }
);

// ── Data viz ─────────────────────────────────────────────────────────────────

export const BarChartDynamic = dynamic(
  () => import("./BarChart").then((m) => ({ default: m.BarChart })),
  { ssr: false, loading: placeholder(220) }
);

export const LineChartDynamic = dynamic(
  () => import("./LineChart").then((m) => ({ default: m.LineChart })),
  { ssr: false, loading: placeholder(260) }
);

export const BuyMeCoffeeDynamic = dynamic(
  () => import("./BuyMeCoffee").then((m) => ({ default: m.BuyMeCoffee })),
  { ssr: false, loading: placeholder(100) }
);

export const ShareArticleDynamic = dynamic(
  () => import("./ShareArticle").then((m) => ({ default: m.ShareArticle })),
  { ssr: false, loading: placeholder(90) }
);

import type { MDXComponents } from "mdx/types";
import React from "react";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { ProseList, ProseListItem } from "./ProseList";
import { MetricStrip, Metric } from "./MetricStrip";
import { Figure } from "./Figure";
import { Timeline, Event } from "./Timeline";
import {
  DiagramDynamic as Diagram,
  FlowMapDynamic as FlowMap,
  StepThroughDynamic as StepThrough,
  VideoMathDynamic as VideoMath,
  RenditionTableDynamic as RenditionTable,
  PipelineDynamic as Pipeline,
  FileTreeDynamic as FileTree,
  TabsDynamic as Tabs,
  TabDynamic as Tab,
  ComparisonDynamic as Comparison,
  AccordionDynamic as Accordion,
  AccordionItemDynamic as AccordionItem,
  QuizDynamic as Quiz,
  BezierPlaygroundDynamic as BezierPlayground,
  BezierSamplingDynamic as BezierSampling,
  DeploySimulatorDynamic as DeploySimulator,
  DecisionMatrixDynamic as DecisionMatrix,
} from "./ClientComponents";

/* ─── Prose element overrides ─── */
const prose: MDXComponents = {
  h1: (props) => (
    <h1
      style={{
        fontSize: "clamp(28px, 5vw, 42px)",
        fontWeight: 700,
        letterSpacing: "-0.04em",
        lineHeight: 1.1,
        color: "#000",
        margin: "0 0 12px",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      style={{
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: "-0.025em",
        color: "#000",
        margin: "48px 0 16px",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        paddingBottom: 10,
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      style={{
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: "-0.015em",
        color: "#000",
        margin: "32px 0 10px",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      style={{
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "#111",
        margin: "24px 0 8px",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      style={{
        fontSize: 16,
        lineHeight: 1.75,
        color: "#444",
        margin: "0 0 18px",
        letterSpacing: "-0.008em",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
      {...props}
    />
  ),
  a: (props) => (
    <a
      style={{ color: "#0070f3", textDecoration: "underline", textUnderlineOffset: 3 }}
      {...props}
    />
  ),
  strong: (props) => (
    <strong style={{ fontWeight: 600, color: "#000" }} {...props} />
  ),
  em: (props) => (
    <em style={{ fontStyle: "italic", color: "#555" }} {...props} />
  ),
  ul: ({ children }) => {
    let elementIdx = 0;
    return (
      <ProseList ordered={false}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<{ index: number }>, { index: elementIdx++ });
        })}
      </ProseList>
    );
  },
  ol: ({ children }) => {
    let elementIdx = 0;
    return (
      <ProseList ordered={true}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<{ index: number }>, { index: elementIdx++ });
        })}
      </ProseList>
    );
  },
  li: ({ children, ...rest }) => (
    <ProseListItem {...(rest as { index?: number })}>{children}</ProseListItem>
  ),
  // Block code: rehype-pretty-code adds data-language — let Shiki styles win
  // Inline code: no data-language — apply our inline style
  code: ({ className, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) return <code className={className} {...props} />;
    return (
      <code
        className={className}
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.875em",
          background: "rgba(0,112,243,0.07)",
          padding: "2px 6px",
          borderRadius: 4,
          color: "#0070f3",
        }}
        {...props}
      />
    );
  },
  pre: ({ style, className, children }) => (
    <CodeBlock style={style} className={className}>
      {children}
    </CodeBlock>
  ),
  hr: () => (
    <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.07)", margin: "40px 0" }} />
  ),

  /* ─── Table ─── */
  table: (props) => (
    <div
      style={{
        overflowX: "auto",
        margin: "28px 0",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead
      style={{ background: "#f5f5f5", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      {...props}
    />
  ),
  tbody: (props) => <tbody {...props} />,
  tr: ({ style, ...props }) => (
    <tr
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        transition: "background 0.1s",
        ...style,
      }}
      {...props}
    />
  ),
  th: (props) => (
    <th
      style={{
        padding: "10px 16px",
        textAlign: "left",
        fontSize: 11,
        fontWeight: 600,
        color: "#666",
        fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
      {...props}
    />
  ),
  td: (props) => (
    <td
      style={{
        padding: "11px 16px",
        color: "#444",
        lineHeight: 1.6,
        verticalAlign: "top",
        fontSize: 14,
      }}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      style={{
        borderLeft: "3px solid rgba(0,0,0,0.12)",
        paddingLeft: 18,
        margin: "24px 0",
        color: "#666",
        fontStyle: "italic",
      }}
      {...props}
    />
  ),
};

/* ─── Full registry ─── */
export const mdxComponents: MDXComponents = {
  ...prose,
  // Structural callouts
  Callout,
  // Data display
  MetricStrip,
  Metric,
  // Media
  Figure,
  // Chronological
  Timeline,
  Event,
  // Diagrams & flow
  Diagram,
  FlowMap,
  StepThrough,
  Pipeline,
  // Interactive calculators / tables
  VideoMath,
  RenditionTable,
  // File system
  FileTree,
  // NEW: tabbed content
  Tabs,
  Tab,
  // NEW: side-by-side comparison
  Comparison,
  // NEW: collapsible sections
  Accordion,
  AccordionItem,
  // NEW: knowledge check
  Quiz,
  // Bézier-specific interactive widgets
  BezierPlayground,
  BezierSampling,
  // Deploy-strategy simulator
  DeploySimulator,
  // Multi-option decision matrix
  DecisionMatrix,
};

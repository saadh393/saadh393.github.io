"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ─── Types ─── */
export interface StepNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type?: "service" | "store" | "client";
}

export interface StepEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Step {
  label: string;
  description?: string;
  active: string[];
  activeEdges?: string[];
}

/* Usage in MDX — all data as JSON strings:
   <StepThrough
     title="Upload Flow"
     nodes='[{"id":"upload","label":"Upload","x":0,"y":100}]'
     edges='[{"from":"upload","to":"queue"}]'
     steps='[{"label":"User uploads","active":["upload"],"activeEdges":["upload→queue"]}]'
   />
*/

/* ─── Custom node ─── */
function ServiceNode({ data }: { data: { label: string; active: boolean; type: string } }) {
  const radius =
    data.type === "client" ? "9999px" : data.type === "store" ? "4px" : "8px";

  return (
    <div
      style={{
        padding: "10px 18px",
        borderRadius: radius,
        border: `1.5px solid ${data.active ? "#0070f3" : "rgba(0,0,0,0.12)"}`,
        background: data.active ? "#f0f7ff" : "#fff",
        fontSize: 13,
        fontWeight: data.active ? 600 : 400,
        color: data.active ? "#0070f3" : "#333",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease",
        boxShadow: data.active ? "0 0 0 3px rgba(0,112,243,0.12)" : "none",
        whiteSpace: "nowrap",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      {data.label}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

const nodeTypes: NodeTypes = { service: ServiceNode };

const EDGE_STYLE_INACTIVE = { stroke: "rgba(0,0,0,0.18)", strokeWidth: 1, transition: "stroke 0.25s ease" };
const EDGE_STYLE_ACTIVE = { stroke: "#0070f3", strokeWidth: 2, transition: "stroke 0.25s ease" };
const EDGE_LABEL_STYLE = { fontSize: 11, fontFamily: "var(--font-geist-mono), monospace", fill: "#888" };
const EDGE_LABEL_BG_STYLE = { fill: "#fff" };

/* ─── Main Component ─── */
export function StepThrough({
  title,
  nodes: nodesJson,
  edges: edgesJson,
  steps: stepsJson,
}: {
  title: string;
  nodes: string;
  edges: string;
  steps: string;
}) {
  const [current, setCurrent] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const parsed = useMemo(() => {
    try {
      return {
        nodesDef: JSON.parse(nodesJson) as StepNode[],
        edgesDef: JSON.parse(edgesJson) as StepEdge[],
        steps: JSON.parse(stepsJson) as Step[],
        ok: true,
      };
    } catch {
      return {
        nodesDef: [] as StepNode[],
        edgesDef: [] as StepEdge[],
        steps: [] as Step[],
        ok: false,
      };
    }
  }, [nodesJson, edgesJson, stepsJson]);

  const { nodesDef, edgesDef, steps, ok } = parsed;

  const initialNodes: Node[] = useMemo(
    () =>
      nodesDef.map((n) => ({
        id: n.id,
        type: "service",
        position: { x: n.x, y: n.y },
        data: { label: n.label, active: false, type: n.type ?? "service" },
      })),
    [nodesDef],
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      edgesDef.map((e) => ({
        id: `${e.from}-${e.to}`,
        source: e.from,
        target: e.to,
        label: e.label,
        animated: false,
        style: EDGE_STYLE_INACTIVE,
        labelStyle: EDGE_LABEL_STYLE,
        labelBgStyle: EDGE_LABEL_BG_STYLE,
      })),
    [edgesDef],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  // Track drag so the Reset Layout button only appears once it is useful
  const handleNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChange>[0]) => {
      onNodesChange(changes);
      if (changes.some((c) => c.type === "position" && c.dragging === false)) {
        setHasMoved(true);
      }
    },
    [onNodesChange],
  );

  // Sync active node / edge styling when the step changes — without touching positions,
  // so any drag the reader has done is preserved.
  useEffect(() => {
    const step = steps[current];
    if (!step) return;

    const activeNodeIds = new Set(step.active);
    setNodes((prev) =>
      prev.map((n) => {
        const nextActive = activeNodeIds.has(n.id);
        if (n.data?.active === nextActive) return n;
        return { ...n, data: { ...n.data, active: nextActive } };
      }),
    );

    const activeEdgeKeys = new Set(
      (step.activeEdges ?? []).map((e) => {
        const [from, to] = e.split("→").map((s) => s.trim());
        return `${from}-${to}`;
      }),
    );
    setEdges((prev) =>
      prev.map((e) => {
        const isActive = activeEdgeKeys.has(e.id);
        if (e.animated === isActive) return e;
        return {
          ...e,
          animated: isActive,
          style: isActive ? EDGE_STYLE_ACTIVE : EDGE_STYLE_INACTIVE,
        };
      }),
    );
  }, [current, steps, setNodes, setEdges]);

  // Reset positions back to the JSON-defined layout, keeping current step's active state.
  const resetLayout = useCallback(() => {
    const step = steps[current];
    const activeNodeIds = new Set(step?.active ?? []);
    setNodes(
      initialNodes.map((n) => ({
        ...n,
        data: { ...n.data, active: activeNodeIds.has(n.id) },
      })),
    );
    setHasMoved(false);
  }, [initialNodes, setNodes, steps, current]);

  if (!ok) {
    return (
      <div
        style={{
          padding: 16,
          color: "#d00",
          fontSize: 13,
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        StepThrough: invalid JSON in nodes, edges, or steps prop.
      </div>
    );
  }

  const step = steps[current];
  if (!step) return null;

  const canPrev = current > 0;
  const canNext = current < steps.length - 1;

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        margin: "32px 0",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#0070f3",
            fontWeight: 700,
            letterSpacing: "0.08em",
            border: "1px solid #0070f3",
            borderRadius: 4,
            padding: "2px 6px",
          }}
        >
          INTERACTIVE
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#000",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#aaa",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            drag nodes · drag canvas to pan
          </span>
          {hasMoved && (
            <button
              onClick={resetLayout}
              style={{
                fontSize: 11,
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 600,
                color: "#0070f3",
                background: "rgba(0,112,243,0.07)",
                border: "1px solid rgba(0,112,243,0.35)",
                borderRadius: 6,
                padding: "3px 9px",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              ↺ Reset layout
            </button>
          )}
        </span>
      </div>

      {/* React Flow canvas */}
      <div style={{ height: 280, background: "#fafafa" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          panOnDrag={true}
          zoomOnScroll={false}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e5e5e5" gap={20} size={1} />
          <Controls showInteractive={false} style={{ bottom: 10, left: 10 }} />
        </ReactFlow>
      </div>

      {/* Step controls */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#bbb",
            flexShrink: 0,
          }}
        >
          {current + 1} / {steps.length}
        </span>

        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 9999,
                background: i === current ? "#0070f3" : "rgba(0,0,0,0.12)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>

        <span
          style={{
            fontSize: 13,
            color: "#333",
            flex: 1,
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1.4,
          }}
        >
          <strong style={{ color: "#000" }}>{step.label}</strong>
          {step.description && (
            <span style={{ color: "#666", marginLeft: 6 }}>
              — {step.description}
            </span>
          )}
        </span>

        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => setCurrent((c) => c - 1)}
            disabled={!canPrev}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.1)",
              background: canPrev ? "#fff" : "#fafafa",
              color: canPrev ? "#000" : "#ccc",
              cursor: canPrev ? "pointer" : "default",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ←
          </button>
          <button
            onClick={() => setCurrent((c) => c + 1)}
            disabled={!canNext}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.1)",
              background: canNext ? "#0070f3" : "#fafafa",
              color: canNext ? "#fff" : "#ccc",
              cursor: canNext ? "pointer" : "default",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

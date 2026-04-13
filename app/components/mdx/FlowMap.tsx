"use client";

import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* Usage in MDX — pass JSON strings for nodes and edges:
   <FlowMap
     nodes='[{"id":"upload","label":"Upload Service","x":0,"y":100}]'
     edges='[{"from":"upload","to":"queue","label":"enqueue"}]'
   />
*/

export interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type?: "service" | "store" | "client";
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

function ServiceNode({ data }: { data: { label: string; type: string } }) {
  const radius = data.type === "client" ? "9999px" : data.type === "store" ? "4px" : "8px";
  return (
    <div
      style={{
        padding: "10px 18px",
        borderRadius: radius,
        border: "1.5px solid rgba(0,0,0,0.12)",
        background: "#fff",
        fontSize: 13,
        color: "#333",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      {data.label}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

const nodeTypes: NodeTypes = { service: ServiceNode };

export function FlowMap({
  nodes: nodesJson,
  edges: edgesJson,
  height = 280,
}: {
  nodes: string;
  edges: string;
  height?: number;
}) {
  let nodesDef: FlowNode[] = [];
  let edgesDef: FlowEdge[] = [];

  try {
    nodesDef = JSON.parse(nodesJson);
    edgesDef = JSON.parse(edgesJson);
  } catch {
    return (
      <div style={{ padding: 16, color: "#d00", fontSize: 13, fontFamily: "var(--font-geist-mono), monospace" }}>
        FlowMap: invalid JSON in nodes or edges prop.
      </div>
    );
  }

  const rfNodes: Node[] = nodesDef.map((n) => ({
    id: n.id,
    type: "service",
    position: { x: n.x, y: n.y },
    data: { label: n.label, type: n.type ?? "service" },
  }));

  const rfEdges: Edge[] = edgesDef.map((e) => ({
    id: `${e.from}-${e.to}`,
    source: e.from,
    target: e.to,
    label: e.label,
    style: { stroke: "rgba(0,0,0,0.18)", strokeWidth: 1 },
    labelStyle: {
      fontSize: 11,
      fontFamily: "var(--font-geist-mono), monospace",
      fill: "#888",
    },
    labelBgStyle: { fill: "#fff" },
  }));

  return (
    <div
      style={{
        height,
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "32px 0",
        background: "#fafafa",
      }}
    >
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e5e5e5" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}

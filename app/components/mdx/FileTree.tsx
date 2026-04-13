"use client";

import { useState } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────────
   Usage in MDX (JSON string prop):

   <FileTree tree='[
     {"name":"tmp","type":"dir","children":[
       {"name":"{videoId}.meta.json","type":"file","note":"chunk count, total chunks"},
       {"name":"{videoId}","type":"dir","children":[
         {"name":"chunk-0","type":"file"},
         {"name":"chunk-1","type":"file"}
       ]}
     ]}
   ]' />
──────────────────────────────────────────────────────────────────────────── */

export interface FileNode {
  name: string;
  type: "file" | "dir";
  note?: string;       // inline annotation shown to the right
  highlight?: boolean; // draws attention to this node
  children?: FileNode[];
}

/* ─── Icons ─── */
function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      {open ? (
        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.086a1 1 0 0 1 .707.293L6 3h5.5A1.5 1.5 0 0 1 13 4.5v6A1.5 1.5 0 0 1 11.5 12h-9A1.5 1.5 0 0 1 1 10.5v-7Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
      ) : (
        <>
          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.086a1 1 0 0 1 .707.293L6 3h5.5A1.5 1.5 0 0 1 13 4.5v6A1.5 1.5 0 0 1 11.5 12h-9A1.5 1.5 0 0 1 1 10.5v-7Z" fill="#fcd34d" stroke="#d97706" strokeWidth="0.5"/>
        </>
      )}
    </svg>
  );
}

function FileIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const colors: Record<string, string> = {
    json: "#f59e0b",
    ts: "#3178c6",
    js: "#f7df1e",
    md: "#888",
    env: "#16a34a",
    yml: "#7c3aed",
    yaml: "#7c3aed",
  };
  const color = colors[ext] ?? "#aaa";

  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 1.5A.5.5 0 0 1 1.5 1H8l3 3v8.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-11Z" fill="#fff" stroke={color} strokeWidth="1"/>
      <path d="M8 1l3 3H8.5A.5.5 0 0 1 8 3.5V1Z" fill={color} opacity="0.5"/>
    </svg>
  );
}

/* ─── Single node row ─── */
function Node({
  node,
  depth,
  isLast,
}: {
  node: FileNode;
  depth: number;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(true);
  const isDir = node.type === "dir";

  return (
    <div>
      <div
        onClick={isDir ? () => setOpen((o) => !o) : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 0",
          paddingLeft: depth * 20,
          cursor: isDir ? "pointer" : "default",
          borderRadius: 4,
          position: "relative",
        }}
        className="filetree-row"
      >
        {/* Tree lines */}
        {depth > 0 && (
          <div
            style={{
              position: "absolute",
              left: depth * 20 - 14,
              top: 0,
              bottom: isLast ? "50%" : 0,
              width: 1,
              background: "rgba(0,0,0,0.1)",
            }}
          />
        )}
        {depth > 0 && (
          <div
            style={{
              position: "absolute",
              left: depth * 20 - 14,
              top: "50%",
              width: 10,
              height: 1,
              background: "rgba(0,0,0,0.1)",
            }}
          />
        )}

        {/* Icon */}
        {isDir ? <FolderIcon open={open} /> : <FileIcon name={node.name} />}

        {/* Name */}
        <span
          style={{
            fontSize: 13,
            fontFamily: "var(--font-geist-mono), monospace",
            color: node.highlight ? "#0070f3" : isDir ? "#1a1a1a" : "#333",
            fontWeight: isDir ? 500 : node.highlight ? 600 : 400,
            letterSpacing: "-0.01em",
          }}
        >
          {node.name}
        </span>

        {/* Expand indicator */}
        {isDir && (
          <span
            style={{
              fontSize: 10,
              color: "#ccc",
              marginLeft: 2,
              transition: "transform 0.15s",
              display: "inline-block",
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          >
            ▾
          </span>
        )}

        {/* Annotation */}
        {node.note && (
          <span
            style={{
              marginLeft: 10,
              fontSize: 11,
              color: "#aaa",
              fontFamily: "var(--font-geist-mono), monospace",
              fontStyle: "italic",
              whiteSpace: "nowrap",
            }}
          >
            ← {node.note}
          </span>
        )}
      </div>

      {/* Children */}
      {isDir && open && node.children && (
        <div>
          {node.children.map((child, i) => (
            <Node
              key={i}
              node={child}
              depth={depth + 1}
              isLast={i === node.children!.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─── */
export function FileTree({
  tree: treeRaw,
  title,
}: {
  tree: FileNode[] | string;
  title?: string;
}) {
  const tree: FileNode[] =
    typeof treeRaw === "string" ? JSON.parse(treeRaw) : treeRaw;

  return (
    <div
      style={{
        margin: "24px 0",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: "#fafafa",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Traffic lights */}
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
              opacity: 0.7,
            }}
          />
        ))}
        {title && (
          <span
            style={{
              marginLeft: 6,
              fontSize: 11,
              color: "#999",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </span>
        )}
      </div>

      {/* Tree body */}
      <div style={{ padding: "12px 16px 16px" }}>
        {tree.map((node, i) => (
          <Node key={i} node={node} depth={0} isLast={i === tree.length - 1} />
        ))}
      </div>
    </div>
  );
}

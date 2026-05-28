"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const FONT_MONO = "var(--font-geist-mono), monospace";
const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";

interface CodeFile {
  path: string;
  language?: string;
  code: string;
  badge?: string;
}

interface CodeEditorProps {
  files: string | CodeFile[];
  title?: string;
  showSidebar?: boolean;
  defaultActive?: number;
}

interface TreeNode {
  name: string;
  type: "dir" | "file";
  path?: string;
  children?: TreeNode[];
}

function safeParse<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

function buildTree(files: CodeFile[]): TreeNode[] {
  const root: TreeNode[] = [];
  for (const file of files) {
    const parts = file.path.split("/").filter(Boolean);
    let cursor = root;
    parts.forEach((part, idx) => {
      const isFile = idx === parts.length - 1;
      let existing = cursor.find((n) => n.name === part);
      if (!existing) {
        existing = {
          name: part,
          type: isFile ? "file" : "dir",
          ...(isFile ? { path: file.path } : { children: [] }),
        };
        cursor.push(existing);
      }
      if (!isFile && existing.children) cursor = existing.children;
    });
  }
  return root;
}

function extensionFor(path: string): string {
  const dot = path.lastIndexOf(".");
  return dot >= 0 ? path.slice(dot + 1).toLowerCase() : "";
}

function defaultLanguage(path: string): string {
  const ext = extensionFor(path);
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    md: "markdown",
    mdx: "mdx",
    yml: "yaml",
    yaml: "yaml",
    sh: "bash",
    bash: "bash",
    py: "python",
    go: "go",
    sql: "sql",
    html: "html",
    css: "css",
  };
  return map[ext] ?? "typescript";
}

function FileIcon({ path }: { path: string }) {
  const ext = extensionFor(path);
  const colorMap: Record<string, string> = {
    ts: "#3178c6",
    tsx: "#3178c6",
    js: "#f7df1e",
    jsx: "#f7df1e",
    json: "#f59e0b",
    md: "#888",
    yml: "#7c3aed",
    yaml: "#7c3aed",
    sh: "#16a34a",
    sql: "#0891b2",
  };
  const color = colorMap[ext] ?? "#9ca3af";
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 12 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M1 1.5A.5.5 0 0 1 1.5 1H8l3 3v8.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-11Z"
        fill="#fff"
        stroke={color}
        strokeWidth="1"
      />
      <path d="M8 1l3 3H8.5A.5.5 0 0 1 8 3.5V1Z" fill={color} opacity="0.55" />
    </svg>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.086a1 1 0 0 1 .707.293L6 3h5.5A1.5 1.5 0 0 1 13 4.5v6A1.5 1.5 0 0 1 11.5 12h-9A1.5 1.5 0 0 1 1 10.5v-7Z"
        fill={open ? "#f59e0b" : "#fcd34d"}
        stroke="#d97706"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function TreeView({
  nodes,
  depth = 0,
  activePath,
  onSelect,
}: {
  nodes: TreeNode[];
  depth?: number;
  activePath: string;
  onSelect: (path: string) => void;
}) {
  return (
    <div>
      {nodes.map((node) => (
        <TreeRow
          key={node.name + (node.path ?? "")}
          node={node}
          depth={depth}
          activePath={activePath}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function TreeRow({
  node,
  depth,
  activePath,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  activePath: string;
  onSelect: (path: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const isDir = node.type === "dir";
  const isActive = node.path === activePath;
  return (
    <div>
      <div
        onClick={() => {
          if (isDir) setOpen((o) => !o);
          else if (node.path) onSelect(node.path);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 8px",
          paddingLeft: 8 + depth * 14,
          cursor: "pointer",
          background: isActive ? "rgba(0,112,243,0.10)" : "transparent",
          borderLeft: isActive
            ? "2px solid #0070f3"
            : "2px solid transparent",
          fontSize: 12.5,
          fontFamily: FONT_MONO,
          color: isActive ? "#0070f3" : "#cbd5e1",
          transition: "background 0.12s",
        }}
      >
        {isDir ? <FolderIcon open={open} /> : <FileIcon path={node.path ?? ""} />}
        <span style={{ whiteSpace: "nowrap" }}>{node.name}</span>
      </div>
      {isDir && open && node.children && (
        <TreeView
          nodes={node.children}
          depth={depth + 1}
          activePath={activePath}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}

function Crumbs({ path }: { path: string }) {
  const parts = path.split("/").filter(Boolean);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        background: "#1e293b",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        fontSize: 11.5,
        fontFamily: FONT_MONO,
        color: "#94a3b8",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {parts.map((p, i) => {
        const isLast = i === parts.length - 1;
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: isLast ? "#e5e7eb" : "#94a3b8" }}>{p}</span>
            {!isLast && <span style={{ color: "#475569" }}>›</span>}
          </span>
        );
      })}
    </div>
  );
}

function StatusBar({
  language,
  lineCount,
  fileCount,
}: {
  language: string;
  lineCount: number;
  fileCount: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "5px 14px",
        background: "#0070f3",
        color: "#fff",
        fontSize: 11,
        fontFamily: FONT_MONO,
        letterSpacing: "0.02em",
      }}
    >
      <span>● main</span>
      <span style={{ opacity: 0.85 }}>{language}</span>
      <span style={{ opacity: 0.85 }}>UTF-8</span>
      <span style={{ opacity: 0.85 }}>LF</span>
      <span style={{ opacity: 0.85 }}>Spaces: 2</span>
      <span style={{ marginLeft: "auto", opacity: 0.85 }}>
        {lineCount} lines · {fileCount} files
      </span>
    </div>
  );
}

function highlightedToBlock(html: string): string {
  const cleaned = html
    .replace(/style="[^"]*background-color:[^;"]*;?[^"]*"/i, 'style=""')
    .replace(/<pre /, `<pre data-codeeditor `);
  return cleaned;
}

export function CodeEditor({
  files: filesRaw,
  title = "code editor",
  showSidebar = true,
  defaultActive = 0,
}: CodeEditorProps) {
  const files: CodeFile[] = useMemo(
    () =>
      typeof filesRaw === "string"
        ? safeParse(filesRaw, [] as CodeFile[])
        : filesRaw ?? [],
    [filesRaw],
  );

  const tree = useMemo(() => buildTree(files), [files]);

  const [active, setActive] = useState(defaultActive);
  const [rendered, setRendered] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!files.length) return;
      try {
        const shiki = await import("shiki");
        const out: Record<string, string> = {};
        for (const f of files) {
          const lang = f.language ?? defaultLanguage(f.path);
          try {
            const html = await shiki.codeToHtml(f.code, {
              lang,
              theme: "github-dark-dimmed",
            });
            out[f.path] = highlightedToBlock(html);
          } catch {
            out[f.path] = `<pre><code>${escapeHtml(f.code)}</code></pre>`;
          }
        }
        if (!cancelled) setRendered(out);
      } catch {
        if (!cancelled) {
          const fallback: Record<string, string> = {};
          for (const f of files) {
            fallback[f.path] = `<pre><code>${escapeHtml(f.code)}</code></pre>`;
          }
          setRendered(fallback);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [files]);

  if (!files.length) {
    return (
      <div
        style={{
          padding: 16,
          border: "1px dashed rgba(0,0,0,0.18)",
          borderRadius: 10,
          margin: "28px 0",
          fontFamily: FONT_MONO,
          fontSize: 12,
          color: "#888",
        }}
      >
        CodeEditor: pass files as a JSON string.
      </div>
    );
  }

  const safeActive = Math.min(active, files.length - 1);
  const currentFile = files[safeActive];
  const lineCount = currentFile.code.split("\n").length;
  const language = currentFile.language ?? defaultLanguage(currentFile.path);
  const html = rendered[currentFile.path];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(currentFile.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        margin: "32px 0",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 10,
        overflow: "hidden",
        background: "#0d1117",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
        fontFamily: FONT_SANS,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 14px",
          background: "#161b22",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: c,
                border: "0.5px solid rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
        <span
          style={{
            marginLeft: 8,
            fontSize: 12,
            fontFamily: FONT_MONO,
            color: "#8b949e",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            fontFamily: FONT_MONO,
            color: "#6b7280",
          }}
        >
          {currentFile.path}
        </span>
      </div>

      {/* Body: sidebar + editor area */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: showSidebar ? "200px 1fr" : "1fr",
          minHeight: 280,
        }}
      >
        {showSidebar && (
          <div
            style={{
              background: "#0f1620",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              padding: "8px 0",
              overflowY: "auto",
              maxHeight: 520,
            }}
          >
            <div
              style={{
                padding: "4px 12px 8px",
                fontSize: 10.5,
                fontFamily: FONT_MONO,
                color: "#475569",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Explorer
            </div>
            <TreeView
              nodes={tree}
              activePath={currentFile.path}
              onSelect={(p) => {
                const idx = files.findIndex((f) => f.path === p);
                if (idx >= 0) setActive(idx);
              }}
            />
          </div>
        )}

        {/* Editor pane */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              background: "#0b1018",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {files.map((f, i) => {
              const isActive = i === safeActive;
              const name = f.path.split("/").pop() ?? f.path;
              return (
                <button
                  key={f.path}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "8px 14px",
                    background: isActive ? "#0d1117" : "transparent",
                    border: "none",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                    borderTop: isActive
                      ? "1.5px solid #0070f3"
                      : "1.5px solid transparent",
                    color: isActive ? "#e5e7eb" : "#6b7280",
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "color 0.1s, background 0.1s",
                  }}
                >
                  <FileIcon path={f.path} />
                  <span>{name}</span>
                  {f.badge && (
                    <span
                      style={{
                        fontSize: 9,
                        padding: "1px 5px",
                        background: "rgba(0,112,243,0.18)",
                        color: "#60a5fa",
                        border: "1px solid rgba(96,165,250,0.3)",
                        borderRadius: 4,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {f.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={handleCopy}
              title="Copy file"
              style={{
                marginLeft: "auto",
                padding: "0 14px",
                background: "transparent",
                border: "none",
                color: copied ? "#86efac" : "#6b7280",
                fontFamily: FONT_MONO,
                fontSize: 11,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              {copied ? "✓ copied" : "copy"}
            </button>
          </div>

          <Crumbs path={currentFile.path} />

          {/* Code area: gutter + rendered code */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              background: "#0d1117",
              minHeight: 180,
            }}
          >
            <Gutter lineCount={lineCount} />
            <CodePane html={html} fallback={currentFile.code} />
          </div>

          <StatusBar
            language={language}
            lineCount={lineCount}
            fileCount={files.length}
          />
        </div>
      </div>
    </div>
  );
}

function Gutter({ lineCount }: { lineCount: number }) {
  return (
    <div
      style={{
        padding: "14px 10px 14px 14px",
        background: "#0d1117",
        borderRight: "1px solid rgba(255,255,255,0.04)",
        fontFamily: FONT_MONO,
        fontSize: 12.5,
        lineHeight: 1.75,
        color: "#3b4252",
        textAlign: "right",
        userSelect: "none",
        minWidth: 36,
      }}
    >
      {Array.from({ length: lineCount }).map((_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

function CodePane({
  html,
  fallback,
}: {
  html: string | undefined;
  fallback: string;
}) {
  if (!html) {
    return (
      <pre
        style={{
          margin: 0,
          padding: "14px 16px",
          fontFamily: FONT_MONO,
          fontSize: 12.5,
          lineHeight: 1.75,
          color: "#c9d1d9",
          background: "#0d1117",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        {fallback}
      </pre>
    );
  }
  return (
    <div
      className="codeeditor-pane"
      style={{
        overflowX: "auto",
        background: "#0d1117",
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

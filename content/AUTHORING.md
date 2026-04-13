# Case Study & Blog Authoring Guide

## Directory Structure

```
content/
  projects/   → renders at /projects/[slug]
  blog/        → renders at /blog/[slug]  (future)
```

Drop any `.mdx` file into the right folder. It builds automatically on the next `npm run build`.

---

## Frontmatter

Every MDX file must start with this block:

```yaml
---
title: "Your Case Study Title"
date: "2025-03-01"
description: "One sentence shown under the title and in <meta> description."
tags: ["Node.js", "Architecture", "Docker"]
status: "published"   # set to "draft" to exclude from build entirely
type: "case-study"    # or "blog"
github: "https://github.com/you/repo"   # optional — shows button in footer
live: "https://yourproject.com"          # optional — shows button in footer
---
```

**`status: "draft"`** — the file is skipped at build time entirely. No route is generated.

---

## Custom Components

All components are globally available — no import needed in the MDX file.

---

### `<Callout>`

Highlighted aside. Use for insights, warnings, trade-offs, or measured results.

```mdx
<Callout type="insight">
  Shorter segments = lower start latency but more manifest overhead.
</Callout>
```

| Type | Color | When to use |
|---|---|---|
| `insight` | Blue | Engineering observation or non-obvious finding |
| `warning` | Amber | Known risk, footgun, or missing safeguard |
| `tradeoff` | Purple | Decision with meaningful downsides |
| `result` | Green | Measurable outcome — put this at the end |

---

### `<MetricStrip>` + `<Metric>`

Proof numbers in a horizontal strip. One `<Metric>` child per number. Max 4 display cleanly.

```mdx
<MetricStrip>
  <Metric label="Peak concurrent viewers" value="500+" />
  <Metric label="Avg. transcode time" value="~12s" />
  <Metric label="Queue overflow rate" value="0%" />
  <Metric label="Services" value="5" />
</MetricStrip>
```

---

### `<Figure>`

Image with optional caption. Place images in `public/images/`.

```mdx
<Figure
  src="/images/architecture.png"
  alt="System architecture diagram"
  caption="The five-service architecture — each box is an independent Docker container."
/>
```

---

### `<Timeline>` + `<Event>`

Chronological list. Use for project history or decision log. `note` is optional.

```mdx
<Timeline>
  <Event date="Week 1" label="Designed service boundaries" note="Changed the architecture twice before writing code." />
  <Event date="Week 2" label="FFmpeg + BullMQ working end-to-end" note="First transcode at 3am." />
  <Event date="Week 3" label="MinIO + Docker Compose" />
</Timeline>
```

---

### `<Diagram>`

Mermaid diagram. Write Mermaid syntax as plain text children. Renders full-width, responsive.

```mdx
<Diagram>
sequenceDiagram
  participant C as Client
  participant S as Server
  C->>S: POST /upload
  S-->>C: 202 Accepted
</Diagram>
```

Supported types: `sequenceDiagram`, `flowchart`, `graph`, `classDiagram`, `erDiagram`, `gantt`, `pie`, and all standard Mermaid diagrams.

---

### `<FlowMap>`

Static React Flow node graph. Pannable and zoomable. Use for architecture overviews.

**`nodes` and `edges` must be JSON strings** — see the JSON String Rule below.

```mdx
<FlowMap
  height={260}
  nodes='[
    {"id":"client","label":"Browser","x":0,"y":100,"type":"client"},
    {"id":"api","label":"API Server","x":200,"y":100},
    {"id":"db","label":"Database","x":400,"y":100,"type":"store"}
  ]'
  edges='[
    {"from":"client","to":"api"},
    {"from":"api","to":"db","label":"query"}
  ]'
/>
```

**Node `type` options:**
- `"service"` (default) — rounded rectangle
- `"store"` — sharp rectangle (databases, queues, object storage)
- `"client"` — pill shape (browsers, mobile apps)

`height` defaults to `280`. Zoom controls appear bottom-left.

---

### `<StepThrough>`

Interactive step-by-step walker. Nodes and edges in the diagram highlight per step as the reader clicks through or jumps via the dot nav.

**All complex props must be JSON strings** — see the JSON String Rule below.

```mdx
<StepThrough
  title="Upload → Playback Pipeline"
  nodes='[
    {"id":"client","label":"Browser","x":0,"y":100,"type":"client"},
    {"id":"upload","label":"Upload Service","x":200,"y":100},
    {"id":"queue","label":"BullMQ","x":400,"y":100,"type":"store"}
  ]'
  edges='[
    {"from":"client","to":"upload"},
    {"from":"upload","to":"queue","label":"enqueue"}
  ]'
  steps='[
    {
      "label":"User uploads file",
      "description":"Browser sends multipart/form-data.",
      "active":["client","upload"],
      "activeEdges":["client→upload"]
    },
    {
      "label":"Job enqueued",
      "description":"Upload service pushes job metadata to BullMQ.",
      "active":["upload","queue"],
      "activeEdges":["upload→queue"]
    }
  ]'
/>
```

**Step fields:**
- `label` — short title shown in the control bar (required)
- `description` — longer explanation next to the label (optional)
- `active` — node IDs to highlight blue in this step
- `activeEdges` — `"from→to"` strings to animate in this step (optional)

---

### `<Pipeline>`

Horizontal flow of labeled pills with hover tooltips. Use for showing a request or process lifecycle inline in prose — cleaner than an ASCII diagram.

**`steps` must be a JSON string** — see the JSON String Rule below.

```mdx
<Pipeline steps='[
  {"label":"Upload Service","detail":"Receives chunked file, writes to disk"},
  {"label":"queue job","detail":"Pushes job record to BullMQ on Redis"},
  {"label":"return 200","detail":"HTTP response returned immediately"},
  {"label":"Transcode Worker","detail":"Separate Node.js process"},
  {"label":"ffmpeg × 4","detail":"Four sequential renditions"},
  {"label":"push to MinIO","detail":"Streams all .ts segments and playlists"}
]' />
```

`detail` is optional — shown as a tooltip on hover.

---

### `<FileTree>`

Visual file system tree with folder expand/collapse, file type icons, and inline annotations. Use whenever you'd otherwise write a code block with indented paths.

**`tree` must be a JSON string** — see the JSON String Rule below.

```mdx
<FileTree
  title="Upload Service — local disk"
  tree='[
    {"name":"tmp","type":"dir","children":[
      {"name":"{videoId}.meta.json","type":"file","note":"chunk count, total chunks","highlight":true},
      {"name":"{videoId}","type":"dir","children":[
        {"name":"chunk-0","type":"file"},
        {"name":"chunk-1","type":"file"}
      ]}
    ]}
  ]'
/>
```

**Node fields:**
- `name` — filename or directory name (required)
- `type` — `"file"` or `"dir"` (required)
- `note` — annotation shown to the right in muted italic (optional)
- `highlight` — `true` draws the name in blue to call attention (optional)
- `children` — nested nodes, only for `type: "dir"` (optional)

`title` prop is optional — shows in the header bar above the tree.

File icon colours are determined automatically by extension: `.json` amber, `.ts` blue, `.js` yellow, `.yml`/`.yaml` purple, `.env` green.

---

### `<VideoMath>`

Interactive HLS file count calculator. No props needed. The reader drags a slider (1–60 min) and watches the calculation update step-by-step in real time.

```mdx
<VideoMath />
```

Currently specific to 4-second HLS segments and 4 renditions. To change those values, edit `app/components/mdx/VideoMath.tsx`.

---

### `<RenditionTable>`

Hoverable FFmpeg renditions table — 360p through 1080p with animated bitrate bars, colour-coded by quality tier. No props.

```mdx
<RenditionTable />
```

Currently hardcoded for the HLS case study renditions. To use for a different project, extend or fork the component.

---

## The JSON String Rule

`<FlowMap>`, `<StepThrough>`, and `<Pipeline>` accept their complex props as **JSON strings**, not JavaScript object literals.

**Why:** Turbopack cannot serialize arrays of objects across the RSC boundary when written as inline JSX prop syntax. Passing a plain string sidesteps the boundary — the component calls `JSON.parse` internally.

**Write this:**
```mdx
nodes='[{"id":"a","label":"A","x":0,"y":0}]'
```

**Not this — will break the build:**
```mdx
nodes={[{ id: "a", label: "A", x: 0, y: 0 }]}
```

All other components (`Callout`, `MetricStrip`, `Figure`, `Timeline`, `Diagram`, `VideoMath`, `RenditionTable`) use normal MDX syntax.

---

## Code Blocks

Standard fenced code blocks with language tags. Highlighted by Shiki (`github-light` theme).

````mdx
```typescript
const lenis = new Lenis({ duration: 1.2 });
```
````

Supported languages: `javascript`, `typescript`, `bash`, `json`, `yaml`, `go`, `python`, `sql`, and all other Shiki languages.

---

## Prose

Standard Markdown — headings (`##`, `###`), bold, italic, links, ordered/unordered lists, blockquotes, horizontal rules — all styled to match the portfolio design system (Geist Sans, light mode, `#0070f3` accent).

---

## Publishing Checklist

- [ ] Frontmatter `status` is `"published"`
- [ ] `date` is accurate — used for sort order on listing pages
- [ ] `description` is one sentence — appears in `<meta>` and as the subtitle
- [ ] `github` and/or `live` URLs filled in if the project has them
- [ ] Every `<Metric>` value is a real number, not a claim
- [ ] `<Callout type="result">` present if there is a measurable outcome
- [ ] Run `npm run build` locally and confirm the route appears in the build output

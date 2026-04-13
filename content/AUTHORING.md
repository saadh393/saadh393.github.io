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
---
```

---

## Custom Components

These are globally available — no import needed in the MDX file.

---

### `<Callout>`

Highlighted aside block. Use for insights, warnings, trade-offs, or results.

```mdx
<Callout type="insight">
  Shorter segments = lower start latency but more manifest overhead.
</Callout>
```

**Types:** `insight` (blue) · `warning` (amber) · `tradeoff` (purple) · `result` (green)

---

### `<MetricStrip>` + `<Metric>`

Proof numbers displayed in a horizontal strip. Use child composition — one `<Metric>` per number.

```mdx
<MetricStrip>
  <Metric label="Peak concurrent viewers" value="500+" />
  <Metric label="Avg. transcode time" value="~12s" />
  <Metric label="Queue overflow rate" value="0%" />
  <Metric label="Services" value="5" />
</MetricStrip>
```

Max 4 metrics display cleanly in one row.

---

### `<Figure>`

Image with optional caption.

```mdx
<Figure
  src="/images/architecture.png"
  alt="System architecture diagram"
  caption="The five-service architecture — each box is an independent Docker container."
/>
```

Place images in `public/images/`.

---

### `<Timeline>` + `<Event>`

Chronological list. Use for project history or decision log.

```mdx
<Timeline>
  <Event date="Week 1" label="Designed service boundaries" note="Changed the architecture twice before writing code." />
  <Event date="Week 2" label="FFmpeg + BullMQ working end-to-end" note="First transcode at 3am." />
  <Event date="Week 3" label="MinIO + Docker Compose" />
</Timeline>
```

`note` is optional.

---

### `<Diagram>`

Mermaid diagram. Write the Mermaid syntax as plain text children.

```mdx
<Diagram>
sequenceDiagram
  participant C as Client
  participant S as Server
  C->>S: POST /upload
  S-->>C: 202 Accepted
</Diagram>
```

Supported Mermaid types: `sequenceDiagram`, `flowchart`, `graph`, `classDiagram`, `erDiagram`, `gantt`, `pie`, etc.

---

### `<FlowMap>`

Static React Flow node diagram. Use for architecture overviews where you want a visual node graph.

**Props must be JSON strings** (Turbopack RSC limitation — see note below).

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

**Node types:**
- `"service"` (default) — rounded rectangle
- `"store"` — sharp rectangle (databases, queues)
- `"client"` — pill shape (browsers, mobile)

`height` defaults to `280`.

---

### `<StepThrough>`

Interactive step-by-step walker with an animated React Flow diagram. Nodes and edges highlight per step as the reader clicks through.

**All props must be JSON strings** (Turbopack RSC limitation — see note below).

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
- `description` — longer explanation shown next to the label (optional)
- `active` — array of node IDs to highlight blue in this step
- `activeEdges` — array of `"from→to"` strings to animate in this step (optional)

---

---

### `<VideoMath>`

Interactive HLS file count calculator. No props — drag the slider to change video duration and watch the math update live.

```mdx
<VideoMath />
```

---

### `<RenditionTable>`

Styled, hoverable table of FFmpeg renditions (360p → 1080p with bitrate bars). No props — data is hardcoded for the HLS case study. Extend the component data array for other projects.

```mdx
<RenditionTable />
```

---

### `<Pipeline>`

Horizontal flow of labeled steps with hover tooltips. Use for showing a request/process flow inline in prose.

**Prop is a JSON string** (Turbopack RSC limitation):

```mdx
<Pipeline steps='[
  {"label":"Upload Service","detail":"Receives the file"},
  {"label":"queue job","detail":"Pushes to BullMQ"},
  {"label":"return 200","detail":"Responds immediately"}
]' />
```

`detail` is optional — shows as a tooltip on hover.

---

## The JSON String Rule

`<FlowMap>` and `<StepThrough>` accept `nodes`, `edges`, and `steps` as **JSON strings**, not JavaScript object literals.

**Why:** Turbopack cannot serialize arrays of objects across the RSC boundary when written as inline JSX prop syntax. Passing a plain string avoids the boundary entirely — the component parses it with `JSON.parse` internally.

**Write this:**
```mdx
nodes='[{"id":"a","label":"A","x":0,"y":0}]'
```

**Not this (will break the build):**
```mdx
nodes={[{ id: "a", label: "A", x: 0, y: 0 }]}
```

All other components (`Callout`, `MetricStrip`, `Figure`, `Timeline`, `Diagram`) use normal MDX syntax.

---

## Code Blocks

Standard fenced code blocks with language tags. Highlighted by Shiki (github-light theme).

````mdx
```javascript
const lenis = new Lenis({ duration: 1.2 });
```
````

Supported: `javascript`, `typescript`, `bash`, `json`, `yaml`, `go`, `python`, `sql`, and all other Shiki languages.

---

## Prose

Standard Markdown — headings, bold, italic, links, lists, blockquotes, horizontal rules — all styled to match the portfolio design system (Geist Sans, light mode, `#0070f3` accent).

---

## Publishing Checklist

- [ ] Frontmatter `status` set to `"published"`
- [ ] `date` is accurate (used for sorting)
- [ ] `description` is one sentence — it appears in `<meta>` and under the title
- [ ] Every metric in `<MetricStrip>` is a real number
- [ ] `<Callout type="result">` at the end if there's a measurable outcome
- [ ] Run `npm run build` locally and confirm the route appears in the output

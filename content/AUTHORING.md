# MDX Authoring Guide — Saad Hasan Portfolio

This guide is the authoritative reference for writing case studies and articles for this portfolio. It is written to be used directly by LLMs generating new content.

---

## Design Principles

Every piece of content must follow these rules:

1. **Lead with the problem, end with the outcome** — every section, every paragraph.
2. **No adjectives without proof** — not "scalable" unless you show the scale.
3. **Real numbers only** — never placeholder metrics. If a real number isn't known, describe the constraint instead.
4. **Clarity over cleverness** — plain language. Assume the reader is a smart developer who hasn't seen this problem before.
5. **Interactive over static** — prefer `<StepThrough>` over a diagram, `<Quiz>` over a summary paragraph, `<Tabs>` over code blocks with a note saying "here's the alternative".
6. **Visual components break walls of text** — aim for at most 3 consecutive prose paragraphs before a component.

---

## Directory Structure

```
content/
  projects/   → renders at /projects/[slug]  (case studies)
  blog/        → renders at /blog/[slug]       (articles)
```

Drop any `.mdx` file in the right folder. Builds automatically on `npm run build`.

---

## Frontmatter

Every MDX file must start with this block:

```yaml
---
title: "Your Title Here"
date: "2025-06-01"
description: "One sentence. Shown under the title and in <meta> description. Make it specific."
tags: ["Node.js", "Architecture", "Docker"]
status: "published"   # "draft" = excluded from build entirely
type: "case-study"    # or "blog"
github: "https://github.com/you/repo"   # optional
live: "https://yourproject.com"          # optional
---
```

**`status: "draft"`** — route is never generated. Use it while writing.

**`description` rules:**
- One sentence, max ~160 chars.
- Specific, not generic. "How I built X" is bad. "Why keyword search fails at intent matching, and how vector embeddings fix it" is good.
- This appears in Google search snippets and OG cards.

---

## Picking the Right Content Type

| Situation | Type |
|---|---|
| Multi-stage engineering project with architecture decisions | `case-study` |
| Deep dive into a single concept, library, or technique | `blog` |
| Comparison of two approaches with trade-offs | `blog` |
| Post-mortem or lessons learned from a real project | `case-study` |

---

## Full Component Reference

All components are globally available — no import needed.

---

### `<Callout>`

Highlighted aside. Use for insights, warnings, trade-offs, or measured results.

```mdx
<Callout type="insight">
  Shorter segments = lower start latency but more manifest overhead.
</Callout>
```

| `type` | Color | When to use |
|---|---|---|
| `insight` | Blue | Engineering observation, non-obvious finding |
| `warning` | Amber | Known risk, footgun, or missing safeguard |
| `tradeoff` | Purple | Decision with meaningful downsides |
| `result` | Green | Measurable outcome — use at the end of a section |

**When to use:** After explaining a decision or finding. Not as a standalone section opener.

---

### `<MetricStrip>` + `<Metric>`

Proof numbers in a horizontal strip. Max 4 display cleanly.

```mdx
<MetricStrip>
  <Metric label="Peak concurrent viewers" value="500+" />
  <Metric label="Avg. transcode time" value="~12s" />
  <Metric label="Queue overflow rate" value="0%" />
  <Metric label="Services" value="5" />
</MetricStrip>
```

**When to use:** Near the top of a case study (after the opening paragraph) and at the end (in a results section). Values must be real. Use "~" for approximations, "+" for lower bounds.

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

**When to use:** For screenshots, architecture diagrams saved as PNG, or any image that needs a caption. Prefer `<FlowMap>` or `<Diagram>` for architecture diagrams you can express programmatically.

---

### `<Timeline>` + `<Event>`

Chronological decision log. The `note` field is optional.

```mdx
<Timeline>
  <Event date="Week 1" label="Designed service boundaries" note="Changed the architecture twice before writing code." />
  <Event date="Week 2" label="FFmpeg + BullMQ working end-to-end" note="First transcode at 3am." />
  <Event date="Week 3" label="MinIO + Docker Compose" />
</Timeline>
```

**When to use:** When documenting the progression of a project over time. Shows you didn't build it in one shot — shows real engineering process.

---

### `<Diagram>`

Mermaid diagram. Write Mermaid syntax as plain text children.

```mdx
<Diagram>
sequenceDiagram
  participant C as Client
  participant S as Server
  C->>S: POST /upload
  S-->>C: 202 Accepted
</Diagram>
```

Supported types: `sequenceDiagram`, `flowchart`, `graph`, `classDiagram`, `erDiagram`, `gantt`, `pie`.

**When to use:** Sequence diagrams for request/response flows. Flow charts for decision logic. Use `<FlowMap>` or `<StepThrough>` for architecture overviews — they are more interactive.

---

### `<FlowMap>`

Static React Flow node graph. Pannable and zoomable.

**`nodes` and `edges` must be JSON strings.**

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
- `"store"` — sharp rectangle (databases, queues, storage)
- `"client"` — pill shape (browsers, apps)

**When to use:** Architecture overviews where the reader doesn't need to step through — just see the whole picture. For guided walkthroughs, use `<StepThrough>` instead.

---

### `<StepThrough>`

Interactive React Flow graph. Nodes and edges highlight per step as the reader clicks through.

**All complex props must be JSON strings.**

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
      "description":"Browser sends multipart/form-data to the Upload Service.",
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
- `label` — short title in the control bar (required)
- `description` — explanation shown next to the label (optional but recommended)
- `active` — node IDs to highlight blue in this step
- `activeEdges` — `"from→to"` strings to animate (optional)

**When to use:** Any multi-stage pipeline where the reader benefits from being walked through step by step. Prefer this over static diagrams for complex flows.

---

### `<Pipeline>`

Horizontal or vertical labeled steps with hover tooltips. Use for inline process flows.

**`steps` must be a JSON string.**

```mdx
<Pipeline steps='[
  {"label":"Upload Service","detail":"Receives chunked file, writes to disk"},
  {"label":"BullMQ","detail":"Pushes job record to Redis queue"},
  {"label":"Transcode Worker","detail":"Separate Node.js process picks up job"},
  {"label":"FFmpeg","detail":"Four sequential renditions at 360p–1080p"},
  {"label":"MinIO","detail":"Streams all .ts segments and playlists"}
]' />
```

Add `layout="vertical"` for a numbered vertical list (use when steps have longer `detail` text).

**When to use:** Inline within prose to show a process sequence without breaking the reading flow. Cleaner than ASCII art or a bulleted list. Use `<StepThrough>` when the architecture has branching or parallel paths.

---

### `<FileTree>`

Visual file system tree with expand/collapse and file-type icons.

**`tree` must be a JSON string.**

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
- `highlight` — `true` draws the name in blue (optional)
- `children` — nested nodes, only for `type: "dir"` (optional)

**When to use:** Whenever you'd otherwise write a code block with indented paths. Shows the real structure with context notes.

---

### `<VideoMath>`

Interactive HLS file count calculator with a duration slider.

```mdx
<VideoMath />
```

Optional configuration props:

```mdx
<VideoMath segmentLength={6} renditionCount={3} title="HLS Segment Calculator" />
```

| Prop | Default | Description |
|---|---|---|
| `segmentLength` | `4` | Seconds per HLS segment |
| `renditionCount` | `4` | Number of quality renditions |
| `title` | `"HLS File Count Calculator"` | Header label |

**When to use:** In articles or case studies about HLS/adaptive streaming. Makes the math tangible. Good directly before or after the `<RenditionTable>`.

---

### `<RenditionTable>`

Hoverable bitrate table with animated bar charts.

```mdx
<RenditionTable />
```

With default HLS renditions. Or pass custom data:

```mdx
<RenditionTable
  title="Output Renditions — libvpx-vp9 · Opus"
  rows='[
    {"name":"360p","res":"640×360","videoBitrate":500,"audioBitrate":64,"preset":"good"},
    {"name":"720p","res":"1280×720","videoBitrate":1500,"audioBitrate":128,"preset":"good"},
    {"name":"1080p","res":"1920×1080","videoBitrate":3000,"audioBitrate":192,"preset":"good"}
  ]'
/>
```

**Row fields:** `name`, `res`, `videoBitrate` (kbps), `audioBitrate` (kbps), `preset`.

**When to use:** After explaining transcoding configuration. Shows the quality ladder visually. Use the default props for H.264 HLS; pass `rows` for any other codec configuration.

---

### `<Tabs>`

Tabbed content panels. Great for showing the same concept in multiple languages or frameworks.

```mdx
<Tabs>
  <Tab label="Node.js">

  ```javascript
  const result = await db.query("SELECT * FROM users");
  ```

  </Tab>
  <Tab label="Python">

  ```python
  result = db.execute("SELECT * FROM users")
  ```

  </Tab>
</Tabs>
```

**When to use:** Alternative implementations of the same thing. Before/after where the content is more than a few lines (use `<Comparison>` for short code blocks). Configuration options for different environments.

---

### `<Comparison>`

Side-by-side before/after code panels. Toggle between split view, before only, and after only.

```mdx
<Comparison
  beforeLabel="Synchronous (blocks the thread)"
  afterLabel="Async (non-blocking)"
  language="javascript"
  before={`function fetchData(url) {
  const response = http.get(url); // blocks
  return JSON.parse(response.body);
}`}
  after={`async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}`}
/>
```

**Props:**
- `before` — code string for the left/before panel (required)
- `after` — code string for the right/after panel (required)
- `beforeLabel` — label for the before panel (default: `"Before"`)
- `afterLabel` — label for the after panel (default: `"After"`)
- `language` — shown in the toolbar (default: `"javascript"`)

**When to use:** Refactoring explanations, API evolution, "the wrong way vs the right way". Keep both panels under ~20 lines for best mobile display.

---

### `<Accordion>` + `<AccordionItem>`

Collapsible sections. Good for FAQs, deep dives, or "further reading" that would interrupt flow if always visible.

```mdx
<Accordion>
  <AccordionItem title="Why not use WebSockets instead?">
    WebSockets maintain a persistent connection, which adds server-side state.
    For video playback, HLS over HTTP means the client can use standard CDN caching —
    every segment request is a plain cacheable GET.
  </AccordionItem>
  <AccordionItem title="What about DASH?">
    MPEG-DASH is the open standard equivalent of Apple's HLS. Both work the same way
    conceptually. HLS has broader browser support without additional libraries.
  </AccordionItem>
</Accordion>
```

Add `defaultOpen` to expand an item on load:

```mdx
<AccordionItem title="The most important question" defaultOpen>
  ...
</AccordionItem>
```

**When to use:** Trade-off questions that interrupt the main narrative. "Why didn't you use X?" answers. Supplementary context that some readers need but most don't.

---

### `<Quiz>`

Multiple choice knowledge check. Reveals the correct answer with explanation.

**`options` must be a JSON string.**

```mdx
<Quiz
  question="What happens when the JavaScript call stack is empty?"
  options='[
    "The program exits",
    "The event loop checks the task queue for pending callbacks",
    "Nothing — JavaScript pauses until user input",
    "The garbage collector runs"
  ]'
  correct={1}
  explanation="When the call stack is empty, the event loop dequeues the first callback from the task queue and pushes it onto the stack. This is how setTimeout, Promise.then, and I/O callbacks are executed."
/>
```

**Props:**
- `question` — the question text (required)
- `options` — JSON string array of answer choices (required)
- `correct` — 0-based index of the correct answer (required)
- `explanation` — shown after answering, whether correct or wrong (optional but recommended)

**When to use:** After explaining a key concept in an article. Forces active recall. Place at natural "did you get this?" moments — after a concept explanation, before moving to the next topic. Don't overuse: max 2–3 per article.

---

## The JSON String Rule

`<FlowMap>`, `<StepThrough>`, `<Pipeline>`, `<FileTree>`, `<RenditionTable>`, and `<Quiz>` accept complex props as **JSON strings**, not JavaScript object literals.

**Write this:**
```mdx
options='["A","B","C"]'
```

**Not this — will break the build:**
```mdx
options={["A","B","C"]}
```

**Why:** Turbopack cannot serialize arrays/objects across the RSC boundary as inline JSX props. Passing a plain string sidesteps the boundary — the component calls `JSON.parse` internally.

Components that accept string props: `FlowMap`, `StepThrough`, `Pipeline`, `FileTree`, `RenditionTable` (rows), `Quiz` (options).

Components that use normal MDX syntax: `Callout`, `MetricStrip`, `Figure`, `Timeline`, `Diagram`, `VideoMath`, `Tabs`, `Tab`, `Accordion`, `AccordionItem`, `Comparison`.

---

## Code Blocks

Standard fenced code blocks with language tags. Highlighted by Shiki (`github-light` theme).

````mdx
```typescript
const lenis = new Lenis({ duration: 1.2 });
```
````

Supported: `javascript`, `typescript`, `bash`, `json`, `yaml`, `go`, `python`, `sql`, and all other Shiki languages.

For inline code, use backticks: `const x = 1`.

---

## When to Create a New Component

Create a new component when:

1. You need a **domain-specific interactive widget** that doesn't fit existing components (e.g., a database query planner simulator, a JWT decoder, a regex tester).
2. You need **a table format that can't be expressed with `<RenditionTable>`** — e.g., a comparison matrix with more than 5 columns, or a table where cells need custom formatting.
3. You need **a multi-step interaction that requires state across multiple nodes** — not just "which step am I on" but "what did the user input in step 2".

**Before creating a new component, verify:**
- `<Tabs>` + code blocks can't solve it
- `<Comparison>` can't solve it
- `<Pipeline layout="vertical">` with detailed `detail` fields can't solve it
- `<Accordion>` with nested content can't solve it

**If you do create a new component:**
- Place it in `app/components/mdx/`
- Add `"use client"` if it uses state or browser APIs
- Add a dynamic import wrapper to `ClientComponents.tsx` (see existing pattern)
- Register it in `app/components/mdx/index.tsx`
- All props must have defaults — the component must render without throwing even if props are missing
- Follow the same inline-style pattern (no Tailwind classes in MDX components)
- Follow the same color palette: `#0070f3` blue, `#16a34a` green, `#d97706` amber, `#7c3aed` purple, `#dc2626` red
- Document it in this file

---

## Content Structure Templates

### Case Study Template

```mdx
---
title: "What the Problem Actually Was"
date: "2025-06-01"
description: "One sentence about the problem and what the outcome was."
tags: ["Node.js", "Redis", "Docker"]
status: "published"
type: "case-study"
github: "https://github.com/..."
---

Opening paragraph: the problem from the user's perspective. One or two sentences. No technical terms yet.

<MetricStrip>
  <Metric label="Key metric 1" value="X" />
  <Metric label="Key metric 2" value="Y" />
  <Metric label="Key metric 3" value="Z" />
</MetricStrip>

## The Problem

What was wrong, what was breaking, what constraint made this hard. Lead with reality, not solution.

## The Architecture

<StepThrough ... />

Walk through the design decisions. Use `<Callout type="tradeoff">` when a decision had real downsides.

## Implementation

Key code patterns. `<FileTree>` for structure. `<Pipeline>` for request flows.

## Results

<Callout type="result">
  Specific measurable outcome.
</Callout>

## Lessons Learned

What you'd do differently. Honest, not defensive.
```

### Blog Article Template

```mdx
---
title: "The Specific Claim This Article Proves"
date: "2025-06-01"
description: "One sentence that tells the reader exactly what they'll learn."
tags: ["JavaScript", "Performance"]
status: "published"
type: "blog"
---

Opening: the problem most developers don't notice, or the assumption most developers hold that is wrong.

## Why This Matters

The consequence of not knowing this. Real example.

## How It Actually Works

Use `<Diagram>` or `<Pipeline>` to show the mechanism.

<Quiz
  question="..."
  options='[...]'
  correct={N}
  explanation="..."
/>

## The Fix / The Pattern

Code, `<Comparison>`, `<Tabs>` for alternatives.

## When to Apply This

Specific conditions. Not "always" or "never".

<Callout type="result">
  Concrete outcome when applied correctly.
</Callout>
```

---

## Publishing Checklist

- [ ] `status` is `"published"`
- [ ] `date` is accurate (used for sort order)
- [ ] `description` is one sentence, under 160 characters
- [ ] Every `<Metric>` value is a real number
- [ ] `<Callout type="result">` present if there is a measurable outcome
- [ ] At least one interactive component (`<StepThrough>`, `<Quiz>`, `<Tabs>`, `<Comparison>`, or `<Pipeline>`) per 600 words
- [ ] No three consecutive prose paragraphs without a visual component
- [ ] `github` and/or `live` URLs filled in if the project has them
- [ ] Run `npm run build` and confirm the route appears in build output

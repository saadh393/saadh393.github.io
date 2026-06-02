Write naturally. The writing should feel like it came from a real person thinking through a topic, not from a language model trying to sound intelligent. Clarity matters more than polish. Simplicity matters more than sounding impressive.

## The tone should resemble an experienced engineer casually explaining ideas in a blog post or discussion. Not a keynote speaker. Not a copywriter. Not a marketing team.

Maintain human rhythm. Some sentences can be short. Some paragraphs can be uneven. Do not force symmetry or perfectly balanced structure.

Rules:

- No titles with colons.
- No buzzword phrases like:
  - AI-powered
  - developer-first
  - production-grade
  - future-ready

- No corporate vocabulary:
  - leverage
  - synergy
  - ecosystem
  - robust
  - cutting-edge

- No dramatic wording or TED-talk style language.
- No fake authority or exaggerated certainty.
- No em dashes for drama.
- No repetitive “faster, cheaper, more scalable” sentence patterns.
- Avoid transition fillers like:
  - however
  - moreover
  - furthermore
  - additionally

- Avoid motivational tone unless requested.
- Avoid over-polished paragraphs and perfect symmetry.
- Avoid stacked adjectives before nouns.
- Avoid predictable endings like:
  - “the future is bright”
  - “only time will tell”

Writing style requirements:

- Prefer simple wording over intellectual-sounding wording.
- Use contractions naturally.
- Vary sentence length and openings.
- Keep paragraph rhythm uneven and natural.
- Prefer concrete examples over abstraction.
- Slight roughness is okay.
- Clarity matters more than polish.
- Personality comes after readability.
- The writing should feel like a real person thinking through ideas, not generated output.

## Design Principles

Every piece of content must follow these rules:

1. Lead with the problem, end with the outcome — every section, every paragraph.
2. No adjectives without proof — not "scalable" unless you show the scale.
3. Real numbers only — never placeholder metrics. If a real number isn't known, describe the constraint instead.
4. Clarity over cleverness — plain language. Assume the reader is a smart developer who hasn't seen this problem before.
5. Interactive over static — prefer `<StepThrough>` over a diagram, `<Quiz>` over a summary paragraph, `<Tabs>` over code blocks with a note saying "here's the alternative".
6. Visual components break walls of text — aim for at most 3 consecutive prose paragraphs before a component.

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
status: "published" # "draft" = excluded from build entirely
type: "case-study" # or "blog"
github: "https://github.com/you/repo" # optional
live: "https://yourproject.com" # optional
---
```

**`description` rules:**

- One sentence, max ~160 chars.
- Specific, not generic. "How I built X" is bad. "Why keyword search fails at intent matching, and how vector embeddings fix it" is good.
- This appears in Google search snippets and OG cards.

---

## Artifacts Registry

You are allowed to use the bellow artifacts, or if you need custom, you can create a new artifact and update this registry.

All components are globally available in MDX. No import is needed.

| Component                         | Best For                                                                                                                          | Reference                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `<Callout>`                       | Use after a paragraph when one insight, warning, trade-off, or result needs emphasis without turning into a full section.         | [Callout](./artifacts/callout.md)                 |
| `<MetricStrip>` + `<Metric>`      | Use near the top or results section when 2 to 4 real numbers prove scale, speed, cost, or impact better than prose.               | [Metric Strip](./artifacts/metric-strip.md)       |
| `<Figure>`                        | Use for screenshots or static visuals that need alt text and a caption, especially when a programmable diagram would be overkill. | [Figure](./artifacts/figure.md)                   |
| `<Timeline>` + `<Event>`          | Use when the order of decisions matters and you want to show how the work evolved over days, weeks, or project phases.            | [Timeline](./artifacts/timeline.md)               |
| `<Diagram>`                       | Use for Mermaid sequence flows, decision logic, and protocol walkthroughs when plain text cannot show the shape clearly enough.   | [Diagram](./artifacts/diagram.md)                 |
| `<FlowMap>`                       | Use for a full architecture snapshot when readers should see every service and connection at once without a guided step flow.     | [Flow Map](./artifacts/flow-map.md)               |
| `<StepThrough>`                   | Use when the system needs a guided walkthrough and each step should highlight only the active nodes and edges.                    | [Step Through](./artifacts/step-through.md)       |
| `<Pipeline>`                      | Use inside implementation sections to show a short process sequence without breaking the article into a larger diagram.           | [Pipeline](./artifacts/pipeline.md)               |
| `<FileTree>`                      | Use when directory structure, generated files, or nested output matters and an indented code block would hide useful context.     | [File Tree](./artifacts/file-tree.md)             |
| `<VideoMath>`                     | Use in streaming or HLS writeups when the reader needs to feel the file-count math instead of just reading the formula.           | [Video Math](./artifacts/video-math.md)           |
| `<RenditionTable>`                | Use after explaining encoding choices when bitrate, resolution, and preset data need to be compared as a readable ladder.         | [Rendition Table](./artifacts/rendition-table.md) |
| `<Tabs>` + `<Tab>`                | Use when the same idea has multiple code, config, or framework variants and the reader only needs one view at a time.             | [Tabs](./artifacts/tabs.md)                       |
| `<Comparison>`                    | Use for before and after code, old and new APIs, or wrong and right implementations where a direct contrast teaches the point.    | [Comparison](./artifacts/comparison.md)           |
| `<Accordion>` + `<AccordionItem>` | Use for FAQs, objections, or side context that is useful but would slow down the main story if always expanded.                   | [Accordion](./artifacts/accordion.md)             |
| `<Quiz>`                          | Use after a dense explanation when you want the reader to check whether they actually understood the mechanism.                   | [Quiz](./artifacts/quiz.md)                       |
| `<HexagonalPlayground>`           | Use when introducing ports-and-adapters or hexagonal architecture so the reader can swap adapters live and see the registry update. | [Hexagonal Playground](./artifacts/hexagonal-playground.md) |
| `<UserJourneySimulator>`          | Use for multi-step user flows where each step picks an adapter and animates the call through business logic, port, adapter, and provider. | [User Journey Simulator](./artifacts/user-journey-simulator.md) |
| `<CodeEditor>`                    | Use when several related files need an IDE-style view with a sidebar tree, tabs, line numbers, and a status bar instead of stacked code blocks. | [Code Editor](./artifacts/code-editor.md) |
| `<GuestPass>`                     | Use mid-article in Claude Code writeups to offer the reader a 7-day Claude Code trial via a referral link, placed where they're already getting value. | [Guest Pass](./artifacts/guest-pass.md) |

If you create a new artifact, add a row here and create a matching file in `content/artifacts/`.

---

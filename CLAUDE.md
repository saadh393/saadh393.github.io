# Portfolio Build Plan

## Goal
Build a professional portfolio for Saad Hasan that stands out to job recruiters in 2026 — when AI-generated portfolios are everywhere. This is NOT a traditional showcase site. It is an **Engineer's Notebook meets Proof Board**: every section is backed by real metrics, honest framing, and specific outcomes. No generic claims. Only receipts.

## Strategic Direction: A + B

**A — The Engineer's Notebook**: Reads like an internal engineering document. Opinionated, specific, honest. Projects framed as problems solved, not features built. Lessons learned are visible. Shows intellectual curiosity and engineering depth.

**B — The Proof Board**: Zero claims without proof. Every stat is real. Every project has a measurable outcome. Skills shown by production usage, not skill bars.

## Design System
Strictly follow `@DESIGN_SYSTEM.md`. Light mode only. Geist + Geist Mono fonts. `#0070f3` as the single accent. No decorative gradients. No skill bars. No section dividers — seamless scroll journey.

## Site Structure

```
/ (Home)             — single scrolling page
/blog                — blog listing (future)
/blog/[slug]         — individual article (future)
/projects/[slug]     — case study page (future, anchor ready now)
```

## Home Page Sections (scroll order)

### 1. Navbar
- Hidden on page load, slides down on scroll (appears after Hero clears viewport)
- Logo: `SH` initials in Geist Mono
- Anchor links: Work · Writing · Contact
- Light frosted glass background on scroll: `rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)`
- No hamburger needed for desktop; mobile: clean drawer

### 2. Hero (already built — refine copy)
- Opening must be specific and opinionated, NOT "Hi, I'm a developer"
- Stat strip with real numbers: 10,000+ students, 1 Cr+ BDT revenue impact, 5 production apps, 6 published articles
- Role cycling: Frontend Engineer → React Specialist → Next.js Developer → JavaScript Engineer
- Social links: GitHub, LinkedIn, X

### 3. About / Philosophy
- 2–3 sentences, opinionated voice — not a résumé summary
- Strengths as short punchy labels (not adjective lists): "API Design" / "Debugging Depth" / "Modular Architecture" / "Research-Oriented"
- "Currently thinking about" — a rotating or static blurb showing intellectual curiosity (e.g., distributed systems, edge computing, AI pipelines)
- Stats: 10+ years since first line of code (2011), 4+ years professional, 5 production apps

### 4. Experience / Proof of Work
- NOT a job history. A **delivery history** — what shipped, for whom, what it did in the real world
- Analyzen Innovation Lab: frontend components, innovation lab context
- Learn with Sumit: LMS serving 10k+ students, 1 Cr+ BDT/year — frame it as proof of scale
- Each entry: role + company + period + 2–3 outcome-oriented bullets (not responsibility bullets)
- Timeline visual style — clean, not a table

### 5. Selected Projects (id: "work")
- 5 featured projects, proof card format
- **Lead with the problem, not the tech**
- Real metric or honest outcome on every card
- Stack as small pills
- Case study anchor (href="/projects/[slug]") for:
  - Distributed Video Streaming Platform
  - Semantic Search Engine
- GitHub link for: SSHM, others
- Live link for: Learn with Sumit LMS
- Rewrite descriptions — no "I built a platform that..." framing

**Featured order:**
1. Learn with Sumit LMS — scale proof (10k students, 1 Cr BDT)
2. Distributed Video Streaming — architecture depth
3. Semantic Search Engine — AI engineering
4. SSHM — CLI / Go — shows range
5. Unilever Frontline Academy — enterprise credibility

**Rewritten descriptions (use these):**
- **LMS**: "10,000 students couldn't afford broken video or a quiz that lost their progress. Built the full frontend infrastructure — watch-time tracking, DRM-protected HLS streaming, passkey auth, quiz flows, CV generator — deployed on AWS with Cloudflare edge. It handles 1 Cr+ BDT/year in revenue. It has to work."
- **Distributed Streaming**: "What actually happens when a user uploads a video and 500 people try to watch it simultaneously? Built a proof-of-concept to find out — independent microservices for upload, FFmpeg transcoding, BullMQ job queues, HLS packaging, and MinIO storage. Docker Compose as the orchestration layer."
- **Semantic Search**: "Keyword search fails when users describe what they want instead of naming it. Built a semantic product search engine using Pinecone vector embeddings and Google Gemini — understands 'something warm for winter' as intent, not just tokens."
- **SSHM**: "I was tired of memorizing IP addresses and SSH flags for every server. Built a terminal SSH manager in Go with a fuzzy-searchable TUI (Bubble Tea + Cobra). Save a host once, connect forever."
- **Unilever Frontline Academy**: "Enterprise LMS for Unilever Bangladesh's frontline workforce — hundreds of field employees, multiple device types, zero tolerance for downtime. Delivered production-ready React/Next.js frontend against high-fidelity Figma specs."

### 6. Writing (id: "writing")
- Section label: "Published Work" — not "Blog Posts"
- 3–4 article cards
- Each card: title, tag badge, date, read time, one-line takeaway (not topic description)
- Framed as proof of thinking depth, not content marketing
- "View all →" link to `/blog` (future page)

**Featured articles (use these rewrites):**
- HTTP Caching in Node.js — "Most Node.js apps skip HTTP caching entirely. Here's how to do it properly with Undici v7."
- JavaScript Execution Context — "You can't debug what you don't understand. This is how the JS engine actually runs your code."
- React useMemo — "Memoization isn't magic. Here's when it actually helps and when it's just noise."

### 7. Contact (id: "contact")
- Short human sentence: "I'm looking for frontend or full-stack roles where I can ship real things with real teams."
- Primary CTAs: Email button + LinkedIn button
- Secondary: Static contact form (Formspree — no backend required)
- Live timezone signal: "Currently [time] in Dhaka, Bangladesh" — updated client-side
- Availability badge: "Open to remote worldwide"

## Content Rules (enforce everywhere)
1. **No adjectives without proof** — not "scalable" or "clean" without a specific example
2. **Lead with problem, end with outcome** — every project description
3. **Real numbers always** — if a metric exists, use it
4. **No skill bars** — skills shown by production usage context only
5. **No section dividers** — seamless scroll, whitespace does the separating
6. **Rewrite all copy** — nothing from portfolio-info.json used verbatim if it sounds like a résumé

## Navigation Behavior
- Page loads: no navbar visible
- After scrolling past Hero (approx 100vh): navbar slides down, stays fixed
- Smooth scroll to sections on nav link click
- Mobile: same behavior, hamburger drawer if needed

## Technical Stack
- Next.js App Router (read AGENTS.md — breaking changes)
- React 19, `"use client"` for interactive components
- Tailwind CSS v4
- Geist + Geist Mono via `next/font/google`
- Formspree for contact form (no backend)
- All animations: `transform` + `opacity` only, gated with `prefers-reduced-motion`

## Profile Image
- Swap out current GitHub-hosted image
- User will provide new image — placeholder for now

## Future Pages (not in current scope, but anchor links ready)
- `/blog` — article listing
- `/blog/[slug]` — individual article
- `/projects/distributed-hls-streaming-platform` — case study
- `/projects/semantic-search` — case study

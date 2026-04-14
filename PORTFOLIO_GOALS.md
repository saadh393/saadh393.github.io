# Portfolio Goals

This document is the product specification for Saad Hasan's portfolio — the "what" and "why", not the "how to build".

**Strategic direction:** Engineer's Notebook meets Proof Board. Real metrics, honest framing, specific outcomes. No generic claims.

---

## Home Page Sections (scroll order)

### 1. Navbar
- Hidden on page load, slides down on scroll after Hero clears viewport
- Logo: `SH` in Geist Mono
- Anchor links: Work · Writing · Contact
- Frosted glass: `rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)`

### 2. Hero
- Specific, opinionated opening — NOT "Hi, I'm a developer"
- Stat strip: 10,000+ students, 1 Cr+ BDT revenue impact, 5 production apps, 6 published articles
- Role cycling: Frontend Engineer → React Specialist → Next.js Developer → JavaScript Engineer
- Social links: GitHub, LinkedIn, X

### 3. About
- 2–3 opinionated sentences, not résumé summary
- Strength labels: "API Design" / "Debugging Depth" / "Modular Architecture" / "Research-Oriented"
- "Currently thinking about" blurb
- Stats: 10+ years coding (2011), 4+ years professional, 5 production apps

### 4. Experience
- Delivery history, not job history — what shipped, for whom, what it did
- Analyzen Innovation Lab + Learn with Sumit (10k students, 1 Cr BDT/year)
- Timeline visual style

### 5. Selected Projects (id: "work")
5 featured projects in proof card format. Lead with problem, end with outcome. Real metric on every card.

1. **Learn with Sumit LMS** — 10k students, 1 Cr BDT/year revenue
2. **Distributed Video Streaming** — microservices architecture depth
3. **Semantic Search Engine** — AI engineering with Pinecone + Gemini
4. **SSHM** — CLI/Go shows range
5. **Unilever Frontline Academy** — enterprise credibility

### 6. Writing (id: "writing")
- "Published Work" label
- 3–4 article cards: title, tag badge, date, read time, one-line takeaway
- "View all →" to `/blog` (future)

### 7. Contact (id: "contact")
- "I'm looking for frontend or full-stack roles where I can ship real things with real teams."
- Email + LinkedIn CTAs
- Formspree contact form
- Live timezone: "Currently [time] in Dhaka, Bangladesh"
- "Open to remote worldwide"

---

## Content Rules

1. **No adjectives without proof** — no "scalable" without a specific example
2. **Lead with problem, end with outcome** — every project description
3. **Real numbers always** — if a metric exists, use it
4. **No skill bars** — skills shown by production usage context only
5. **No section dividers** — seamless scroll, whitespace separates
6. **Rewrite all copy** — nothing from portfolio-info.json used verbatim

## Navigation
- Page loads: no navbar
- After ~100vh: navbar slides down, stays fixed
- Smooth scroll to sections on nav link click
- Mobile: hamburger drawer

## Profile Image
- Placeholder for now — user will provide new image

## Future Pages (anchor links ready)
- `/blog` — article listing
- `/blog/[slug]` — individual article
- `/projects/distributed-hls-streaming-platform` — case study
- `/projects/semantic-search` — case study

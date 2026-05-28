# Rendition Table

`<RenditionTable>` shows bitrate ladder data in a format that is easier to scan than raw prose or markdown tables. Use it when you need to compare renditions by resolution, bitrate, and preset.

- Component: `app/components/mdx/RenditionTable.tsx`
- Props:
- `rows`: optional array or JSON string of renditions with `name`, `res`, `videoBitrate`, `audioBitrate`, and `preset`
- `title`: optional table heading
- `footer`: optional footer text
- When to use: after encoding decisions, codec breakdowns, and adaptive streaming explanations

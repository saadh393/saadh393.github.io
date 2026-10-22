# Prompt Cost Chart

`<PromptCostChart>` shows accuracy and cost per million requests for each prompting technique as two isometric bar groups with no frame around them. Each technique keeps one color (amber, green, blue in row order). Hovering, focusing or tapping a bar or its legend chip dims the others and shows that technique's numbers under the chart.

- Component: `app/components/mdx/PromptCostChart.tsx`
- Bars: `app/components/mdx/IsoBarGroup.tsx`
- Data helpers: `lib/promptTrade.ts`
- Colors: `seriesAt()` in `app/components/mdx/palette.ts`
- Props:
- `title`: optional header label
- `cases`: JSON string of `{ label, unit, items?, note?, rows: [{ name, accuracy, costPerMillion }] }`. `items` adds "x of y wrong" to the detail line. More than one case adds a toggle
- When to use: in results sections of LLM evaluation writeups where accuracy and cost have to be read together

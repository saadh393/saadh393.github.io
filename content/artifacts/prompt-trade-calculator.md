# Prompt Trade Calculator

`<PromptTradeCalculator>` lets the reader set what one wrong answer costs and how many requests they run per month, then shows the prompt bill plus the cost of mistakes for each technique. It has no frame, uses the same technique colors as `<PromptCostChart>`, and shows mistakes in red.

- Component: `app/components/mdx/PromptTradeCalculator.tsx`
- Math: `lib/promptTrade.ts`
- Props:
- `title`: optional header label
- `cases`: JSON string, same shape as `<PromptCostChart>`
- When to use: after the results, when the right choice depends on the reader's own cost of a mistake

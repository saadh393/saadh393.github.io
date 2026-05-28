# Comparison

`<Comparison>` puts two code examples in direct contrast so the change is obvious. Use it when the point depends on what changed between before and after, not just on the final code alone.

- Component: `app/components/mdx/Comparison.tsx`
- Props:
- `children`: optional two-panel content blocks
- `before` and `after`: optional string versions of the left and right code
- `beforeLabel`, `afterLabel`, `language`: optional labels and toolbar language
- When to use: for refactors, API migrations, mistakes versus fixes, and side-by-side code review

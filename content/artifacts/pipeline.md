# Pipeline

`<Pipeline>` presents a short ordered process in either a compact horizontal line or a taller vertical list. Use it when you want the reader to follow a sequence quickly without switching to a larger diagram.

- Component: `app/components/mdx/Pipeline.tsx`
- Props:
- `steps`: required array or JSON string of `{ label, detail? }`
- `layout`: optional `horizontal | vertical`, defaults to `horizontal`
- When to use: for request flow summaries, implementation stages, and step lists inside prose sections

# Hexagonal Playground

`<HexagonalPlayground>` is an interactive visualization of ports and adapters. Readers can swap which adapter is wired to each port and watch the registry update.

- Component: `app/components/mdx/HexagonalPlayground.tsx`
- Props:
- `ports`: required JSON string of `{ id, label, method, adapters: [{ id, label, note? }] }`
- `title`: optional toolbar label
- When to use: when introducing hexagonal or ports-and-adapters architecture and you want the reader to feel the swap, not just read about it

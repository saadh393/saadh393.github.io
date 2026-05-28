# Diagram

`<Diagram>` renders Mermaid syntax inside a zoomable, pannable frame. Use it when sequence flows or decision logic need visual structure but you still want to write the source as plain text.

- Component: `app/components/mdx/Diagram.tsx`
- Props:
- `children`: Mermaid diagram text
- `title`: optional toolbar label
- `zoomLevel`: optional initial zoom, defaults to `1`
- When to use: for sequence diagrams, flowcharts, ER diagrams, and other Mermaid-supported formats

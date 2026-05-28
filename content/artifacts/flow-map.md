# Flow Map

`<FlowMap>` shows a full node graph at once using React Flow. Use it when the reader should see the whole architecture immediately, without stepping through one stage at a time.

- Component: `app/components/mdx/FlowMap.tsx`
- Props:
- `nodes`: required JSON string of nodes with `id`, `label`, `x`, `y`, and optional `type`
- `edges`: required JSON string of edges with `from`, `to`, and optional `label`
- `height`: optional number, defaults to `280`
- When to use: for static architecture overviews, service maps, and system boundaries

# Step Through

`<StepThrough>` walks the reader through a flow by highlighting different nodes and edges at each step. Use it when the system is easier to understand as a guided sequence instead of a single static diagram.

- Component: `app/components/mdx/StepThrough.tsx`
- Props:
- `title`: required heading shown above the graph
- `nodes`: required JSON string of nodes with `id`, `label`, `x`, `y`, and optional `type`
- `edges`: required JSON string of edges with `from`, `to`, and optional `label`
- `steps`: required JSON string of steps with `label`, optional `description`, `active`, and optional `activeEdges`
- When to use: for pipelines, request lifecycles, and multi-stage system walkthroughs

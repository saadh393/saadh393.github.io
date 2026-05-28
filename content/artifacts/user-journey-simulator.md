# User Journey Simulator

`<UserJourneySimulator>` walks the reader through a multi-step user flow where each step picks an adapter, animates the call through business logic → port → adapter → provider, and logs the outcome. Use it when the point depends on the reader feeling that swapping an adapter has no effect on the calling code.

- Component: `app/components/mdx/UserJourneySimulator.tsx`
- Props:
- `steps`: required JSON string of `{ id, title, description?, call, portLabel, adapters: [{ id, label, provider, hint? }], successLine }`
- `title`: optional toolbar label
- `scenario`: optional scenario line shown above the steps
- When to use: when introducing dependency direction, ports-and-adapters at runtime, or any flow where the reader should simulate choices and watch the registry resolve them

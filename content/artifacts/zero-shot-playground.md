# Zero-Shot Playground

`<ZeroShotPlayground>` shows how CLIP-style zero-shot scoring turns cosine similarities into label probabilities. The reader can switch labels on and off and change the logit scale to see how softmax redistributes probability.

- Component: `app/components/mdx/ZeroShotPlayground.tsx`
- Scoring: `lib/zeroShot.ts`
- Props:
- `title`: optional header label
- `image`: optional name of the image being scored
- `labels`: JSON string of `{ text, kind: "find" | "keep", similarity, on? }`
- `threshold`: optional junk score needed to flag the image, defaults to `0.6`
- When to use: in zero-shot classification writeups, to show that the label list changes the result

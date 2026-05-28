# Quiz

`<Quiz>` gives the reader a quick knowledge check after a dense explanation. Use it when you want to confirm they understood the mechanism instead of just reading past it.

- Component: `app/components/mdx/Quiz.tsx`
- Props:
- `question`: required prompt
- `options`: required string array or JSON string of answer choices
- `correct`: required zero-based correct answer index
- `explanation`: optional reveal text
- When to use: after technical sections where one short check improves retention

# Guest Pass

`<GuestPass>` offers the reader a Claude Code Guest Pass: a 7-day trial unlocked through a referral link. Drop it mid-article in a Claude Code or token-cost writeup, where the reader is already seeing value, not at the end.

- Component: `app/components/mdx/GuestPass.tsx`
- Props:
- `url`: the referral link (required)
- `heading`: optional headline, has a sensible default
- `note`: optional line under the heading explaining the pass and its "never had a paid plan" limit
- `cta`: optional button label, defaults to `Activate the Guest Pass`
- When to use: once per article, in the first half, near content about Claude Code itself

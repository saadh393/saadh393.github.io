export interface Article {
  title: string;
  date: string;
  readTime: string;
  tag: string;
  description: string;
  link: string;
}

export const articles: Article[] = [
  {
    title: "Adapter Port Architecture In Two Real Codebases",
    date: "May 28, 2026",
    readTime: "12 min",
    tag: "Architecture",
    description:
      "How adapter port architecture turned a 30-file email provider swap and a six-week API delay into boring one-line changes, with the concept explained from scratch.",
    link: "/blog/adapter-port-architecture-two-cases",
  },
  {
    title: "Why AI Coding Agents Cost So Much (And How to Cut the Bill)",
    date: "May 14, 2026",
    readTime: "9 min",
    tag: "AI",
    description:
      "Claude Code and Codex can burn $50–$100 in an afternoon. Here's where the tokens actually go, why the math is the way it is, and the levers that cut bills by 80%.",
    link: "/blog/balance-ai-optimize-token-usage",
  },
  {
    title: "Bézier Curves in JavaScript — From the Math to the Canvas",
    date: "Apr 14, 2026",
    readTime: "10 min",
    tag: "Graphics",
    description:
      "Every smooth curve in Figma, SVG, or CSS easing is a Bézier curve. Here is how they actually work — built from scratch with interactive demos.",
    link: "/blog/bezier-curves-javascript",
  },
  {
    title: "How Diffie–Hellman Became the Backbone of Modern Encryption",
    date: "Apr 13, 2026",
    readTime: "9 min",
    tag: "Security",
    description:
      "How two strangers agree on a secret key over a public network without ever sending it — the math behind every HTTPS connection and Signal message.",
    link: "/blog/diffie-hellman-key-exchange",
  },
  {
    title: "Understanding JavaScript's Execution Context",
    date: "Mar 23, 2024",
    readTime: "6 min",
    tag: "JavaScript",
    description: "You can't debug what you don't understand. This is how the JS engine actually runs your code.",
    link: "/blog/javascript-execution-context",
  },
  {
    title: "HTTP Caching in Node.js with Undici",
    date: "Apr 14, 2026",
    readTime: "8 min",
    tag: "Node.js",
    description: "Most Node.js apps skip HTTP caching entirely. Here's how to do it properly with Undici v7.",
    link: "/blog/http-caching-nodejs-undici",
  },
  {
    title: "The Node.js Event Loop, Explained Properly",
    date: "May 23, 2025",
    readTime: "16 min",
    tag: "Node.js",
    description:
      "The async flow, the thread pool, and the V8 phases — what actually runs, in what order, and why your setTimeout fires when it does.",
    link: "https://medium.com/@saadh393/the-event-loop-explained-like-youre-a-top-1-node-js-engineer-f9fea55b00f9",
  },
  {
    title: "Understanding Idempotency to Build Trustworthy Systems",
    date: "Sep 6, 2025",
    readTime: "7 min",
    tag: "Backend",
    description:
      "Retries are inevitable. Idempotency is what stops a retry from charging a customer twice.",
    link: "https://saadh393.medium.com/understand-idempotency-to-build-trustworthy-systems-44010cd98a9a",
  },
  {
    title: "Concurrency, Parallelism, and Sequential Execution",
    date: "May 15, 2025",
    readTime: "4 min",
    tag: "Node.js",
    description:
      "Three execution models people use interchangeably and shouldn't, compared side by side with visual walkthroughs.",
    link: "https://medium.com/@saadh393/understanding-concurrency-parallelism-and-sequential-execution-46f30c55ca07",
  },
  {
    title: "React useMemo Hook",
    date: "Sep 7, 2023",
    readTime: "5 min",
    tag: "React",
    description: "Memoization isn't magic. Here's when it actually helps and when it's just noise.",
    link: "https://saadh393.hashnode.dev/react-usememo-hook",
  },
  {
    title: "Building React Custom Hooks from Scratch",
    date: "Jul 2, 2023",
    readTime: "7 min",
    tag: "React",
    description: "Extracting reusable stateful logic into custom hooks — the pattern that changed how I write React.",
    link: "https://saadh393.hashnode.dev/building-react-custom-hooks-from-scratch",
  },
];

export const tagColors: Record<string, string> = {
  "Node.js": "#16a34a",
  JavaScript: "#d97706",
  React: "#0070f3",
  Security: "#7c3aed",
  Graphics: "#0891b2",
  Backend: "#888888",
  AI: "#dc2626",
  Architecture: "#0891b2",
};

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
    description:
      "You can't debug what you don't understand. This is how the JS engine actually runs your code.",
    link: "/blog/javascript-execution-context",
  },
  {
    title: "HTTP Caching in Node.js with Undici",
    date: "Apr 14, 2026",
    readTime: "8 min",
    tag: "Node.js",
    description:
      "Most Node.js apps skip HTTP caching entirely. Here's how to do it properly with Undici v7.",
    link: "/blog/http-caching-nodejs-undici",
  },
  {
    title: "React useMemo Hook",
    date: "Sep 7, 2023",
    readTime: "5 min",
    tag: "React",
    description:
      "Memoization isn't magic. Here's when it actually helps and when it's just noise.",
    link: "https://saadh393.hashnode.dev/react-usememo-hook",
  },
  {
    title: "Building React Custom Hooks from Scratch",
    date: "Jul 2, 2023",
    readTime: "7 min",
    tag: "React",
    description:
      "Extracting reusable stateful logic into custom hooks — the pattern that changed how I write React.",
    link: "https://saadh393.hashnode.dev/building-react-custom-hooks-from-scratch",
  },
];

export const tagColors: Record<string, string> = {
  "Node.js": "#16a34a",
  JavaScript: "#d97706",
  React: "#0070f3",
  Security: "#7c3aed",
  Backend: "#888888",
};

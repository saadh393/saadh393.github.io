const blogs = [
  {
    title: "HTTP Caching in Node.js with Undici",
    date: "March 24, 2024",
    description:
      "Learn how to implement efficient HTTP caching in Node.js applications using Undici v7.0.0. Explore standards-compliant caching mechanisms and best practices.",
    link: "/blogs/http-caching-in-node-js-with-undici",
    featured: true,
  },
  {
    title: "Understanding JavaScript's Execution Context",
    date: "March 23, 2024",
    description: "Understanding the foundation of JavaScript code execution",
    link: "/blogs/javascript-execution-context",
    featured: true,
  },
  {
    title: "React useMemo Hook",
    date: "Sep 7, 2023",
    description:
      "Core fundamental of React useMemo hook | Understanding the necessity of using useMemo hook",
    link: "https://saadh393.hashnode.dev/react-usememo-hook",
    featured: true,
  },
  {
    title: "useLocalStorage Hook",
    date: "July 3, 2023",
    description: "Building React Custom Hooks from Scratch",
    link: "https://saadh393.hashnode.dev/uselocalstorage-hook-building-react-custom-hooks-from-scratch",
    featured: true,
  },
  {
    title: "Building React Custom Hooks from Scratch",
    date: "July 2, 2023",
    description: "Supercharge Your React Components with Custom Hooks",

    link: "https://saadh393.hashnode.dev/building-react-custom-hooks-from-scratch",
    featured: true,
  },
  {
    title: "Getting Started with Prisma.js",
    date: "June 24, 2023",
    description: "A high level overview of Prisma.js for Beginners",
    link: "https://saadh393.hashnode.dev/getting-started-with-prismajs",
    featured: true,
  },
];

export const getFeaturedBlogs = () => blogs.filter((blog) => blog.featured);
export const getAllBlogs = () => blogs;

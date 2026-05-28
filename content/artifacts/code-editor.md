# Code Editor

`<CodeEditor>` renders a multi-file editor with a sidebar tree, file tabs, line numbers, breadcrumb, and a status bar. Code is highlighted with Shiki on the client. Use it when several related files need to live in one cohesive view and Tabs alone feel too flat.

- Component: `app/components/mdx/CodeEditor.tsx`
- Props:
- `files`: required JSON string of `{ path, language?, code, badge? }`. Path drives the sidebar tree.
- `title`: optional toolbar title
- `showSidebar`: optional boolean (default `true`)
- `defaultActive`: optional starting tab index
- When to use: when showing a port + multiple adapters as separate files, walking through a project layout with real code, or any case where readers benefit from seeing the file paths alongside the code

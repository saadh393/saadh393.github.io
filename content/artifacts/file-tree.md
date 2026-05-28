# File Tree

`<FileTree>` renders nested files and folders with expandable directories and small annotations. Use it when structure matters and a plain code block would hide which files are important.

- Component: `app/components/mdx/FileTree.tsx`
- Props:
- `tree`: required array or JSON string of nodes with `name`, `type`, optional `note`, optional `highlight`, and optional `children`
- `title`: optional header label
- When to use: for project layout, generated outputs, storage structure, and nested config examples

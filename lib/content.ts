import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentType = "projects" | "blog";

export interface FrontMatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  status: "published" | "draft";
  type: "case-study" | "blog";
  github?: string;
  live?: string;
}

export interface ContentItem {
  slug: string;
  frontmatter: FrontMatter;
  content: string;
}

const contentRoot = path.join(process.cwd(), "content");

export function getSlugs(type: ContentType): string[] {
  const dir = path.join(contentRoot, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getContent(type: ContentType, slug: string): ContentItem {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as FrontMatter,
    content,
  };
}

export function getAllContent(type: ContentType): ContentItem[] {
  return getSlugs(type)
    .map((slug) => getContent(type, slug))
    .filter((item) => item.frontmatter.status === "published")
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

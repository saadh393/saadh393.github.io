import { mdxComponents } from "@/app/components/mdx";
import { CaseStudyFooter } from "@/app/components/mdx/CaseStudyFooter";
import { getContent, getSlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const prettyCodeOptions = {
    theme: "github-light",
    keepBackground: true,
} as const;

export async function generateStaticParams() {
    const slugs = getSlugs("blog");
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    try {
        const { frontmatter } = getContent("blog", slug);
        const url = `https://saadhasan.dev/blog/${slug}`;
        return {
            title: frontmatter.title,
            description: frontmatter.description,
            keywords: frontmatter.tags,
            authors: [{ name: "Saad Hasan", url: "https://saadhasan.dev" }],
            alternates: { canonical: url },
            openGraph: {
                type: "article",
                url,
                title: frontmatter.title,
                description: frontmatter.description,
                publishedTime: frontmatter.date,
                authors: ["Saad Hasan"],
                tags: frontmatter.tags,
                images: [
                    {
                        url: `/api/og?title=${encodeURIComponent(frontmatter.title)}&type=article&tags=${encodeURIComponent(frontmatter.tags.slice(0, 3).join(", "))}`,
                        width: 1200,
                        height: 630,
                        alt: frontmatter.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: frontmatter.title,
                description: frontmatter.description,
                images: [
                    `/api/og?title=${encodeURIComponent(frontmatter.title)}&type=article&tags=${encodeURIComponent(frontmatter.tags.slice(0, 3).join(", "))}`,
                ],
            },
        };
    } catch {
        return { title: "Not Found" };
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let item;
    try {
        item = getContent("blog", slug);
    } catch {
        notFound();
    }

    const { frontmatter, content } = item;

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#fff",
                paddingBottom: 120,
            }}
        >
            {/* Top bar */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    padding: "14px clamp(20px, 4vw, 48px)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <Link
                    href="/#writing"
                    style={{
                        fontSize: 13,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "#999",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        transition: "color 0.15s",
                    }}
                >
                    ← Writing
                </Link>
                <span style={{ color: "rgba(0,0,0,0.12)" }}>·</span>
                <span
                    style={{
                        fontSize: 13,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "#bbb",
                    }}
                >
                    Article
                </span>
            </div>

            {/* Hero */}
            <div
                style={{
                    maxWidth: 720,
                    margin: "0 auto",
                    padding: "64px clamp(20px, 4vw, 48px) 48px",
                }}
            >
                {/* Tags */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0,
                        flexWrap: "wrap",
                        marginBottom: 24,
                    }}
                >
                    {frontmatter.tags.map((tag, i) => (
                        <span
                            key={tag}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 11,
                                    fontFamily:
                                        "var(--font-geist-mono), monospace",
                                    color: "#999",
                                    letterSpacing: "0.04em",
                                    fontWeight: 500,
                                }}
                            >
                                {tag}
                            </span>
                            {i < frontmatter.tags.length - 1 && (
                                <span
                                    style={{
                                        margin: "0 8px",
                                        color: "rgba(0,0,0,0.15)",
                                        fontSize: 10,
                                        lineHeight: 1,
                                    }}
                                >
                                    /
                                </span>
                            )}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: "clamp(26px, 4.5vw, 40px)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.15,
                        color: "#000",
                        margin: "0 0 16px",
                        fontFamily:
                            "var(--font-geist-sans), system-ui, sans-serif",
                    }}
                >
                    {frontmatter.title}
                </h1>

                {/* Description */}
                <p
                    style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        color: "#666",
                        margin: "0 0 24px",
                        letterSpacing: "-0.01em",
                        fontFamily:
                            "var(--font-geist-sans), system-ui, sans-serif",
                    }}
                >
                    {frontmatter.description}
                </p>

                {/* Meta row */}
                <div
                    style={{
                        display: "flex",
                        gap: 20,
                        fontSize: 12,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "#bbb",
                        letterSpacing: "0.03em",
                        paddingTop: 16,
                        borderTop: "1px solid rgba(0,0,0,0.07)",
                    }}
                >
                    <span>
                        {new Date(frontmatter.date).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            },
                        )}
                    </span>
                    <span>·</span>
                    <span>Saad Hasan</span>
                </div>

                {/* Divider */}
                <div
                    style={{
                        marginTop: 32,
                        borderTop: "1px solid rgba(0,0,0,0.07)",
                        marginBottom: 48,
                    }}
                />
            </div>

            {/* MDX Content */}
            <article
                style={{
                    maxWidth: 720,
                    margin: "0 auto",
                    padding: "0 clamp(20px, 4vw, 48px)",
                }}
            >
                <MDXRemote
                    source={content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                [rehypePrettyCode, prettyCodeOptions],
                            ],
                        },
                    }}
                />

                <CaseStudyFooter
                    backHref="/#writing"
                    backLabel="← Back to writing"
                />
            </article>
        </main>
    );
}

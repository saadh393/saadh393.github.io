import { mdxComponents } from "@/app/components/mdx";
import { ReadTracker } from "@/app/components/analytics/ReadTracker";
import { CaseStudyFooter } from "@/app/components/mdx/CaseStudyFooter";
import { getContent, getPublishedSlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import {
    DEFAULT_OG_IMAGE,
    SITE_NAME,
    SITE_URL,
    absoluteUrl,
    isoDate,
} from "@/lib/site";

const prettyCodeOptions = {
    theme: "github-light",
    keepBackground: true,
} as const;

export async function generateStaticParams() {
    const slugs = getPublishedSlugs("blog");
    return slugs.map((slug) => ({ slug }));
}

function resolveOgImage(frontmatter: {
    ogImage?: string;
    ogImageAlt?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    title: string;
}) {
    if (!frontmatter.ogImage) return DEFAULT_OG_IMAGE;
    const url = frontmatter.ogImage.startsWith("http")
        ? frontmatter.ogImage
        : `${SITE_URL}${frontmatter.ogImage.startsWith("/") ? "" : "/"}${frontmatter.ogImage}`;
    return {
        url,
        width: frontmatter.ogImageWidth ?? 1200,
        height: frontmatter.ogImageHeight ?? 630,
        alt: frontmatter.ogImageAlt ?? frontmatter.title,
    } as const;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    try {
        const { frontmatter } = getContent("blog", slug);
        const url = absoluteUrl(`/blog/${slug}`);
        const ogImage = resolveOgImage(frontmatter);
        const title = frontmatter.seoTitle || frontmatter.title;
        const published = isoDate(frontmatter.date);
        const modified = frontmatter.updated
            ? isoDate(frontmatter.updated)
            : published;

        return {
            metadataBase: new URL(SITE_URL),
            title,
            description: frontmatter.description,
            keywords: frontmatter.tags,
            authors: [{ name: SITE_NAME, url: SITE_URL }],
            creator: SITE_NAME,
            publisher: SITE_NAME,
            category: frontmatter.category,
            alternates: {
                canonical: url,
                types: {
                    "application/rss+xml": `${SITE_URL}/rss.xml`,
                },
            },
            robots: frontmatter.noindex
                ? { index: false, follow: false }
                : {
                      index: true,
                      follow: true,
                      googleBot: {
                          index: true,
                          follow: true,
                          "max-snippet": -1,
                          "max-image-preview": "large",
                          "max-video-preview": -1,
                      },
                  },
            openGraph: {
                type: "article",
                url,
                title,
                description: frontmatter.description,
                siteName: SITE_NAME,
                locale: "en_US",
                publishedTime: published,
                modifiedTime: modified,
                authors: [`${SITE_URL}/about`],
                section: frontmatter.category,
                tags: frontmatter.tags,
                images: [ogImage],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description: frontmatter.description,
                images: [ogImage.url],
                creator: "@saadh393",
                site: "@saadh393",
            },
            other: {
                "article:published_time": published,
                "article:modified_time": modified,
                "article:author": SITE_NAME,
                "article:section": frontmatter.category ?? "Engineering",
                "article:tag": frontmatter.tags.join(","),
            },
        };
    } catch {
        return { title: "Not Found", robots: { index: false, follow: false } };
    }
}

function countWords(s: string): number {
    return (s.match(/\b[\p{L}\p{N}'’-]+\b/gu) || []).length;
}

function readingTimeMinutes(words: number): number {
    return Math.max(1, Math.round(words / 220));
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
    const url = absoluteUrl(`/blog/${slug}`);
    const ogImage = resolveOgImage(frontmatter);
    const wordCount = countWords(content);
    const readingTime = readingTimeMinutes(wordCount);
    const published = isoDate(frontmatter.date);
    const modified = frontmatter.updated
        ? isoDate(frontmatter.updated)
        : published;

    const blogPostingLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: frontmatter.title,
        name: frontmatter.title,
        description: frontmatter.description,
        datePublished: published,
        dateModified: modified,
        inLanguage: "en-US",
        articleSection: frontmatter.category ?? "Engineering",
        wordCount,
        timeRequired: `PT${readingTime}M`,
        keywords: frontmatter.tags.join(", "),
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: [
            {
                "@type": "ImageObject",
                url: ogImage.url,
                width: ogImage.width,
                height: ogImage.height,
            },
        ],
        author: {
            "@type": "Person",
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Person",
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/favicon.png`,
            },
        },
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Writing",
                item: `${SITE_URL}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: frontmatter.title,
                item: url,
            },
        ],
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#fff",
                paddingBottom: 120,
            }}
        >
            <ReadTracker slug={slug} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogPostingLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbLd),
                }}
            />
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
                    href="/blog"
                    prefetch={true}
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
                    maxWidth: 1000,
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
                    <span>Md Nasimul Hasan</span>
                </div>

                {/* Divider */}
                <div
                    style={{
                        marginTop: 32,
                        borderTop: "1px solid rgba(0,0,0,0.07)",
                        // marginBottom: 48,
                    }}
                />
            </div>

            {/* MDX Content */}
            <article
                style={{
                    maxWidth: 1000,
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
                    backHref="/blog"
                    backLabel="← Back to writing"
                />
            </article>
        </main>
    );
}

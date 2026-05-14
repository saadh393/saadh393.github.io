import type { MetadataRoute } from "next";

import { getAllContent } from "@/lib/content";
import {
    DEFAULT_OG_IMAGE,
    SITE_URL,
    absoluteUrl,
    projectSocialImage,
} from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const blogPosts = getAllContent("blog");
    const projects = getAllContent("projects");

    const latestBlogDate = blogPosts[0]?.frontmatter.date;
    const latestProjectDate = projects[0]?.frontmatter.date;
    const latestSiteDate = latestProjectDate || latestBlogDate;

    return [
        {
            url: SITE_URL,
            lastModified: latestSiteDate ? new Date(latestSiteDate) : new Date(),
            changeFrequency: "weekly",
            priority: 1,
            images: [DEFAULT_OG_IMAGE.url],
        },
        {
            url: absoluteUrl("/blog"),
            lastModified: latestBlogDate ? new Date(latestBlogDate) : new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...blogPosts.map((post) => {
            const lastMod = post.frontmatter.updated || post.frontmatter.date;
            const ogImage = post.frontmatter.ogImage
                ? post.frontmatter.ogImage.startsWith("http")
                    ? post.frontmatter.ogImage
                    : `${SITE_URL}${
                          post.frontmatter.ogImage.startsWith("/") ? "" : "/"
                      }${post.frontmatter.ogImage}`
                : DEFAULT_OG_IMAGE.url;
            return {
                url: absoluteUrl(`/blog/${post.slug}`),
                lastModified: new Date(lastMod),
                changeFrequency: "monthly" as const,
                priority: 0.8,
                images: [ogImage],
            };
        }),
        ...projects.map((project) => ({
            url: absoluteUrl(`/projects/${project.slug}`),
            lastModified: new Date(project.frontmatter.date),
            changeFrequency: "monthly" as const,
            priority: 0.8,
            images: [projectSocialImage(project.slug).url],
        })),
    ];
}

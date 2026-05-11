import type { MetadataRoute } from "next";

import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "Googlebot",
                allow: "/",
            },
        ],
        sitemap: absoluteUrl("/sitemap.xml"),
        host: SITE_URL,
    };
}

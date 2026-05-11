export const DEFAULT_SITE_URL = "https://saadh393.github.io";
export const SITE_URL = DEFAULT_SITE_URL;

export const SITE_NAME = "Saad Hasan";
export const SITE_TITLE = "Saad Hasan — Frontend Engineer";
export const SITE_DESCRIPTION =
    "Frontend engineer specializing in React and Next.js. Building production apps at scale — LMS for 10k+ students, distributed streaming, semantic search.";
export const SITE_LOCALE = "en_US";
export const GOOGLE_SITE_VERIFICATION =
    "BMgNbZRStRHN4TUmmVil85q_zc9EwRyI_aMTamtwnHY";

export const DEFAULT_OG_IMAGE = {
    url: `${SITE_URL}/lws-thumbnail.png`,
    width: 1475,
    height: 841,
    alt: SITE_TITLE,
} as const;

export function absoluteUrl(path = "/") {
    return new URL(path, `${SITE_URL}/`).toString();
}

export function isoDate(date: string) {
    return new Date(date).toISOString();
}

export function projectSocialImage(slug: string) {
    if (slug === "semantic-search") {
        return {
            url: `${SITE_URL}/semantic_search.png`,
            width: 1920,
            height: 1080,
            alt: "Semantic Search API for Amazon Product Data",
        } as const;
    }

    if (slug === "blue-green-deployment-zero-downtime") {
        return {
            url: `${SITE_URL}/zero-downtime-deployment.png`,
            width: 1920,
            height: 1080,
            alt: "Zero Downtime Frontend Deploys with Blue-Green on a Single EC2",
        } as const;
    }

    return DEFAULT_OG_IMAGE;
}

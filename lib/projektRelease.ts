import {
    PROJEKT_LATEST_RELEASE_API,
    PROJEKT_PLATFORMS,
    PROJEKT_RELEASES_URL,
    type ProjektPlatform,
} from "./projekt";

export type ProjektRelease = {
    version: string;
    downloads: Record<ProjektPlatform, string>;
};

type ReleaseAsset = { name?: unknown; browser_download_url?: unknown };

const RELEASE_TIMEOUT_MS = 10_000;

const assetUrl = (assets: ReleaseAsset[], suffix: string) => {
    const asset = assets.find(
        (item) => typeof item.name === "string" && item.name.endsWith(suffix),
    );
    return typeof asset?.browser_download_url === "string"
        ? asset.browser_download_url
        : PROJEKT_RELEASES_URL;
};

export const parseRelease = (data: unknown): ProjektRelease | null => {
    if (!data || typeof data !== "object") return null;
    const { tag_name, assets } = data as { tag_name?: unknown; assets?: unknown };
    if (typeof tag_name !== "string" || !Array.isArray(assets)) return null;

    return {
        version: tag_name,
        downloads: {
            mac: assetUrl(assets, PROJEKT_PLATFORMS.mac.assetSuffix),
            windows: assetUrl(assets, PROJEKT_PLATFORMS.windows.assetSuffix),
        },
    };
};

let pendingRelease: Promise<ProjektRelease> | null = null;

export const loadLatestRelease = () => {
    pendingRelease ??= fetch(PROJEKT_LATEST_RELEASE_API, {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(RELEASE_TIMEOUT_MS),
    })
        .then((response) => {
            if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
            return response.json();
        })
        .then((data) => {
            const release = parseRelease(data);
            if (!release) throw new Error("GitHub returned an unexpected release format");
            return release;
        })
        .catch((error: unknown) => {
            pendingRelease = null;
            throw error;
        });

    return pendingRelease;
};

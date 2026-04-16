import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "saadh393.github.io",
            },
        ],
    },
    /* config options here */
};

export default nextConfig;

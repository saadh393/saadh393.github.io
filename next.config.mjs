/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // distDir: "docs",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saadh393.github.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

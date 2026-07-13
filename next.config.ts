import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: "/lets-prompt-it",
  assetPrefix: "/lets-prompt-it/",
  images: {
    unoptimized: true
  }
};

export default nextConfig;

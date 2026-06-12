import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? "/observatory" : "",
  assetPrefix: isGhPages ? "/observatory/" : "",
};

export default nextConfig;

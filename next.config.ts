import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    jsxImportSource: "@mdx-js/react",
    // ✅ functions in Webpack mode
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: true, throwOnError: false }]],
  },
});

const isDev = process.env.NODE_ENV !== "production";
const repoBase = "/web-components-mdx"; // GitHub Pages project path

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // Static export for GH Pages
  output: isDev ? undefined : "export",
  trailingSlash: true,
  // Ensure assets and routes resolve under project subpath on GH Pages
  basePath: isDev ? undefined : repoBase,
  assetPrefix: isDev ? undefined : `${repoBase}/`,
};

export default withMDX(nextConfig);

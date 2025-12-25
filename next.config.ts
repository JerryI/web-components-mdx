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
const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // Static export for GH Pages; routes not included in export, only static files
  output: isDev ? undefined : "export",
  trailingSlash: true,
};

export default withMDX(nextConfig);

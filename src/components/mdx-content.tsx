import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        }}
      />
    </div>
  );
}

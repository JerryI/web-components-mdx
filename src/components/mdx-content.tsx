import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <MDXRemote source={content} />
    </div>
  );
}

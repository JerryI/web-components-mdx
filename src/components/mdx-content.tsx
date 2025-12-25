import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";

interface MDXContentProps {
  content: string;
  stripFirstH1?: boolean;
}

// Plugin to strip the first h1 heading
function rehypeStripFirstH1() {
  return (tree: any) => {
    let firstH1Found = false;
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "h1" && !firstH1Found && parent) {
        firstH1Found = true;
        parent.children.splice(index, 1);
        return [null, index];
      }
    });
  };
}

// Transform directives to admonition divs
function remarkAdmonition() {
  const types = ["tip", "note", "warning", "danger", "caution", "important", "info"];
  
  return (tree: any) => {
    visit(tree, ["containerDirective"], (node) => {
      const type = node.name;
      
      if (!types.includes(type)) {
        return;
      }

      const data = node.data || (node.data = {});
      data.hName = "div";
      data.hProperties = {
        className: ["admonition", `admonition-${type}`],
      };

      // Add type label as first child
      const typeNode = {
        type: "paragraph",
        children: [
          {
            type: "strong",
            data: { hName: "strong", hProperties: { className: ["admonition-type"] } },
            children: [
              {
                type: "text",
                value: `${type.charAt(0).toUpperCase() + type.slice(1)}: `,
              },
            ],
          },
          ...(node.children[0]?.children || []),
        ],
      };

      node.children = [typeNode, ...node.children.slice(1)];
    });
  };
}

export function MDXContent({ content, stripFirstH1 = true }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkMath,
              remarkDirective,
              remarkAdmonition,
            ],
            rehypePlugins: [
              rehypeKatex,
              ...(stripFirstH1 ? [rehypeStripFirstH1] : []),
            ],
          },
        }}
      />
    </div>
  );
}

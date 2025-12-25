import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  author?: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

function readPostFile(fullPath: string, slug: string): Post {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  // If date is not in frontmatter, use file modification date
  let date = (data as PostMetadata).date;
  if (!date) {
    const stats = fs.statSync(fullPath);
    date = new Date(stats.mtime).toISOString().split('T')[0]; // YYYY-MM-DD format
  }
  
  return {
    slug,
    metadata: {
      ...(data as PostMetadata),
      date,
    },
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const posts: Post[] = [];

  for (const entry of entries) {
    const entryPath = path.join(postsDirectory, entry.name);
    if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))) {
      const slug = entry.name.replace(/\.mdx?$/, "");
      posts.push(readPostFile(entryPath, slug));
    }

    if (entry.isDirectory()) {
      // Look for index.mdx or index.md inside the directory
      const indexMdx = path.join(entryPath, "index.mdx");
      const indexMd = path.join(entryPath, "index.md");
      if (fs.existsSync(indexMdx)) {
        posts.push(readPostFile(indexMdx, entry.name));
      } else if (fs.existsSync(indexMd)) {
        posts.push(readPostFile(indexMd, entry.name));
      }
    }
  }

  return posts.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, "");

    // Check file at root: post.mdx or post.md
    const fileMdx = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileMd = path.join(postsDirectory, `${realSlug}.md`);
    if (fs.existsSync(fileMdx)) return readPostFile(fileMdx, realSlug);
    if (fs.existsSync(fileMd)) return readPostFile(fileMd, realSlug);

    // Check directory with index.mdx or index.md
    const dirIndexMdx = path.join(postsDirectory, realSlug, "index.mdx");
    const dirIndexMd = path.join(postsDirectory, realSlug, "index.md");
    if (fs.existsSync(dirIndexMdx)) return readPostFile(dirIndexMdx, realSlug);
    if (fs.existsSync(dirIndexMd)) return readPostFile(dirIndexMd, realSlug);

    return null;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

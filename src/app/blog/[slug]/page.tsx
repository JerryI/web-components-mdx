import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description || "Read this blog post",
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="container-main" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <Link href="/blog" style={{ color: 'var(--accent)', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Back to posts
        </Link>

        <article className="article">
          <header>
            <h1>{post.metadata.title}</h1>

            <div className="post-meta" style={{ marginTop: '0.5rem' }}>
              <time dateTime={post.metadata.date}>
                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.metadata.author && <span> — by {post.metadata.author}</span>}
            </div>

            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="post-tags" style={{ marginTop: '0.75rem' }}>
                {post.metadata.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </header>

          <div className="mdx-content">
            <MDXContent content={post.content} />
          </div>
        </article>

        <nav style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
          {/* Placeholder for previous/next post navigation */}
        </nav>
      </div>
    </div>
  );
}

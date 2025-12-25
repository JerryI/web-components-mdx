import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "Read our latest posts",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1>Blog</h1>
          <p style={{ color: 'var(--muted)' }}>Thoughts on web development, technology, and more.</p>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>No posts found. Check back soon!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                <Link href={`/blog/${post.slug}`}>
                  <h2>{post.metadata.title}</h2>
                </Link>

                <div className="post-meta">
                  <time dateTime={post.metadata.date}>
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.metadata.author && <span> — by {post.metadata.author}</span>}
                </div>

                {post.metadata.description && (
                  <p className="post-desc">{post.metadata.description}</p>
                )}

                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="post-tags">
                    {post.metadata.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                <Link href={`/blog/${post.slug}`} className="link" style={{ marginTop: '0.75rem', display: 'inline-block' }}>
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

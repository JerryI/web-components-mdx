import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main>
      <div className="container">
        <section className="hero">
          <h1>Welcome to My Blog</h1>
          <p>Exploring web development, technology, and ideas.</p>
          <Link href="/blog" className="btn">Read All Posts</Link>
        </section>

        {posts.length > 0 && (
          <section>
            <h2>Latest Posts</h2>
            <div className="posts-grid">
              {posts.map((post) => (
                <article key={post.slug} className="post-card">
                  <Link href={`/blog/${post.slug}`}>
                    <h3>{post.metadata.title}</h3>
                  </Link>
                  <p className="post-meta">
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="post-desc">{post.metadata.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

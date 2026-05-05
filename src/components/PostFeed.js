function PostFeed({ title, intro, posts }) {
  return (
    <section className="page-section">
      <header className="section-header">
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>

      <div className="post-grid">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            {post.imagePath && (
              <img src={post.imagePath} alt={post.imageAlt} className="post-image" />
            )}
            <div className="post-content">
              <h2>{post.title || 'Untitled'}</h2>
              {post.date && <p className="post-date">{post.date}</p>}
              {post.text && <p>{post.text}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PostFeed;

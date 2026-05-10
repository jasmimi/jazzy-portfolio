function getPostLinkLabel(link, linkLabel) {
  if (linkLabel) {
    return linkLabel;
  }

  if (/instagram\.com/i.test(link)) {
    return 'Open on Instagram';
  }

  if (/facebook\.com|fb\.watch/i.test(link)) {
    return 'Open on Facebook';
  }

  return /youtube\.com|youtu\.be|vimeo\.com/i.test(link) ? 'Watch video' : 'Open link';
}

function getUrl(link) {
  try {
    return new URL(link);
  } catch {
    return null;
  }
}

function hasHost(url, host) {
  return url.hostname === host || url.hostname.endsWith(`.${host}`);
}

function getInstagramPostParts(url) {
  if (!hasHost(url, 'instagram.com')) {
    return null;
  }

  const match = url.pathname.match(/^\/(reel|p|tv)\/([^/]+)/i);

  if (!match) {
    return null;
  }

  return {
    type: match[1].toLowerCase(),
    id: match[2],
  };
}

function getExternalPostUrl(link) {
  const url = getUrl(link);

  if (!url) {
    return link;
  }

  const instagramPost = getInstagramPostParts(url);

  if (instagramPost) {
    return `https://www.instagram.com/${instagramPost.type}/${instagramPost.id}/`;
  }

  return link;
}

function getSocialPlatformName(link) {
  const url = getUrl(link);

  if (!url) {
    return null;
  }

  if (hasHost(url, 'instagram.com')) {
    return 'Instagram';
  }

  if (hasHost(url, 'facebook.com') || hasHost(url, 'fb.watch')) {
    return 'Facebook';
  }

  return null;
}

function getVideoEmbed(link) {
  const url = getUrl(link);

  if (!url) {
    return null;
  }

  const instagramPost = getInstagramPostParts(url);

  if (instagramPost) {
    return {
      platform: 'instagram',
      platformName: 'Instagram',
      src: `https://www.instagram.com/${instagramPost.type}/${instagramPost.id}/embed`,
    };
  }

  if (hasHost(url, 'facebook.com') || hasHost(url, 'fb.watch')) {
    return {
      platform: 'facebook',
      platformName: 'Facebook',
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url.toString(),
      )}&show_text=false&width=500`,
    };
  }

  return null;
}

function PostFeed({ title, intro, posts, embedVideos = false }) {
  return (
    <section className="page-section">
      <header className="section-header">
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>

      <div className="post-grid">
        {posts.map((post) => {
          const linkUrl = post.link ? getExternalPostUrl(post.link) : null;
          const videoEmbed =
            embedVideos && post.link && post.embed !== false ? getVideoEmbed(post.link) : null;
          const videoLinkPlatform =
            embedVideos && post.link && !videoEmbed ? getSocialPlatformName(post.link) : null;

          return (
            <article className="post-card" key={post.id}>
              {videoEmbed ? (
                <div
                  className={`post-embed post-embed--${videoEmbed.platform}`}
                  style={
                    post.embedAspectRatio
                      ? { '--post-embed-aspect-ratio': post.embedAspectRatio }
                      : undefined
                  }
                >
                  <iframe
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    className={`post-embed-frame post-embed-frame--${videoEmbed.platform}`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    scrolling="no"
                    src={videoEmbed.src}
                    title={`${post.title || 'Untitled'} embedded ${videoEmbed.platformName} video`}
                  />
                </div>
              ) : videoLinkPlatform ? (
                <a
                  className="post-video-link-card"
                  href={linkUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="post-video-link-icon" aria-hidden="true" />
                  <span>Watch on {videoLinkPlatform}</span>
                </a>
              ) : (
                post.imagePath && (
                  <img src={post.imagePath} alt={post.imageAlt} className="post-image" />
                )
              )}
              <div className="post-content">
                <h2>{post.title || 'Untitled'}</h2>
                {post.date && <p className="post-date">{post.date}</p>}
                {post.text && <p className="post-text">{post.text}</p>}
                {post.link && (
                  <a
                    className="post-link"
                    href={linkUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getPostLinkLabel(post.link, post.linkLabel)}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PostFeed;

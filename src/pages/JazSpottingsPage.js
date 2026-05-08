import PostFeed from '../components/PostFeed';
import jazSpottings from '../data/jazSpottings.json';

function JazSpottingsPage() {
  return (
    <PostFeed
      title="Jaz Spottings"
      intro="A tale of panels, events, and moments I've been grateful to be a part of."
      posts={jazSpottings}
    />
  );
}

export default JazSpottingsPage;
